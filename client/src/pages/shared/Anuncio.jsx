import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { trackFunnelEvent } from '../../utils/funnelAnalytics';
import { useAuth } from '../../context/AuthContext';
import { getVideoEmbedData } from '../../utils/videoEmbed';
import GoogleAdSlot from '../../components/GoogleAdSlot';
import Seo from '../../components/Seo';
import { absoluteUrl, anuncioPath } from '../../utils/seo';
import { normalizarExtras } from '../../utils/extras';
import { getImageDimensions, getImageSrcSet, getImageUrl } from '../../utils/images';
import { Icon } from '@mdi/react';
import {
  mdiCheckDecagram, mdiShareVariantOutline, mdiHeartOutline, mdiHeart,
  mdiCalendarBlank, mdiSpeedometer, mdiGasStation, mdiCarShiftPattern, mdiEngineOutline,
  mdiHomeCityOutline, mdiRulerSquare, mdiBedOutline, mdiShower, mdiCertificateOutline,
  mdiChevronLeft, mdiChevronRight, mdiPhone, mdiMapMarkerOutline, mdiEyeOutline,
  mdiGarageVariant, mdiBalcony, mdiHammerWrench, mdiCar, mdiFileDocumentOutline,
  mdiCamera, mdiStar, mdiAlertCircleOutline, mdiWhatsapp, mdiContentCopy,
  mdiShieldCheckOutline, mdiClockOutline, mdiMagnifyPlusOutline, mdiClose, mdiCheck,
  mdiCheckCircleOutline, mdiSwapHorizontal, mdiLightningBolt, mdiEmailOutline
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

const VALORES_COMBUSTIVEL_CARRO = {
  gasolina: 'Gasolina',
  diesel: 'Diesel',
  eletrico: 'Elétrico',
  hibrido: 'Híbrido',
  gpl: 'GPL',
};
const VALORES_TRANSMISSAO_CARRO = { manual: 'Manual', automatico: 'Automático' };
const VALORES_TRACAO_CARRO = { dianteira: 'Dianteira', traseira: 'Traseira', integral: 'Integral / 4x4' };
const VALORES_SECCAO_CARRO = { novo: 'Novo', usado: 'Usado', seminovo: 'Seminovo', classico: 'Clássico' };
const VALORES_TIPO_VEICULO_CARRO = {
  citadino: 'Citadino',
  utilitario: 'Utilitário',
  sedan: 'Sedan / Berlina',
  carrinha: 'Carrinha',
  suv: 'SUV',
  crossover: 'Crossover',
  coupe: 'Coupé',
  cabrio: 'Cabrio',
  monovolume: 'Monovolume',
  pickup: 'Pick-up',
  comercial: 'Comercial',
  van: 'Van',
  outro: 'Outro',
};

const formatarValorAuto = (value, mapa = {}) => {
  if (value === null || value === undefined || value === '') return null;
  const raw = String(value);
  return mapa[raw] || raw.replace(/_/g, ' ');
};

const textoPesquisa = (value) => String(value || '')
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '');

const CATEGORIAS_EQUIPAMENTO_CARRO = [
  { titulo: 'Segurança', termos: ['airbag', 'abs', 'esp', 'isofix', 'travagem', 'alerta', 'seguranca', 'controlo estabilidade', 'controlo tracao'] },
  { titulo: 'Tecnologia', termos: ['gps', 'navegacao', 'bluetooth', 'android', 'apple', 'carplay', 'usb', 'radio', 'multimedia', 'ecra', 'digital'] },
  { titulo: 'Assistência', termos: ['sensor', 'sensores', 'camara', 'camera', 'cruise', 'estacionamento', 'assistente', 'lane', 'luzes', 'chuva'] },
  { titulo: 'Conforto', termos: ['banco', 'bancos', 'aquecido', 'climatizacao', 'ar condicionado', 'volante', 'vidros', 'fecho', 'keyless'] },
  { titulo: 'Exterior', termos: ['jantes', 'farois', 'farol', 'teto', 'panoramico', 'barras', 'gancho', 'pintura', 'spoiler'] },
  { titulo: 'Performance', termos: ['sport', 'desportivo', 'suspensao', 'pack', 'amg', 'm sport', 's-line', 'tracao', 'diferencial'] },
];

