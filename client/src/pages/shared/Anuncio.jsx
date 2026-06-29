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
  mdiGarageVariant, mdiBalcony, mdiCurrencyEur, mdiHammerWrench, mdiCar, mdiFileDocumentOutline,
  mdiCamera, mdiStar,
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

  const [mostrarTelefone, setMostrarTelefone] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const [mostrarModalVendido, setMostrarModalVendido] = useState(false);
  const [eliminandoVendido, setEliminandoVendido] = useState(false);
  const [meses, setMeses] = useState(84);
  const [entrada, setEntrada] = useState(0);

  const [sugeridos, setSugeridos] = useState([]);

  useEffect(() => {
    // 1. Salto instantâneo para o topo (simula página nova)
    window.scrollTo(0, 0);

    // 2. Forçar loading imediato
    setLoading(true);

    setFotoActiva(0);
    setAbaAtiva('especificacoes');
    setMostrarTelefone(false);

    const carregar = async () => {
      try {
        const { data } = await api.get(`/anuncios/${id}`);
        setAnuncio(data);
        if (data?.preco) setEntrada(0);

        // O DISPARADOR INVISÍVEL DAS ESTATÍSTICAS
        api.post(`/anuncios/${id}/visita`).catch(() => {});

        // BUSCAR ANÚNCIOS SEMELHANTES
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

  // 🌟 DADOS DO VENDEDOR E CONFIANÇA
  const garantia = anuncio.garantia;
  const aceitaRetoma = anuncio.aceitaRetoma;
  const rating = donoDoAnuncio?.rating || 0;
  const totalAvaliacoes = donoDoAnuncio?.totalAvaliacoes || 0;
  const anoRegistoUser = donoDoAnuncio?.createdAt ? new Date(donoDoAnuncio.createdAt).getFullYear() : '2026';

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
        .ano-page { background: var(--nx-bg); color: var(--nx-text); min-height: calc(100vh - 72px); padding: 28px 20px 72px; }
        .ano-container { max-width: 1240px; margin: 0 auto; }
        .ano-breadcrumb { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
        .ano-back { display: inline-flex; align-items: center; gap: 6px; color: var(--nx-text-sub); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; text-decoration: none; transition: color .2s; }
        .ano-back:hover { color: var(--nx-text); }
        .ano-actions { display: flex; gap: 10px; }
        .btn-icon { width: 38px; height: 38px; border-radius: 10px; background: var(--nx-bg-2); border: 1px solid var(--nx-border); color: var(--nx-text-sub); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all .2s; position: relative; }
        .btn-icon:hover { background: var(--nx-bg-3); border-color: var(--nx-border-2); color: var(--nx-text); transform: translateY(-1px); }
        .btn-icon.saved { color: var(--nx-danger); background: rgba(239,68,68,.1); border-color: rgba(239,68,68,.2); }
        .toast-copy { position: absolute; top: 110%; right: 0; background: var(--nx-text); color: var(--nx-bg); font-size: 11px; font-weight: 700; padding: 5px 10px; border-radius: 6px; white-space: nowrap; pointer-events: none; animation: nx-fade-in .2s; }

        .ano-grid { display: grid; grid-template-columns: 1fr 380px; gap: 32px; align-items: start; }
        @media (max-width: 960px) { .ano-grid { grid-template-columns: 1fr; } }

        .gallery-wrap { border-radius: 18px; overflow: hidden; background: var(--nx-bg-2); border: 1px solid var(--nx-border); margin-bottom: 20px; }
        .gallery-main { position: relative; aspect-ratio: 16/9; background: #000; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .gallery-main img { width: 100%; height: 100%; object-fit: cover; transition: opacity .3s; }
        .gallery-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.65) 0%, transparent 45%); pointer-events: none; }
        .gallery-placeholder { font-size: 64px; opacity: .25; }
        .gallery-badge { position: absolute; top: 14px; left: 14px; background: rgba(0,0,0,.65); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,.12); border-radius: 8px; padding: 5px 12px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .07em; color: ${accent}; display: flex; align-items: center; gap: 5px; z-index: 5; }
        .gallery-counter { position: absolute; top: 14px; right: 14px; background: rgba(0,0,0,.65); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,.1); border-radius: 20px; padding: 5px 12px; font-size: 12px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 5px; z-index: 5; }
        .gallery-bottom { position: absolute; bottom: 16px; left: 16px; right: 70px; z-index: 5; }
        .gallery-title-overlay { font-family: var(--nx-font-display); font-size: clamp(18px, 3vw, 26px); font-weight: 800; color: #fff; text-shadow: 0 2px 14px rgba(0,0,0,.6); letter-spacing: -.02em; line-height: 1.25; margin-bottom: 6px; }
        .gallery-loc { display: flex; align-items: center; gap: 4px; color: rgba(255,255,255,.75); font-size: 13px; font-weight: 600; }
        .arrow-btn { position: absolute; top: 50%; transform: translateY(-50%); width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,.1); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,.18); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; transition: all .2s; }
        .arrow-btn:hover { background: rgba(255,255,255,.25); }
        .arrow-left { left: 14px; } .arrow-right { right: 14px; }
        .thumbs-row { display: flex; gap: 8px; padding: 12px; overflow-x: auto; scrollbar-width: none; background: var(--nx-bg-3); border-top: 1px solid var(--nx-border); }
        .thumbs-row::-webkit-scrollbar { display: none; }
        .thumb { width: 76px; height: 50px; border-radius: 8px; overflow: hidden; cursor: pointer; border: 2px solid transparent; opacity: .45; transition: all .2s; flex-shrink: 0; }
        .thumb:hover { opacity: .75; }
        .thumb.active { border-color: ${accent}; opacity: 1; }
        .thumb img { width: 100%; height: 100%; object-fit: cover; }

        .title-block { margin-bottom: 22px; }
        .listing-price { font-family: var(--nx-font-display); font-size: clamp(28px, 4vw, 38px); font-weight: 800; letter-spacing: -.03em; line-height: 1; color: ${accent}; margin-bottom: 5px; }
        .listing-subtitle { font-size: 16px; color: var(--nx-text-2); font-weight: 500; margin-bottom: 12px; line-height: 1.4; }
        .meta-row { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
        .meta-item { display: flex; align-items: center; gap: 5px; font-size: 12px; color: var(--nx-text-sub); font-weight: 600; }
        .estado-badge { padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .06em; background: rgba(16,185,129,.1); color: #10b981; border: 1px solid rgba(16,185,129,.2); }
        .meta-dot { color: var(--nx-text-sub); font-size: 10px; }

        /* 🌟 CSS DAS BADGES DE CONFIANÇA */
        .nx-price-badges { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0 20px; padding-bottom: 16px; border-bottom: 1px solid var(--nx-border); }
        .nx-badge-item { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; background: var(--nx-bg-2); border: 1px solid var(--nx-border); color: var(--nx-text-2); }
        .nx-badge-item.garantia { background: rgba(42, 193, 180, 0.06); border-color: rgba(42, 193, 180, 0.2); color: #2ac1b4; }

        .tabs-wrap { display: flex; gap: 2px; border-bottom: 1px solid var(--nx-border); margin-bottom: 22px; overflow-x: auto; scrollbar-width: none; }
        .tabs-wrap::-webkit-scrollbar { display: none; }
        .tab-btn { padding: 10px 18px; background: none; border: none; border-bottom: 2px solid transparent; color: var(--nx-text-sub); font-size: 14px; font-weight: 700; cursor: pointer; white-space: nowrap; transition: all .2s; letter-spacing: .01em; }
        .tab-btn:hover { color: var(--nx-text-2); }
        .tab-btn.active { color: ${accent}; border-bottom-color: ${accent}; }

        .specs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(155px, 1fr)); gap: 12px; animation: nx-fade-in .3s; }
        .spec-card { background: var(--nx-bg-2); border: 1px solid var(--nx-border); border-radius: 12px; padding: 14px 16px; transition: border-color .2s; }
        .spec-card:hover { border-color: var(--nx-border-2); }
        .spec-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; color: var(--nx-text-sub); margin-bottom: 8px; display: flex; align-items: center; gap: 5px; }
        .spec-value { font-size: 15px; font-weight: 700; color: var(--nx-text); text-transform: capitalize; }

        .extras-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(185px, 1fr)); gap: 10px; animation: nx-fade-in .3s; }
        .extra-item { display: flex; align-items: center; gap: 9px; background: var(--nx-bg-2); border: 1px solid var(--nx-border); border-radius: 9px; padding: 11px 14px; font-size: 13px; font-weight: 600; color: var(--nx-text-2); }
        .extra-check { color: ${accent}; flex-shrink: 0; }

        .desc-box { background: var(--nx-bg-2); border: 1px solid var(--nx-border); border-radius: 16px; padding: 26px; margin-top: 4px; animation: nx-fade-in .3s; }
        .desc-head { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; color: var(--nx-text-sub); margin-bottom: 14px; display: flex; align-items: center; gap: 7px; }
        .desc-text { font-size: 14px; line-height: 1.8; color: var(--nx-text-2); white-space: pre-wrap; }

        .sidebar-sticky { position: sticky; top: 20px; display: flex; flex-direction: column; gap: 14px; }
        .price-panel { background: var(--nx-card-bg); border: 1px solid var(--nx-card-border); border-radius: 20px; padding: 26px; box-shadow: var(--nx-shadow-card); backdrop-filter: blur(16px); }
        .panel-price { font-family: var(--nx-font-display); font-size: clamp(28px, 3.5vw, 38px); font-weight: 800; letter-spacing: -.03em; line-height: 1; color: ${accent}; margin-bottom: 4px; }
        .panel-price-m2 { font-size: 13px; color: var(--nx-text-sub); font-weight: 600; margin-bottom: 12px; }

        .btn-contact { width: 100%; padding: 16px; background: ${accent}; color: #fff; border: none; border-radius: 12px; font-family: var(--nx-font-body); font-size: 14px; font-weight: 800; cursor: pointer; transition: all .2s; display: flex; align-items: center; justify-content: center; gap: 7px; text-transform: uppercase; letter-spacing: .06em; box-shadow: 0 6px 20px ${accentShadow}; }
        .btn-contact:hover { filter: brightness(1.1); transform: translateY(-2px); box-shadow: 0 10px 28px ${accentShadow}; }

        .contact-revealed { width: 100%; padding: 16px; background: var(--nx-bg-2); border: 2px dashed var(--nx-border-2); border-radius: 12px; display: flex; flex-direction: column; align-items: center; gap: 4px; text-decoration: none; transition: background .2s; cursor: pointer; }
        .contact-revealed:hover { background: var(--nx-bg-3); }
        .contact-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; color: var(--nx-text-sub); }
        .contact-phone { font-size: 20px; font-weight: 800; color: var(--nx-text); display: flex; align-items: center; gap: 7px; }
        .contact-email { font-size: 13px; color: var(--nx-text-sub); font-weight: 600; margin-top: 2px; }

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

        .seller-panel { background: var(--nx-card-bg); border: 1px solid var(--nx-card-border); border-radius: 16px; padding: 18px 20px; display: flex; align-items: center; gap: 14px; text-decoration: none; transition: all .2s; }
        .seller-panel:hover { border-color: var(--nx-border-2); background: var(--nx-bg-2); }
        .seller-avatar { width: 50px; height: 50px; border-radius: 50%; background: var(--nx-bg-3); display: flex; align-items: center; justify-content: center; font-family: var(--nx-font-display); font-size: 18px; font-weight: 800; color: var(--nx-text); flex-shrink: 0; overflow: hidden; }
        .seller-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .seller-info { flex: 1; }
        .seller-name { font-size: 15px; font-weight: 800; color: var(--nx-text); display: flex; align-items: center; gap: 5px; margin-bottom: 3px; }
        .seller-sub { font-size: 12px; color: var(--nx-text-sub); font-weight: 600; margin-top: 4px; }
        
        /* 🌟 CSS DAS ESTRELAS */
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
      `}</style>

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
              <button className="btn-icon" onClick={handlePartilhar} title="Partilhar">
                <Icon path={mdiShareVariantOutline} size={0.85} />
                {copiado && <div className="toast-copy">✓ Copiado!</div>}
              </button>
              {!isDono && (
                <button className={`btn-icon ${guardado ? 'saved' : ''}`} onClick={toggleGuardado} title="Guardar">
                  <Icon path={guardado ? mdiHeart : mdiHeartOutline} size={0.85} />
                </button>
              )}
            </div>
          </div>

          <div className="ano-grid">
            <div>
              <div className="gallery-wrap">
                <div className="gallery-main">
                  {fotos[fotoActiva] ? <img src={fotos[fotoActiva]} alt={anuncio.titulo} /> : <div className="gallery-placeholder">{isCarro ? '🚗' : '🏠'}</div>}
                  <div className="gallery-overlay" />
                  <div className="gallery-badge"><Icon path={isCarro ? mdiCar : mdiHomeCityOutline} size={0.7} />{isCarro ? 'Automóvel' : 'Imóvel'}</div>
                  {fotos.length > 1 && (<div className="gallery-counter"><Icon path={mdiCamera} size={0.65} />{fotoActiva + 1} / {fotos.length}</div>)}
                  <div className="gallery-bottom">
                    <div className="gallery-title-overlay">{anuncio.titulo}</div>
                    <div className="gallery-loc"><Icon path={mdiMapMarkerOutline} size={0.65} />{localizacaoString}</div>
                  </div>
                  {fotos.length > 1 && (
                    <>
                      <button className="arrow-btn arrow-left" onClick={() => setFotoActiva(i => i === 0 ? fotos.length - 1 : i - 1)}><Icon path={mdiChevronLeft} size={1.1} /></button>
                      <button className="arrow-btn arrow-right" onClick={() => setFotoActiva(i => i === fotos.length - 1 ? 0 : i + 1)}><Icon path={mdiChevronRight} size={1.1} /></button>
                    </>
                  )}
                </div>
                {fotos.length > 1 && (
                  <div className="thumbs-row">
                    {fotos.map((f, i) => (
                      <div key={i} className={`thumb ${fotoActiva === i ? 'active' : ''}`} onClick={() => setFotoActiva(i)}>
                        {f ? <img src={f} alt="" /> : <div style={{ display:'flex',alignItems:'center',justifyContent:'center',height:'100%',fontSize:'18px' }}>📷</div>}
                      </div>
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
                  <span className="meta-item">Ref: #{anuncio._id?.slice(-6).toUpperCase()}</span>
                </div>
              </div>

              <div className="tabs-wrap">
                <button type="button" className={`tab-btn ${abaAtiva === 'especificacoes' ? 'active' : ''}`} onClick={() => setAbaAtiva('especificacoes')}>Ficha Técnica</button>
                {extrasOpcionais.length > 0 && (<button type="button" className={`tab-btn ${abaAtiva === 'equipamento' ? 'active' : ''}`} onClick={() => setAbaAtiva('equipamento')}>{isCarro ? 'Equipamento' : 'Detalhes'}</button>)}
                <button type="button" className={`tab-btn ${abaAtiva === 'descricao' ? 'active' : ''}`} onClick={() => setAbaAtiva('descricao')}>Descrição</button>
              </div>

              {abaAtiva === 'especificacoes' && (
                <div className="specs-grid">
                  {specs.filter(s => s.value != null && s.value !== '').map((s, i) => (
                    <div key={i} className="spec-card">
                      <div className="spec-label"><Icon path={s.icon} size={0.75} />{s.label}</div>
                      <div className="spec-value">{s.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {abaAtiva === 'equipamento' && extrasOpcionais.length > 0 && (
                <div className="extras-grid">
                  {extrasOpcionais.map((extra, i) => (
                    <div key={i} className="extra-item">
                      <span className="extra-check"><Icon path={mdiStar} size={0.75} /></span>{extra}
                    </div>
                  ))}
                </div>
              )}

              {abaAtiva === 'descricao' && (
                <div className="desc-box">
                  <div className="desc-head"><Icon path={mdiFileDocumentOutline} size={0.8} />Descrição do Anunciante</div>
                  <div className="desc-text">{anuncio.descricao || 'Nenhuma descrição detalhada providenciada.'}</div>
                </div>
              )}
            </div>

            <div>
              <div className="sidebar-sticky">
                <div className="price-panel">
                  <div className="panel-price">{preco}</div>
                  {precoPorM2 && <div className="panel-price-m2">{precoPorM2}/m²</div>}

                  {/* 🌟 VITRINE DE BADGES DE CONFIANÇA */}
                  <div className="nx-price-badges">
                    {(garantia || donoDoAnuncio?.tipo === 'admin') && (
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
                        <a href={`tel:${telefoneContacto}`} className="contact-revealed">
                          <span className="contact-label">Contactar via</span>
                          <div className="contact-phone"><Icon path={mdiPhone} size={0.9} color={accent} />{telefoneContacto}</div>
                          <div className="contact-email">✉ {emailContacto}</div>
                        </a>
                      ) : (
                        <button type="button" className="btn-contact" onClick={() => setMostrarTelefone(true)}>
                          <Icon path={mdiPhone} size={0.85} /> Revelar Contactos
                        </button>
                      )}
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
                        <input type="range" className="fin-slider" min="0" max={Math.round(precoValor * 0.7)} step="250" value={entrada} onChange={e => setEntrada(Number(e.target.value))} />
                      </div>
                      <div className="slider-group" style={{ marginBottom: 0 }}>
                        <div className="slider-label-row">
                          <span>Prazo</span>
                          <span className="slider-val">{meses} meses</span>
                        </div>
                        <input type="range" className="fin-slider" min="24" max="120" step="12" value={meses} onChange={e => setMeses(Number(e.target.value))} />
                      </div>
                    </div>
                  )}
                </div>

                <Link to={`/vendedor/${donoDoAnuncio?._id}`} className="seller-panel">
                  <div className="seller-avatar">{donoDoAnuncio?.avatarUrl ? <img src={donoDoAnuncio.avatarUrl} alt="" /> : inicial}</div>
                  <div className="seller-info">
                    <div className="seller-name">
                      {donoDoAnuncio?.tipo === 'admin'
                        ? (donoDoAnuncio.nome?.toUpperCase().includes('NOXVELIA') ? donoDoAnuncio.nome : `NOXVELIA ${donoDoAnuncio?.nome}`)
                        : (donoDoAnuncio?.nome || 'Utilizador Particular')
                      }
                      {donoDoAnuncio?.tipo === 'admin' && <Icon path={mdiCheckDecagram} size={0.8} color="var(--nx-accent-blue)" />}
                    </div>

                    {/* 🌟 SISTEMA DE ESTRELAS DO VENDEDOR */}
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

          {/* 🌟 ANÚNCIOS SUGERIDOS */}
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
    </>
  );
}