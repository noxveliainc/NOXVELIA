import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { Icon } from '@mdi/react';
import { mdiStarCircle, mdiCameraOutline, mdiTrashCanOutline, mdiCheckDecagram, mdiMapMarkerOutline } from '@mdi/js';
import { anuncioPath } from '../../utils/seo';

export default function AnuncioCard({ anuncio, showStatus = false, onAnuncioEliminado, forceSellerIdentity = false }) {
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
  const eMeuAnuncio = !forceSellerIdentity && signed && ((idDono && idLogado && String(idDono) === String(idLogado)) || !!onAnuncioEliminado);
  const isPremium   = anuncio?.destacado === true;
  const isVerificado = anuncio?.utilizador?.tipo === 'admin' || anuncio?.utilizador?.premiumAtivo === true;
  const isCarro = anuncio?.tipo === 'carro';
  const precoAnalise = anuncio?.precoAnalise;
  const scoreQualidade = Number(anuncio?.scoreQualidade || 0);
  const qualidadePercentagem = Math.max(0, Math.min(100, Math.round((scoreQualidade / 10) * 100)));

  // 🌟 Tratamento da Tag Ano/Mês
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
    { label: 'Quilometros', value: anuncio?.carro?.km != null ? `${new Intl.NumberFormat('pt-PT').format(anuncio.carro.km)} km` : null },
    { label: 'Combustivel', value: formatarCombustivel(anuncio?.carro?.combustivel) },
    { label: 'Cilindrada', value: anuncio?.carro?.cilindrada ? `${new Intl.NumberFormat('pt-PT').format(anuncio.carro.cilindrada)} cc` : null },
  ] : [
    { label: 'Tipo', value: anuncio?.imovel?.tipologia || anuncio?.imovel?.tipoImovel },
    { label: 'Area', value: anuncio?.imovel?.area ? `${anuncio.imovel.area} m2` : null },
    { label: 'Quartos', value: anuncio?.imovel?.quartos != null ? `${anuncio.imovel.quartos}` : null },
    { label: 'Zona', value: anuncio?.localizacao?.cidade },
  ]).filter(item => item.value).slice(0, 3);

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
          border-radius: 18px;
          overflow: hidden;
          transition: transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s ease, border-color .3s ease;
          color: #0f172a;
          position: relative;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }
        .nxc-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.9);
        }
        .nxc-wrap:hover {
          transform: translateY(-5px);
          box-shadow: 0 24px 38px -18px rgba(15,23,42,0.28);
          border-color: #cbd5e1;
        }
        .nxc-wrap.premium {
          border-color: rgba(234, 179, 8, 0.4);
          box-shadow: 0 0 0 1px rgba(234, 179, 8, 0.15) inset, 0 4px 20px rgba(234, 179, 8, 0.1);
        }
        .nxc-wrap.premium:hover {
          border-color: rgba(234, 179, 8, 0.6);
          box-shadow: 0 20px 40px rgba(234, 179, 8, 0.15);
        }

        /* ── IMAGEM ── */
        .nxc-img {
          position: relative;
          aspect-ratio: 16/10;
          overflow: hidden;
          background: #f8fafc;
        }
        .nxc-img::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.16), transparent 36%);
          opacity: 0;
          transition: opacity .3s;
          z-index: 2;
          pointer-events: none;
        }
        .nxc-wrap:hover .nxc-img::after { opacity: 1; }
        .nxc-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .5s cubic-bezier(.16,1,.3,1);
          display: block;
        }
        .nxc-wrap:hover .nxc-img img { transform: scale(1.05); }

        /* Overlay para legibilidade das tags */
        .nxc-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(15, 23, 42, 0.6) 0%,
            rgba(15, 23, 42, 0.1) 40%,
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
          color: #cbd5e1;
        }

        /* ── BADGES ── */
        .nxc-badge-premium {
          position: absolute;
          top: 12px;
          left: 12px;
          background: linear-gradient(135deg, #eab308 0%, #f59e0b 100%);
          color: #fff;
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

        .nxc-badge-tipo {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
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
          backdrop-filter: blur(8px);
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
          transition: all .2s;
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
          backdrop-filter: blur(8px);
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
        .nxc-price-signal {
          flex-shrink: 0;
          max-width: 122px;
          border-radius: 999px;
          padding: 4px 8px;
          font-size: 9px;
          font-weight: 900;
          line-height: 1;
          text-transform: uppercase;
          letter-spacing: .06em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          color: #475569;
        }
        .nxc-price-signal.baixo { background: #ecfdf5; border-color: #bbf7d0; color: #047857; }
        .nxc-price-signal.justo { background: #eff6ff; border-color: #bfdbfe; color: #1d4ed8; }
        .nxc-price-signal.alto { background: #fff7ed; border-color: #fed7aa; color: #c2410c; }

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

        .nxc-quality {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 2px;
        }
        .nxc-quality-label {
          flex-shrink: 0;
          font-size: 10px;
          font-weight: 900;
          color: #64748b;
          white-space: nowrap;
        }
        .nxc-quality-track {
          height: 5px;
          flex: 1;
          min-width: 44px;
          border-radius: 999px;
          background: #e2e8f0;
          overflow: hidden;
        }
        .nxc-quality-fill {
          height: 100%;
          width: ${qualidadePercentagem}%;
          border-radius: inherit;
          background: linear-gradient(90deg, #2ac1b4, #0f172a);
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
          position: fixed; inset: 0; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(8px);
          z-index: 100000; display: flex; align-items: center; justify-content: center; padding: 20px;
        }
        .nxc-modal-box {
          background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 32px;
          max-width: 400px; width: 100%; text-align: center; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.1);
        }
        .nxc-modal-icon { margin: 0 auto 20px; display: flex; justify-content: center; }
        .nxc-modal-title { font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 10px; }
        .nxc-modal-text { font-size: 14px; color: #64748b; margin: 0 0 24px; line-height: 1.6; }
        .nxc-modal-actions { display: flex; gap: 10px; }
        .nxc-modal-cancel { flex: 1; padding: 12px; border-radius: 10px; border: 1px solid #cbd5e1; background: #fff; color: #475569; font-weight: 700; cursor: pointer; transition: all .2s; }
        .nxc-modal-cancel:hover { background: #f8fafc; color: #0f172a; border-color: #94a3b8; }
        .nxc-modal-delete { flex: 1; padding: 12px; border-radius: 10px; border: none; background: #ef4444; color: #fff; font-weight: 800; cursor: pointer; transition: all .2s; }
        .nxc-modal-delete:hover { background: #dc2626; }

        .dark .nxc-wrap {
          background: #111c30;
          border-color: #334155;
          color: #f8fafc;
          box-shadow: 0 18px 42px -30px rgba(0,0,0,0.95);
        }
        .dark .nxc-wrap::after { box-shadow: inset 0 1px 0 rgba(255,255,255,0.06); }
        .dark .nxc-wrap:hover {
          border-color: #475569;
          box-shadow: 0 26px 54px -30px rgba(0,0,0,0.95);
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
        .dark .nxc-modal-box,
        .dark .nxc-price-signal,
        .dark .nxc-quality-track {
          background: #0f172a;
          border-color: #334155;
        }
        .dark .nxc-quality-label { color: #94a3b8; }
        .dark .nxc-insight-label { color: #94a3b8; }
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
      `}</style>

      <Link to={anuncioPath(anuncio)} className={`nxc-wrap${isPremium ? ' premium' : ''}`}>

        {/* ── IMAGEM ── */}
        <div className="nxc-img">
          {anuncio?.fotos?.[0]
            ? <img src={anuncio.fotos[0]} alt={anuncio.titulo} loading="lazy" decoding="async" />
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
          <div className="nxc-price-row">
            <div className="nxc-price">{preco}</div>
            {precoAnalise && (
              <span className={`nxc-price-signal ${precoAnalise.estado}`} title={precoAnalise.detalhe}>
                {precoAnalise.label}
              </span>
            )}
          </div>
          <div className="nxc-title">{anuncio?.titulo}</div>
          {scoreQualidade > 0 && (
            <div className="nxc-quality" title={`Qualidade do anuncio: ${scoreQualidade}/10`}>
              <span className="nxc-quality-label">{scoreQualidade}/10</span>
              <span className="nxc-quality-track">
                <span className="nxc-quality-fill" />
              </span>
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
                <Icon path={mdiCheckDecagram} size={0.45} color="#3b82f6" title="Vendedor Verificado" style={{ flexShrink: 0 }} />
              )}
            </span>
          </div>

          {anuncio?.localizacao?.cidade && (
            <div className="nxc-loc">
              <Icon path={mdiMapMarkerOutline} size={0.5} />
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
              <Icon path={mdiTrashCanOutline} size={1.8} color="#ef4444" />
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