const agruparExtras = (extras, isCarro) => {
  if (!extras.length) return [];
  if (!isCarro) return [{ titulo: 'Características', items: extras }];

  const grupos = CATEGORIAS_EQUIPAMENTO_CARRO.map((categoria) => ({ ...categoria, items: [] }));
  const outros = { titulo: 'Outros', items: [] };

  extras.forEach((extra) => {
    const texto = textoPesquisa(extra);
    const grupo = grupos.find((categoria) => categoria.termos.some((termo) => texto.includes(termo)));
    (grupo || outros).items.push(extra);
  });

  return [...grupos.filter((grupo) => grupo.items.length), ...(outros.items.length ? [outros] : [])];
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
        trackFunnelEvent('listing_view', { listingId: data?._id || id, vertical: data?.tipo });
        if (data?.preco) setEntrada(0);

        const visitKey = '@Noxvelia:visit:' + id;
        try {
          if (!sessionStorage.getItem(visitKey)) {
            sessionStorage.setItem(visitKey, '1');
            api.post(`/anuncios/${id}/visita`).catch(() => sessionStorage.removeItem(visitKey));
          }
        } catch {
          api.post(`/anuncios/${id}/visita`).catch(() => {});
        }

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
  const fotoPrincipalUrl = getImageUrl(fotos[0], 'large');
  const fotoActivaData = fotos[fotoActiva];
  const fotoActivaLargeUrl = getImageUrl(fotoActivaData, 'large');
  const fotoActivaOriginalUrl = getImageUrl(fotoActivaData, 'original') || fotoActivaLargeUrl;
  const fotoActivaSrcSet = getImageSrcSet(fotoActivaData);
  const fotoActivaDims = getImageDimensions(fotoActivaData, { width: 1280, height: 720 });

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
        `}</style>
        <div className="skl-page">
          <div className="skl" style={{ width: 160, height: 14, marginBottom: 24 }} />
          <div className="skl-grid">
            <div>
              <div className="skl" style={{ width: '100%', aspectRatio: '16/9', borderRadius: 18 }} />
              <div className="skl" style={{ width: '40%', height: 32, marginTop: 22 }} />
              <div className="skl" style={{ width: '65%', height: 18, marginTop: 12 }} />
              <div className="skl" style={{ width: '100%', height: 1, marginTop: 20, marginBottom: 20, opacity: .4 }} />
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
      </div>
    </div>
  );

  if (!anuncio) return null;

  const donoDoAnuncio = anuncio.utilizador || anuncio.user;
  const isDono = signed && (user?.id === donoDoAnuncio?._id || user?._id === donoDoAnuncio?._id);
  const isCarro = anuncio.tipo === 'carro';
  const isDestacado = anuncio?.destacado === true;
  const podeEditarAnuncioAtivo = isDono && (anuncio.estado !== 'ativo' || user?.premiumAtivo === true || user?.tipo === 'admin' || donoDoAnuncio?.premiumAtivo === true || donoDoAnuncio?.tipo === 'admin');
  const videoEmbed = getVideoEmbedData(anuncio.videoUrl || anuncio.visitaVirtualUrl);

  const precoValor = anuncio.preco || 0;
  const preco = formatarMoeda(precoValor);
  const precoPorM2 = !isCarro && anuncio.imovel?.area
    ? `${formatarMoeda(Math.round(precoValor / anuncio.imovel.area))}/m²`
    : null;

  const vendedorAdmin = donoDoAnuncio?.tipo === 'admin';
  const emailContacto = anuncio.email || (vendedorAdmin ? '' : donoDoAnuncio?.email) || 'Não fornecido';
  const telefoneDoAnuncio = anuncio.telefone || '';
  const podeMostrarTelefoneConta = !vendedorAdmin && donoDoAnuncio?.mostrarTelefonePublico !== false;
  const telefoneContactoRaw = telefoneDoAnuncio || (podeMostrarTelefoneConta ? (donoDoAnuncio?.telefone || '') : '');
  const telefoneContacto = telefoneContactoRaw || 'Não fornecido';
  const temTelefoneContacto = telefoneContacto !== 'Não fornecido';
  const temEmailContacto = emailContacto !== 'Não fornecido';
  const whatsappNumero = temTelefoneContacto ? numeroParaWhatsapp(telefoneContacto) : null;
  const inicial = donoDoAnuncio?.nome?.charAt(0).toUpperCase() || 'U';
  const localizacaoString = `${anuncio.localizacao?.cidade || 'N/A'}${anuncio.localizacao?.distrito ? `, ${anuncio.localizacao.distrito}` : ''}`;
  const extrasOpcionais = normalizarExtras(anuncio.equipamento || []);
  const temVaranda = anuncio.imovel?.varanda || extrasOpcionais.some((extra) => {
    const texto = extra.toLocaleLowerCase('pt-PT').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return texto.includes('varanda') || texto.includes('terraco');
  });

  const valorAnoMes = anuncio.carro?.ano
    ? (anuncio.carro?.mesRegisto ? String(anuncio.carro.mesRegisto) + ' / ' + anuncio.carro.ano : anuncio.carro.ano)
    : null;

  const vin = anuncio.carro?.vin;
  const carVerticalLink = vin
    ? 'https://www.carvertical.deal/27H3X8P/CXW7M6/?uid=332&source_id=AFF&sub1=noxvelia&sub3=' + encodeURIComponent(vin)
    : 'https://www.carvertical.deal/27H3X8P/CXW7M6/?source_id=AFF&sub1=noxvelia';

  const specs = isCarro ? [
    { label: 'Marca', value: anuncio.carro?.marca, icon: mdiCar },
    { label: 'Modelo', value: anuncio.carro?.modelo, icon: mdiCar },
    { label: 'Versão', value: anuncio.carro?.versao, icon: mdiFileDocumentOutline },
    { label: 'Mês / Ano', value: valorAnoMes, icon: mdiCalendarBlank },
    { label: 'Quilometragem', value: anuncio.carro?.km != null ? new Intl.NumberFormat('pt-PT').format(anuncio.carro.km) + ' km' : null, icon: mdiSpeedometer },
    { label: 'Transmissão', value: formatarValorAuto(anuncio.carro?.transmissao, VALORES_TRANSMISSAO_CARRO), icon: mdiCarShiftPattern },
    { label: 'Cilindrada', value: anuncio.carro?.cilindrada ? new Intl.NumberFormat('pt-PT').format(anuncio.carro.cilindrada) + ' cm³' : null, icon: mdiEngineOutline },
    { label: 'Potência', value: anuncio.carro?.potencia ? anuncio.carro.potencia + ' cv' : null, icon: mdiEngineOutline },
    { label: 'Cor Exterior', value: anuncio.carro?.cor, icon: mdiCar },
    { label: 'Núm. Portas', value: anuncio.carro?.portas, icon: mdiCar },
    { label: 'Núm. Lugares', value: anuncio.carro?.lugares, icon: mdiCar },
    { label: 'Combustível', value: formatarValorAuto(anuncio.carro?.combustivel, VALORES_COMBUSTIVEL_CARRO), icon: mdiGasStation },
    { label: 'Tracção', value: formatarValorAuto(anuncio.carro?.tracao, VALORES_TRACAO_CARRO), icon: mdiSwapHorizontal },
    { label: 'Secção', value: formatarValorAuto(anuncio.carro?.seccao, VALORES_SECCAO_CARRO), icon: mdiCheckCircleOutline },
    { label: 'Tipo de Veículo', value: formatarValorAuto(anuncio.carro?.tipoVeiculo, VALORES_TIPO_VEICULO_CARRO), icon: mdiCar },
  ] : [
    { label: 'Tipo de imóvel', value: anuncio.imovel?.tipoImovel, icon: mdiHomeCityOutline },
    { label: 'Tipologia', value: anuncio.imovel?.tipologia, icon: mdiHomeCityOutline },
    { label: 'Área útil', value: anuncio.imovel?.area ? anuncio.imovel.area + ' m²' : null, icon: mdiRulerSquare },
    { label: 'Area terreno/bruta', value: anuncio.imovel?.areaTerreno ? anuncio.imovel.areaTerreno + ' m2' : null, icon: mdiRulerSquare },
    { label: 'Quartos', value: anuncio.imovel?.quartos, icon: mdiBedOutline },
    { label: 'Casas de banho', value: anuncio.imovel?.casasBanho, icon: mdiShower },
    { label: 'Ano construcao', value: anuncio.imovel?.anoConstrucao || anuncio.imovel?.ano, icon: mdiCalendarBlank },
    { label: 'Andar', value: anuncio.imovel?.andar ?? null, icon: mdiHomeCityOutline },
    { label: 'Cert. energético', value: anuncio.imovel?.certificadoEnergetico, icon: mdiCertificateOutline },
    { label: 'Localização', value: localizacaoString, icon: mdiMapMarkerOutline },
    { label: 'Estado', value: anuncio.imovel?.estadoConservacao || anuncio.imovel?.estado || 'Usado', icon: mdiHammerWrench },
    { label: 'Piscina', value: anuncio.imovel?.piscina ? 'Sim' : null, icon: mdiCheckCircleOutline },
    { label: 'Jardim', value: anuncio.imovel?.jardim ? 'Sim' : null, icon: mdiCheckCircleOutline },
    { label: 'Elevador', value: anuncio.imovel?.elevador ? 'Sim' : null, icon: mdiCheckCircleOutline },
    { label: 'Garagem', value: anuncio.imovel?.garagem ? 'Sim' : 'Não', icon: mdiGarageVariant },
    { label: 'Varanda/Terraço', value: temVaranda ? 'Sim' : 'Não', icon: mdiBalcony },
  ];

  const especificacoesVisiveis = specs.filter(s => s.value != null && s.value !== '');
  const gruposExtras = agruparExtras(extrasOpcionais, isCarro);
  const valorFinanciado = Math.max(0, precoValor - entrada);
  const taxaMensal = 0.079 / 12;
  const prestacaoMensal = valorFinanciado > 0
    ? Math.round((valorFinanciado * taxaMensal) / (1 - Math.pow(1 + taxaMensal, -meses)))
    : 0;

  const accent = '#102f50';
  const accentShadow = 'rgba(16,47,80,.22)';

  const garantia = anuncio.garantia;
  const aceitaRetoma = anuncio.aceitaRetoma;
  const rating = donoDoAnuncio?.rating || 0;
  const totalAvaliacoes = donoDoAnuncio?.totalAvaliacoes || 0;
  const anoRegistoUser = donoDoAnuncio?.createdAt ? new Date(donoDoAnuncio.createdAt).getFullYear() : new Date().getFullYear();
  const vendedorVerificado = donoDoAnuncio?.tipo === 'admin';
  const referencia = anuncio._id?.slice(-6).toUpperCase();
  const dataPublicacao = anuncio.createdAt
    ? new Date(anuncio.createdAt).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' })
    : null;
  const resumoDecisao = [
    { label: 'Localização', value: localizacaoString, icon: mdiMapMarkerOutline },
    { label: isCarro ? 'Marca' : 'Preço / m²', value: isCarro ? (anuncio.carro?.marca || 'Viatura') : (precoPorM2 || 'A confirmar'), icon: isCarro ? mdiCar : mdiRulerSquare },
    { label: 'Vendedor', value: vendedorVerificado ? 'Verificado' : (rating > 0 ? `${rating.toFixed(1)} estrelas` : 'Novo vendedor'), icon: mdiShieldCheckOutline },
    { label: 'Contacto', value: temTelefoneContacto ? 'Telefone' : (temEmailContacto ? 'Email' : 'Por mensagem'), icon: temTelefoneContacto ? mdiPhone : mdiEmailOutline },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': isCarro ? 'Vehicle' : 'Product',
    name: anuncio.titulo,
    description: anuncio.descricao?.slice(0, 300),
    image: fotos.filter(Boolean),
    url: absoluteUrl(anuncioPath(anuncio)),
    sku: anuncio._id,
    category: isCarro ? 'Automóveis' : 'Imóveis',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: precoValor,
      availability: 'https://schema.org/InStock',
      url: absoluteUrl(anuncioPath(anuncio)),
      seller: donoDoAnuncio?.nome ? { '@type': donoDoAnuncio?.tipoConta === 'profissional' ? 'Organization' : 'Person', name: donoDoAnuncio.nome } : undefined,
    },
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Noxvelia', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: isCarro ? 'Carros' : 'Imóveis', item: absoluteUrl(isCarro ? '/carros' : '/imoveis') },
      { '@type': 'ListItem', position: 3, name: anuncio.titulo, item: absoluteUrl(anuncioPath(anuncio)) },
    ],
  };

  return (
    <div className="nx-anuncio-view">
      <Seo
        title={`${anuncio.titulo} | Noxvelia`}
        description={(anuncio.descricao || `${anuncio.titulo} em ${anuncio.localizacao?.cidade || 'Portugal'}`).slice(0, 160)}
        path={anuncioPath(anuncio)}
        image={fotoPrincipalUrl}
        type="product"
        jsonLd={[jsonLd, breadcrumbLd]}
      />

      <style>{`
        /* ── RESET GLOBAL ABSOLUTO E ANTI-OVERFLOW ── */
        .nx-anuncio-view {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 34%, #ffffff 100%);
          color: #0f172a;
          min-height: calc(100vh - 72px);
          padding: 16px 12px 100px;
          font-family: 'Inter', sans-serif;
          box-sizing: border-box;
        }
        .nx-anuncio-view *, .nx-anuncio-view *::before, .nx-anuncio-view *::after {
          box-sizing: border-box;
        }
        @media (min-width: 768px) { .nx-anuncio-view { padding: 24px 20px 80px; } }

        .ano-container { width: 100%; max-width: 1240px; margin: 0 auto; box-sizing: border-box; }
        
        .ano-breadcrumb { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px; width: 100%; }
        .ano-back { display: inline-flex; align-items: center; gap: 6px; color: #64748b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; text-decoration: none; transition: color .2s; }
        .ano-back:hover, .ano-back:focus-visible { color: #0f172a; }
        .ano-actions { display: flex; gap: 10px; }
        .btn-icon { width: 38px; height: 38px; border-radius: 10px; background: #ffffff; border: 1px solid #e2e8f0; color: #64748b; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all .2s; position: relative; }
        .btn-icon.saved { color: #ef4444; background: rgba(239,68,68,.05); border-color: rgba(239,68,68,.2); }
        .toast-copy { position: absolute; top: 110%; right: 0; background: #0f172a; color: #ffffff; font-size: 11px; font-weight: 700; padding: 5px 10px; border-radius: 6px; white-space: nowrap; pointer-events: none; animation: nx-fade-in .2s; z-index: 20; display: flex; align-items: center; gap: 4px; }

        /* GRID PRINCIPAL */
        .ano-grid { display: grid; grid-template-columns: 1fr; gap: 24px; width: 100%; align-items: start; }
        @media (min-width: 1024px) { .ano-grid { grid-template-columns: 1fr 380px; gap: 32px; } }

        /* GALERIA E IMAGENS */
        .gallery-wrap { width: 100%; border-radius: 16px; overflow: hidden; background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 16px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); position: relative; }
        .nx-anuncio-view.is-featured .gallery-wrap { border-color: rgba(217,196,156,.78); box-shadow: 0 10px 25px -5px rgba(217,196,156,.3); }
        .gallery-main { position: relative; width: 100%; aspect-ratio: 16/9; background: #f1f5f9; display: flex; align-items: center; justify-content: center; overflow: hidden; cursor: zoom-in; }
        .gallery-main img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .gallery-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,23,42,.65) 0%, transparent 45%); pointer-events: none; }
        
        .gallery-badge { position: absolute; top: 12px; left: 12px; background: rgba(255,255,255,.9); backdrop-filter: blur(8px); border: 1px solid rgba(0,0,0,.05); border-radius: 8px; padding: 5px 10px; font-size: 10.5px; font-weight: 800; text-transform: uppercase; letter-spacing: .07em; color: ${accent}; display: flex; align-items: center; gap: 5px; z-index: 5; }
        .gallery-badge.below-featured { top: 52px; }
        .gallery-featured-badge { position: absolute; top: 12px; left: 12px; z-index: 6; display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 999px; background: linear-gradient(135deg, #102f50 0%, #d9c49c 100%); color: #fffaf0; border: 1px solid rgba(255,250,240,.32); font-size: 10.5px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; box-shadow: 0 8px 16px rgba(0,0,0,.3); }
        .gallery-counter { position: absolute; top: 12px; right: 12px; background: rgba(15,23,42,.65); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,.1); border-radius: 20px; padding: 5px 12px; font-size: 12px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 5px; z-index: 5; }
        
        .gallery-bottom { position: absolute; bottom: 16px; left: 16px; right: 16px; z-index: 5; pointer-events: none; }
        .gallery-title-overlay { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(18px, 4vw, 24px); font-weight: 800; color: #fff; text-shadow: 0 2px 10px rgba(0,0,0,.8); line-height: 1.25; margin-bottom: 6px; word-break: break-word; }
        .gallery-loc { display: flex; align-items: center; gap: 4px; color: rgba(255,255,255,.9); font-size: 12px; font-weight: 600; text-shadow: 0 1px 4px rgba(0,0,0,0.8); }
        
        .thumbs-row { display: flex; gap: 8px; padding: 12px; overflow-x: auto; scrollbar-width: none; background: #ffffff; border-top: 1px solid #e2e8f0; width: 100%; }
        .thumbs-row::-webkit-scrollbar { display: none; }
        .thumb { width: 70px; height: 46px; border-radius: 6px; overflow: hidden; cursor: pointer; border: 2px solid transparent; opacity: .6; flex-shrink: 0; padding: 0; background: #f1f5f9; }
        .thumb.active { border-color: ${accent}; opacity: 1; }
        .thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* TÍTULO E DECISÕES */
        .title-block { width: 100%; margin-bottom: 16px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 16px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); }
        .nx-anuncio-view.is-featured .title-block { border-color: rgba(217,196,156,.68); }
        .featured-title-strip { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; padding: 12px; border: 1px solid #e7d3a8; border-radius: 10px; background: linear-gradient(135deg, #fff8e7 0%, #ffffff 100%); color: #102f50; }
        .featured-title-strip span { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 900; text-transform: uppercase; }
        .featured-title-strip small { color: #64748b; font-size: 11px; font-weight: 700; width: 100%; }
        @media (min-width: 640px) { .featured-title-strip small { width: auto; } }

        .listing-price { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(26px, 5vw, 36px); font-weight: 800; color: ${accent}; margin-bottom: 6px; }
        .listing-subtitle { font-size: clamp(16px, 3vw, 22px); color: #0f172a; font-weight: 800; margin-bottom: 14px; line-height: 1.3; word-break: break-word; }
        .meta-row { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; width: 100%; }
        .meta-item { display: flex; align-items: center; gap: 5px; font-size: 11.5px; color: #64748b; font-weight: 600; }
        .estado-badge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 20px; font-size: 10px; font-weight: 800; text-transform: uppercase; background: rgba(217,196,156,.18); color: #102f50; border: 1px solid rgba(217,196,156,.38); }
        .estado-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
        
        .decision-strip { width: 100%; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-bottom: 20px; }
        @media (min-width: 640px) { .decision-strip { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
        .decision-item { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px; display: flex; align-items: center; gap: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.02); min-width: 0; }
        .decision-icon { width: 32px; height: 32px; border-radius: 8px; background: #f8fafc; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; color: ${accent}; flex-shrink: 0; }
        .decision-label { display: block; font-size: 9px; color: #94a3b8; font-weight: 900; text-transform: uppercase; margin-bottom: 4px; }
        .decision-value { display: block; color: #0f172a; font-size: 12px; font-weight: 800; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

        /* SEPARADORES E DETALHES */
        .tabs-wrap { display: flex; gap: 4px; border: 1px solid #e2e8f0; background: #ffffff; border-radius: 12px; padding: 5px; margin-bottom: 20px; overflow-x: auto; scrollbar-width: none; width: 100%; max-width: 100%; }
        .tabs-wrap::-webkit-scrollbar { display: none; }
        .tab-btn { padding: 10px 16px; background: transparent; border: none; border-radius: 8px; color: #64748b; font-size: 13px; font-weight: 800; cursor: pointer; white-space: nowrap; transition: all .2s; }
        .tab-btn.active { color: #fffaf0; background: ${accent}; }

        .specs-grid { width: 100%; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 145px), 1fr)); gap: 10px; }
        .spec-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.01); }
        .spec-label { font-size: 10px; font-weight: 800; text-transform: uppercase; color: #64748b; margin-bottom: 6px; display: flex; align-items: center; gap: 4px; }
        .spec-value { font-size: 14px; font-weight: 700; color: #0f172a; word-break: break-word; }

        .desc-box { width: 100%; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; }
        .desc-text { font-size: 13.5px; line-height: 1.7; color: #334155; white-space: pre-wrap; word-break: break-word; }

        /* PAINEL LATERAL (PREÇO, CONTACTOS, VENDEDOR) */
        .sidebar-sticky { display: flex; flex-direction: column; gap: 16px; width: 100%; }
        @media (min-width: 1024px) { .sidebar-sticky { position: sticky; top: 88px; max-height: calc(100vh - 104px); overflow-y: auto; padding-right: 4px; } }
        
        .price-panel { width: 100%; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); }
        .panel-price { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(28px, 4vw, 36px); font-weight: 800; color: ${accent}; margin-bottom: 4px; }
        
        .nx-price-badges { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0 16px; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0; width: 100%; }
        .nx-badge-item { display: inline-flex; align-items: center; gap: 4px; padding: 6px 10px; border-radius: 6px; font-size: 11.5px; font-weight: 700; background: #f8fafc; border: 1px solid #e2e8f0; color: #475569; }

        .btn-contact { width: 100%; padding: 16px; background: ${accent}; color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 800; text-transform: uppercase; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; margin-bottom: 12px; }
        
        .seller-panel { width: 100%; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 16px; display: flex; align-items: center; gap: 12px; text-decoration: none; transition: background .2s; }
        .seller-panel:hover { background: #f8fafc; border-color: #cbd5e1; }
        .seller-avatar { width: 44px; height: 44px; border-radius: 50%; background: #f1f5f9; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #0f172a; flex-shrink: 0; overflow: hidden; }
        .seller-info { flex: 1; min-width: 0; }
        .seller-name { font-size: 14px; font-weight: 800; color: #0f172a; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: flex; align-items: center; gap: 4px; }

        /* BARRA MOBILE FIXA */
        .mobile-cta-bar { display: flex; position: fixed; bottom: 0; left: 0; width: 100%; z-index: 500; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); border-top: 1px solid #e2e8f0; padding: 12px 16px calc(12px + env(safe-area-inset-bottom, 0px)); align-items: center; gap: 12px; box-sizing: border-box; }
        @media (min-width: 1024px) { .mobile-cta-bar { display: none; } }
        .mobile-cta-price { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 18px; color: ${accent}; white-space: nowrap; }
        .mobile-cta-btn { flex: 1; padding: 14px; border-radius: 10px; border: none; background: ${accent}; color: #fff; font-size: 13px; font-weight: 800; text-transform: uppercase; cursor: pointer; }
        
        .lightbox-overlay { position: fixed; inset: 0; width: 100%; height: 100%; background: rgba(15,23,42,.98); z-index: 10000; display: flex; align-items: center; justify-content: center; }
        .lightbox-img-wrap { width: 100%; height: 100%; padding: 60px 16px; display: flex; align-items: center; justify-content: center; }
        .lightbox-img-wrap img { max-width: 100%; max-height: 100%; object-fit: contain; }
      `}</style>

      {lightboxAberto && (
        <div className="lightbox-overlay" onClick={() => setLightboxAberto(false)} role="dialog" aria-modal="true" aria-label="Visualização ampliada">
          <button type="button" className="btn-icon" style={{ position: 'absolute', top: 16, right: 16, zIndex: 10, background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none' }} onClick={(e) => { e.stopPropagation(); setLightboxAberto(false); }}>
            <Icon path={mdiClose} size={1} />
          </button>
          <div className="lightbox-img-wrap" onClick={(e) => e.stopPropagation()} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {fotoActivaOriginalUrl ? (
              <img src={fotoActivaOriginalUrl} width={fotoActivaDims.width} height={fotoActivaDims.height} alt="" />
            ) : null}
          </div>
          {fotos.length > 1 && (
            <>
              <button type="button" className="btn-icon" style={{ position: 'absolute', top: '50%', left: 16, transform: 'translateY(-50%)', zIndex: 10 }} onClick={(e) => { e.stopPropagation(); fotoAnterior(); }}><Icon path={mdiChevronLeft} size={1} /></button>
              <button type="button" className="btn-icon" style={{ position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)', zIndex: 10 }} onClick={(e) => { e.stopPropagation(); fotoSeguinte(); }}><Icon path={mdiChevronRight} size={1} /></button>
            </>
          )}
        </div>
      )}

      {mostrarModalVendido && (
        <div className="nx-modal-overlay" onClick={() => setMostrarModalVendido(false)}>
          <div className="nx-modal-box" onClick={e => e.stopPropagation()} style={{ background: '#fff', padding: 24, borderRadius: 16, maxWidth: 400, width: '100%', textAlign: 'center' }}>
            <h3 style={{ fontSize: 20, marginBottom: 12 }}>Venda Concluída</h3>
            <p style={{ fontSize: 14, color: '#64748b', marginBottom: 24 }}>Pretendes eliminar este anúncio permanentemente?</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="nx-btn-cancel" onClick={() => setMostrarModalVendido(false)}>Cancelar</button>
              <button className="nx-btn-danger" onClick={handleConfirmarVendido} style={{ background: '#ef4444', color: '#fff' }}>Eliminar</button>
            </div>
          </div>
        </div>
      )}

      <div className="ano-container">
        <div className="ano-breadcrumb">
          <Link to={isCarro ? '/carros' : '/imoveis'} className="ano-back">
            <Icon path={mdiChevronLeft} size={0.75} /> Voltar à Pesquisa
          </Link>
          <div className="ano-actions">
            <button className="btn-icon" onClick={handlePartilhar} aria-label="Partilhar">
              <Icon path={mdiShareVariantOutline} size={0.8} />
              {copiado && <div className="toast-copy"><Icon path={mdiCheck} size={0.5} /> Copiado</div>}
            </button>
            {!isDono && (
              <button className={`btn-icon ${guardado ? 'saved' : ''}`} onClick={toggleGuardado} aria-label="Guardar">
                <Icon path={guardado ? mdiHeart : mdiHeartOutline} size={0.8} />
              </button>
            )}
          </div>
        </div>

        <div className="ano-grid">
          <div>
            <div className="gallery-wrap">
              <div className="gallery-main" onClick={() => setLightboxAberto(true)} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                {fotoActivaLargeUrl ? (
                  <img src={fotoActivaLargeUrl} srcSet={fotoActivaSrcSet || undefined} sizes="(max-width: 960px) 100vw, 820px" alt={anuncio.titulo} loading="eager" />
                ) : (
                  <Icon path={isCarro ? mdiCar : mdiHomeCityOutline} size={3} color="#cbd5e1" />
                )}
                <div className="gallery-overlay" />
                {isDestacado && (
                  <div className="gallery-featured-badge"><Icon path={mdiStar} size={0.68} />Destaque Noxvelia</div>
                )}
                <div className={`gallery-badge${isDestacado ? ' below-featured' : ''}`}>
                  <Icon path={isCarro ? mdiCar : mdiHomeCityOutline} size={0.65} />{isCarro ? 'Automóvel' : 'Imóvel'}
                </div>
                {fotos.length > 1 && (<div className="gallery-counter">{fotoActiva + 1} / {fotos.length}</div>)}
                <div className="gallery-bottom">
                  <div className="gallery-title-overlay">{anuncio.titulo}</div>
                  <div className="gallery-loc"><Icon path={mdiMapMarkerOutline} size={0.6} />{localizacaoString}</div>
                </div>
              </div>
              {fotos.length > 1 && (
                <div className="thumbs-row">
                  {fotos.map((f, i) => (
                    <div key={i} className={`thumb ${fotoActiva === i ? 'active' : ''}`} onClick={() => setFotoActiva(i)}>
                      {getImageUrl(f, 'thumbnail') ? <img src={getImageUrl(f, 'thumbnail')} alt="" loading="lazy" /> : null}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="title-block">
              {isDestacado && (
                <div className="featured-title-strip">
                  <span><Icon path={mdiStar} size={0.68} />Destaque Noxvelia</span>
                  <small>Aparece com prioridade nos resultados.</small>
                </div>
              )}
              <div className="listing-price">{preco}</div>
              <div className="listing-subtitle">{anuncio.titulo}</div>
              <div className="meta-row">
                {dataPublicacao && <span className="meta-item"><Icon path={mdiClockOutline} size={0.6} /> {dataPublicacao}</span>}
                <span className="estado-badge"><span className="estado-dot" />{anuncio.estado || 'Disponível'}</span>
                <button type="button" className="meta-ref" onClick={copiarReferencia}>
                  <Icon path={refCopiado ? mdiCheck : mdiContentCopy} size={0.6} /> Ref: #{referencia}
                </button>
              </div>
            </div>

            <div className="decision-strip">
              {resumoDecisao.map((item) => (
                <div className="decision-item" key={item.label}>
                  <span className="decision-icon"><Icon path={item.icon} size={0.7} /></span>
                  <span style={{ minWidth: 0 }}>
                    <span className="decision-label">{item.label}</span>
                    <span className="decision-value">{item.value}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="tabs-wrap" role="tablist">
              <button type="button" role="tab" aria-selected={abaAtiva === 'especificacoes'} className={`tab-btn ${abaAtiva === 'especificacoes' ? 'active' : ''}`} onClick={() => setAbaAtiva('especificacoes')}>Ficha Técnica</button>
              {extrasOpcionais.length > 0 && (<button type="button" role="tab" className={`tab-btn ${abaAtiva === 'equipamento' ? 'active' : ''}`} onClick={() => setAbaAtiva('equipamento')}>{isCarro ? 'Equipamento' : 'Detalhes'}</button>)}
              <button type="button" role="tab" className={`tab-btn ${abaAtiva === 'descricao' ? 'active' : ''}`} onClick={() => setAbaAtiva('descricao')}>Descrição</button>
            </div>

            {abaAtiva === 'especificacoes' && (
              <div className="specs-grid tab-panel">
                {especificacoesVisiveis.map((s, i) => (
                  <div key={i} className="spec-card">
                    <div className="spec-label"><Icon path={s.icon} size={0.65} />{s.label}</div>
                    <div className="spec-value">{s.value}</div>
                  </div>
                ))}
              </div>
            )}

            {abaAtiva === 'equipamento' && extrasOpcionais.length > 0 && (
              <div className="extras-panel tab-panel">
                {gruposExtras.map((grupo) => (
                  <section key={grupo.titulo} className="extras-group">
                    <div className="extras-group-title">{grupo.titulo}</div>
                    <div className="extras-grid">
                      {grupo.items.map((extra, i) => (
                        <div key={i} className="extra-item">
                          <span className="extra-check"><Icon path={mdiCheckCircleOutline} size={0.6} /></span>
                          <span className="extra-text">{extra}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}

            {abaAtiva === 'descricao' && (
              <div className="desc-box tab-panel">
                <div className="desc-head"><Icon path={mdiFileDocumentOutline} size={0.7} />Descrição</div>
                <div className="desc-text">{anuncio.descricao || 'O vendedor ainda não adicionou uma descrição detalhada.'}</div>
              </div>
            )}
          </div>

          <div>
            <div className="sidebar-sticky">
              <div className="price-panel">
                <div className="panel-price">{preco}</div>
                {precoPorM2 && <div className="panel-price-m2" style={{ color: '#64748b', fontSize: 13, marginBottom: 16 }}>{precoPorM2}</div>}

                <div className="nx-price-badges">
                  {isDestacado && <div className="nx-badge-item"><Icon path={mdiStar} size={0.6} /> Destaque</div>}
                  {(garantia || vendedorVerificado) && <div className="nx-badge-item"><Icon path={mdiShieldCheckOutline} size={0.6} /> {garantia || 'Garantia'}</div>}
                  {aceitaRetoma && <div className="nx-badge-item"><Icon path={mdiSwapHorizontal} size={0.6} /> Aceita Retoma</div>}
                </div>

                {isDono ? (
                  <div className="owner-box" style={{ background: '#eff6ff', padding: 16, borderRadius: 12, border: '1px solid #bfdbfe' }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: '#2563eb', marginBottom: 12, textTransform: 'uppercase' }}>Gestão</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {podeEditarAnuncioAtivo ? (
                        <Link to={`/editar/${id}`} style={{ flex: 1, padding: 10, textAlign: 'center', background: '#fff', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: 12, fontWeight: 700, textDecoration: 'none', color: '#0f172a' }}>Editar</Link>
                      ) : (
                        <Link to="/planos" style={{ flex: 1, padding: 10, textAlign: 'center', background: '#fff7ed', border: '1px solid #fed7aa', color: '#9a3412', borderRadius: 8, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>Premium</Link>
                      )}
                      <button onClick={() => setMostrarModalVendido(true)} style={{ flex: 1, padding: 10, background: '#102f50', color: '#fff', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Vendido</button>
                    </div>
                  </div>
                ) : (
                  <>
                    {mostrarTelefone ? (
                      <a href={temTelefoneContacto ? `tel:${telefoneContacto}` : `mailto:${emailContacto}`} className="contact-revealed" style={{ background: '#f8fafc', padding: 16, borderRadius: 12, border: '2px dashed #cbd5e1', textAlign: 'center', textDecoration: 'none', display: 'block', marginBottom: 12 }}>
                        <div style={{ fontSize: 10, color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>Contactar via</div>
                        <div style={{ fontSize: 18, color: '#0f172a', fontWeight: 800 }}>{temTelefoneContacto ? telefoneContacto : 'Email'}</div>
                      </a>
                    ) : (
                      <button className="btn-contact" onClick={() => setMostrarTelefone(true)}>
                        <Icon path={temTelefoneContacto ? mdiPhone : mdiEmailOutline} size={0.8} /> Contactar
                      </button>
                    )}
                  </>
                )}
              </div>

              <Link to={`/vendedor/${donoDoAnuncio?._id}`} className="seller-panel">
                <div className="seller-avatar">{donoDoAnuncio?.avatarUrl ? <img src={donoDoAnuncio.avatarUrl} alt="" /> : inicial}</div>
                <div className="seller-info">
                  <div className="seller-name">{donoDoAnuncio?.nome || 'Utilizador'} {vendedorVerificado && <Icon path={mdiCheckDecagram} size={0.7} color="#3b82f6" />}</div>
                  <div className="seller-meta">
                    {rating > 0 ? (
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: 2 }}><Icon path={mdiStar} size={0.5} /> {rating.toFixed(1)}</span>
                    ) : (
                      <span style={{ fontSize: 11, color: '#64748b' }}>Novo Vendedor</span>
                    )}
                  </div>
                </div>
                <Icon path={mdiChevronRight} size={1} color="#94a3b8" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {!isDono && (
        <div className="mobile-cta-bar">
          <div className="mobile-cta-price">{preco}</div>
          <button type="button" className="mobile-cta-btn" onClick={() => setMostrarTelefone(true)}>Contactar</button>
        </div>
      )}
    </div>
  );
}