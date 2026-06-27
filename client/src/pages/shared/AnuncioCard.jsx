import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import Icon from '@mdi/react';
import { mdiStarCircle, mdiCameraOutline, mdiTrashCanOutline, mdiCheckDecagram, mdiMapMarkerOutline } from '@mdi/js';

export default function AnuncioCard({ anuncio, showStatus = false, onAnuncioEliminado }) {
  const { user, signed } = useAuth();

  const [eliminando, setEliminando] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  const preco = anuncio?.preco
    ? new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(anuncio.preco)
    : 'Sob Consulta';

  const inicial = anuncio?.utilizador?.nome?.charAt(0).toUpperCase() || '?';

  const statusConfig = {
    ativo:    { bg: 'rgba(16,185,129,.12)',  color: '#10b981', border: 'rgba(16,185,129,.2)', label: 'Activo' },
    pausado:  { bg: 'rgba(239,68,68,.12)',   color: '#ef4444', border: 'rgba(239,68,68,.2)',  label: 'Pausado' },
    expirado: { bg: 'rgba(245,158,11,.12)',  color: '#f59e0b', border: 'rgba(245,158,11,.2)', label: 'A expirar' },
    pendente: { bg: 'rgba(59,130,246,.12)',  color: '#3b82f6', border: 'rgba(59,130,246,.2)', label: 'Pendente' },
  };
  const status = statusConfig[anuncio?.estado] || statusConfig.pendente;

  const idDono   = anuncio?.utilizador?._id || anuncio?.utilizador?.id || anuncio?.utilizador;
  const idLogado = user?._id || user?.id;
  const eMeuAnuncio = signed && ((idDono && idLogado && String(idDono) === String(idLogado)) || !!onAnuncioEliminado);
  const isPremium   = anuncio?.destacado === true;
  const isVerificado = anuncio?.utilizador?.tipo === 'admin' || anuncio?.utilizador?.premiumAtivo === true;
  const isCarro = anuncio?.tipo === 'carro';

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
          background: #0d1117;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          overflow: hidden;
          transition: transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s ease, border-color .3s ease;
          color: #ffffff;
          position: relative;
        }
        .nxc-wrap:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.45);
          border-color: rgba(255,255,255,0.12);
        }
        .nxc-wrap.premium {
          border-color: rgba(234,179,8,0.3);
          box-shadow: 0 0 0 1px rgba(234,179,8,0.08) inset, 0 4px 20px rgba(234,179,8,0.08);
        }
        .nxc-wrap.premium:hover {
          border-color: rgba(234,179,8,0.5);
          box-shadow: 0 20px 40px rgba(234,179,8,0.15);
        }

        /* ── IMAGEM ── */
        .nxc-img {
          position: relative;
          aspect-ratio: 16/10;
          overflow: hidden;
          background: #080c12;
        }
        .nxc-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .5s cubic-bezier(.16,1,.3,1);
          display: block;
        }
        .nxc-wrap:hover .nxc-img img { transform: scale(1.05); }

        /* Gradient overlay for readability */
        .nxc-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.55) 0%,
            rgba(0,0,0,0.1) 40%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 1;
        }

        .nxc-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          opacity: .08;
          background: linear-gradient(135deg, #0d1117 0%, #111827 100%);
        }

        /* ── BADGES ── */
        .nxc-badge-premium {
          position: absolute;
          top: 12px;
          left: 12px;
          background: linear-gradient(135deg, #eab308 0%, #f59e0b 100%);
          color: #000;
          font-size: 9px;
          font-weight: 900;
          padding: 4px 9px;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: .1em;
          display: flex;
          align-items: center;
          gap: 4px;
          z-index: 5;
          box-shadow: 0 3px 10px rgba(234,179,8,0.35);
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

        /* Tipo badge (car / home) - bottom-left, always visible */
        .nxc-badge-tipo {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.7);
          font-size: 9px;
          font-weight: 700;
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
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(239,68,68,0.3);
          color: #f87171;
          font-size: 9px;
          font-weight: 800;
          padding: 5px 9px;
          border-radius: 6px;
          cursor: pointer;
          z-index: 10;
          text-transform: uppercase;
          letter-spacing: .05em;
          transition: all .2s;
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: var(--nx-font-body, 'Inter', sans-serif);
        }
        .nxc-delete-btn:hover {
          background: #ef4444;
          color: #fff;
          border-color: #ef4444;
          box-shadow: 0 4px 12px rgba(239,68,68,0.35);
        }
        .nxc-photo-count {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.8);
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
          padding: 14px 16px 12px;
          display: flex;
          flex-direction: column;
          flex: 1;
          background: #0d1117;
          gap: 6px;
        }

        .nxc-price-row {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        .nxc-price {
          font-family: var(--nx-font-display, 'Plus Jakarta Sans', sans-serif);
          font-size: 19px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -.03em;
          line-height: 1;
        }
        .nxc-wrap.premium .nxc-price { color: #eab308; }

        .nxc-title {
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.45);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .nxc-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 3px;
        }
        .nxc-tag {
          font-size: 10px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 5px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.35);
          white-space: nowrap;
          letter-spacing: .01em;
        }
        .nxc-wrap.premium .nxc-tag {
          background: rgba(234,179,8,0.06);
          border-color: rgba(234,179,8,0.12);
          color: rgba(234,179,8,0.6);
        }

        /* ── SEPARATOR ── */
        .nxc-sep {
          height: 1px;
          background: rgba(255,255,255,0.04);
          margin: 0;
        }

        /* ── FOOTER ── */
        .nxc-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          background: #0d1117;
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
          background: #1a2234;
          border: 1px solid rgba(255,255,255,0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          font-weight: 800;
          color: rgba(255,255,255,0.4);
          overflow: hidden;
          flex-shrink: 0;
        }
        .nxc-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .nxc-username {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .nxc-username.mine {
          color: rgba(255,255,255,0.5);
          font-weight: 700;
        }

        /* ── LOCALIZAÇÃO no footer ── */
        .nxc-loc {
          display: flex;
          align-items: center;
          gap: 3px;
          font-size: 10px;
          color: rgba(255,255,255,0.22);
          font-weight: 600;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* ── MODAL ── */
        .nxc-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(2,6,23,0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          z-index: 100000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: nxc-fade .2s ease;
        }
        @keyframes nxc-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .nxc-modal-box {
          background: #0d1117;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 40px 32px;
          max-width: 400px;
          width: 100%;
          text-align: center;
          box-shadow: 0 32px 64px rgba(0,0,0,0.7);
          animation: nxc-pop .25s cubic-bezier(.16,1,.3,1);
        }
        @keyframes nxc-pop {
          from { transform: scale(.9) translateY(12px); opacity: 0; }
          to   { transform: scale(1) translateY(0);    opacity: 1; }
        }
        .nxc-modal-icon {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }
        .nxc-modal-title {
          font-family: var(--nx-font-display, 'Plus Jakarta Sans', sans-serif);
          font-size: 21px;
          font-weight: 800;
          color: #fff;
          margin: 0 0 10px;
          letter-spacing: -.02em;
        }
        .nxc-modal-text {
          font-size: 14px;
          color: rgba(255,255,255,0.45);
          line-height: 1.75;
          margin: 0 0 28px;
        }
        .nxc-modal-text strong { color: rgba(255,255,255,0.75); }
        .nxc-modal-actions { display: flex; gap: 10px; }
        .nxc-modal-cancel {
          flex: 1;
          padding: 13px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          background: transparent;
          color: rgba(255,255,255,0.45);
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all .2s;
          font-family: var(--nx-font-body, 'Inter', sans-serif);
          letter-spacing: .02em;
        }
        .nxc-modal-cancel:hover { background: rgba(255,255,255,0.04); color: #fff; border-color: rgba(255,255,255,0.15); }
        .nxc-modal-delete {
          flex: 1;
          padding: 13px;
          border-radius: 10px;
          border: none;
          background: #ef4444;
          color: #fff;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          transition: all .2s;
          font-family: var(--nx-font-body, 'Inter', sans-serif);
          letter-spacing: .03em;
          box-shadow: 0 4px 16px rgba(239,68,68,0.3);
        }
        .nxc-modal-delete:hover { background: #dc2626; box-shadow: 0 6px 20px rgba(239,68,68,0.4); }
        .nxc-modal-delete:disabled { opacity: .4; cursor: not-allowed; box-shadow: none; }
      `}</style>

      <Link to={`/anuncio/${anuncio?._id}`} className={`nxc-wrap${isPremium ? ' premium' : ''}`}>

        {/* ── IMAGEM ── */}
        <div className="nxc-img">
          {anuncio?.fotos?.[0]
            ? <img src={anuncio.fotos[0]} alt={anuncio.titulo} loading="lazy" />
            : <div className="nxc-placeholder">{isCarro ? '🚗' : '🏠'}</div>
          }
          <div className="nxc-img-overlay" />

          {/* Tipo badge */}
          <span className="nxc-badge-tipo">{isCarro ? 'Automóvel' : 'Imóvel'}</span>

          {isPremium && (
            <span className="nxc-badge-premium">
              <Icon path={mdiStarCircle} size={0.45} /> Destaque
            </span>
          )}

          {!isPremium && showStatus && anuncio?.estado && !eMeuAnuncio && (
            <span className="nxc-badge-status" style={{ background: status.bg, color: status.color, border: `1px solid ${status.border}` }}>
              {status.label}
            </span>
          )}

          {eMeuAnuncio && (
            <button type="button" className="nxc-delete-btn" onClick={handleAbrirModal}>
              <Icon path={mdiTrashCanOutline} size={0.45} /> Apagar
            </button>
          )}

          {anuncio?.fotos?.length > 1 && (
            <div className="nxc-photo-count">
              <Icon path={mdiCameraOutline} size={0.45} /> {anuncio.fotos.length}
            </div>
          )}
        </div>

        {/* ── BODY ── */}
        <div className="nxc-body">
          <div className="nxc-price">{preco}</div>
          <div className="nxc-title">{anuncio?.titulo}</div>
          <div className="nxc-tags">
            {anuncio?.imovel?.area        && <span className="nxc-tag">{anuncio.imovel.area} m²</span>}
            {anuncio?.imovel?.tipologia   && <span className="nxc-tag">{anuncio.imovel.tipologia}</span>}
            {anuncio?.carro?.marca        && <span className="nxc-tag">{anuncio.carro.marca}{anuncio.carro.modelo ? ` ${anuncio.carro.modelo}` : ''}</span>}
            {anuncio?.carro?.km != null   && <span className="nxc-tag">{new Intl.NumberFormat('pt-PT').format(anuncio.carro.km)} km</span>}
            {anuncio?.carro?.ano          && <span className="nxc-tag">{anuncio.carro.ano}</span>}
            {anuncio?.carro?.combustivel  && <span className="nxc-tag">{anuncio.carro.combustivel}</span>}
          </div>
        </div>

        <div className="nxc-sep" />

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
                <Icon path={mdiCheckDecagram} size={0.42} color="#3b82f6" title="Vendedor Verificado" style={{ flexShrink: 0 }} />
              )}
            </span>
          </div>

          {anuncio?.localizacao?.cidade && (
            <div className="nxc-loc">
              <Icon path={mdiMapMarkerOutline} size={0.45} />
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
              <Icon path={mdiTrashCanOutline} size={1.4} color="#ef4444" />
            </div>
            <h3 className="nxc-modal-title">Eliminar este anúncio?</h3>
            <p className="nxc-modal-text">
              Esta ação é <strong>permanente e irreversível</strong>. O anúncio será removido imediatamente.
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