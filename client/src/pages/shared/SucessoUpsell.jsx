import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon } from '@mdi/react';
import { mdiCheckCircle, mdiStarCircle, mdiArrowRight, mdiLockCheck, mdiShieldCheckOutline } from '@mdi/js';
import Seo from '../../components/Seo';
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
      <Seo 
        title="Anúncio Publicado com Sucesso | Noxvelia" 
        description="O seu anúncio já está online. Turbine os seus resultados com o Destaque Premium Noxvelia." 
        path={`/sucesso/${id}`} 
      />

      <style>{`
        .upsell-root { 
          background: #fdfdfd; 
          min-height: calc(100vh - 72px); 
          font-family: 'Inter', sans-serif; 
          color: #071326; 
          padding: 56px 24px 80px; 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          box-sizing: border-box;
        }
        
        .upsell-header { 
          text-align: center; 
          margin-bottom: 48px; 
          max-width: 680px; 
          animation: slideDown 0.4s ease-out; 
        }
        .upsell-eyebrow {
          font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em;
          color: #102f50; background: rgba(16, 47, 80, 0.06); padding: 6px 14px; border-radius: 100px;
          display: inline-block; margin-bottom: 14px;
        }
        .upsell-title { 
          font-family: 'Plus Jakarta Sans', sans-serif; 
          font-size: clamp(32px, 4vw, 42px); 
          font-weight: 800; 
          letter-spacing: -0.03em; 
          margin: 0 0 12px 0; 
          color: #071326; 
        }
        .upsell-subtitle { 
          font-size: 15.5px; 
          color: #5d6b78; 
          line-height: 1.6; 
          margin: 0;
        }
        
        .upsell-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr)); 
          gap: 32px; 
          width: 100%; 
          max-width: 880px; 
          animation: fadeIn 0.6s ease-out; 
        }
        
        .upsell-card { 
          background: #ffffff; 
          border: 1px solid #e6e1d6; 
          border-radius: 20px; 
          padding: 40px 32px; 
          display: flex; 
          flex-direction: column; 
          position: relative; 
          overflow: hidden; 
          box-shadow: 0 15px 35px -10px rgba(7, 19, 38, 0.05); 
          transition: transform 0.2s ease, box-shadow 0.2s ease; 
        }
        .upsell-card:hover { 
          transform: translateY(-3px); 
          box-shadow: 0 20px 40px -12px rgba(16, 47, 80, 0.12); 
        }
        
        /* CARTÃO PREMIUM (O que converte) */
        .upsell-card.premium { 
          border: 2px solid #102f50; 
          background: #ffffff;
        }
        .upsell-card.premium::before { 
          content: 'MAIS CONVERTIDO'; 
          position: absolute; 
          top: 20px; 
          right: 20px; 
          background: #102f50; 
          color: #d9c49c; 
          font-size: 10px; 
          font-weight: 800; 
          padding: 5px 12px; 
          border-radius: 20px; 
          letter-spacing: 0.08em; 
          text-transform: uppercase; 
        }
        
        .upsell-icon-wrap { 
          width: 52px; 
          height: 52px; 
          border-radius: 14px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          margin-bottom: 24px; 
        }
        
        .upsell-price-box { 
          margin-bottom: 24px; 
          padding-bottom: 24px; 
          border-bottom: 1px solid #e6e1d6; 
        }
        
        .upsell-price { 
          font-family: 'Plus Jakarta Sans', sans-serif; 
          font-size: 38px; 
          font-weight: 800; 
          color: #071326; 
          line-height: 1; 
        }
        .upsell-price-sub { 
          font-size: 13.5px; 
          color: #5d6b78; 
          font-weight: 600; 
          margin-left: 4px; 
        }
        
        .upsell-features { 
          list-style: none; 
          padding: 0; 
          margin: 0 0 32px 0; 
          flex: 1; 
        }
        .upsell-features li { 
          font-size: 14px; 
          color: #071326; 
          margin-bottom: 14px; 
          display: flex; 
          align-items: flex-start; 
          gap: 10px; 
          font-weight: 500; 
          line-height: 1.45; 
        }
        .upsell-features li::before { 
          content: '✓'; 
          color: #5d6b78; 
          font-weight: 900; 
          font-size: 15px; 
          line-height: 1; 
          margin-top: 1px; 
        }
        .upsell-card.premium .upsell-features li::before { 
          color: #102f50; 
        }
        
        .upsell-btn { 
          width: 100%; 
          padding: 15px; 
          border-radius: 12px; 
          font-family: 'Inter', sans-serif; 
          font-size: 14px; 
          font-weight: 800; 
          cursor: pointer; 
          transition: all 0.2s ease; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          gap: 8px; 
          border: none; 
        }
        
        .btn-gold { 
          background: #102f50; 
          color: #ffffff; 
          box-shadow: 0 4px 15px rgba(16, 47, 80, 0.2); 
        }
        .btn-gold:hover:not(:disabled) { 
          background: #071326; 
          transform: translateY(-1px); 
          box-shadow: 0 6px 20px rgba(16, 47, 80, 0.3); 
        }
        .btn-gold:disabled { opacity: 0.7; cursor: not-allowed; }
        
        .btn-free { 
          background: #f7f5ef; 
          border: 1px solid #e6e1d6; 
          color: #071326; 
        }
        .btn-free:hover { background: #ede8dc; }
        
        .upsell-secure-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 14px;
          font-size: 11.5px;
          color: #5d6b78;
          font-weight: 600;
        }

        @keyframes slideDown { from { opacity: 0; transform: translateY(-15px); } to { opacity: 1; transform: translateY(0); } }
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
          <span className="upsell-eyebrow">Publicação Concluída com Sucesso</span>
          <h1 className="upsell-title">O seu anúncio já está online!</h1>
          <p className="upsell-subtitle">
            O seu automóvel ou imóvel ficou visível de imediato para milhares de compradores. Quer acelerar os contactos e garantir a máxima prioridade?
          </p>
        </div>

        <div className="upsell-grid">
          
          {/* PLANO BASE */}
          <div className="upsell-card">
            <div className="upsell-icon-wrap" style={{ background: '#f7f5ef', color: '#5d6b78' }}>
              <Icon path={mdiArrowRight} size={1.2} />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 6px 0', color: '#071326' }}>Plano Normal</h2>
            <div className="upsell-price-box">
              <span className="upsell-price">0,00€</span>
              <span className="upsell-price-sub">/ sem custos</span>
            </div>
            <ul className="upsell-features">
              <li>Visibilidade padrão nos resultados de pesquisa</li>
              <li>Posicionamento por ordem cronológica natural</li>
              <li>Acesso direto a contactos via WhatsApp e Telefone</li>
            </ul>
            <button className="upsell-btn btn-free" onClick={() => navigate('/perfil')}>
              Continuar para o meu Perfil
            </button>
            <div className="upsell-secure-footer" style={{ visibility: 'hidden' }}>
              <Icon path={mdiShieldCheckOutline} size={0.7} /> Espaço reservado
            </div>
          </div>

          {/* DESTAQUE PREMIUM */}
          <div className="upsell-card premium">
            <div className="upsell-icon-wrap" style={{ background: 'rgba(16, 47, 80, 0.08)', color: '#102f50' }}>
              <Icon path={mdiStarCircle} size={1.4} />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 6px 0', color: '#071326' }}>Destaque Premium</h2>
            <div className="upsell-price-box">
              <span className="upsell-price">1,99€</span>
              <span className="upsell-price-sub">/ por 7 dias</span>
            </div>
            <ul className="upsell-features">
              <li><strong>Moldura em destaque</strong> com selo oficial dourado</li>
              <li>Fixado obrigatoriamente nas <strong>primeiras posições</strong> das buscas</li>
              <li>Até <strong>5x mais visualizações</strong> e contactos de compradores</li>
              <li>Retorno imediato sobre o pequeno investimento</li>
            </ul>
            <button
              className="upsell-btn btn-gold"
              onClick={() => iniciarPagamento('destaque5')}
              disabled={loadingStripe !== false}
            >
              {loadingStripe === 'destaque5' ? 'A abrir Stripe seguro...' : 'Ativar Destaque Prioritário →'}
            </button>
            
            <div className="upsell-secure-footer">
              <Icon path={mdiLockCheck} size={0.7} color="#102f50" />
              Pagamento 100% encriptado via Stripe
            </div>
          </div>

        </div>
      </div>
    </>
  );
}