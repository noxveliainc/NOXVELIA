import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { verificarToken } from '../middleware/auth.js';
import Anuncio from '../models/Anuncio.js';

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ─────────────────────────────────────────────────────────────
// ROTA 1: CRIAR SESSÃO DE CHECKOUT
// ─────────────────────────────────────────────────────────────
router.post('/checkout', verificarToken, async (req, res) => {
  try {
    const { anuncioId, pacote } = req.body; 

    const anuncio = await Anuncio.findById(anuncioId);
    if (!anuncio) {
      return res.status(404).json({ erro: 'Anúncio não encontrado.' });
    }
    if (String(anuncio.utilizador) !== req.user.id) {
      return res.status(403).json({ erro: 'Não podes promover um anúncio que não é teu.' });
    }

    let preco;
    let nomeProduto;

    if (pacote === 'bump') {
      preco = 149; 
      nomeProduto = 'Bump Up (Subida ao Topo)';
    } else if (pacote === 'gold') {
      preco = 799; 
      nomeProduto = 'Destaque Gold (7 dias)';
    } else {
      return res.status(400).json({ erro: 'Pacote inválido.' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `${nomeProduto} - ${anuncio.titulo}`,
              description: `Promove o teu ativo na NOXVELIA.`,
            },
            unit_amount: preco,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/perfil?pagamento=sucesso`,
      cancel_url: `${process.env.FRONTEND_URL}/sucesso/${anuncioId}?pagamento=cancelado`,
      metadata: {
        anuncioId: anuncioId,
        userId: req.user.id,
        pacote: pacote
      }
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Erro no Stripe Checkout:', error);
    res.status(500).json({ erro: 'Erro ao processar a página de pagamento.' });
  }
});

// ─────────────────────────────────────────────────────────────
// ROTA 2: WEBHOOK (O Cérebro que confirma o pagamento)
// ─────────────────────────────────────────────────────────────
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Erro no Webhook: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Verifica se o pagamento foi concluído com sucesso
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { anuncioId, pacote } = session.metadata;

    try {
      if (pacote === 'gold') {
        // Atualiza o anúncio para destacado e define a expiração (7 dias)
        await Anuncio.findByIdAndUpdate(anuncioId, { 
          destacado: true, 
          dataExpiracaoDestaque: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) 
        });
        console.log(`✅ Anúncio ${anuncioId} destacado com sucesso!`);
      } else if (pacote === 'bump') {
        // Atualiza a data de criação para o anúncio "subir" no motor de pesquisa
        await Anuncio.findByIdAndUpdate(anuncioId, { createdAt: new Date() });
        console.log(`✅ Anúncio ${anuncioId} subiu ao topo!`);
      }
    } catch (err) {
      console.error('Erro ao atualizar anúncio após pagamento:', err);
    }
  }

  res.json({ received: true });
});

export default router;