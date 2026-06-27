import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { verificarToken } from '../middleware/auth.js';
import Anuncio from '../models/Anuncio.js';
import User from '../models/User.js';
import Pagamento from '../models/Pagamento.js';

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ─────────────────────────────────────────────────────────────
// ROTA 1 — BUMP / DESTAQUE 5 DIAS / DESTAQUE GOLD (pagamento único)
// Preços em cêntimos: bump = 1.49€, destaque5 = 1.99€, gold = 7.99€
// ─────────────────────────────────────────────────────────────
router.post('/checkout', verificarToken, async (req, res) => {
  try {
    const { anuncioId, pacote } = req.body;

    const anuncio = await Anuncio.findById(anuncioId);
    if (!anuncio)
      return res.status(404).json({ erro: 'Anúncio não encontrado.' });
    if (String(anuncio.utilizador) !== req.user.id)
      return res.status(403).json({ erro: 'Não podes promover um anúncio que não é teu.' });

    let preco, nomeProduto, tipoPagamento;

    if (pacote === 'bump') {
      preco = 149;
      nomeProduto = 'Bump Up (Subida ao Topo)';
      tipoPagamento = 'bump';
    } else if (pacote === 'destaque5') {
      // 🆕 NOVO PACOTE — 1.99€, 5 dias de destaque
      preco = 199;
      nomeProduto = 'Destaque (5 dias)';
      tipoPagamento = 'destaque5';
    } else if (pacote === 'gold') {
      preco = 799;
      nomeProduto = 'Destaque Gold (7 dias)';
      tipoPagamento = 'destaque';
    } else {
      return res.status(400).json({ erro: 'Pacote inválido.' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: `${nomeProduto} — ${anuncio.titulo}`,
            description: 'Promove o teu ativo na NOXVELIA.',
          },
          unit_amount: preco,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/perfil?pagamento=sucesso`,
      cancel_url:  `${process.env.FRONTEND_URL}/sucesso/${anuncioId}?pagamento=cancelado`,
      metadata: {
        anuncioId,
        userId: req.user.id,
        pacote,
        tipoPagamento,
        valor: String(preco),
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('❌ Erro no Stripe Checkout (one-time):', error);
    res.status(500).json({ erro: 'Erro ao processar a página de pagamento.', detalhe: error.message });
  }
});

// ─────────────────────────────────────────────────────────────
// ROTA 2 — SUBSCRIÇÃO PREMIUM PROFISSIONAL (10.99€/mês)
// ─────────────────────────────────────────────────────────────
router.post('/criar-checkout-premium', verificarToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ erro: 'Utilizador não encontrado.' });

    // Se já é premium, redirecionar para o portal
    if (user.premiumAtivo && user.stripeCustomerId) {
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: `${process.env.FRONTEND_URL}/planos`,
      });
      return res.json({ url: portalSession.url });
    }

    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.nome,
        metadata: { userId: String(user._id) },
      });
      customerId = customer.id;
      await User.findByIdAndUpdate(user._id, { stripeCustomerId: customerId });
    }

    // Chamada simplificada e corrigida
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [{
        price: process.env.STRIPE_PREMIUM_PRICE_ID,
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/planos?premium=sucesso`,
      cancel_url:  `${process.env.FRONTEND_URL}/planos?premium=cancelado`,
      metadata: {
        userId: String(user._id),
        tipoPagamento: 'premium',
      },
      subscription_data: {
        metadata: { userId: String(user._id) },
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('❌ ERRO FINAL DA STRIPE:', error.message);
    res.status(500).json({ erro: 'Erro na Stripe', detalhe: error.message });
  }
});

// ─────────────────────────────────────────────────────────────
// ROTA 3 — CUSTOMER PORTAL
// ─────────────────────────────────────────────────────────────
router.post('/portal', verificarToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user?.stripeCustomerId)
      return res.status(400).json({ erro: 'Sem subscrição ativa para gerir.' });

    const session = await stripe.billingPortal.sessions.create({
      customer:   user.stripeCustomerId,
      return_url: `${process.env.FRONTEND_URL}/planos`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('❌ Erro no Customer Portal:', error);
    res.status(500).json({ erro: 'Erro ao abrir portal de faturação.' });
  }
});

// ─────────────────────────────────────────────────────────────
// ROTA 4 — WEBHOOK UNIFICADO
// ─────────────────────────────────────────────────────────────
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`❌ Assinatura do webhook inválida: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const meta    = session.metadata || {};

    const jaProcessado = await Pagamento.findOne({ stripePaymentId: session.id });
    if (jaProcessado) {
      console.log(`⚠️ Evento ${session.id} já processado. A ignorar.`);
      return res.json({ received: true });
    }

    if (session.mode === 'subscription') {
      const userId = meta.userId;
      const subscriptionId = session.subscription;

      try {
        await User.findByIdAndUpdate(userId, {
          premiumAtivo:         true,
          stripeSubscriptionId: subscriptionId,
          dataExpiracaoPremium: null,
        });

        await Pagamento.create({
          utilizador:      userId,
          stripePaymentId: session.id,
          valor:           Math.round((session.amount_total || 1099)),
          moeda:           session.currency || 'eur',
          tipo:            'premium',
          estado:          'pago',
        });

        console.log(`✅ Premium ativado para user ${userId} (sub: ${subscriptionId})`);
      } catch (err) {
        console.error('❌ Erro ao ativar premium:', err);
      }
      return res.json({ received: true });
    }

    // ── PAGAMENTOS ÚNICOS (bump / destaque5 / gold) ─────────────
    const { anuncioId, userId, pacote, tipoPagamento, valor } = meta;

    try {
      if (pacote === 'gold') {
        await Anuncio.findByIdAndUpdate(anuncioId, {
          destacado:              true,
          dataExpiracaoDestaque:  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        console.log(`✅ Anúncio ${anuncioId} destacado (7 dias).`);
      } else if (pacote === 'destaque5') {
        // 🆕 NOVO PACOTE — aplica 5 dias de destaque
        await Anuncio.findByIdAndUpdate(anuncioId, {
          destacado:              true,
          dataExpiracaoDestaque:  new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        });
        console.log(`✅ Anúncio ${anuncioId} destacado (5 dias).`);
      } else if (pacote === 'bump') {
        await Anuncio.findByIdAndUpdate(anuncioId, { createdAt: new Date() });
        console.log(`✅ Anúncio ${anuncioId} subiu ao topo.`);
      }

      await Pagamento.create({
        utilizador:      userId,
        anuncio:         anuncioId,
        stripePaymentId: session.id,
        valor:           Number(valor),
        moeda:           session.currency || 'eur',
        tipo:            tipoPagamento,
        estado:          'pago',
      });
      console.log(`💾 Pagamento ${session.id} registado.`);
    } catch (err) {
      console.error('❌ Erro ao processar pagamento único:', err);
      try {
        await Pagamento.create({
          utilizador:      userId,
          anuncio:         anuncioId,
          stripePaymentId: session.id,
          valor:           Number(valor) || 0,
          moeda:           session.currency || 'eur',
          tipo:            tipoPagamento || 'destaque',
          estado:          'pendente',
        });
      } catch (saveErr) {
        console.error('❌ CRÍTICO: Falha ao guardar pagamento pendente:', saveErr);
      }
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object;
    const userId = subscription.metadata?.userId;

    if (userId) {
      await User.findByIdAndUpdate(userId, {
        premiumAtivo:         false,
        stripeSubscriptionId: null,
        dataExpiracaoPremium: new Date(),
      });
      console.log(`⛔ Premium desativado para user ${userId} (sub cancelada).`);
    }
  }

  if (event.type === 'customer.subscription.updated') {
    const subscription = event.data.object;
    const userId = subscription.metadata?.userId;
    const ativo  = subscription.status === 'active' || subscription.status === 'trialing';

    if (userId) {
      await User.findByIdAndUpdate(userId, { premiumAtivo: ativo });
      console.log(`🔄 Premium sincronizado para user ${userId}: ${ativo ? 'ATIVO' : 'INATIVO'}`);
    }
  }

  if (event.type === 'invoice.payment_failed') {
    const invoice  = event.data.object;
    const customerId = invoice.customer;

    const user = await User.findOne({ stripeCustomerId: customerId });
    if (user) {
      await User.findByIdAndUpdate(user._id, { premiumAtivo: false });
      console.log(`⚠️ Pagamento falhado — Premium suspenso para user ${user._id}.`);
    }
  }

  res.json({ received: true });
});

export default router;