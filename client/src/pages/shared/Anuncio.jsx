import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Helmet } from 'react-helmet-async';
import Icon from '@mdi/react';
import {
  mdiCheckDecagram, mdiShareVariantOutline, mdiHeartOutline, mdiHeart,
  mdiCalendarBlank, mdiSpeedometer, mdiGasStation, mdiCarShiftPattern, mdiEngineOutline,
  mdiHomeCityOutline, mdiRulerSquare, mdiBedOutline, mdiShower, mdiCertificateOutline,
  mdiChevronLeft, mdiChevronRight, mdiPhone, mdiMapMarkerOutline, mdiEyeOutline,
  mdiGarageVariant, mdiBalcony, mdiHammerWrench, mdiCar, mdiFileDocumentOutline,
  mdiCamera, mdiStar, mdiClose, mdiChevronDown, mdiLinkVariant, mdiCheck,
  mdiOpenInNew, mdiArrowLeft,
} from '@mdi/js';

import AnuncioCard from '../shared/AnuncioCard';

export default function Anuncio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, signed } = useAuth();

  const [anuncio, setAnuncio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [fotoActiva, setFotoActiva] = useState(0);
  const [abaAtiva, setAbaAtiva] = useState('especificacoes');
  const [lightboxAberto, setLightboxAberto] = useState(false);
  const [mostrarTelefone, setMostrarTelefone] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [mostrarModalVendido, setMostrarModalVendido] = useState(false);
  const [eliminandoVendido, setEliminandoVendido] = useState(false);
  const [meses, setMeses] = useState(84);
  const [entrada, setEntrada] = useState(0);
  const [sugeridos, setSugeridos] = useState([]);
  const [descExpanded, setDescExpanded] = useState(false);

  const irParaFoto = useCallback((i, total) => {
    setFotoActiva(((i % total) + total) % total);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (!lightboxAberto) return;
      if (e.key === 'ArrowLeft') irParaFoto(fotoActiva - 1, fotos.length);
      if (e.key === 'ArrowRight') irParaFoto(fotoActiva + 1, fotos.length);
      if (e.key === 'Escape') setLightboxAberto(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setFotoActiva(0);
    setAbaAtiva('especificacoes');
    setMostrarTelefone(false);
    setLightboxAberto(false);
    setDescExpanded(false);

    const carregar = async () => {
      try {
        const { data } = await api.get(`/anuncios/${id}`);
        setAnuncio(data);
        if (data?.preco) setEntrada(0);
        api.post(`/anuncios/${id}/visita`).catch(() => {});
        api.get('/anuncios')
          .then(res => {
            const lista = Array.isArray(res.data) ? res.data : (res.data.anuncios || []);
            setSugeridos(lista.filter(a => a._id !== data._id && a.tipo === data.tipo).slice(0, 4));
          })
          .catch(() => {});
      } catch (err) {
        setErro(err.response?.data?.erro || 'Erro ao carregar o anúncio.');
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, [id]);

  useEffect(() => {
    if (signed && id) {
      api.get(`/anuncios/${id}/check-guardado`).then(r => setGuardado(r.data.guardado)).catch(() => {});
    }
  }, [signed, id]);

  const handlePartilhar = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: anuncio?.titulo, url }); } catch {}
    } else {
      navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    }
  };

  const toggleGuardado = async () => {
    if (!signed) { alert('Inicia a sessão para guardar anúncios.'); return; }
    try {
      const { data } = await api.post(`/anuncios/${id}/guardar`);
      setGuardado(data.guardado);
    } catch {}
  };

  const handleConfirmarVendido = async () => {
    setEliminandoVendido(true);
    try {
      await api.delete(`/anuncios/${id}`);
      setMostrarModalVendido(false);
      navigate('/perfil');
    } catch {
      alert('Ocorreu um erro. Tenta novamente.');
    } finally {
      setEliminandoVendido(false);
    }
  };

  if (loading) return (
    <div className="pg-loading">
      <div className="pg-loading-inner">
        <div className="nx-spinner" />
        <p>A carregar anúncio…</p>
      </div>
    </div>
  );

  if (erro) return (
    <div className="pg-error">
      <div className="pg-error-inner">
        <div className="pg-error-icon">⚠</div>
        <h2>Algo correu mal</h2>
        <p>{erro}</p>
        <button onClick={() => navigate(-1)} className="nx-btn-primary">Voltar atrás</button>
      </div>
    </div>
  );

  if (!anuncio) return null;

  const donoDoAnuncio = anuncio.utilizador || anuncio.user;
  const isDono = signed && (user?.id === donoDoAnuncio?._id || user?._id === donoDoAnuncio?._id);
  const isCarro = anuncio.tipo === 'carro';

  const fotosArray = anuncio.fotos || anuncio.imagens;
  const fotos = fotosArray?.length > 0 ? fotosArray : [null];

  const precoValor = anuncio.preco || 0;
  const preco = new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(precoValor);
  const precoPorM2 = !isCarro && anuncio.imovel?.area
    ? new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(Math.round(precoValor / anuncio.imovel.area))
    : null;

  const emailContacto = anuncio.email || donoDoAnuncio?.email || null;
  const telefoneContacto = anuncio.telefone || donoDoAnuncio?.telefone || null;
  const inicial = donoDoAnuncio?.nome?.charAt(0).toUpperCase() || 'U';
  const localizacaoString = [anuncio.localizacao?.cidade, anuncio.localizacao?.distrito].filter(Boolean).join(', ') || 'N/D';
  const temVaranda = anuncio.equipamento?.some(e => e.toLowerCase().includes('varanda') || e.toLowerCase().includes('terraço'));
  const refId = anuncio._id?.slice(-6).toUpperCase();

  const destaques = (isCarro ? [
    { label: 'Ano', value: anuncio.carro?.ano, icon: mdiCalendarBlank },
    { label: 'Quilómetros', value: anuncio.carro?.km != null ? `${new Intl.NumberFormat('pt-PT').format(anuncio.carro.km)} km` : null, icon: mdiSpeedometer },
    { label: 'Combustível', value: anuncio.carro?.combustivel, icon: mdiGasStation },
    { label: 'Transmissão', value: anuncio.carro?.transmissao, icon: mdiCarShiftPattern },
  ] : [
    { label: 'Área útil', value: anuncio.imovel?.area ? `${anuncio.imovel.area} m²` : null, icon: mdiRulerSquare },
    { label: 'Quartos', value: anuncio.imovel?.quartos, icon: mdiBedOutline },
    { label: 'Casas de banho', value: anuncio.imovel?.casasBanho, icon: mdiShower },
    { label: 'Tipologia', value: anuncio.imovel?.tipologia, icon: mdiHomeCityOutline },
  ]).filter(d => d.value != null && d.value !== '');

  const specs = isCarro ? [
    { label: 'Ano', value: anuncio.carro?.ano, icon: mdiCalendarBlank },
    { label: 'Quilómetros', value: anuncio.carro?.km != null ? `${new Intl.NumberFormat('pt-PT').format(anuncio.carro.km)} km` : null, icon: mdiSpeedometer },
    { label: 'Combustível', value: anuncio.carro?.combustivel, icon: mdiGasStation },
    { label: 'Transmissão', value: anuncio.carro?.transmissao, icon: mdiCarShiftPattern },
    { label: 'Potência', value: anuncio.carro?.potencia ? `${anuncio.carro.potencia} cv` : null, icon: mdiEngineOutline },
    { label: 'Cilindrada', value: anuncio.carro?.cilindrada ? `${anuncio.carro.cilindrada} cm³` : null, icon: mdiEngineOutline },
  ] : [
    { label: 'Tipo de imóvel', value: anuncio.imovel?.tipoImovel, icon: mdiHomeCityOutline },
    { label: 'Tipologia', value: anuncio.imovel?.tipologia, icon: mdiHomeCityOutline },
    { label: 'Área útil', value: anuncio.imovel?.area ? `${anuncio.imovel.area} m²` : null, icon: mdiRulerSquare },
    { label: 'Quartos', value: anuncio.imovel?.quartos, icon: mdiBedOutline },
    { label: 'Casas de banho', value: anuncio.imovel?.casasBanho, icon: mdiShower },
    { label: 'Cert. energético', value: anuncio.imovel?.certificadoEnergetico, icon: mdiCertificateOutline },
    { label: 'Localização', value: localizacaoString, icon: mdiMapMarkerOutline },
    { label: 'Estado', value: anuncio.estado || 'Usado', icon: mdiHammerWrench },
    { label: 'Garagem', value: anuncio.imovel?.garagem ? 'Sim' : 'Não', icon: mdiGarageVariant },
    { label: 'Varanda / Terraço', value: temVaranda ? 'Sim' : 'Não', icon: mdiBalcony },
  ].filter(s => s.value != null && s.value !== '');

  const extrasOpcionais = anuncio.equipamento?.length > 0 ? anuncio.equipamento : [];

  const valorFinanciado = Math.max(0, precoValor - entrada);
  const taxaMensal = 0.079 / 12;
  const prestacaoMensal = valorFinanciado > 0
    ? Math.round((valorFinanciado * taxaMensal) / (1 - Math.pow(1 + taxaMensal, -meses)))
    : 0;

  const accent = isCarro ? 'var(--nx-accent-car)' : 'var(--nx-accent-home)';
  const accentRgb = isCarro ? '42,193,180' : '124,110,247';
  const categoriaLabel = isCarro ? 'Automóvel' : 'Imóvel';
  const categoriaIcon = isCarro ? mdiCar : mdiHomeCityOutline;

  const descricao = anuncio.descricao || '';
  const DESC_LIMIT = 320;
  const descTruncated = descricao.length > DESC_LIMIT && !descExpanded
    ? descricao.slice(0, DESC_LIMIT).trimEnd() + '…'
    : descricao;

  const isAdmin = donoDoAnuncio?.tipo === 'admin';
  const nomeVendedor = isAdmin
    ? (donoDoAnuncio.nome?.toUpperCase().includes('NOXVELIA') ? donoDoAnuncio.nome : `NOXVELIA ${donoDoAnuncio?.nome}`)
    : (donoDoAnuncio?.nome || 'Utilizador Particular');

  return (
    <>
      <Helmet>
        <title>{anuncio.titulo} — Noxvelia</title>
        <meta name="description" content={anuncio.descricao?.substring(0, 150)} />
        <meta property="og:title" content={`NOXVELIA | ${anuncio.titulo}`} />
        <meta property="og:description" content={anuncio.descricao?.substring(0, 100)} />
        <meta property="og:image" content={fotos[0] || ''} />
        <meta property="og:url" content={window.location.href} />
      </Helmet>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes scaleIn { from { opacity:0; transform:scale(.96); } to { opacity:1; transform:none; } }
        @media (prefers-reduced-motion: reduce) { * { animation:none !important; transition:none !important; } }

        /* ─── PAGE SHELL ─────────────────────────────────── */
        .pg-loading { min-height:calc(100vh - 72px); display:flex; align-items:center; justify-content:center; background:var(--nx-bg); }
        .pg-loading-inner { display:flex; flex-direction:column; align-items:center; gap:12px; color:var(--nx-text-sub); font-size:13px; }
        .pg-error { min-height:calc(100vh - 72px); display:flex; align-items:center; justify-content:center; background:var(--nx-bg); }
        .pg-error-inner { text-align:center; max-width:340px; }
        .pg-error-icon { font-size:40px; margin-bottom:14px; opacity:.4; }
        .pg-error-inner h2 { font-size:20px; font-weight:800; color:var(--nx-danger); margin-bottom:8px; }
        .pg-error-inner p { color:var(--nx-text-sub); font-size:14px; margin-bottom:24px; }

        .ad-page { background:var(--nx-bg); color:var(--nx-text); min-height:calc(100vh - 72px); padding:0 0 80px; }
        .ad-wrap { max-width:1200px; margin:0 auto; padding:0 20px; }

        /* ─── TOPBAR ─────────────────────────────────────── */
        .ad-topbar { display:flex; align-items:center; justify-content:space-between; padding:18px 0 20px; }
        .ad-back { display:inline-flex; align-items:center; gap:5px; color:var(--nx-text-sub); font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:.08em; text-decoration:none; transition:color .18s; }
        .ad-back:hover { color:var(--nx-text); }
        .ad-back svg { opacity:.6; }
        .ad-topbar-actions { display:flex; align-items:center; gap:8px; }
        .ad-icon-btn { position:relative; width:36px; height:36px; border-radius:10px; background:var(--nx-bg-2); border:1px solid var(--nx-border); color:var(--nx-text-sub); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .18s; }
        .ad-icon-btn:hover { background:var(--nx-bg-3); color:var(--nx-text); transform:translateY(-1px); }
        .ad-icon-btn.is-saved { color:var(--nx-danger); background:rgba(239,68,68,.1); border-color:rgba(239,68,68,.25); }
        .ad-copy-toast { position:absolute; top:calc(100% + 6px); right:0; background:var(--nx-text); color:var(--nx-bg); font-size:11px; font-weight:700; padding:5px 9px; border-radius:6px; white-space:nowrap; pointer-events:none; animation:fadeIn .15s; }

        /* ─── GALLERY ─────────────────────────────────────── */
        .ad-gallery { display:grid; grid-template-columns:1fr 200px; grid-template-rows:auto auto; gap:6px; border-radius:20px; overflow:hidden; margin-bottom:32px; max-height:480px; }
        @media (max-width:720px) { .ad-gallery { grid-template-columns:1fr; grid-template-rows:auto; max-height:none; } }
        .ad-gallery-main { position:relative; cursor:zoom-in; overflow:hidden; grid-row:1/3; aspect-ratio:4/3; }
        @media (max-width:720px) { .ad-gallery-main { grid-row:auto; aspect-ratio:16/9; } }
        .ad-gallery-main img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .35s ease; }
        .ad-gallery-main:hover img { transform:scale(1.02); }
        .ad-gallery-sub { position:relative; overflow:hidden; cursor:zoom-in; }
        .ad-gallery-sub img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .3s; }
        .ad-gallery-sub:hover img { transform:scale(1.04); }
        .ad-gallery-sub.is-more::after { content:attr(data-count); position:absolute; inset:0; background:rgba(0,0,0,.52); display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:800; color:#fff; display:flex; }
        @media (max-width:720px) { .ad-gallery-sub { display:none; } }
        .ad-gallery-placeholder { aspect-ratio:4/3; background:var(--nx-bg-2); display:flex; align-items:center; justify-content:center; font-size:64px; opacity:.2; grid-row:1/3; }
        .ad-gallery-badge { position:absolute; top:12px; left:12px; display:flex; align-items:center; gap:5px; background:rgba(0,0,0,.55); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,.12); border-radius:8px; padding:4px 10px; font-size:10px; font-weight:800; text-transform:uppercase; letter-spacing:.07em; color:${accent}; z-index:2; }
        .ad-gallery-count { position:absolute; bottom:12px; right:12px; display:flex; align-items:center; gap:5px; background:rgba(0,0,0,.55); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,.1); border-radius:20px; padding:4px 10px; font-size:11px; font-weight:700; color:#fff; z-index:2; }
        .ad-arrow { position:absolute; top:50%; transform:translateY(-50%); width:34px; height:34px; border-radius:50%; background:rgba(0,0,0,.38); backdrop-filter:blur(8px); border:1px solid rgba(255,255,255,.16); color:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; z-index:3; transition:background .18s; }
        .ad-arrow:hover { background:rgba(0,0,0,.62); }
        .ad-arrow.is-left { left:10px; } .ad-arrow.is-right { right:10px; }

        /* ─── HERO ──────────────────────────────────────── */
        .ad-hero { display:grid; grid-template-columns:1fr 320px; gap:28px; align-items:start; margin-bottom:36px; }
        @media (max-width:860px) { .ad-hero { grid-template-columns:1fr; } }

        .ad-hero-left { }
        .ad-title { font-family:var(--nx-font-display); font-size:clamp(22px,2.8vw,30px); font-weight:800; letter-spacing:-.025em; line-height:1.2; color:var(--nx-text); margin-bottom:8px; animation:fadeUp .3s both; }
        .ad-loc { display:flex; align-items:center; gap:5px; font-size:13px; font-weight:600; color:var(--nx-text-sub); margin-bottom:16px; animation:fadeUp .3s .05s both; }
        .ad-price-row { display:flex; align-items:baseline; gap:12px; margin-bottom:6px; animation:fadeUp .3s .08s both; }
        .ad-price { font-family:var(--nx-font-display); font-size:clamp(28px,3.5vw,38px); font-weight:800; letter-spacing:-.035em; color:${accent}; line-height:1; }
        .ad-price-m2 { font-size:13px; color:var(--nx-text-sub); font-weight:600; }
        .ad-meta-strip { display:flex; flex-wrap:wrap; align-items:center; gap:10px; margin-bottom:24px; animation:fadeUp .3s .1s both; }
        .ad-estado { display:inline-flex; align-items:center; gap:5px; padding:4px 10px; border-radius:20px; font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:.06em; }
        .ad-estado.is-disponivel { background:rgba(16,185,129,.1); color:#10b981; border:1px solid rgba(16,185,129,.2); }
        .ad-estado.is-pendente { background:rgba(245,158,11,.1); color:#f59e0b; border:1px solid rgba(245,158,11,.2); }
        .ad-estado.is-vendido { background:rgba(239,68,68,.08); color:var(--nx-danger); border:1px solid rgba(239,68,68,.18); }
        .ad-meta-item { display:flex; align-items:center; gap:4px; font-size:12px; color:var(--nx-text-sub); font-weight:600; }
        .ad-sep { color:var(--nx-border-2); }

        /* ─── DESTAQUES ─────────────────────────────────── */
        .ad-highlights { display:grid; grid-template-columns:repeat(auto-fill,minmax(145px,1fr)); gap:10px; margin-bottom:28px; animation:fadeUp .3s .13s both; }
        .ad-hl { display:flex; align-items:center; gap:11px; background:var(--nx-bg-2); border:1px solid var(--nx-border); border-radius:12px; padding:12px 14px; transition:border-color .18s; }
        .ad-hl:hover { border-color:var(--nx-border-2); }
        .ad-hl-ico { color:${accent}; flex-shrink:0; }
        .ad-hl-value { font-size:14px; font-weight:800; color:var(--nx-text); text-transform:capitalize; line-height:1.2; }
        .ad-hl-label { font-size:10px; font-weight:700; color:var(--nx-text-sub); text-transform:uppercase; letter-spacing:.05em; margin-top:1px; }

        /* ─── CTA CARD (right column) ───────────────────── */
        .ad-cta-card { background:var(--nx-card-bg); border:1px solid var(--nx-card-border); border-radius:18px; padding:22px; box-shadow:var(--nx-shadow-card); position:sticky; top:20px; animation:fadeUp .35s .12s both; }
        .ad-cta-price { font-family:var(--nx-font-display); font-size:28px; font-weight:800; letter-spacing:-.03em; color:${accent}; line-height:1; margin-bottom:4px; }
        .ad-cta-m2 { font-size:12px; color:var(--nx-text-sub); margin-bottom:18px; }
        .ad-cta-divider { height:1px; background:var(--nx-border); margin-bottom:18px; }

        .ad-btn-reveal { width:100%; padding:14px; background:${accent}; color:#fff; border:none; border-radius:12px; font-family:var(--nx-font-body); font-size:14px; font-weight:800; cursor:pointer; transition:all .2s; display:flex; align-items:center; justify-content:center; gap:7px; text-transform:uppercase; letter-spacing:.07em; box-shadow:0 4px 18px rgba(${accentRgb},.35); }
        .ad-btn-reveal:hover { filter:brightness(1.08); transform:translateY(-2px); box-shadow:0 8px 28px rgba(${accentRgb},.4); }
        .ad-btn-reveal:active { transform:none; }

        .ad-contact-box { border:1.5px dashed var(--nx-border-2); border-radius:12px; padding:14px 16px; background:var(--nx-bg-2); transition:background .18s; }
        .ad-contact-label { font-size:10px; font-weight:800; text-transform:uppercase; letter-spacing:.09em; color:var(--nx-text-sub); margin-bottom:6px; }
        .ad-contact-phone { display:flex; align-items:center; gap:8px; font-size:20px; font-weight:800; color:var(--nx-text); text-decoration:none; transition:color .18s; }
        .ad-contact-phone:hover { color:${accent}; }
        .ad-contact-email { font-size:12px; color:var(--nx-text-sub); margin-top:5px; }

        .ad-owner-panel { margin-top:12px; background:rgba(59,130,246,.05); border:1px solid rgba(59,130,246,.18); border-radius:14px; padding:16px; }
        .ad-owner-lbl { font-size:10px; font-weight:800; text-transform:uppercase; letter-spacing:.08em; color:#60a5fa; margin-bottom:12px; }
        .ad-owner-btns { display:flex; gap:8px; }
        .ad-btn-edit { flex:1; padding:10px; text-align:center; background:var(--nx-bg); border:1px solid var(--nx-border-2); color:var(--nx-text); border-radius:10px; font-size:13px; font-weight:700; text-decoration:none; transition:border-color .18s; }
        .ad-btn-edit:hover { border-color:var(--nx-text); }
        .ad-btn-sold { flex:1; padding:10px; border:none; background:#10b981; color:#fff; border-radius:10px; font-size:13px; font-weight:800; cursor:pointer; transition:opacity .18s; }
        .ad-btn-sold:hover { opacity:.85; }

        .ad-seller-link { display:flex; align-items:center; gap:12px; margin-top:12px; padding:14px; background:var(--nx-bg-2); border:1px solid var(--nx-border); border-radius:14px; text-decoration:none; transition:all .18s; }
        .ad-seller-link:hover { background:var(--nx-bg-3); border-color:var(--nx-border-2); }
        .ad-seller-avatar { width:42px; height:42px; border-radius:50%; background:var(--nx-bg-3); display:flex; align-items:center; justify-content:center; font-family:var(--nx-font-display); font-size:15px; font-weight:800; color:var(--nx-text); flex-shrink:0; overflow:hidden; border:2px solid ${accent}; }
        .ad-seller-avatar img { width:100%; height:100%; object-fit:cover; }
        .ad-seller-name { font-size:13px; font-weight:800; color:var(--nx-text); display:flex; align-items:center; gap:4px; }
        .ad-seller-sub { font-size:11px; color:var(--nx-text-sub); margin-top:2px; }
        .ad-seller-chev { margin-left:auto; color:var(--nx-text-sub); flex-shrink:0; }

        /* ─── CONTENT GRID ──────────────────────────────── */
        .ad-content-grid { display:grid; grid-template-columns:1fr 320px; gap:28px; align-items:start; }
        @media (max-width:860px) { .ad-content-grid { grid-template-columns:1fr; } }

        /* ─── TABS ──────────────────────────────────────── */
        .ad-tabs { display:flex; gap:2px; border-bottom:1px solid var(--nx-border-2); margin-bottom:-1px; }
        .ad-tab { padding:10px 18px; border:none; border-bottom:2px solid transparent; background:none; color:var(--nx-text-sub); font-family:var(--nx-font-body); font-size:13px; font-weight:700; cursor:pointer; transition:all .18s; white-space:nowrap; margin-bottom:-1px; }
        .ad-tab:hover { color:var(--nx-text-2); }
        .ad-tab.is-active { color:var(--nx-text); border-bottom-color:${accent}; }

        /* ─── PANELS ─────────────────────────────────────── */
        .ad-panel { padding:24px 0 0; animation:fadeIn .22s; }
        .ad-specsheet { }
        .ad-spec-row { display:flex; align-items:center; gap:8px; padding:12px 0; border-bottom:1px solid var(--nx-border); }
        .ad-spec-row:last-child { border-bottom:none; }
        .ad-spec-ico { color:${accent}; flex-shrink:0; }
        .ad-spec-label { font-size:13px; color:var(--nx-text-sub); font-weight:600; min-width:130px; display:flex; align-items:center; gap:8px; }
        .ad-spec-fill { flex:1; }
        .ad-spec-value { font-size:13px; font-weight:800; color:var(--nx-text); text-transform:capitalize; text-align:right; }

        .ad-extras-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:8px; padding-top:4px; }
        .ad-extra { display:flex; align-items:center; gap:9px; background:var(--nx-bg-2); border:1px solid var(--nx-border); border-radius:10px; padding:10px 13px; font-size:13px; font-weight:600; color:var(--nx-text-2); }
        .ad-extra-ico { color:${accent}; flex-shrink:0; }

        .ad-desc-lbl { font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:.09em; color:var(--nx-text-sub); margin-bottom:14px; display:flex; align-items:center; gap:7px; }
        .ad-desc-text { font-size:14px; line-height:1.85; color:var(--nx-text-2); white-space:pre-wrap; }
        .ad-desc-expand { display:inline-flex; align-items:center; gap:4px; margin-top:10px; font-size:13px; font-weight:700; color:${accent}; cursor:pointer; background:none; border:none; padding:0; }

        /* ─── SIDEBAR ─────────────────────────────────────── */
        .ad-sidebar { display:flex; flex-direction:column; gap:12px; }
        .ad-fin-card { background:var(--nx-card-bg); border:1px solid var(--nx-card-border); border-radius:16px; padding:20px; }
        .ad-fin-head { font-size:10px; font-weight:800; text-transform:uppercase; letter-spacing:.09em; color:var(--nx-text-sub); margin-bottom:14px; }
        .ad-fin-main { display:flex; justify-content:space-between; align-items:flex-end; padding-bottom:14px; margin-bottom:16px; border-bottom:1px dashed var(--nx-border-2); }
        .ad-fin-val { font-family:var(--nx-font-display); font-size:26px; font-weight:800; color:${accent}; letter-spacing:-.025em; }
        .ad-fin-mes { font-size:12px; color:var(--nx-text-sub); font-weight:600; }
        .ad-fin-taeg { font-size:11px; color:var(--nx-text-sub); font-weight:700; }
        .ad-slider-grp { margin-bottom:14px; }
        .ad-slider-grp:last-child { margin-bottom:0; }
        .ad-slider-lbl { display:flex; justify-content:space-between; font-size:12px; font-weight:700; color:var(--nx-text-2); margin-bottom:7px; }
        .ad-slider-val { color:${accent}; }
        .ad-slider { width:100%; height:4px; border-radius:2px; accent-color:${accent}; cursor:pointer; -webkit-appearance:none; background:var(--nx-border); outline:none; }
        .ad-slider::-webkit-slider-thumb { -webkit-appearance:none; width:16px; height:16px; border-radius:50%; background:${accent}; cursor:pointer; border:2px solid var(--nx-card-bg); }

        /* ─── LIGHTBOX ────────────────────────────────────── */
        .ad-lb { position:fixed; inset:0; background:rgba(0,0,0,.93); backdrop-filter:blur(8px); z-index:9999; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:20px; animation:fadeIn .18s; }
        .ad-lb-close { position:absolute; top:16px; right:20px; width:38px; height:38px; border-radius:50%; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.18); color:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background .18s; }
        .ad-lb-close:hover { background:rgba(255,255,255,.2); }
        .ad-lb-counter { position:absolute; top:22px; left:24px; color:rgba(255,255,255,.7); font-size:13px; font-weight:700; font-variant-numeric:tabular-nums; }
        .ad-lb-img { flex:1; display:flex; align-items:center; justify-content:center; width:100%; max-width:1080px; position:relative; }
        .ad-lb-img img { max-width:100%; max-height:78vh; object-fit:contain; border-radius:10px; }
        .ad-lb-strip { display:flex; gap:7px; margin-top:16px; overflow-x:auto; max-width:100%; scrollbar-width:none; }
        .ad-lb-strip::-webkit-scrollbar { display:none; }
        .ad-lb-thumb { width:60px; height:42px; border-radius:6px; overflow:hidden; cursor:pointer; opacity:.4; border:2px solid transparent; flex-shrink:0; transition:all .18s; }
        .ad-lb-thumb.is-active { opacity:1; border-color:${accent}; }
        .ad-lb-thumb img { width:100%; height:100%; object-fit:cover; }

        /* ─── MODAL VENDIDO ──────────────────────────────── */
        .ad-modal-ov { position:fixed; inset:0; background:var(--nx-overlay); backdrop-filter:blur(14px); display:flex; align-items:center; justify-content:center; z-index:9998; padding:20px; animation:fadeIn .18s; }
        .ad-modal { width:100%; max-width:420px; background:var(--nx-bg-2); border:1px solid var(--nx-border-2); border-radius:22px; padding:36px 28px; text-align:center; animation:scaleIn .22s; }
        .ad-modal-ico { font-size:42px; margin-bottom:12px; }
        .ad-modal-title { font-family:var(--nx-font-display); font-size:21px; font-weight:800; letter-spacing:-.02em; margin-bottom:10px; }
        .ad-modal-body { font-size:14px; color:var(--nx-text-sub); line-height:1.7; margin-bottom:26px; }
        .ad-modal-btns { display:flex; gap:10px; }
        .ad-btn-cancel { flex:1; padding:13px; background:transparent; border:1px solid var(--nx-border-2); color:var(--nx-text-sub); border-radius:10px; font-size:14px; font-weight:700; cursor:pointer; transition:all .18s; }
        .ad-btn-cancel:hover { border-color:var(--nx-text); color:var(--nx-text); }
        .ad-btn-danger { flex:1; padding:13px; background:var(--nx-danger); border:none; color:#fff; border-radius:10px; font-size:14px; font-weight:800; cursor:pointer; transition:opacity .18s; }
        .ad-btn-danger:hover { opacity:.85; }
        .ad-btn-danger:disabled { opacity:.45; cursor:not-allowed; }

        /* ─── SUGERIDOS ──────────────────────────────────── */
        .ad-sugeridos { margin-top:60px; padding-top:40px; border-top:1px solid var(--nx-border); }
        .ad-sugeridos-title { font-family:var(--nx-font-display); font-size:20px; font-weight:800; letter-spacing:-.02em; margin-bottom:22px; }
        .ad-sugeridos-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(250px,1fr)); gap:20px; }
      `}</style>

      {/* ─── MODAL VENDIDO ──────────────────────────── */}
      {mostrarModalVendido && (
        <div className="ad-modal-ov" onClick={() => setMostrarModalVendido(false)}>
          <div className="ad-modal" onClick={e => e.stopPropagation()}>
            <div className="ad-modal-ico">🎉</div>
            <h3 className="ad-modal-title">Parabéns pela venda!</h3>
            <p className="ad-modal-body">Pretendes eliminar este anúncio de forma permanente dado que o ativo já foi vendido?</p>
            <div className="ad-modal-btns">
              <button type="button" className="ad-btn-cancel" disabled={eliminandoVendido} onClick={() => setMostrarModalVendido(false)}>Cancelar</button>
              <button type="button" className="ad-btn-danger" disabled={eliminandoVendido} onClick={handleConfirmarVendido}>
                {eliminandoVendido ? 'A eliminar…' : 'Sim, eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── LIGHTBOX ────────────────────────────────── */}
      {lightboxAberto && (
        <div className="ad-lb" onClick={() => setLightboxAberto(false)}>
          <div className="ad-lb-counter">{fotoActiva + 1} / {fotos.length}</div>
          <button type="button" className="ad-lb-close" onClick={() => setLightboxAberto(false)} aria-label="Fechar">
            <Icon path={mdiClose} size={.95} />
          </button>
          <div className="ad-lb-img" onClick={e => e.stopPropagation()}>
            {fotos.length > 1 && (
              <button type="button" className="ad-arrow is-left" onClick={() => irParaFoto(fotoActiva - 1, fotos.length)} aria-label="Foto anterior">
                <Icon path={mdiChevronLeft} size={1.1} />
              </button>
            )}
            {fotos[fotoActiva]
              ? <img src={fotos[fotoActiva]} alt={anuncio.titulo} />
              : <div style={{ fontSize: '80px', opacity: .25 }}>{isCarro ? '🚗' : '🏠'}</div>
            }
            {fotos.length > 1 && (
              <button type="button" className="ad-arrow is-right" onClick={() => irParaFoto(fotoActiva + 1, fotos.length)} aria-label="Foto seguinte">
                <Icon path={mdiChevronRight} size={1.1} />
              </button>
            )}
          </div>
          {fotos.length > 1 && (
            <div className="ad-lb-strip" onClick={e => e.stopPropagation()}>
              {fotos.map((f, i) => (
                <div key={i} className={`ad-lb-thumb ${fotoActiva === i ? 'is-active' : ''}`} onClick={() => irParaFoto(i, fotos.length)}>
                  {f && <img src={f} alt="" />}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="ad-page">
        <div className="ad-wrap">

          {/* ─── TOPBAR ─────────────────────────────── */}
          <div className="ad-topbar">
            <Link to={isCarro ? '/carros' : '/imoveis'} className="ad-back">
              <Icon path={mdiArrowLeft} size={.7} /> Voltar à pesquisa
            </Link>
            <div className="ad-topbar-actions">
              <button type="button" className="ad-icon-btn" onClick={handlePartilhar} title="Partilhar anúncio">
                <Icon path={copiado ? mdiCheck : mdiShareVariantOutline} size={.82} />
                {copiado && <div className="ad-copy-toast">Link copiado!</div>}
              </button>
              {!isDono && (
                <button type="button" className={`ad-icon-btn ${guardado ? 'is-saved' : ''}`} onClick={toggleGuardado} title={guardado ? 'Remover dos guardados' : 'Guardar anúncio'}>
                  <Icon path={guardado ? mdiHeart : mdiHeartOutline} size={.82} />
                </button>
              )}
            </div>
          </div>

          {/* ─── GALLERY ─────────────────────────────── */}
          {fotos[0] ? (
            <div className="ad-gallery" onClick={() => setLightboxAberto(true)}>
              <div className="ad-gallery-main">
                <img src={fotos[fotoActiva]} alt={anuncio.titulo} />
                <div className="ad-gallery-badge">
                  <Icon path={categoriaIcon} size={.6} />
                  {categoriaLabel}
                </div>
                {fotos.length > 1 && (
                  <>
                    <div className="ad-gallery-count">
                      <Icon path={mdiCamera} size={.58} />
                      {fotoActiva + 1}/{fotos.length}
                    </div>
                    <button type="button" className="ad-arrow is-left" onClick={e => { e.stopPropagation(); irParaFoto(fotoActiva - 1, fotos.length); }} aria-label="Foto anterior">
                      <Icon path={mdiChevronLeft} size={.95} />
                    </button>
                    <button type="button" className="ad-arrow is-right" onClick={e => { e.stopPropagation(); irParaFoto(fotoActiva + 1, fotos.length); }} aria-label="Foto seguinte">
                      <Icon path={mdiChevronRight} size={.95} />
                    </button>
                  </>
                )}
              </div>
              {fotos[1] && (
                <div className="ad-gallery-sub" onClick={e => { e.stopPropagation(); irParaFoto(1, fotos.length); setLightboxAberto(true); }}>
                  <img src={fotos[1]} alt="" />
                </div>
              )}
              {fotos[2] && (
                <div
                  className="ad-gallery-sub"
                  data-count={fotos.length > 3 ? `+${fotos.length - 2} fotos` : undefined}
                  style={fotos.length > 3 ? { position: 'relative' } : undefined}
                  onClick={e => { e.stopPropagation(); irParaFoto(2, fotos.length); setLightboxAberto(true); }}
                >
                  <img src={fotos[2]} alt="" style={fotos.length > 3 ? { filter: 'brightness(.45)' } : undefined} />
                  {fotos.length > 3 && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 18 }}>
                      +{fotos.length - 2} fotos
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="ad-gallery-placeholder">{isCarro ? '🚗' : '🏠'}</div>
          )}

          {/* ─── HERO GRID ────────────────────────────── */}
          <div className="ad-hero">
            <div className="ad-hero-left">
              <h1 className="ad-title">{anuncio.titulo}</h1>
              <div className="ad-loc">
                <Icon path={mdiMapMarkerOutline} size={.65} />
                {localizacaoString}
              </div>
              <div className="ad-price-row">
                <span className="ad-price">{preco}</span>
                {precoPorM2 && <span className="ad-price-m2">{precoPorM2}/m²</span>}
              </div>
              <div className="ad-meta-strip">
                <span className={`ad-estado ${(anuncio.estado || 'disponivel').toLowerCase() === 'pendente' ? 'is-pendente' : (anuncio.estado || '').toLowerCase() === 'vendido' ? 'is-vendido' : 'is-disponivel'}`}>
                  ● {anuncio.estado || 'Disponível'}
                </span>
                <span className="ad-meta-item"><Icon path={mdiEyeOutline} size={.62} /> {anuncio.visitas || 0} visualizações</span>
                <span className="ad-sep">·</span>
                <span className="ad-meta-item">Ref: #{refId}</span>
              </div>
              {destaques.length > 0 && (
                <div className="ad-highlights">
                  {destaques.map((d, i) => (
                    <div key={i} className="ad-hl">
                      <span className="ad-hl-ico"><Icon path={d.icon} size={.88} /></span>
                      <div>
                        <div className="ad-hl-value">{d.value}</div>
                        <div className="ad-hl-label">{d.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Description inline para mobile/small — repetido abaixo no painel */}
            </div>

            {/* ─── RIGHT CARD ─────────────────────────── */}
            <div>
              <div className="ad-cta-card">
                <div className="ad-cta-price">{preco}</div>
                {precoPorM2 && <div className="ad-cta-m2">{precoPorM2}/m²</div>}
                <div className="ad-cta-divider" />

                {isDono ? (
                  <div className="ad-owner-panel">
                    <div className="ad-owner-lbl">Gestão do Anúncio</div>
                    <div className="ad-owner-btns">
                      <Link to={`/editar/${id}`} className="ad-btn-edit">Editar dados</Link>
                      <button type="button" className="ad-btn-sold" onClick={() => setMostrarModalVendido(true)}>✓ Vendido</button>
                    </div>
                  </div>
                ) : mostrarTelefone ? (
                  <div className="ad-contact-box">
                    <div className="ad-contact-label">Contactar via</div>
                    {telefoneContacto && (
                      <a href={`tel:${telefoneContacto}`} className="ad-contact-phone">
                        <Icon path={mdiPhone} size={.85} color={accent} />
                        {telefoneContacto}
                      </a>
                    )}
                    {emailContacto && <div className="ad-contact-email">✉ {emailContacto}</div>}
                  </div>
                ) : (
                  <button type="button" className="ad-btn-reveal" onClick={() => setMostrarTelefone(true)}>
                    <Icon path={mdiPhone} size={.85} /> Revelar contactos
                  </button>
                )}

                <Link to={`/vendedor/${donoDoAnuncio?._id}`} className="ad-seller-link">
                  <div className="ad-seller-avatar">
                    {donoDoAnuncio?.avatarUrl ? <img src={donoDoAnuncio.avatarUrl} alt="" /> : inicial}
                  </div>
                  <div>
                    <div className="ad-seller-name">
                      {nomeVendedor}
                      {isAdmin && <Icon path={mdiCheckDecagram} size={.72} color="var(--nx-accent-blue)" />}
                    </div>
                    <div className="ad-seller-sub">{isAdmin ? 'Conta oficial NOXVELIA' : 'Ver anúncios deste utilizador'}</div>
                  </div>
                  <span className="ad-seller-chev"><Icon path={mdiChevronRight} size={.78} /></span>
                </Link>
              </div>
            </div>
          </div>

          {/* ─── MAIN CONTENT ─────────────────────────── */}
          <div className="ad-content-grid">
            <div>
              {/* Tabs */}
              <div className="ad-tabs">
                <button type="button" className={`ad-tab ${abaAtiva === 'especificacoes' ? 'is-active' : ''}`} onClick={() => setAbaAtiva('especificacoes')}>
                  Ficha técnica
                </button>
                {extrasOpcionais.length > 0 && (
                  <button type="button" className={`ad-tab ${abaAtiva === 'equipamento' ? 'is-active' : ''}`} onClick={() => setAbaAtiva('equipamento')}>
                    {isCarro ? 'Equipamento' : 'Detalhes'}
                  </button>
                )}
                <button type="button" className={`ad-tab ${abaAtiva === 'descricao' ? 'is-active' : ''}`} onClick={() => setAbaAtiva('descricao')}>
                  Descrição
                </button>
              </div>

              <div className="ad-panel">
                {abaAtiva === 'especificacoes' && (
                  <div className="ad-specsheet">
                    {specs.map((s, i) => (
                      <div key={i} className="ad-spec-row">
                        <span className="ad-spec-label">
                          <span className="ad-spec-ico"><Icon path={s.icon} size={.7} /></span>
                          {s.label}
                        </span>
                        <span className="ad-spec-fill" />
                        <span className="ad-spec-value">{s.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {abaAtiva === 'equipamento' && extrasOpcionais.length > 0 && (
                  <div className="ad-extras-grid">
                    {extrasOpcionais.map((extra, i) => (
                      <div key={i} className="ad-extra">
                        <span className="ad-extra-ico"><Icon path={mdiCheck} size={.75} /></span>
                        {extra}
                      </div>
                    ))}
                  </div>
                )}

                {abaAtiva === 'descricao' && (
                  <div>
                    <div className="ad-desc-lbl">
                      <Icon path={mdiFileDocumentOutline} size={.78} />
                      Descrição do anunciante
                    </div>
                    <div className="ad-desc-text">
                      {descricao ? descTruncated : 'Nenhuma descrição detalhada fornecida.'}
                    </div>
                    {descricao.length > DESC_LIMIT && (
                      <button type="button" className="ad-desc-expand" onClick={() => setDescExpanded(v => !v)}>
                        <Icon path={mdiChevronDown} size={.78} style={{ transform: descExpanded ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
                        {descExpanded ? 'Mostrar menos' : 'Ler mais'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* ─── SIDEBAR ──────────────────────────────── */}
            <div className="ad-sidebar">
              {isCarro && !isDono && (
                <div className="ad-fin-card">
                  <div className="ad-fin-head">Simulação de crédito</div>
                  <div className="ad-fin-main">
                    <div>
                      <span className="ad-fin-val">{prestacaoMensal.toLocaleString('pt-PT')}€</span>
                      <span className="ad-fin-mes"> /mês</span>
                    </div>
                    <div className="ad-fin-taeg">TAEG 7.9%</div>
                  </div>
                  <div className="ad-slider-grp">
                    <div className="ad-slider-lbl">
                      <span>Entrada inicial</span>
                      <span className="ad-slider-val">{Number(entrada).toLocaleString('pt-PT')}€</span>
                    </div>
                    <input type="range" className="ad-slider" min="0" max={Math.round(precoValor * .7)} step="250"
                      value={entrada} onChange={e => setEntrada(Number(e.target.value))} />
                  </div>
                  <div className="ad-slider-grp">
                    <div className="ad-slider-lbl">
                      <span>Prazo</span>
                      <span className="ad-slider-val">{meses} meses</span>
                    </div>
                    <input type="range" className="ad-slider" min="24" max="120" step="12"
                      value={meses} onChange={e => setMeses(Number(e.target.value))} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ─── SUGERIDOS ─────────────────────────────── */}
          {sugeridos.length > 0 && (
            <div className="ad-sugeridos">
              <h3 className="ad-sugeridos-title">Poderá também gostar</h3>
              <div className="ad-sugeridos-grid">
                {sugeridos.map(sug => <AnuncioCard key={sug._id} anuncio={sug} />)}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}