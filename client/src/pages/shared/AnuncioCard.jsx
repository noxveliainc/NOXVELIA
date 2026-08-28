import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { anuncioPath } from '../../utils/seo';
import { getImageDimensions, getImageSrcSet, getImageUrl } from '../../utils/images';
import { formatarMarcaModeloVeiculo } from '../../data/marcasModelos';

const CARD_ICON_PATHS = {
  camera: 'M4 8h3l1.5-2h7L17 8h3v10H4V8zm8 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z',
  car: 'M7 16h10M6 16l1-5 2-3h6l2 3 1 5M8 18h.01M16 18h.01',
  check: 'M12 3l7 3v5c0 5-3.1 8.3-7 10-3.9-1.7-7-5-7-10V6l7-3zm-3 9 2 2 4-5',
  home: 'M4 11l8-7 8 7v9h-5v-5H9v5H4v-9',
  location: 'M12 21s6-5.2 6-11a6 6 0 0 0-12 0c0 5.8 6 11 6 11zm0-8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  star: 'M12 4l2.3 4.7 5.2.8-3.8 3.7.9 5.2-4.6-2.4-4.6 2.4.9-5.2-3.8-3.7 5.2-.8L12 4z',
  trash: 'M6 7h12M9 7V5h6v2m-7 3 .6 9h6.8l.6-9',
  calendar: 'M7 3v3M17 3v3M4 9h16M5 6h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z',
  gauge: 'M12 12l4-3M4 15a8 8 0 1 1 16 0M12 6v1',
  fuel: 'M5 21V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v15M4 21h10M15 9l2.5 2v6a1.5 1.5 0 0 0 3 0v-5L18 9',
  gearbox: 'M12 4v3M12 17v3M4.9 6.9l2.1 2.1M17 15l2.1 2.1M4.9 17.1 7 15M17 9l2.1-2.1M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0z',
  ruler: 'M4 8h16v8H4zM8 8v3M12 8v3M16 8v3',
  bed: 'M4 18v-6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6M4 18H2M20 18h2M4 14h16M7 10V8a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2',
  garage: 'M4 21V10l8-6 8 6v11M4 21h16M9 21v-6h6v6',
};

