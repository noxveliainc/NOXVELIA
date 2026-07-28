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

export default function Planos() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { sincronizarUser, user } = useAuth();
  const [loadingStripe, setLoadingStripe] = useState(false);
  const [aSincronizar, setASincronizar] = useState(false);
  const temSubscricaoStripe = Boolean(user?.stripeCustomerId || user?.stripeSubscriptionId);
  const temAcessoProfissionalManual = Boolean(user?.premiumAtivo && !temSubscricaoStripe);

  // Quando o Stripe devolve com sucesso, sincroniza o estado premium
  useEffect(() => {
    const resultado = searchParams.get('premium');
    if (resultado === 'sucesso') {
      setASincronizar(true);
      sincronizarUser().finally(() => setASincronizar(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    const idUtilizador = user?._id || user?.id;
    if (!idUtilizador) return;

    let ativo = true;
    setASincronizar(true);
    sincronizarUser().finally(() => {
      if (ativo) setASincronizar(false);
    });

    return () => { ativo = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id, user?.id]);

  const iniciarAssinatura = () => {
    navigate('/premium-confirmar');
  };

  // Abre o Billing Portal da Stripe para quem já é Premium gerir a subscrição
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
    'Até 3 anúncios ativos',
    'Suporte base por email',
  ];

  const featuresProfissional = [
    'Anúncios ilimitados em carros e imóveis',
    'Destaque automático nos anúncios publicados',
    'Prioridade nos resultados de pesquisa',
    'Montra pública com contactos, links e mapa opcional',
    'Painel Premium com métricas da tua carteira',
    'Edição de anúncios ativos depois de publicados',
    'Regras claras: se cancelares, os anúncios ativos continuam online',
  ];

  const premiumHighlights = [
    { title: 'Mais visibilidade', text: 'Os anúncios do plano Premium aparecem com prioridade e sinalização própria.' },
    { title: 'Montra completa', text: 'Perfil público preparado para stands, mediadores e vendedores ativos.' },
    { title: 'Leitura rápida', text: 'Métricas simples para perceber visitas, contactos e qualidade dos anúncios.' },
    { title: 'Sem surpresas', text: 'Antes do pagamento mostramos exatamente o que acontece se cancelares.' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        .pl-root {
          font-family: 'Inter', sans-serif;
          background: #ffffff;
          color: #0f172a;
          height: auto;
          box-sizing: border-box;
          padding: 48px 24px 60px;
        }

        .pl-header {
          max-width: 640px;
          margin: 0 auto 36px;
          text-align: center;
        }
        .pl-eyebrow {
          font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em;
          color: #64748b; margin-bottom: 8px; display: block;
        }
        .pl-header h1 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(28px, 3.5vw, 38px);
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 8px;
          margin-top: 0;
        }
        .pl-header p {
          font-size: 14.5px;
          color: #64748b;
          line-height: 1.5;
          margin: 0;
        }

        .pl-sync {
          text-align: center;
          font-size: 13px;
          font-weight: 600;
          color: #d9c49c;
          margin-bottom: 20px;
        }

        .pl-grid {
          max-width: 780px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: stretch;
        }
        .pl-premium-strip {
          max-width: 780px;
          margin: 0 auto 24px;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }
        .pl-premium-note {
          min-height: 118px;
          border: 1px solid rgba(217, 196, 156, 0.42);
          border-radius: 16px;
          padding: 18px;
          background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(217,196,156,0.08));
        }
        .pl-premium-note strong {
          display: block;
          color: #102f50;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px;
          margin-bottom: 8px;
        }
        .pl-premium-note span {
          display: block;
          color: #64748b;
          font-size: 12.5px;
          line-height: 1.5;
          font-weight: 650;
        }

        .pl-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 32px 24px 24px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 25px -8px rgba(15, 23, 42, 0.06);
          position: relative;
          box-sizing: border-box;
        }

        .pl-card--pro {
          border-color: #cbd5e1;
          overflow: hidden;
        }
        .pl-card--pro::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #102f50, #d9c49c);
        }

        .pl-badge {
          display: inline-block;
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #0f172a;
          background: #fffaf0;
          border: 1px solid rgba(217,196,156,.38);
          padding: 4px 10px;
          border-radius: 100px;
          margin-bottom: 14px;
          width: fit-content;
        }
        .pl-badge--active {
          background: rgba(217, 196, 156, 0.18);
          border-color: rgba(217, 196, 156, 0.48);
          color: #102f50;
        }

        .pl-plan-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 17px;
          font-weight: 800;
          margin-bottom: 4px;
        }

        .pl-plan-desc {
          font-size: 13px;
          color: #64748b;
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .pl-price {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        .pl-price span {
          font-family: 'Inter', sans-serif;
          font-size: 12.5px;
          font-weight: 500;
          color: #64748b;
        }

        .pl-features {
          list-style: none;
          padding: 0;
          margin: 0 0 24px;
          flex: 1;
        }
        .pl-features li {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          font-size: 13px;
          color: #334155;
          line-height: 1.45;
          margin-bottom: 10px;
        }
        .pl-features svg {
          width: 15px; height: 15px;
          flex-shrink: 0;
          margin-top: 1px;
          color: #d9c49c;
        }
        .pl-card:not(.pl-card--pro) .pl-features svg { color: #94a3b8; }

        .pl-btn {
          width: 100%;
          padding: 13px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid transparent;
          transition: filter 0.2s, background 0.2s, color 0.2s;
          box-sizing: border-box;
        }
        .pl-btn:disabled { opacity: 0.7; cursor: default; }
        .pl-btn--manual:disabled { opacity: 1; }

        .pl-btn--ghost {
          background: transparent;
          border-color: #e2e8f0;
          color: #0f172a;
        }
        .pl-btn--ghost:hover { background: #f8fafc; }

        .pl-btn--dark {
          background: #0f172a;
          color: #ffffff;
        }
        .pl-btn--dark:hover { filter: brightness(1.15); }

        .pl-btn--outline-pro {
          background: transparent;
          border-color: #d9c49c;
          color: #102f50;
        }
        .pl-btn--outline-pro:hover { background: #fffaf0; }

        .pl-spinner {
          width: 16px; height: 16px;
          animation: pl-spin 0.8s linear infinite;
        }
        @keyframes pl-spin { to { transform: rotate(360deg); } }

        .pl-note {
          max-width: 780px;
          margin: 20px auto 0;
          text-align: center;
          font-size: 12px;
          color: #94a3b8;
        }
        .pl-manual-note {
          margin: 10px 0 0;
          color: #64748b;
          font-size: 12px;
          line-height: 1.45;
        }

        @media (max-width: 720px) {
          .pl-grid { grid-template-columns: 1fr; max-width: 380px; }
          .pl-premium-strip { grid-template-columns: 1fr; max-width: 380px; }
        }
      `}</style>

      <div className="pl-root">
        <div className="pl-header">
          <span className="pl-eyebrow">Planos</span>
          <h1>Escolhe como queres vender</h1>
          <p>Publica com mais visibilidade e menos limites em carros e imóveis.</p>
        </div>

        {aSincronizar && (
          <p className="pl-sync">A confirmar o teu pagamento...</p>
        )}
        <div className="pl-premium-strip">
          {premiumHighlights.map((item) => (
            <div className="pl-premium-note" key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        <div className="pl-grid">
          {/* PLANO GRATUITO */}
          <div className="pl-card">
            <span className="pl-badge">Particular</span>
            <div className="pl-plan-name">Para quem vende pontualmente</div>
            <p className="pl-plan-desc">Ideal para colocar um imóvel ou um automóvel à venda, sem compromisso.</p>
            <div className="pl-price">Gratuito</div>
            <ul className="pl-features">
              {featuresParticular.map((f) => (
                <li key={f}><CheckIcon />{f}</li>
              ))}
            </ul>
            <button className="pl-btn pl-btn--ghost" onClick={() => navigate('/perfil')}>
              Ir para o meu Perfil
            </button>
          </div>

          {/* PLANO PREMIUM */}
          <div className="pl-card pl-card--pro">
            <span className={`pl-badge ${user?.premiumAtivo ? 'pl-badge--active' : ''}`}>
              {user?.premiumAtivo ? 'O teu plano atual' : 'Mais escolhido'}
            </span>
            <div className="pl-plan-name">Premium</div>
            <p className="pl-plan-desc">Para stands e imobiliárias que operam nos dois mundos NOXVELIA.</p>
            <div className="pl-price">10.99€ <span>/mês</span></div>
            <ul className="pl-features">
              {featuresProfissional.map((f) => (
                <li key={f}><CheckIcon />{f}</li>
              ))}
            </ul>

            {temAcessoProfissionalManual ? (
              <>
                <button className="pl-btn pl-btn--outline-pro pl-btn--manual" disabled>
                  Plano Premium ativo
                </button>
                <p className="pl-manual-note">
                  Este acesso foi atribuído pela administração e não tem portal de faturação Stripe.
                </p>
              </>
            ) : user?.premiumAtivo ? (
              <button className="pl-btn pl-btn--outline-pro" onClick={abrirPortalCliente} disabled={loadingStripe}>
                {loadingStripe ? <SpinnerIcon /> : 'Gerir a Minha Subscrição'}
              </button>
            ) : (
              <button className="pl-btn pl-btn--dark" onClick={iniciarAssinatura} disabled={loadingStripe}>
                Ver detalhes e aderir
              </button>
            )}
          </div>
        </div>

        <p className="pl-note">Podes cancelar a qualquer momento através do portal de gestão da subscrição.</p>
      </div>
    </>
  );
}
