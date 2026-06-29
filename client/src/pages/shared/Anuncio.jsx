import React, { useEffect, useState } from 'react';
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
  mdiCamera, mdiStar, mdiClose,
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

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setFotoActiva(0);
    setAbaAtiva('especificacoes');
    setMostrarTelefone(false);
    setLightboxAberto(false);

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
          .catch(() => console.error("Não foi possível carregar sugestões."));

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

  const handlePartilhar = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: anuncio?.titulo, url }); } catch {}
    } else {
      navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 3000);
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
    <div style={{ minHeight: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--nx-bg)' }}>
      <div className="nx-spinner" />
    </div>
  );

  if (erro) return (
    <div style={{ minHeight: 'calc(100vh - 72px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--nx-bg)', color: 'var(--nx-text)' }}>
      <h2 style={{ fontSize: '22px', color: 'var(--nx-danger)', marginBottom: '8px' }}>Algo correu mal</h2>
      <p style={{ color: 'var(--nx-text-sub)', marginBottom: '24px' }}>{erro}</p>
      <button onClick={() => navigate(-1)} className="nx-btn-primary">Voltar Atrás</button>
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

  const emailContacto = anuncio.email || donoDoAnuncio?.email || 'Não fornecido';
  const telefoneContacto = anuncio.telefone || donoDoAnuncio?.telefone || 'Não fornecido';
  const inicial = donoDoAnuncio?.nome?.charAt(0).toUpperCase() || 'U';
  const localizacaoString = `${anuncio.localizacao?.cidade || 'N/A'}${anuncio.localizacao?.distrito ? `, ${anuncio.localizacao.distrito}` : ''}`;
  const temVaranda = anuncio.equipamento?.some(e => e.toLowerCase().includes('varanda') || e.toLowerCase().includes('terraço'));

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
    { label: 'Varanda/Terraço', value: temVaranda ? 'Sim' : 'Não', icon: mdiBalcony },
  ];

  const extrasOpcionais = anuncio.equipamento?.length > 0 ? anuncio.equipamento : [];

  const valorFinanciado = Math.max(0, precoValor - entrada);
  const taxaMensal = 0.079 / 12;
  const prestacaoMensal = valorFinanciado > 0
    ? Math.round((valorFinanciado * taxaMensal) / (1 - Math.pow(1 + taxaMensal, -meses)))
    : 0;

  const accent = isCarro ? 'var(--nx-accent-car)' : 'var(--nx-accent-home)';
  const accentShadow = isCarro ? 'rgba(42,193,180,.3)' : 'rgba(124,110,247,.3)';

  const irParaFoto = (i) => setFotoActiva(((i % fotos.length) + fotos.length) % fotos.length);

  return (
    <>
      <Helmet>
        <title>Noxvelia</title>
        <meta name="description" content={anuncio.descricao?.substring(0, 150)} />
        <meta property="og:title" content={`NOXVELIA | ${anuncio.titulo}`} />
        <meta property="og:description" content={anuncio.descricao?.substring(0, 100)} />
        <meta property="og:image" content={fotos[0] || ''} />
        <meta property="og:url" content={window.location.href} />
      </Helmet>

      <style>{`
        .ld-page { background: var(--nx-bg); color: var(--nx-text); min-height: calc(100vh - 72px); padding: 28px 20px 72px; }
        .ld-container { max-width: 1240px; margin: 0 auto; }
        .ld-page button:focus-visible, .ld-page a:focus-visible { outline: 2px solid ${accent}; outline-offset: 2px; border-radius: 6px; }
        @media (prefers-reduced-motion: reduce) { .ld-page * { transition: none !important; animation: none !important; } }

        .ld-breadcrumb { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
        .ld-back { display: inline-flex; align-items: center; gap: 6px; color: var(--nx-text-sub); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; text-decoration: none; transition: color .2s; }
        .ld-back:hover { color: var(--nx-text); }
        .ld-actions { display: flex; gap: 10px; }
        .btn-icon { width: 38px; height: 38px; border-radius: 10px; background: var(--nx-bg-2); border: 1px solid var(--nx-border); color: var(--nx-text-sub); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all .2s; position: relative; }
        .btn-icon:hover { background: var(--nx-bg-3); border-color: var(--nx-border-2); color: var(--nx-text); transform: translateY(-1px); }
        .btn-icon.saved { color: var(--nx-danger); background: rgba(239,68,68,.1); border-color: rgba(239,68,68,.2); }
        .toast-copy { position: absolute; top: 110%; right: 0; background: var(--nx-text); color: var(--nx-bg); font-size: 11px; font-weight: 700; padding: 5px 10px; border-radius: 6px; white-space: nowrap; pointer-events: none; animation: nx-fade-in .2s; }

        /* HERO: foto compacta + informação ao lado */
        .ld-hero { display: grid; grid-template-columns: 420px 1fr; gap: 36px; align-items: start; margin-bottom: 36px; }
        @media (max-width: 860px) { .ld-hero { grid-template-columns: 1fr; gap: 22px; } }

        .ld-hero-media { display: flex; flex-direction: column; gap: 10px; }
        .ld-hero-photo { position: relative; aspect-ratio: 4/3; border-radius: 16px; overflow: hidden; background: #000; cursor: zoom-in; border: 1px solid var(--nx-border); }
        .ld-hero-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .ld-hero-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 56px; opacity: .25; }
        .ld-type-badge { position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,.6); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,.12); border-radius: 8px; padding: 4px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .07em; color: ${accent}; display: flex; align-items: center; gap: 5px; z-index: 4; }
        .ld-count-badge { position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,.6); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,.1); border-radius: 20px; padding: 4px 10px; font-size: 11px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 5px; z-index: 4; }
        .ld-main-arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 32px; height: 32px; border-radius: 50%; background: rgba(0,0,0,.4); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,.18); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 5; transition: all .2s; }
        .ld-main-arrow:hover { background: rgba(0,0,0,.65); }
        .ld-arrow-left { left: 10px; } .ld-arrow-right { right: 10px; }

        .ld-thumbstrip { display: flex; gap: 7px; overflow-x: auto; scrollbar-width: none; }
        .ld-thumbstrip::-webkit-scrollbar { display: none; }
        .ld-thumb { width: 58px; height: 44px; flex-shrink: 0; border-radius: 8px; overflow: hidden; cursor: pointer; border: 2px solid transparent; opacity: .45; transition: all .2s; }
        .ld-thumb:hover { opacity: .75; }
        .ld-thumb.active { opacity: 1; border-color: ${accent}; }
        .ld-thumb img { width: 100%; height: 100%; object-fit: cover; }

        .ld-hero-info { display: flex; flex-direction: column; padding-top: 4px; }
        .ld-hero-title { font-family: var(--nx-font-display); font-size: clamp(22px, 2.6vw, 28px); font-weight: 800; letter-spacing: -.02em; line-height: 1.25; color: var(--nx-text); margin-bottom: 10px; }
        .ld-hero-price { font-family: var(--nx-font-display); font-size: clamp(26px, 3vw, 32px); font-weight: 800; letter-spacing: -.03em; color: ${accent}; line-height: 1; margin-bottom: 4px; }
        .ld-hero-price-m2 { font-size: 13px; color: var(--nx-text-sub); font-weight: 600; margin-bottom: 14px; }
        .ld-loc-row { display: flex; align-items: center; gap: 5px; color: var(--nx-text-sub); font-size: 14px; font-weight: 600; margin-bottom: 12px; }
        .ld-meta-row { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; margin-bottom: 22px; }
        .estado-badge { padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .06em; background: rgba(16,185,129,.1); color: #10b981; border: 1px solid rgba(16,185,129,.2); }
        .meta-item { display: flex; align-items: center; gap: 5px; font-size: 12px; color: var(--nx-text-sub); font-weight: 600; }
        .meta-dot { color: var(--nx-text-sub); font-size: 10px; }

        .ld-hero-destaques { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 22px; }
        .ld-hero-destaque { display: flex; align-items: center; gap: 10px; background: var(--nx-bg-2); border: 1px solid var(--nx-border); border-radius: 12px; padding: 11px 14px; }
        .ld-hd-icon { color: ${accent}; flex-shrink: 0; }
        .ld-hd-value { font-size: 14px; font-weight: 800; color: var(--nx-text); text-transform: capitalize; line-height: 1.2; }
        .ld-hd-label { font-size: 10px; font-weight: 700; color: var(--nx-text-sub); text-transform: uppercase; letter-spacing: .05em; }

        .ld-hero-action { margin-top: auto; }
        .ld-cta { width: 100%; padding: 15px; background: ${accent}; color: #fff; border: none; border-radius: 12px; font-family: var(--nx-font-body); font-size: 14px; font-weight: 800; cursor: pointer; transition: all .2s; display: flex; align-items: center; justify-content: center; gap: 7px; text-transform: uppercase; letter-spacing: .06em; box-shadow: 0 6px 20px ${accentShadow}; }
        .ld-cta:hover { filter: brightness(1.1); transform: translateY(-2px); box-shadow: 0 10px 28px ${accentShadow}; }
        .ld-contact-revealed { width: 100%; padding: 14px 18px; background: var(--nx-bg-2); border: 2px dashed var(--nx-border-2); border-radius: 12px; display: flex; align-items: center; justify-content: space-between; gap: 14px; text-decoration: none; transition: background .2s; cursor: pointer; }
        .ld-contact-revealed:hover { background: var(--nx-bg-3); }
        .ld-contact-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; color: var(--nx-text-sub); display: block; margin-bottom: 2px; }
        .ld-contact-phone { font-size: 18px; font-weight: 800; color: var(--nx-text); display: flex; align-items: center; gap: 7px; }
        .ld-contact-email { font-size: 12px; color: var(--nx-text-sub); font-weight: 600; }

        .ld-owner-box { background: rgba(59,130,246,.05); border: 1px solid rgba(59,130,246,.2); border-radius: 14px; padding: 16px; }
        .ld-owner-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; color: #60a5fa; margin-bottom: 12px; }
        .ld-owner-btns { display: flex; gap: 10px; }
        .ld-btn-owner-edit { flex: 1; padding: 11px; text-align: center; background: var(--nx-bg); border: 1px solid var(--nx-border-2); color: var(--nx-text); border-radius: 10px; font-size: 13px; font-weight: 700; text-decoration: none; transition: all .2s; }
        .ld-btn-owner-edit:hover { border-color: var(--nx-text); }
        .ld-btn-owner-sold { flex: 1; padding: 11px; border: none; background: #10b981; color: #fff; border-radius: 10px; font-size: 13px; font-weight: 800; cursor: pointer; transition: opacity .2s; }
        .ld-btn-owner-sold:hover { opacity: .85; }

        /* CONTEÚDO PRINCIPAL: ficha técnica + sidebar fina */
        .ld-main-grid { display: grid; grid-template-columns: 1fr 300px; gap: 32px; align-items: start; }
        @media (max-width: 860px) { .ld-main-grid { grid-template-columns: 1fr; } }

        .ld-tabs { display: flex; gap: 4px; padding-left: 6px; }
        .ld-tab { padding: 11px 20px 13px; border: 1px solid var(--nx-border); border-bottom: none; border-radius: 12px 12px 0 0; background: var(--nx-bg-2); color: var(--nx-text-sub); font-size: 13px; font-weight: 700; cursor: pointer; transform: translateY(2px); transition: all .2s; white-space: nowrap; }
        .ld-tab:hover { color: var(--nx-text-2); }
        .ld-tab.active { background: var(--nx-card-bg); color: var(--nx-text); border-color: var(--nx-border-2); transform: translateY(0); box-shadow: 0 -2px 0 ${accent} inset; }
        .ld-panel { background: var(--nx-card-bg); border: 1px solid var(--nx-border-2); border-radius: 0 14px 14px 14px; padding: 26px 28px; margin-top: -1px; position: relative; animation: nx-fade-in .25s; }

        .ld-specsheet { display: flex; flex-direction: column; }
        .ld-spec-row { display: flex; align-items: baseline; gap: 10px; padding: 12px 0; border-bottom: 1px solid var(--nx-border); }
        .ld-spec-row:last-child { border-bottom: none; }
        .ld-spec-label { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--nx-text-sub); font-weight: 600; white-space: nowrap; }
        .ld-spec-label .ld-spec-icon { color: ${accent}; }
        .ld-spec-fill { flex: 1; border-bottom: 1px dotted var(--nx-border-2); margin: 0 2px 4px; }
        .ld-spec-value { font-size: 14px; font-weight: 800; color: var(--nx-text); text-transform: capitalize; font-variant-numeric: tabular-nums; white-space: nowrap; }

        .ld-extras-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 10px; }
        .ld-extra-item { display: flex; align-items: center; gap: 9px; background: var(--nx-bg-2); border: 1px solid var(--nx-border); border-radius: 9px; padding: 11px 14px; font-size: 13px; font-weight: 600; color: var(--nx-text-2); }
        .ld-extra-check { color: ${accent}; flex-shrink: 0; }

        .ld-desc-head { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; color: var(--nx-text-sub); margin-bottom: 14px; display: flex; align-items: center; gap: 7px; }
        .ld-desc-text { font-size: 14px; line-height: 1.8; color: var(--nx-text-2); white-space: pre-wrap; }

        .ld-sidebar { position: sticky; top: 20px; display: flex; flex-direction: column; gap: 14px; }
        .ld-finance-card { background: var(--nx-card-bg); border: 1px solid var(--nx-card-border); border-radius: 16px; padding: 22px; box-shadow: var(--nx-shadow-card); }
        .ld-fin-head { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; color: var(--nx-text-sub); margin-bottom: 14px; }
        .ld-fin-result-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 18px; padding-bottom: 16px; border-bottom: 1px dashed var(--nx-border-2); }
        .ld-fin-prestacao { font-family: var(--nx-font-display); font-size: 24px; font-weight: 800; color: ${accent}; letter-spacing: -.02em; }
        .ld-fin-mes { font-size: 12px; color: var(--nx-text-sub); font-weight: 600; margin-left: 3px; }
        .ld-fin-taeg { font-size: 11px; color: var(--nx-text-sub); font-weight: 700; }
        .ld-slider-group { margin-bottom: 14px; }
        .ld-slider-group:last-child { margin-bottom: 0; }
        .ld-slider-label-row { display: flex; justify-content: space-between; font-size: 12px; font-weight: 700; color: var(--nx-text-2); margin-bottom: 6px; }
        .ld-slider-val { color: ${accent}; }
        .ld-slider { width: 100%; height: 4px; border-radius: 2px; accent-color: ${accent}; cursor: pointer; -webkit-appearance: none; background: var(--nx-border); outline: none; }
        .ld-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: ${accent}; cursor: pointer; }

        .ld-seller-panel { background: var(--nx-card-bg); border: 1px solid var(--nx-card-border); border-radius: 16px; padding: 17px 20px; display: flex; align-items: center; gap: 14px; text-decoration: none; transition: all .2s; }
        .ld-seller-panel:hover { border-color: var(--nx-border-2); background: var(--nx-bg-2); }
        .ld-seller-avatar { width: 46px; height: 46px; border-radius: 50%; background: var(--nx-bg-3); display: flex; align-items: center; justify-content: center; font-family: var(--nx-font-display); font-size: 16px; font-weight: 800; color: var(--nx-text); flex-shrink: 0; overflow: hidden; border: 2px solid ${accent}; }
        .ld-seller-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .ld-seller-info { flex: 1; min-width: 0; }
        .ld-seller-name { font-size: 14px; font-weight: 800; color: var(--nx-text); display: flex; align-items: center; gap: 5px; margin-bottom: 3px; }
        .ld-seller-sub { font-size: 11px; color: var(--nx-text-sub); font-weight: 600; }

        .ld-lightbox { position: fixed; inset: 0; background: rgba(0,0,0,.92); backdrop-filter: blur(6px); z-index: 9998; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; animation: nx-fade-in .2s; }
        .ld-lightbox-close { position: absolute; top: 18px; right: 22px; width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 2; }
        .ld-lightbox-counter { position: absolute; top: 26px; left: 26px; color: rgba(255,255,255,.8); font-size: 13px; font-weight: 700; }
        .ld-lightbox-img-wrap { flex: 1; display: flex; align-items: center; justify-content: center; width: 100%; max-width: 1100px; position: relative; }
        .ld-lightbox-img-wrap img { max-width: 100%; max-height: 78vh; object-fit: contain; border-radius: 8px; }
        .ld-lightbox-strip { display: flex; gap: 8px; margin-top: 18px; overflow-x: auto; max-width: 100%; scrollbar-width: none; }
        .ld-lightbox-strip::-webkit-scrollbar { display: none; }
        .ld-lightbox-thumb { width: 64px; height: 44px; border-radius: 6px; overflow: hidden; cursor: pointer; opacity: .45; border: 2px solid transparent; flex-shrink: 0; transition: all .2s; }
        .ld-lightbox-thumb.active { opacity: 1; border-color: ${accent}; }
        .ld-lightbox-thumb img { width: 100%; height: 100%; object-fit: cover; }

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
      `}</style>

      {mostrarModalVendido && (
        <div className="nx-modal-overlay" onClick={() => setMostrarModalVendido(false)}>
          <div className="nx-modal-box" onClick={e => e.stopPropagation()}>
            <div className="nx-modal-icon">🎉</div>
            <h3 className="nx-modal-title">Parabéns pela Venda!</h3>
            <p className="nx-modal-text">
              Pretendes eliminar este anúncio de forma permanente dado que o ativo já foi vendido?
            </p>
            <div className="nx-modal-footer">
              <button type="button" className="nx-btn-cancel" disabled={eliminandoVendido} onClick={() => setMostrarModalVendido(false)}>Cancelar</button>
              <button type="button" className="nx-btn-danger" disabled={eliminandoVendido} onClick={handleConfirmarVendido}>
                {eliminandoVendido ? 'A eliminar...' : 'Sim, Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {lightboxAberto && (
        <div className="ld-lightbox" onClick={() => setLightboxAberto(false)}>
          <div className="ld-lightbox-counter">{fotoActiva + 1} / {fotos.length}</div>
          <button type="button" className="ld-lightbox-close" onClick={() => setLightboxAberto(false)} aria-label="Fechar">
            <Icon path={mdiClose} size={1} />
          </button>
          <div className="ld-lightbox-img-wrap" onClick={e => e.stopPropagation()}>
            {fotos.length > 1 && (
              <button type="button" className="ld-main-arrow ld-arrow-left" onClick={() => irParaFoto(fotoActiva - 1)} aria-label="Foto anterior">
                <Icon path={mdiChevronLeft} size={1.1} />
              </button>
            )}
            {fotos[fotoActiva]
              ? <img src={fotos[fotoActiva]} alt={anuncio.titulo} />
              : <div style={{ fontSize: '80px', opacity: .3 }}>{isCarro ? '🚗' : '🏠'}</div>
            }
            {fotos.length > 1 && (
              <button type="button" className="ld-main-arrow ld-arrow-right" onClick={() => irParaFoto(fotoActiva + 1)} aria-label="Foto seguinte">
                <Icon path={mdiChevronRight} size={1.1} />
              </button>
            )}
          </div>
          {fotos.length > 1 && (
            <div className="ld-lightbox-strip" onClick={e => e.stopPropagation()}>
              {fotos.map((f, i) => (
                <div key={i} className={`ld-lightbox-thumb ${fotoActiva === i ? 'active' : ''}`} onClick={() => irParaFoto(i)}>
                  {f && <img src={f} alt="" />}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="ld-page">
        <div className="ld-container">

          <div className="ld-breadcrumb">
            <Link to={isCarro ? '/carros' : '/imoveis'} className="ld-back">
              <Icon path={mdiChevronLeft} size={0.75} /> Voltar à Pesquisa
            </Link>
            <div className="ld-actions">
              <button type="button" className="btn-icon" onClick={handlePartilhar} title="Partilhar">
                <Icon path={mdiShareVariantOutline} size={0.85} />
                {copiado && <div className="toast-copy">✓ Copiado!</div>}
              </button>
              {!isDono && (
                <button type="button" className={`btn-icon ${guardado ? 'saved' : ''}`} onClick={toggleGuardado} title="Guardar">
                  <Icon path={guardado ? mdiHeart : mdiHeartOutline} size={0.85} />
                </button>
              )}
            </div>
          </div>

          {/* HERO: foto + informação ao lado */}
          <div className="ld-hero">
            <div className="ld-hero-media">
              <div className="ld-hero-photo" onClick={() => setLightboxAberto(true)}>
                {fotos[fotoActiva]
                  ? <img src={fotos[fotoActiva]} alt={anuncio.titulo} />
                  : <div className="ld-hero-placeholder">{isCarro ? '🚗' : '🏠'}</div>
                }
                <div className="ld-type-badge">
                  <Icon path={isCarro ? mdiCar : mdiHomeCityOutline} size={0.65} />
                  {isCarro ? 'Automóvel' : 'Imóvel'}
                </div>
                {fotos.length > 1 && (
                  <div className="ld-count-badge">
                    <Icon path={mdiCamera} size={0.6} />
                    {fotoActiva + 1} / {fotos.length}
                  </div>
                )}
                {fotos.length > 1 && (
                  <>
                    <button type="button" className="ld-main-arrow ld-arrow-left" onClick={(e) => { e.stopPropagation(); irParaFoto(fotoActiva - 1); }} aria-label="Foto anterior">
                      <Icon path={mdiChevronLeft} size={0.95} />
                    </button>
                    <button type="button" className="ld-main-arrow ld-arrow-right" onClick={(e) => { e.stopPropagation(); irParaFoto(fotoActiva + 1); }} aria-label="Foto seguinte">
                      <Icon path={mdiChevronRight} size={0.95} />
                    </button>
                  </>
                )}
              </div>

              {fotos.length > 1 && (
                <div className="ld-thumbstrip">
                  {fotos.map((f, i) => (
                    <div key={i} className={`ld-thumb ${fotoActiva === i ? 'active' : ''}`} onClick={() => setFotoActiva(i)}>
                      {f ? <img src={f} alt="" /> : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '14px' }}>📷</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="ld-hero-info">
              <h1 className="ld-hero-title">{anuncio.titulo}</h1>
              <div className="ld-hero-price">{preco}</div>
              {precoPorM2 && <div className="ld-hero-price-m2">{precoPorM2}/m²</div>}
              <div className="ld-loc-row">
                <Icon path={mdiMapMarkerOutline} size={0.65} />
                {localizacaoString}
              </div>
              <div className="ld-meta-row">
                <span className="estado-badge">● {anuncio.estado || 'Disponível'}</span>
                <span className="meta-item"><Icon path={mdiEyeOutline} size={0.65} /> {anuncio.visitas || 0} visualizações</span>
                <span className="meta-dot">·</span>
                <span className="meta-item">Ref: #{anuncio._id?.slice(-6).toUpperCase()}</span>
              </div>

              {destaques.length > 0 && (
                <div className="ld-hero-destaques">
                  {destaques.map((d, i) => (
                    <div key={i} className="ld-hero-destaque">
                      <span className="ld-hd-icon"><Icon path={d.icon} size={0.85} /></span>
                      <div>
                        <div className="ld-hd-value">{d.value}</div>
                        <div className="ld-hd-label">{d.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="ld-hero-action">
                {isDono ? (
                  <div className="ld-owner-box">
                    <div className="ld-owner-label">Gestão do Anúncio</div>
                    <div className="ld-owner-btns">
                      <Link to={`/editar/${id}`} className="ld-btn-owner-edit">Editar Dados</Link>
                      <button type="button" className="ld-btn-owner-sold" onClick={() => setMostrarModalVendido(true)}>✓ Vendido</button>
                    </div>
                  </div>
                ) : mostrarTelefone ? (
                  <a href={`tel:${telefoneContacto}`} className="ld-contact-revealed">
                    <div>
                      <span className="ld-contact-label">Contactar via</span>
                      <div className="ld-contact-phone">
                        <Icon path={mdiPhone} size={0.85} color={accent} />
                        {telefoneContacto}
                      </div>
                    </div>
                    <div className="ld-contact-email">✉ {emailContacto}</div>
                  </a>
                ) : (
                  <button type="button" className="ld-cta" onClick={() => setMostrarTelefone(true)}>
                    <Icon path={mdiPhone} size={0.85} /> Revelar Contactos
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* CONTEÚDO PRINCIPAL */}
          <div className="ld-main-grid">
            <div>
              <div className="ld-tabs">
                <button type="button" className={`ld-tab ${abaAtiva === 'especificacoes' ? 'active' : ''}`} onClick={() => setAbaAtiva('especificacoes')}>
                  Ficha Técnica
                </button>
                {extrasOpcionais.length > 0 && (
                  <button type="button" className={`ld-tab ${abaAtiva === 'equipamento' ? 'active' : ''}`} onClick={() => setAbaAtiva('equipamento')}>
                    {isCarro ? 'Equipamento' : 'Detalhes'}
                  </button>
                )}
                <button type="button" className={`ld-tab ${abaAtiva === 'descricao' ? 'active' : ''}`} onClick={() => setAbaAtiva('descricao')}>
                  Descrição
                </button>
              </div>

              <div className="ld-panel">
                {abaAtiva === 'especificacoes' && (
                  <div className="ld-specsheet">
                    {specs.filter(s => s.value != null && s.value !== '').map((s, i) => (
                      <div key={i} className="ld-spec-row">
                        <span className="ld-spec-label">
                          <span className="ld-spec-icon"><Icon path={s.icon} size={0.7} /></span>
                          {s.label}
                        </span>
                        <span className="ld-spec-fill" />
                        <span className="ld-spec-value">{s.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {abaAtiva === 'equipamento' && extrasOpcionais.length > 0 && (
                  <div className="ld-extras-grid">
                    {extrasOpcionais.map((extra, i) => (
                      <div key={i} className="ld-extra-item">
                        <span className="ld-extra-check"><Icon path={mdiStar} size={0.75} /></span>
                        {extra}
                      </div>
                    ))}
                  </div>
                )}

                {abaAtiva === 'descricao' && (
                  <div>
                    <div className="ld-desc-head">
                      <Icon path={mdiFileDocumentOutline} size={0.8} />
                      Descrição do Anunciante
                    </div>
                    <div className="ld-desc-text">{anuncio.descricao || 'Nenhuma descrição detalhada providenciada.'}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="ld-sidebar">
              {isCarro && !isDono && (
                <div className="ld-finance-card">
                  <div className="ld-fin-head">Simulação de Crédito</div>
                  <div className="ld-fin-result-row">
                    <div>
                      <span className="ld-fin-prestacao">{prestacaoMensal.toLocaleString('pt-PT')}€</span>
                      <span className="ld-fin-mes">/mês</span>
                    </div>
                    <div className="ld-fin-taeg">TAEG 7.9%</div>
                  </div>
                  <div className="ld-slider-group">
                    <div className="ld-slider-label-row">
                      <span>Entrada inicial</span>
                      <span className="ld-slider-val">{Number(entrada).toLocaleString('pt-PT')}€</span>
                    </div>
                    <input
                      type="range" className="ld-slider"
                      min="0" max={Math.round(precoValor * 0.7)} step="250"
                      value={entrada} onChange={e => setEntrada(Number(e.target.value))}
                    />
                  </div>
                  <div className="ld-slider-group">
                    <div className="ld-slider-label-row">
                      <span>Prazo</span>
                      <span className="ld-slider-val">{meses} meses</span>
                    </div>
                    <input
                      type="range" className="ld-slider"
                      min="24" max="120" step="12"
                      value={meses} onChange={e => setMeses(Number(e.target.value))}
                    />
                  </div>
                </div>
              )}

              <Link to={`/vendedor/${donoDoAnuncio?._id}`} className="ld-seller-panel">
                <div className="ld-seller-avatar">
                  {donoDoAnuncio?.avatarUrl ? <img src={donoDoAnuncio.avatarUrl} alt="" /> : inicial}
                </div>
                <div className="ld-seller-info">
                  <div className="ld-seller-name">
                    {donoDoAnuncio?.tipo === 'admin'
                      ? (donoDoAnuncio.nome?.toUpperCase().includes('NOXVELIA') ? donoDoAnuncio.nome : `NOXVELIA ${donoDoAnuncio?.nome}`)
                      : (donoDoAnuncio?.nome || 'Utilizador Particular')
                    }
                    {donoDoAnuncio?.tipo === 'admin' && <Icon path={mdiCheckDecagram} size={0.75} color="var(--nx-accent-blue)" />}
                  </div>
                  <div className="ld-seller-sub">
                    {donoDoAnuncio?.tipo === 'admin' ? 'Conta Oficial NOXVELIA' : 'Ver anúncios deste utilizador ›'}
                  </div>
                </div>
                <Icon path={mdiChevronRight} size={0.8} color="var(--nx-text-sub)" />
              </Link>
            </div>
          </div>

          {sugeridos.length > 0 && (
            <div className="sugeridos-section">
              <h3 className="sugeridos-title">Poderá gostar destes anúncios</h3>
              <div className="sugeridos-grid">
                {sugeridos.map(sug => (
                  <AnuncioCard key={sug._id} anuncio={sug} />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}