function CardIcon({ name, size = 14, color, className = '' }) {
  return (
    <svg
      className={`nxc-icon ${className}`.trim()}
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
  const locationPath = useLocation().pathname;
  const inMyProfile = locationPath.includes('/perfil') && !forceSellerIdentity;

  const [eliminando, setEliminando] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [imgCarregada, setImgCarregada] = useState(false);

  const preco = anuncio?.preco
    ? new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(anuncio.preco)
    : 'Sob consulta';

  const inicial = anuncio?.utilizador?.nome?.charAt(0).toUpperCase() || '?';

  const statusConfig = {
    ativo:    { bg: 'rgba(217,196,156,.18)', color: '#102f50', border: 'rgba(217,196,156,.38)', label: 'Ativo' },
    pausado:  { bg: 'rgba(239,68,68,.12)',   color: '#ef4444', border: 'rgba(239,68,68,.2)',  label: 'Pausado' },
    expirado: { bg: 'rgba(245,158,11,.12)',  color: '#f59e0b', border: 'rgba(245,158,11,.2)', label: 'A expirar' },
    pendente: { bg: 'rgba(59,130,246,.12)',  color: '#3b82f6', border: 'rgba(59,130,246,.2)', label: 'Pendente' },
    vendido:  { bg: 'rgba(16,47,80,.12)',   color: '#102f50', border: 'rgba(16,47,80,.2)', label: 'Vendido' },
  };
  const status = statusConfig[anuncio?.estado] || statusConfig.pendente;

  const idDono   = anuncio?.utilizador?._id || anuncio?.utilizador?.id || anuncio?.utilizador;
  const idLogado = user?._id || user?.id;
  const eMeuAnuncio = !forceSellerIdentity && signed && ((idDono && idLogado && String(idDono) === String(idLogado)) || !!onAnuncioEliminado);
  
  const isPremium   = anuncio?.destacado === true;
  const isVerificado = anuncio?.utilizador?.tipo === 'admin' || anuncio?.utilizador?.premiumAtivo === true;
  const isProfissional = anuncio?.utilizador?.tipoConta === 'profissional' || anuncio?.utilizador?.tipo === 'admin';
  const tipoAnunciante = isProfissional ? 'Profissional' : 'Particular';

  const isCarro = anuncio?.tipo === 'carro';
  const isImovel = !isCarro;
  
  const marcaModeloFormatado = isCarro ? formatarMarcaModeloVeiculo(anuncio?.carro) : '';
  const tituloCard = anuncio?.titulo || marcaModeloFormatado || (isCarro ? 'Automóvel' : 'Imóvel');
  const local = anuncio?.localizacao?.cidade || anuncio?.localizacao?.distrito || 'Portugal';

  const imagemPrincipal = anuncio?.fotos?.[0] || anuncio?.imagens?.[0] || anuncio?.imagem;
  const imagemPrincipalUrl = getImageUrl(imagemPrincipal, 'original')
    || getImageUrl(imagemPrincipal, 'large')
    || getImageUrl(imagemPrincipal, 'medium')
    || getImageUrl(imagemPrincipal);
  const imagemPrincipalSrcSet = getImageSrcSet(imagemPrincipal);
  const imagemPrincipalDims = getImageDimensions(imagemPrincipal, { width: 800, height: 600 });

  const formatarCombustivel = (valor) => {
    if (!valor) return null;
    const mapa = { gasolina: 'Gasolina', diesel: 'Diesel', eletrico: 'Elétrico', hibrido: 'Híbrido', gpl: 'GPL' };
    return mapa[String(valor).toLowerCase()] || valor;
  };

  const formatarKm = (valor) => {
    const numero = Number(valor);
    if (!Number.isFinite(numero)) return null;
    return `${new Intl.NumberFormat('pt-PT').format(numero)} km`;
  };

  const formatarArea = (valor) => {
    const numero = Number(valor);
    if (!Number.isFinite(numero) || numero <= 0) return null;
    return `${new Intl.NumberFormat('pt-PT').format(numero)} m²`;
  };

  const detalhesPrimarios = isCarro ? [
    { icon: 'calendar', value: anuncio?.carro?.ano || null },
    { icon: 'gauge', value: formatarKm(anuncio?.carro?.km) },
    { icon: 'fuel', value: formatarCombustivel(anuncio?.carro?.combustivel) },
    { icon: 'gearbox', value: anuncio?.carro?.transmissao || null },
  ] : [
    { icon: 'home', value: anuncio?.imovel?.tipologia || anuncio?.imovel?.tipoImovel },
    { icon: 'ruler', value: formatarArea(anuncio?.imovel?.area) },
    { icon: 'bed', value: anuncio?.imovel?.quartos != null ? `${anuncio.imovel.quartos} qts` : null },
    { icon: 'garage', value: anuncio?.imovel?.garagem ? 'C/ Garagem' : null },
  ];

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
        /* ── CARTÃO BASE HORIZONTAL ── */
        .nx-card-horiz {
          display: flex;
          width: 100%;
          min-height: 200px; /* Reduzido ligeiramente para um formato perfeito */
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
          position: relative;
        }
        .nx-card-horiz:hover {
          border-color: #102f50;
          box-shadow: 0 16px 32px -16px rgba(7,19,38,0.15);
          transform: translateY(-2px);
        }

        /* ── O SUPER DESTAQUE ── */
        .nx-card-horiz.is-premium {
          border: 2px solid #d9c49c;
          box-shadow: 0 10px 25px -10px rgba(217, 196, 156, 0.4);
        }
        .nx-card-horiz.is-premium:hover {
          border-color: #c7a252;
          box-shadow: 0 18px 40px -15px rgba(217, 196, 156, 0.5);
          transform: translateY(-3px);
        }
        .nx-card-horiz.is-premium .nxc-action-pane {
          background: linear-gradient(135deg, #fdfbf7 0%, #f6edd7 100%);
          border-left: 1px solid rgba(217, 196, 156, 0.3);
        }
        .nx-badge-destaque {
          position: absolute;
          top: 12px; left: 12px;
          background: #d9c49c; color: #071326;
          font-size: 10px; font-weight: 900;
          padding: 6px 10px; border-radius: 6px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          z-index: 10;
          display: flex; align-items: center; gap: 4px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }
        .nx-badge-destaque svg { color: #071326; }

        /* ── IMAGEM DO CARTÃO (Dimensões perfeitas 4:3) ── */
        .nxc-img-pane {
          width: 280px; /* Largura perfeita para não sobrar fundo desfocado */
          flex-shrink: 0;
          position: relative;
          background: #0f172a; 
          overflow: hidden;
          display: flex;
        }
        
        .nxc-img-bg {
          position: absolute;
          inset: -24px;
          background-size: cover;
          background-position: center;
          filter: blur(16px) brightness(0.5); 
          z-index: 0;
        }
        
        .nxc-img-fg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain; /* GARANTIA ABSOLUTA DE NÃO CORTAR */
          z-index: 1;
          transition: transform 0.4s ease;
        }
        .nx-card-horiz:hover .nxc-img-fg {
          transform: scale(1.04);
        }

        .nxc-no-img {
          width: 100%; height: 100%; display: grid; place-items: center; background: #e2e8f0; color: #94a3b8; z-index: 1; position: relative;
        }

        /* OUTROS BADGES DA IMAGEM */
        .nxc-photo-count {
          position: absolute; bottom: 10px; right: 10px;
          background: rgba(15, 23, 42, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #fff; font-size: 10px; font-weight: 700;
          padding: 4px 8px; border-radius: 6px;
          display: flex; align-items: center; gap: 4px;
          backdrop-filter: blur(4px); z-index: 5;
        }
        .nxc-badge-status {
          position: absolute; top: 12px; right: 12px;
          font-size: 9px; font-weight: 900;
          padding: 5px 10px; border-radius: 6px;
          text-transform: uppercase; letter-spacing: .08em;
          z-index: 5; backdrop-filter: blur(4px);
        }

        /* ── CORPO CENTRAL ── */
        .nxc-body-pane {
          padding: 24px;
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center; 
        }
        .nxc-tags-row {
          display: flex; gap: 8px; margin-bottom: 12px; align-items: center;
        }
        .nxc-tag-pill {
          background: #f1f5f9; color: #475569;
          font-size: 10px; font-weight: 800;
          padding: 4px 8px; border-radius: 6px;
          text-transform: uppercase; letter-spacing: 0.05em;
        }
        .nxc-title {
          font-size: 19px; font-weight: 800; color: #071326;
          margin: 0 0 16px; line-height: 1.3;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        
        /* ── CAIXA DE ESPECIFICAÇÕES C/ ÍCONES ── */
        .nxc-specs-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 18px;
        }
        .nxc-spec-item {
          display: flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 600; color: #475569;
        }
        .nxc-spec-item svg { color: #94a3b8; }

        /* ── PAINEL LATERAL DIREITO (PREÇO/AÇÃO) ── */
        .nxc-action-pane {
          width: 220px;
          flex-shrink: 0;
          padding: 24px;
          border-left: 1px solid #f1f5f9;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-end;
          background: #fafcff;
        }
        .nxc-price {
          font-size: 26px; 
          font-weight: 900; color: #071326;
          white-space: nowrap; margin-bottom: 16px;
        }
        
        /* Perfil de vendedor no cartão */
        .nxc-seller-box {
          display: flex; align-items: center; justify-content: flex-end; gap: 8px; width: 100%; margin-bottom: 12px;
        }
        .nxc-seller-name {
          font-size: 12px; font-weight: 600; color: #64748b; text-align: right;
          display: flex; align-items: center; gap: 4px; flex-wrap: wrap; justify-content: flex-end;
        }
        .nxc-avatar {
          width: 24px; height: 24px; border-radius: 50%; background: #e2e8f0; 
          display: flex; align-items: center; justify-content: center; 
          font-size: 10px; font-weight: 800; color: #64748b; overflow: hidden; flex-shrink: 0;
        }
        .nxc-avatar img { width: 100%; height: 100%; object-fit: cover; }
        
        .nxc-loc {
          font-size: 12px; color: #94a3b8; display: flex; align-items: center; gap: 4px; font-weight: 600;
        }

        .nxc-icon { flex: 0 0 auto; display: inline-block; fill: none; stroke: currentColor; stroke-width: 1.9; stroke-linecap: round; stroke-linejoin: round; vertical-align: middle; }

        /* MODAL */
        .nxc-modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.72); z-index: 100000; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .nxc-modal-box { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px; max-width: 400px; width: 100%; text-align: center; }
        .nxc-modal-icon { margin: 0 auto 20px; display: flex; justify-content: center; }
        .nxc-modal-title { font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 10px; }
        .nxc-modal-text { font-size: 14px; color: #64748b; margin: 0 0 24px; line-height: 1.6; }
        .nxc-modal-actions { display: flex; gap: 10px; }
        .nxc-modal-cancel { flex: 1; padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1; background: #fff; color: #475569; font-weight: 700; cursor: pointer; }
        .nxc-modal-delete { flex: 1; padding: 12px; border-radius: 8px; border: none; background: #ef4444; color: #fff; font-weight: 800; cursor: pointer; }

        /* RESPONSIVO */
        @media (max-width: 768px) {
          .nx-card-horiz { flex-direction: column; min-height: auto; }
          .nxc-img-pane { width: 100%; height: 260px; min-height: auto; border-bottom: 1px solid #f1f5f9; }
          .nxc-body-pane { padding: 16px; }
          .nxc-action-pane { width: 100%; border-left: none; border-top: 1px solid #f1f5f9; flex-direction: row; justify-content: space-between; align-items: center; padding: 16px; }
          .nxc-price { margin-bottom: 0; font-size: 20px; }
          .nxc-seller-box { margin-bottom: 0; width: auto; }
          .nx-badge-destaque { padding: 5px 8px; font-size: 9px; }
        }
      `}</style>

      <Link to={anuncioPath(anuncio)} className={`nx-card-horiz ${isPremium ? 'is-premium' : ''}`}>

        {/* ── PAINEL DE IMAGEM ── */}
        <div className="nxc-img-pane">
          {/* Se for Destaque, exibe a etiqueta de Destaque Dourada e ignora qualquer outra etiqueta de status */}
          {isPremium ? (
            <span className="nx-badge-destaque">
              <CardIcon name="star" size={12} /> Destaque
            </span>
          ) : (
            /* Se NÃO for destaque, SÓ MOSTRA status como 'Pausado'/'A expirar' SE estiver na Área Pessoal do Vendedor */
            showStatus && anuncio?.estado && anuncio.estado !== 'ativo' && inMyProfile && (
              <span className="nxc-badge-status" style={{ background: status.bg, color: status.color, border: `1px solid ${status.border}` }}>
                {status.label}
              </span>
            )
          )}

          {imagemPrincipalUrl ? (
            <>
              {/* O fundo esfumado e escurecido */}
              <div className="nxc-img-bg" style={{ backgroundImage: `url(${imagemPrincipalUrl})` }}></div>
              {/* A imagem principal que nunca corta */}
              <img
                className="nxc-img-fg"
                src={imagemPrincipalUrl}
                srcSet={imagemPrincipalSrcSet || undefined}
                sizes="(max-width: 768px) 100vw, 360px"
                width={imagemPrincipalDims.width}
                height={imagemPrincipalDims.height}
                alt={tituloCard}
                loading="lazy"
                decoding="async"
                onLoad={() => setImgCarregada(true)}
              />
            </>
          ) : (
            <div className="nxc-no-img">
              <CardIcon name={isImovel ? 'home' : 'car'} size={44} />
            </div>
          )}

          {anuncio?.fotos?.length > 1 && (
            <div className="nxc-photo-count">
              <CardIcon name="camera" size={12} /> {anuncio.fotos.length}
            </div>
          )}
        </div>

        {/* ── PAINEL CENTRAL (TEXTO E SPECS) ── */}
        <div className="nxc-body-pane">
          <div className="nxc-tags-row">
            <span className="nxc-tag-pill">{tipoAnunciante}</span>
            <span className="nxc-tag-pill">{isCarro ? 'Automóvel' : 'Imóvel'}</span>
          </div>

          <h3 className="nxc-title">{tituloCard}</h3>

          <div className="nxc-specs-grid">
            {detalhesPrimarios.filter(d => d.value).map((det, idx) => (
              <div key={idx} className="nxc-spec-item">
                <CardIcon name={det.icon} size={15} />
                <span>{det.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── PAINEL DIREITO (PREÇO, LOCAL E VENDEDOR) ── */}
        <div className="nxc-action-pane">
          <div className="nxc-seller-box">
            <div className="nxc-seller-name">
              {eMeuAnuncio ? 'O teu anúncio' : (anuncio?.utilizador?.nome || 'Anunciante')}
              {isVerificado && <CardIcon name="check" size={13} color="#2563eb" />}
            </div>
            <div className="nxc-avatar">
              {anuncio?.utilizador?.avatarUrl ? <img src={anuncio.utilizador.avatarUrl} alt="" /> : inicial}
            </div>
          </div>

          <div className="nxc-price">{preco}</div>

          {local && (
            <div className="nxc-loc">
              <CardIcon name="location" size={13} /> {local}
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
            <p className="nxc-modal-text">Esta ação é permanente e irreversível.</p>
            <div className="nxc-modal-actions">
              <button type="button" className="nxc-modal-cancel" onClick={handleFecharModal} disabled={eliminando}>Cancelar</button>
              <button type="button" className="nxc-modal-delete" onClick={confirmarEliminacao} disabled={eliminando}>{eliminando ? 'A apagar…' : 'Apagar'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}