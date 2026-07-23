import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Seo from '../../components/Seo';
import { absoluteUrl } from '../../utils/seo';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import AnuncioCard from './AnuncioCard';
import ProfileView, { obterLinksVisiveisPerfil } from './ProfileView';
import LoadingScreen from '../../components/LoadingScreen';
import { Icon } from '@mdi/react';
import { mdiArrowLeft, mdiViewDashboardOutline } from '@mdi/js';

export default function PerfilPublico() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user: utilizadorAtual } = useAuth();
  const adminAVerPerfil = utilizadorAtual?.tipo === 'admin' && new URLSearchParams(location.search).get('from') === 'admin';

  const [vendedor, setVendedor] = useState(null);
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos');

  const voltarDaMontra = () => {
    if (adminAVerPerfil) {
      navigate('/admin');
      return;
    }
    navigate(-1);
  };

  useEffect(() => {
    let ativo = true;

    const carregarMontra = async () => {
      try {
        const { data } = await api.get(`/users/vendedor/${id}`);
        if (!ativo) return;
        setVendedor(data.vendedor);
        setAnuncios(Array.isArray(data.anuncios) ? data.anuncios : []);
      } catch {
        if (ativo) setErro('Erro ao carregar a montra do vendedor.');
      } finally {
        if (ativo) setLoading(false);
      }
    };

    carregarMontra();
    return () => { ativo = false; };
  }, [id]);

  const copiarLinkMontra = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    setLinkCopiado(true);
    setTimeout(() => setLinkCopiado(false), 2000);
  };

  if (loading) {
    return (
      <LoadingScreen label="A carregar vendedor" detail="Estamos a preparar a montra pública." minHeight="calc(100vh - 80px)" tone="light" />
    );
  }

  if (erro) {
    return (
      <div style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', color: '#0f172a' }}>
        <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '15px' }}>{erro}</p>
        <button onClick={voltarDaMontra} style={{ padding: '12px 24px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>{adminAVerPerfil ? 'Voltar ao painel admin' : 'Voltar à pesquisa'}</button>
      </div>
    );
  }

  const isAdmin = vendedor?.tipo === 'admin';
  const nomeBase = vendedor?.nome || 'Vendedor';
  const nomeExibicao = isAdmin
    ? (nomeBase.toUpperCase().includes('NOXVELIA') ? nomeBase : `NOXVELIA ${nomeBase}`)
    : nomeBase;
  const isProfissional = vendedor?.tipoConta === 'profissional' || isAdmin;
  const linksPerfilVisiveis = obterLinksVisiveisPerfil(vendedor);
  const totalImoveis = anuncios.filter((anuncio) => anuncio.tipo === 'imovel').length;
  const totalCarros = anuncios.filter((anuncio) => anuncio.tipo === 'carro').length;
  const totalDestacados = anuncios.filter((anuncio) => anuncio.destacado).length;
  const anunciosFiltrados = anuncios.filter((anuncio) => {
    if (categoriaAtiva === 'carro') return anuncio.tipo === 'carro';
    if (categoriaAtiva === 'imovel') return anuncio.tipo === 'imovel';
    if (categoriaAtiva === 'destacados') return anuncio.destacado;
    return true;
  });
  const categoriaLabel = categoriaAtiva === 'carro' ? 'automóveis' : categoriaAtiva === 'imovel' ? 'imóveis' : categoriaAtiva === 'destacados' ? 'destaques' : 'ativos';
  return (
    <>
      <Seo
        title={`${nomeExibicao} — vendedor na Noxvelia`}
        description={(vendedor?.bio || `Consulta os anúncios ativos de ${nomeExibicao} na Noxvelia.`).slice(0, 160)}
        path={`/vendedor/${id}`}
        image={vendedor?.avatarUrl || undefined}
        type="profile"
        jsonLd={{ '@context': 'https://schema.org', '@type': isProfissional ? 'Organization' : 'Person', name: nomeExibicao, description: vendedor?.bio, image: vendedor?.avatarUrl, url: absoluteUrl(`/vendedor/${id}`) }}
      />
      <style>{`
        .pp-root { background: #f8fafc; min-height: calc(100vh - 80px); font-family: 'Inter', sans-serif; color: #0f172a; padding-bottom: 80px; }
        .pp-hero { position: relative; background: #f8fafc; border-bottom: 1px solid #e2e8f0; padding: 36px 24px 20px; margin-bottom: 48px; overflow: hidden; }
        .pp-cover { display: none; }
        .pp-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .pp-hero-content { max-width: 1200px; margin: 0 auto; position: relative; z-index: 2; }
        .pp-back { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; text-decoration: none; cursor: pointer; background: none; border: none; padding: 0; margin-bottom: 24px; transition: color 0.2s; }
        .pp-back:hover { color: #0f172a; }
        .pp-admin-back { min-height: 40px; display: inline-flex; align-items: center; gap: 8px; padding: 0 14px; margin-bottom: 18px; border-radius: 10px; border: 1px solid #cbd5e1; background: #ffffff; color: #0f172a; font-size: 12px; font-weight: 800; font-family: 'Inter', sans-serif; cursor: pointer; box-shadow: 0 8px 18px rgba(15, 23, 42, 0.06); transition: all 0.2s; }
        .pp-admin-back:hover { border-color: #94a3b8; transform: translateY(-1px); }
        .pp-admin-note { display: inline-flex; align-items: center; gap: 8px; margin-left: 10px; color: #475569; font-size: 12px; font-weight: 700; }
        .pp-main { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        .pp-section-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 24px; padding-bottom: 18px; border-bottom: 1px solid #e2e8f0; }
        .pp-section-kicker { display: block; margin-bottom: 6px; color: #0f766e; font-size: 11px; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; }
        .pp-section-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 24px; font-weight: 800; margin: 0; color: #0f172a; }
        .pp-section-copy { margin: 7px 0 0; max-width: 620px; color: #64748b; font-size: 13px; line-height: 1.55; font-weight: 650; }
        .pp-count { flex-shrink: 0; font-size: 13px; color: #475569; font-weight: 800; background: #e2e8f0; padding: 7px 12px; border-radius: 20px; }
        .pp-showcase-summary { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin: -20px 0 24px; }
        .pp-summary-item { min-height: 86px; display: grid; align-content: center; gap: 7px; padding: 16px; border: 1px solid #e2e8f0; border-radius: 14px; background: #ffffff; box-shadow: 0 18px 42px -36px rgba(15,23,42,.5); }
        .pp-summary-item strong { color: #0f172a; font-size: 28px; line-height: 1; font-family: 'Plus Jakarta Sans', sans-serif; }
        .pp-summary-item span { color: #64748b; font-size: 11px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
        .pp-showcase-tabs { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin: -8px 0 24px; }
        .pp-showcase-tab { min-height: 40px; display: inline-flex; align-items: center; gap: 7px; padding: 0 13px; border: 1px solid #e2e8f0; border-radius: 999px; background: #ffffff; color: #475569; font-size: 12px; font-weight: 900; cursor: pointer; transition: background .18s ease, border-color .18s ease, color .18s ease, transform .18s ease; }
        .pp-showcase-tab:hover { transform: translateY(-1px); border-color: #d9c49c; color: #0f172a; }
        .pp-showcase-tab.active { background: #102f50; border-color: #102f50; color: #fffaf0; }
        .pp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 32px; }
        .pp-empty { min-height: 220px; display: grid; place-items: center; padding: 38px 20px; border: 1px dashed #cbd5e1; border-radius: 14px; background: #ffffff; text-align: center; }
        .pp-empty-inner { max-width: 520px; }
        .pp-empty h3 { margin: 0; color: #0f172a; font-size: 22px; line-height: 1.2; font-weight: 900; }
        .pp-empty p { margin: 10px auto 20px; color: #64748b; font-size: 14px; line-height: 1.65; }
        .pp-empty-btn { min-height: 42px; padding: 0 16px; border: 0; border-radius: 10px; background: #0f172a; color: #ffffff; font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.04em; cursor: pointer; }
        .pp-empty-btn:hover { background: #1e293b; }
        .dark .pp-root { background: #020817; color: #e2e8f0; }
        .dark .pp-hero { background: #020817; border-color: #334155; }
        .dark .pp-back { color: #cbd5e1; }
        .dark .pp-back:hover, .dark .pp-section-title, .dark .pp-empty h3 { color: #f8fafc; }
        .dark .pp-section-header { border-color: #1e293b; }
        .dark .pp-section-copy, .dark .pp-count, .dark .pp-empty p { color: #cbd5e1; }
        .dark .pp-count { background: #111c30; border: 1px solid #334155; }
        .dark .pp-summary-item, .dark .pp-showcase-tab { background: #0b1220; border-color: #334155; color: #cbd5e1; }
        .dark .pp-summary-item strong { color: #f8fafc; }
        .dark .pp-summary-item span { color: #94a3b8; }
        .dark .pp-showcase-tab:hover { color: #f8fafc; border-color: #d9c49c; }
        .dark .pp-showcase-tab.active { background: #d9c49c; border-color: #d9c49c; color: #041016; }
        .dark .pp-empty { background: #0b1220; border-color: #334155; }
        .dark .pp-empty-btn { background: #d9c49c; color: #041016; }
        .dark .pp-empty-btn:hover { background: #5eead4; }
        @media (max-width: 860px) {
          .pp-showcase-summary { grid-template-columns: 1fr; margin-top: 0; }
          .pp-section-header { align-items: flex-start; flex-direction: column; }
          .pp-count { align-self: flex-start; }
        }
      `}</style>

      <div className="pp-root">
        <div className="pp-hero">
          <div className="pp-cover">
            {vendedor?.capaUrl && <img src={vendedor.capaUrl} alt="" />}
          </div>

          <div className="pp-hero-content">
            <button onClick={voltarDaMontra} className={adminAVerPerfil ? 'pp-admin-back' : 'pp-back'}>
              <Icon path={adminAVerPerfil ? mdiViewDashboardOutline : mdiArrowLeft} size={0.65} />
              {adminAVerPerfil ? 'Voltar ao painel admin' : 'Voltar atrás'}
            </button>
            {adminAVerPerfil && <span className="pp-admin-note">Vista pública aberta pelo painel</span>}

            <ProfileView
              user={vendedor}
              isOwner={false}
              totalImoveis={totalImoveis}
              totalCarros={totalCarros}
              links={linksPerfilVisiveis}
              onShare={copiarLinkMontra}
              linkCopiado={linkCopiado}
            />
          </div>
        </div>

        <div className="pp-main">
          <div className="pp-showcase-summary" aria-label="Resumo da montra">
            <div className="pp-summary-item"><strong>{anuncios.length}</strong><span>anúncios ativos</span></div>
            <div className="pp-summary-item"><strong>{totalCarros}</strong><span>automóveis</span></div>
            <div className="pp-summary-item"><strong>{totalImoveis}</strong><span>imóveis</span></div>
            <div className="pp-summary-item"><strong>{totalDestacados}</strong><span>destaques</span></div>
          </div>

          <div className="pp-section-header">
            <div>
              <span className="pp-section-kicker">Montra pública</span>
              <h2 className="pp-section-title">Anúncios ativos</h2>
              <p className="pp-section-copy">Filtra a montra por categoria e encontra primeiro os anúncios mais relevantes deste vendedor.</p>
            </div>
            <div className="pp-count">{anunciosFiltrados.length} {categoriaLabel}</div>
          </div>

          {anuncios.length > 0 && (
            <div className="pp-showcase-tabs" aria-label="Filtrar anúncios da montra">
              <button type="button" className={`pp-showcase-tab ${categoriaAtiva === 'todos' ? 'active' : ''}`} onClick={() => setCategoriaAtiva('todos')}>Todos <span>{anuncios.length}</span></button>
              <button type="button" className={`pp-showcase-tab ${categoriaAtiva === 'carro' ? 'active' : ''}`} onClick={() => setCategoriaAtiva('carro')}>Automóveis <span>{totalCarros}</span></button>
              <button type="button" className={`pp-showcase-tab ${categoriaAtiva === 'imovel' ? 'active' : ''}`} onClick={() => setCategoriaAtiva('imovel')}>Imóveis <span>{totalImoveis}</span></button>
              <button type="button" className={`pp-showcase-tab ${categoriaAtiva === 'destacados' ? 'active' : ''}`} onClick={() => setCategoriaAtiva('destacados')}>Destaques <span>{totalDestacados}</span></button>
            </div>
          )}

          {anunciosFiltrados.length > 0 ? (
            <div className="pp-grid">
              {anunciosFiltrados.map((anuncio) => {
                const utilizadorPopulado = anuncio?.utilizador && typeof anuncio.utilizador === 'object'
                  ? anuncio.utilizador
                  : vendedor;

                return (
                  <AnuncioCard
                    key={anuncio._id}
                    anuncio={{ ...anuncio, utilizador: utilizadorPopulado }}
                    forceSellerIdentity
                  />
                );
              })}
            </div>
          ) : (
            <div className="pp-empty">
              <div className="pp-empty-inner">
                <h3>Sem anúncios ativos</h3>
                <p>Este vendedor ainda não tem anúncios nesta categoria. Podes ver outra categoria da montra ou voltar ao diretório de anunciantes ativos.</p>
                <button type="button" className="pp-empty-btn" onClick={() => navigate('/profissionais')}>Ver anunciantes ativos</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
