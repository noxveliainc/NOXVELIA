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
    ativo:    { bg: 'rgba(16,185,129,.12)', color: '#34d399', border: 'rgba(16,185,129,.3)', label: 'Activo' },
    pausado:  { bg: 'rgba(239,68,68,.12)',  color: '#f87171', border: 'rgba(239,68,68,.3)',  label: 'Pausado' },
    expirado: { bg: 'rgba(245,158,11,.12)', color: '#fbbf24', border: 'rgba(245,158,11,.3)', label: 'A expirar' },
    pendente: { bg: 'rgba(59,130,246,.12)', color: '#60a5fa', border: 'rgba(59,130,246,.3)', label: 'Pendente' },
  };
  const status = statusConfig[anuncio?.estado] || statusConfig.pendente;

  const idDono   = anuncio?.utilizador?._id || anuncio?.utilizador?.id || anuncio?.utilizador;
  const idLogado = user?._id || user?.id;
  const eMeuAnuncio = signed && ((idDono && idLogado && String(idDono) === String(idLogado)) || !!onAnuncioEliminado);
  const isPremium   = anuncio?.destacado === true;

  // 🌟 LÓGICA DO VENDEDOR VERIFICADO
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
        .nxc-wrap { display: flex; flex-direction: column; text-decoration: none; background: #0b0f19; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; overflow: hidden; transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease; color: #ffffff; position: relative; }
        .nxc-wrap:hover { transform: translateY(-4px); box-shadow: 0 16px 32px rgba(0,0,0,0.4); border-color: var(--nx-accent-car, #2ac1b4); }
        .nxc-wrap.premium { border-color: var(--nx-gold, #eab308); box-shadow: 0 6px 20px rgba(234,179,8,0.15); }
        .nxc-wrap.premium:hover { box-shadow: 0 12px 30px rgba(234,179,8,0.25); border-color: #ca8a04; }

        .nxc-img { position: relative; aspect-ratio: 16/10; overflow: hidden; background: #060a14; }
        .nxc-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease; display: block; }
        .nxc-wrap:hover .nxc-img img { transform: scale(1.04); }
        .nxc-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 32px; opacity: .2; }

        .nxc-badge-premium { position: absolute; top: 8px; left: 8px; background: var(--nx-gold, #eab308); color: #000; font-size: 9px; font-weight: 800; padding: 4px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: .06em; display: flex; align-items: center; gap: 4px; z-index: 5; }
        .nxc-badge-status { position: absolute; top: 8px; left: 8px; font-size: 9px; font-weight: 800; padding: 4px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: .06em; z-index: 5; }

        .nxc-delete-btn { position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,0.65); backdrop-filter: blur(6px); border: 1px solid rgba(239,68,68,0.4); color: #f87171; font-size: 9px; font-weight: 800; padding: 4px 8px; border-radius: 4px; cursor: pointer; z-index: 10; text-transform: uppercase; letter-spacing: .04em; transition: all .2s; display: flex; align-items: center; gap: 4px; font-family: var(--nx-font-body, 'Inter', sans-serif); }
        .nxc-delete-btn:hover { background: var(--nx-danger, #ef4444); color: #fff; border-color: var(--nx-danger, #ef4444); }

        .nxc-photo-count { position: absolute; bottom: 8px; left: 8px; background: rgba(0,0,0,0.65); backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.1); color: #fff; font-size: 10px; font-weight: 700; padding: 3px 6px; border-radius: 4px; display: flex; align-items: center; gap: 3px; }

        .nxc-body { padding: 12px 14px; display: flex; flex-direction: column; flex: 1; background: #0b0f19; }
        .nxc-price { font-family: var(--nx-font-display, 'Plus Jakarta Sans', sans-serif); font-size: 18px; font-weight: 800; color: #ffffff; letter-spacing: -.02em; line-height: 1; margin-bottom: 4px; }
        .nxc-wrap.premium .nxc-price { color: var(--nx-gold, #eab308); }

        .nxc-title { font-size: 12px; font-weight: 500; color: #94a3b8; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; height: 34px; margin-bottom: 10px; }

        .nxc-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-top: auto; }
        .nxc-tag { font-size: 10px; font-weight: 700; padding: 3px 6px; border-radius: 4px; background: #060a14; border: 1px solid rgba(255,255,255,0.08); color: #64748b; }

        .nxc-footer { display: flex; align-items: center; justify-content: space-between; padding: 8px 14px; border-top: 1px solid rgba(255,255,255,0.06); background: #060a14; }
        .nxc-user { display: flex; align-items: center; gap: 6px; }
        .nxc-avatar { width: 20px; height: 20px; border-radius: 50%; background: #1e293b; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 800; color: #fff; overflow: hidden; flex-shrink: 0; }
        .nxc-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .nxc-username { display: flex; align-items: center; gap: 4px; font-size: 11px; color: #475569; font-weight: 700; }

        .nxc-modal-overlay { position: fixed; inset: 0; background: rgba(2,6,23,0.85); backdrop-filter: blur(12px); z-index: 100000; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .nxc-modal-box { background: #0b0f19; border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 36px 28px; max-width: 420px; width: 100%; text-align: center; box-shadow: 0 24px 48px rgba(0,0,0,0.6); animation: nxc-pop .25s cubic-bezier(.175,.885,.32,1.275); }
        @keyframes nxc-pop { from { transform: scale(.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .nxc-modal-icon { width: 70px; height: 70px; border-radius: 50%; background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.2); display: flex; align-items: center; justify-content: center; margin: 0 auto 18px; }
        .nxc-modal-title { font-family: var(--nx-font-display, 'Plus Jakarta Sans', sans-serif); font-size: 21px; font-weight: 800; color: #fff; margin: 0 0 10px; }
        .nxc-modal-text { font-size: 14px; color: #94a3b8; line-height: 1.7; margin: 0 0 28px; }
        .nxc-modal-text strong { color: #fff; }
        .nxc-modal-actions { display: flex; gap: 12px; }
        .nxc-modal-cancel { flex: 1; padding: 13px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12); background: transparent; color: #94a3b8; font-size: 14px; font-weight: 700; cursor: pointer; transition: all .2s; font-family: var(--nx-font-body, 'Inter', sans-serif); }
        .nxc-modal-cancel:hover { background: rgba(255,255,255,0.05); color: #fff; border-color: rgba(255,255,255,0.2); }
        .nxc-modal-delete { flex: 1; padding: 13px; border-radius: 10px; border: none; background: var(--nx-danger, #ef4444); color: #fff; font-size: 14px; font-weight: 800; cursor: pointer; transition: opacity .2s; box-shadow: 0 4px 14px rgba(239,68,68,0.3); font-family: var(--nx-font-body, 'Inter', sans-serif); }
        .nxc-modal-delete:hover { opacity: .88; }
        .nxc-modal-delete:disabled { opacity: .45; cursor: not-allowed; }
      `}</style>

      <Link to={`/anuncio/${anuncio?._id}`} className={`nxc-wrap${isPremium ? ' premium' : ''}`}>
        <div className="nxc-img">
          {anuncio?.fotos?.[0]
            ? <img src={anuncio.fotos[0]} alt={anuncio.titulo} loading="lazy" />
            : <div className="nxc-placeholder">{anuncio?.tipo === 'carro' ? '🚗' : '🏠'}</div>
          }

          {isPremium && (
            <span className="nxc-badge-premium">
              <Icon path={mdiStarCircle} size={0.5} /> Destaque
            </span>
          )}

          {!isPremium && showStatus && anuncio?.estado && !eMeuAnuncio && (
            <span className="nxc-badge-status" style={{ background: status.bg, color: status.color, border: `1px solid ${status.border}` }}>
              {status.label}
            </span>
          )}

          {eMeuAnuncio && (
            <button type="button" className="nxc-delete-btn" onClick={handleAbrirModal}>
              <Icon path={mdiTrashCanOutline} size={0.5} /> Apagar
            </button>
          )}

          {anuncio?.fotos?.length > 1 && (
            <div className="nxc-photo-count">
              <Icon path={mdiCameraOutline} size={0.5} /> {anuncio.fotos.length}
            </div>
          )}
        </div>

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

        <div className="nxc-footer">
          <div className="nxc-user">
            <div className="nxc-avatar">
              {anuncio?.utilizador?.avatarUrl ? <img src={anuncio.utilizador.avatarUrl} alt="" /> : inicial}
            </div>
            
            {/* 🌟 SELO DE VERIFICADO AQUI */}
            <span className="nxc-username">
              {eMeuAnuncio ? 'O teu anúncio' : (anuncio?.utilizador?.nome || 'Anunciante')}
              {isVerificado && <Icon path={mdiCheckDecagram} size={0.5} color="#3b82f6" title="Vendedor Verificado" style={{ flexShrink: 0 }} />}
            </span>
          </div>
        </div>
      </Link>

      {mostrarModal && (
        <div className="nxc-modal-overlay" onClick={handleFecharModal}>
          <div className="nxc-modal-box" onClick={e => e.stopPropagation()}>
            <div className="nxc-modal-icon"><Icon path={mdiTrashCanOutline} size={1.4} color="#ef4444" /></div>
            <h3 className="nxc-modal-title">Eliminar Anúncio?</h3>
            <p className="nxc-modal-text">Tens a certeza absoluta? Esta ação é <strong>irreversível</strong>.</p>
            <div className="nxc-modal-actions">
              <button type="button" className="nxc-modal-cancel" onClick={handleFecharModal} disabled={eliminando}>Cancelar</button>
              <button type="button" className="nxc-modal-delete" onClick={confirmarEliminacao} disabled={eliminando}>{eliminando ? 'A apagar...' : 'Sim, apagar'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}