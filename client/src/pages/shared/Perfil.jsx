import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import AnuncioCard from '../../pages/shared/AnuncioCard';
import ProfileView, { obterLinksVisiveisPerfil } from './ProfileView';
import LoadingScreen from '../../components/LoadingScreen';
import { Icon } from '@mdi/react';
import { 
  mdiChartBar, mdiDomain,
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


const prepararLinksParaEdicao = (linksPerfil, website) => {
  const links = Array.isArray(linksPerfil)
    ? linksPerfil.filter((link) => link?.url).slice(0, 3)
    : [];

  if (links.length > 0) return links.map((link) => ({ tipo: link.tipo || 'outro', url: link.url || '' }));
  if (website) return [{ tipo: 'website', url: website }];
  return [criarLinkPerfilVazio()];
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
  const [, setIsDeleting] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingCapa, setUploadingCapa] = useState(false);
  const [, setErro] = useState(null);
  const [linkCopiado, setLinkCopiado] = useState(false);
  
  const [anuncioAnalisado, setAnuncioAnalisado] = useState(null);
  const [dadosGrafico, setDadosGrafico] = useState(null);

  const [mostrarModalEvolucao, setMostrarModalEvolucao] = useState(false);
  const [dadosEvolucao, setDadosEvolucao] = useState({ nomeEmpresa: '', nif: '', website: '' });

  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [dadosEditar, setDadosEditar] = useState({
    bio: '', website: '', localidade: '', standNome: '', standMorada: '', standCodigoPostal: '',
    mostrarTelefonePublico: true, mostrarMapaPerfil: false, linksPerfil: [criarLinkPerfilVazio()]
  });

  const rotaVoltar = abaActiva === 'carro' ? '/carros' : '/imoveis';
  const labelVoltar = abaActiva === 'carro' ? 'Automóveis' : 'Imóveis';

  useEffect(() => {
    if (!signed) { navigate('/login'); return; }
    if (user) setUtilizador(user);

    let isMounted = true;
    const carregarDados = async () => {
      try {
        const [resUser, resAnuncios] = await Promise.all([api.get('/users/me'), api.get('/users/me/anuncios')]);
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

  const promoverParaProfissional = async (e) => {
    e.preventDefault();
    if (!dadosEvolucao.nomeEmpresa) { alert('O Nome da Empresa é obrigatório.'); return; }
    try {
      setMostrarModalEvolucao(false);
      setIsDeleting(true);
      const res = await api.put('/users/me', { tipoConta: 'profissional', nome: dadosEvolucao.nomeEmpresa, nif: dadosEvolucao.nif, website: dadosEvolucao.website });
      setUtilizador(res.data);
      if (atualizarUser) atualizarUser(res.data);
      alert('A tua conta foi evoluída para Profissional.');
    } catch {
      alert('Erro ao evoluir a tua conta.');
    } finally {
      setIsDeleting(false);
    }
  };

  const abrirEdicaoPerfil = () => {
    setDadosEditar({
      bio: utilizador?.bio || '', website: utilizador?.website || '', localidade: utilizador?.localidade || '',
      standNome: utilizador?.standNome || '', standMorada: utilizador?.standMorada || '', standCodigoPostal: utilizador?.standCodigoPostal || '',
      mostrarTelefonePublico: utilizador?.mostrarTelefonePublico !== false, mostrarMapaPerfil: utilizador?.mostrarMapaPerfil === true,
      linksPerfil: prepararLinksParaEdicao(utilizador?.linksPerfil, utilizador?.website)
    });
    setMostrarModalEditar(true);
  };

  const atualizarLinkPerfil = (index, campo, valor) => {
    setDadosEditar(prev => ({ ...prev, linksPerfil: prev.linksPerfil.map((link, i) => (i === index ? { ...link, [campo]: valor } : link)) }));
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
    const linksPerfil = dadosEditar.linksPerfil.map((link) => ({ tipo: link.tipo || 'outro', url: (link.url || '').trim() })).filter((link) => link.url).slice(0, 3);
    const websitePrincipal = linksPerfil.find((link) => link.tipo === 'website')?.url || '';

    try {
      setIsDeleting(true);
      setMostrarModalEditar(false);
      const res = await api.put('/users/me', {
        bio: dadosEditar.bio, localidade: dadosEditar.localidade, standNome: dadosEditar.standNome, standMorada: dadosEditar.standMorada,
        standCodigoPostal: dadosEditar.standCodigoPostal, mostrarTelefonePublico: dadosEditar.mostrarTelefonePublico, mostrarMapaPerfil: dadosEditar.mostrarMapaPerfil,
        website: websitePrincipal, linksPerfil
      });
      setUtilizador(res.data);
      if (atualizarUser) atualizarUser(res.data);
    } catch {
      alert('Erro ao guardar as alterações.');
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
  const temMetricasPremiumPerfil = anunciosAtivosPerfil.length > 0
    || totalDestacadosPerfil > 0
    || totalVisitasPerfil > 0
    || totalContactosPerfil > 0
    || totalGuardadosPerfil > 0
    || mediaQualidadePerfil > 0;
  const premiumAtivoPerfil = utilizador?.premiumAtivo === true || utilizador?.tipo === 'admin';
  const anunciosParaMelhorarPerfil = anunciosAtivosPerfil
    .filter((anuncio) => Number(anuncio.scoreQualidade || 0) < 8)
    .sort((a, b) => Number(a.scoreQualidade || 0) - Number(b.scoreQualidade || 0))
    .slice(0, 3);
  const formatarMetricaPerfil = (valor) => new Intl.NumberFormat('pt-PT').format(Number(valor || 0));

  if (loading) return <LoadingScreen label="A carregar perfil" detail="A preparar a tua área." minHeight="100vh" tone="light" />;

  return (
    <div className="nx-perfil-view">
      <style>{`
        /* ── RESET GLOBAL ABSOLUTO E ANTI-OVERFLOW ── */
        .nx-perfil-view {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
          background: #f8fafc;
          min-height: calc(100vh - 72px);
          padding: 20px 12px;
          display: flex;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          color: #0f172a;
          box-sizing: border-box;
        }
        .nx-perfil-view *, .nx-perfil-view *::before, .nx-perfil-view *::after {
          box-sizing: border-box;
        }
        @media (min-width: 768px) { .nx-perfil-view { padding: 40px 24px; } }

        .perfil-moldura { width: 100%; max-width: 1100px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 24px 16px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); position: relative; overflow-x: hidden; }
        @media (min-width: 768px) { .perfil-moldura { padding: 48px; border-radius: 32px; } }
        
        .perfil-back { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: #64748b; text-decoration: none; text-transform: uppercase; background: none; border: none; cursor: pointer; padding: 0; margin-bottom: 24px; }
        
        .tabs-row { display: flex; gap: 4px; margin-bottom: 24px; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 10px; padding: 4px; width: 100%; overflow-x: auto; scrollbar-width: none; }
        .tab-btn { flex: 1; padding: 10px; border: none; border-radius: 7px; font-size: 12px; font-weight: 600; cursor: pointer; background: transparent; color: #64748b; text-align: center; white-space: nowrap; }
        .tab-btn.active-imovel { background: #102f50; color: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .tab-btn.active-carro { background: #d9c49c; color: #071326; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        
        .cards-grid { display: grid; grid-template-columns: 1fr; gap: 16px; width: 100%; }
        @media (min-width: 640px) { .cards-grid { grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 24px; } }
        
        .card-wrapper { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 12px; display: flex; flex-direction: column; gap: 12px; width: 100%; }
        
        .btn-destacar, .badge-destacado, .analytics-trigger-btn { width: 100%; padding: 12px; border-radius: 8px; font-size: 11px; font-weight: 800; text-transform: uppercase; display: flex; align-items: center; justify-content: center; gap: 6px; border: none; cursor: pointer; }
        .btn-destacar { background: #fefce8; color: #a16207; border: 1px solid #fde047; }
        .badge-destacado { background: #fefce8; color: #ca8a04; border: 1px dashed #fde047; cursor: default; }
        .analytics-trigger-btn { background: #f8fafc; border: 1px dashed #cbd5e1; color: #64748b; }
        
        .analytics-panel { margin-top: 4px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; width: 100%; }
        .stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; width: 100%; }
        .stat-box { text-align: center; }
        .stat-box-val { font-size: 18px; font-weight: 800; color: #0f172a; }
        .stat-box-lbl { font-size: 9px; font-weight: 700; text-transform: uppercase; color: #64748b; }
        
        .perfil-premium-panel { margin: 0 0 24px; border: 1px solid rgba(217,196,156,.38); border-radius: 16px; padding: 20px; background: linear-gradient(135deg, rgba(255,255,255,.98), rgba(217,196,156,.1)); width: 100%; }
        .perfil-premium-head { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; width: 100%; }
        .perfil-premium-title { margin: 0; color: #102f50; font-size: 18px; line-height: 1.2; font-weight: 900; }
        .perfil-premium-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; width: 100%; }
        .perfil-premium-empty { display: flex; flex-direction: column; gap: 8px; padding: 18px; border: 1px dashed rgba(16,47,80,.2); border-radius: 12px; background: rgba(255,255,255,.74); color: #475569; }
        .perfil-premium-empty strong { color: #102f50; font-size: 14px; font-weight: 900; }
        .perfil-premium-empty span { font-size: 13px; line-height: 1.5; }
        @media (min-width: 640px) { .perfil-premium-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } .perfil-premium-head { flex-direction: row; justify-content: space-between; align-items: flex-start; } .perfil-premium-title { font-size: 22px; } }
        @media (min-width: 1024px) { .perfil-premium-grid { grid-template-columns: repeat(6, minmax(0, 1fr)); } }
        
        .perfil-premium-metric { min-height: 70px; display: grid; align-content: center; gap: 4px; padding: 12px; border: 1px solid rgba(226,232,240,.95); border-radius: 12px; background: rgba(255,255,255,.82); text-align: center; }
        .perfil-premium-metric strong { color: #0f172a; font-size: 20px; line-height: 1; }
        .perfil-premium-metric span { color: #64748b; font-size: 9px; font-weight: 900; letter-spacing: .05em; text-transform: uppercase; }
        
        .perfil-premium-bottom { display: flex; flex-direction: column; gap: 16px; margin-top: 20px; width: 100%; }
        .perfil-premium-actions { display: flex; flex-direction: column; gap: 8px; width: 100%; }
        @media (min-width: 640px) { .perfil-premium-actions { flex-direction: row; justify-content: flex-start; } .perfil-premium-btn { flex: 1; } }
        
        .perfil-premium-btn { width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #d9c49c; background: #d9c49c; color: #071326; font-size: 12px; font-weight: 900; display: flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer; text-transform: uppercase; }
        .perfil-premium-btn.secondary { background: #ffffff; color: #102f50; border-color: rgba(16,47,80,.18); }

        .perfil-quality-panel { margin: 0 0 24px; border: 1px solid rgba(16,47,80,.12); border-radius: 16px; padding: 20px; background: #ffffff; width: 100%; }
        .perfil-quality-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; margin-bottom: 16px; }
        .perfil-quality-kicker { color: #102f50; font-size: 10px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
        .perfil-quality-title { margin: 5px 0 0; color: #071326; font-size: 20px; line-height: 1.2; font-weight: 900; }
        .perfil-quality-copy { margin: 6px 0 0; color: #64748b; font-size: 13px; line-height: 1.5; }
        .perfil-quality-list { display: grid; gap: 10px; }
        .perfil-quality-item { width: 100%; display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 12px; align-items: center; padding: 12px; border: 1px solid #e2e8f0; border-radius: 12px; background: #f8fafc; text-align: left; font: inherit; cursor: pointer; }
        .perfil-quality-item strong { display: block; color: #0f172a; font-size: 14px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .perfil-quality-item span span { display: block; margin-top: 4px; color: #64748b; font-size: 12px; line-height: 1.4; }
        .perfil-quality-score { min-width: 62px; display: inline-flex; justify-content: center; padding: 8px 10px; border-radius: 999px; border: 1px solid rgba(217,196,156,.45); background: #fff9eb; color: #102f50; font-size: 12px; font-weight: 900; }
        .perfil-quality-ok { padding: 14px; border: 1px dashed rgba(217,196,156,.52); border-radius: 12px; color: #102f50; background: #fffaf0; font-size: 13px; font-weight: 750; line-height: 1.5; }

        /* MODAIS PADRÃO */
        .modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(8px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 16px; width: 100%; height: 100%; }
        .modal-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; width: 100%; max-width: 500px; padding: 24px 20px; position: relative; max-height: 90vh; overflow-y: auto; }
        @media (min-width: 640px) { .modal-card { padding: 40px; } }
        .modal-close { position: absolute; top: 16px; right: 16px; background: transparent; border: none; color: #94a3b8; cursor: pointer; }
        
        .modal-form-group { margin-bottom: 16px; width: 100%; }
        .modal-input { width: 100%; padding: 14px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px; box-sizing: border-box; }
        
        .link-editor-row { display: grid; grid-template-columns: 1fr 40px; gap: 8px; width: 100%; margin-bottom: 8px; }
        .modal-select-wrap { grid-column: 1 / -1; width: 100%; }
        @media (min-width: 640px) { .link-editor-row { grid-template-columns: 120px minmax(0, 1fr) 40px; } .modal-select-wrap { grid-column: auto; } }
        
        .modal-select { width: 100%; height: 48px; padding: 0 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 13px; font-weight: 700; }
        .link-remove-btn { width: 44px; height: 48px; border-radius: 8px; border: 1px solid #e2e8f0; background: #ffffff; color: #94a3b8; display: flex; align-items: center; justify-content: center; }
        
        /* CORREÇÃO DO PROFILEVIEW EMBUTIDO */
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

        @media (min-width: 768px) {
          .perfil-moldura [class*="perfil-body"] { flex-direction: row !important; align-items: flex-start !important; text-align: left !important; padding: 0 36px 36px !important; }
          .perfil-moldura [class*="perfil-avatar-wrap"] { align-self: flex-start; margin-top: -55px !important; }
          .perfil-moldura [class*="perfil-avatar"] { width: 120px !important; height: 120px !important; border-width: 5px !important; }
          .perfil-moldura [class*="perfil-info"] { align-items: flex-start !important; }
          .perfil-moldura [class*="perfil-badges-row"], .perfil-moldura [class*="perfil-name"], .perfil-moldura [class*="perfil-link-row"], .perfil-moldura [class*="stars-container"] { justify-content: flex-start !important; }
          .perfil-moldura [class*="perfil-bio"] { text-align: left !important; padding: 0; }
          .perfil-moldura [class*="perfil-stats"] { justify-content: flex-start !important; gap: 32px !important; }
          .perfil-moldura [class*="perfil-actions"] { width: 220px !important; }
        }
      `}</style>

      {/* MODAL EVOLUÇÃO */}
      {mostrarModalEvolucao && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button className="modal-close" onClick={() => setMostrarModalEvolucao(false)}><Icon path={mdiClose} size={1} /></button>
            <h2 style={{ fontSize: 20, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}><Icon path={mdiDomain} size={1} color="#3b82f6" /> Evolução de Conta</h2>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 20 }}>Transforma a tua conta num perfil empresarial.</p>
            <form onSubmit={promoverParaProfissional}>
              <div className="modal-form-group">
                <label>Nome do Stand / Agência *</label>
                <input className="modal-input" type="text" value={dadosEvolucao.nomeEmpresa} onChange={e => setDadosEvolucao({...dadosEvolucao, nomeEmpresa: e.target.value})} required />
              </div>
              <div className="modal-form-group">
                <label>NIF da Empresa (Opcional)</label>
                <input className="modal-input" type="text" value={dadosEvolucao.nif} onChange={e => setDadosEvolucao({...dadosEvolucao, nif: e.target.value})} />
              </div>
              <div className="modal-form-group">
                <label>Website (Opcional)</label>
                <input className="modal-input" type="url" value={dadosEvolucao.website} onChange={e => setDadosEvolucao({...dadosEvolucao, website: e.target.value})} />
              </div>
              <button style={{ width: '100%', padding: 14, background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700 }} type="submit">Confirmar Evolução</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EDIÇÃO */}
      {mostrarModalEditar && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button className="modal-close" onClick={() => setMostrarModalEditar(false)}><Icon path={mdiClose} size={1} /></button>
            <h2 style={{ fontSize: 20, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}><Icon path={mdiPencil} size={1} color="#3b82f6" /> Editar Perfil</h2>
            
            <form onSubmit={salvarPerfil}>
              <div className="modal-form-group">
                <label>Biografia</label>
                <textarea className="modal-input" style={{ minHeight: 80 }} value={dadosEditar.bio} onChange={e => setDadosEditar({...dadosEditar, bio: e.target.value})} maxLength={800} />
              </div>

              <div className="modal-form-group">
                <label>Localidade pública</label>
                <input className="modal-input" type="text" value={dadosEditar.localidade} onChange={e => setDadosEditar(prev => ({...prev, localidade: e.target.value}))} />
              </div>

              <div className="modal-form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><label style={{ margin: 0 }}>Links do Perfil</label><span style={{ fontSize: 10, color: '#94a3b8' }}>{dadosEditar.linksPerfil.filter(l => l.url).length}/3</span></div>
                {dadosEditar.linksPerfil.map((link, index) => (
                  <div className="link-editor-row" key={index}>
                    <div className="modal-select-wrap">
                      <select className="modal-select" value={link.tipo} onChange={e => atualizarLinkPerfil(index, 'tipo', e.target.value)}>
                        {TIPOS_LINK_PERFIL.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                    <input className="modal-input" type="text" inputMode="url" placeholder="URL ou número" value={link.url} onChange={e => atualizarLinkPerfil(index, 'url', e.target.value)} />
                    <button type="button" className="link-remove-btn" onClick={() => removerLinkPerfil(index)}><Icon path={mdiTrashCanOutline} size={0.7} /></button>
                  </div>
                ))}
                <button type="button" style={{ marginTop: 8, padding: '8px 12px', fontSize: 11, fontWeight: 700, borderRadius: 6, border: '1px dashed #cbd5e1', background: '#f8fafc', color: '#3b82f6', width: '100%', cursor: 'pointer' }} onClick={adicionarLinkPerfil} disabled={dadosEditar.linksPerfil.length >= 3}>
                  <Icon path={mdiPlus} size={0.6} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Adicionar Link
                </button>
              </div>

              <div className="modal-form-group" style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: '#f8fafc', padding: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <input type="checkbox" checked={dadosEditar.mostrarTelefonePublico} onChange={e => setDadosEditar({ ...dadosEditar, mostrarTelefonePublico: e.target.checked })} style={{ marginTop: 2 }} />
                <div style={{ fontSize: 12, color: '#475569' }}><strong style={{ color: '#0f172a', display: 'block', marginBottom: 2 }}>Mostrar telemóvel público</strong>Se desligares, mostramos apenas o email.</div>
              </div>

              <button style={{ width: '100%', padding: 14, background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, marginTop: 12 }} type="submit">Guardar Alterações</button>
            </form>
          </div>
        </div>
      )}

      <div className="perfil-moldura">
        <button onClick={() => navigate(rotaVoltar)} className="perfil-back">
          <Icon path={mdiChevronLeft} size={0.7} /> {labelVoltar}
        </button>

        <ProfileView
          user={utilizador} isOwner totalImoveis={totalImoveis} totalCarros={totalCarros} links={linksPerfilVisiveis}
          onEditProfile={abrirEdicaoPerfil} onShare={copiarLinkMontra} onLogout={handleLogout} onUpgrade={() => setMostrarModalEvolucao(true)}
          onAvatarChange={handleAvatarChange} onCapaChange={handleCapaChange} fileInputAvatarRef={fileInputAvatarRef} fileInputCapaRef={fileInputCapaRef}
          uploadingAvatar={uploadingAvatar} uploadingCapa={uploadingCapa} linkCopiado={linkCopiado}
        />

        <section className="perfil-premium-panel">
          <div className="perfil-premium-head">
            <div>
              <span className="perfil-premium-kicker"><Icon path={mdiCrown} size={0.62} /> Centro Premium</span>
              <h2 className="perfil-premium-title">Visibilidade e carteira num só lugar.</h2>
            </div>
            <span className="perfil-premium-state" style={{ background: premiumAtivoPerfil ? '#102f50' : '#f8fafc', color: premiumAtivoPerfil ? '#fff' : '#64748b' }}>
              {premiumAtivoPerfil ? 'Premium Ativo' : 'Prévia Premium'}
            </span>
          </div>

          {temMetricasPremiumPerfil ? (
            <div className="perfil-premium-grid">
              <div className="perfil-premium-metric"><strong>{formatarMetricaPerfil(anunciosAtivosPerfil.length)}</strong><span>ativos</span></div>
              <div className="perfil-premium-metric"><strong>{formatarMetricaPerfil(totalDestacadosPerfil)}</strong><span>destaques</span></div>
              <div className="perfil-premium-metric"><strong>{formatarMetricaPerfil(totalVisitasPerfil)}</strong><span>visitas</span></div>
              <div className="perfil-premium-metric"><strong>{formatarMetricaPerfil(totalContactosPerfil)}</strong><span>contactos</span></div>
              <div className="perfil-premium-metric"><strong>{formatarMetricaPerfil(totalGuardadosPerfil)}</strong><span>guardados</span></div>
              <div className="perfil-premium-metric"><strong>{mediaQualidadePerfil ? `${mediaQualidadePerfil}/10` : '-'}</strong><span>qualidade</span></div>
            </div>
          ) : (
            <div className="perfil-premium-empty" role="status">
              <strong>Ainda sem atividade</strong>
              <span>Publica o teu primeiro anúncio para veres estatísticas aqui.</span>
            </div>
          )}

          <div className="perfil-premium-bottom">
            <div className="perfil-premium-actions">
              <button type="button" className="perfil-premium-btn" onClick={() => navigate('/publicar')}><Icon path={mdiPlus} size={0.6} /> Publicar</button>
              <button type="button" className="perfil-premium-btn secondary" onClick={() => navigate('/planos')}><Icon path={mdiChartBar} size={0.6} /> Plano</button>
            </div>
          </div>
        </section>

        {anunciosAtivosPerfil.length > 0 && (
          <section className="perfil-quality-panel" aria-labelledby="perfil-quality-title">
            <div className="perfil-quality-head">
              <div>
                <span className="perfil-quality-kicker">Qualidade dos anúncios</span>
                <h2 id="perfil-quality-title" className="perfil-quality-title">Pequenas melhorias geram mais contactos.</h2>
                <p className="perfil-quality-copy">A pontuação considera fotos, descrição, preço, localização e contacto.</p>
              </div>
            </div>

            {anunciosParaMelhorarPerfil.length > 0 ? (
              <div className="perfil-quality-list">
                {anunciosParaMelhorarPerfil.map((anuncio) => (
                  <button type="button" key={anuncio._id} className="perfil-quality-item" onClick={() => navigate(`/editar/${anuncio._id}`)}>
                    <span>
                      <strong>{anuncio.titulo || 'Anúncio sem título'}</strong>
                      <span>Reforça fotos, descrição, localização ou contacto para aumentar a confiança antes do primeiro clique.</span>
                    </span>
                    <span className="perfil-quality-score">{Number(anuncio.scoreQualidade || 0).toFixed(1)}/10</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="perfil-quality-ok">Os teus anúncios ativos já têm informação suficiente para uma boa decisão. Mantém fotos e disponibilidade atualizadas.</div>
            )}
          </section>
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
                <button className="btn-destacar" onClick={() => navigate('/sucesso/' + anuncio._id)}>Promover Anúncio (1.99€)</button>
              )}

              <button className="analytics-trigger-btn" onClick={() => verAnalytics(anuncio._id)}>
                <Icon path={mdiChartBar} size={0.6} /> {anuncioAnalisado === anuncio._id ? 'Ocultar Relatório' : 'Ver Performance'}
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
  );
}