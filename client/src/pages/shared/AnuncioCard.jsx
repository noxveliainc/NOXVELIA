import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { anuncioPath } from '../../utils/seo';
import { getImageDimensions, getImageSrcSet, getImageUrl } from '../../utils/images';

const CARD_ICON_PATHS = {
  camera: 'M4 8h3l1.5-2h7L17 8h3v10H4V8zm8 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z',
  check: 'M12 3l7 3v5c0 5-3.1 8.3-7 10-3.9-1.7-7-5-7-10V6l7-3zm-3 9 2 2 4-5',
  location: 'M12 21s6-5.2 6-11a6 6 0 0 0-12 0c0 5.8 6 11 6 11zm0-8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  star: 'M12 4l2.3 4.7 5.2.8-3.8 3.7.9 5.2-4.6-2.4-4.6 2.4.9-5.2-3.8-3.7 5.2-.8L12 4z',
  trash: 'M6 7h12M9 7V5h6v2m-7 3 .6 9h6.8l.6-9',
};

function CardIcon({ name, size = 14, color }) {
  return (
    <svg
      className="nxc-icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      style={color ? { color } : undefined}
    >
      <path d={CARD_ICON_PATHS[name]} />
    </svg>
  );
}

export default function AnuncioCard({ anuncio, showStatus = false, onAnuncioEliminado, forceSellerIdentity = false }) {
  const { user, signed } = useAuth();

  const [eliminando, setEliminando] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  const preco = anuncio?.preco
    ? new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(anuncio.preco)
    : 'Sob consulta';

  const inicial = anuncio?.utilizador?.nome?.charAt(0).toUpperCase() || '?';

  const statusConfig = {
    ativo:    { bg: 'rgba(217,196,156,.18)', color: '#102f50', border: 'rgba(217,196,156,.38)', label: 'Ativo' },
    pausado:  { bg: 'rgba(239,68,68,.12)',   color: '#ef4444', border: 'rgba(239,68,68,.2)',  label: 'Pausado' },
    expirado: { bg: 'rgba(245,158,11,.12)',  color: '#f59e0b', border: 'rgba(245,158,11,.2)', label: 'A expirar' },
    pendente: { bg: 'rgba(59,130,246,.12)',  color: '#3b82f6', border: 'rgba(59,130,246,.2)', label: 'Pendente' },
  };
  const status = statusConfig[anuncio?.estado] || statusConfig.pendente;

  const idDono   = anuncio?.utilizador?._id || anuncio?.utilizador?.id || anuncio?.utilizador;
  const idLogado = user?._id || user?.id;
  const eMeuAnuncio = !forceSellerIdentity && signed && ((idDono && idLogado && String(idDono) === String(idLogado)) || !!onAnuncioEliminado);
  const isPremium   = anuncio?.destacado === true;
  const isVerificado = anuncio?.utilizador?.tipo === 'admin' || anuncio?.utilizador?.premiumAtivo === true;
  const isProfissional = anuncio?.utilizador?.tipoConta === 'profissional' || anuncio?.utilizador?.tipo === 'admin';
  const isCarro = anuncio?.tipo === 'carro';
  const imagemPrincipal = anuncio?.fotos?.[0] || anuncio?.imagens?.[0] || anuncio?.imagem;
  const imagemPrincipalUrl = getImageUrl(imagemPrincipal, 'medium');
  const imagemPrincipalSrcSet = getImageSrcSet(imagemPrincipal);
  const imagemPrincipalDims = getImageDimensions(imagemPrincipal, { width: 800, height: 600 });

  // Tratamento dos dados principais do anúncio
  const formatarCombustivel = (valor) => {
    if (!valor) return null;
    const mapa = {
      gasolina: 'Gasolina',
      diesel: 'Diesel',
      eletrico: 'Eletrico',
      hibrido: 'Hibrido',
      gpl: 'GPL',
    };
    return mapa[String(valor).toLowerCase()] || valor;
  };

  const destaques = (isCarro ? [
    { label: 'Ano', value: anuncio?.carro?.ano || null },
    { label: 'Km', value: anuncio?.carro?.km != null ? `${new Intl.NumberFormat('pt-PT').format(anuncio.carro.km)} km` : null },
    { label: 'Combustível', value: formatarCombustivel(anuncio?.carro?.combustivel) },
    { label: 'Caixa', value: anuncio?.carro?.transmissao || null },
  ] : [
    { label: 'Tipo', value: anuncio?.imovel?.tipologia || anuncio?.imovel?.tipoImovel },
    { label: 'Área', value: anuncio?.imovel?.area ? `${anuncio.imovel.area} m2` : null },
    { label: 'Quartos', value: anuncio?.imovel?.quartos != null ? `${anuncio.imovel.quartos}` : null },
    { label: 'Garagem', value: anuncio?.imovel?.garagem ? 'Sim' : null },
  ]).filter(item => item.value).slice(0, 3);

  const trustBadges = [
    anuncio?.garantia && { label: 'Garantia', tone: 'trust' },
    anuncio?.aceitaRetoma && { label: 'Retoma', tone: 'trust' },
    isProfissional && { label: 'Profissional', tone: 'business' },
  ].filter(Boolean).slice(0, 3);
  const handleAbrirModal = e => { e.preventDefault(); e.stopPropagation(); setMostrarModal(true); };
  const handleFecharModal = e => { e?.preventDefault(); e?.stopPropagation(); setMostrarModal(false); };

  const confirmarEliminacao = async e => {
    e.preventDefault(); e.stopPropagation();
    setEliminando(true);
    try {
      const idAnuncio = anuncio._id || anuncio.id;
      if (!idAnuncio) throw new Error('ID não encontrado.');
      const res = await api.delete(`/anuncios/${idAnuncio}`);
      if (res.status >= 200 && res.status < 300) {
        setMostrarModal(false);
        onAnuncioEliminado?.(idAnuncio);
      } else throw new Error('Resposta inesperada.');
    } catch (err) {
      alert(err.response?.data?.erro || 'Não foi possível eliminar. Tenta novamente.');
      setEliminando(false);
    }
  };

  return (
    <>
      <style>{`
        /* ── CARD ── */
        .nxc-wrap {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          overflow: hidden;
          transition: border-color .16s ease, background-color .16s ease, box-shadow .16s ease, transform .16s ease;
          color: #0f172a;
          position: relative;
          box-shadow: none;
        }
        .nxc-wrap::after {
          display: none;
        }
        .nxc-wrap:hover {
          background: #fbfcfb;
          border-color: #b8c5c1;
        }
        .nxc-wrap.premium {
          border-color: #d9c49c;
          border-width: 2px;
          background: linear-gradient(180deg, #fffdfa 0%, #ffffff 46%, #ffffff 100%);
          box-shadow: 0 18px 40px -32px rgba(16, 47, 80, 0.5), 0 0 0 1px rgba(217, 196, 156, 0.14) !important;
        }
        .nxc-wrap.premium::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #102f50 0%, #d9c49c 50%, #102f50 100%);
          z-index: 8;
        }
        .nxc-wrap.premium:hover {
          border-color: #b9944e;
          background: #fffdfa;
          box-shadow: 0 22px 46px -34px rgba(16, 47, 80, 0.62), 0 0 0 1px rgba(217, 196, 156, 0.22) !important;
          transform: translateY(-1px) !important;
        }
        .nxc-wrap.premium .nxc-img { border-bottom: 1px solid rgba(217, 196, 156, 0.42); }
        .nxc-wrap.premium .nxc-img img { filter: saturate(1.05) contrast(1.02); }
        .nxc-wrap.premium .nxc-price { color: #102f50; }

        /* ── IMAGEM ── */
        .nxc-img {
          position: relative;
          aspect-ratio: 16/10;
          overflow: hidden;
          background: #f8fafc;
        }
        .nxc-img::after {
          display: none;
        }
        .nxc-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Overlay para legibilidade das tags */
        .nxc-img-overlay {
          display: none;
        }

        .nxc-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          color: #cbd5e1;
        }
        .nxc-placeholder img {
          width: min(92px, 44%);
          height: auto;
          max-height: 72%;
          object-fit: contain;
          opacity: .92;
        }
        /* ── BADGES ── */
        .nxc-badge-premium {
          position: absolute;
          top: 12px;
          left: 12px;
          background: linear-gradient(135deg, #102f50 0%, #d9c49c 100%);
          color: #fffaf0;
          font-size: 10px;
          font-weight: 900;
          padding: 6px 10px;
          border-radius: 999px;
          text-transform: uppercase;
          letter-spacing: .08em;
          display: flex;
          align-items: center;
          gap: 4px;
          z-index: 9;
          border: 1px solid rgba(255, 250, 240, 0.3);
          box-shadow: 0 10px 22px -14px rgba(2, 6, 23, 0.72);
        }
        
        .nxc-badge-status {
          position: absolute;
          top: 12px;
          left: 12px;
          font-size: 9px;
          font-weight: 900;
          padding: 4px 9px;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: .08em;
          z-index: 5;
        }

        .nxc-badge-tipo {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(0, 0, 0, 0.05);
          color: #0f172a;
          font-size: 9px;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 5px;
          z-index: 5;
          text-transform: uppercase;
          letter-spacing: .06em;
        }

        .nxc-delete-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
          font-size: 9px;
          font-weight: 800;
          padding: 5px 9px;
          border-radius: 6px;
          cursor: pointer;
          z-index: 10;
          text-transform: uppercase;
          letter-spacing: .05em;
          transition: background-color .16s ease, color .16s ease, border-color .16s ease;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .nxc-delete-btn:hover {
          background: #ef4444;
          color: #fff;
          border-color: #ef4444;
        }

        .nxc-photo-count {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(15, 23, 42, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          gap: 4px;
          z-index: 5;
        }

        /* ── BODY ── */
        .nxc-body {
          padding: 14px 16px 14px;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 6px;
        }

        .nxc-price-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
          min-width: 0;
        }
        .nxc-price {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -.02em;
          line-height: 1;
        }

        .nxc-title {
          font-size: 14px;
          font-weight: 600;
          color: #475569;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .nxc-featured-note {
          width: max-content;
          max-width: 100%;
          min-height: 24px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 8px;
          border: 1px solid rgba(217, 196, 156, .45);
          border-radius: 999px;
          background: rgba(217, 196, 156, .16);
          color: #102f50;
          font-size: 12px;
          font-weight: 850;
          line-height: 1;
        }
        .nxc-trust-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 2px;
        }
        .nxc-trust-pill {
          display: inline-flex;
          align-items: center;
          min-height: 22px;
          padding: 0 7px;
          border-radius: 999px;
          border: 1px solid #e2d1a9;
          background: #fff7e6;
          color: #102f50;
          font-size: 10px;
          font-weight: 850;
          white-space: nowrap;
        }
        .nxc-trust-pill.business {
          background: rgba(16,47,80,.08);
          border-color: rgba(16,47,80,.18);
          color: #102f50;
        }

        .nxc-insights {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 6px;
          margin-top: 8px;
        }
        .nxc-insight {
          min-width: 0;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 7px 8px;
        }
        .nxc-insight-label {
          display: block;
          font-size: 8.5px;
          font-weight: 900;
          color: #94a3b8;
          letter-spacing: .08em;
          text-transform: uppercase;
          line-height: 1;
          margin-bottom: 4px;
        }
        .nxc-insight-value {
          display: block;
          font-size: 11.5px;
          font-weight: 800;
          color: #0f172a;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 1.1;
        }

        .nxc-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }
        .nxc-tag {
          font-size: 10.5px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 6px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          color: #475569;
          white-space: nowrap;
        }
        .nxc-wrap.premium .nxc-tag {
          background: #fefce8;
          border-color: #fde047;
          color: #854d0e;
        }

        /* ── FOOTER ── */
        .nxc-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: #ffffff;
          border-top: 1px solid #e2e8f0;
        }
        .nxc-user {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }
        .nxc-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 800;
          color: #64748b;
          overflow: hidden;
          flex-shrink: 0;
        }
        .nxc-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .nxc-username {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #475569;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .nxc-username.mine { color: #0f172a; font-weight: 700; }

        .nxc-loc {
          display: flex;
          align-items: center;
          gap: 3px;
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* ── MODAL ── */
        .nxc-modal-overlay {
          position: fixed; inset: 0; background: rgba(15, 23, 42, 0.72);
          z-index: 100000; display: flex; align-items: center; justify-content: center; padding: 20px;
        }
        .nxc-modal-box {
          background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px;
          max-width: 400px; width: 100%; text-align: center; box-shadow: none;
        }
        .nxc-modal-icon { margin: 0 auto 20px; display: flex; justify-content: center; }
        .nxc-modal-title { font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 10px; }
        .nxc-modal-text { font-size: 14px; color: #64748b; margin: 0 0 24px; line-height: 1.6; }
        .nxc-modal-actions { display: flex; gap: 10px; }
        .nxc-modal-cancel { flex: 1; padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1; background: #fff; color: #475569; font-weight: 700; cursor: pointer; transition: background-color .16s ease, color .16s ease, border-color .16s ease; }
        .nxc-modal-cancel:hover { background: #f8fafc; color: #0f172a; border-color: #94a3b8; }
        .nxc-modal-delete { flex: 1; padding: 12px; border-radius: 8px; border: none; background: #ef4444; color: #fff; font-weight: 800; cursor: pointer; transition: background-color .16s ease; }
        .nxc-modal-delete:hover { background: #dc2626; }

        @media (max-width: 640px) {
          .nxc-wrap {
            border-radius: 9px;
          }
          .nxc-wrap.premium {
            border-width: 1px;
          }
          .nxc-wrap.premium::before {
            height: 3px;
          }
          .nxc-img {
            aspect-ratio: auto;
            height: clamp(136px, 39vw, 168px);
          }
          .nxc-placeholder img {
            width: min(70px, 30%);
            max-height: 58%;
          }
          .nxc-badge-premium,
          .nxc-badge-status {
            top: 8px;
            left: 8px;
            padding: 5px 8px;
            font-size: 8.5px;
          }
          .nxc-badge-tipo {
            bottom: 8px;
            left: 8px;
            padding: 3px 7px;
            font-size: 8px;
          }
          .nxc-photo-count {
            right: 8px;
            bottom: 8px;
            padding: 3px 7px;
            font-size: 9px;
          }
          .nxc-body {
            padding: 10px 12px 11px;
            gap: 5px;
          }
          .nxc-price {
            font-size: 18px;
          }
          .nxc-title {
            font-size: 13px;
            line-height: 1.35;
            -webkit-line-clamp: 2;
          }
          .nxc-featured-note {
            min-height: 20px;
            padding: 3px 7px;
            font-size: 10.5px;
          }
          .nxc-trust-strip {
            gap: 4px;
            margin-top: 1px;
          }
          .nxc-trust-pill {
            min-height: 19px;
            padding: 0 6px;
            font-size: 9px;
          }
          .nxc-insights {
            gap: 5px;
            margin-top: 5px;
          }
          .nxc-insight {
            border-radius: 8px;
            padding: 6px;
          }
          .nxc-insight-label {
            font-size: 7.5px;
            margin-bottom: 3px;
          }
          .nxc-insight-value {
            font-size: 10.5px;
          }
          .nxc-tags {
            gap: 4px;
            margin-top: 2px;
          }
          .nxc-tag {
            padding: 3px 7px;
            font-size: 9.5px;
          }
          .nxc-footer {
            padding: 9px 12px;
          }
          .nxc-avatar {
            width: 21px;
            height: 21px;
            font-size: 9px;
          }
          .nxc-username,
          .nxc-loc {
            font-size: 10.5px;
          }
        }
        .dark .nxc-wrap {
          background: #111c30;
          border-color: #334155;
          color: #f8fafc;
          box-shadow: none;
        }
        .dark .nxc-wrap::after { display: none; }
        .dark .nxc-wrap:hover {
          border-color: #475569;
          background: #142037;
          box-shadow: none;
        }
        .dark .nxc-wrap.premium {
          background: linear-gradient(180deg, #17243b 0%, #111c30 52%, #111c30 100%);
          border-color: rgba(217, 196, 156, 0.78);
          box-shadow: 0 20px 44px -34px rgba(217, 196, 156, 0.42), 0 0 0 1px rgba(217, 196, 156, 0.16) !important;
        }
        .dark .nxc-wrap.premium:hover {
          border-color: #d9c49c;
          background: #16243b;
          box-shadow: 0 22px 46px -34px rgba(217, 196, 156, 0.52), 0 0 0 1px rgba(217, 196, 156, 0.22) !important;
        }
        .dark .nxc-wrap.premium .nxc-price {
          color: #fffaf0;
        }
        .dark .nxc-img,
        .dark .nxc-placeholder {
          background: #0f172a;
          color: #64748b;
        }
        .dark .nxc-price,
        .dark .nxc-insight-value,
        .dark .nxc-username.mine,
        .dark .nxc-modal-title {
          color: #f8fafc;
        }
        .dark .nxc-title,
        .dark .nxc-username,
        .dark .nxc-loc,
        .dark .nxc-modal-text {
          color: #cbd5e1;
        }
        .dark .nxc-insight,
        .dark .nxc-tag,
        .dark .nxc-footer,
        .dark .nxc-modal-box {
          background: #0f172a;
          border-color: #334155;
        }
        .dark .nxc-insight-label { color: #94a3b8; }
        .dark .nxc-trust-pill {
          background: rgba(217,196,156,.12);
          border-color: rgba(217,196,156,.28);
          color: #f8fafc;
        }
        .dark .nxc-featured-note {
          background: rgba(217, 196, 156, 0.16);
          border-color: rgba(217, 196, 156, 0.42);
          color: #fffaf0;
        }
        .dark .nxc-avatar {
          background: #111c30;
          border-color: #475569;
          color: #cbd5e1;
        }
        .dark .nxc-badge-tipo,
        .dark .nxc-delete-btn,
        .dark .nxc-modal-cancel {
          background: rgba(15, 23, 42, 0.86);
          border-color: rgba(148, 163, 184, 0.24);
          color: #f8fafc;
        }

        .nxc-icon {
          flex: 0 0 auto;
          display: inline-block;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.9;
          stroke-linecap: round;
          stroke-linejoin: round;
          vertical-align: middle;
        }
      `}</style>

      <Link to={anuncioPath(anuncio)} className={`nxc-wrap${isPremium ? ' premium' : ''}`}>

        {/* ── IMAGEM ── */}
        <div className="nxc-img">
          {imagemPrincipalUrl
            ? <img src={imagemPrincipalUrl} srcSet={imagemPrincipalSrcSet || undefined} sizes="(max-width: 720px) 100vw, 360px" width={imagemPrincipalDims.width} height={imagemPrincipalDims.height} alt={anuncio.titulo} loading="lazy" decoding="async" />
            : <div className="nxc-placeholder"><img src="/logo-noxvelia.png" alt="" loading="lazy" /></div>
          }
          <div className="nxc-img-overlay" />

          {/* Tipo badge */}
          <span className="nxc-badge-tipo">{isCarro ? 'Automóvel' : 'Imóvel'}</span>

          {isPremium && (
            <span className="nxc-badge-premium">
              <CardIcon name="star" size={12} /> Destaque
            </span>
          )}

          {!isPremium && showStatus && anuncio?.estado && !eMeuAnuncio && (
            <span className="nxc-badge-status" style={{ background: status.bg, color: status.color, border: `1px solid ${status.border}` }}>
              {status.label}
            </span>
          )}

          {eMeuAnuncio && (
            <button type="button" className="nxc-delete-btn" onClick={handleAbrirModal}>
              <CardIcon name="trash" size={12} /> Apagar
            </button>
          )}

          {anuncio?.fotos?.length > 1 && (
            <div className="nxc-photo-count">
              <CardIcon name="camera" size={12} /> {anuncio.fotos.length}
            </div>
          )}
        </div>

        {/* ── BODY ── */}
        <div className="nxc-body">
          <div className="nxc-price-row">
            <div className="nxc-price">{preco}</div>

          </div>
          <div className="nxc-title">{anuncio?.titulo}</div>
          {isPremium && (
            <div className="nxc-featured-note">
              <CardIcon name="star" size={12} /> Anúncio em destaque
            </div>
          )}
          {trustBadges.length > 0 && (
            <div className="nxc-trust-strip" aria-label="Sinais de confiança">
              {trustBadges.map((badge) => <span key={badge.label} className={`nxc-trust-pill ${badge.tone || ''}`.trim()}>{badge.label}</span>)}
            </div>
          )}

          {destaques.length > 0 && (
            <div className="nxc-insights">
              {destaques.map((item) => (
                <span key={item.label} className="nxc-insight">
                  <span className="nxc-insight-label">{item.label}</span>
                  <span className="nxc-insight-value">{item.value}</span>
                </span>
              ))}
            </div>
          )}
          {!isCarro && <div className="nxc-tags">
            {anuncio?.imovel?.area        && <span className="nxc-tag">{anuncio.imovel.area} m²</span>}
            {anuncio?.imovel?.tipologia   && <span className="nxc-tag">{anuncio.imovel.tipologia}</span>}
          </div>}
        </div>

        {/* ── FOOTER ── */}
        <div className="nxc-footer">
          <div className="nxc-user">
            <div className="nxc-avatar">
              {anuncio?.utilizador?.avatarUrl
                ? <img src={anuncio.utilizador.avatarUrl} alt="" />
                : inicial
              }
            </div>
            <span className={`nxc-username${eMeuAnuncio ? ' mine' : ''}`}>
              {eMeuAnuncio ? 'O teu anúncio' : (anuncio?.utilizador?.nome || 'Anunciante')}
              {isVerificado && (
                <CardIcon name="check" size={13} color="#2563eb" />
              )}
            </span>
          </div>

          {anuncio?.localizacao?.cidade && (
            <div className="nxc-loc">
              <CardIcon name="location" size={13} />
              {anuncio.localizacao.cidade}
            </div>
          )}
        </div>

      </Link>

      {/* ── MODAL ELIMINAR ── */}
      {mostrarModal && (
        <div className="nxc-modal-overlay" onClick={handleFecharModal}>
          <div className="nxc-modal-box" onClick={e => e.stopPropagation()}>
            <div className="nxc-modal-icon">
              <CardIcon name="trash" size={42} color="#ef4444" />
            </div>
            <h3 className="nxc-modal-title">Eliminar anúncio?</h3>
            <p className="nxc-modal-text">
              Esta ação é <strong>permanente e irreversível</strong>.
            </p>
            <div className="nxc-modal-actions">
              <button type="button" className="nxc-modal-cancel" onClick={handleFecharModal} disabled={eliminando}>
                Cancelar
              </button>
              <button type="button" className="nxc-modal-delete" onClick={confirmarEliminacao} disabled={eliminando}>
                {eliminando ? 'A apagar…' : 'Apagar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

