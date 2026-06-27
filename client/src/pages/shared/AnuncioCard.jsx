import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import Icon from '@mdi/react';
import { mdiStarCircle, mdiCameraOutline, mdiTrashCanOutline, mdiCheckDecagram } from '@mdi/js';

export default function AnuncioCard({ anuncio, showStatus = false, onAnuncioEliminado }) {
  const { user, signed } = useAuth();

  const [eliminando, setEliminando] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  const preco = anuncio?.preco
    ? new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(anuncio.preco)
    : 'Sob Consulta';

  const inicial = anuncio?.utilizador?.nome?.charAt(0).toUpperCase() || '?';

  const statusConfig = {
    ativo:    { bg: 'rgba(16,185,129,.1)',  color: '#10b981', border: 'rgba(16,185,129,.25)', label: 'Activo' },
    pausado:  { bg: 'rgba(239,68,68,.1)',   color: '#ef4444', border: 'rgba(239,68,68,.25)',  label: 'Pausado' },
    expirado: { bg: 'rgba(245,158,11,.1)',  color: '#f59e0b', border: 'rgba(245,158,11,.25)', label: 'A expirar' },
    pendente: { bg: 'rgba(59,130,246,.1)',  color: '#3b82f6', border: 'rgba(59,130,246,.25)', label: 'Pendente' },
  };
  const status = statusConfig[anuncio?.estado] || statusConfig.pendente;

  const idDono   = anuncio?.utilizador?._id || anuncio?.utilizador?.id || anuncio?.utilizador;
  const idLogado = user?._id || user?.id;
  const eMeuAnuncio = signed && ((idDono && idLogado && String(idDono) === String(idLogado)) || !!onAnuncioEliminado);
  const isPremium   = anuncio?.destacado === true;
  const isVerificado = anuncio?.utilizador?.tipo === 'admin' || anuncio?.utilizador?.premiumAtivo === true;

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
        /* ── CARD BASE ── */
        .nxc-wrap {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          background: #111827;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          overflow: hidden;
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
          color: #ffffff;
          position: relative;
        }
        .nxc-wrap:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.35);
          border-color: rgba(255,255,255,0.14);
        }
        .nxc-wrap.premium {
          border-color: rgba(234,179,8,0.35);
          box-shadow: 0 4px 16px rgba(234,179,8,0.1);
        }
        .nxc-wrap.premium:hover {
          border-color: rgba(234,179,8,0.55);
          box-shadow: 0 10px 24px rgba(234,179,8,0.18);
        }

        /* ── IMAGEM ── */
        .nxc-img {
          position: relative;
          aspect-ratio: 3/2;
          overflow: hidden;
          background: #0d1117;
        }
        .nxc-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .45s ease;
          display: block;
        }
        .nxc-wrap:hover .nxc-img img { transform: scale(1.03); }
        .nxc-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          opacity: .15;
        }

        /* ── BADGES ── */
        .nxc-badge-premium {
          position: absolute;
          top: 10px;
          left: 10px;
          background: linear-gradient(135deg, #eab308, #ca8a04);
          color: #000;
          font-size: 9px;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 5px;
          text-transform: uppercase;
          letter-spacing: .07em;
          display: flex;
          align-items: center;
          gap: 3px;
          z-index: 5;
          box-shadow: 0 2px 8px rgba(234,179,8,0.3);
        }
        .nxc-badge-status {
          position: absolute;
          top: 10px;
          left: 10px;
          font-size: 9px;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 5px;
          text-transform: uppercase;
          letter-spacing: .06em;
          z-index: 5;
        }
        .nxc-delete-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(239,68,68,0.35);
          color: #f87171;
          font-size: 9px;
          font-weight: 800;
          padding: 4px 8px;
          border-radius: 5px;
          cursor: pointer;
          z-index: 10;
          text-transform: uppercase;
          letter-spacing: .04em;
          transition: all .2s;
          display: flex;
          align-items: center;
          gap: 3px;
          font-family: var(--nx-font-body, 'Inter', sans-serif);
        }
        .nxc-delete-btn:hover {
          background: #ef4444;
          color: #fff;
          border-color: #ef4444;
        }
        .nxc-photo-count {
          position: absolute;
          bottom: 9px;
          right: 9px;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.85);
          font-size: 10px;
          font-weight: 700;
          padding: 3px 7px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          gap: 3px;
        }

        /* ── BODY ── */
        .nxc-body {
          padding: 12px 14px 10px;
          display: flex;
          flex-direction: column;
          flex: 1;
          background: #111827;
          gap: 6px;
        }
        .nxc-price {
          font-family: var(--nx-font-display, 'Plus Jakarta Sans', sans-serif);
          font-size: 17px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -.02em;
          line-height: 1;
        }
        .nxc-wrap.premium .nxc-price { color: #eab308; }

        .nxc-title {
          font-size: 12px;
          font-weight: 500;
          color: #9ca3af;
          line-height: 1.45;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .nxc-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 2px;
        }
        .nxc-tag {
          font-size: 10px;
          font-weight: 600;
          padding: 3px 7px;
          border-radius: 5px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          color: #6b7280;
          white-space: nowrap;
        }

        /* ── FOOTER ── */
        .nxc-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px;
          border-top: 1px solid rgba(255,255,255,0.05);
          background: #0d1117;
        }
        .nxc-user {
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .nxc-avatar {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #1f2937;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          font-weight: 800;
          color: #9ca3af;
          overflow: hidden;
          flex-shrink: 0;
        }
        .nxc-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .nxc-username {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: #4b5563;
          font-weight: 600;
        }

        /* ── MODAL ── */
        .nxc-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(2,6,23,0.82);
          backdrop-filter: blur(12px);
          z-index: 100000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .nxc-modal-box {
          background: #111827;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 36px 28px;
          max-width: 400px;
          width: 100%;
          text-align: center;
          box-shadow: 0 24px 48px rgba(0,0,0,0.6);
          animation: nxc-pop .22s cubic-bezier(.175,.885,.32,1.275);
        }
        @keyframes nxc-pop {
          from { transform: scale(.93); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        .nxc-modal-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 18px;
        }
        .nxc-modal-title {
          font-family: var(--nx-font-display, 'Plus Jakarta Sans', sans-serif);
          font-size: 20px;
          font-weight: 800;
          color: #fff;
          margin: 0 0 8px;
        }
        .nxc-modal-text {
          font-size: 14px;
          color: #9ca3af;
          line-height: 1.7;
          margin: 0 0 26px;
        }
        .nxc-modal-text strong { color: #fff; }
        .nxc-modal-actions { display: flex; gap: 10px; }
        .nxc-modal-cancel {
          flex: 1;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: #9ca3af;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all .2s;
          font-family: var(--nx-font-body, 'Inter', sans-serif);
        }
        .nxc-modal-cancel:hover { background: rgba(255,255,255,0.05); color: #fff; }
        .nxc-modal-delete {
          flex: 1;
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: #ef4444;
          color: #fff;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          transition: opacity .2s;
          font-family: var(--nx-font-body, 'Inter', sans-serif);
        }
        .nxc-modal-delete:hover { opacity: .88; }
        .nxc-modal-delete:disabled { opacity: .45; cursor: not-allowed; }
      `}</style>

      <Link to={`/anuncio/${anuncio?._id}`} className={`nxc-wrap${isPremium ? ' premium' : ''}`}>

        {/* ── IMAGEM ── */}
        <div className="nxc-img">
          {anuncio?.fotos?.[0]
            ? <img src={anuncio.fotos[0]} alt={anuncio.titulo} loading="lazy" />
            : <div className="nxc-placeholder">{anuncio?.tipo === 'carro' ? '🚗' : '🏠'}</div>
          }

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
            {anuncio?.localizacao?.cidade  && <span className="nxc-tag">{anuncio.localizacao.cidade}</span>}
            {anuncio?.imovel?.area         && <span className="nxc-tag">{anuncio.imovel.area} m²</span>}
            {anuncio?.imovel?.tipologia    && <span className="nxc-tag">{anuncio.imovel.tipologia}</span>}
            {anuncio?.carro?.marca         && <span className="nxc-tag">{anuncio.carro.marca} {anuncio.carro.modelo || ''}</span>}
            {anuncio?.carro?.km   != null  && <span className="nxc-tag">{new Intl.NumberFormat('pt-PT').format(anuncio.carro.km)} km</span>}
            {anuncio?.carro?.ano           && <span className="nxc-tag">{anuncio.carro.ano}</span>}
          </div>
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
            <span className="nxc-username">
              {eMeuAnuncio ? 'O teu anúncio' : (anuncio?.utilizador?.nome || 'Anunciante')}
              {isVerificado && (
                <Icon path={mdiCheckDecagram} size={0.45} color="#3b82f6" title="Vendedor Verificado" style={{ flexShrink: 0 }} />
              )}
            </span>
          </div>
        </div>

      </Link>

      {/* ── MODAL ELIMINAR ── */}
      {mostrarModal && (
        <div className="nxc-modal-overlay" onClick={handleFecharModal}>
          <div className="nxc-modal-box" onClick={e => e.stopPropagation()}>
            <div className="nxc-modal-icon">
              <Icon path={mdiTrashCanOutline} size={1.3} color="#ef4444" />
            </div>
            <h3 className="nxc-modal-title">Eliminar Anúncio?</h3>
            <p className="nxc-modal-text">
              Tens a certeza absoluta? Esta ação é <strong>irreversível</strong>.
            </p>
            <div className="nxc-modal-actions">
              <button type="button" className="nxc-modal-cancel" onClick={handleFecharModal} disabled={eliminando}>
                Cancelar
              </button>
              <button type="button" className="nxc-modal-delete" onClick={confirmarEliminacao} disabled={eliminando}>
                {eliminando ? 'A apagar...' : 'Sim, apagar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}