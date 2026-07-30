import React, { Suspense, lazy } from 'react';
import { Icon } from '@mdi/react';
import {
  mdiCheckDecagram, mdiCrown, mdiDomain, mdiPencil, mdiShareVariantOutline,
  mdiStar, mdiWeb, mdiInstagram, mdiFacebook, mdiLinkedin, mdiYoutube,
  mdiMusicNote, mdiWhatsapp, mdiEarth, mdiEmailOutline, mdiPhone, mdiMapMarker
} from '@mdi/js';

const MapaPerfil = lazy(() => import('../../components/MapaPerfil'));

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

const formatarTextoLink = (link) => {
  if (link.tipo === 'whatsapp') return 'WhatsApp';

  const href = normalizarHrefLinkPerfil(link);
  try {
    const url = new URL(href);
    const primeiroSegmento = url.pathname.split('/').filter(Boolean)[0];
    if (['instagram', 'tiktok'].includes(link.tipo) && primeiroSegmento) {
      return `@${primeiroSegmento.replace(/^@/, '')}`;
    }
    return url.hostname.replace(/^www\./, '');
  } catch {
    return String(link.url).replace(/(^\w+:|^)\/\//, '');
  }
};

export const obterLinksVisiveisPerfil = (utilizador) => {
  const links = Array.isArray(utilizador?.linksPerfil)
    ? utilizador.linksPerfil.filter((link) => link?.url).slice(0, 3)
    : [];

  if (links.length > 0) return links;
  return utilizador?.website ? [{ tipo: 'website', url: utilizador.website }] : [];
};

export default function ProfileView({
  user,
  isOwner = false,
  totalImoveis = 0,
  totalCarros = 0,
  links = [],
  shareLabel = 'Partilhar Montra',
  onShare,
  onEditProfile,
  onLogout,
  onUpgrade,
  onAvatarChange,
  onCapaChange,
  fileInputAvatarRef,
  fileInputCapaRef,
  uploadingAvatar = false,
  uploadingCapa = false,
  linkCopiado = false,
}) {
  const inicial = user?.nome?.charAt(0).toUpperCase() || '?';
  const isAdmin = user?.tipo === 'admin';
  const isPremium = user?.premiumAtivo === true;
  const isProfissional = user?.tipoConta === 'profissional' || isAdmin;
  const nomeExibicao = isAdmin
    ? (user?.nome?.toUpperCase().includes('NOXVELIA') ? user?.nome : `NOXVELIA ${user?.nome}`)
    : user?.nome;
  const emailPodeAparecer = isOwner || !isAdmin;
  const telefonePodeAparecer = !isAdmin && user?.mostrarTelefonePublico !== false;
  const telefoneLimpo = telefonePodeAparecer ? user?.telefone?.replace(/\D/g, '') : '';
  const localizacaoMapaPerfil = [user?.standMorada, user?.standCodigoPostal, user?.localidade].filter(Boolean).join(', ');
  const localizacaoContacto = localizacaoMapaPerfil
    ? (user?.standNome ? `${user.standNome} · ${localizacaoMapaPerfil}` : localizacaoMapaPerfil)
    : '';
  const mostrarMapaPerfil = user?.mostrarMapaPerfil === true && Boolean(localizacaoMapaPerfil || user?.localidade);
  const temResumoAnuncios = Number(totalImoveis || 0) + Number(totalCarros || 0) > 0;

  return (
    <>
      <style>{`
        .profile-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 32px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
        }
        .profile-cover {
          height: 220px;
          background: radial-gradient(circle at 18% 24%, rgba(217,196,156,.42), transparent 28%), linear-gradient(135deg, rgba(16,47,80,.96), rgba(7,19,38,.86)), repeating-linear-gradient(45deg, rgba(255,255,255,.08) 0 1px, transparent 1px 18px);
          position: relative;
          cursor: default;
        }
        .profile-cover.is-editable { cursor: pointer; }
        .profile-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .profile-cover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15,23,42,0.32);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity .2s;
          color: #fff;
          font-size: 12px;
          font-weight: 850;
          text-transform: uppercase;
          letter-spacing: .06em;
          backdrop-filter: blur(2px);
        }
        .profile-cover.is-editable:hover .profile-cover-overlay { opacity: 1; }
        .profile-body {
          padding: 0 36px 36px;
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
          position: relative;
        }
        .profile-avatar-wrap {
          margin-top: -55px;
          position: relative;
          z-index: 2;
          flex-shrink: 0;
          cursor: default;
        }
        .profile-avatar-wrap.is-editable { cursor: pointer; }
        .profile-avatar {
          width: 120px;
          height: 120px;
          border-radius: 24px;
          border: 5px solid #ffffff;
          overflow: hidden;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 38px;
          color: #d9c49c;
          transition: filter .2s;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .profile-avatar-wrap.is-premium .profile-avatar {
          border-color: #d9c49c;
          box-shadow: 0 0 0 4px rgba(217,196,156,0.22);
        }
        .profile-avatar-wrap.is-editable:hover .profile-avatar { filter: brightness(.95); }
        .profile-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .profile-avatar-overlay {
          position: absolute;
          inset: 0;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity .2s;
          background: rgba(15,23,42,0.62);
          pointer-events: none;
          color: #fff;
          font-size: 10px;
          font-weight: 850;
          text-transform: uppercase;
        }
        .profile-avatar-wrap.is-editable:hover .profile-avatar-overlay { opacity: 1; }
        .profile-info { flex: 1; min-width: 0; padding-top: 16px; }
        .profile-badges {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 12px;
        }
        .profile-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .05em;
          padding: 6px 10px;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
          background: #f1f5f9;
          color: #475569;
        }
        .profile-badge.profissional { background: rgba(217,196,156,0.14); color: #102f50; border-color: rgba(217,196,156,0.34); }
        .profile-badge.premium { background: rgba(217,196,156,0.16); color: #7a612e; border-color: rgba(217,196,156,0.42); }
        .profile-upgrade {
          background: #d9c49c;
          color: #071326;
          border: 1px solid #d9c49c;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 900;
          padding: 6px 11px;
          cursor: pointer;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .profile-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 28px;
          font-weight: 850;
          color: #0f172a;
          margin: 0 0 6px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .profile-contact-line {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin: 0 0 16px;
          color: #64748b;
          font-size: 13px;
        }
        .profile-contact-line span, .profile-contact-line a {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #64748b;
          text-decoration: none;
        }
        .profile-bio {
          font-size: 14px;
          color: #334155;
          line-height: 1.6;
          margin: 0 0 16px;
          max-width: 800px;
          white-space: pre-wrap;
        }
        .profile-links {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .profile-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 850;
          color: #102f50;
          text-decoration: none;
          border: 1px solid rgba(217,196,156,0.36);
          background: #ffffff;
          border-radius: 999px;
          padding: 8px 12px;
          max-width: 240px;
        }
        .profile-link.whatsapp { color: #102f50; border-color: rgba(217,196,156,0.48); background: #fff9eb; }
        .profile-link span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .profile-stars { display: flex; align-items: center; gap: 4px; color: #f59e0b; margin-bottom: 24px; }
        .profile-stars-text { font-size: 13px; font-weight: 800; color: #0f172a; margin-left: 4px; }
        .profile-stars-count { font-size: 12px; font-weight: 600; color: #64748b; }
        .profile-stats { display: flex; gap: 32px; }
        .profile-stat-val { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 24px; font-weight: 800; color: #0f172a; line-height: 1; }
        .profile-stat-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .1em; color: #64748b; margin-top: 3px; }
        .profile-stat-divider { width: 1px; background: #e2e8f0; margin: 0 4px; }
        .profile-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 220px;
          padding-top: 16px;
        }
        .profile-btn-solid, .profile-btn-primary, .profile-btn-outline {
          padding: 12px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 850;
          text-transform: uppercase;
          cursor: pointer;
          transition: background .2s, border-color .2s, color .2s, transform .2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
        }
        .profile-btn-solid { background: #102f50; color: #fffaf0; border: 1px solid #102f50; }
        .profile-btn-solid:hover, .profile-btn-primary:hover, .profile-btn-outline:hover { transform: translateY(-1px); }
        .profile-map-panel { padding: 0 36px 36px; }
        .profile-map-loading { min-height: 230px; display: grid; place-items: center; border: 1px solid #e2e8f0; border-radius: 16px; background: #f8fafc; color: #64748b; font-size: 13px; font-weight: 800; }
        .profile-btn-primary { background: #ffffff; color: #102f50; border: 1px solid rgba(217,196,156,0.72); }
        .profile-btn-outline { background: #f8fafc; color: #64748b; border: 1px solid #e2e8f0; }
        .profile-btn-outline.danger:hover { border-color: #fecdd3; color: #be123c; background: #fff1f2; }
        .dark .profile-card {
          background: #111c30;
          border-color: #334155;
          box-shadow: 0 22px 54px -34px rgba(0,0,0,0.95);
        }
        .dark .profile-cover {
          background: linear-gradient(135deg, #0f172a, #1e293b);
        }
        .dark .profile-avatar {
          background: #0f172a;
          border-color: #111c30;
          color: #d9c49c;
        }
        .dark .profile-name,
        .dark .profile-stars-text,
        .dark .profile-stat-val {
          color: #f8fafc;
        }
        .dark .profile-contact-line,
        .dark .profile-contact-line span,
        .dark .profile-contact-line a,
        .dark .profile-bio,
        .dark .profile-stars-count,
        .dark .profile-stat-label {
          color: #cbd5e1;
        }
        .dark .profile-badge,
        .dark .profile-link,
        .dark .profile-btn-outline {
          background: #0f172a;
          border-color: #334155;
          color: #e2e8f0;
        }
        .dark .profile-badge.profissional,
        .dark .profile-link.whatsapp,
        .dark .profile-btn-primary {
          background: rgba(217,196,156,0.14);
          border-color: rgba(217,196,156,0.32);
          color: #f0dfbb;
        }
        .dark .profile-badge.premium {
          background: rgba(217,196,156,0.18);
          border-color: rgba(217,196,156,0.38);
          color: #f0dfbb;
        }
        .dark .profile-btn-solid {
          background: #f8fafc;
          color: #020617;
        }
        .dark .profile-stat-divider {
          background: #334155;
        }
        .dark .profile-map-loading { background: #0f172a; border-color: #334155; color: #cbd5e1; }
        @media (max-width: 768px) {
          .profile-body { padding: 0 22px 28px; }
          .profile-map-panel { padding: 0 22px 28px; }
          .profile-actions { width: 100%; padding-top: 0; }
          .profile-name { font-size: 24px; }
        }
      `}</style>

      <div className="profile-card">
        <div
          className={`profile-cover${isOwner && onCapaChange ? ' is-editable' : ''}`}
          onClick={() => isOwner && fileInputCapaRef?.current?.click()}
        >
          {user?.capaUrl ? <img src={user.capaUrl} alt="Capa" loading="lazy" decoding="async" /> : null}
          {isOwner && onCapaChange && (
            <>
              <div className="profile-cover-overlay">
                <Icon path={mdiPencil} size={0.7} style={{ marginRight: 6 }} />
                {uploadingCapa ? 'A carregar...' : 'Alterar Capa (16:9)'}
              </div>
              <input ref={fileInputCapaRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onCapaChange} />
            </>
          )}
        </div>

        <div className="profile-body">
          <div
            className={`profile-avatar-wrap${isPremium ? ' is-premium' : ''}${isOwner && onAvatarChange ? ' is-editable' : ''}`}
            onClick={() => isOwner && fileInputAvatarRef?.current?.click()}
          >
            <div className="profile-avatar">
              {user?.avatarUrl ? <img src={user.avatarUrl} alt={nomeExibicao || 'Perfil'} loading="lazy" decoding="async" /> : inicial}
            </div>
            {isOwner && onAvatarChange && (
              <>
                <div className="profile-avatar-overlay">{uploadingAvatar ? 'A carregar...' : 'Alterar'}</div>
                <input ref={fileInputAvatarRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onAvatarChange} />
              </>
            )}
          </div>

          <div className="profile-info">
            <div className="profile-badges">
              <div className={`profile-badge ${isProfissional ? 'profissional' : ''}`}>
                {isProfissional ? 'Conta Empresa' : 'Conta Particular'}
              </div>
              {isPremium && (
                <div className="profile-badge premium">
                  <Icon path={mdiStar} size={0.45} /> Plano Premium
                </div>
              )}
              {isOwner && !isProfissional && user?.tipo !== 'admin' && onUpgrade && (
                <button type="button" className="profile-upgrade" onClick={onUpgrade}>
                  <Icon path={mdiDomain} size={0.5} /> Evoluir
                </button>
              )}
            </div>

            <h1 className="profile-name">
              {nomeExibicao}
              {isAdmin && <Icon path={mdiCheckDecagram} size={1} color="#d9c49c" />}
              {!isAdmin && isPremium && <Icon path={mdiCrown} size={1} color="#d9c49c" title="Plano Premium" />}
            </h1>

            <div className="profile-contact-line">
              {emailPodeAparecer && user?.email && <span><Icon path={mdiEmailOutline} size={0.62} /> {user.email}</span>}
              {!isOwner && telefoneLimpo && <a href={`tel:+351${telefoneLimpo}`}><Icon path={mdiPhone} size={0.62} /> {user.telefone}</a>}
              {localizacaoContacto && <span><Icon path={mdiMapMarker} size={0.62} /> {localizacaoContacto}</span>}
            </div>

            {user?.bio && <p className="profile-bio">{user.bio}</p>}

            {links.length > 0 && (
              <div className="profile-links">
                {links.map((link, index) => {
                  const meta = obterMetaLinkPerfil(link.tipo);
                  return (
                    <a
                      key={`${link.tipo}-${index}`}
                      href={normalizarHrefLinkPerfil(link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`profile-link${link.tipo === 'whatsapp' ? ' whatsapp' : ''}`}
                    >
                      <Icon path={meta.icon} size={0.7} />
                      <span>{formatarTextoLink(link)}</span>
                    </a>
                  );
                })}
              </div>
            )}

            <div className="profile-stars">
              {user?.rating > 0 ? (
                <>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} path={mdiStar} size={0.7} color={i < Math.round(user.rating) ? '#f59e0b' : '#e2e8f0'} />
                  ))}
                  <span className="profile-stars-text">{user.rating.toFixed(1)}</span>
                  <span className="profile-stars-count">({user.totalAvaliacoes || 0} avaliações)</span>
                </>
              ) : (
                <span className="profile-stars-count" style={{ marginLeft: 0 }}>Sem avaliações recebidas</span>
              )}
            </div>

            {temResumoAnuncios && (
              <div className="profile-stats">
                <div><div className="profile-stat-val">{totalImoveis}</div><div className="profile-stat-label">Imóveis</div></div>
                <div className="profile-stat-divider" />
                <div><div className="profile-stat-val">{totalCarros}</div><div className="profile-stat-label">Automóveis</div></div>
              </div>
            )}
          </div>

          <div className="profile-actions">
            {isOwner && onEditProfile && (
              <button className="profile-btn-solid" onClick={onEditProfile}>
                <Icon path={mdiPencil} size={0.7} /> Editar Perfil
              </button>
            )}
            {onShare && (
              <button className="profile-btn-primary" onClick={onShare}>
                <Icon path={mdiShareVariantOutline} size={0.7} />
                {linkCopiado ? 'Link Copiado!' : shareLabel}
              </button>
            )}
            {isOwner && onLogout && (
              <button className="profile-btn-outline danger" onClick={onLogout}>Terminar sessão</button>
            )}
          </div>
        </div>

        {mostrarMapaPerfil && (
          <div className="profile-map-panel">
            <Suspense fallback={<div className="profile-map-loading">A carregar mapa...</div>}>
              <MapaPerfil
                localidade={user.localidade}
                nome={nomeExibicao}
                standNome={user.standNome}
                morada={user.standMorada}
                codigoPostal={user.standCodigoPostal}
              />
            </Suspense>
          </div>
        )}
      </div>
    </>
  );
}
