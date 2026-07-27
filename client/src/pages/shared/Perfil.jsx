import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import AnuncioCard from '../../pages/shared/AnuncioCard';
import ProfileView, { obterLinksVisiveisPerfil } from './ProfileView';
import LoadingScreen from '../../components/LoadingScreen';
import { Icon } from '@mdi/react';
import { 
  mdiCheckDecagram, mdiChartBar, mdiShareVariantOutline, mdiDomain, 
  mdiClose, mdiCrown, mdiStar, mdiChevronLeft, mdiPencil, mdiEarth,
  mdiWeb, mdiInstagram, mdiFacebook, mdiLinkedin, mdiYoutube, mdiMusicNote, mdiWhatsapp,
  mdiPlus, mdiTrashCanOutline
} from '@mdi/js';
import { getImageUrl, normalizeUploadedImages } from '../../utils/images';

const TIPOS_LINK_PERFIL = [
  { value: 'website', label: 'Website', icon: mdiWeb, placeholder: 'Ex: https://www.teusite.pt' },
  { value: 'instagram', label: 'Instagram', icon: mdiInstagram, placeholder: 'Ex: https://instagram.com/oteuperfil' },
  { value: 'facebook', label: 'Facebook', icon: mdiFacebook, placeholder: 'Ex: https://facebook.com/oteuperfil' },
  { value: 'linkedin', label: 'LinkedIn', icon: mdiLinkedin, placeholder: 'Ex: https://linkedin.com/in/oteuperfil' },
  { value: 'youtube', label: 'YouTube', icon: mdiYoutube, placeholder: 'Ex: https://youtube.com/@oteucanal' },
  { value: 'tiktok', label: 'TikTok', icon: mdiMusicNote, placeholder: 'Ex: https://tiktok.com/@oteuperfil' },
  { value: 'whatsapp', label: 'WhatsApp', icon: mdiWhatsapp, placeholder: 'Ex: 912345678 ou https://wa.me/351912345678' },
  { value: 'outro', label: 'Outro', icon: mdiEarth, placeholder: 'Ex: https://www.outrolink.pt' },
];

const criarLinkPerfilVazio = () => ({ tipo: 'website', url: '' });

const obterMetaLinkPerfil = (tipo) => (
  TIPOS_LINK_PERFIL.find((opcao) => opcao.value === tipo) || TIPOS_LINK_PERFIL[TIPOS_LINK_PERFIL.length - 1]
);

const prepararLinksParaEdicao = (linksPerfil, website) => {
  const links = Array.isArray(linksPerfil)
    ? linksPerfil.filter((link) => link?.url).slice(0, 3)
    : [];

  if (links.length > 0) return links.map((link) => ({ tipo: link.tipo || 'outro', url: link.url || '' }));
  if (website) return [{ tipo: 'website', url: website }];
  return [criarLinkPerfilVazio()];
};

