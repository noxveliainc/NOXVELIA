import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon } from '@mdi/react';
import { mdiCheckCircle, mdiStarCircle, mdiArrowRight } from '@mdi/js';
import api from '../../services/api';

export default function SucessoUpsell() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setAnuncio] = useState(null);
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
        .upsell-root { background: #f8fafc; min-height: calc(100vh - 72px); font-family: 'Inter', sans-serif; color: #0f172a; padding: 60px 24px; display: flex; flex-direction: column; align-items: center; }
        .upsell-header { text-align: center; margin-bottom: 48px; max-width: 640px; animation: slideDown 0.4s ease-out; }
        .upsell-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 36px; font-weight: 900; letter-spacing: -0.02em; margin: 16px 0 12px 0; color: #071326; }
        .upsell-subtitle { font-size: 16px; color: #475569; line-height: 1.6; }
        
        .upsell-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr)); gap: 32px; width: 100%; max-width: 860px; animation: fadeIn 0.6s ease-out; }
        .upsell-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 24px; padding: 40px 32px; display: flex; flex-direction: column; position: relative; overflow: hidden; box-shadow: 0 10px 30px -10px rgba(15,23,42,0.05); transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .upsell-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px -15px rgba(15,23,42,0.1); }
        
        /* CARTÃO PREMIUM (O que vende) */
        .upsell-card.premium { border: 2px solid #d9c49c; background: linear-gradient(180deg, #ffffff 0%, #fffcf5 100%); box-shadow: 0 15px 40px -10px rgba(217,196,156,0.3); }
        .upsell-card.premium::before { content: 'RECOMENDADO'; position: absolute; top: 16px; right: 16px; background: #d9c49c; color: #071326; font-size: 10px; font-weight: 900; padding: 5px 12px; border-radius: 20px; letter-spacing: 0.08em; text-transform: uppercase; }
        
        .upsell-icon-wrap { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; }
        .upsell-price-box { margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #f1f5f9; }
        .upsell-card.premium .upsell-price-box { border-bottom-color: rgba(217,196,156,0.3); }
        
        .upsell-price { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 38px; font-weight: 900; color: #071326; line-height: 1; }
        .upsell-price-sub { font-size: 14px; color: #64748b; font-weight: 600; margin-left: 4px; }
        
        .upsell-features { list-style: none; padding: 0; margin: 0 0 32px 0; flex: 1; }
        .upsell-features li { font-size: 14px; color: #475569; margin-bottom: 14px; display: flex; align-items: flex-start; gap: 10px; font-weight: 600; line-height: 1.4; }
        .upsell-features li::before { content: '✓'; color: #102f50; font-weight: 900; font-size: 16px; line-height: 1; margin-top: 1px; }
        .upsell-card.premium .upsell-features li::before { color: #ca8a04; }
        
        .upsell-btn { width: 100%; padding: 16px; border-radius: 12px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; border: none; }
        
        .btn-gold { background: #071326; color: #fffaf0; box-shadow: 0 10px 20px -10px rgba(7,19,38,0.5); border: 2px solid #071326; }
        .btn-gold:hover:not(:disabled) { background: #102f50; border-color: #102f50; transform: translateY(-2px); box-shadow: 0 15px 25px -10px rgba(7,19,38,0.6); }
        .btn-gold:disabled { opacity: 0.7; cursor: not-allowed; }
        
        .btn-free { background: #ffffff; border: 2px solid #e2e8f0; color: #475569; }
        .btn-free:hover { background: #f8fafc; color: #0f172a; border-color: #cbd5e1; }
        
        @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        
        @media (max-width: 768px) {
          .upsell-root { padding: 40px 16px 60px; }
          .upsell-header { margin-bottom: 32px; }
          .upsell-title { font-size: 28px; }
          .upsell-card { padding: 32px 24px; }
        }
      `}</style>

      <div className="upsell-root">
        <div className="upsell-header">
          <Icon path={mdiCheckCircle} size={2.5} color="#102f50" />
          <h1 className="upsell-title">Anúncio Publicado!</h1>
          <p className="upsell-subtitle">
            O teu anúncio já está disponível para milhares de compradores. Queres garantir que és o primeiro a ser visto?
          </p>
        </div>

        <div className="upsell-grid">
          <div className="upsell-card">
            <div className="upsell-icon-wrap" style={{ background: '#f1f5f9', color: '#64748b' }}>
              <Icon path={mdiArrowRight} size={1.4} />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 8px 0', color: '#0f172a' }}>Plano Base</h2>
            <div className="upsell-price-box">
              <span className="upsell-price">0,00€</span>
            </div>
            <ul className="upsell-features">
              <li>Visibilidade normal na pesquisa</li>
              <li>Aparece no fundo após a publicação de novos anúncios</li>
              <li>Sujeito à concorrência diária de outros vendedores</li>
            </ul>
            <button className="upsell-btn btn-free" onClick={() => navigate('/perfil')}>
              Continuar sem destaque
            </button>
          </div>

          <div className="upsell-card premium">
            <div className="upsell-icon-wrap" style={{ background: 'rgba(217, 196, 156, 0.2)', color: '#ca8a04' }}>
              <Icon path={mdiStarCircle} size={1.6} />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 8px 0', color: '#071326' }}>Destaque Premium</h2>
            <div className="upsell-price-box">
              <span className="upsell-price">1,99€</span>
              <span className="upsell-price-sub">/ 7 dias</span>
            </div>
            <ul className="upsell-features">
              <li><strong>Moldura Dourada</strong> exclusiva no cartão</li>
              <li>Aparece sempre nas <strong>primeiras posições</strong> da pesquisa</li>
              <li>Etiqueta de "Destaque" para captar a atenção do comprador</li>
              <li>Até <strong>5x mais visualizações</strong> e contactos diretos</li>
            </ul>
            <button
              className="upsell-btn btn-gold"
              onClick={() => iniciarPagamento('destaque5')}
              disabled={loadingStripe !== false}
            >
              {loadingStripe === 'destaque5' ? 'A abrir Stripe...' : 'Ativar Destaque'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}