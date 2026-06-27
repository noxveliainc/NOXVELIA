import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiCheckCircle, mdiStarCircle, mdiArrowRight } from '@mdi/js';
import api from '../../services/api';

export default function SucessoUpsell() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anuncio, setAnuncio] = useState(null);
  const [loadingStripe, setLoadingStripe] = useState(false);

  useEffect(() => {
    api.get(`/anuncios/${id}`).then(res => setAnuncio(res.data)).catch(() => {});
  }, [id]);

  const iniciarPagamento = async (tipoDestaque) => {
    setLoadingStripe(tipoDestaque);
    try {
      const res = await api.post('/stripe/checkout', {
        anuncioId: id,
        pacote: tipoDestaque
      });

      if (res.data && res.data.url) {
        window.location.href = res.data.url;
      } else {
        throw new Error('O Stripe não devolveu o URL de pagamento.');
      }
    } catch (error) {
      console.error('Erro ao iniciar pagamento:', error);
      alert(error.response?.data?.erro || 'Erro ao conectar ao Stripe.');
      setLoadingStripe(false);
    }
  };

  return (
    <>
      <style>{`
        .upsell-root { background: var(--nx-bg); min-height: calc(100vh - 72px); font-family: var(--nx-font-body); color: var(--nx-text); padding: 60px 24px; display: flex; flex-direction: column; align-items: center; }
        .upsell-header { text-align: center; margin-bottom: 48px; max-width: 600px; animation: slideDown 0.4s ease-out; }
        .upsell-title { font-family: var(--nx-font-display); font-size: 36px; font-weight: 800; letter-spacing: -0.02em; margin: 16px 0 8px 0; }
        .upsell-subtitle { font-size: 16px; color: var(--nx-text-sub); line-height: 1.5; }
        .upsell-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; width: 100%; max-width: 800px; animation: fadeIn 0.6s ease-out; }
        .upsell-card { background: var(--nx-card-bg); border: 1px solid var(--nx-card-border); border-radius: var(--nx-radius-lg); padding: 40px 32px; display: flex; flex-direction: column; position: relative; overflow: hidden; box-shadow: var(--nx-shadow-card); transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .upsell-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
        .upsell-card.premium { border-color: var(--nx-gold); background: linear-gradient(180deg, var(--nx-card-bg) 0%, rgba(234, 179, 8, 0.03) 100%); }
        .upsell-card.premium::before { content: 'RECOMENDADO'; position: absolute; top: 16px; right: 16px; background: var(--nx-gold); color: #000; font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 20px; letter-spacing: 0.05em; }
        .upsell-icon-wrap { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; }
        .upsell-price-box { margin-bottom: 24px; }
        .upsell-price { font-family: var(--nx-font-display); font-size: 32px; font-weight: 800; color: var(--nx-text); }
        .upsell-price-sub { font-size: 13px; color: var(--nx-text-muted); font-weight: 600; }
        .upsell-features { list-style: none; padding: 0; margin: 0 0 32px 0; flex: 1; }
        .upsell-features li { font-size: 14px; color: var(--nx-text-sub); margin-bottom: 12px; display: flex; align-items: center; gap: 8px; font-weight: 500; }
        .upsell-features li::before { content: '✓'; color: var(--nx-text); font-weight: 800; }
        .upsell-btn { width: 100%; padding: 16px; border-radius: 12px; font-family: var(--nx-font-body); font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; border: none; }
        .btn-gold { background: var(--nx-gold); color: #000; }
        .btn-gold:hover:not(:disabled) { filter: brightness(1.1); box-shadow: 0 10px 25px rgba(234, 179, 8, 0.3); }
        .btn-gold:disabled { opacity: 0.7; cursor: not-allowed; }
        .btn-free { background: transparent; border: 1px solid var(--nx-border-2); color: var(--nx-text-sub); }
        .btn-free:hover { background: var(--nx-bg-2); color: var(--nx-text); border-color: var(--nx-text); }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      <div className="upsell-root">
        <div className="upsell-header">
          <Icon path={mdiCheckCircle} size={2.5} color="var(--nx-accent-home)" />
          <h1 className="upsell-title">Anúncio Publicado!</h1>
          <p className="upsell-subtitle">
            O teu ativo já se encontra na nossa base de dados. Queres acelerar a venda e destacar-te no meio da concorrência?
          </p>
        </div>

        <div className="upsell-grid">
          <div className="upsell-card">
            <div className="upsell-icon-wrap" style={{ background: 'var(--nx-bg-3)', color: 'var(--nx-text-sub)' }}>
              <Icon path={mdiArrowRight} size={1.2} />
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px 0' }}>Plano Base</h2>
            <div className="upsell-price-box">
              <span className="upsell-price">0,00€</span>
            </div>
            <ul className="upsell-features">
              <li>Visibilidade normal na pesquisa</li>
              <li>Aparece no fundo após novos anúncios</li>
              <li>Sujeito à concorrência diária</li>
            </ul>
            <button className="upsell-btn btn-free" onClick={() => navigate('/perfil')}>
              Continuar sem destaque
            </button>
          </div>

          <div className="upsell-card premium">
            <div className="upsell-icon-wrap" style={{ background: 'rgba(234, 179, 8, 0.2)', color: 'var(--nx-gold)' }}>
              <Icon path={mdiStarCircle} size={1.4} />
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px 0' }}>Destaque Premium</h2>
            <div className="upsell-price-box">
              <span className="upsell-price">1,99€</span>
              <span className="upsell-price-sub"> / por 5 dias</span>
            </div>
            <ul className="upsell-features">
              <li><strong>Moldura Dourada</strong> exclusiva</li>
              <li>Aparece nas primeiras posições</li>
              <li>Sinal de exclusividade para o comprador</li>
              <li>Até 5x mais visualizações e contactos</li>
            </ul>
            <button
              className="upsell-btn btn-gold"
              onClick={() => iniciarPagamento('destaque5')}
              disabled={loadingStripe !== false}
            >
              {loadingStripe === 'destaque5' ? 'A abrir Stripe...' : 'Ativar Destaque (1,99€)'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}