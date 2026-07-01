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

  // Quando o Stripe devolve com sucesso, sincroniza o estado premium
  useEffect(() => {
    const resultado = searchParams.get('premium');
    if (resultado === 'sucesso') {
      setASincronizar(true);
      sincronizarUser().finally(() => setASincronizar(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const iniciarAssinatura = async () => {
    setLoadingStripe(true);
    try {
      const res = await api.post('/stripe/criar-checkout-premium');
      if (res.data && res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      alert('Erro ao iniciar pagamento. Tenta novamente.');
      setLoadingStripe(false);
    }
  };

  // Abre o Billing Portal da Stripe para quem já é Premium gerir a subscrição
  const abrirPortalCliente = async () => {
    setLoadingStripe(true);
    try {
      const res = await api.post('/stripe/criar-portal-cliente');
      if (res.data && res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      alert('Erro ao abrir o portal de gestão. Tenta novamente.');
      setLoadingStripe(false);
    }
  };

  const featuresParticular = [
    'Até 10 anúncios simultâneos',
    'Suporte base por email',
  ];

  const featuresProfissional = [
    'Anúncios ilimitados em Estate e Drive',
    'Selo de Vendedor Verificado',
    'Destaque prioritário nos resultados de pesquisa',
    'Gestor de conta dedicado',
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        .pl-root {
          font-family: 'Inter', sans-serif;
          background: #ffffff;
          color: #0f172a;
          min-height: calc(100vh - 72px);
          padding: 90px 24px 100px;
        }

        .pl-header {
          max-width: 640px;
          margin: 0 auto 64px;
          text-align: center;
        }
        .pl-eyebrow {
          font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em;
          color: #64748b; margin-bottom: 16px; display: block;
        }
        .pl-header h1 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(32px, 4vw, 44px);
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 16px;
        }
        .pl-header p {
          font-size: 16px;
          color: #64748b;
          line-height: 1.6;
        }

        .pl-sync {
          text-align: center;
          font-size: 13px;
          font-weight: 600;
          color: #2ac1b4;
          margin-bottom: 32px;
        }

        .pl-grid {
          max-width: 780px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          align-items: stretch;
        }

        .pl-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 40px 32px 32px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 25px -8px rgba(15, 23, 42, 0.06);
          position: relative;
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
          background: linear-gradient(90deg, #3ecf8e, #2ac1b4);
        }

        .pl-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #0f172a;
          background: #f0fdf9;
          border: 1px solid #ccf3e6;
          padding: 5px 12px;
          border-radius: 100px;
          margin-bottom: 20px;
          width: fit-content;
        }
        .pl-badge--active {
          background: #f0fdf4;
          border-color: #bbf7d0;
          color: #15803d;
        }

        .pl-plan-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .pl-plan-desc {
          font-size: 14px;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 28px;
        }

        .pl-price {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 40px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 28px;
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        .pl-price span {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #64748b;
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
          gap: 10px;
          font-size: 14px;
          color: #334155;
          line-height: 1.5;
          margin-bottom: 14px;
        }
        .pl-features svg {
          width: 16px; height: 16px;
          flex-shrink: 0;
          margin-top: 2px;
          color: #2ac1b4;
        }
        .pl-card:not(.pl-card--pro) .pl-features svg { color: #94a3b8; }

        .pl-btn {
          width: 100%;
          padding: 15px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid transparent;
          transition: filter 0.2s, background 0.2s, color 0.2s;
        }
        .pl-btn:disabled { opacity: 0.7; cursor: default; }

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
          border-color: #2ac1b4;
          color: #0f766e;
        }
        .pl-btn--outline-pro:hover { background: #f0fdfa; }

        .pl-spinner {
          width: 16px; height: 16px;
          animation: pl-spin 0.8s linear infinite;
        }
        @keyframes pl-spin { to { transform: rotate(360deg); } }

        .pl-note {
          max-width: 780px;
          margin: 28px auto 0;
          text-align: center;
          font-size: 13px;
          color: #94a3b8;
        }

        @media (max-width: 720px) {
          .pl-grid { grid-template-columns: 1fr; max-width: 380px; }
        }
      `}</style>

      <div className="pl-root">
        <div className="pl-header">
          <span className="pl-eyebrow">Planos</span>
          <h1>Escolhe o teu estatuto</h1>
          <p>Eleva a tua presença na NOXVELIA e publica sem limites em Estate e Drive.</p>
        </div>

        {aSincronizar && (
          <p className="pl-sync">A confirmar o teu pagamento...</p>
        )}

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
            <div className="pl-plan-name">Profissional</div>
            <p className="pl-plan-desc">Para stands e imobiliárias que operam nos dois mundos NOXVELIA.</p>
            <div className="pl-price">10.99€ <span>/mês</span></div>
            <ul className="pl-features">
              {featuresProfissional.map((f) => (
                <li key={f}><CheckIcon />{f}</li>
              ))}
            </ul>

            {user?.premiumAtivo ? (
              <button className="pl-btn pl-btn--outline-pro" onClick={abrirPortalCliente} disabled={loadingStripe}>
                {loadingStripe ? <SpinnerIcon /> : 'Gerir a Minha Subscrição'}
              </button>
            ) : (
              <button className="pl-btn pl-btn--dark" onClick={iniciarAssinatura} disabled={loadingStripe}>
                {loadingStripe ? <SpinnerIcon /> : 'Aderir ao Profissional'}
              </button>
            )}
          </div>
        </div>

        <p className="pl-note">Podes cancelar a qualquer momento através do portal de gestão da subscrição.</p>
      </div>
    </>
  );
}