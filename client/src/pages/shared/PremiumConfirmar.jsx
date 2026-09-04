import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Seo from '../../components/Seo';
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
      setErro('Não foi possível abrir o pagamento seguro. Tente novamente.');
    } catch (error) {
      setErro(error.response?.data?.erro || 'Erro ao iniciar pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const beneficios = [
    { icon: mdiInfinity, titulo: 'Publicação Ilimitada', desc: 'Sem restrições de stock em carros e imóveis.' },
    { icon: mdiPencilOutline, titulo: 'Gestão Completa', desc: 'Edite informações e preços a qualquer momento com autonomia total.' },
    { icon: mdiStarOutline, titulo: 'Destaque Automático', desc: 'Prioridade máxima garantida nos resultados de pesquisa.' },
    { icon: mdiShieldCheckOutline, titulo: 'Perfil Verificado', desc: 'Selo oficial que gera máxima confiança junto dos compradores.' },
    { icon: mdiChartLine, titulo: 'Métricas de Desempenho', desc: 'Acompanhe visitas, cliques e contactos detalhados em tempo real.' },
    { icon: mdiHeadset, titulo: 'Suporte Prioritário', desc: 'A nossa equipa de assistência dedicada pronta a apoiar o seu negócio.' },
  ];

  return (
    <>
      <Seo 
        title="Confirmar Subscrição Noxvelia PRO | Segurança & Transparência" 
        description="Confirme a sua adesão ao plano Noxvelia PRO. Pagamento 100% encriptado e processado via Stripe, sem comissões por venda." 
        path="/premium-confirmar" 
      />

      <style>{`
        .pc-root { 
          min-height: calc(100vh - 72px); 
          background: #071326; 
          color: #f8fafc; 
          padding: 48px 24px 80px; 
          font-family: 'Inter', sans-serif; 
          display: flex; 
          justify-content: center; 
          box-sizing: border-box;
        }
        .pc-shell { width: 100%; max-width: 1200px; }
        
        .pc-back { 
          display: inline-flex; 
          align-items: center; 
          gap: 8px; 
          font-size: 11.5px; 
          font-weight: 800; 
          text-transform: uppercase; 
          letter-spacing: 0.08em; 
          color: #94a3b8; 
          text-decoration: none; 
          cursor: pointer; 
          background: none; 
          border: none; 
          padding: 0; 
          margin-bottom: 36px; 
          transition: color 0.2s; 
        }
        .pc-back:hover { color: #d9c49c; }

        .pc-grid-layout { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 48px; align-items: start; }
        
        .pc-kicker { color: #d9c49c; font-size: 11px; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; display: block; margin-bottom: 12px; }
        .pc-title { margin: 0 0 16px; font-family: "Plus Jakarta Sans", sans-serif; font-size: clamp(30px, 4vw, 42px); line-height: 1.15; letter-spacing: -0.02em; font-weight: 900; color: #ffffff; }
        .pc-lead { margin: 0 0 36px; color: #94a3b8; font-size: 15.5px; line-height: 1.6; max-width: 580px; }
        
        .pc-alert { margin-bottom: 32px; padding: 16px 20px; border-radius: 12px; border: 1px solid rgba(245, 158, 11, 0.3); background: rgba(245, 158, 11, 0.1); color: #fcd34d; font-size: 13.5px; font-weight: 600; line-height: 1.5; display: flex; align-items: flex-start; gap: 12px; }
        
        /* Grelha de Benefícios */
        .pc-benefits-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px 24px; margin-bottom: 48px; }
        .pc-benefit-item { display: flex; gap: 16px; align-items: flex-start; }
        .pc-benefit-icon { width: 42px; height: 42px; border-radius: 12px; border: 1px solid rgba(217, 196, 156, 0.3); background: rgba(217, 196, 156, 0.08); color: #d9c49c; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .pc-benefit-text h3 { margin: 0 0 4px; font-size: 14.5px; font-weight: 800; color: #ffffff; }
        .pc-benefit-text p { margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5; }

        /* Tabela de Comparação Minimalista */
        .pc-compare-title { font-size: 17px; font-weight: 800; color: #ffffff; margin-bottom: 16px; }
        .pc-table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
        .pc-table th, .pc-table td { padding: 14px 16px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 13px; }
        .pc-table th { font-weight: 800; color: #ffffff; text-transform: uppercase; letter-spacing: 0.05em; font-size: 11px; }
        .pc-table th:first-child, .pc-table td:first-child { text-align: left; font-weight: 600; color: #cbd5e1; }
        .pc-table .highlight-col { background: rgba(217, 196, 156, 0.06); border-left: 1px solid rgba(217, 196, 156, 0.2); border-right: 1px solid rgba(217, 196, 156, 0.2); color: #d9c49c; font-weight: 800; }
        .pc-table th.highlight-col { background: rgba(217, 196, 156, 0.12); border-top: 1px solid rgba(217, 196, 156, 0.2); border-top-left-radius: 8px; border-top-right-radius: 8px; color: #d9c49c; }
        .pc-table tr:last-child td.highlight-col { border-bottom: 1px solid rgba(217, 196, 156, 0.2); border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; }

        /* Trust Strip Inferior */
        .pc-trust-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; padding-top: 28px; border-top: 1px solid rgba(255,255,255,0.08); }
        .pc-trust-item { display: flex; flex-direction: column; gap: 6px; }
        .pc-trust-item svg { color: #d9c49c; }
        .pc-trust-item strong { font-size: 13px; color: #ffffff; font-weight: 700; }
        .pc-trust-item p { margin: 0; font-size: 11.5px; color: #94a3b8; line-height: 1.4; }

        /* ── LADO DIREITO: TALÃO DE COMPRA ── */
        .pc-receipt-card { background: #0f172a; border-radius: 20px; border: 1px solid rgba(217, 196, 156, 0.25); padding: 32px; position: sticky; top: 92px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.6); }
        
        .pc-receipt-head { border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 24px; margin-bottom: 24px; }
        .pc-receipt-kicker { font-size: 11px; font-weight: 800; color: #d9c49c; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 8px; }
        .pc-receipt-price { font-family: "Plus Jakarta Sans", sans-serif; font-size: 40px; font-weight: 900; color: #ffffff; line-height: 1; display: flex; align-items: baseline; gap: 6px; }
        .pc-receipt-price span { font-size: 13.5px; color: #94a3b8; font-weight: 600; font-family: 'Inter', sans-serif; }
        .pc-receipt-taxes { font-size: 12px; color: #94a3b8; margin-top: 8px; display: flex; align-items: center; gap: 6px; }

        .pc-receipt-user { display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); padding: 14px 16px; border-radius: 12px; margin-bottom: 24px; }
        .pc-receipt-user-info strong { display: block; font-size: 13px; color: #ffffff; margin-bottom: 2px; }
        .pc-receipt-user-info span { font-size: 12px; color: #94a3b8; word-break: break-all; }
        .pc-user-avatar { width: 34px; height: 34px; border-radius: 50%; background: #1e293b; color: #d9c49c; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 800; flex-shrink: 0; }

        .pc-invoice-line { display: flex; justify-content: space-between; font-size: 13.5px; color: #cbd5e1; margin-bottom: 12px; }
        .pc-invoice-line.total { border-top: 1px dashed rgba(255,255,255,0.15); padding-top: 16px; margin-top: 16px; margin-bottom: 24px; font-size: 16px; font-weight: 800; color: #ffffff; }

        .pc-terms-box { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 24px; cursor: pointer; padding: 16px; border-radius: 12px; border: 1px solid rgba(217, 196, 156, 0.25); background: rgba(217, 196, 156, 0.04); transition: background 0.2s; }
        .pc-terms-box:hover { background: rgba(217, 196, 156, 0.08); }
        .pc-terms-box input[type="checkbox"] { width: 18px; height: 18px; margin-top: 2px; accent-color: #d9c49c; cursor: pointer; flex-shrink: 0; }
        .pc-terms-box p { margin: 0; font-size: 12px; line-height: 1.5; color: #cbd5e1; }
        .pc-terms-box p strong { color: #ffffff; font-weight: 700; }

        .pc-error { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #fca5a5; padding: 12px 16px; border-radius: 10px; font-size: 13px; font-weight: 600; margin-bottom: 20px; text-align: center; }

        .pc-btn-pay { width: 100%; min-height: 52px; background: #d9c49c; color: #071326; border: none; border-radius: 12px; font-size: 15px; font-weight: 900; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s ease; box-shadow: 0 4px 15px rgba(217, 196, 156, 0.3); }
        .pc-btn-pay:hover:not(:disabled) { background: #f0dfbb; transform: translateY(-2px); box-shadow: 0 8px 25px rgba(217, 196, 156, 0.5); }
        .pc-btn-pay:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
        
        .pc-secure-footer { margin-top: 20px; display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .pc-secure-note { display: flex; align-items: center; gap: 6px; color: #94a3b8; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
        .pc-payment-methods { display: flex; gap: 8px; opacity: 0.7; }
        .pc-payment-icon { padding: 4px 8px; background: #ffffff; border-radius: 4px; display: flex; align-items: center; justify-content: center; height: 22px; color: #071326; font-weight: 900; font-size: 10px; }

        @media (max-width: 1024px) {
          .pc-grid-layout { grid-template-columns: 1fr; gap: 40px; }
          .pc-receipt-card { position: static; }
          .pc-benefits-grid { grid-template-columns: 1fr; gap: 20px; }
          .pc-trust-strip { grid-template-columns: 1fr; gap: 16px; }
        }
        @media (max-width: 640px) {
          .pc-root { padding: 24px 16px 60px; }
          .pc-receipt-card { padding: 24px; }
          .pc-title { font-size: 26px; }
          .pc-table th, .pc-table td { padding: 10px 6px; font-size: 11.5px; }
        }
      `}</style>

      <div className="pc-root">
        <div className="pc-shell">
          
          <button type="button" className="pc-back" onClick={() => navigate('/planos')}>
            <Icon path={mdiArrowLeft} size={0.7} /> Voltar à seleção de planos
          </button>

          <div className="pc-grid-layout">
            
            {/* LADO ESQUERDO: BENEFÍCIOS E AUTORIDADE */}
            <div className="pc-content">
              <span className="pc-kicker">Segurança & Valor Garantido</span>
              <h1 className="pc-title">Ative o Noxvelia PRO e escale os seus negócios</h1>
              <p className="pc-lead">
                Tenha acesso imediato a anúncios ilimitados, máxima prioridade de destaque e ferramentas avançadas para destacar o seu stock perante milhares de compradores em Portugal.
              </p>

              {cancelado && (
                <div className="pc-alert">
                  <Icon path={mdiInformationOutline} size={1} />
                  <div>O processo de pagamento foi cancelado ou interrompido. Nenhum valor foi cobrado. Pode tentar finalizar com total segurança quando desejar.</div>
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

              <h3 className="pc-compare-title">Comparativo Direto</h3>
              <table className="pc-table">
                <thead>
                  <tr>
                    <th>Recurso</th>
                    <th>Particular</th>
                    <th className="highlight-col">PRO Profissional</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Anúncios Ativos</td>
                    <td>Até 5 gratuitos</td>
                    <td className="highlight-col">Ilimitados</td>
                  </tr>
                  <tr>
                    <td>Destaque Automático</td>
                    <td><Icon path={mdiMinus} size={0.8} color="#94a3b8" /></td>
                    <td className="highlight-col"><Icon path={mdiCheck} size={0.9} /></td>
                  </tr>
                  <tr>
                    <td>Edição de Stock</td>
                    <td>Limitada</td>
                    <td className="highlight-col">Total e Imediata</td>
                  </tr>
                  <tr>
                    <td>Painel de Métricas</td>
                    <td><Icon path={mdiMinus} size={0.8} color="#94a3b8" /></td>
                    <td className="highlight-col"><Icon path={mdiCheck} size={0.9} /></td>
                  </tr>
                </tbody>
              </table>

              <div className="pc-trust-strip">
                <div className="pc-trust-item">
                  <Icon path={mdiShieldLockOutline} size={0.9} />
                  <strong>Proteção Bancária</strong>
                  <p>Infraestrutura de pagamentos encriptada pela Stripe.</p>
                </div>
                <div className="pc-trust-item">
                  <Icon path={mdiSync} size={0.9} />
                  <strong>Liberdade de Gestão</strong>
                  <p>Cancele a renovação automática quando quiser num clique.</p>
                </div>
                <div className="pc-trust-item">
                  <Icon path={mdiHeadset} size={0.9} />
                  <strong>Sem Comissões</strong>
                  <p>Zero taxas sobre os seus negócios de carros ou imóveis.</p>
                </div>
              </div>
            </div>

            {/* LADO DIREITO: TALÃO DE CHECKOUT PROFISSIONAL */}
            <aside className="pc-receipt-card">
              <div className="pc-receipt-head">
                <span className="pc-receipt-kicker">Resumo da Subscrição</span>
                <div className="pc-receipt-price">
                  10,99€ <span>/mês</span>
                </div>
                <div className="pc-receipt-taxes">
                  <Icon path={mdiCheck} size={0.6} color="#d9c49c" /> IVA incluído à taxa legal em vigor.
                </div>
              </div>

              <div className="pc-receipt-user">
                <div className="pc-receipt-user-info">
                  <strong>Conta Registada</strong>
                  <span>{user?.email || 'Sessão ativa validada'}</span>
                </div>
                <div className="pc-user-avatar">
                  {user?.nome ? user.nome.charAt(0).toUpperCase() : 'U'}
                </div>
              </div>

              <div className="pc-invoice-line">
                <span>Plano Noxvelia PRO (Recorrente)</span>
                <span>10,99€</span>
              </div>
              <div className="pc-invoice-line total">
                <span>Total a pagar hoje</span>
                <span>10,99€</span>
              </div>

              <label className="pc-terms-box">
                <input 
                  type="checkbox" 
                  checked={aceitou} 
                  onChange={(event) => setAceitou(event.target.checked)} 
                />
                <p>
                  Concordo com a renovação automática mensal da subscrição PRO. Compreendo que posso gerir ou cancelar a qualquer momento nas definições de conta, mantendo os benefícios ativos até ao final do período pago.
                </p>
              </label>

              {erro && <div className="pc-error">{erro}</div>}

              <button 
                type="button" 
                className="pc-btn-pay" 
                onClick={continuarParaStripe} 
                disabled={!aceitou || loading}
              >
                <Icon path={mdiLockOutline} size={0.85} />
                {loading ? 'A abrir ambiente seguro...' : 'Pagar 10,99€ com Segurança'}
              </button>
              
              <div className="pc-secure-footer">
                <div className="pc-secure-note">
                  Processado com encriptação avançada via Stripe
                </div>
                <div className="pc-payment-methods">
                  <div className="pc-payment-icon"><Icon path={mdiCreditCardOutline} size={0.8} /></div>
                  <div className="pc-payment-icon">VISA</div>
                  <div className="pc-payment-icon">MC</div>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </>
  );
}