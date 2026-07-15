import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Seo from '../../components/Seo';
import { absoluteUrl } from '../../utils/seo';
import api from '../../services/api';
import AnuncioCard from './AnuncioCard';
import ProfileView, { obterLinksVisiveisPerfil } from './ProfileView';
import { Icon } from '@mdi/react';
import {
  mdiCheckDecagram, mdiWhatsapp, mdiPhone, mdiMapMarker, mdiEmailOutline,
  mdiWeb, mdiInstagram, mdiFacebook, mdiLinkedin, mdiYoutube, mdiMusicNote, mdiEarth
} from '@mdi/js';

const TIPOS_LINK_PERFIL = [
  { value: 'website', label: 'Site', icon: mdiWeb },
  { value: 'instagram', label: 'Instagram', icon: mdiInstagram },
  { value: 'facebook', label: 'Facebook', icon: mdiFacebook },
  { value: 'linkedin', label: 'LinkedIn', icon: mdiLinkedin },
  { value: 'youtube', label: 'YouTube', icon: mdiYoutube },
  { value: 'tiktok', label: 'TikTok', icon: mdiMusicNote },
  { value: 'whatsapp', label: 'WhatsApp', icon: mdiWhatsapp },
  { value: 'outro', label: 'Link', icon: mdiEarth },
];

const obterMetaLinkPerfil = (tipo) => (
  TIPOS_LINK_PERFIL.find((opcao) => opcao.value === tipo) || TIPOS_LINK_PERFIL[TIPOS_LINK_PERFIL.length - 1]
);

