import React, { useEffect, useState, useCallback, useRef } from 'react';
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
  mdiCamera, mdiStar, mdiAlertCircleOutline, mdiWhatsapp, mdiContentCopy,
  mdiShieldCheckOutline, mdiClockOutline, mdiMagnifyPlusOutline, mdiClose, mdiCheck,
} from '@mdi/js';

import AnuncioCard from '../shared/AnuncioCard';

const formatarMoeda = (valor) =>
  new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(valor || 0);

const numeroParaWhatsapp = (raw) => {
  if (!raw) return null;
  const digitos = String(raw).replace(/\D/g, '');
  if (!digitos) return null;
  if (digitos.length === 9) return `351${digitos}`;
  return digitos;
};

export default function Anuncio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, signed } = useAuth();

  const [anuncio, setAnuncio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [fotoActiva, setFotoActiva] = useState(0);
  const [abaAtiva, setAbaAtiva] = useState('especificacoes');

  const [mostrarTelefone, setMostrarTelefone] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [refCopiado, setRefCopiado] = useState(false);
  const [lightboxAberto, setLightboxAberto] = useState(false);

  const [mostrarModalVendido, setMostrarModalVendido] = useState(false);
  const [eliminandoVendido, setEliminandoVendido] = useState(false);
  const [meses, setMeses] = useState(84);
  const [entrada, setEntrada] = useState(0);

  const [sugeridos, setSugeridos] = useState([]);
  const touchStartX = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setFotoActiva(0);
    setAbaAtiva('especificacoes');
    setMostrarTelefone(false);

    const carregar = async () => {
      try {
        const { data } = await api.get(`/anuncios/${id}`);
        setAnuncio(data);
        if (data?.preco) setEntrada(0);

        api.post(`/anuncios/${id}/visita`).catch(() => {});

        api.get('/anuncios')
          .then(res => {
            const listaDeAnuncios = Array.isArray(res.data) ? res.data : (res.data.anuncios || []);
            const recomendados = listaDeAnuncios
              .filter(a => a._id !== data._id && a.tipo === data.tipo)
              .slice(0, 4);
            setSugeridos(recomendados);
          })
          .catch(() => console.error('Não foi possível carregar sugestões.'));
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
      api.get(`/anuncios/${id}/check-guardado`)
        .then(r => setGuardado(r.data.guardado))
        .catch(() => {});
    }
  }, [signed, id]);

  const fotosArrayRaw = anuncio?.fotos || anuncio?.imagens;
  const fotos = fotosArrayRaw?.length > 0 ? fotosArrayRaw : [null];

  const irParaFoto = useCallback((i) => {
    setFotoActiva(((i % fotos.length) + fotos.length) % fotos.length);
  }, [fotos.length]);

  const fotoAnterior = useCallback(() => irParaFoto(fotoActiva - 1), [fotoActiva, irParaFoto]);
  const fotoSeguinte = useCallback(() => irParaFoto(fotoActiva + 1), [fotoActiva, irParaFoto]);

  // Navegação por teclado dentro do lightbox
  useEffect(() => {
    if (!lightboxAberto) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxAberto(false);
      if (e.key === 'ArrowLeft') fotoAnterior();
      if (e.key === 'ArrowRight') fotoSeguinte();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxAberto, fotoAnterior, fotoSeguinte]);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 45) (delta > 0 ? fotoAnterior() : fotoSeguinte());
    touchStartX.current = null;
  };

  const handlePartilhar = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: anuncio?.titulo, url }); } catch {}
    } else {
      navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2400);
    }
  };

  const copiarReferencia = () => {
    if (!anuncio?._id) return;
    navigator.clipboard.writeText(anuncio._id.slice(-6).toUpperCase());
    setRefCopiado(true);
    setTimeout(() => setRefCopiado(false), 1800);
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

  // ---------------------------------------------------------------------
  // ESTADO: A CARREGAR (skeleton fiel ao layout final)
  // ---------------------------------------------------------------------
  if (loading) {
    return (
      <div style={{ minHeight: 'calc(100vh - 72px)', background: 'var(--nx-bg)', padding: '28px 20px 72px' }}>
        <style>{`
          @keyframes nx-shimmer { 0% { background-position: -300px 0; } 100% { background-position: 300px 0; } }
          .skl { background: linear-gradient(90deg, var(--nx-bg-2) 25%, var(--nx-bg-3) 37%, var(--nx-bg-2) 63%); background-size: 600px 100%; animation: nx-shimmer 1.6s ease-in-out infinite; border-radius: 10px; }
          .skl-page { max-width: 1240px; margin: 0 auto; }
          .skl-grid { display: grid; grid-template-columns: 1fr 380px; gap: 32px; margin-top: 22px; }
          @media (max-width: 960px) { .skl-grid { grid-template-columns: 1fr; } }
          @media (prefers-reduced-motion: reduce) { .skl { animation: none; } }
        `}</style>
        <div className="skl-page">
          <div className="skl" style={{ width: 160, height: 14, marginBottom: 24 }} />
          <div className="skl-grid">
            <div>
              <div className="skl" style={{ width: '100%', aspectRatio: '16/9', borderRadius: 18 }} />
              <div className="skl" style={{ width: '40%', height: 32, marginTop: 22 }} />
              <div className="skl" style={{ width: '65%', height: 18, marginTop: 12 }} />
              <div className="skl" style={{ width: '100%', height: 1, marginTop: 20, marginBottom: 20, opacity: .4 }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))', gap: 12 }}>
                {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skl" style={{ height: 70 }} />)}
              </div>
            </div>
            <div>
              <div className="skl" style={{ height: 280, borderRadius: 20 }} />
              <div className="skl" style={{ height: 90, borderRadius: 16, marginTop: 14 }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------
  // ESTADO: ERRO
  // ---------------------------------------------------------------------
  if (erro) return (
    <div style={{ minHeight: 'calc(100vh - 72px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--nx-bg)', color: 'var(--nx-text)', padding: '0 20px', textAlign: 'center' }}>
      <Icon path={mdiAlertCircleOutline} size={2.2} color="var(--nx-danger)" style={{ marginBottom: 16 }} />
      <h2 style={{ fontSize: '22px', color: 'var(--nx-text)', marginBottom: '8px', fontWeight: 800 }}>Não foi possível abrir este anúncio</h2>
      <p style={{ color: 'var(--nx-text-sub)', marginBottom: '24px', maxWidth: 360, lineHeight: 1.6 }}>{erro}</p>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={() => navigate(-1)} className="nx-btn-primary">Voltar Atrás</button>
        <Link to="/" className="nx-btn-primary" style={{ background: 'var(--nx-bg-2)', color: 'var(--nx-text)', border: '1px solid var(--nx-border-2)' }}>Página Inicial</Link>
      </div>
    </div>
  );

  if (!anuncio) return null;

  const donoDoAnuncio = anuncio.utilizador || anuncio.user;
  const isDono = signed && (user?.id === donoDoAnuncio?._id || user?._id === donoDoAnuncio?._id);
  const isCarro = anuncio.tipo === 'carro';

  const precoValor = anuncio.preco || 0;
  const preco = formatarMoeda(precoValor);
  const precoPorM2 = !isCarro && anuncio.imovel?.area
    ? `${formatarMoeda(Math.round(precoValor / anuncio.imovel.area))}/m²`
    : null;

  const emailContacto = anuncio.email || donoDoAnuncio?.email || 'Não fornecido';
  const telefoneContacto = anuncio.telefone || donoDoAnuncio?.telefone || 'Não fornecido';
  const whatsappNumero = numeroParaWhatsapp(telefoneContacto);
  const inicial = donoDoAnuncio?.nome?.charAt(0).toUpperCase() || 'U';
  const localizacaoString = `${anuncio.localizacao?.cidade || 'N/A'}${anuncio.localizacao?.distrito ? `, ${anuncio.localizacao.distrito}` : ''}`;
  const temVaranda = anuncio.equipamento?.some(e => e.toLowerCase().includes('varanda') || e.toLowerCase().includes('terraço'));

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
    { label: 'Varanda/Terraço', value: temVaranda ? 'Sim' : 'Não', icon: mdiBalcony },
  ];

  const especificacoesVisiveis = specs.filter(s => s.value != null && s.value !== '');
  const extrasOpcionais = anuncio.equipamento?.length > 0 ? anuncio.equipamento : [];

  const valorFinanciado = Math.max(0, precoValor - entrada);
  const taxaMensal = 0.079 / 12;
  const prestacaoMensal = valorFinanciado > 0
    ? Math.round((valorFinanciado * taxaMensal) / (1 - Math.pow(1 + taxaMensal, -meses)))
    : 0;

  const accent = isCarro ? 'var(--nx-accent-car)' : 'var(--nx-accent-home)';
  const accentShadow = isCarro ? 'rgba(42,193,180,.3)' : 'rgba(124,110,247,.3)';

  const garantia = anuncio.garantia;
  const aceitaRetoma = anuncio.aceitaRetoma;
  const rating = donoDoAnuncio?.rating || 0;
  const totalAvaliacoes = donoDoAnuncio?.totalAvaliacoes || 0;
  const anoRegistoUser = donoDoAnuncio?.createdAt ? new Date(donoDoAnuncio.createdAt).getFullYear() : '2026';
  const vendedorVerificado = donoDoAnuncio?.tipo === 'admin';
  const referencia = anuncio._id?.slice(-6).toUpperCase();

  // Dados estruturados para motores de pesquisa
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': isCarro ? 'Vehicle' : 'Product',
    name: anuncio.titulo,
    description: anuncio.descricao?.slice(0, 300),
    image: fotos.filter(Boolean),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: precoValor,
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <Helmet>
        <title>{anuncio.titulo ? `${anuncio.titulo} | Noxvelia` : 'Noxvelia'}</title>
        <meta name="description" content={anuncio.descricao?.substring(0, 155)} />
        <meta property="og:title" content={`NOXVELIA | ${anuncio.titulo}`} />
        <meta property="og:description" content={anuncio.descricao?.substring(0, 100)} />
        <meta property="og:image" content={fotos[0] || ''} />
        <meta property="og:url" content={window.location.href} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <style>{`
        .ano-page { background: var(--nx-bg); color: var(--nx-text); min-height: calc(100vh - 72px); padding: 28px 20px 72px; }
        .ano-container { max-width: 1240px; margin: 0 auto; }
        .ano-breadcrumb { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
        .ano-back { display: inline-flex; align-items: center; gap: 6px; color: var(--nx-text-sub); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; text-decoration: none; transition: color .2s; }
        .ano-back:hover, .ano-back:focus-visible { color: var(--nx-text); }
        .ano-actions { display: flex; gap: 10px; }
        .btn-icon { width: 38px; height: 38px; border-radius: 10px; background: var(--nx-bg-2); border: 1px solid var(--nx-border); color: var(--nx-text-sub); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all .2s; position: relative; }
        .btn-icon:hover { background: var(--nx-bg-3); border-color: var(--nx-border-2); color: var(--nx-text); transform: translateY(-1px); }
        .btn-icon:focus-visible, button:focus-visible, a:focus-visible, input:focus-visible { outline: 2px solid ${accent}; outline-offset: 2px; }
        .btn-icon.saved { color: var(--nx-danger); background: rgba(239,68,68,.1); border-color: rgba(239,68,68,.2); }
        .toast-copy { position: absolute; top: 110%; right: 0; background: var(--nx-text); color: var(--nx-bg); font-size: 11px; font-weight: 700; padding: 5px 10px; border-radius: 6px; white-space: nowrap; pointer-events: none; animation: nx-fade-in .2s; z-index: 20; }

        .ano-grid { display: grid; grid-template-columns: 1fr 380px; gap: 32px; align-items: start; }
        @media (max-width: 960px) { .ano-grid { grid-template-columns: 1fr; } }

        .gallery-wrap { border-radius: 18px; overflow: hidden; background: var(--nx-bg-2); border: 1px solid var(--nx-border); margin-bottom: 20px; }
        .gallery-main { position: relative; aspect-ratio: 16/9; background: #000; display: flex; align-items: center; justify-content: center; overflow: hidden; cursor: zoom-in; }
        .gallery-main img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease, opacity .3s; }
        .gallery-main:hover img { transform: scale(1.025); }
        .gallery-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.65) 0%, transparent 45%); pointer-events: none; }
        .gallery-placeholder { font-size: 64px; opacity: .25; }
        .gallery-badge { position: absolute; top: 14px; left: 14px; background: rgba(0,0,0,.65); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,.12); border-radius: 8px; padding: 5px 12px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .07em; color: ${accent}; display: flex; align-items: center; gap: 5px; z-index: 5; }
        .gallery-counter { position: absolute; top: 14px; right: 14px; background: rgba(0,0,0,.65); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,.1); border-radius: 20px; padding: 5px 12px; font-size: 12px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 5px; z-index: 5; }
        .gallery-zoom-hint { position: absolute; bottom: 16px; right: 14px; background: rgba(0,0,0,.55); backdrop-filter: blur(8px); border-radius: 20px; padding: 6px 11px; font-size: 11px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 5px; z-index: 5; opacity: 0; transition: opacity .2s; }
        .gallery-main:hover .gallery-zoom-hint { opacity: 1; }
        .gallery-bottom { position: absolute; bottom: 16px; left: 16px; right: 110px; z-index: 5; }
        .gallery-title-overlay { font-family: var(--nx-font-display); font-size: clamp(18px, 3vw, 26px); font-weight: 800; color: #fff; text-shadow: 0 2px 14px rgba(0,0,0,.6); letter-spacing: -.02em; line-height: 1.25; margin-bottom: 6px; }
        .gallery-loc { display: flex; align-items: center; gap: 4px; color: rgba(255,255,255,.75); font-size: 13px; font-weight: 600; }
        .arrow-btn { position: absolute; top: 50%; transform: translateY(-50%); width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,.1); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,.18); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; transition: all .2s; }
        .arrow-btn:hover { background: rgba(255,255,255,.25); }
        .arrow-left { left: 14px; } .arrow-right { right: 14px; }
        .thumbs-row { display: flex; gap: 8px; padding: 12px; overflow-x: auto; scrollbar-width: none; background: var(--nx-bg-3); border-top: 1px solid var(--nx-border); }
        .thumbs-row::-webkit-scrollbar { display: none; }
        .thumb { width: 76px; height: 50px; border-radius: 8px; overflow: hidden; cursor: pointer; border: 2px solid transparent; opacity: .45; transition: all .2s; flex-shrink: 0; padding: 0; background: none; }
        .thumb:hover { opacity: .75; }
        .thumb.active { border-color: ${accent}; opacity: 1; }
        .thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .title-block { margin-bottom: 22px; }
        .listing-price { font-family: var(--nx-font-display); font-size: clamp(28px, 4vw, 38px); font-weight: 800; letter-spacing: -.03em; line-height: 1; color: ${accent}; margin-bottom: 5px; }
        .listing-subtitle { font-size: 16px; color: var(--nx-text-2); font-weight: 500; margin-bottom: 12px; line-height: 1.4; }
        .meta-row { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
        .meta-item { display: flex; align-items: center; gap: 5px; font-size: 12px; color: var(--nx-text-sub); font-weight: 600; }
        .meta-ref { display: flex; align-items: center; gap: 5px; font-size: 12px; color: var(--nx-text-sub); font-weight: 600; background: none; border: none; cursor: pointer; padding: 0; font-family: inherit; }
        .meta-ref:hover { color: var(--nx-text); }
        .estado-badge { padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .06em; background: rgba(16,185,129,.1); color: #10b981; border: 1px solid rgba(16,185,129,.2); }
        .meta-dot { color: var(--nx-text-sub); font-size: 10px; }

        .nx-price-badges { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0 20px; padding-bottom: 16px; border-bottom: 1px solid var(--nx-border); }
        .nx-badge-item { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; background: var(--nx-bg-2); border: 1px solid var(--nx-border); color: var(--nx-text-2); }
        .nx-badge-item.garantia { background: rgba(42, 193, 180, 0.06); border-color: rgba(42, 193, 180, 0.2); color: #2ac1b4; }

        .tabs-wrap { display: flex; gap: 2px; border-bottom: 1px solid var(--nx-border); margin-bottom: 22px; overflow-x: auto; scrollbar-width: none; }
        .tabs-wrap::-webkit-scrollbar { display: none; }
        .tab-btn { padding: 10px 18px; background: none; border: none; border-bottom: 2px solid transparent; color: var(--nx-text-sub); font-size: 14px; font-weight: 700; cursor: pointer; white-space: nowrap; transition: all .2s; letter-spacing: .01em; }
        .tab-btn:hover { color: var(--nx-text-2); }
        .tab-btn.active { color: ${accent}; border-bottom-color: ${accent}; }

        .specs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(155px, 1fr)); gap: 12px; }
        .spec-card { background: var(--nx-bg-2); border: 1px solid var(--nx-border); border-radius: 12px; padding: 14px 16px; transition: border-color .2s, transform .2s; animation: nx-rise .35s ease backwards; }
        .spec-card:hover { border-color: var(--nx-border-2); transform: translateY(-1px); }
        .spec-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; color: var(--nx-text-sub); margin-bottom: 8px; display: flex; align-items: center; gap: 5px; }
        .spec-value { font-size: 15px; font-weight: 700; color: var(--nx-text); text-transform: capitalize; }

        .extras-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(185px, 1fr)); gap: 10px; }
        .extra-item { display: flex; align-items: center; gap: 9px; background: var(--nx-bg-2); border: 1px solid var(--nx-border); border-radius: 9px; padding: 11px 14px; font-size: 13px; font-weight: 600; color: var(--nx-text-2); animation: nx-rise .35s ease backwards; }
        .extra-check { color: ${accent}; flex-shrink: 0; }

        .desc-box { background: var(--nx-bg-2); border: 1px solid var(--nx-border); border-radius: 16px; padding: 26px; margin-top: 4px; }
        .desc-head { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; color: var(--nx-text-sub); margin-bottom: 14px; display: flex; align-items: center; gap: 7px; }
        .desc-text { font-size: 14px; line-height: 1.8; color: var(--nx-text-2); white-space: pre-wrap; }

        .tab-panel { animation: nx-fade-in .35s ease; }

        .sidebar-sticky { position: sticky; top: 20px; display: flex; flex-direction: column; gap: 14px; }
        .price-panel { background: var(--nx-card-bg); border: 1px solid var(--nx-card-border); border-radius: 20px; padding: 26px; box-shadow: var(--nx-shadow-card); backdrop-filter: blur(16px); }
        .panel-price { font-family: var(--nx-font-display); font-size: clamp(28px, 3.5vw, 38px); font-weight: 800; letter-spacing: -.03em; line-height: 1; color: ${accent}; margin-bottom: 4px; }
        .panel-price-m2 { font-size: 13px; color: var(--nx-text-sub); font-weight: 600; margin-bottom: 12px; }

        .btn-contact { width: 100%; padding: 16px; background: ${accent}; color: #fff; border: none; border-radius: 12px; font-family: var(--nx-font-body); font-size: 14px; font-weight: 800; cursor: pointer; transition: all .2s; display: flex; align-items: center; justify-content: center; gap: 7px; text-transform: uppercase; letter-spacing: .06em; box-shadow: 0 6px 20px ${accentShadow}; }
        .btn-contact:hover { filter: brightness(1.1); transform: translateY(-2px); box-shadow: 0 10px 28px ${accentShadow}; }

        .contact-revealed { width: 100%; padding: 16px; background: var(--nx-bg-2); border: 2px dashed var(--nx-border-2); border-radius: 12px; display: flex; flex-direction: column; align-items: center; gap: 4px; text-decoration: none; transition: background .2s; cursor: pointer; animation: nx-fade-in .3s; }
        .contact-revealed:hover { background: var(--nx-bg-3); }
        .contact-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; color: var(--nx-text-sub); }
        .contact-phone { font-size: 20px; font-weight: 800; color: var(--nx-text); display: flex; align-items: center; gap: 7px; }
        .contact-email { font-size: 13px; color: var(--nx-text-sub); font-weight: 600; margin-top: 2px; }
        .btn-whatsapp { width: 100%; padding: 13px; margin-top: 10px; background: #1fb855; color: #fff; border: none; border-radius: 12px; font-size: 13px; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 7px; text-decoration: none; transition: filter .2s, transform .2s; animation: nx-fade-in .3s; }
        .btn-whatsapp:hover { filter: brightness(1.08); transform: translateY(-1px); }

        .finance-box { background: var(--nx-bg-2); border: 1px solid var(--nx-border); border-radius: 14px; padding: 20px; margin-top: 16px; }
        .finance-box .fin-head { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; color: var(--nx-text-sub); margin-bottom: 14px; }
        .fin-result-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px dashed var(--nx-border-2); }
        .fin-prestacao { font-family: var(--nx-font-display); font-size: 28px; font-weight: 800; color: ${accent}; letter-spacing: -.02em; }
        .fin-mes { font-size: 12px; color: var(--nx-text-sub); font-weight: 600; margin-left: 3px; }
        .fin-taeg { font-size: 11px; color: var(--nx-text-sub); font-weight: 700; }
        .slider-group { margin-bottom: 12px; }
        .slider-label-row { display: flex; justify-content: space-between; font-size: 12px; font-weight: 700; color: var(--nx-text-2); margin-bottom: 6px; }
        .slider-val { color: ${accent}; }
        .fin-slider { width: 100%; height: 4px; border-radius: 2px; accent-color: ${accent}; cursor: pointer; -webkit-appearance: none; background: var(--nx-border); outline: none; }
        .fin-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: ${accent}; cursor: pointer; }
        .fin-note { font-size: 10.5px; color: var(--nx-text-sub); margin-top: 12px; line-height: 1.5; }

        .trust-strip { display: flex; gap: 18px; padding: 14px 4px 0; margin-top: 2px; }
        .trust-item { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; color: var(--nx-text-sub); }

        .seller-panel { background: var(--nx-card-bg); border: 1px solid var(--nx-card-border); border-radius: 16px; padding: 18px 20px; display: flex; align-items: center; gap: 14px; text-decoration: none; transition: all .2s; }
        .seller-panel:hover { border-color: var(--nx-border-2); background: var(--nx-bg-2); }
        .seller-avatar { width: 50px; height: 50px; border-radius: 50%; background: var(--nx-bg-3); display: flex; align-items: center; justify-content: center; font-family: var(--nx-font-display); font-size: 18px; font-weight: 800; color: var(--nx-text); flex-shrink: 0; overflow: hidden; }
        .seller-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .seller-info { flex: 1; min-width: 0; }
        .seller-name { font-size: 15px; font-weight: 800; color: var(--nx-text); display: flex; align-items: center; gap: 5px; margin-bottom: 3px; }
        .seller-sub { font-size: 12px; color: var(--nx-text-sub); font-weight: 600; margin-top: 4px; }

        .seller-stars-row { display: flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 700; color: #f59e0b; margin-bottom: 2px; }
        .seller-reviews-count { color: var(--nx-text-sub); font-weight: 500; font-size: 11px; margin-left: 2px; }

        .owner-box { background: rgba(59,130,246,.05); border: 1px solid rgba(59,130,246,.2); border-radius: 14px; padding: 18px; margin-top: 16px; }
        .owner-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; color: #60a5fa; margin-bottom: 12px; }
        .owner-btns { display: flex; gap: 10px; }
        .btn-owner-edit { flex: 1; padding: 11px; text-align: center; background: var(--nx-bg); border: 1px solid var(--nx-border-2); color: var(--nx-text); border-radius: 10px; font-size: 13px; font-weight: 700; text-decoration: none; transition: all .2s; }
        .btn-owner-edit:hover { border-color: var(--nx-text); }
        .btn-owner-sold { flex: 1; padding: 11px; border: none; background: #10b981; color: #fff; border-radius: 10px; font-size: 13px; font-weight: 800; cursor: pointer; transition: opacity .2s; }
        .btn-owner-sold:hover { opacity: .85; }

        .nx-modal-overlay { position: fixed; inset: 0; background: var(--nx-overlay); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 20px; animation: nx-fade-in .2s; }
        .nx-modal-box { width: 100%; max-width: 440px; background: var(--nx-bg-2); border: 1px solid var(--nx-border-2); border-radius: 20px; padding: 36px 28px; text-align: center; box-shadow: var(--nx-shadow-card); }
        .nx-modal-icon { font-size: 44px; margin-bottom: 14px; }
        .nx-modal-title { font-family: var(--nx-font-display); font-size: 22px; font-weight: 800; color: var(--nx-text); margin-bottom: 10px; letter-spacing: -.02em; }
        .nx-modal-text { font-size: 14px; color: var(--nx-text-sub); line-height: 1.7; margin-bottom: 28px; }
        .nx-modal-footer { display: flex; gap: 12px; }
        .nx-btn-cancel { flex: 1; padding: 13px; background: transparent; border: 1px solid var(--nx-border-2); color: var(--nx-text-sub); border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all .2s; }
        .nx-btn-cancel:hover { border-color: var(--nx-text); color: var(--nx-text); }
        .nx-btn-danger { flex: 1; padding: 13px; background: var(--nx-danger); border: none; color: #fff; border-radius: 10px; font-size: 14px; font-weight: 800; cursor: pointer; transition: opacity .2s; }
        .nx-btn-danger:hover { opacity: .85; }
        .nx-btn-danger:disabled { opacity: .5; cursor: not-allowed; }

        .sugeridos-section { margin-top: 64px; padding-top: 40px; border-top: 1px solid var(--nx-border); }
        .sugeridos-title { font-family: var(--nx-font-display); font-size: 22px; font-weight: 800; color: var(--nx-text); margin-bottom: 24px; letter-spacing: -0.02em; }
        .sugeridos-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }

        /* Lightbox */
        .lightbox-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.94); z-index: 10000; display: flex; flex-direction: column; align-items: center; justify-content: center; animation: nx-fade-in .2s; }
        .lightbox-close { position: absolute; top: 18px; right: 18px; width: 42px; height: 42px; border-radius: 50%; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.18); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 5; }
        .lightbox-close:hover { background: rgba(255,255,255,.2); }
        .lightbox-counter { position: absolute; top: 24px; left: 24px; color: rgba(255,255,255,.8); font-size: 13px; font-weight: 700; z-index: 5; }
        .lightbox-img-wrap { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; padding: 70px 90px; }
        .lightbox-img-wrap img { max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 6px; }
        @media (max-width: 700px) { .lightbox-img-wrap { padding: 70px 16px; } .arrow-btn { width: 34px; height: 34px; } }

        /* Barra fixa de contacto em mobile */
        .mobile-cta-bar { display: none; }
        @media (max-width: 720px) {
          .mobile-cta-bar { display: flex; position: fixed; left: 0; right: 0; bottom: 0; z-index: 500; background: var(--nx-card-bg); border-top: 1px solid var(--nx-border-2); padding: 10px 14px; align-items: center; gap: 12px; backdrop-filter: blur(16px); }
          .mobile-cta-price { font-family: var(--nx-font-display); font-weight: 800; font-size: 17px; color: ${accent}; line-height: 1.1; white-space: nowrap; }
          .mobile-cta-btn { flex: 1; padding: 12px; border-radius: 10px; border: none; background: ${accent}; color: #fff; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: .04em; cursor: pointer; }
          .ano-page { padding-bottom: 96px; }
        }

        @keyframes nx-rise { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) {
          .spec-card, .extra-item, .gallery-main img, .btn-contact, .btn-whatsapp { animation: none !important; transition: none !important; }
        }
      `}</style>

      {lightboxAberto && (
        <div className="lightbox-overlay" onClick={() => setLightboxAberto(false)} role="dialog" aria-modal="true" aria-label="Visualização ampliada das fotos">
          <button type="button" className="lightbox-close" onClick={(e) => { e.stopPropagation(); setLightboxAberto(false); }} aria-label="Fechar">
            <Icon path={mdiClose} size={1} />
          </button>
          {fotos.length > 1 && <div className="lightbox-counter">{fotoActiva + 1} / {fotos.length}</div>}
          <div className="lightbox-img-wrap" onClick={(e) => e.stopPropagation()} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {fotos[fotoActiva] ? <img src={fotos[fotoActiva]} alt={`${anuncio.titulo} — foto ${fotoActiva + 1}`} /> : <div className="gallery-placeholder">{isCarro ? '🚗' : '🏠'}</div>}
          </div>
          {fotos.length > 1 && (
            <>
              <button type="button" className="arrow-btn arrow-left" onClick={(e) => { e.stopPropagation(); fotoAnterior(); }} aria-label="Foto anterior"><Icon path={mdiChevronLeft} size={1.1} /></button>
              <button type="button" className="arrow-btn arrow-right" onClick={(e) => { e.stopPropagation(); fotoSeguinte(); }} aria-label="Foto seguinte"><Icon path={mdiChevronRight} size={1.1} /></button>
            </>
          )}
        </div>
      )}

      {mostrarModalVendido && (
        <div className="nx-modal-overlay" onClick={() => setMostrarModalVendido(false)}>
          <div className="nx-modal-box" onClick={e => e.stopPropagation()}>
            <div className="nx-modal-icon">🎉</div>
            <h3 className="nx-modal-title">Parabéns pela Venda!</h3>
            <p className="nx-modal-text">Pretendes eliminar este anúncio de forma permanente dado que o ativo já foi vendido?</p>
            <div className="nx-modal-footer">
              <button type="button" className="nx-btn-cancel" disabled={eliminandoVendido} onClick={() => setMostrarModalVendido(false)}>Cancelar</button>
              <button type="button" className="nx-btn-danger" disabled={eliminandoVendido} onClick={handleConfirmarVendido}>
                {eliminandoVendido ? 'A eliminar...' : 'Sim, Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="ano-page">
        <div className="ano-container">

          <div className="ano-breadcrumb">
            <Link to={isCarro ? '/carros' : '/imoveis'} className="ano-back">
              <Icon path={mdiChevronLeft} size={0.75} /> Voltar à Pesquisa
            </Link>
            <div className="ano-actions">
              <button className="btn-icon" onClick={handlePartilhar} title="Partilhar" aria-label="Partilhar anúncio">
                <Icon path={mdiShareVariantOutline} size={0.85} />
                {copiado && <div className="toast-copy">✓ Copiado!</div>}
              </button>
              {!isDono && (
                <button className={`btn-icon ${guardado ? 'saved' : ''}`} onClick={toggleGuardado} title="Guardar" aria-pressed={guardado} aria-label={guardado ? 'Remover dos guardados' : 'Guardar anúncio'}>
                  <Icon path={guardado ? mdiHeart : mdiHeartOutline} size={0.85} />
                </button>
              )}
            </div>
          </div>

          <div className="ano-grid">
            <div>
              <div className="gallery-wrap">
                <div
                  className="gallery-main"
                  onClick={() => setLightboxAberto(true)}
                  onTouchStart={onTouchStart}
                  onTouchEnd={onTouchEnd}
                  role="button"
                  tabIndex={0}
                  aria-label="Abrir galeria em ecrã completo"
                  onKeyDown={(e) => { if (e.key === 'Enter') setLightboxAberto(true); }}
                >
                  {fotos[fotoActiva] ? <img src={fotos[fotoActiva]} alt={anuncio.titulo} loading="eager" /> : <div className="gallery-placeholder">{isCarro ? '🚗' : '🏠'}</div>}
                  <div className="gallery-overlay" />
                  <div className="gallery-badge"><Icon path={isCarro ? mdiCar : mdiHomeCityOutline} size={0.7} />{isCarro ? 'Automóvel' : 'Imóvel'}</div>
                  {fotos.length > 1 && (<div className="gallery-counter"><Icon path={mdiCamera} size={0.65} />{fotoActiva + 1} / {fotos.length}</div>)}
                  {fotos[fotoActiva] && <div className="gallery-zoom-hint"><Icon path={mdiMagnifyPlusOutline} size={0.65} />Ampliar</div>}
                  <div className="gallery-bottom">
                    <div className="gallery-title-overlay">{anuncio.titulo}</div>
                    <div className="gallery-loc"><Icon path={mdiMapMarkerOutline} size={0.65} />{localizacaoString}</div>
                  </div>
                  {fotos.length > 1 && (
                    <>
                      <button type="button" className="arrow-btn arrow-left" onClick={(e) => { e.stopPropagation(); fotoAnterior(); }} aria-label="Foto anterior"><Icon path={mdiChevronLeft} size={1.1} /></button>
                      <button type="button" className="arrow-btn arrow-right" onClick={(e) => { e.stopPropagation(); fotoSeguinte(); }} aria-label="Foto seguinte"><Icon path={mdiChevronRight} size={1.1} /></button>
                    </>
                  )}
                </div>
                {fotos.length > 1 && (
                  <div className="thumbs-row">
                    {fotos.map((f, i) => (
                      <button type="button" key={i} className={`thumb ${fotoActiva === i ? 'active' : ''}`} onClick={() => setFotoActiva(i)} aria-label={`Ver foto ${i + 1}`}>
                        {f ? <img src={f} alt="" loading="lazy" /> : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '18px' }}>📷</div>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="title-block">
                <div className="listing-price">{preco}</div>
                <div className="listing-subtitle">{anuncio.titulo}</div>
                <div className="meta-row">
                  <span className="estado-badge">● {anuncio.estado || 'Disponível'}</span>
                  <span className="meta-item"><Icon path={mdiEyeOutline} size={0.65} /> {anuncio.visitas || 0} visualizações</span>
                  <span className="meta-dot">·</span>
                  <button type="button" className="meta-ref" onClick={copiarReferencia} title="Copiar referência">
                    <Icon path={refCopiado ? mdiCheck : mdiContentCopy} size={0.6} /> Ref: #{referencia}
                  </button>
                </div>
              </div>

              <div className="tabs-wrap" role="tablist">
                <button type="button" role="tab" aria-selected={abaAtiva === 'especificacoes'} className={`tab-btn ${abaAtiva === 'especificacoes' ? 'active' : ''}`} onClick={() => setAbaAtiva('especificacoes')}>Ficha Técnica</button>
                {extrasOpcionais.length > 0 && (<button type="button" role="tab" aria-selected={abaAtiva === 'equipamento'} className={`tab-btn ${abaAtiva === 'equipamento' ? 'active' : ''}`} onClick={() => setAbaAtiva('equipamento')}>{isCarro ? 'Equipamento' : 'Detalhes'}</button>)}
                <button type="button" role="tab" aria-selected={abaAtiva === 'descricao'} className={`tab-btn ${abaAtiva === 'descricao' ? 'active' : ''}`} onClick={() => setAbaAtiva('descricao')}>Descrição</button>
              </div>

              {abaAtiva === 'especificacoes' && (
                <div className="specs-grid tab-panel">
                  {especificacoesVisiveis.map((s, i) => (
                    <div key={i} className="spec-card" style={{ animationDelay: `${i * 35}ms` }}>
                      <div className="spec-label"><Icon path={s.icon} size={0.75} />{s.label}</div>
                      <div className="spec-value">{s.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {abaAtiva === 'equipamento' && extrasOpcionais.length > 0 && (
                <div className="extras-grid tab-panel">
                  {extrasOpcionais.map((extra, i) => (
                    <div key={i} className="extra-item" style={{ animationDelay: `${i * 30}ms` }}>
                      <span className="extra-check"><Icon path={mdiStar} size={0.75} /></span>{extra}
                    </div>
                  ))}
                </div>
              )}

              {abaAtiva === 'descricao' && (
                <div className="desc-box tab-panel">
                  <div className="desc-head"><Icon path={mdiFileDocumentOutline} size={0.8} />Descrição do Anunciante</div>
                  <div className="desc-text">{anuncio.descricao || 'Nenhuma descrição detalhada providenciada.'}</div>
                </div>
              )}
            </div>

            <div>
              <div className="sidebar-sticky">
                <div className="price-panel">
                  <div className="panel-price">{preco}</div>
                  {precoPorM2 && <div className="panel-price-m2">{precoPorM2}</div>}

                  <div className="nx-price-badges">
                    {(garantia || vendedorVerificado) && (
                      <div className="nx-badge-item garantia">🛡️ {garantia || 'Garantia Incluída'}</div>
                    )}
                    {aceitaRetoma && (
                      <div className="nx-badge-item">🔄 Aceita Retoma</div>
                    )}
                    <div className="nx-badge-item">⚡ Financiamento</div>
                  </div>

                  {isDono ? (
                    <div className="owner-box">
                      <div className="owner-label">Gestão do Anúncio</div>
                      <div className="owner-btns">
                        <Link to={`/editar/${id}`} className="btn-owner-edit">Editar Dados</Link>
                        <button type="button" className="btn-owner-sold" onClick={() => setMostrarModalVendido(true)}>✓ Vendido</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {mostrarTelefone ? (
                        <>
                          <a href={`tel:${telefoneContacto}`} className="contact-revealed">
                            <span className="contact-label">Contactar via</span>
                            <div className="contact-phone"><Icon path={mdiPhone} size={0.9} color={accent} />{telefoneContacto}</div>
                            <div className="contact-email">✉ {emailContacto}</div>
                          </a>
                          {whatsappNumero && (
                            <a
                              href={`https://wa.me/${whatsappNumero}?text=${encodeURIComponent(`Olá, estou interessado/a no anúncio "${anuncio.titulo}" na Noxvelia.`)}`}
                              target="_blank" rel="noopener noreferrer" className="btn-whatsapp"
                            >
                              <Icon path={mdiWhatsapp} size={0.85} /> Enviar mensagem
                            </a>
                          )}
                        </>
                      ) : (
                        <button type="button" className="btn-contact" onClick={() => setMostrarTelefone(true)}>
                          <Icon path={mdiPhone} size={0.85} /> Revelar Contactos
                        </button>
                      )}
                      <div className="trust-strip">
                        <span className="trust-item"><Icon path={mdiShieldCheckOutline} size={0.6} />Pagamento seguro</span>
                        <span className="trust-item"><Icon path={mdiClockOutline} size={0.6} />Resposta rápida</span>
                      </div>
                    </>
                  )}

                  {isCarro && !isDono && (
                    <div className="finance-box">
                      <div className="fin-head">Simulação de Crédito</div>
                      <div className="fin-result-row">
                        <div>
                          <span className="fin-prestacao">{prestacaoMensal.toLocaleString('pt-PT')}€</span>
                          <span className="fin-mes">/mês</span>
                        </div>
                        <div className="fin-taeg">TAEG 7.9%</div>
                      </div>
                      <div className="slider-group">
                        <div className="slider-label-row">
                          <span>Entrada inicial</span>
                          <span className="slider-val">{Number(entrada).toLocaleString('pt-PT')}€</span>
                        </div>
                        <input type="range" className="fin-slider" min="0" max={Math.round(precoValor * 0.7)} step="250" value={entrada} onChange={e => setEntrada(Number(e.target.value))} aria-label="Entrada inicial" />
                      </div>
                      <div className="slider-group" style={{ marginBottom: 0 }}>
                        <div className="slider-label-row">
                          <span>Prazo</span>
                          <span className="slider-val">{meses} meses</span>
                        </div>
                        <input type="range" className="fin-slider" min="24" max="120" step="12" value={meses} onChange={e => setMeses(Number(e.target.value))} aria-label="Prazo em meses" />
                      </div>
                      <div className="fin-note">Simulação meramente indicativa. Os valores reais dependem da aprovação de crédito junto da instituição financeira parceira.</div>
                    </div>
                  )}
                </div>

                <Link to={`/vendedor/${donoDoAnuncio?._id}`} className="seller-panel">
                  <div className="seller-avatar">{donoDoAnuncio?.avatarUrl ? <img src={donoDoAnuncio.avatarUrl} alt="" /> : inicial}</div>
                  <div className="seller-info">
                    <div className="seller-name">
                      {vendedorVerificado
                        ? (donoDoAnuncio.nome?.toUpperCase().includes('NOXVELIA') ? donoDoAnuncio.nome : `NOXVELIA ${donoDoAnuncio?.nome}`)
                        : (donoDoAnuncio?.nome || 'Utilizador Particular')
                      }
                      {vendedorVerificado && <Icon path={mdiCheckDecagram} size={0.8} color="var(--nx-accent-blue)" />}
                    </div>

                    <div className="seller-stars-row">
                      {rating > 0 ? (
                        <>⭐ {rating.toFixed(1)} <span className="seller-reviews-count">({totalAvaliacoes} avaliações)</span></>
                      ) : (
                        <span className="seller-reviews-count" style={{ fontSize: '11px', marginLeft: 0 }}>Sem avaliações ainda</span>
                      )}
                    </div>

                    <div className="seller-sub">
                      Na NOXVELIA desde {anoRegistoUser} · Ver stock ›
                    </div>
                  </div>
                  <Icon path={mdiChevronRight} size={0.85} color="var(--nx-text-sub)" />
                </Link>
              </div>
            </div>
          </div>

          {sugeridos.length > 0 && (
            <div className="sugeridos-section">
              <h3 className="sugeridos-title">Poderá gostar destes anúncios</h3>
              <div className="sugeridos-grid">
                {sugeridos.map(sug => <AnuncioCard key={sug._id} anuncio={sug} />)}
              </div>
            </div>
          )}

        </div>
      </div>

      {!isDono && (
        <div className="mobile-cta-bar">
          <div className="mobile-cta-price">{preco}</div>
          <button type="button" className="mobile-cta-btn" onClick={() => setMostrarTelefone(true)}>
            Contactar
          </button>
        </div>
      )}
    </>
  );
}