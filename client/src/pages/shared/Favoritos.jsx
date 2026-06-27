import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import api from '../../services/api';
import AnuncioCard from './AnuncioCard';

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // 🧭 RESOLUÇÃO DE ROTAS CONTEXTUAIS
  const contextoVisualAtual = localStorage.getItem('@App:contexto_visual') || 'carro';
  const veioDeCarros = contextoVisualAtual === 'carro';
  const rotaVoltar = veioDeCarros ? '/carros' : '/imoveis';
  const labelVoltar = veioDeCarros ? 'Automóveis' : 'Imóveis';

  useEffect(() => {
    const carregarFavoritos = async () => {
      try {
        const { data } = await api.get('/anuncios/favoritos');
        setFavoritos(data || []);
      } catch (err) {
        console.error(err);
        setErro('Não foi possível carregar a lista de favoritos.');
      } finally {
        setLoading(false);
      }
    };

    carregarFavoritos();
  }, []);

  if (loading) {
    return (
      <div style={{ height: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a' }}>
        <div className="nx-spinner" style={{ borderColor: 'rgba(255,255,255,0.2)', borderTopColor: '#fff' }} />
      </div>
    );
  }

  return (
    <>
      <style>{`
        /* O FUNDO AZUL PROFUNDO (Igual ao Perfil) */
        .fav-outer {
          background: #0f172a; 
          min-height: calc(100vh - 72px);
          padding: 40px 24px;
          display: flex;
          justify-content: center;
          font-family: var(--nx-font-body);
        }

        /* A MOLDURA BRANCA GIGANTE */
        .fav-moldura {
          background: #ffffff;
          border-radius: 32px;
          width: 100%;
          max-width: 1100px;
          padding: 48px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          color: #0f172a;
        }

        .fav-top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
        .fav-back { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: #64748b; text-decoration: none; letter-spacing: .05em; text-transform: uppercase; transition: color .2s; }
        .fav-back:hover { color: #0f172a; }

        .fav-header { border-bottom: 1px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 32px; }
        .fav-title { font-family: var(--nx-font-display); font-size: 28px; font-weight: 800; color: #0f172a; margin: 0; letter-spacing: -0.02em; }
        .fav-subtitle { margin: 4px 0 0 0; font-size: 13px; color: #64748b; }

        .fav-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 24px; }
        
        .fav-empty { padding: 100px 20px; color: #64748b; max-width: 400px; margin: 0 auto; text-align: center; }
        .fav-empty-icon { font-size: 32px; margin-bottom: 12px; }
        .fav-empty-title { font-family: var(--nx-font-display); font-weight: 700; margin: 0 0 6px 0; color: #0f172a; font-size: 18px; }
        .fav-empty-text { font-size: 13px; margin: 0; line-height: 1.5; }
        
        .fav-error { color: #dc2626; padding: 14px 18px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; font-size: 13px; font-weight: 500; margin-bottom: 24px; }

        @media (max-width: 768px) {
          .fav-outer { padding: 20px 16px; }
          .fav-moldura { padding: 32px 24px; border-radius: 24px; }
        }
      `}</style>

      <div className="fav-outer">
        <div className="fav-moldura">
          
          <div className="fav-top-bar">
            <Link to={rotaVoltar} className="fav-back">
              ← Voltar aos {labelVoltar}
            </Link>
          </div>

          {/* Cabeçalho */}
          <div className="fav-header">
            <h1 className="fav-title">Os meus Favoritos ❤</h1>
            <p className="fav-subtitle">
              Tens {favoritos.length} anúncio{favoritos.length !== 1 ? 's' : ''} guardado{favoritos.length !== 1 ? 's' : ''} na tua conta.
            </p>
          </div>

          {erro && <div className="fav-error">{erro}</div>}

          {/* Grelha de Exibição */}
          {favoritos.length > 0 ? (
            <div className="fav-grid">
              {favoritos.map(anuncio => (
                <AnuncioCard key={anuncio._id} anuncio={anuncio} />
              ))}
            </div>
          ) : (
            <div className="fav-empty">
              <div className="fav-empty-icon">♡</div>
              <h3 className="fav-empty-title">Lista vazia</h3>
              <p className="fav-empty-text">Navega pela plataforma e clica no ícone de coração nos anúncios para arquivares os teus interesses aqui.</p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}