const normalizarHref = (url) => {
  if (!url) return '#';
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

const normalizarHrefLinkPerfil = (link) => {
  if (link?.tipo !== 'whatsapp') return normalizarHref(link?.url);

  const digitos = String(link.url || '').replace(/\D/g, '');
  if (!digitos) return '#';
  const numero = digitos.length === 9 ? `351${digitos}` : digitos;
  return `https://wa.me/${numero}`;
};

const formatarTextoLink = (link) => {
  if (link.tipo === 'whatsapp') return 'WhatsApp';

  const href = normalizarHrefLinkPerfil(link);
  try {
    const url = new URL(href);
    const primeiroSegmento = url.pathname.split('/').filter(Boolean)[0];
    if (['instagram', 'tiktok'].includes(link.tipo) && primeiroSegmento) {
      return `@${primeiroSegmento.replace(/^@/, '')}`;
    }
    return url.hostname.replace(/^www\./, '');
  } catch {
    return String(link.url).replace(/(^\w+:|^)\/\//, '');
  }
};

export default function Perfil() {
  const { user, signed, atualizarAvatar, atualizarUser, logout: limparSessaoGlobal } = useAuth();
  const navigate = useNavigate();
  
  const fileInputAvatarRef = useRef(null);
  const fileInputCapaRef = useRef(null);

  const contextoVisualAtual = localStorage.getItem('@App:contexto_visual') || 'imovel';

  const [utilizador, setUtilizador] = useState(null);
  const [anuncios, setAnuncios] = useState([]);
  const [abaActiva, setAbaActiva] = useState(contextoVisualAtual); 
  
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingCapa, setUploadingCapa] = useState(false);
  const [erro, setErro] = useState(null);
  const [linkCopiado, setLinkCopiado] = useState(false);
  
  const [anuncioAnalisado, setAnuncioAnalisado] = useState(null);
  const [dadosGrafico, setDadosGrafico] = useState(null);

  // Modais
  const [mostrarModalEvolucao, setMostrarModalEvolucao] = useState(false);
  const [dadosEvolucao, setDadosEvolucao] = useState({ nomeEmpresa: '', nif: '', website: '' });

  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [dadosEditar, setDadosEditar] = useState({
    bio: '',
    website: '',
    localidade: '',
    standNome: '',
    standMorada: '',
    standCodigoPostal: '',
    mostrarTelefonePublico: true,
    mostrarMapaPerfil: false,
    linksPerfil: [criarLinkPerfilVazio()]
  });

  const rotaVoltar = abaActiva === 'carro' ? '/carros' : '/imoveis';
  const labelVoltar = abaActiva === 'carro' ? 'Automóveis' : 'Imóveis';

  useEffect(() => {
    if (!signed) { navigate('/login'); return; }
    if (user) setUtilizador(user);

    let isMounted = true;
    const carregarDados = async () => {
      try {
        const [resUser, resAnuncios] = await Promise.all([
          api.get('/users/me'),
          api.get('/users/me/anuncios'),
        ]);
        if (!isMounted) return;
        setUtilizador(resUser.data);
        setAnuncios(resAnuncios.data);
        setLoading(false);
      } catch (err) {
        if (!isMounted) return;
        if (err.response?.status === 401 || err.response?.status === 403) {
          limparSessaoGlobal(); navigate('/login');
        } else {
          setErro('Não foi possível carregar os teus dados.');
          setLoading(false);
        }
      }
    };
    carregarDados();
    return () => { isMounted = false; };
  }, [navigate, signed, user, limparSessaoGlobal]);

  const handleLogout = () => { limparSessaoGlobal(); navigate('/', { replace: true }); };

  // UPLOAD DO AVATAR
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const formData = new FormData();
      formData.append('imagens', file);
      formData.append('kind', 'avatar');
      const uploadRes = await api.post('/upload/imagens', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      const novaImagem = normalizeUploadedImages(uploadRes.data)[0];
      const novaUrl = getImageUrl(novaImagem, 'large') || uploadRes.data.url;
      const updateRes = await api.put('/users/me', { avatarUrl: novaUrl });
      if (atualizarAvatar) atualizarAvatar(novaUrl);
      setUtilizador(updateRes.data);
    } catch {
      alert('Erro ao processar a imagem do avatar.');
    } finally {
      setUploadingAvatar(false);
    }
  };

  // UPLOAD DA CAPA
  const handleCapaChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingCapa(true);
    try {
      const formData = new FormData();
      formData.append('imagens', file);
      formData.append('kind', 'cover');
      const uploadRes = await api.post('/upload/imagens', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      const novaImagem = normalizeUploadedImages(uploadRes.data)[0];
      const novaUrl = getImageUrl(novaImagem, 'large') || uploadRes.data.url;
      const updateRes = await api.put('/users/me', { capaUrl: novaUrl });
      setUtilizador(updateRes.data);
      if (atualizarUser) atualizarUser(updateRes.data);
    } catch {
      alert('Erro ao processar a imagem de capa.');
    } finally {
      setUploadingCapa(false);
    }
  };

  // EVOLUÇÃO DA CONTA
  const promoverParaProfissional = async (e) => {
    e.preventDefault();
    if (!dadosEvolucao.nomeEmpresa) { alert('O Nome da Empresa é obrigatório.'); return; }
    try {
      setMostrarModalEvolucao(false);
      setIsDeleting(true);
      const res = await api.put('/users/me', { 
        tipoConta: 'profissional',
        nome: dadosEvolucao.nomeEmpresa, 
        nif: dadosEvolucao.nif,
        website: dadosEvolucao.website
      });
      setUtilizador(res.data);
      if (atualizarUser) atualizarUser(res.data);
      alert('A tua conta foi evoluída para Profissional com sucesso.');
    } catch {
      alert('Ocorreu um erro ao evoluir a tua conta.');
    } finally {
      setIsDeleting(false);
    }
  };

  // EDIÇÃO DE PERFIL
  const abrirEdicaoPerfil = () => {
    setDadosEditar({
      bio: utilizador?.bio || '',
      website: utilizador?.website || '',
      localidade: utilizador?.localidade || '',
      standNome: utilizador?.standNome || '',
      standMorada: utilizador?.standMorada || '',
      standCodigoPostal: utilizador?.standCodigoPostal || '',
      mostrarTelefonePublico: utilizador?.mostrarTelefonePublico !== false,
      mostrarMapaPerfil: utilizador?.mostrarMapaPerfil === true,
      linksPerfil: prepararLinksParaEdicao(utilizador?.linksPerfil, utilizador?.website)
    });
    setMostrarModalEditar(true);
  };

  const atualizarLinkPerfil = (index, campo, valor) => {
    setDadosEditar(prev => ({
      ...prev,
      linksPerfil: prev.linksPerfil.map((link, i) => (
        i === index ? { ...link, [campo]: valor } : link
      ))
    }));
  };

  const adicionarLinkPerfil = () => {
    setDadosEditar(prev => {
      if (prev.linksPerfil.length >= 3) return prev;
      return { ...prev, linksPerfil: [...prev.linksPerfil, criarLinkPerfilVazio()] };
    });
  };

  const removerLinkPerfil = (index) => {
    setDadosEditar(prev => {
      const linksAtualizados = prev.linksPerfil.filter((_, i) => i !== index);
      return { ...prev, linksPerfil: linksAtualizados.length ? linksAtualizados : [criarLinkPerfilVazio()] };
    });
  };

  const salvarPerfil = async (e) => {
    e.preventDefault();
    const linksPerfil = dadosEditar.linksPerfil
      .map((link) => ({ tipo: link.tipo || 'outro', url: (link.url || '').trim() }))
      .filter((link) => link.url)
      .slice(0, 3);
    const websitePrincipal = linksPerfil.find((link) => link.tipo === 'website')?.url || '';

    try {
      setIsDeleting(true);
      setMostrarModalEditar(false);
      const res = await api.put('/users/me', {
        bio: dadosEditar.bio,
        localidade: dadosEditar.localidade,
        standNome: dadosEditar.standNome,
        standMorada: dadosEditar.standMorada,
        standCodigoPostal: dadosEditar.standCodigoPostal,
        mostrarTelefonePublico: dadosEditar.mostrarTelefonePublico,
        mostrarMapaPerfil: dadosEditar.mostrarMapaPerfil,
        website: websitePrincipal,
        linksPerfil
      });
      setUtilizador(res.data);
      if (atualizarUser) atualizarUser(res.data);
    } catch {
      alert('Erro ao guardar as alterações do perfil.');
    } finally {
      setIsDeleting(false);
    }
  };

  const verAnalytics = async (idAnuncio) => {
    if (anuncioAnalisado === idAnuncio) { setAnuncioAnalisado(null); setDadosGrafico(null); return; }
    setAnuncioAnalisado(idAnuncio);
    try {
      const { data } = await api.get(`/analytics/anuncio/${idAnuncio}`);
      setDadosGrafico(data);
    } catch {
      alert('Erro ao carregar dados.');
      setAnuncioAnalisado(null);
    }
  };

  const handleAnuncioEliminado = (idApagado) => {
    setIsDeleting(true);
    setAnuncios(prev => prev.filter(a => a._id !== idApagado));
    setTimeout(() => setIsDeleting(false), 800);
  };

  const copiarLinkMontra = () => {
    const link = `${window.location.origin}/vendedor/${utilizador._id}`;
    navigator.clipboard.writeText(link);
    setLinkCopiado(true);
    setTimeout(() => setLinkCopiado(false), 2000);
  };

  const anunciosFiltrados = anuncios.filter(a => a.tipo === abaActiva);
  const totalImoveis = anuncios.filter(a => a.tipo === 'imovel').length;
  const totalCarros = anuncios.filter(a => a.tipo === 'carro').length;
  const linksPerfilVisiveis = obterLinksVisiveisPerfil(utilizador);
  const anunciosAtivosPerfil = anuncios.filter(a => a.estado !== 'apagado');
  const totalDestacadosPerfil = anunciosAtivosPerfil.filter(a => a.destacado).length;
  const totalVisitasPerfil = anunciosAtivosPerfil.reduce((total, anuncio) => total + Number(anuncio.visitas || 0), 0);
  const totalGuardadosPerfil = anunciosAtivosPerfil.reduce((total, anuncio) => total + Number(anuncio.guardados || 0), 0);
  const totalContactosPerfil = anunciosAtivosPerfil.reduce((total, anuncio) => total + Number(anuncio.contactos || 0), 0);
  const anunciosComScorePerfil = anunciosAtivosPerfil.filter(a => Number(a.scoreQualidade || 0) > 0);
  const mediaQualidadePerfil = anunciosComScorePerfil.length
    ? Math.round((anunciosComScorePerfil.reduce((total, anuncio) => total + Number(anuncio.scoreQualidade || 0), 0) / anunciosComScorePerfil.length) * 10) / 10
    : 0;
  const premiumAtivoPerfil = utilizador?.premiumAtivo === true || utilizador?.tipo === 'admin';
  const formatarMetricaPerfil = (valor) => new Intl.NumberFormat('pt-PT').format(Number(valor || 0));
  const recomendacoesPremium = [
    !utilizador?.bio && 'Adiciona uma bio curta para aumentar confiança antes do primeiro contacto.',
    linksPerfilVisiveis.length === 0 && 'Liga website, WhatsApp ou redes sociais à tua montra pública.',
    totalDestacadosPerfil === 0 && anunciosAtivosPerfil.length > 0 && 'Destaca pelo menos um anúncio para abrir a montra com mais força.',
    mediaQualidadePerfil > 0 && mediaQualidadePerfil < 7 && 'Completa fotos, localização e detalhes técnicos nos anúncios com score baixo.',
    anunciosAtivosPerfil.length === 0 && 'Publica anúncios ativos para a montra aparecer no diretório profissional.',
  ].filter(Boolean).slice(0, 3);

  if (loading) return <LoadingScreen label="A carregar perfil" detail="Estamos a preparar a tua área NOXVELIA." minHeight="100vh" tone="light" />;

  return (
    <>
      <style>{`
        /* RESETS FUNDAMENTAIS MÓVEIS */
        *, *::before, *::after { box-sizing: border-box; }
        .perfil-outer { background: #f8fafc; min-height: calc(100vh - 72px); padding: 40px 24px; display: flex; justify-content: center; font-family: 'Inter', sans-serif; color: #0f172a; width: 100%; max-width: 100vw; overflow-x: hidden; }
        .perfil-moldura { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 32px; width: 100%; max-width: 1100px; padding: 48px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); position: relative; overflow-x: hidden; }
        
        .perfil-back { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: #64748b; text-decoration: none; letter-spacing: .05em; text-transform: uppercase; background: none; border: none; cursor: pointer; padding: 0; transition: color .2s; margin-bottom: 32px; }
        .perfil-back:hover { color: #0f172a; }
        
        .tabs-row { display: flex; gap: 4px; margin-bottom: 28px; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 10px; padding: 4px; width: fit-content; max-width: 100%; overflow-x: auto; }
        .tab-btn { padding: 9px 22px; border: none; border-radius: 7px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all .2s; background: transparent; color: #64748b; white-space: nowrap; }
        .tab-btn.active-imovel { background: #102f50; color: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .tab-btn.active-carro { background: #d9c49c; color: #071326; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        
        .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 24px; width: 100%; }
        .card-wrapper { display: flex; flex-direction: column; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 12px; gap: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); transition: border-color .2s; width: 100%; }
        .card-wrapper:hover { border-color: #cbd5e1; }
        
        .btn-destacar,
        .badge-destacado,
        .analytics-trigger-btn {
          width: 100%;
          min-height: 42px;
          padding: 10px 12px;
          border-radius: 8px;
          box-sizing: border-box;
          font-size: 11px;
          font-weight: 800;
          line-height: 1.2;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .btn-destacar { background: #fefce8; color: #a16207; border: 1px solid #fde047; cursor: pointer; transition: all 0.2s; }
        .btn-destacar:hover { background: #fef08a; }
        .badge-destacado { background: #fefce8; color: #ca8a04; border: 1px dashed #fde047; text-align: center; }
        
        .analytics-trigger-btn { background: #f8fafc; border: 1px dashed #cbd5e1; color: #64748b; cursor: pointer; transition: all 0.2s;}
        .analytics-trigger-btn:hover { border-color: #d9c49c; color: #102f50; background: #fffaf0; }
        
        .analytics-panel { margin-top: 4px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; width: 100%; }
        .stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; width: 100%; }
        .stat-box { text-align: center; }
        .stat-box-val { font-size: 20px; font-weight: 800; color: #0f172a; }
        .stat-box-lbl { font-size: 9px; font-weight: 700; text-transform: uppercase; color: #64748b; }
        
        .chart-row { display: flex; align-items: flex-end; justify-content: space-between; height: 60px; padding-top: 10px; border-top: 1px dashed #cbd5e1; width: 100%; }
        .chart-bar-wrap { display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; }
        .chart-bar { width: 8px; background: #d9c49c; border-radius: 2px 2px 0 0; }
        .chart-day { font-size: 8px; font-weight: 700; color: #64748b; }
        
        .perfil-premium-panel {
          margin: 0 0 32px;
          border: 1px solid rgba(217,196,156,.38);
          border-radius: 20px;
          padding: 22px;
          background: linear-gradient(135deg, rgba(255,255,255,.98), rgba(217,196,156,.1));
          box-shadow: 0 18px 44px -38px rgba(15,23,42,.55);
          width: 100%;
        }
        .perfil-premium-head { display: flex; justify-content: space-between; gap: 18px; align-items: flex-start; margin-bottom: 18px; width: 100%; }
        .perfil-premium-kicker { display: inline-flex; align-items: center; gap: 7px; color: #806040; font-size: 11px; font-weight: 950; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 7px; }
        .perfil-premium-title { margin: 0; color: #102f50; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 22px; line-height: 1.1; font-weight: 900; }
        .perfil-premium-copy { margin: 8px 0 0; color: #475569; font-size: 13px; line-height: 1.55; max-width: 660px; font-weight: 650; }
        .perfil-premium-state { flex-shrink: 0; min-height: 34px; display: inline-flex; align-items: center; gap: 7px; padding: 0 12px; border-radius: 999px; background: #102f50; color: #fffaf0; font-size: 11px; font-weight: 950; text-transform: uppercase; letter-spacing: .06em; }
        .perfil-premium-panel.is-locked .perfil-premium-state { background: #f8fafc; color: #64748b; border: 1px solid #e2e8f0; }
        .perfil-premium-grid { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 10px; width: 100%; }
        .perfil-premium-metric { min-height: 82px; display: grid; align-content: center; gap: 6px; padding: 14px; border: 1px solid rgba(226,232,240,.95); border-radius: 14px; background: rgba(255,255,255,.82); }
        .perfil-premium-metric strong { color: #0f172a; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 24px; line-height: 1; }
        .perfil-premium-metric span { color: #64748b; font-size: 10px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
        .perfil-premium-bottom { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 16px; align-items: end; margin-top: 18px; width: 100%; }
        .perfil-premium-list { display: grid; gap: 7px; margin: 0; padding: 0; list-style: none; }
        .perfil-premium-list li { color: #334155; font-size: 12.5px; line-height: 1.45; font-weight: 700; }
        .perfil-premium-actions { display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-end; }
        .perfil-premium-btn { min-height: 40px; display: inline-flex; align-items: center; justify-content: center; gap: 7px; padding: 0 13px; border-radius: 10px; border: 1px solid #d9c49c; background: #d9c49c; color: #071326; font-size: 12px; font-weight: 900; cursor: pointer; text-transform: uppercase; letter-spacing: .04em; }
        .perfil-premium-btn.secondary { background: #ffffff; color: #102f50; border-color: rgba(16,47,80,.18); }
        .perfil-premium-btn:hover { filter: brightness(.98); }

        /* MODAIS PADRÃO */
        .modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(8px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 24px; overflow-y: auto; width: 100vw; height: 100vh;}
        .modal-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 24px; width: 100%; max-width: 500px; padding: 40px; position: relative; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1); margin: auto; }
        .modal-close { position: absolute; top: 24px; right: 24px; background: transparent; border: none; color: #94a3b8; cursor: pointer; transition: color 0.2s; }
        .modal-close:hover { color: #0f172a; }
        .modal-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 24px; font-weight: 800; color: #0f172a; margin: 0 0 8px; display: flex; align-items: center; gap: 10px; }
        .modal-desc { font-size: 14px; color: #64748b; margin: 0 0 24px; line-height: 1.5; }
        
        .modal-form-group { margin-bottom: 20px; width: 100%; }
        .modal-form-group label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 8px; }
        .modal-input { width: 100%; padding: 14px 16px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; color: #0f172a; outline: none; font-size: 14px; transition: all 0.2s; box-sizing: border-box; font-family: inherit; }
        .modal-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15); }
        .modal-input::placeholder { color: #94a3b8; }
        textarea.modal-input { resize: vertical; min-height: 100px; }

        .links-editor-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 8px; }
        .links-editor-header label { margin-bottom: 0; }
        .links-editor-count { font-size: 11px; color: #94a3b8; font-weight: 700; }
        .link-editor-list { display: flex; flex-direction: column; gap: 10px; width: 100%; }
        .link-editor-row { display: grid; grid-template-columns: 120px minmax(0, 1fr) 40px; gap: 10px; align-items: center; width: 100%; }
        .modal-select { width: 100%; height: 48px; padding: 0 34px 0 12px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; color: #0f172a; outline: none; font-size: 13px; font-weight: 700; font-family: inherit; appearance: none; cursor: pointer; }
        .modal-select-wrap { position: relative; }
        .modal-select-wrap::after { content: '\\25BE'; position: absolute; right: 12px; top: 50%; transform: translateY(-55%); color: #64748b; pointer-events: none; font-size: 14px; line-height: 1; }
        .link-remove-btn { width: 40px; height: 40px; border-radius: 999px; border: 1px solid #e2e8f0; background: #ffffff; color: #94a3b8; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; transition: all .2s; }
        .link-remove-btn:hover { color: #ef4444; border-color: #fecaca; background: #fef2f2; }
        .link-add-btn { margin-top: 12px; display: inline-flex; align-items: center; gap: 8px; background: #f8fafc; color: #2563eb; border: 1px dashed #93c5fd; border-radius: 8px; padding: 10px 12px; font-size: 12px; font-weight: 800; cursor: pointer; text-transform: uppercase; }
        .link-add-btn:hover { background: #eff6ff; }
        .link-add-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .privacy-toggle { display: flex; align-items: flex-start; gap: 12px; padding: 14px; border: 1px solid #e2e8f0; border-radius: 10px; background: #f8fafc; width: 100%; }
        .privacy-toggle input { width: 18px; height: 18px; margin-top: 2px; accent-color: #d9c49c; flex: 0 0 auto; }
        .privacy-toggle-title { display: block; font-size: 13px; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
        .privacy-toggle-text { display: block; font-size: 12px; line-height: 1.45; color: #64748b; text-transform: none; letter-spacing: 0; font-weight: 600; }

        .modal-btn-submit { width: 100%; padding: 16px; background: #3b82f6; color: #ffffff; border: none; border-radius: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; transition: opacity 0.2s; margin-top: 12px; }
        .modal-btn-submit:hover { opacity: 0.9; }

        /* ── CORREÇÕES AGRESSIVAS DO LAYOUT DO PERFIL PARA MOBILE ── */
        @media (max-width: 900px) {
          .perfil-outer { padding: 20px 12px; }
          .perfil-moldura { padding: 24px 16px; border-radius: 20px; }
          .perfil-premium-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .perfil-premium-bottom { grid-template-columns: 1fr; }
          .perfil-premium-actions { justify-content: flex-start; width: 100%; }
          .perfil-premium-btn { flex: 1; }
        }

        @media (max-width: 640px) {
          .perfil-actions { width: 100%; padding-top: 0; }
          .perfil-premium-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .perfil-premium-head { flex-direction: column; align-items: flex-start; gap: 10px; }
          .perfil-premium-title { font-size: 18px; }
          .perfil-premium-panel { padding: 16px; border-radius: 16px; }
          .tabs-row { width: 100%; display: grid; grid-template-columns: 1fr 1fr; }
          .tab-btn { text-align: center; padding: 10px; }
          .modal-card { padding: 24px 16px; border-radius: 18px; }
          .link-editor-row { grid-template-columns: 1fr 40px; }
          .modal-select-wrap { grid-column: 1 / -1; }
          
          /* INJEÇÃO PARA CORRIGIR O PROFILEVIEW (IMAGEM 2) */
          .perfil-moldura [class*="perfil-header"] { border-radius: 16px; overflow: hidden; width: 100%; max-width: 100%; display: flex; flex-direction: column; }
          .perfil-moldura [class*="perfil-body"] { padding: 0 16px 24px !important; flex-direction: column !important; align-items: center !important; text-align: center !important; width: 100%; max-width: 100%; box-sizing: border-box; }
          .perfil-moldura [class*="perfil-avatar-wrap"] { margin-top: -40px !important; align-self: center; }
          .perfil-moldura [class*="perfil-avatar"] { width: 80px !important; height: 80px !important; border-width: 3px !important; }
          .perfil-moldura [class*="perfil-info"] { padding-top: 12px !important; align-items: center !important; width: 100% !important; display: flex; flex-direction: column; }
          .perfil-moldura [class*="perfil-badges-row"] { justify-content: center !important; width: 100%; }
          .perfil-moldura [class*="perfil-name"] { font-size: 20px !important; flex-wrap: wrap; justify-content: center !important; }
          .perfil-moldura [class*="perfil-email"] { font-size: 12px !important; word-break: break-all; }
          .perfil-moldura [class*="perfil-bio"] { text-align: center !important; font-size: 13px !important; padding: 0 10px; }
          .perfil-moldura [class*="perfil-link-row"] { justify-content: center !important; width: 100%; }
          .perfil-moldura [class*="stars-container"] { justify-content: center !important; width: 100%; }
          .perfil-moldura [class*="perfil-stats"] { gap: 16px !important; justify-content: space-around !important; width: 100%; max-width: 100%; flex-wrap: wrap !important; }
          .perfil-moldura [class*="perfil-actions"] { width: 100% !important; padding-top: 16px !important; }
          .perfil-moldura [class*="btn-action-solid"], .perfil-moldura [class*="btn-action-primary"], .perfil-moldura [class*="btn-action-outline"] { width: 100%; }
        }
      `}</style>

      {/* MODAL DE EVOLUÇÃO PARA PROFISSIONAL */}
      {mostrarModalEvolucao && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button className="modal-close" onClick={() => setMostrarModalEvolucao(false)}>
              <Icon path={mdiClose} size={1} />
            </button>
            <h2 className="modal-title"><Icon path={mdiDomain} size={1.2} color="#3b82f6" /> Evolução de Conta</h2>
            <p className="modal-desc">
              Transforma a tua conta num perfil empresarial. Terás direito a uma montra exclusiva com links para o teu website e contactos diretos.
            </p>

            <form onSubmit={promoverParaProfissional}>
              <div className="modal-form-group">
                <label>Nome do Stand / Agência *</label>
                <input 
                  className="modal-input" 
                  type="text" 
                  placeholder="Ex: Stand Vale do Sousa" 
                  value={dadosEvolucao.nomeEmpresa}
                  onChange={e => setDadosEvolucao({...dadosEvolucao, nomeEmpresa: e.target.value})}
                  required
                />
              </div>

              <div className="modal-form-group">
                <label>NIF da Empresa (Opcional)</label>
                <input 
                  className="modal-input" 
                  type="text" 
                  placeholder="Ex: 501234567" 
                  value={dadosEvolucao.nif}
                  onChange={e => setDadosEvolucao({...dadosEvolucao, nif: e.target.value})}
                />
              </div>

              <div className="modal-form-group">
                <label>Website (Opcional)</label>
                <input 
                  className="modal-input" 
                  type="url" 
                  placeholder="Ex: https://www.omeustand.pt" 
                  value={dadosEvolucao.website}
                  onChange={e => setDadosEvolucao({...dadosEvolucao, website: e.target.value})}
                />
              </div>

              <button className="modal-btn-submit" type="submit">
                Confirmar Evolução
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE EDIÇÃO DE PERFIL */}
      {mostrarModalEditar && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button className="modal-close" onClick={() => setMostrarModalEditar(false)}>
              <Icon path={mdiClose} size={1} />
            </button>
            <h2 className="modal-title"><Icon path={mdiPencil} size={1.2} color="#3b82f6" /> Editar Perfil</h2>
            <p className="modal-desc">
              Personaliza a tua presença na plataforma. Adiciona uma biografia, links e a localização que queres mostrar aos compradores.
            </p>

            <form onSubmit={salvarPerfil}>
              <div className="modal-form-group">
                <label>Biografia do Perfil (Máx 800 Carateres)</label>
                <textarea 
                  className="modal-input" 
                  placeholder="Escreve um pouco sobre ti ou sobre o teu stand..." 
                  value={dadosEditar.bio}
                  onChange={e => setDadosEditar({...dadosEditar, bio: e.target.value})}
                  maxLength={800}
                />
              </div>

              <div className="modal-form-group">
                <label>Localidade pública</label>
                <input
                  className="modal-input"
                  type="text"
                  placeholder="Ex: Porto, Lisboa, Lousada"
                  value={dadosEditar.localidade}
                  onChange={e => {
                    const valor = e.target.value;
                    setDadosEditar(prev => ({
                      ...prev,
                      localidade: valor,
                      mostrarMapaPerfil: [valor, prev.standMorada, prev.standCodigoPostal].some(item => String(item || '').trim()) ? prev.mostrarMapaPerfil : false
                    }));
                  }}
                />
              </div>

              <div className="modal-form-group">
                <label>Nome do stand ou agência</label>
                <input
                  className="modal-input"
                  type="text"
                  placeholder="Ex: Noxvelia Porto"
                  value={dadosEditar.standNome}
                  onChange={e => setDadosEditar({ ...dadosEditar, standNome: e.target.value })}
                  maxLength={120}
                />
              </div>

              <div className="modal-form-group">
                <label>Morada do stand</label>
                <input
                  className="modal-input"
                  type="text"
                  placeholder="Ex: Rua, número, zona"
                  value={dadosEditar.standMorada}
                  onChange={e => {
                    const valor = e.target.value;
                    setDadosEditar(prev => ({
                      ...prev,
                      standMorada: valor,
                      mostrarMapaPerfil: [prev.localidade, valor, prev.standCodigoPostal].some(item => String(item || '').trim()) ? prev.mostrarMapaPerfil : false
                    }));
                  }}
                  maxLength={240}
                />
              </div>

              <div className="modal-form-group">
                <label>Código postal</label>
                <input
                  className="modal-input"
                  type="text"
                  placeholder="Ex: 4000-000"
                  value={dadosEditar.standCodigoPostal}
                  onChange={e => {
                    const valor = e.target.value;
                    setDadosEditar(prev => ({
                      ...prev,
                      standCodigoPostal: valor,
                      mostrarMapaPerfil: [prev.localidade, prev.standMorada, valor].some(item => String(item || '').trim()) ? prev.mostrarMapaPerfil : false
                    }));
                  }}
                  maxLength={20}
                />
              </div>

              <div className="modal-form-group">
                <label className="privacy-toggle">
                  <input
                    type="checkbox"
                    checked={dadosEditar.mostrarMapaPerfil}
                    disabled={!`${dadosEditar.localidade || ''}${dadosEditar.standMorada || ''}${dadosEditar.standCodigoPostal || ''}`.trim()}
                    onChange={e => setDadosEditar({ ...dadosEditar, mostrarMapaPerfil: e.target.checked })}
                  />
                  <span>
                    <span className="privacy-toggle-title">Mostrar mapa no perfil público</span>
                    <span className="privacy-toggle-text">
                      O mapa aparece no perfil público com base na morada do stand ou na localidade indicada.
                    </span>
                  </span>
                </label>
              </div>
              <div className="modal-form-group">
                <div className="links-editor-header">
                  <label>Links do Perfil</label>
                  <span className="links-editor-count">{dadosEditar.linksPerfil.filter(link => link.url).length}/3</span>
                </div>

                <div className="link-editor-list">
                  {dadosEditar.linksPerfil.map((link, index) => {
                    const meta = obterMetaLinkPerfil(link.tipo);
                    return (
                      <div className="link-editor-row" key={index}>
                        <div className="modal-select-wrap">
                          <select
                            className="modal-select"
                            value={link.tipo}
                            onChange={e => atualizarLinkPerfil(index, 'tipo', e.target.value)}
                          >
                            {TIPOS_LINK_PERFIL.map((opcao) => (
                              <option key={opcao.value} value={opcao.value}>{opcao.label}</option>
                            ))}
                          </select>
                        </div>
                        <input
                          className="modal-input"
                          type="text"
                          inputMode="url"
                          placeholder={meta.placeholder}
                          value={link.url}
                          onChange={e => atualizarLinkPerfil(index, 'url', e.target.value)}
                        />
                        <button
                          type="button"
                          className="link-remove-btn"
                          onClick={() => removerLinkPerfil(index)}
                          aria-label="Remover link"
                        >
                          <Icon path={mdiTrashCanOutline} size={0.72} />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="link-add-btn"
                  onClick={adicionarLinkPerfil}
                  disabled={dadosEditar.linksPerfil.length >= 3}
                >
                  <Icon path={mdiPlus} size={0.65} /> Adicionar Link
                </button>
              </div>

              <div className="modal-form-group">
                <label className="privacy-toggle">
                  <input
                    type="checkbox"
                    checked={dadosEditar.mostrarTelefonePublico}
                    onChange={e => setDadosEditar({ ...dadosEditar, mostrarTelefonePublico: e.target.checked })}
                  />
                  <span>
                    <span className="privacy-toggle-title">Mostrar o meu telemóvel nos anúncios e no perfil</span>
                    <span className="privacy-toggle-text">
                      Se desligares esta opção, o perfil público e os anúncios apresentam apenas o email.
                    </span>
                  </span>
                </label>
              </div>

              <button className="modal-btn-submit" type="submit">Guardar Alterações</button>
            </form>
          </div>
        </div>
      )}

      <div className="perfil-outer">
        <div className="perfil-moldura">
          {erro && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '14px 16px', borderRadius: 12, marginBottom: 24, fontSize: 14, fontWeight: 600 }}>
              {erro}
            </div>
          )}
          
          {isDeleting && (
            <div className="perfil-loading-overlay">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div className="nx-spinner" style={{ borderColor: 'rgba(217, 196, 156, 0.2)', borderTopColor: '#d9c49c' }} />
                <span style={{ fontFamily: 'var(--nx-font-body)', fontWeight: 600, color: '#0f172a', fontSize: '14px' }}>A processar...</span>
              </div>
            </div>
          )}

          <button onClick={() => navigate(rotaVoltar)} className="perfil-back">
            <Icon path={mdiChevronLeft} size={0.7} /> {labelVoltar}
          </button>

          <ProfileView
            user={utilizador}
            isOwner
            totalImoveis={totalImoveis}
            totalCarros={totalCarros}
            links={linksPerfilVisiveis}
            onEditProfile={abrirEdicaoPerfil}
            onShare={copiarLinkMontra}
            onLogout={handleLogout}
            onUpgrade={() => setMostrarModalEvolucao(true)}
            onAvatarChange={handleAvatarChange}
            onCapaChange={handleCapaChange}
            fileInputAvatarRef={fileInputAvatarRef}
            fileInputCapaRef={fileInputCapaRef}
            uploadingAvatar={uploadingAvatar}
            uploadingCapa={uploadingCapa}
            linkCopiado={linkCopiado}
          />

          <section className={`perfil-premium-panel ${premiumAtivoPerfil ? 'is-active' : 'is-locked'}`} aria-label="Centro Premium">
            <div className="perfil-premium-head">
              <div>
                <span className="perfil-premium-kicker"><Icon path={mdiCrown} size={0.62} /> Centro Premium</span>
                <h2 className="perfil-premium-title">Visibilidade, carteira e próximos passos num só lugar.</h2>
                <p className="perfil-premium-copy">
                  Acompanha o desempenho, edita anúncios ativos e reforça a tua montra quando o Premium está ativo.
                </p>
              </div>
              <span className="perfil-premium-state">{premiumAtivoPerfil ? 'Premium ativo' : 'Prévia premium'}</span>
            </div>

            <div className="perfil-premium-grid">
              <div className="perfil-premium-metric"><strong>{formatarMetricaPerfil(anunciosAtivosPerfil.length)}</strong><span>ativos</span></div>
              <div className="perfil-premium-metric"><strong>{formatarMetricaPerfil(totalDestacadosPerfil)}</strong><span>destaques</span></div>
              <div className="perfil-premium-metric"><strong>{formatarMetricaPerfil(totalVisitasPerfil)}</strong><span>visitas</span></div>
              <div className="perfil-premium-metric"><strong>{formatarMetricaPerfil(totalContactosPerfil)}</strong><span>contactos</span></div>
              <div className="perfil-premium-metric"><strong>{formatarMetricaPerfil(totalGuardadosPerfil)}</strong><span>guardados</span></div>
              <div className="perfil-premium-metric"><strong>{mediaQualidadePerfil ? `${mediaQualidadePerfil}/10` : '-'}</strong><span>qualidade média</span></div>
            </div>

            <div className="perfil-premium-bottom">
              <ul className="perfil-premium-list">
                {(recomendacoesPremium.length ? recomendacoesPremium : ['A tua montra está bem preparada. Mantém os anúncios atualizados e responde rápido aos contactos.']).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="perfil-premium-actions">
                <button type="button" className="perfil-premium-btn" onClick={() => navigate('/publicar')}><Icon path={mdiPlus} size={0.65} /> Publicar</button>
                <button type="button" className="perfil-premium-btn secondary" onClick={() => navigate('/planos')}><Icon path={mdiChartBar} size={0.65} /> Plano</button>
                <button type="button" className="perfil-premium-btn secondary" onClick={copiarLinkMontra}><Icon path={mdiShareVariantOutline} size={0.65} /> Montra</button>
              </div>
            </div>
          </section>

          <div className="tabs-row">
            <button className={`tab-btn${abaActiva === 'imovel' ? ' active-imovel' : ''}`} onClick={() => setAbaActiva('imovel')}>
              Imóveis {totalImoveis > 0 && `(${totalImoveis})`}
            </button>
            <button className={`tab-btn${abaActiva === 'carro' ? ' active-carro' : ''}`} onClick={() => setAbaActiva('carro')}>
              Automóveis {totalCarros > 0 && `(${totalCarros})`}
            </button>
          </div>

          <div className="cards-grid">
            {anunciosFiltrados.map(anuncio => (
              <div key={anuncio._id} className="card-wrapper">
                <AnuncioCard anuncio={anuncio} showStatus onAnuncioEliminado={handleAnuncioEliminado} />
                
                {anuncio.destacado ? (
                  <div className="badge-destacado"><Icon path={mdiStar} size={0.6} /> Destaque Ativo</div>
                ) : (
                  <button className="btn-destacar" onClick={() => navigate('/sucesso/' + anuncio._id)}>
                    Promover Anúncio (1.99€)
                  </button>
                )}

                <button className="analytics-trigger-btn" onClick={() => verAnalytics(anuncio._id)}>
                  <Icon path={mdiChartBar} size={0.7} /> {anuncioAnalisado === anuncio._id ? 'Ocultar Relatório' : 'Ver Performance'}
                </button>

                {anuncioAnalisado === anuncio._id && dadosGrafico && (
                  <div className="analytics-panel">
                    <div className="stat-grid">
                      <div className="stat-box"><div className="stat-box-val">{dadosGrafico.totalVisitas}</div><div className="stat-box-lbl">Visitas</div></div>
                      <div className="stat-box" style={{ borderLeft: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0' }}><div className="stat-box-val" style={{ color: '#3b82f6' }}>{dadosGrafico.guardadoEmFavoritos}</div><div className="stat-box-lbl">Favoritos</div></div>
                      <div className="stat-box"><div className="stat-box-val" style={{ color: '#d9c49c' }}>{dadosGrafico.contactosGerados}</div><div className="stat-box-lbl">Mensagens</div></div>
                    </div>
                    <div className="chart-row">
                      {dadosGrafico.graficoSeteDias.map((dia, idx) => (
                        <div key={idx} className="chart-bar-wrap">
                          <div className="chart-bar" style={{ height: `${Math.max((dia.visitas / Math.max(...dadosGrafico.graficoSeteDias.map(d => d.visitas), 10)) * 100, 5)}%`, opacity: dia.visitas === 0 ? 0.3 : 1 }}></div>
                          <div className="chart-day">{dia.dataLabel}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}