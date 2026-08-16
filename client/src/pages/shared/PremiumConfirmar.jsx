import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
    <path d="M5 12h14M13 5l7 7-7 7" />
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

  const beneficios = [
    'Podes publicar acima do limite gratuito de 5 anúncios ativos enquanto o PRO estiver ativo.',
    'Os anúncios ativos têm destaque automático e prioridade nos resultados.',
    'Podes editar os dados de anúncios que já estão ativos.',
    'Tens acesso a uma montra pública mais completa, com contactos, links e mapa opcional.',
    'Tens métricas de visitas, favoritos e contactos para acompanhar a carteira.',
  ];

  const regrasCancelamento = [
    'Os anúncios já ativos continuam online; não são apagados por deixares de pagar.',
    'Perdes os benefícios PRO: destaque automático, prioridade, edição de anúncios ativos e métricas avançadas.',
    'Se tiveres mais de 5 anúncios ativos, não consegues publicar novos até renovares ou ficares dentro do limite gratuito.',
    'Continuas a poder marcar anúncios como vendidos ou apagar anúncios da tua conta.',
    'Destaques comprados à parte mantêm o prazo pago; só removemos o destaque automático do PRO.',
  ];

  return (
    <>
      <style>{`
        .pc-root { min-height: calc(100vh - 72px); background: #f7f3ea; color: #071326; padding: 48px 24px 64px; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
        .pc-shell { width: min(1080px, 100%); margin: 0 auto; }
        .pc-back { border: 0; background: transparent; color: #5d6b78; font-size: 12px; font-weight: 850; letter-spacing: .08em; text-transform: uppercase; cursor: pointer; padding: 0; margin-bottom: 24px; }
        .pc-back:hover { color: #102f50; }
        .pc-hero { display: grid; grid-template-columns: minmax(0, .88fr) minmax(320px, .52fr); gap: 22px; align-items: stretch; }
        .pc-panel { background: #ffffff; border: 1px solid rgba(7, 19, 38, .12); border-radius: 18px; box-shadow: 0 24px 60px -46px rgba(7, 19, 38, .55); }
        .pc-main { padding: clamp(28px, 4vw, 44px); }
        .pc-kicker { display: inline-flex; align-items: center; min-height: 32px; padding: 0 11px; border: 1px solid rgba(217, 196, 156, .72); border-radius: 999px; background: rgba(217, 196, 156, .22); color: #102f50; font-size: 11px; font-weight: 950; letter-spacing: .1em; text-transform: uppercase; }
        .pc-title { max-width: 680px; margin: 18px 0 14px; font-family: "Plus Jakarta Sans", Inter, sans-serif; font-size: clamp(34px, 5vw, 62px); line-height: 1.02; letter-spacing: 0; font-weight: 950; }
        .pc-lead { max-width: 660px; margin: 0; color: #435363; font-size: 16px; line-height: 1.7; }
        .pc-alert { margin-top: 20px; padding: 14px 16px; border-radius: 12px; border: 1px solid rgba(217, 196, 156, .55); background: #fff7df; color: #66512c; font-size: 13px; font-weight: 750; line-height: 1.55; }
        .pc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 24px; }
        .pc-card { padding: 20px; background: #ffffff; border: 1px solid rgba(7, 19, 38, .1); border-radius: 14px; }
        .pc-card h2 { margin: 0 0 14px; font-family: "Plus Jakarta Sans", Inter, sans-serif; font-size: 20px; line-height: 1.18; }
        .pc-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 12px; }
        .pc-list li { display: grid; grid-template-columns: 18px 1fr; gap: 9px; align-items: start; color: #344555; font-size: 13.2px; line-height: 1.55; font-weight: 650; }
        .pc-list svg { width: 17px; height: 17px; color: #102f50; margin-top: 2px; }
        .pc-side { padding: 24px; display: flex; flex-direction: column; gap: 16px; background: #071326; color: #fffaf0; border-color: rgba(255,255,255,.1); }
        .pc-price { padding: 22px; border: 1px solid rgba(255,255,255,.14); border-radius: 14px; background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.03)); }
        .pc-price-label { display: block; color: #d9c49c; font-size: 11px; font-weight: 950; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 10px; }
        .pc-price strong { display: flex; align-items: baseline; gap: 7px; font-family: "Plus Jakarta Sans", Inter, sans-serif; font-size: 38px; line-height: 1; }
        .pc-price strong span { font-family: Inter, sans-serif; font-size: 13px; color: rgba(255,250,240,.68); font-weight: 700; }
        .pc-price p { margin: 14px 0 0; color: rgba(255,250,240,.72); font-size: 13px; line-height: 1.58; }
        .pc-user { padding: 16px; border-radius: 12px; background: rgba(255,250,240,.07); color: rgba(255,250,240,.76); font-size: 12.5px; line-height: 1.55; }
        .pc-user strong { display: block; color: #fffaf0; font-size: 14px; margin-bottom: 2px; }
        .pc-check { display: grid; grid-template-columns: 20px 1fr; gap: 11px; padding: 16px; border-radius: 12px; border: 1px solid rgba(217,196,156,.38); background: rgba(217,196,156,.09); cursor: pointer; }
        .pc-check input { width: 18px; height: 18px; accent-color: #d9c49c; margin: 2px 0 0; }
        .pc-check span { color: rgba(255,250,240,.82); font-size: 12.5px; line-height: 1.55; font-weight: 650; }
        .pc-error { color: #fecaca; background: rgba(239,68,68,.12); border: 1px solid rgba(248,113,113,.22); border-radius: 12px; padding: 12px 14px; font-size: 12.5px; line-height: 1.5; }
        .pc-actions { display: grid; gap: 10px; margin-top: auto; }
        .pc-primary, .pc-secondary { min-height: 50px; border-radius: 12px; font-weight: 900; cursor: pointer; transition: filter .18s ease, opacity .18s ease, transform .18s ease; }
        .pc-primary { border: 0; background: #d9c49c; color: #071326; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }
        .pc-primary svg { width: 17px; height: 17px; }
        .pc-primary:hover:not(:disabled) { filter: brightness(1.03); transform: translateY(-1px); }
        .pc-primary:disabled { opacity: .46; cursor: not-allowed; }
        .pc-secondary { border: 1px solid rgba(255,255,255,.16); background: transparent; color: #fffaf0; }
        .pc-secondary:hover { background: rgba(255,255,255,.07); }
        @media (max-width: 880px) { .pc-hero, .pc-grid { grid-template-columns: 1fr; } .pc-side { order: -1; } }
        @media (max-width: 560px) { .pc-root { padding: 28px 14px 46px; } .pc-main, .pc-side { padding: 20px; } .pc-title { font-size: 34px; } }
      `}</style>

      <div className="pc-root">
        <div className="pc-shell">
          <button type="button" className="pc-back" onClick={() => navigate('/planos')}>← Voltar aos planos</button>

          <div className="pc-hero">
            <section className="pc-panel pc-main" aria-labelledby="premium-confirmar-title">
              <span className="pc-kicker">Antes do pagamento</span>
              <h1 className="pc-title" id="premium-confirmar-title">PRO claro, sem surpresas depois.</h1>
              <p className="pc-lead">
                A adesão ao PRO é mensal. Antes de passares para o pagamento seguro da Stripe, confirma exatamente o que fica ativo enquanto pagas e o que acontece se cancelares ou se o pagamento falhar.
              </p>

              {cancelado && (
                <div className="pc-alert">O pagamento foi cancelado. Nada foi cobrado e podes voltar a tentar quando quiseres.</div>
              )}

              <div className="pc-grid">
                <article className="pc-card">
                  <h2>Enquanto o PRO está ativo</h2>
                  <ul className="pc-list">
                    {beneficios.map((item) => <li key={item}><CheckIcon /> <span>{item}</span></li>)}
                  </ul>
                </article>

                <article className="pc-card">
                  <h2>Se deixares de pagar</h2>
                  <ul className="pc-list">
                    {regrasCancelamento.map((item) => <li key={item}><CheckIcon /> <span>{item}</span></li>)}
                  </ul>
                </article>
              </div>
            </section>

            <aside className="pc-panel pc-side" aria-label="Resumo do PRO">
              <div className="pc-price">
                <span className="pc-price-label">Plano PRO</span>
                <strong>10,99€ <span>/mês</span></strong>
                <p>Subscrição mensal com pagamento seguro através da Stripe. Podes cancelar pelo portal de gestão da subscrição.</p>
              </div>

              <div className="pc-user">
                <strong>{user?.nome || 'A tua conta'}</strong>
                {user?.email || 'Pagamento associado à conta com sessão iniciada.'}
              </div>

              <label className="pc-check">
                <input type="checkbox" checked={aceitou} onChange={(event) => setAceitou(event.target.checked)} />
                <span>Li e compreendi que, ao terminar o PRO, os anúncios continuam online, mas perdem os benefícios PRO e a publicação volta ao limite gratuito.</span>
              </label>

              {erro && <div className="pc-error">{erro}</div>}

              <div className="pc-actions">
                <button type="button" className="pc-primary" onClick={continuarParaStripe} disabled={!aceitou || loading}>
                  {loading ? 'A abrir pagamento...' : 'Continuar para Stripe'} {!loading && <ArrowIcon />}
                </button>
                <button type="button" className="pc-secondary" onClick={() => navigate('/planos')}>Ainda quero comparar planos</button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}