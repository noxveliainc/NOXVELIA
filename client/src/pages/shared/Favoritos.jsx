import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@mdi/react';
import { mdiArrowRight, mdiHeartOutline, mdiMagnify } from '@mdi/js';
import api from '../../services/api';
import AnuncioCard from './AnuncioCard';
import LoadingScreen from '../../components/LoadingScreen';

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const contextoVisualAtual = localStorage.getItem('@App:contexto_visual') || 'carro';
  const veioDeCarros = contextoVisualAtual === 'carro';
  const rotaVoltar = veioDeCarros ? '/carros' : '/imoveis';
  const labelVoltar = veioDeCarros ? 'automóveis' : 'imóveis';

  useEffect(() => {
    const carregarFavoritos = async () => {
      try {
        const { data } = await api.get('/anuncios/favoritos');
        setFavoritos(data || []);
      } catch (err) {
        console.error(err);
        setErro('Não foi possível carregar a tua lista de favoritos.');
      } finally {
        setLoading(false);
      }
    };

    carregarFavoritos();
  }, []);

  if (loading) {
    return (
      <LoadingScreen label="A carregar favoritos" detail="Estamos a reunir os anúncios que guardaste." minHeight="calc(100vh - 72px)" tone="light" />
    );
  }

  return (
    <>
      <style>{`
        .fav-outer {
          background: #ffffff;
          min-height: calc(100vh - 72px);
          padding: 42px 24px 72px;
          font-family: var(--nx-font-body);
          color: #0f172a;
        }
        .fav-shell {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
        }
        .fav-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 800;
          color: #64748b;
          text-decoration: none;
          letter-spacing: .06em;
          text-transform: uppercase;
          margin-bottom: 28px;
        }
        .fav-back:hover { color: #0f172a; }
        .fav-hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 22px;
          align-items: end;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 24px;
          margin-bottom: 30px;
        }
        .fav-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #0f766e;
          background: #f0fdfa;
          border: 1px solid #ccfbf1;
          border-radius: 999px;
          padding: 7px 11px;
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .09em;
          margin-bottom: 12px;
        }
        .fav-title {
          font-family: var(--nx-font-display);
          font-size: clamp(30px, 5vw, 46px);
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          letter-spacing: -0.02em;
          line-height: 1.05;
        }
        .fav-subtitle {
          margin: 10px 0 0;
          max-width: 640px;
          font-size: 14px;
          color: #64748b;
          line-height: 1.7;
        }
        .fav-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 112px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          border-radius: 16px;
          padding: 14px 16px;
          font-family: var(--nx-font-display);
          font-size: 26px;
          font-weight: 800;
          color: #0f172a;
        }
        .fav-count span {
          margin-left: 6px;
          font-family: var(--nx-font-body);
          font-size: 11px;
          font-weight: 900;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: .08em;
        }
        .fav-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 290px), 1fr)); gap: 24px; }
        .fav-empty {
          max-width: 720px;
          border: 1px solid #e2e8f0;
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border-radius: 18px;
          padding: 30px;
          box-shadow: 0 22px 54px -44px rgba(15,23,42,0.45);
        }
        .fav-empty-mark {
          width: 76px;
          height: 76px;
          border-radius: 20px;
          background: #f0fdfa;
          border: 1px solid #ccfbf1;
          color: #0f766e;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
        }
        .fav-empty-title {
          font-family: var(--nx-font-display);
          font-size: clamp(24px, 4vw, 34px);
          font-weight: 800;
          margin: 0;
          line-height: 1.1;
        }
        .fav-empty-text {
          font-size: 14px;
          color: #64748b;
          margin: 12px 0 0;
          line-height: 1.7;
        }
        .fav-empty-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 22px;
        }
        .fav-btn {
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          color: #0f172a;
          font-size: 13px;
          font-weight: 900;
          cursor: pointer;
          padding: 0 14px;
          text-decoration: none;
        }
        .fav-btn.primary {
          background: #d9c49c;
          border-color: #d9c49c;
          color: #020617;
        }
        .fav-error {
          color: #dc2626;
          padding: 14px 18px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 24px;
        }
        @media (max-width: 820px) {
          .fav-outer { padding: 28px 18px 56px; }
          .fav-hero { grid-template-columns: 1fr; }
          .fav-count { width: fit-content; }
        }
      `}</style>

      <div className="fav-outer">
        <div className="fav-shell">
          <Link to={rotaVoltar} className="fav-back">
            Voltar aos {labelVoltar}
          </Link>

          <div className="fav-hero">
            <div>
              <span className="fav-eyebrow"><Icon path={mdiHeartOutline} size={0.65} /> Favoritos</span>
              <h1 className="fav-title">Os teus anúncios guardados</h1>
              <p className="fav-subtitle">
                Junta aqui os carros e imóveis que queres comparar com calma. Quando voltares, tens a lista pronta para decidir sem repetir a pesquisa.
              </p>
            </div>
            <div className="fav-count">
              {favoritos.length}<span>guardados</span>
            </div>
          </div>

          {erro && <div className="fav-error">{erro}</div>}

          {favoritos.length > 0 ? (
            <div className="fav-grid">
              {favoritos.map((anuncio) => (
                <AnuncioCard key={anuncio._id} anuncio={anuncio} />
              ))}
            </div>
          ) : (
            <div className="fav-empty">
              <div>
                <div className="fav-empty-mark"><Icon path={mdiMagnify} size={1.45} /></div>
                <h2 className="fav-empty-title">Ainda não guardaste nenhum anúncio.</h2>
                <p className="fav-empty-text">
                  Explora a pesquisa, abre os anúncios que te interessam e guarda os melhores para comparar preço, localização, vendedor e características.
                </p>
                <div className="fav-empty-actions">
                  <button type="button" className="fav-btn primary" onClick={() => navigate('/carros')}>
                    Ver carros <Icon path={mdiArrowRight} size={0.72} />
                  </button>
                  <button type="button" className="fav-btn" onClick={() => navigate('/imoveis')}>
                    Ver imóveis <Icon path={mdiArrowRight} size={0.72} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