const normalizarHref = (url) => {
  if (!url) return '#';
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

const normalizarHrefLinkPerfil = (link) => {
  if (link?.tipo !== 'whatsapp') return normalizarHref(link?.url);

  const digitos = String(link.url || '').replace(/\D/g, '');
  if (!digitos) return '#';
  const numero = digitos.length === 9 ? `351${digitos}` : digitos;
  return `https://wa.me/${numero}`;
};

export default function PerfilPublico() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vendedor, setVendedor] = useState(null);
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [linkCopiado, setLinkCopiado] = useState(false);

  useEffect(() => {
    let ativo = true;

    const carregarMontra = async () => {
      try {
        const { data } = await api.get(`/users/vendedor/${id}`);
        if (!ativo) return;
        setVendedor(data.vendedor);
        setAnuncios(data.anuncios || []);
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
      <div style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div className="nx-spinner" style={{ borderColor: '#e2e8f0', borderTopColor: '#0f172a' }} />
      </div>
    );
  }

  if (erro) {
    return (
      <div style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', color: '#0f172a' }}>
        <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '15px' }}>{erro}</p>
        <button onClick={() => navigate(-1)} style={{ padding: '12px 24px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Voltar a pesquisa</button>
      </div>
    );
  }

  const inicial = vendedor?.nome?.charAt(0).toUpperCase() || '?';
  const isAdmin = vendedor?.tipo === 'admin';
  const isVerificado = isAdmin || vendedor?.premiumAtivo === true;
  const nomeExibicao = isAdmin
    ? (vendedor.nome.toUpperCase().includes('NOXVELIA') ? vendedor.nome : `NOXVELIA ${vendedor.nome}`)
    : vendedor?.nome;
  const isProfissional = vendedor?.tipoConta === 'profissional' || isAdmin;
  const telefonePodeAparecer = vendedor?.mostrarTelefonePublico !== false;
  const telefoneLimpo = telefonePodeAparecer ? vendedor?.telefone?.replace(/\D/g, '') : '';
  const linksPerfilVisiveis = obterLinksVisiveisPerfil(vendedor);

  return (
    <>
      <Seo
        title={`${nomeExibicao} — vendedor na Noxvelia`}
        description={(vendedor?.bio || `Consulta os anúncios de ${nomeExibicao} na Noxvelia.`).slice(0, 160)}
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
        .pp-cover::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(15,23,42,0.42), rgba(15,23,42,0.22) 45%, rgba(248,250,252,0.95)); }
        .pp-hero-content { max-width: 1200px; margin: 0 auto; position: relative; z-index: 2; }
        .pp-back { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; text-decoration: none; cursor: pointer; background: none; border: none; padding: 0; margin-bottom: 24px; transition: color 0.2s; }
        .pp-back:hover { color: #0f172a; }
        .pp-user-section { display: flex; align-items: flex-start; gap: 40px; background: #ffffff; border: 1px solid #e2e8f0; padding: 40px; border-radius: 24px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); margin-top: 86px; }
        .pp-avatar { width: 140px; height: 140px; border-radius: 24px; background: #f1f5f9; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 48px; font-weight: 800; color: #0f172a; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); flex-shrink: 0; }
        .pp-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .pp-info { flex: 1; min-width: 0; }
        .pp-badge-pro, .pp-badge-particular { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; padding: 6px 12px; border-radius: 8px; margin-bottom: 12px; }
        .pp-badge-pro { color: #0f766e; background: #f0fdfa; border: 1px solid #ccfbf1; }
        .pp-badge-particular { color: #475569; background: #f1f5f9; border: 1px solid #e2e8f0; }
        .pp-name { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 36px; font-weight: 800; letter-spacing: -0.02em; margin: 0 0 12px; display: flex; align-items: center; gap: 10px; color: #0f172a; }
        .pp-location { font-size: 15px; color: #475569; font-weight: 500; margin: 0 0 24px; display: flex; align-items: center; gap: 6px; }
        .pp-bio { max-width: 760px; color: #334155; font-size: 15px; line-height: 1.65; margin: -8px 0 24px; white-space: pre-wrap; }
        .pp-actions { display: flex; gap: 12px; flex-wrap: wrap; }
        .btn-contact { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 24px; border-radius: 12px; font-size: 14px; font-weight: 700; text-decoration: none; transition: all 0.2s; }
        .btn-whatsapp { background: #25d366; color: #ffffff; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.2); }
        .btn-whatsapp:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(37, 211, 102, 0.3); }
        .btn-secondary { background: #ffffff; color: #0f172a; border: 1px solid #cbd5e1; }
        .btn-secondary:hover { background: #f8fafc; border-color: #94a3b8; }
        .btn-website { background: #f0f9ff; color: #0369a1; border: 1px solid #bae6fd; }
        .btn-website:hover { background: #e0f2fe; border-color: #7dd3fc; }
        .btn-social { background: #f8fafc; color: #0f172a; border: 1px solid #cbd5e1; }
        .btn-social:hover { background: #f1f5f9; border-color: #94a3b8; transform: translateY(-1px); }
        .pp-main { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        .pp-section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0; }
        .pp-section-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 24px; font-weight: 800; margin: 0; color: #0f172a; }
        .pp-count { font-size: 13px; color: #475569; font-weight: 700; background: #e2e8f0; padding: 6px 12px; border-radius: 20px; }
        .pp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 32px; }
        @media (max-width: 860px) {
          .pp-user-section { flex-direction: column; text-align: center; align-items: center; gap: 24px; padding: 32px 20px; }
          .pp-name, .pp-location, .pp-actions { justify-content: center; }
          .pp-actions { width: 100%; }
          .pp-bio { text-align: center; }
        }
      `}</style>

      <div className="pp-root">
        <div className="pp-hero">
          <div className="pp-cover">
            {vendedor?.capaUrl && <img src={vendedor.capaUrl} alt="" />}
          </div>

          <div className="pp-hero-content">
            <button onClick={() => navigate(-1)} className="pp-back">Voltar atras</button>

            <ProfileView
              user={vendedor}
              isOwner={false}
              totalImoveis={anuncios.filter((anuncio) => anuncio.tipo === 'imovel').length}
              totalCarros={anuncios.filter((anuncio) => anuncio.tipo === 'carro').length}
              links={linksPerfilVisiveis}
              onShare={copiarLinkMontra}
              linkCopiado={linkCopiado}
            />

            {false && (
            <div className="pp-user-section">
              <div className="pp-avatar">
                {vendedor?.avatarUrl ? <img src={vendedor.avatarUrl} alt={nomeExibicao} /> : inicial}
              </div>

              <div className="pp-info">
                {isProfissional ? (
                  <div className="pp-badge-pro">Vendedor Profissional</div>
                ) : (
                  <div className="pp-badge-particular">Anunciante Particular</div>
                )}

                <h1 className="pp-name">
                  {nomeExibicao}
                  {isVerificado && <Icon path={mdiCheckDecagram} size={1.2} color="#0284c7" title="Vendedor Verificado" />}
                </h1>

                <div className="pp-location">
                  <Icon path={mdiMapMarker} size={0.8} />
                  {vendedor?.localidade ? `Distrito de ${vendedor.localidade}` : 'Portugal'}
                </div>

                {vendedor?.bio && <p className="pp-bio">{vendedor.bio}</p>}

                {!isAdmin && (
                  <div className="pp-actions">
                    {telefoneLimpo && (
                      <a href={`tel:+351${telefoneLimpo}`} className="btn-contact btn-secondary">
                        <Icon path={mdiPhone} size={0.8} /> Ligar
                      </a>
                    )}

                    {vendedor?.email && (
                      <a href={`mailto:${vendedor.email}`} className="btn-contact btn-secondary">
                        <Icon path={mdiEmailOutline} size={0.8} /> Email
                      </a>
                    )}

                    {linksPerfilVisiveis.map((link, index) => {
                      const meta = obterMetaLinkPerfil(link.tipo);
                      const classe = link.tipo === 'whatsapp'
                        ? 'btn-whatsapp'
                        : link.tipo === 'website'
                          ? 'btn-website'
                          : 'btn-social';

                      return (
                        <a
                          key={`${link.tipo}-${index}`}
                          href={normalizarHrefLinkPerfil(link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`btn-contact ${classe}`}
                        >
                          <Icon path={meta.icon} size={0.8} /> {meta.label}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            )}
          </div>
        </div>

        <div className="pp-main">
          <div className="pp-section-header">
            <h2 className="pp-section-title">Portfolio de Ativos</h2>
            <div className="pp-count">{anuncios.length} disponíveis</div>
          </div>

          <div className="pp-grid">
            {anuncios.map((anuncio) => {
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
        </div>
      </div>
    </>
  );
}
