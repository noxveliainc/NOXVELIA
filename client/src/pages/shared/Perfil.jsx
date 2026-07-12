
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import AnuncioCard from '../../pages/shared/AnuncioCard';
import ProfileView, { obterLinksVisiveisPerfil } from './ProfileView';
import { Icon } from '@mdi/react';
import { 
  mdiCheckDecagram, mdiChartBar, mdiShareVariantOutline, mdiDomain, 
  mdiClose, mdiCrown, mdiStar, mdiChevronLeft, mdiPencil, mdiEarth,
  mdiWeb, mdiInstagram, mdiFacebook, mdiLinkedin, mdiYoutube, mdiMusicNote, mdiWhatsapp,
  mdiPlus, mdiTrashCanOutline
} from '@mdi/js';

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

const obterLinksVisiveis = (utilizador) => {
  const links = Array.isArray(utilizador?.linksPerfil)
    ? utilizador.linksPerfil.filter((link) => link?.url).slice(0, 3)
    : [];

  if (links.length > 0) return links;
  return utilizador?.website ? [{ tipo: 'website', url: utilizador.website }] : [];
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
  const [dadosEditar, setDadosEditar] = useState({ bio: '', website: '', localidade: '', linksPerfil: [criarLinkPerfilVazio()] });

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
      const uploadRes = await api.post('/upload/imagens', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      const novaUrl = Array.isArray(uploadRes.data.urls) ? uploadRes.data.urls[0] : uploadRes.data.url;
      const updateRes = await api.put('/users/me', { avatarUrl: novaUrl });
      if (atualizarAvatar) atualizarAvatar(novaUrl);
      setUtilizador(updateRes.data);
    } catch (error) {
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
      const uploadRes = await api.post('/upload/imagens', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      const novaUrl = Array.isArray(uploadRes.data.urls) ? uploadRes.data.urls[0] : uploadRes.data.url;
      const updateRes = await api.put('/users/me', { capaUrl: novaUrl });
      setUtilizador(updateRes.data);
      if (atualizarUser) atualizarUser(updateRes.data);
    } catch (error) {
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
    } catch (err) {
      alert('Ocorreu um erro ao evoluir a tua conta.');
    } finally {
      setIsDeleting(false);
    }
  };

  // EDIÇÃO DE PERFIL (BIO, WEBSITE)
  const abrirEdicaoPerfil = () => {
    setDadosEditar({
      bio: utilizador?.bio || '',
      website: utilizador?.website || '',
      localidade: utilizador?.localidade || '',
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
        website: websitePrincipal,
        linksPerfil
      });
      setUtilizador(res.data);
      if (atualizarUser) atualizarUser(res.data);
    } catch (err) {
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
    } catch (err) {
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

  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}><div className="nx-spinner" style={{ borderColor: 'rgba(42, 193, 180, 0.2)', borderTopColor: '#2ac1b4' }} /></div>;

  return (
    <>
      <style>{`
        .perfil-outer { background: #f8fafc; min-height: calc(100vh - 72px); padding: 40px 24px; display: flex; justify-content: center; font-family: 'Inter', sans-serif; color: #0f172a; }
        .perfil-moldura { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 32px; width: 100%; max-width: 1100px; padding: 48px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); position: relative; }
        
        .perfil-back { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: #64748b; text-decoration: none; letter-spacing: .05em; text-transform: uppercase; background: none; border: none; cursor: pointer; padding: 0; transition: color .2s; margin-bottom: 32px; }
        .perfil-back:hover { color: #0f172a; }
        
        /* CABEÇALHO DO PERFIL COM CAPA */
        .perfil-header { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; overflow: hidden; margin-bottom: 32px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
        
        .perfil-capa { height: 220px; background: linear-gradient(135deg, #cbd5e1, #f1f5f9); position: relative; cursor: pointer; }
        .perfil-capa img { width: 100%; height: 100%; object-fit: cover; }
        .perfil-capa-overlay { position: absolute; inset: 0; background: rgba(15,23,42,0.3); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; color: #fff; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; backdrop-filter: blur(2px); }
        .perfil-capa:hover .perfil-capa-overlay { opacity: 1; }

        .perfil-body { padding: 0 36px 36px; display: flex; gap: 32px; flex-wrap: wrap; position: relative; }
        
        .perfil-avatar-wrap { margin-top: -55px; position: relative; z-index: 2; flex-shrink: 0; cursor: pointer; }
        .perfil-avatar { width: 120px; height: 120px; border-radius: 24px; border: 5px solid #ffffff; overflow: hidden; background: #ffffff; display: flex; align-items: center; justify-content: center; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 38px; color: #2ac1b4; transition: filter .2s; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        .perfil-avatar-wrap:hover .perfil-avatar { filter: brightness(.95); }
        .perfil-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .perfil-avatar-overlay { position: absolute; inset: 0; border-radius: 24px; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity .2s; background: rgba(15,23,42,0.6); pointer-events: none; }
        .perfil-avatar-wrap:hover .perfil-avatar-overlay { opacity: 1; }
        .perfil-avatar-wrap.is-premium .perfil-avatar { border-color: #fef08a; box-shadow: 0 0 0 4px rgba(234, 179, 8, 0.2); }
        
        .perfil-info { flex: 1; min-width: 0; padding-top: 16px; }
        
        .perfil-badges-row { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
        .perfil-badge-conta { display: inline-flex; align-items: center; gap: 4px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; padding: 5px 10px; border-radius: 6px; }
        .badge-profissional { background: rgba(42, 193, 180, 0.1); color: #0d9488; border: 1px solid rgba(42, 193, 180, 0.2); }
        .badge-particular { background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; }
        .badge-premium { background: rgba(234, 179, 8, 0.1); color: #d97706; border: 1px solid rgba(234, 179, 8, 0.3); }
        
        .btn-upgrade { background: transparent; color: #2563eb; border: 1px dashed rgba(59, 130, 246, 0.4); border-radius: 6px; font-size: 10px; font-weight: 800; padding: 5px 10px; cursor: pointer; text-transform: uppercase; transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px; }
        .btn-upgrade:hover { background: rgba(59, 130, 246, 0.05); border-color: rgba(59, 130, 246, 0.6); }

        .perfil-name { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 28px; font-weight: 800; color: #0f172a; margin: 0 0 4px; display: flex; align-items: center; gap: 8px; }
        .perfil-email { font-size: 13px; color: #64748b; margin: 0 0 16px 0; display: flex; align-items: center; }
        
        .perfil-bio { font-size: 14px; color: #334155; line-height: 1.6; margin: 0 0 16px 0; max-width: 800px; white-space: pre-wrap; }
        .perfil-link-row { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
        .perfil-link { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; color: #3b82f6; text-decoration: none; border: 1px solid #dbeafe; background: #eff6ff; border-radius: 999px; padding: 8px 12px; max-width: 240px; }
        .perfil-link span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .perfil-link:hover { border-color: #93c5fd; background: #dbeafe; }

        .stars-container { display: flex; align-items: center; gap: 4px; color: #f59e0b; margin-bottom: 24px; }
        .stars-text { font-size: 13px; font-weight: 700; color: #0f172a; margin-left: 4px; }
        .stars-count { font-size: 12px; font-weight: 500; color: #64748b; }

        .perfil-stats { display: flex; gap: 32px; }
        .perfil-stat-val { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 24px; font-weight: 700; color: #0f172a; line-height: 1; }
        .perfil-stat-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: #64748b; margin-top: 3px; }
        .perfil-stat-divider { width: 1px; background: #e2e8f0; margin: 0 4px; }
        
        .perfil-actions { display: flex; flex-direction: column; gap: 10px; width: 220px; padding-top: 16px; }
        @media (max-width: 768px) { .perfil-actions { width: 100%; padding-top: 0; } }

        .btn-action-primary { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; background: rgba(42, 193, 180, 0.1); color: #0d9488; border: 1px solid rgba(42, 193, 180, 0.2); border-radius: 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; cursor: pointer; transition: all .2s; }
        .btn-action-primary:hover { background: rgba(42, 193, 180, 0.15); }

        .btn-action-solid { padding: 12px; background: #0f172a; color: #ffffff; border: none; border-radius: 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; cursor: pointer; transition: opacity .2s; display: flex; align-items: center; justify-content: center; gap: 6px; }
        .btn-action-solid:hover { opacity: 0.85; }
        
        .btn-action-outline { padding: 12px; background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 12px; font-weight: 600; text-transform: uppercase; cursor: pointer; transition: all .2s; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.02); }
        .btn-action-outline:hover { border-color: #94a3b8; color: #0f172a; background: #f8fafc; }
        .btn-action-outline.danger:hover { border-color: #ef4444; color: #ef4444; background: #fef2f2; }
        
        /* RESTO DA INTERFACE (Tabs, Cards, Analytics) MANTIDO INTACTO */
        .tabs-row { display: flex; gap: 4px; margin-bottom: 28px; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 10px; padding: 4px; width: fit-content; }
        .tab-btn { padding: 9px 22px; border: none; border-radius: 7px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all .2s; background: transparent; color: #64748b; }
        .tab-btn.active-imovel { background: #3ecf8e; color: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .tab-btn.active-carro { background: #2ac1b4; color: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        
        .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 24px; }
        .card-wrapper { display: flex; flex-direction: column; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 12px; gap: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); transition: border-color .2s; }
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
        .analytics-trigger-btn:hover { border-color: #2ac1b4; color: #0d9488; background: #f1f5f9; }
        
        .analytics-panel { margin-top: 4px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; }
        .stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; }
        .stat-box { text-align: center; }
        .stat-box-val { font-size: 20px; font-weight: 800; color: #0f172a; }
        .stat-box-lbl { font-size: 9px; font-weight: 700; text-transform: uppercase; color: #64748b; }
        
        .chart-row { display: flex; align-items: flex-end; justify-content: space-between; height: 60px; padding-top: 10px; border-top: 1px dashed #cbd5e1; }
        .chart-bar-wrap { display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; }
        .chart-bar { width: 8px; background: #2ac1b4; border-radius: 2px 2px 0 0; }
        .chart-day { font-size: 8px; font-weight: 700; color: #64748b; }
        
        .perfil-loading-overlay { position: absolute; inset: 0; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(4px); z-index: 1000; display: flex; align-items: center; justify-content: center; border-radius: 32px; }

        /* MODAIS PADRÃO */
        .modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(8px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 24px; overflow-y: auto;}
        .modal-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 24px; width: 100%; max-width: 500px; padding: 40px; position: relative; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1); margin: auto; }
        .modal-close { position: absolute; top: 24px; right: 24px; background: transparent; border: none; color: #94a3b8; cursor: pointer; transition: color 0.2s; }
        .modal-close:hover { color: #0f172a; }
        .modal-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 24px; font-weight: 800; color: #0f172a; margin: 0 0 8px; display: flex; align-items: center; gap: 10px; }
        .modal-desc { font-size: 14px; color: #64748b; margin: 0 0 24px; line-height: 1.5; }
        
        .modal-form-group { margin-bottom: 20px; }
        .modal-form-group label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 8px; }
        .modal-input { width: 100%; padding: 14px 16px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; color: #0f172a; outline: none; font-size: 14px; transition: all 0.2s; box-sizing: border-box; font-family: inherit; }
        .modal-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15); }
        .modal-input::placeholder { color: #94a3b8; }
        textarea.modal-input { resize: vertical; min-height: 100px; }

        .links-editor-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 8px; }
        .links-editor-header label { margin-bottom: 0; }
        .links-editor-count { font-size: 11px; color: #94a3b8; font-weight: 700; }
        .link-editor-list { display: flex; flex-direction: column; gap: 10px; }
        .link-editor-row { display: grid; grid-template-columns: 120px minmax(0, 1fr) 40px; gap: 10px; align-items: center; }
        .modal-select { width: 100%; height: 48px; padding: 0 34px 0 12px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; color: #0f172a; outline: none; font-size: 13px; font-weight: 700; font-family: inherit; appearance: none; cursor: pointer; }
        .modal-select-wrap { position: relative; }
        .modal-select-wrap::after { content: '\\25BE'; position: absolute; right: 12px; top: 50%; transform: translateY(-55%); color: #64748b; pointer-events: none; font-size: 14px; line-height: 1; }
        .link-remove-btn { width: 40px; height: 40px; border-radius: 999px; border: 1px solid #e2e8f0; background: #ffffff; color: #94a3b8; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; transition: all .2s; }
        .link-remove-btn:hover { color: #ef4444; border-color: #fecaca; background: #fef2f2; }
        .link-add-btn { margin-top: 12px; display: inline-flex; align-items: center; gap: 8px; background: #f8fafc; color: #2563eb; border: 1px dashed #93c5fd; border-radius: 8px; padding: 10px 12px; font-size: 12px; font-weight: 800; cursor: pointer; text-transform: uppercase; }
        .link-add-btn:hover { background: #eff6ff; }
        .link-add-btn:disabled { opacity: 0.45; cursor: not-allowed; }

        @media (max-width: 560px) {
          .link-editor-row { grid-template-columns: 1fr 40px; }
          .modal-select-wrap { grid-column: 1 / -1; }
        }
        
        .modal-btn-submit { width: 100%; padding: 16px; background: #3b82f6; color: #ffffff; border: none; border-radius: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; transition: opacity 0.2s; margin-top: 12px; }
        .modal-btn-submit:hover { opacity: 0.9; }
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
              Personaliza a tua presença na plataforma. Adiciona uma biografia para que os compradores saibam quem és.
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

              <button className="modal-btn-submit" type="submit">Guardar Alterações</button>
            </form>
          </div>
        </div>
      )}

      <div className="perfil-outer">
        <div className="perfil-moldura">
          
          {isDeleting && (
            <div className="perfil-loading-overlay">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div className="nx-spinner" style={{ borderColor: 'rgba(42, 193, 180, 0.2)', borderTopColor: '#2ac1b4' }} />
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

          {/* NOVO CABEÇALHO DO PERFIL COM CAPA E BIO */}
          {false && (
          <div className="perfil-header">
            {/* Secção da Capa */}
            <div className="perfil-capa" onClick={() => fileInputCapaRef.current?.click()}>
              {utilizador?.capaUrl ? <img src={utilizador.capaUrl} alt="Capa" /> : null}
              <div className="perfil-capa-overlay">
                <Icon path={mdiPencil} size={0.7} style={{marginRight: '6px'}} /> 
                {uploadingCapa ? 'A carregar...' : 'Alterar Capa (16:9)'}
              </div>
            </div>
            <input ref={fileInputCapaRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleCapaChange} />

            {/* Secção de Informação e Avatar */}
            <div className="perfil-body">
              <div className={`perfil-avatar-wrap${utilizador?.premiumAtivo ? ' is-premium' : ''}`} onClick={() => fileInputAvatarRef.current?.click()}>
                <div className="perfil-avatar">
                  {utilizador?.avatarUrl || user?.avatarUrl
                    ? <img src={utilizador?.avatarUrl || user?.avatarUrl} alt="Perfil" />
                    : (utilizador?.nome?.charAt(0).toUpperCase() || '?')
                  }
                </div>
                <div className="perfil-avatar-overlay">
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>
                    {uploadingAvatar ? 'A carregar…' : 'Alterar'}
                  </span>
                </div>
                <input ref={fileInputAvatarRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
              </div>

              <div className="perfil-info">
                
                <div className="perfil-badges-row">
                  <div className={`perfil-badge-conta ${utilizador?.tipoConta === 'profissional' ? 'badge-profissional' : 'badge-particular'}`}>
                    {utilizador?.tipoConta === 'profissional' ? 'Conta Profissional' : 'Conta Particular'}
                  </div>

                  {utilizador?.premiumAtivo && (
                    <div className="perfil-badge-conta badge-premium"><Icon path={mdiStar} size={0.4} /> Premium</div>
                  )}
                  
                  {utilizador?.tipoConta !== 'profissional' && utilizador?.tipo !== 'admin' && (
                    <button className="btn-upgrade" onClick={() => setMostrarModalEvolucao(true)}>
                      <Icon path={mdiDomain} size={0.5} /> Evoluir
                    </button>
                  )}
                </div>
                
                <h1 className="perfil-name">
                  {utilizador?.tipo === 'admin' 
                    ? (utilizador?.nome?.toUpperCase().includes('NOXVELIA') ? utilizador?.nome : `NOXVELIA ${utilizador?.nome}`)
                    : utilizador?.nome
                  }
                  {utilizador?.tipo === 'admin' && <Icon path={mdiCheckDecagram} size={1} color="#3b82f6" />}
                  {utilizador?.tipo !== 'admin' && utilizador?.premiumAtivo && (
                    <Icon path={mdiCrown} size={1} color="#eab308" title="Membro Premium" />
                  )}
                </h1>

                <p className="perfil-email">{utilizador?.email}</p>

                {/* Biografia e Links Pessoais */}
                {utilizador?.bio && <p className="perfil-bio">{utilizador.bio}</p>}
                
                {linksPerfilVisiveis.length > 0 && (
                  <div className="perfil-link-row">
                    {linksPerfilVisiveis.map((link, index) => {
                      const meta = obterMetaLinkPerfil(link.tipo);
                      return (
                        <a key={`${link.tipo}-${index}`} href={normalizarHrefLinkPerfil(link)} target="_blank" rel="noopener noreferrer" className="perfil-link">
                          <Icon path={meta.icon} size={0.7} />
                          <span>{formatarTextoLink(link)}</span>
                        </a>
                      );
                    })}
                  </div>
                )}

                <div className="stars-container">
                  {utilizador?.rating > 0 ? (
                    <>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon key={i} path={mdiStar} size={0.7} color={i < Math.round(utilizador.rating) ? '#f59e0b' : '#e2e8f0'} />
                      ))}
                      <span className="stars-text">{utilizador.rating.toFixed(1)}</span>
                      <span className="stars-count">({utilizador.totalAvaliacoes || 0} avaliações)</span>
                    </>
                  ) : (
                    <span className="stars-count" style={{ marginLeft: 0 }}>Sem avaliações recebidas</span>
                  )}
                </div>
                
                <div className="perfil-stats">
                  <div><div className="perfil-stat-val">{totalImoveis}</div><div className="perfil-stat-label">Imóveis</div></div>
                  <div className="perfil-stat-divider" />
                  <div><div className="perfil-stat-val">{totalCarros}</div><div className="perfil-stat-label">Automóveis</div></div>
                </div>
              </div>

              <div className="perfil-actions">
                <button className="btn-action-solid" onClick={abrirEdicaoPerfil}>
                  <Icon path={mdiPencil} size={0.7} /> Editar Perfil
                </button>

                <button className="btn-action-primary" onClick={copiarLinkMontra}>
                  <Icon path={mdiShareVariantOutline} size={0.7} /> 
                  {linkCopiado ? 'Link Copiado!' : 'Partilhar Montra'}
                </button>

                <button className="btn-action-outline danger" onClick={handleLogout}>Terminar Sessão</button>
              </div>
            </div>
          </div>

          )}

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
                      <div className="stat-box"><div className="stat-box-val" style={{ color: '#2ac1b4' }}>{dadosGrafico.contactosGerados}</div><div className="stat-box-lbl">Mensagens</div></div>
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
