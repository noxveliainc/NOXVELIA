import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const SpinnerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="pl-spinner">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const LockClosedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

export default function Planos() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { sincronizarUser, user, signed } = useAuth();
  const [loadingStripe, setLoadingStripe] = useState(false);
  const [aSincronizar, setASincronizar] = useState(false);
  
  const temSubscricaoStripe = Boolean(user?.stripeCustomerId || user?.stripeSubscriptionId);
  const temAcessoProfissionalManual = Boolean(user?.premiumAtivo && !temSubscricaoStripe);
  const proximoPagamento = user?.proximoPagamentoPremium ? new Date(user.proximoPagamentoPremium) : null;
  const proximoPagamentoValido = proximoPagamento && !Number.isNaN(proximoPagamento.getTime());
  const diasAteProximoPagamento = proximoPagamentoValido
    ? Math.max(0, Math.ceil((proximoPagamento.getTime() - Date.now()) / 86400000))
    : null;
  const textoDiasRestantes = diasAteProximoPagamento === null
    ? null
    : diasAteProximoPagamento === 0
      ? 'hoje'
      : diasAteProximoPagamento === 1
        ? '1 dia'
        : `${diasAteProximoPagamento} dias`;
  const dataProximoPagamento = proximoPagamentoValido
    ? proximoPagamento.toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' })
    : null;

  useEffect(() => {
    const resultado = searchParams.get('premium');
    if (resultado === 'sucesso' && signed) {
      setASincronizar(true);
      sincronizarUser().finally(() => setASincronizar(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    const idUtilizador = user?._id || user?.id;
    if (!signed || !idUtilizador) return;

    let ativo = true;
    setASincronizar(true);
    sincronizarUser().finally(() => {
      if (ativo) setASincronizar(false);
    });

    return () => { ativo = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id, user?.id]);

  const iniciarAssinatura = () => {
    if (!signed) {
      navigate('/login', { state: { from: '/premium-confirmar' } });
      return;
    }
    navigate('/premium-confirmar');
  };

  const abrirPortalCliente = async () => {
    setLoadingStripe(true);
    try {
      const res = await api.post('/stripe/criar-portal-cliente');
      if (res.data && res.data.url) {
        window.location.href = res.data.url;
      }
    } catch {
      alert('Erro ao abrir o portal de gestão. Tenta novamente.');
      setLoadingStripe(false);
    }
  };

  const featuresParticular = [
    'Até 5 anúncios ativos em simultâneo',
    'Contacto direto via WhatsApp e Telefone',
    'Suporte base dedicado por email',
  ];

  const featuresProfissional = [
    'Anúncios ilimitados em Automóveis e Imóveis',
    'Destaque automático de máxima prioridade nas buscas',
    'Montra corporativa exclusiva para a sua marca ou stand',
    'Painel PRO avançado com métricas de desempenho em tempo real',
    'Liberdade total para editar anúncios ativos sempre que precisar',
    'Transparência garantida: cancele quando quiser sem perder anúncios ativos',
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        .pl-root {
          font-family: 'Inter', sans-serif;
          background: #fdfdfd;
          color: #0f172a;
          min-height: 100vh;
          box-sizing: border-box;
          padding: 56px 24px 80px;
        }

        .pl-header {
          max-width: 700px;
          margin: 0 auto 48px;
          text-align: center;
        }
        .pl-eyebrow {
          font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em;
          color: #102f50; background: rgba(16, 47, 80, 0.06); padding: 6px 14px; border-radius: 100px;
          display: inline-block; margin-bottom: 14px;
        }
        .pl-header h1 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(32px, 4vw, 42px);
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 12px;
          color: #071326;
        }
        .pl-header p {
          font-size: 16px;
          color: #5d6b78;
          line-height: 1.6;
          margin: 0;
        }

        .pl-sync {
          text-align: center;
          font-size: 13px;
          font-weight: 600;
          color: #102f50;
          background: rgba(217,196,156,0.15);
          padding: 10px;
          border-radius: 8px;
          max-width: 400px;
          margin: 0 auto 24px;
        }

        .pl-active-panel {
          max-width: 820px;
          margin: 0 auto;
          padding: 36px;
          border: 1px solid #e6e1d6;
          border-radius: 20px;
          background: #ffffff;
          box-shadow: 0 20px 45px -20px rgba(7, 19, 38, 0.08);
        }
        .pl-active-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 28px;
        }
        .pl-active-head h2 {
          margin: 8px 0 6px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 28px;
          color: #071326;
        }
        .pl-active-head p {
          margin: 0;
          color: #5d6b78;
          font-size: 15px;
        }
        .pl-active-status {
          flex: 0 0 auto;
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(16, 47, 80, 0.08);
          color: #102f50;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .pl-active-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }
        .pl-active-metric {
          padding: 22px;
          border: 1px solid #e6e1d6;
          border-radius: 14px;
          background: #f7f5ef;
        }
        .pl-active-label {
          display: block;
          margin-bottom: 8px;
          color: #5d6b78;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .pl-active-value {
          display: block;
          color: #071326;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 26px;
          font-weight: 800;
          line-height: 1.1;
        }
        .pl-active-small {
          display: block;
          margin-top: 8px;
          color: #5d6b78;
          font-size: 13px;
          line-height: 1.4;
        }
        .pl-active-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .pl-active-actions .pl-btn {
          width: auto;
          min-width: 210px;
          padding-inline: 24px;
        }

        .pl-grid {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: stretch;
        }

        .pl-card {
          background: #ffffff;
          border: 1px solid #e6e1d6;
          border-radius: 20px;
          padding: 38px 32px 32px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 15px 35px -10px rgba(7, 19, 38, 0.05);
          position: relative;
          box-sizing: border-box;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .pl-card:hover {
          box-shadow: 0 20px 40px -12px rgba(16, 47, 80, 0.12);
        }

        .pl-card--pro {
          border: 2px solid #102f50;
        }

        .pl-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #102f50;
          background: #f7f5ef;
          border: 1px solid #e6e1d6;
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 16px;
          width: fit-content;
        }
        .pl-badge--pro {
          background: #102f50;
          color: #d9c49c;
          border-color: #102f50;
        }

        .pl-plan-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #071326;
          margin-bottom: 6px;
        }

        .pl-plan-desc {
          font-size: 14px;
          color: #5d6b78;
          line-height: 1.5;
          margin-bottom: 24px;
          min-height: 42px;
        }

        .pl-price {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 38px;
          font-weight: 800;
          color: #071326;
          letter-spacing: -0.02em;
          margin-bottom: 24px;
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        .pl-price span {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #5d6b78;
        }

        .pl-features {
          list-style: none;
          padding: 0;
          margin: 0 0 32px;
          flex: 1;
        }
        .pl-features li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 14px;
          color: #071326;
          line-height: 1.5;
          margin-bottom: 14px;
          font-weight: 500;
        }
        .pl-features svg {
          width: 18px; height: 18px;
          flex-shrink: 0;
          margin-top: 1px;
          color: #102f50;
        }
        .pl-card--pro .pl-features svg { color: #d9c49c; }

        .pl-btn {
          width: 100%;
          padding: 14px 20px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: 1px solid transparent;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }
        .pl-btn:disabled { opacity: 0.7; cursor: default; }

        .pl-btn--ghost {
          background: #f7f5ef;
          border-color: #e6e1d6;
          color: #071326;
        }
        .pl-btn--ghost:hover { background: #ede8dc; }

        .pl-btn--primary {
          background: #102f50;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(16, 47, 80, 0.2);
        }
        .pl-btn--primary:hover { background: #071326; transform: translateY(-1px); }

        .pl-btn--outline-pro {
          background: #ffffff;
          border-color: #102f50;
          color: #102f50;
        }
        .pl-btn--outline-pro:hover { background: #f7f5ef; }

        .pl-spinner {
          width: 18px; height: 18px;
          animation: pl-spin 0.8s linear infinite;
        }
        @keyframes pl-spin { to { transform: rotate(360deg); } }

        /* SEÇÃO DE CONFIANÇA & GARANTIA */
        .pl-trust-section {
          max-width: 900px;
          margin: 48px auto 0;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          padding-top: 32px;
          border-top: 1px solid #e6e1d6;
        }
        .pl-trust-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .pl-trust-icon {
          color: #102f50;
          background: #f7f5ef;
          padding: 10px;
          border-radius: 10px;
          flex-shrink: 0;
        }
        .pl-trust-content h4 {
          font-size: 13.5px;
          font-weight: 800;
          color: #071326;
          margin: 0 0 4px;
        }
        .pl-trust-content p {
          font-size: 12.5px;
          color: #5d6b78;
          margin: 0;
          line-height: 1.4;
        }

        .pl-manual-note {
          margin: 12px 0 0;
          color: #5d6b78;
          font-size: 12.5px;
          line-height: 1.5;
          text-align: center;
        }

        @media (max-width: 768px) {
          .pl-grid { grid-template-columns: 1fr; max-width: 420px; }
          .pl-trust-section { grid-template-columns: 1fr; max-width: 420px; }
          .pl-active-panel { max-width: 420px; padding: 24px; }
          .pl-active-head, .pl-active-actions { flex-direction: column; }
          .pl-active-grid { grid-template-columns: 1fr; }
          .pl-active-actions .pl-btn { width: 100%; }
        }
      `}</style>

      <div className="pl-root">
        <div className="pl-header">
          <span className="pl-eyebrow">Transparência & Confiança</span>
          <h1>Planos simples, sem surpresas nem comissões</h1>
          <p>Escolha a modalidade ideal para potenciar os seus negócios no mercado automóvel e imobiliário em Portugal.</p>
        </div>

        {aSincronizar && (
          <div className="pl-sync">A sincronizar o seu estado com a Stripe...</div>
        )}

        {user?.premiumAtivo ? (
          <section className="pl-active-panel" aria-label="Estado do plano PRO">
            <div className="pl-active-head">
              <div>
                <span className="pl-badge pl-badge--pro">Conta Verificada</span>
                <h2>Subscrição PRO Ativa</h2>
                <p>{temAcessoProfissionalManual ? 'Acesso corporativo atribuído pela administração.' : 'A sua subscrição está ativa e protegida de forma segura.'}</p>
              </div>
              <span className="pl-active-status">Ativo</span>
            </div>

            <div className="pl-active-grid">
              <div className="pl-active-metric">
                <span className="pl-active-label">Próxima Renovação</span>
                <strong className="pl-active-value">
                  {temAcessoProfissionalManual ? 'Sem termo' : textoDiasRestantes || 'A calcular'}
                </strong>
                <span className="pl-active-small">
                  {temAcessoProfissionalManual
                    ? 'Acesso especial sem faturação automática recorrente.'
                    : dataProximoPagamento || 'Atualizado diretamente pela plataforma de pagamentos.'}
                </span>
              </div>
              <div className="pl-active-metric">
                <span className="pl-active-label">Investimento</span>
                <strong className="pl-active-value">10,99€ / mês</strong>
                <span className="pl-active-small">Sem comissões ocultas por cada negócio fechado com sucesso.</span>
              </div>
            </div>

            <div className="pl-active-actions">
              {!temAcessoProfissionalManual && (
                <button className="pl-btn pl-btn--outline-pro" onClick={abrirPortalCliente} disabled={loadingStripe}>
                  {loadingStripe ? <SpinnerIcon /> : 'Gerir Faturação e Cartões'}
                </button>
              )}
              <button className="pl-btn pl-btn--primary" type="button" onClick={() => navigate('/pro')}>
                Aceder ao Painel PRO
              </button>
            </div>
          </section>
        ) : (
          <div className="pl-grid">
            {/* PLANO GRATUITO */}
            <div className="pl-card">
              <span className="pl-badge">Particular</span>
              <div className="pl-plan-name">Início Gratuito</div>
              <p className="pl-plan-desc">Perfeito para particulares que pretendem vender de forma rápida e direta.</p>
              <div className="pl-price">0€ <span>/sem custos</span></div>
              <ul className="pl-features">
                {featuresParticular.map((f) => (
                  <li key={f}><CheckIcon />{f}</li>
                ))}
              </ul>
              <button className="pl-btn pl-btn--ghost" onClick={() => signed ? navigate('/perfil') : navigate('/registo')}>
                {signed ? 'Ir para o meu Perfil' : 'Criar Conta Gratuita'}
              </button>
            </div>

            {/* PLANO PREMIUM / PRO */}
            <div className="pl-card pl-card--pro">
              <span className="pl-badge pl-badge--pro">Recomendado Profissionais</span>
              <div className="pl-plan-name">Noxvelia PRO</div>
              <p className="pl-plan-desc">Desenhado para stands e agências imobiliárias maximizarem conversões.</p>
              <div className="pl-price">10,99€ <span>/mês (IVA inc.)</span></div>
              <ul className="pl-features">
                {featuresProfissional.map((f) => (
                  <li key={f}><CheckIcon />{f}</li>
                ))}
              </ul>

              {temAcessoProfissionalManual ? (
                <>
                  <button className="pl-btn pl-btn--outline-pro" disabled>
                    Plano PRO Ativo
                  </button>
                  <p className="pl-manual-note">
                    Acesso gerido diretamente pela administração Noxvelia.
                  </p>
                </>
              ) : user?.premiumAtivo ? (
                <button className="pl-btn pl-btn--outline-pro" onClick={abrirPortalCliente} disabled={loadingStripe}>
                  {loadingStripe ? <SpinnerIcon /> : 'Gerir Minha Subscrição'}
                </button>
              ) : (
                <button className="pl-btn pl-btn--primary" onClick={iniciarAssinatura} disabled={loadingStripe}>
                  {loadingStripe ? <SpinnerIcon /> : 'Ativar Plano PRO em Segurança'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* SECÇÃO DE CONFIANÇA TOTAL (Elimina o receio de pagar) */}
        <div className="pl-trust-section">
          <div className="pl-trust-item">
            <div className="pl-trust-icon">
              <LockClosedIcon />
            </div>
            <div className="pl-trust-content">
              <h4>Pagamento 100% Protegido</h4>
              <p>Processado com encriptação bancária de ponta a ponta através da infraestrutura global da Stripe.</p>
            </div>
          </div>

          <div className="pl-trust-item">
            <div className="pl-trust-icon">
              <RefreshIcon />
            </div>
            <div className="pl-trust-content">
              <h4>Flexibilidade Total</h4>
              <p>Cancele ou altere a sua subscrição de forma autónoma e imediata a qualquer momento no portal de cliente.</p>
            </div>
          </div>

          <div className="pl-trust-item">
            <div className="pl-trust-icon">
              <ShieldCheckIcon />
            </div>
            <div className="pl-trust-content">
              <h4>Garantia Sem Comissões</h4>
              <p>A Noxvelia não cobra qualquer comissão sobre a venda dos seus automóveis ou imóveis. O lucro é 100% seu.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}