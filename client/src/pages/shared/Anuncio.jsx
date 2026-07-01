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
  mdiCheckCircleOutline, mdiSwapHorizontal, mdiLightningBolt, mdiCarInfo
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

  if (loading) {
    return (
      <div style={{ minHeight: 'calc(100vh - 72px)', background: '#f8fafc', padding: '28px 20px 72px' }}>
        <style>{`
          @keyframes nx-shimmer { 0% { background-position: -300px 0; } 100% { background-position: 300px 0; } }
          .skl { background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 37%, #e2e8f0 63%); background-size: 600px 100%; animation: nx-shimmer 1.6s ease-in-out infinite; border-radius: 10px; }
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

  if (erro) return (
    <div style={{ minHeight: 'calc(100vh - 72px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', color: '#0f172a', padding: '0 20px', textAlign: 'center' }}>
      <Icon path={mdiAlertCircleOutline} size={2.2} color="#ef4444" style={{ marginBottom: 16 }} />
      <h2 style={{ fontSize: '22px', color: '#0f172a', marginBottom: '8px', fontWeight: 800 }}>Não foi possível abrir este anúncio</h2>
      <p style={{ color: '#64748b', marginBottom: '24px', maxWidth: 360, lineHeight: 1.6 }}>{erro}</p>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={() => navigate(-1)} className="nx-btn-primary" style={{ padding: '12px 24px', borderRadius: '12px', background: '#0f172a', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Voltar Atrás</button>
        <Link to="/" className="nx-btn-primary" style={{ padding: '12px 24px', borderRadius: '12px', background: '#ffffff', color: '#0f172a', border: '1px solid #cbd5e1', fontWeight: 700, textDecoration: 'none' }}>Página Inicial</Link>
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

  // Lógica do Ano/Mês combinada
  const valorAnoMes = anuncio.carro?.ano 
    ? (anuncio.carro?.mesRegisto ? `${anuncio.carro.ano} / ${String(anuncio.carro.mesRegisto).padStart(2, '0')}` : anuncio.carro.ano)
    : null;

  // 🌟 Lógica do Link da carVertical
  const vin = anuncio.carro?.vin;
  const carVerticalLink = vin 
    ? `https://www.carvertical.deal/27H3X8P/CXW7M6/?uid=332&source_id=AFF&sub1=noxvelia&sub3=${vin}`
    : `https://www.carvertical.deal/27H3X8P/CXW7M6/?source_id=AFF&sub1=noxvelia`;

  const specs = isCarro ? [
    { label: 'Ano / Mês', value: valorAnoMes, icon: mdiCalendarBlank },
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

  const accent = isCarro ? '#2ac1b4' : '#3ecf8e';
  const accentShadow = isCarro ? 'rgba(42,193,180,.3)' : 'rgba(62,207,142,.3)';

  const garantia = anuncio.garantia;
  const aceitaRetoma = anuncio.aceitaRetoma;
  const rating = donoDoAnuncio?.rating || 0;
  const totalAvaliacoes = donoDoAnuncio?.totalAvaliacoes || 0;
  const anoRegistoUser = donoDoAnuncio?.createdAt ? new Date(donoDoAnuncio.createdAt).getFullYear() : '2026';
  const vendedorVerificado = donoDoAnuncio?.tipo === 'admin';
  const referencia = anuncio._id?.slice(-6).toUpperCase();

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
        .ano-page { background: #f8fafc; color: #0f172a; min-height: calc(100vh - 72px); padding: 28px 20px 72px; font-family: 'Inter', sans-serif; }
        .ano-container { max-width: 1240px; margin: 0 auto; }
        .ano-breadcrumb { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
        .ano-back { display: inline-flex; align-items: center; gap: 6px; color: #64748b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; text-decoration: none; transition: color .2s; }
        .ano-back:hover, .ano-back:focus-visible { color: #0f172a; }
        .ano-actions { display: flex; gap: 10px; }
        .btn-icon { width: 38px; height: 38px; border-radius: 10px; background: #ffffff; border: 1px solid #e2e8f0; color: #64748b; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all .2s; position: relative; }
        .btn-icon:hover { background: #f1f5f9; border-color: #cbd5e1; color: #0f172a; transform: translateY(-1px); }
        .btn-icon:focus-visible, button:focus-visible, a:focus-visible, input:focus-visible { outline: 2px solid ${accent}; outline-offset: 2px; }
        .btn-icon.saved { color: #ef4444; background: rgba(239,68,68,.05); border-color: rgba(239,68,68,.2); }
        .toast-copy { position: absolute; top: 110%; right: 0; background: #0f172a; color: #ffffff; font-size: 11px; font-weight: 700; padding: 5px 10px; border-radius: 6px; white-space: nowrap; pointer-events: none; animation: nx-fade-in .2s; z-index: 20; }

        .ano-grid { display: grid; grid-template-columns: 1fr 380px; gap: 32px; align-items: start; }
        @media (max-width: 960px) { .ano-grid { grid-template-columns: 1fr; } }

        .gallery-wrap { border-radius: 18px; overflow: hidden; background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .gallery-main { position: relative; aspect-ratio: 16/9; background: #f1f5f9; display: flex; align-items: center; justify-content: center; overflow: hidden; cursor: zoom-in; }
        .gallery-main img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease, opacity .3s; }
        .gallery-main:hover img { transform: scale(1.025); }
        .gallery-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,23,42,.6) 0%, transparent 45%); pointer-events: none; }
        .gallery-placeholder { color: #cbd5e1; opacity: 0.5; }
        .gallery-badge { position: absolute; top: 14px; left: 14px; background: rgba(255,255,255,.9); backdrop-filter: blur(8px); border: 1px solid rgba(0,0,0,.05); border-radius: 8px; padding: 5px 12px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .07em; color: ${accent}; display: flex; align-items: center; gap: 5px; z-index: 5; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        .gallery-counter { position: absolute; top: 14px; right: 14px; background: rgba(15,23,42,.65); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,.1); border-radius: 20px; padding: 5px 12px; font-size: 12px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 5px; z-index: 5; }
        .gallery-zoom-hint { position: absolute; bottom: 16px; right: 14px; background: rgba(15,23,42,.55); backdrop-filter: blur(8px); border-radius: 20px; padding: 6px 11px; font-size: 11px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 5px; z-index: 5; opacity: 0; transition: opacity .2s; }
        .gallery-main:hover .gallery-zoom-hint { opacity: 1; }
        .gallery-bottom { position: absolute; bottom: 16px; left: 16px; right: 110px; z-index: 5; }
        .gallery-title-overlay { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(18px, 3vw, 26px); font-weight: 800; color: #fff; text-shadow: 0 2px 14px rgba(0,0,0,.6); letter-spacing: -.02em; line-height: 1.25; margin-bottom: 6px; }
        .gallery-loc { display: flex; align-items: center; gap: 4px; color: rgba(255,255,255,.9); font-size: 13px; font-weight: 600; text-shadow: 0 1px 4px rgba(0,0,0,0.5); }
        .arrow-btn { position: absolute; top: 50%; transform: translateY(-50%); width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,.9); border: 1px solid rgba(0,0,0,.05); color: #0f172a; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; transition: all .2s; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .arrow-btn:hover { background: #ffffff; transform: translateY(-50%) scale(1.05); }
        .arrow-left { left: 14px; } .arrow-right { right: 14px; }
        .thumbs-row { display: flex; gap: 8px; padding: 12px; overflow-x: auto; scrollbar-width: none; background: #ffffff; border-top: 1px solid #e2e8f0; }
        .thumbs-row::-webkit-scrollbar { display: none; }
        .thumb { width: 76px; height: 50px; border-radius: 8px; overflow: hidden; cursor: pointer; border: 2px solid transparent; opacity: .6; transition: all .2s; flex-shrink: 0; padding: 0; background: #f1f5f9; }
        .thumb:hover { opacity: .9; }
        .thumb.active { border-color: ${accent}; opacity: 1; }
        .thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .title-block { margin-bottom: 22px; }
        .listing-price { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(28px, 4vw, 38px); font-weight: 800; letter-spacing: -.03em; line-height: 1; color: ${accent}; margin-bottom: 5px; }
        .listing-subtitle { font-size: 16px; color: #475569; font-weight: 500; margin-bottom: 12px; line-height: 1.4; }
        .meta-row { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
        .meta-item { display: flex; align-items: center; gap: 5px; font-size: 12px; color: #64748b; font-weight: 600; }
        .meta-ref { display: flex; align-items: center; gap: 5px; font-size: 12px; color: #64748b; font-weight: 600; background: none; border: none; cursor: pointer; padding: 0; font-family: inherit; }
        .meta-ref:hover { color: #0f172a; }
        .estado-badge { padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .06em; background: rgba(16,185,129,.1); color: #10b981; border: 1px solid rgba(16,185,129,.2); }
        .meta-dot { color: #cbd5e1; font-size: 10px; }

        .tabs-wrap { display: flex; gap: 2px; border-bottom: 1px solid #e2e8f0; margin-bottom: 22px; overflow-x: auto; scrollbar-width: none; }
        .tabs-wrap::-webkit-scrollbar { display: none; }
        .tab-btn { padding: 10px 18px; background: none; border: none; border-bottom: 2px solid transparent; color: #64748b; font-size: 14px; font-weight: 700; cursor: pointer; white-space: nowrap; transition: all .2s; letter-spacing: .01em; }
        .tab-btn:hover { color: #0f172a; }
        .tab-btn.active { color: ${accent}; border-bottom-color: ${accent}; }

        .specs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(155px, 1fr)); gap: 12px; }
        .spec-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 16px; transition: border-color .2s, transform .2s, box-shadow .2s; animation: nx-rise .35s ease backwards; }
        .spec-card:hover { border-color: #cbd5e1; transform: translateY(-1px); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
        .spec-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; color: #64748b; margin-bottom: 8px; display: flex; align-items: center; gap: 5px; }
        .spec-value { font-size: 15px; font-weight: 700; color: #0f172a; text-transform: capitalize; }

        .extras-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(185px, 1fr)); gap: 10px; }
        .extra-item { display: flex; align-items: center; gap: 9px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 9px; padding: 11px 14px; font-size: 13px; font-weight: 600; color: #334155; animation: nx-rise .35s ease backwards; }
        .extra-check { color: ${accent}; flex-shrink: 0; }

        .desc-box { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 32px; margin-top: 4px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
        .desc-head { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; color: #64748b; margin-bottom: 16px; display: flex; align-items: center; gap: 7px; }
        .desc-text { font-size: 14px; line-height: 1.8; color: #334155; white-space: pre-wrap; }

        .tab-panel { animation: nx-fade-in .35s ease; }

        .sidebar-sticky { position: sticky; top: 20px; display: flex; flex-direction: column; gap: 16px; }
        .price-panel { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 26px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); }
        .panel-price { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(28px, 3.5vw, 38px); font-weight: 800; letter-spacing: -.03em; line-height: 1; color: ${accent}; margin-bottom: 4px; }
        .panel-price-m2 { font-size: 13px; color: #64748b; font-weight: 600; margin-bottom: 16px; }

        .nx-price-badges { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0 20px; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0; }
        .nx-badge-item { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; background: #f8fafc; border: 1px solid #e2e8f0; color: #475569; }
        .nx-badge-item.garantia { background: rgba(42, 193, 180, 0.05); border-color: rgba(42, 193, 180, 0.2); color: #0d9488; }
        .nx-badge-item.retoma { background: rgba(59, 130, 246, 0.05); border-color: rgba(59, 130, 246, 0.2); color: #2563eb; }

        .btn-contact { width: 100%; box-sizing: border-box; padding: 16px; background: ${accent}; color: #fff; border: none; border-radius: 12px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 800; cursor: pointer; transition: all .2s; display: flex; align-items: center; justify-content: center; gap: 7px; text-transform: uppercase; letter-spacing: .06em; box-shadow: 0 6px 20px ${accentShadow}; margin-bottom: 12px; }
        .btn-contact:hover { filter: brightness(1.05); transform: translateY(-2px); box-shadow: 0 10px 28px ${accentShadow}; }
        
        .btn-whatsapp { width: 100%; box-sizing: border-box; padding: 16px; background: #10b981; color: #fff; border: none; border-radius: 12px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 800; cursor: pointer; transition: all .2s; display: flex; align-items: center; justify-content: center; gap: 7px; text-transform: uppercase; letter-spacing: .06em; box-shadow: 0 6px 20px rgba(16, 185, 129, 0.2); text-decoration: none; margin-bottom: 12px; }
        .btn-whatsapp:hover { filter: brightness(1.05); transform: translateY(-2px); box-shadow: 0 10px 28px rgba(16, 185, 129, 0.3); color: #fff; }

        .contact-revealed { width: 100%; box-sizing: border-box; padding: 18px 16px; background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 12px; display: flex; flex-direction: column; align-items: center; gap: 4px; text-decoration: none; transition: all .2s; margin-bottom: 12px; overflow: hidden; }
        .contact-revealed:hover { background: #f1f5f9; border-color: #94a3b8; }
        .contact-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; color: #64748b; }
        .contact-phone { font-size: clamp(18px, 2vw, 22px); font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 7px; white-space: nowrap; }
        .contact-email { font-size: 13px; color: #475569; font-weight: 600; margin-top: 2px; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

        /* 🌟 NOVO: Banner carVertical */
        .cv-banner { background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 14px; padding: 20px; margin-top: 16px; text-decoration: none; display: block; transition: all .2s; }
        .cv-banner:hover { border-color: #7dd3fc; background: #e0f2fe; transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(2, 132, 199, 0.1); }
        .cv-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
        .cv-title { font-size: 15px; font-weight: 800; color: #0369a1; display: flex; align-items: center; gap: 6px; }
        .cv-discount { background: #0284c7; color: #fff; font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.05em; }
        .cv-desc { font-size: 13px; color: #0c4a6e; line-height: 1.5; margin-bottom: 14px; }
        .cv-code-wrap { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
        .cv-code { display: inline-block; background: #fff; border: 1px dashed #7dd3fc; padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; color: #0284c7; }
        .cv-btn { width: 100%; padding: 12px; background: #0284c7; color: #fff; border: none; border-radius: 10px; font-size: 13px; font-weight: 700; text-align: center; transition: background .2s; }
        .cv-banner:hover .cv-btn { background: #0369a1; }

        .finance-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; margin-top: 16px; }
        .finance-box .fin-head { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; color: #64748b; margin-bottom: 14px; }
        .fin-result-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px dashed #cbd5e1; }
        .fin-prestacao { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 28px; font-weight: 800; color: ${accent}; letter-spacing: -.02em; }
        .fin-mes { font-size: 12px; color: #64748b; font-weight: 600; margin-left: 3px; }
        .fin-taeg { font-size: 11px; color: #64748b; font-weight: 700; }
        .slider-group { margin-bottom: 12px; }
        .slider-label-row { display: flex; justify-content: space-between; font-size: 12px; font-weight: 700; color: #334155; margin-bottom: 6px; }
        .slider-val { color: ${accent}; }
        .fin-slider { width: 100%; height: 4px; border-radius: 2px; accent-color: ${accent}; cursor: pointer; -webkit-appearance: none; background: #e2e8f0; outline: none; }
        .fin-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: ${accent}; cursor: pointer; border: 2px solid #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .fin-note { font-size: 10.5px; color: #94a3b8; margin-top: 12px; line-height: 1.5; }

        .trust-strip { display: flex; gap: 18px; padding: 16px 4px 0; margin-top: 4px; border-top: 1px solid #e2e8f0; justify-content: center; }
        .trust-item { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; color: #64748b; }

        .seller-panel { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; display: flex; align-items: center; gap: 16px; text-decoration: none; transition: all .2s; margin-top: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
        .seller-panel:hover { border-color: #cbd5e1; background: #f8fafc; transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); }
        .seller-avatar { width: 48px; height: 48px; border-radius: 50%; background: #f1f5f9; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 18px; font-weight: 800; color: #0f172a; flex-shrink: 0; overflow: hidden; }
        .seller-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .seller-info { flex: 1; min-width: 0; text-align: left; }
        .seller-name { font-size: 15px; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 5px; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .seller-meta { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
        .seller-rating { display: flex; align-items: center; gap: 2px; font-size: 13px; font-weight: 800; color: #0f172a; background: #fffbeb; padding: 2px 8px 2px 6px; border-radius: 6px; border: 1px solid #fef3c7; }
        .seller-reviews { font-weight: 600; color: #64748b; font-size: 11.5px; margin-left: 2px; }
        .seller-rating-empty { font-size: 11px; font-weight: 700; color: #64748b; background: #f1f5f9; padding: 3px 8px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.05em; }
        .seller-date { font-size: 12px; font-weight: 600; color: #64748b; }

        .owner-box { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 14px; padding: 18px; margin-top: 16px; }
        .owner-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; color: #2563eb; margin-bottom: 12px; }
        .owner-btns { display: flex; gap: 10px; }
        .btn-owner-edit { flex: 1; padding: 11px; text-align: center; background: #ffffff; border: 1px solid #cbd5e1; color: #0f172a; border-radius: 10px; font-size: 13px; font-weight: 700; text-decoration: none; transition: all .2s; }
        .btn-owner-edit:hover { border-color: #94a3b8; background: #f8fafc; }
        .btn-owner-sold { flex: 1; padding: 11px; border: none; background: #10b981; color: #fff; border-radius: 10px; font-size: 13px; font-weight: 800; cursor: pointer; transition: opacity .2s; }
        .btn-owner-sold:hover { opacity: .85; }

        .nx-modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 20px; animation: nx-fade-in .2s; }
        .nx-modal-box { width: 100%; max-width: 440px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 36px 28px; text-align: center; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); }
        .nx-modal-icon { margin-bottom: 16px; display: flex; justify-content: center; }
        .nx-modal-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 10px; letter-spacing: -.02em; }
        .nx-modal-text { font-size: 14px; color: #64748b; line-height: 1.7; margin-bottom: 28px; }
        .nx-modal-footer { display: flex; gap: 12px; }
        .nx-btn-cancel { flex: 1; padding: 13px; background: #ffffff; border: 1px solid #cbd5e1; color: #475569; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all .2s; }
        .nx-btn-cancel:hover { border-color: #94a3b8; color: #0f172a; background: #f8fafc; }
        .nx-btn-danger { flex: 1; padding: 13px; background: #ef4444; border: none; color: #fff; border-radius: 10px; font-size: 14px; font-weight: 800; cursor: pointer; transition: opacity .2s; }
        .nx-btn-danger:hover { opacity: .85; }
        .nx-btn-danger:disabled { opacity: .5; cursor: not-allowed; }

        .sugeridos-section { margin-top: 64px; padding-top: 40px; border-top: 1px solid #e2e8f0; }
        .sugeridos-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 24px; letter-spacing: -0.02em; }
        .sugeridos-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }

        .lightbox-overlay { position: fixed; inset: 0; background: rgba(15,23,42,.98); z-index: 10000; display: flex; flex-direction: column; align-items: center; justify-content: center; animation: nx-fade-in .2s; }
        .lightbox-close { position: absolute; top: 18px; right: 18px; width: 42px; height: 42px; border-radius: 50%; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 5; }
        .lightbox-close:hover { background: rgba(255,255,255,.2); }
        .lightbox-counter { position: absolute; top: 24px; left: 24px; color: rgba(255,255,255,.8); font-size: 13px; font-weight: 700; z-index: 5; }
        .lightbox-img-wrap { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; padding: 70px 90px; }
        .lightbox-img-wrap img { max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 6px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
        @media (max-width: 700px) { .lightbox-img-wrap { padding: 70px 16px; } .arrow-btn { width: 34px; height: 34px; } }

        .mobile-cta-bar { display: none; }
        @media (max-width: 720px) {
          .mobile-cta-bar { display: flex; position: fixed; left: 0; right: 0; bottom: 0; z-index: 500; background: rgba(255,255,255,0.9); border-top: 1px solid #e2e8f0; padding: 12px 16px; align-items: center; gap: 16px; backdrop-filter: blur(16px); box-shadow: 0 -4px 6px -1px rgba(0,0,0,0.05); }
          .mobile-cta-price { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 18px; color: ${accent}; line-height: 1.1; white-space: nowrap; }
          .mobile-cta-btn { flex: 1; padding: 14px; border-radius: 12px; border: none; background: ${accent}; color: #fff; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: .04em; cursor: pointer; box-shadow: 0 4px 12px ${accentShadow}; }
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
            {fotos[fotoActiva] ? <img src={fotos[fotoActiva]} alt={`${anuncio.titulo} — foto ${fotoActiva + 1}`} /> : <div className="gallery-placeholder"><Icon path={isCarro ? mdiCar : mdiHomeCityOutline} size={3} /></div>}
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
            <div className="nx-modal-icon"><Icon path={mdiCheckCircleOutline} size={2.5} color="#10b981" /></div>
            <h3 className="nx-modal-title">Venda Concluída</h3>
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
                  {fotos[fotoActiva] ? <img src={fotos[fotoActiva]} alt={anuncio.titulo} loading="eager" /> : <div className="gallery-placeholder"><Icon path={isCarro ? mdiCar : mdiHomeCityOutline} size={3} /></div>}
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
                        {f ? <img src={f} alt="" loading="lazy" /> : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#cbd5e1' }}><Icon path={mdiCamera} size={1} /></div>}
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
                      <span className="extra-check"><Icon path={mdiCheckCircleOutline} size={0.75} /></span>{extra}
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
                      <div className="nx-badge-item garantia"><Icon path={mdiShieldCheckOutline} size={0.7} /> {garantia || 'Garantia Incluída'}</div>
                    )}
                    {aceitaRetoma && (
                      <div className="nx-badge-item retoma"><Icon path={mdiSwapHorizontal} size={0.7} /> Aceita Retoma</div>
                    )}
                    <div className="nx-badge-item"><Icon path={mdiLightningBolt} size={0.7} color="#f59e0b" /> Financiamento</div>
                  </div>

                  {isDono ? (
                    <div className="owner-box">
                      <div className="owner-label">Gestão do Anúncio</div>
                      <div className="owner-btns">
                        <Link to={`/editar/${id}`} className="btn-owner-edit">Editar Dados</Link>
                        <button type="button" className="btn-owner-sold" onClick={() => setMostrarModalVendido(true)}>
                          <Icon path={mdiCheck} size={0.7} style={{marginRight: 4}} /> Vendido
                        </button>
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

                  {/* 🌟 NOVO: Banner carVertical */}
                  {isCarro && !isDono && (
                    <a href={carVerticalLink} target="_blank" rel="noopener noreferrer" className="cv-banner">
                      <div className="cv-head">
                        <span className="cv-title"><Icon path={mdiCarInfo} size={0.8} /> carVertical</span>
                        <span className="cv-discount">-20%</span>
                      </div>
                      <p className="cv-desc">Verifica o histórico de acidentes, roubos e anomalias de quilometragem deste veículo.</p>
                      <div className="cv-code-wrap">
                        <span style={{ fontSize: '11px', color: '#0c4a6e', fontWeight: 600 }}>CÓDIGO:</span>
                        <span className="cv-code">NOXVELIA</span>
                      </div>
                      <div className="cv-btn">Verificar Histórico</div>
                    </a>
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
                      {vendedorVerificado && <Icon path={mdiCheckDecagram} size={0.8} color="#3b82f6" />}
                    </div>

                    <div className="seller-meta">
                      {rating > 0 ? (
                        <div className="seller-rating">
                          <span className="seller-rating-icon">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Icon key={i} path={mdiStar} size={0.5} color={i < Math.round(rating) ? '#f59e0b' : '#fde68a'} />
                            ))}
                          </span>
                          {rating.toFixed(1)}
                          <span className="seller-reviews">({totalAvaliacoes})</span>
                        </div>
                      ) : (
                        <div className="seller-rating-empty">Novo Vendedor</div>
                      )}
                      <span className="meta-dot">·</span>
                      <div className="seller-date">Desde {anoRegistoUser}</div>
                    </div>
                  </div>
                  <Icon path={mdiChevronRight} size={1} color="#94a3b8" />
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