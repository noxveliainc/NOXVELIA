import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#d9c49c" strokeWidth="3" aria-hidden="true" style={{ width: 20, height: 20, flexShrink: 0, marginTop: 2 }}>
    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ width: 16, height: 16 }}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function PROConfirmar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [aceitou, setAceitou] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const cancelado = searchParams.get('premium') === 'cancelado';

  const continuarParaStripe = async () => {
    if (!aceitou || loading) return;
    setLoading(true);
    setErro('');

    try {
      const res = await api.post('/stripe/criar-checkout-premium', { aceitouTermosPremium: true });
      if (res.data?.url) {
        window.location.href = res.data.url;
        return;
      }
      setErro('Não foi possível abrir o pagamento seguro. Tenta novamente.');
    } catch (error) {
      setErro(error.response?.data?.erro || 'Erro ao iniciar pagamento. Tenta novamente.');
    } finally {
      setLoading(false);
    }
  };

  const beneficiosDetalhados = [
    {
      titulo: 'Publicação Ilimitada',
      desc: 'Esquece o limite de 5 anúncios gratuitos. Publica toda a tua carteira de imóveis e automóveis sem restrições.'
    },
    {
      titulo: 'Destaque Automático de Catálogo',
      desc: 'Todos os teus anúncios recebem a insígnia PRO, gerando mais confiança e obtendo prioridade face a particulares.'
    },
    {
      titulo: 'Gestão Flexível e Edição',
      desc: 'Os utilizadores gratuitos não podem editar anúncios ativos. Tu terás controlo total para alterar preços e dados a qualquer momento.'
    },
    {
      titulo: 'Métricas de Performance PRO',
      desc: 'Descobre o que funciona. Acede a um painel detalhado com o número de visitas, vezes guardado nos favoritos e mensagens recebidas por anúncio.'
    },
  ];

  return (
    <>
      <style>{`
        .pc-root { min-height: calc(100vh - 72px); background: #f8fafc; color: #0f172a; padding: 60px 24px; font-family: 'Inter', sans-serif; display: flex; justify-content: center; }
        .pc-shell { width: 100%; max-width: 1100px; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 60px; align-items: start; }
        
        .pc-back { border: 0; background: transparent; color: #64748b; font-size: 12px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; cursor: pointer; padding: 0; margin-bottom: 32px; transition: color 0.2s; display: inline-flex; align-items: center; gap: 6px; }
        .pc-back:hover { color: #0f172a; }
        
        .pc-title { margin: 0 0 12px; font-family: "Plus Jakarta Sans", sans-serif; font-size: clamp(32px, 4vw, 46px); line-height: 1.1; letter-spacing: -0.02em; font-weight: 900; color: #071326; }
        .pc-lead { margin: 0 0 40px; color: #475569; font-size: 16px; line-height: 1.6; }
        
        .pc-alert { margin-bottom: 32px; padding: 16px 20px; border-radius: 12px; border: 1px solid #fde68a; background: #fffbeb; color: #b45309; font-size: 14px; font-weight: 700; line-height: 1.5; display: flex; align-items: center; gap: 12px; }
        
        .pc-benefits-list { display: flex; flex-direction: column; gap: 24px; }
        .pc-benefit-item { display: flex; gap: 16px; align-items: flex-start; }
        .pc-benefit-icon { width: 32px; height: 32px; border-radius: 50%; background: #071326; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .pc-benefit-text h3 { margin: 0 0 4px; font-size: 16px; font-weight: 800; color: #0f172a; }
        .pc-benefit-text p { margin: 0; font-size: 14px; color: #475569; line-height: 1.5; }

        /* ── O TALÃO DE PAGAMENTO (DIREITA) ── */
        .pc-checkout-card { background: #071326; border-radius: 24px; padding: 40px; color: #fffaf0; box-shadow: 0 25px 50px -12px rgba(7, 19, 38, 0.4); border: 1px solid rgba(217, 196, 156, 0.2); position: sticky; top: 100px; }
        
        .pc-plan-kicker { display: inline-block; color: #d9c49c; font-size: 11px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 12px; }
        .pc-price-wrap { display: flex; align-items: baseline; gap: 8px; margin-bottom: 16px; padding-bottom: 24px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
        .pc-price-wrap strong { font-family: "Plus Jakarta Sans", sans-serif; font-size: 48px; line-height: 1; font-weight: 900; color: #ffffff; }
        .pc-price-wrap span { font-size: 16px; color: #94a3b8; font-weight: 600; }
        
        .pc-user-box { background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 16px; margin-bottom: 24px; }
        .pc-user-box strong { display: block; font-size: 14px; color: #ffffff; margin-bottom: 4px; }
        .pc-user-box span { font-size: 13px; color: #94a3b8; }

        .pc-terms-box { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 32px; cursor: pointer; }
        .pc-terms-box input[type="checkbox"] { width: 20px; height: 20px; margin-top: 2px; accent-color: #d9c49c; cursor: pointer; flex-shrink: 0; }
        .pc-terms-box p { margin: 0; font-size: 13px; line-height: 1.5; color: rgba(255, 255, 255, 0.7); }
        .pc-terms-box p strong { color: #ffffff; font-weight: 700; }

        .pc-error { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #fca5a5; padding: 14px; border-radius: 10px; font-size: 13px; font-weight: 600; margin-bottom: 24px; text-align: center; }

        .pc-btn-pay { width: 100%; min-height: 54px; background: #d9c49c; color: #071326; border: none; border-radius: 12px; font-size: 15px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: 0.2s; box-shadow: 0 8px 20px -8px rgba(217, 196, 156, 0.6); }
        .pc-btn-pay:hover:not(:disabled) { background: #f0dfbb; transform: translateY(-2px); box-shadow: 0 12px 25px -8px rgba(217, 196, 156, 0.8); }
        .pc-btn-pay:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
        
        .pc-secure-note { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 16px; color: #64748b; font-size: 12px; font-weight: 600; }

        @media (max-width: 960px) {
          .pc-shell { grid-template-columns: 1fr; gap: 40px; }
          .pc-checkout-card { position: static; padding: 32px 24px; }
          .pc-root { padding: 40px 16px; }
        }
      `}</style>

      <div className="pc-root">
        <div className="pc-shell">
          
          {/* LADO ESQUERDO: VENDA / BENEFÍCIOS */}
          <div className="pc-content">
            <button type="button" className="pc-back" onClick={() => navigate('/planos')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
              Voltar aos planos
            </button>

            <h1 className="pc-title">Atualizar para PRO</h1>
            <p className="pc-lead">
              A subscrição essencial para stands e agentes que operam nos mercados automóvel e imobiliário. Revê os benefícios da tua conta.
            </p>

            {cancelado && (
              <div className="pc-alert">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
                O pagamento foi cancelado ou falhou. Nada foi cobrado. Podes tentar novamente quando quiseres.
              </div>
            )}

            <div className="pc-benefits-list">
              {beneficiosDetalhados.map((item, idx) => (
                <div className="pc-benefit-item" key={idx}>
                  <div className="pc-benefit-icon"><CheckIcon /></div>
                  <div className="pc-benefit-text">
                    <h3>{item.titulo}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LADO DIREITO: CHECKOUT SECURE */}
          <aside className="pc-checkout-card">
            <span className="pc-plan-kicker">Subscrição Mensal</span>
            <div className="pc-price-wrap">
              <strong>10,99€</strong>
              <span>/mês</span>
            </div>

            <div className="pc-user-box">
              <strong>Conta Associada</strong>
              <span>{user?.nome || 'Utilizador'} ({user?.email || 'Sessão iniciada'})</span>
            </div>

            <label className="pc-terms-box">
              <input type="checkbox" checked={aceitou} onChange={(event) => setAceitou(event.target.checked)} />
              <p>
                Compreendo que a subscrição é <strong>renovada mensalmente</strong> e que, em caso de cancelamento, os benefícios PRO e os anúncios acima do limite gratuito serão suspensos no final do ciclo.
              </p>
            </label>

            {erro && <div className="pc-error">{erro}</div>}

            <button type="button" className="pc-btn-pay" onClick={continuarParaStripe} disabled={!aceitou || loading}>
              <LockIcon />
              {loading ? 'A processar...' : 'Pagar com Segurança'}
            </button>
            
            <div className="pc-secure-note">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Pagamento encriptado e processado pela Stripe
            </div>
          </aside>

        </div>
      </div>
    </>
  );
}