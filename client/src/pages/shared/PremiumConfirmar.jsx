import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Icon } from '@mdi/react';
import { 
  mdiArrowLeft, mdiInfinity, mdiStarOutline, mdiChartLine, 
  mdiPencilOutline, mdiShieldCheckOutline, mdiHeadset, 
  mdiLockOutline, mdiCheck, mdiMinus, mdiCreditCardOutline,
  mdiInformationOutline, mdiSync, mdiShieldLockOutline
} from '@mdi/js';

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

  const beneficios = [
    { icon: mdiInfinity, titulo: 'Publicação Ilimitada', desc: 'Sem limites em carros e imóveis.' },
    { icon: mdiPencilOutline, titulo: 'Gestão Completa', desc: 'Edita informações e preços a qualquer momento.' },
    { icon: mdiStarOutline, titulo: 'Destaque Automático', desc: 'Prioridade máxima nos resultados de pesquisa.' },
    { icon: mdiShieldCheckOutline, titulo: 'Perfil Verificado', desc: 'Maior confiança para os teus compradores.' },
    { icon: mdiChartLine, titulo: 'Métricas de Desempenho', desc: 'Analisa visitas, favoritos e mensagens.' },
    { icon: mdiHeadset, titulo: 'Suporte Prioritário', desc: 'A nossa equipa pronta para te ajudar.' },
  ];

  return (
    <>
      <style>{`
        /* ── FUNDO E ESTRUTURA BASE ── */
        .pc-root { min-height: calc(100vh - 72px); background: #071326; color: #f8fafc; padding: 40px 24px 80px; font-family: 'Inter', sans-serif; display: flex; justify-content: center; }
        .pc-shell { width: 100%; max-width: 1200px; }
        
        .pc-back { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; text-decoration: none; cursor: pointer; background: none; border: none; padding: 0; margin-bottom: 40px; transition: color 0.2s; }
        .pc-back:hover { color: #fffaf0; }

        .pc-grid-layout { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 64px; align-items: start; }
        
        /* ── LADO ESQUERDO: VENDA ── */
        .pc-kicker { color: #d9c49c; font-size: 11px; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; display: block; margin-bottom: 12px; }
        .pc-title { margin: 0 0 16px; font-family: "Plus Jakarta Sans", sans-serif; font-size: clamp(32px, 4vw, 46px); line-height: 1.1; letter-spacing: -0.02em; font-weight: 900; color: #ffffff; }
        .pc-lead { margin: 0 0 40px; color: #94a3b8; font-size: 16px; line-height: 1.6; max-width: 600px; }
        
        .pc-alert { margin-bottom: 32px; padding: 16px 20px; border-radius: 12px; border: 1px solid rgba(245, 158, 11, 0.3); background: rgba(245, 158, 11, 0.1); color: #fcd34d; font-size: 14px; font-weight: 600; line-height: 1.5; display: flex; align-items: flex-start; gap: 12px; }
        
        /* Grelha de Benefícios */
        .pc-benefits-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px 24px; margin-bottom: 56px; }
        .pc-benefit-item { display: flex; gap: 16px; align-items: flex-start; }
        .pc-benefit-icon { width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(217, 196, 156, 0.3); background: rgba(217, 196, 156, 0.05); color: #d9c49c; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .pc-benefit-text h3 { margin: 0 0 6px; font-size: 15px; font-weight: 800; color: #ffffff; }
        .pc-benefit-text p { margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5; }

        /* Tabela de Comparação Minimalista */
        .pc-compare-title { font-size: 18px; font-weight: 800; color: #ffffff; margin-bottom: 20px; }
        .pc-table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
        .pc-table th, .pc-table td { padding: 16px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 13px; }
        .pc-table th { font-weight: 800; color: #ffffff; text-transform: uppercase; letter-spacing: 0.05em; font-size: 11px; }
        .pc-table th:first-child, .pc-table td:first-child { text-align: left; font-weight: 600; color: #cbd5e1; }
        .pc-table .highlight-col { background: rgba(217, 196, 156, 0.05); border-left: 1px solid rgba(217, 196, 156, 0.2); border-right: 1px solid rgba(217, 196, 156, 0.2); color: #d9c49c; font-weight: 800; }
        .pc-table th.highlight-col { background: rgba(217, 196, 156, 0.1); border-top: 1px solid rgba(217, 196, 156, 0.2); border-top-left-radius: 8px; border-top-right-radius: 8px; color: #d9c49c; }
        .pc-table tr:last-child td.highlight-col { border-bottom: 1px solid rgba(217, 196, 156, 0.2); border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; }

        /* Trust Strip Inferior */
        .pc-trust-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.08); }
        .pc-trust-item { display: flex; flex-direction: column; gap: 8px; }
        .pc-trust-item svg { color: #64748b; }
        .pc-trust-item strong { font-size: 13px; color: #e2e8f0; font-weight: 700; }
        .pc-trust-item p { margin: 0; font-size: 12px; color: #64748b; line-height: 1.4; }

        /* ── LADO DIREITO: TALÃO DE COMPRA ── */
        .pc-receipt-card { background: #101726; border-radius: 20px; border: 1px solid rgba(255,255,255,0.08); padding: 32px; position: sticky; top: 100px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
        
        .pc-receipt-head { border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 24px; margin-bottom: 24px; }
        .pc-receipt-kicker { font-size: 11px; font-weight: 800; color: #d9c49c; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 8px; }
        .pc-receipt-price { font-family: "Plus Jakarta Sans", sans-serif; font-size: 42px; font-weight: 900; color: #ffffff; line-height: 1; display: flex; align-items: baseline; gap: 6px; }
        .pc-receipt-price span { font-size: 14px; color: #64748b; font-weight: 600; font-family: 'Inter', sans-serif; }
        .pc-receipt-taxes { font-size: 12px; color: #64748b; margin-top: 8px; display: flex; align-items: center; gap: 6px; }

        .pc-receipt-user { display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 16px; border-radius: 12px; margin-bottom: 24px; }
        .pc-receipt-user-info strong { display: block; font-size: 13px; color: #e2e8f0; margin-bottom: 4px; }
        .pc-receipt-user-info span { font-size: 12px; color: #94a3b8; }
        .pc-user-avatar { width: 32px; height: 32px; border-radius: 50%; background: #1e293b; color: #94a3b8; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; }

        .pc-invoice-line { display: flex; justify-content: space-between; font-size: 14px; color: #cbd5e1; margin-bottom: 12px; }
        .pc-invoice-line.total { border-top: 1px dashed rgba(255,255,255,0.15); padding-top: 16px; margin-top: 16px; margin-bottom: 24px; font-size: 16px; font-weight: 800; color: #ffffff; }

        .pc-terms-box { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 24px; cursor: pointer; padding: 16px; border-radius: 12px; border: 1px solid rgba(217, 196, 156, 0.2); background: rgba(217, 196, 156, 0.03); transition: background 0.2s; }
        .pc-terms-box:hover { background: rgba(217, 196, 156, 0.08); }
        .pc-terms-box input[type="checkbox"] { width: 18px; height: 18px; margin-top: 2px; accent-color: #d9c49c; cursor: pointer; flex-shrink: 0; }
        .pc-terms-box p { margin: 0; font-size: 12px; line-height: 1.5; color: #cbd5e1; }
        .pc-terms-box p strong { color: #ffffff; font-weight: 700; }

        .pc-error { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #fca5a5; padding: 14px; border-radius: 10px; font-size: 13px; font-weight: 600; margin-bottom: 24px; text-align: center; }

        .pc-btn-pay { width: 100%; min-height: 56px; background: #d9c49c; color: #071326; border: none; border-radius: 12px; font-size: 15px; font-weight: 900; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: 0.2s; }
        .pc-btn-pay:hover:not(:disabled) { background: #f0dfbb; transform: translateY(-2px); box-shadow: 0 10px 25px -5px rgba(217, 196, 156, 0.4); }
        .pc-btn-pay:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
        
        .pc-secure-footer { margin-top: 24px; display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .pc-secure-note { display: flex; align-items: center; gap: 6px; color: #64748b; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
        .pc-payment-methods { display: flex; gap: 8px; opacity: 0.6; }
        .pc-payment-icon { padding: 4px 8px; background: #ffffff; border-radius: 4px; display: flex; align-items: center; justify-content: center; height: 24px; }

        @media (max-width: 1024px) {
          .pc-grid-layout { grid-template-columns: 1fr; gap: 40px; }
          .pc-receipt-card { position: static; }
          .pc-benefits-grid { grid-template-columns: 1fr; gap: 24px; }
          .pc-trust-strip { grid-template-columns: 1fr; gap: 20px; }
        }
        @media (max-width: 640px) {
          .pc-root { padding: 24px 16px 60px; }
          .pc-receipt-card { padding: 24px; }
          .pc-title { font-size: 28px; }
          .pc-table th, .pc-table td { padding: 12px 8px; font-size: 12px; }
        }
      `}</style>

      <div className="pc-root">
        <div className="pc-shell">
          
          <button type="button" className="pc-back" onClick={() => navigate('/planos')}>
            <Icon path={mdiArrowLeft} size={0.7} /> Voltar aos planos
          </button>

          <div className="pc-grid-layout">
            
            {/* LADO ESQUERDO: VENDA / BENEFÍCIOS */}
            <div className="pc-content">
              <span className="pc-kicker">Noxvelia PRO</span>
              <h1 className="pc-title">Leva o teu negócio para o próximo nível.</h1>
              <p className="pc-lead">
                Plano profissional desenhado para stands, agentes e particulares que querem máxima visibilidade, controlo e resultados imediatos.
              </p>

              {cancelado && (
                <div className="pc-alert">
                  <Icon path={mdiInformationOutline} size={1} />
                  <div>O pagamento foi cancelado ou falhou. Nada foi cobrado. Podes tentar novamente quando quiseres.</div>
                </div>
              )}

              <div className="pc-benefits-grid">
                {beneficios.map((item, idx) => (
                  <div className="pc-benefit-item" key={idx}>
                    <div className="pc-benefit-icon"><Icon path={item.icon} size={0.9} /></div>
                    <div className="pc-benefit-text">
                      <h3>{item.titulo}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="pc-compare-title">Compara os planos</h3>
              <table className="pc-table">
                <thead>
                  <tr>
                    <th>Funcionalidades</th>
                    <th>Gratuito</th>
                    <th className="highlight-col">PRO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Número de anúncios</td>
                    <td>Até 5</td>
                    <td className="highlight-col">Ilimitados</td>
                  </tr>
                  <tr>
                    <td>Destaque automático</td>
                    <td><Icon path={mdiMinus} size={0.8} color="#64748b" /></td>
                    <td className="highlight-col"><Icon path={mdiCheck} size={0.9} /></td>
                  </tr>
                  <tr>
                    <td>Edição de anúncios</td>
                    <td>Limitada</td>
                    <td className="highlight-col">Total</td>
                  </tr>
                  <tr>
                    <td>Métricas de desempenho</td>
                    <td><Icon path={mdiMinus} size={0.8} color="#64748b" /></td>
                    <td className="highlight-col"><Icon path={mdiCheck} size={0.9} /></td>
                  </tr>
                </tbody>
              </table>

              <div className="pc-trust-strip">
                <div className="pc-trust-item">
                  <Icon path={mdiShieldLockOutline} size={1} />
                  <strong>Pagamento Seguro</strong>
                  <p>Dados protegidos com encriptação pela Stripe.</p>
                </div>
                <div className="pc-trust-item">
                  <Icon path={mdiSync} size={1} />
                  <strong>Sem Fidelização</strong>
                  <p>Cancela a renovação automática a qualquer momento.</p>
                </div>
                <div className="pc-trust-item">
                  <Icon path={mdiHeadset} size={1} />
                  <strong>Suporte Direto</strong>
                  <p>A equipa Noxvelia pronta a ajudar o teu negócio.</p>
                </div>
              </div>
            </div>

            {/* LADO DIREITO: CHECKOUT (TALÃO) */}
            <aside className="pc-receipt-card">
              <div className="pc-receipt-head">
                <span className="pc-receipt-kicker">Subscrição Mensal</span>
                <div className="pc-receipt-price">
                  10,99€ <span>/mês</span>
                </div>
                <div className="pc-receipt-taxes">
                  <Icon path={mdiCheck} size={0.6} color="#d9c49c" /> IVA incluído à taxa legal em vigor.
                </div>
              </div>

              <div className="pc-receipt-user">
                <div className="pc-receipt-user-info">
                  <strong>Conta Associada</strong>
                  <span>{user?.email || 'Sessão iniciada'}</span>
                </div>
                <div className="pc-user-avatar">
                  {user?.nome ? user.nome.charAt(0).toUpperCase() : 'U'}
                </div>
              </div>

              <div className="pc-invoice-line">
                <span>Noxvelia PRO (mensal)</span>
                <span>10,99€</span>
              </div>
              <div className="pc-invoice-line total">
                <span>Total a pagar hoje</span>
                <span>10,99€</span>
              </div>

              <label className="pc-terms-box">
                <input type="checkbox" checked={aceitou} onChange={(event) => setAceitou(event.target.checked)} />
                <p>
                  Aceito a renovação automática mensal. Compreendo que posso cancelar a qualquer momento nas definições, mantendo os benefícios até ao fim do período pago.
                </p>
              </label>

              {erro && <div className="pc-error">{erro}</div>}

              <button type="button" className="pc-btn-pay" onClick={continuarParaStripe} disabled={!aceitou || loading}>
                <Icon path={mdiLockOutline} size={0.9} />
                {loading ? 'A redirecionar...' : 'Pagar 10,99€ com Segurança'}
              </button>
              
              <div className="pc-secure-footer">
                <div className="pc-secure-note">
                  Pagamento processado de forma segura pela Stripe
                </div>
                {/* Ícones meramente ilustrativos para confiança visual */}
                <div className="pc-payment-methods">
                  <div className="pc-payment-icon"><Icon path={mdiCreditCardOutline} size={1} color="#0f172a" /></div>
                  <div className="pc-payment-icon" style={{color: '#0f172a', fontWeight: 900, fontSize: 10, fontStyle: 'italic'}}>VISA</div>
                  <div className="pc-payment-icon" style={{color: '#0f172a', fontWeight: 900, fontSize: 10, fontStyle: 'italic'}}>MC</div>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </>
  );
}