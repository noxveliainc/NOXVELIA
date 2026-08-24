import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { getFunnelSessionId, trackFunnelEvent } from '../../utils/funnelAnalytics';
import { useAuth } from '../../context/AuthContext';
import { getVideoEmbedData } from '../../utils/videoEmbed';
import AdBanner from '../../components/AdBanner';
import Seo from '../../components/Seo';
import { absoluteUrl, anuncioPath } from '../../utils/seo';
import { normalizarExtras } from '../../utils/extras';
import { getImageDimensions, getImageSrcSet, getImageUrl } from '../../utils/images';
import { formatarMarcaVeiculo, formatarModeloVeiculo } from '../../data/marcasModelos';
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
  let digitos = String(raw).replace(/\D/g, '');
  if (!digitos) return null;
  if (digitos.startsWith('00')) digitos = digitos.slice(2);
  if (digitos.startsWith('0') && digitos.length === 10) digitos = digitos.slice(1);
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
  const [minhaAvaliacao, setMinhaAvaliacao] = useState(null);
  const [avaliacaoSelecionada, setAvaliacaoSelecionada] = useState(0);
  const [avaliandoVendedor, setAvaliandoVendedor] = useState(false);
  const [erroAvaliacao, setErroAvaliacao] = useState('');
  const [sucessoAvaliacao, setSucessoAvaliacao] = useState('');
  const touchStartX = useRef(null);

  const vendedorIdAvaliacao = anuncio?.utilizador?._id || anuncio?.user?._id;
  const userIdAtual = user?.id || user?._id;

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setFotoActiva(0);
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
            api.post(`/anuncios/${id}/visita`, { sessionId: getFunnelSessionId() }).catch(() => sessionStorage.removeItem(visitKey));
          }
        } catch {
          api.post(`/anuncios/${id}/visita`, { sessionId: getFunnelSessionId() }).catch(() => {});
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

  useEffect(() => {
    if (!signed || !vendedorIdAvaliacao || userIdAtual === vendedorIdAvaliacao) {
      setMinhaAvaliacao(null);
      setAvaliacaoSelecionada(0);
      return undefined;
    }

    let ativo = true;
    api.get(`/users/${vendedorIdAvaliacao}/minha-avaliacao`)
      .then(({ data }) => {
        if (!ativo) return;
        setMinhaAvaliacao(data || null);
        setAvaliacaoSelecionada(Number(data?.nota || 0));
      })
      .catch(() => {
        if (ativo) {
          setMinhaAvaliacao(null);
          setAvaliacaoSelecionada(0);
        }
      });

    return () => { ativo = false; };
  }, [signed, vendedorIdAvaliacao, userIdAtual]);

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

  const registarContacto = (canal = 'contacto') => {
    const listingId = anuncio?._id || id;
    if (!listingId) return;
    const key = `@Noxvelia:contact:${listingId}:${canal}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, '1');
    } catch {}
    api.post(`/anuncios/${listingId}/contacto`, { canal, sessionId: getFunnelSessionId() }).catch(() => {
      try { sessionStorage.removeItem(key); } catch {}
    });
  };

  const revelarContactos = () => {
    setMostrarTelefone(true);
    registarContacto(temTelefoneContacto ? 'phone_reveal' : 'email_reveal');
  };

  const submeterAvaliacaoVendedor = async (nota) => {
    if (!signed) {
      setErroAvaliacao('Inicia sessão para avaliar este vendedor.');
      return;
    }
    if (!vendedorIdAvaliacao || userIdAtual === vendedorIdAvaliacao) {
      setErroAvaliacao('Não podes avaliar o teu próprio anúncio.');
      return;
    }

    setAvaliandoVendedor(true);
    setErroAvaliacao('');
    setSucessoAvaliacao('');
    setAvaliacaoSelecionada(nota);

    try {
      const { data } = await api.post(`/users/${vendedorIdAvaliacao}/avaliar`, { nota, anuncioId: id });
      setMinhaAvaliacao((atual) => ({ ...(atual || {}), nota }));
      setAnuncio((atual) => {
        if (!atual) return atual;
        const chaveVendedor = atual.utilizador ? 'utilizador' : 'user';
        return {
          ...atual,
          [chaveVendedor]: {
            ...atual[chaveVendedor],
            rating: data.rating,
            totalAvaliacoes: data.totalAvaliacoes,
          },
        };
      });
      setSucessoAvaliacao(data.mensagem || 'Avaliação registada.');
    } catch (error) {
      setErroAvaliacao(error.response?.data?.erro || 'Não foi possível registar a avaliação.');
    } finally {
      setAvaliandoVendedor(false);
    }
  };

  const handleConfirmarVendido = async () => {
    setEliminandoVendido(true);
    try {
      await api.patch(`/anuncios/${id}/estado`, { estado: 'vendido' });
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
            </div>
            <div>
              <div className="skl" style={{ height: 280, borderRadius: 20 }} />
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
        <button onClick={() => navigate(-1)} style={{ padding: '12px 24px', borderRadius: '12px', background: '#0f172a', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Voltar Atrás</button>
        <Link to="/" style={{ padding: '12px 24px', borderRadius: '12px', background: '#ffffff', color: '#0f172a', border: '1px solid #cbd5e1', fontWeight: 700, textDecoration: 'none' }}>Página Inicial</Link>
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
  const precoPorM2 = !isCarro && anuncio.imovel?.area ? `${formatarMoeda(Math.round(precoValor / anuncio.imovel.area))}/m²` : null;

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
  const temVaranda = anuncio.imovel?.varanda || extrasOpcionais.some((extra) => extra.toLowerCase().includes('varanda'));

  const valorAnoMes = anuncio.carro?.ano ? (anuncio.carro?.mesRegisto ? `${anuncio.carro.mesRegisto} / ${anuncio.carro.ano}` : anuncio.carro.ano) : null;
  const vin = anuncio.carro?.vin;
  const carVerticalLink = vin ? `https://www.carvertical.deal/27H3X8P/CXW7M6/?uid=332&source_id=AFF&sub1=noxvelia&sub3=${encodeURIComponent(vin)}` : 'https://www.carvertical.deal/27H3X8P/CXW7M6/?source_id=AFF&sub1=noxvelia';

  const specs = isCarro ? [
    { label: 'Marca', value: formatarMarcaVeiculo(anuncio.carro), icon: mdiCar },
    { label: 'Modelo', value: formatarModeloVeiculo(anuncio.carro), icon: mdiCar },
    { label: 'Versão', value: anuncio.carro?.versao, icon: mdiFileDocumentOutline },
    { label: 'Mês / Ano', value: valorAnoMes, icon: mdiCalendarBlank },
    { label: 'Quilometragem', value: anuncio.carro?.km != null ? `${new Intl.NumberFormat('pt-PT').format(anuncio.carro.km)} km` : null, icon: mdiSpeedometer },
    { label: 'Transmissão', value: formatarValorAuto(anuncio.carro?.transmissao, VALORES_TRANSMISSAO_CARRO), icon: mdiCarShiftPattern },
    { label: 'Cilindrada', value: anuncio.carro?.cilindrada ? `${new Intl.NumberFormat('pt-PT').format(anuncio.carro.cilindrada)} cm³` : null, icon: mdiEngineOutline },
    { label: 'Potência', value: anuncio.carro?.potencia ? `${anuncio.carro.potencia} cv` : null, icon: mdiEngineOutline },
    { label: 'Cor', value: anuncio.carro?.cor, icon: mdiCar },
    { label: 'Portas', value: anuncio.carro?.portas, icon: mdiCar },
    { label: 'Lugares', value: anuncio.carro?.lugares, icon: mdiCar },
    { label: 'Combustível', value: formatarValorAuto(anuncio.carro?.combustivel, VALORES_COMBUSTIVEL_CARRO), icon: mdiGasStation },
  ] : [
    { label: 'Tipo', value: anuncio.imovel?.tipoImovel, icon: mdiHomeCityOutline },
    { label: 'Tipologia', value: anuncio.imovel?.tipologia, icon: mdiHomeCityOutline },
    { label: 'Área útil', value: anuncio.imovel?.area ? `${anuncio.imovel.area} m²` : null, icon: mdiRulerSquare },
    { label: 'Quartos', value: anuncio.imovel?.quartos, icon: mdiBedOutline },
    { label: 'Casas de banho', value: anuncio.imovel?.casasBanho, icon: mdiShower },
    { label: 'Cert. Energético', value: anuncio.imovel?.certificadoEnergetico, icon: mdiCertificateOutline },
  ];

  const especificacoesVisiveis = specs.filter(s => s.value != null && s.value !== '');
  const gruposExtras = agruparExtras(extrasOpcionais, isCarro);
  const valorFinanciado = Math.max(0, precoValor - entrada);
  const taxaMensal = 0.079 / 12;
  const prestacaoMensal = valorFinanciado > 0 ? Math.round((valorFinanciado * taxaMensal) / (1 - Math.pow(1 + taxaMensal, -meses))) : 0;

  const accent = '#102f50';
  const garantia = anuncio.garantia;
  const aceitaRetoma = anuncio.aceitaRetoma;
  const rating = donoDoAnuncio?.rating || 0;
  const totalAvaliacoes = donoDoAnuncio?.totalAvaliacoes || 0;
  const anoRegistoUser = donoDoAnuncio?.createdAt ? new Date(donoDoAnuncio.createdAt).getFullYear() : new Date().getFullYear();
  const vendedorVerificado = donoDoAnuncio?.tipo === 'admin';
  const contactoConfirmado = donoDoAnuncio?.verificado === true || vendedorVerificado;
  const contaProfissionalConfirmada = donoDoAnuncio?.tipoConta === 'profissional' || vendedorVerificado;
  const nomePublicoVendedor = vendedorVerificado ? (donoDoAnuncio.nome?.toUpperCase().includes('NOXVELIA') ? donoDoAnuncio.nome : `NOXVELIA ${donoDoAnuncio?.nome}`) : (donoDoAnuncio?.nome || 'Particular');
  const mensagemWhatsapp = encodeURIComponent(`Olá, vi o anúncio "${anuncio.titulo}" na Noxvelia (${preco}, ${localizacaoString}) e queria saber se ainda está disponível.`);
  const referencia = anuncio._id?.slice(-6).toUpperCase();
  const dataPublicacao = anuncio.createdAt ? new Date(anuncio.createdAt).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' }) : null;

  return (
    <>
      <Seo title={`${anuncio.titulo} | Noxvelia`} description={(anuncio.descricao || `${anuncio.titulo} em ${localizacaoString}`).slice(0, 160)} path={anuncioPath(anuncio)} image={fotoPrincipalUrl} type="product" />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        .ano-page { background: #f4f7f3; color: #102326; min-height: calc(100vh - 72px); padding: 28px 20px 100px; font-family: 'Inter', sans-serif; overflow-x: hidden; width: 100%; }
        .ano-container { width: min(1200px, 100%); margin: 0 auto; }
        .ano-breadcrumb { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
        .ano-back { display: inline-flex; align-items: center; gap: 6px; color: #4f646a; font-size: 12px; font-weight: 700; text-transform: uppercase; text-decoration: none; }
        .ano-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(340px, 380px); gap: 28px; align-items: start; }
        @media (max-width: 960px) { .ano-grid { grid-template-columns: 1fr; } }
        
        .gallery-wrap { border-radius: 20px; overflow: hidden; background: #ffffff; border: 1px solid #dfe8e4; margin-bottom: 20px; }
        .gallery-main { position: relative; width: 100%; aspect-ratio: 16/9; background: #e8f0ed; cursor: zoom-in; }
        .gallery-main img { width: 100%; height: 100%; object-fit: cover; display: block; }
        
        .title-block { background: #ffffff; border: 1px solid #dfe8e4; border-radius: 18px; padding: 24px; margin-bottom: 20px; }
        .listing-price { font-family: 'Space Grotesk', sans-serif; font-size: 34px; font-weight: 900; color: #102326; margin-bottom: 6px; }
        .listing-subtitle { font-size: 20px; font-weight: 800; color: #102326; margin-bottom: 12px; line-height: 1.3; }
        
        .specs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; margin-top: 16px; }
        .spec-card { background: #ffffff; border: 1px solid #dfe8e4; border-radius: 12px; padding: 14px; }
        .spec-label { font-size: 10px; font-weight: 800; text-transform: uppercase; color: #7b8b90; margin-bottom: 4px; font-family: 'JetBrains Mono', monospace; }
        .spec-value { font-size: 14px; font-weight: 700; color: #102326; }

        .price-panel { background: #ffffff; border: 1px solid #dfe8e4; border-radius: 20px; padding: 24px; box-shadow: 0 12px 32px rgba(16,35,38,0.04); position: sticky; top: 24px; }
        .btn-contact { width: 100%; padding: 16px; background: #168b82; color: #fff; border: none; border-radius: 12px; font-weight: 800; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
        .btn-whatsapp { width: 100%; padding: 16px; background: #25d366; color: #fff; border: none; border-radius: 12px; font-weight: 800; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; text-transform: uppercase; letter-spacing: 0.05em; text-decoration: none; margin-bottom: 12px; }

        /* STICKY BOTTOM BAR MOBILE (Conversão Máxima) */
        .mobile-sticky-cta { display: none; position: fixed; bottom: 0; left: 0; right: 0; background: #ffffff; border-top: 1px solid #dfe8e4; padding: 12px 16px; z-index: 999; align-items: center; justify-content: space-between; box-shadow: 0 -10px 25px rgba(0,0,0,0.08); }
        @media(max-width: 960px) {
          .mobile-sticky-cta { display: flex; }
        }
      `}</style>

      {/* LIGHTBOX MODAL */}
      {lightboxAberto && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(16,35,38,0.95)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setLightboxAberto(false)}>
          <button type="button" onClick={() => setLightboxAberto(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'transparent', border: 0, color: '#fff', cursor: 'pointer' }}><Icon path={mdiClose} size={1.5} /></button>
          <img src={fotoActivaOriginalUrl} alt="" style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }} />
        </div>
      )}

      {/* MODAL VENDIDO */}
      {mostrarModalVendido && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(16,35,38,0.6)', backdropFilter: 'blur(6px)', zIndex: 9999, display: 'grid', placeItems: 'center', padding: 20 }}>
          <div style={{ background: '#fff', padding: 36, borderRadius: 20, maxWidth: 420, textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 22, margin: '0 0 12px' }}>Marcar como Vendido?</h3>
            <p style={{ color: '#4f646a', fontSize: 14, margin: '0 0 24px' }}>O anúncio passará a constar como concluído e será retirado das pesquisas ativas.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setMostrarModalVendido(false)} style={{ flex: 1, padding: 12, borderRadius: 10, border: '1px solid #dfe8e4', background: '#fff', fontWeight: 700, cursor: 'pointer' }}>Cancelar</button>
              <button onClick={handleConfirmarVendido} disabled={eliminandoVendido} style={{ flex: 1, padding: 12, borderRadius: 10, border: 0, background: '#ef4444', color: '#fff', fontWeight: 800, cursor: 'pointer' }}>Confirmar</button>
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
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={handlePartilhar} style={{ width: 36, height: 36, borderRadius: 10, background: '#fff', border: '1px solid #dfe8e4', display: 'grid', placeItems: 'center', cursor: 'pointer' }}><Icon path={mdiShareVariantOutline} size={0.8} /></button>
              {!isDono && (
                <button onClick={toggleGuardado} style={{ width: 36, height: 36, borderRadius: 10, background: '#fff', border: '1px solid #dfe8e4', display: 'grid', placeItems: 'center', cursor: 'pointer', color: guardado ? '#ef4444' : 'inherit' }}><Icon path={guardado ? mdiHeart : mdiHeartOutline} size={0.8} /></button>
              )}
            </div>
          </div>

          <div className="ano-grid">
            
            {/* COLUNA ESQUERDA: FOTOS E DETALHES */}
            <div>
              <div className="gallery-wrap">
                <div className="gallery-main" onClick={() => setLightboxAberto(true)}>
                  {fotoActivaLargeUrl ? (
                    <img src={fotoActivaLargeUrl} alt={anuncio.titulo} />
                  ) : (
                    <div style={{ display: 'grid', placeItems: 'center', height: '100%', color: '#7b8b90' }}><Icon path={isCarro ? mdiCar : mdiHomeCityOutline} size={3} /></div>
                  )}
                </div>
              </div>

              <div className="title-block">
                <div className="listing-price">{preco}</div>
                <div className="listing-subtitle">{anuncio.titulo}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#4f646a', fontSize: '13px', fontWeight: 600 }}>
                  <span><Icon path={mdiMapMarkerOutline} size={0.7} /> {localizacaoString}</span>
                  <span>·</span>
                  <span><Icon path={mdiEyeOutline} size={0.7} /> {anuncio.visitas || 0} visualizações</span>
                </div>
              </div>

              <div className="title-block">
                <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', margin: '0 0 12px' }}>Especificações</h3>
                <div className="specs-grid">
                  {especificacoesVisiveis.map((s, i) => (
                    <div key={i} className="spec-card">
                      <div className="spec-label"><Icon path={s.icon} size={0.65} /> {s.label}</div>
                      <div className="spec-value">{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="title-block">
                <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', margin: '0 0 12px' }}>Descrição</h3>
                <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, color: '#4f646a', fontSize: '14px', margin: 0 }}>{anuncio.descricao || 'Sem descrição detalhada.'}</p>
              </div>
            </div>

            {/* COLUNA DIREITA: CONTACTOS E PREÇO (SIDEBAR) */}
            <div>
              <div className="price-panel">
                <div style={{ fontSize: '28px', fontFamily: 'Space Grotesk', fontWeight: 900, color: '#102326', marginBottom: 16 }}>{preco}</div>

                {isDono ? (
                  <div style={{ background: '#f8faf7', border: '1px solid #dfe8e4', borderRadius: 14, padding: 16 }}>
                    <strong style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', marginBottom: 8, color: '#4f646a' }}>Gestão do Anúncio</strong>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Link to={`/editar/${id}`} style={{ flex: 1, padding: 10, background: '#fff', border: '1px solid #dfe8e4', borderRadius: 8, textAlign: 'center', fontWeight: 700, textDecoration: 'none', color: '#102326', fontSize: 13 }}>Editar</Link>
                      <button onClick={() => setMostrarModalVendido(true)} style={{ flex: 1, padding: 10, background: '#102326', color: '#fff', border: 0, borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>Vendido</button>
                    </div>
                  </div>
                ) : (
                  <>
                    {mostrarTelefone ? (
                      <div>
                        <a href={`tel:${telefoneContacto}`} className="btn-contact" style={{ background: '#102326', textDecoration: 'none' }}>
                          <Icon path={mdiphonen} size={0.8} /> {telefoneContacto}
                        </a>
                        {whatsappNumero && (
                          <a href={`https://wa.me/${whatsappNumero}?text=${mensagemWhatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                            <Icon path={mdiWhatsapp} size={0.85} /> Enviar Mensagem WhatsApp
                          </a>
                        )}
                      </div>
                    ) : (
                      <button type="button" className="btn-contact" onClick={revelarContactos}>
                        <Icon path={mdiphonen} size={0.8} /> Revelar Contactos
                      </button>
                    )}
                  </>
                )}

                <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #dfe8e4', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#e8f0ed', display: 'grid', placeItems: 'center', fontWeight: 800 }}>{inicial}</div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '14px', color: '#102326' }}>{nomePublicoVendedor}</strong>
                    <span style={{ fontSize: '12px', color: '#4f646a' }}>Membro desde {anoRegistoUser}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Sugeridos */}
          {sugeridos.length > 0 && (
            <div style={{ marginTop: '48px' }}>
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '20px', marginBottom: '20px' }}>Poderá gostar também</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
                {sugeridos.map(s => <AnuncioCard key={s._id} anuncio={s} />)}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* BARRA STICKY FLUTUANTE EM MOBILE (Conversão garantida ao scrollar) */}
      {!isDono && (
        <div className="mobile-sticky-cta">
          <div>
            <span style={{ display: 'block', fontSize: '11px', color: '#7b8b90', fontWeight: 700 }}>Preço</span>
            <strong style={{ fontFamily: 'Space Grotesk', fontSize: '18px', color: '#102326' }}>{preco}</strong>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {whatsappNumero && (
              <a href={`https://wa.me/${whatsappNumero}?text=${mensagemWhatsapp}`} target="_blank" rel="noopener noreferrer" style={{ width: 42, height: 42, borderRadius: 12, background: '#25d366', color: '#fff', display: 'grid', placeItems: 'center', textDecoration: 'none' }}>
                <Icon path={mdiWhatsapp} size={1} />
              </a>
            )}
            <button onClick={revelarContactos} style={{ padding: '0 20px', height: 42, borderRadius: 12, background: '#168b82', color: '#fff', border: 0, fontWeight: 800, fontSize: 13 }}>
              Contactar
            </button>
          </div>
        </div>
      )}
    </>
  );
}