import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import AnuncioCard from '../../pages/shared/AnuncioCard';
import ProfileView, { obterLinksVisiveisPerfil } from './ProfileView';
import LoadingScreen from '../../components/LoadingScreen';
import { Icon } from '@mdi/react';
import { 
  mdiChartBar, mdiDomain, mdiAccountGroup, mdiClockOutline, mdiEmailOutline, mdiPhoneOutline, mdiAccountCircleOutline,
  mdiClose, mdiCrown, mdiStar, mdiChevronLeft, mdiPencil, mdiEarth, mdiCameraPlusOutline,
  mdiWeb, mdiInstagram, mdiFacebook, mdiLinkedin, mdiYoutube, mdiMusicNote, mdiWhatsapp,
  mdiPlus, mdiTrashCanOutline, mdiStorefrontOutline
} from '@mdi/js';
import { getImageUrl, normalizeUploadedImages } from '../../utils/images';

const TIPOS_LINK_PERFIL = [
  { value: 'website', label: 'Website', icon: mdiWeb },
  { value: 'instagram', label: 'Instagram', icon: mdiInstagram },
  { value: 'facebook', label: 'Facebook', icon: mdiFacebook },
  { value: 'linkedin', label: 'LinkedIn', icon: mdiLinkedin },
  { value: 'youtube', label: 'YouTube', icon: mdiYoutube },
  { value: 'tiktok', label: 'TikTok', icon: mdiMusicNote },
  { value: 'whatsapp', label: 'WhatsApp', icon: mdiWhatsapp },
  { value: 'outro', label: 'Outro', icon: mdiEarth },
];

const criarLinkPerfilVazio = () => ({ tipo: 'website', url: '' });

const prepararLinksParaEdicao = (linksPerfil, website) => {
  const links = Array.isArray(linksPerfil) ? linksPerfil.filter((link) => link?.url).slice(0, 3) : [];
  if (links.length > 0) return links.map((link) => ({ tipo: link.tipo || 'outro', url: link.url || '' }));
  if (website) return [{ tipo: 'website', url: website }];
  return [criarLinkPerfilVazio()];
};

const parseHorario = (hStr) => {
  let hSemanaDas = '', hSemanaAte = '', hFdsDas = '', hFdsAte = '';
  if (!hStr) return { hSemanaDas, hSemanaAte, hFdsDas, hFdsAte };
  const semMatch = hStr.match(/Seg a Sex: (\d{2}:\d{2}) às (\d{2}:\d{2})/);
  if (semMatch) { hSemanaDas = semMatch[1]; hSemanaAte = semMatch[2]; }
  const fdsMatch = hStr.match(/Sábado: (\d{2}:\d{2}) às (\d{2}:\d{2})/);
  if (fdsMatch) { hFdsDas = fdsMatch[1]; hFdsAte = fdsMatch[2]; }
  return { hSemanaDas, hSemanaAte, hFdsDas, hFdsAte };
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
  const [uploadingMembro, setUploadingMembro] = useState(null); 
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

  const [mostrarModalSobreNos, setMostrarModalSobreNos] = useState(false);
  const [dadosSobreNos, setDadosSobreNos] = useState({
    descricaoLonga: '', hSemanaDas: '', hSemanaAte: '', hFdsDas: '', hFdsAte: '', equipa: []
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
    } catch { alert('Erro ao atualizar avatar.'); } finally { setUploadingAvatar(false); }
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
    } catch { alert('Erro ao atualizar capa.'); } finally { setUploadingCapa(false); }
  };

  const promoverParaProfissional = async (e) => {
    e.preventDefault();
    if (!dadosEvolucao.nomeEmpresa) { alert('O Nome da Empresa é obrigatório.'); return; }
    try {
      setMostrarModalEvolucao(false);
      setIsDeleting(true);
      const res = await api.put('/users/me', { 
        tipoConta: 'profissional', 
        standNome: dadosEvolucao.nomeEmpresa,
        nome: dadosEvolucao.nomeEmpresa, 
        nif: dadosEvolucao.nif, 
        website: dadosEvolucao.website 
      });
      setUtilizador(res.data);
      if (atualizarUser) atualizarUser(res.data);
    } catch { alert('Erro ao evoluir a tua conta. Verifica o servidor.'); } finally { setIsDeleting(false); }
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

  const abrirEdicaoSobreNos = () => {
    const h = parseHorario(utilizador?.sobreNos?.horario);
    setDadosSobreNos({
      descricaoLonga: utilizador?.sobreNos?.descricaoLonga || '',
      hSemanaDas: h.hSemanaDas,
      hSemanaAte: h.hSemanaAte,
      hFdsDas: h.hFdsDas,
      hFdsAte: h.hFdsAte,
      equipa: utilizador?.sobreNos?.equipa || []
    });
    setMostrarModalSobreNos(true);
  };

  const atualizarMembroEquipa = (index, campo, valor) => {
    setDadosSobreNos(prev => ({
      ...prev,
      equipa: prev.equipa.map((m, i) => (i === index ? { ...m, [campo]: valor } : m))
    }));
  };

  const adicionarMembroEquipa = () => {
    setDadosSobreNos(prev => ({
      ...prev, equipa: [...prev.equipa, { nome: '', cargo: '', telefone: '', email: '', fotoUrl: null }]
    }));
  };

  const removerMembroEquipa = (index) => {
    setDadosSobreNos(prev => ({
      ...prev, equipa: prev.equipa.filter((_, i) => i !== index)
    }));
  };

  const handleUploadFotoMembro = async (index, file) => {
    if (!file) return;
    setUploadingMembro(index);
    try {
      const formData = new FormData();
      formData.append('imagens', file);
      formData.append('kind', 'avatar');
      const res = await api.post('/upload/imagens', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      const novaUrl = getImageUrl(normalizeUploadedImages(res.data)[0], 'large') || res.data.url;
      setDadosSobreNos(prev => {
        const novaEquipa = [...prev.equipa];
        novaEquipa[index].fotoUrl = novaUrl;
        return { ...prev, equipa: novaEquipa };
      });
    } catch (err) {
      alert('Erro ao carregar a foto do trabalhador.');
    } finally {
      setUploadingMembro(null);
    }
  };

  const salvarSobreNos = async (e) => {
    e.preventDefault();
    const arr = [];
    if (dadosSobreNos.hSemanaDas && dadosSobreNos.hSemanaAte) {
      arr.push(`Seg a Sex: ${dadosSobreNos.hSemanaDas} às ${dadosSobreNos.hSemanaAte}`);
    }
    if (dadosSobreNos.hFdsDas && dadosSobreNos.hFdsAte) {
      arr.push(`Sábado: ${dadosSobreNos.hFdsDas} às ${dadosSobreNos.hFdsAte}`);
    }
    const horarioFormatado = arr.join(' | ');

    try {
      setIsDeleting(true);
      setMostrarModalSobreNos(false);
      const res = await api.put('/users/me', { 
        sobreNos: {
          descricaoLonga: dadosSobreNos.descricaoLonga,
          horario: horarioFormatado,
          equipa: dadosSobreNos.equipa
        } 
      });
      setUtilizador(res.data);
      if (atualizarUser) atualizarUser(res.data);
    } catch { alert('Erro ao guardar os dados do Stand.'); } finally { setIsDeleting(false); }
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
    } catch { alert('Erro ao guardar as alterações.'); } finally { setIsDeleting(false); }
  };

  const copiarLinkMontra = () => {
    const identificador = utilizador?.slug || utilizador?._id;
    const link = `${window.location.origin}/vendedor/${identificador}`;
    navigator.clipboard.writeText(link);
    setLinkCopiado(true);
    setTimeout(() => setLinkCopiado(false), 2000);
  };

  const verAnalytics = async (idAnuncio) => {
    if (anuncioAnalisado === idAnuncio) { setAnuncioAnalisado(null); setDadosGrafico(null); return; }
    setAnuncioAnalisado(idAnuncio);
    try { const { data } = await api.get(`/analytics/anuncio/${idAnuncio}`); setDadosGrafico(data); } catch { alert('Erro ao carregar dados.'); setAnuncioAnalisado(null); }
  };
  
  const handleAnuncioEliminado = (idApagado) => {
    setIsDeleting(true);
    setAnuncios(prev => prev.filter(a => a._id !== idApagado));
    setTimeout(() => setIsDeleting(false), 800);
  };

  const isProfissional = utilizador?.tipoConta === 'profissional' || utilizador?.tipo === 'admin';
  const anunciosVisiveis = anuncios.filter(a => a.estado !== 'apagado' && a.estado !== 'vendido');
  const anunciosFiltrados = anunciosVisiveis.filter(a => a.tipo === abaActiva);
  const totalImoveis = anunciosVisiveis.filter(a => a.tipo === 'imovel').length;
  const totalCarros = anunciosVisiveis.filter(a => a.tipo === 'carro').length;
  const linksPerfilVisiveis = obterLinksVisiveisPerfil(utilizador);
  
  const anunciosAtivosPerfil = anunciosVisiveis;
  const totalDestacadosPerfil = anunciosAtivosPerfil.filter(a => a.destacado).length;
  const totalVisitasPerfil = anunciosAtivosPerfil.reduce((total, anuncio) => total + Number(anuncio.visitas || 0), 0);
  const totalGuardadosPerfil = anunciosAtivosPerfil.reduce((total, anuncio) => total + Number(anuncio.guardados || 0), 0);
  const totalContactosPerfil = anunciosAtivosPerfil.reduce((total, anuncio) => total + Number(anuncio.contactos || 0), 0);
  const anunciosComScorePerfil = anunciosAtivosPerfil.filter(a => Number(a.scoreQualidade || 0) > 0);
  const mediaQualidadePerfil = anunciosComScorePerfil.length
    ? Math.round((anunciosComScorePerfil.reduce((total, anuncio) => total + Number(anuncio.scoreQualidade || 0), 0) / anunciosComScorePerfil.length) * 10) / 10
    : 0;
  const temMetricasPremiumPerfil = anunciosAtivosPerfil.length > 0 || totalDestacadosPerfil > 0 || totalVisitasPerfil > 0 || totalContactosPerfil > 0;
  const formatarMetricaPerfil = (valor) => new Intl.NumberFormat('pt-PT').format(Number(valor || 0));

  if (loading) return <LoadingScreen label="A carregar perfil" detail="A preparar a tua área." minHeight="100vh" tone="light" />;

  return (
    <div className="nx-perfil-view">
      <style>{`
        .nx-perfil-view { width: 100%; overflow-x: hidden; background: #f8fafc; min-height: calc(100vh - 72px); padding: 20px 12px; display: flex; justify-content: center; font-family: 'Inter', sans-serif; color: #0f172a; box-sizing: border-box; }
        .nx-perfil-view * { box-sizing: border-box; }
        @media (min-width: 768px) { .nx-perfil-view { padding: 40px 24px; } }

        .perfil-moldura { width: 100%; max-width: 1100px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 24px 16px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); position: relative; overflow-x: hidden; }
        @media (min-width: 768px) { .perfil-moldura { padding: 48px; border-radius: 32px; } }
        
        .perfil-back { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: #64748b; text-decoration: none; text-transform: uppercase; background: none; border: none; cursor: pointer; padding: 0; margin-bottom: 24px; }
        
        .tabs-row { display: flex; gap: 4px; margin-bottom: 24px; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 10px; padding: 4px; width: 100%; overflow-x: auto; scrollbar-width: none; }
        .tab-btn { flex: 1; padding: 10px; border: none; border-radius: 7px; font-size: 13px; font-weight: 700; cursor: pointer; background: transparent; color: #64748b; text-align: center; white-space: nowrap; transition: 0.2s; }
        .tab-btn.active-imovel, .tab-btn.active-carro { background: #102f50; color: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .tab-btn.active-sobre { background: #d9c49c; color: #071326; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        
        .cards-list { display: flex; flex-direction: column; gap: 24px; width: 100%; }
        .card-wrapper { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; display: flex; flex-direction: column; gap: 16px; width: 100%; box-shadow: 0 10px 25px -10px rgba(15,23,42,0.05); }
        .card-controls { display: flex; gap: 12px; flex-wrap: wrap; }
        
        .btn-destacar, .badge-destacado, .analytics-trigger-btn { flex: 1; min-width: 200px; padding: 12px; border-radius: 8px; font-size: 12px; font-weight: 800; text-transform: uppercase; display: flex; align-items: center; justify-content: center; gap: 6px; border: none; cursor: pointer; transition: 0.2s; }
        .btn-destacar { background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }
        .btn-destacar:hover { background: #fef3c7; border-color: #fcd34d; }
        .badge-destacado { background: #fffbeb; color: #b45309; border: 1px dashed #fde68a; cursor: default; }
        .analytics-trigger-btn { background: #f8fafc; border: 1px solid #cbd5e1; color: #475569; }
        .analytics-trigger-btn:hover { background: #f1f5f9; color: #0f172a; border-color: #94a3b8; }
        
        .analytics-panel { padding: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; width: 100%; }
        .stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px; width: 100%; }
        .stat-box { text-align: center; }
        .stat-box-val { font-size: 22px; font-weight: 900; color: #0f172a; }
        .stat-box-lbl { font-size: 10px; font-weight: 800; text-transform: uppercase; color: #64748b; margin-top: 4px; }
        
        .perfil-upgrade-banner { background: linear-gradient(135deg, #102f50 0%, #0a1f35 100%); border-radius: 20px; padding: 24px 32px; display: flex; align-items: center; justify-content: space-between; gap: 24px; margin: 16px 0 32px; box-shadow: 0 15px 35px -10px rgba(16,47,80,0.4); border: 1px solid rgba(217,196,156,0.3); flex-wrap: wrap; }
        .upgrade-content { display: flex; align-items: center; gap: 20px; flex: 1; }
        .upgrade-icon { color: #d9c49c; background: rgba(217,196,156,0.1); padding: 12px; border-radius: 16px; flex-shrink: 0; }
        .upgrade-content h3 { color: #ffffff; font-size: 20px; margin: 0 0 6px; font-weight: 800; }
        .upgrade-content p { color: #94a3b8; font-size: 14px; margin: 0; line-height: 1.5; }
        .upgrade-btn { background: #d9c49c; color: #071326; border: none; padding: 14px 24px; border-radius: 12px; font-weight: 900; font-size: 14px; cursor: pointer; white-space: nowrap; transition: 0.2s; box-shadow: 0 4px 12px rgba(217,196,156,0.3); }
        .upgrade-btn:hover { background: #f0dfbb; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(217,196,156,0.5); }
        @media (max-width: 768px) { .perfil-upgrade-banner { padding: 20px; flex-direction: column; align-items: flex-start; text-align: left; } .upgrade-btn { width: 100%; text-align: center; justify-content: center; } }

        .perfil-premium-panel { margin: 0 0 24px; border: 1px solid rgba(217,196,156,.5); border-radius: 16px; padding: 24px; background: linear-gradient(135deg, rgba(255,255,255,1), rgba(217,196,156,.15)); width: 100%; }
        .perfil-premium-head { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; width: 100%; }
        .perfil-premium-title { margin: 0; color: #102f50; font-size: 20px; line-height: 1.2; font-weight: 900; }
        .perfil-premium-kicker { color: #d9c49c; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; display: flex; align-items: center; gap: 4px; margin-bottom: 4px;}
        .perfil-premium-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; width: 100%; }
        .perfil-premium-empty { display: flex; flex-direction: column; gap: 8px; padding: 20px; border: 1px dashed rgba(16,47,80,.2); border-radius: 12px; background: rgba(255,255,255,.8); color: #475569; }
        .perfil-premium-empty strong { color: #102f50; font-size: 14px; font-weight: 900; }
        .perfil-premium-empty span { font-size: 13px; line-height: 1.5; }
        @media (min-width: 640px) { .perfil-premium-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } .perfil-premium-head { flex-direction: row; justify-content: space-between; align-items: flex-start; } .perfil-premium-title { font-size: 24px; } }
        @media (min-width: 1024px) { .perfil-premium-grid { grid-template-columns: repeat(6, minmax(0, 1fr)); } }
        
        .perfil-premium-metric { min-height: 76px; display: grid; align-content: center; gap: 6px; padding: 12px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff; text-align: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
        .perfil-premium-metric strong { color: #0f172a; font-size: 22px; font-weight: 900; line-height: 1; }
        .perfil-premium-metric span { color: #64748b; font-size: 9px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
        
        .perfil-premium-bottom { display: flex; flex-direction: column; gap: 16px; margin-top: 24px; width: 100%; }
        .perfil-premium-actions { display: flex; flex-direction: column; gap: 12px; width: 100%; }
        @media (min-width: 640px) { .perfil-premium-actions { flex-direction: row; justify-content: flex-start; } .perfil-premium-btn { flex: 1; } }
        
        .perfil-premium-btn { width: 100%; padding: 14px; border-radius: 10px; border: 1px solid #102f50; background: #102f50; color: #ffffff; font-size: 13px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer; text-transform: uppercase; transition: 0.2s; }
        .perfil-premium-btn:hover { background: #071326; border-color: #071326; }
        .perfil-premium-btn.secondary { background: #ffffff; color: #102f50; border-color: #cbd5e1; }
        .perfil-premium-btn.secondary:hover { background: #f8fafc; border-color: #94a3b8; }

        .perfil-quality-panel { margin: 0 0 24px; border: 1px solid rgba(16,47,80,.12); border-radius: 16px; padding: 24px; background: #ffffff; width: 100%; }
        .perfil-quality-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; margin-bottom: 20px; }
        .perfil-quality-kicker { color: #102f50; font-size: 11px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
        .perfil-quality-title { margin: 6px 0 0; color: #071326; font-size: 20px; line-height: 1.2; font-weight: 900; }
        .perfil-quality-copy { margin: 8px 0 0; color: #64748b; font-size: 14px; line-height: 1.5; }
        .perfil-quality-list { display: grid; gap: 12px; }
        .perfil-quality-item { width: 100%; display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 16px; align-items: center; padding: 16px; border: 1px solid #e2e8f0; border-radius: 12px; background: #f8fafc; text-align: left; font: inherit; cursor: pointer; transition: 0.2s; }
        .perfil-quality-item:hover { border-color: #94a3b8; background: #f1f5f9; }
        .perfil-quality-item strong { display: block; color: #0f172a; font-size: 15px; font-weight: 800; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .perfil-quality-item span span { display: block; margin-top: 4px; color: #64748b; font-size: 13px; line-height: 1.4; }
        .perfil-quality-score { min-width: 62px; display: inline-flex; justify-content: center; padding: 8px 12px; border-radius: 999px; border: 1px solid rgba(217,196,156,.45); background: #fff9eb; color: #102f50; font-size: 13px; font-weight: 900; }
        .perfil-quality-ok { padding: 16px; border: 1px dashed rgba(217,196,156,.52); border-radius: 12px; color: #102f50; background: #fffaf0; font-size: 14px; font-weight: 700; line-height: 1.5; }

        /* PREVIEW SOBRE NÓS */
        .preview-sobre-title { font-size: 24px; font-weight: 900; color: #0f172a; margin: 0; }
        .preview-sobre-horario { display: inline-flex; align-items: center; gap: 8px; padding: 12px 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; font-weight: 700; color: #102f50; margin-bottom: 24px; font-size: 14px;}
        .preview-sobre-bio { font-size: 15px; line-height: 1.7; color: #475569; white-space: pre-wrap; margin-bottom: 32px; background: #fafcff; padding: 20px; border-radius: 12px; border: 1px dashed #cbd5e1; }
        .preview-equipa-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; margin-top: 16px; }
        .preview-membro-card { padding: 16px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); display: flex; flex-direction: column; gap: 10px; }

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

      {mostrarModalEvolucao && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button className="modal-close" onClick={() => setMostrarModalEvolucao(false)}><Icon path={mdiClose} size={1} /></button>
            <h2 style={{ fontSize: 20, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}><Icon path={mdiDomain} size={1} color="#3b82f6" /> Evolução de Conta</h2>
            <form onSubmit={promoverParaProfissional}>
              <div className="modal-form-group"><label>Nome do Stand / Agência *</label><input className="modal-input" type="text" value={dadosEvolucao.nomeEmpresa} onChange={e => setDadosEvolucao({...dadosEvolucao, nomeEmpresa: e.target.value})} required /></div>
              <div className="modal-form-group"><label>NIF da Empresa (Opcional)</label><input className="modal-input" type="text" value={dadosEvolucao.nif} onChange={e => setDadosEvolucao({...dadosEvolucao, nif: e.target.value})} /></div>
              <div className="modal-form-group"><label>Website (Opcional)</label><input className="modal-input" type="url" value={dadosEvolucao.website} onChange={e => setDadosEvolucao({...dadosEvolucao, website: e.target.value})} /></div>
              <button style={{ width: '100%', padding: 14, background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700 }} type="submit">Confirmar Evolução</button>
            </form>
          </div>
        </div>
      )}

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
                <button type="button" style={{ marginTop: 8, padding: '10px 12px', fontSize: 12, fontWeight: 700, borderRadius: 8, border: '1px dashed #cbd5e1', background: '#f8fafc', color: '#102f50', width: '100%', cursor: 'pointer' }} onClick={adicionarLinkPerfil} disabled={dadosEditar.linksPerfil.length >= 3}>
                  <Icon path={mdiPlus} size={0.7} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Adicionar Link
                </button>
              </div>
              <div className="modal-form-group" style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <input type="checkbox" checked={dadosEditar.mostrarTelefonePublico} onChange={e => setDadosEditar({ ...dadosEditar, mostrarTelefonePublico: e.target.checked })} style={{ marginTop: 2 }} />
                <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.4 }}><strong style={{ color: '#0f172a', display: 'block', marginBottom: 2 }}>Mostrar telemóvel público</strong>Se desligares, mostramos apenas o email.</div>
              </div>
              <button style={{ width: '100%', padding: 16, background: '#102f50', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 800, marginTop: 12, cursor: 'pointer' }} type="submit">Guardar Alterações</button>
            </form>
          </div>
        </div>
      )}

      {mostrarModalSobreNos && (
        <div className="modal-overlay">
          <div className="modal-card" style={{ maxWidth: 650 }}>
            <button className="modal-close" onClick={() => setMostrarModalSobreNos(false)}><Icon path={mdiClose} size={1} /></button>
            <h2 style={{ fontSize: 20, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}><Icon path={mdiStorefrontOutline} size={1} color="#d9c49c" /> Gerir O Meu Stand</h2>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 24 }}>Apresenta a tua empresa, horários e fotos da equipa.</p>
            
            <form onSubmit={salvarSobreNos}>
              <div className="modal-form-group">
                <label style={{ fontSize: 12, fontWeight: 800, color: '#102f50', textTransform: 'uppercase' }}>História e Garantias</label>
                <textarea className="modal-input" style={{ minHeight: 100, marginTop: 6 }} value={dadosSobreNos.descricaoLonga} onChange={e => setDadosSobreNos({...dadosSobreNos, descricaoLonga: e.target.value})} maxLength={3000} placeholder="Conta a história do teu Stand, os serviços e garantias que oferecem aos clientes..." />
              </div>

              <div className="modal-form-group" style={{ background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <label style={{ fontSize: 12, fontWeight: 800, color: '#102f50', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>Horários de Funcionamento</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, width: 110 }}>Dias Úteis:</span>
                  <input type="time" className="modal-input" style={{ width: 'auto', padding: '10px' }} value={dadosSobreNos.hSemanaDas} onChange={e => setDadosSobreNos(p => ({...p, hSemanaDas: e.target.value}))} />
                  <span style={{ fontSize: 13, color: '#64748b' }}>às</span>
                  <input type="time" className="modal-input" style={{ width: 'auto', padding: '10px' }} value={dadosSobreNos.hSemanaAte} onChange={e => setDadosSobreNos(p => ({...p, hSemanaAte: e.target.value}))} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, width: 110 }}>Sábado:</span>
                  <input type="time" className="modal-input" style={{ width: 'auto', padding: '10px' }} value={dadosSobreNos.hFdsDas} onChange={e => setDadosSobreNos(p => ({...p, hFdsDas: e.target.value}))} />
                  <span style={{ fontSize: 13, color: '#64748b' }}>às</span>
                  <input type="time" className="modal-input" style={{ width: 'auto', padding: '10px' }} value={dadosSobreNos.hFdsAte} onChange={e => setDadosSobreNos(p => ({...p, hFdsAte: e.target.value}))} />
                </div>
              </div>

              <div className="modal-form-group">
                <label style={{ fontSize: 12, fontWeight: 800, color: '#102f50', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>A Nossa Equipa</label>
                {dadosSobreNos.equipa.map((membro, index) => (
                  <div key={index} style={{ padding: 16, background: '#fafcff', border: '1px solid #cbd5e1', borderRadius: 12, marginBottom: 12, position: 'relative', display: 'flex', gap: 16 }}>
                    <button type="button" onClick={() => removerMembroEquipa(index)} style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Icon path={mdiTrashCanOutline} size={0.8} /></button>
                    
                    <div style={{ position: 'relative', width: 68, height: 68, flexShrink: 0, borderRadius: '50%', background: '#e2e8f0', overflow: 'hidden', border: '2px solid #fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                      {membro.fotoUrl ? (
                         <img src={membro.fotoUrl} alt="Foto" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                         <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                            <Icon path={mdiCameraPlusOutline} size={1.2} />
                         </div>
                      )}
                      <input type="file" accept="image/*" title="Alterar foto" onChange={e => handleUploadFotoMembro(index, e.target.files[0])} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                      {uploadingMembro === index && (
                         <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.7)', display: 'grid', placeItems: 'center' }}>
                            <span style={{ fontSize: 10, fontWeight: 'bold' }}>...</span>
                         </div>
                      )}
                    </div>

                    <div style={{ flex: 1, display: 'grid', gap: 8 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        <input className="modal-input" type="text" placeholder="Nome do vendedor *" value={membro.nome} onChange={e => atualizarMembroEquipa(index, 'nome', e.target.value)} required />
                        <input className="modal-input" type="text" placeholder="Cargo (Ex: Comercial) *" value={membro.cargo} onChange={e => atualizarMembroEquipa(index, 'cargo', e.target.value)} required />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        <input className="modal-input" type="tel" placeholder="Telefone (9 dígitos)" value={membro.telefone} 
                          onChange={e => {
                            const apenasNumeros = e.target.value.replace(/\D/g, '').slice(0, 9);
                            atualizarMembroEquipa(index, 'telefone', apenasNumeros);
                          }} 
                        />
                        <input className="modal-input" type="email" placeholder="Email (Opcional)" value={membro.email} onChange={e => atualizarMembroEquipa(index, 'email', e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
                <button type="button" style={{ padding: '12px', fontSize: 13, fontWeight: 700, borderRadius: 8, border: '1px dashed #cbd5e1', background: '#ffffff', color: '#102f50', width: '100%', cursor: 'pointer' }} onClick={adicionarMembroEquipa}>
                  <Icon path={mdiPlus} size={0.7} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Adicionar Trabalhador
                </button>
              </div>
              <button style={{ width: '100%', padding: 16, background: '#102f50', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 800, marginTop: 12, cursor: 'pointer' }} type="submit">Guardar as Alterações</button>
            </form>
          </div>
        </div>
      )}

      <div className="perfil-moldura">
        <button onClick={() => navigate(rotaVoltar)} className="perfil-back"><Icon path={mdiChevronLeft} size={0.7} /> {labelVoltar}</button>

        <ProfileView
          user={utilizador} isOwner totalImoveis={totalImoveis} totalCarros={totalCarros} links={linksPerfilVisiveis}
          onEditProfile={abrirEdicaoPerfil} onShare={copiarLinkMontra} onLogout={handleLogout} onUpgrade={() => setMostrarModalEvolucao(true)}
          onAvatarChange={handleAvatarChange} onCapaChange={handleCapaChange} fileInputAvatarRef={fileInputAvatarRef} fileInputCapaRef={fileInputCapaRef}
          uploadingAvatar={uploadingAvatar} uploadingCapa={uploadingCapa} linkCopiado={linkCopiado}
        />

        <div className="tabs-row">
          <button className={`tab-btn${abaActiva === 'imovel' ? ' active-imovel' : ''}`} onClick={() => setAbaActiva('imovel')}>Imóveis {totalImoveis > 0 && `(${totalImoveis})`}</button>
          <button className={`tab-btn${abaActiva === 'carro' ? ' active-carro' : ''}`} onClick={() => setAbaActiva('carro')}>Automóveis {totalCarros > 0 && `(${totalCarros})`}</button>
          {isProfissional && (
            <button className={`tab-btn${abaActiva === 'sobre' ? ' active-sobre' : ''}`} onClick={() => setAbaActiva('sobre')}>
              <Icon path={mdiStorefrontOutline} size={0.6} style={{ verticalAlign: 'middle', marginRight: 4 }} /> O Meu Stand
            </button>
          )}
        </div>

        {abaActiva === 'sobre' && isProfissional && (
          <div className="card-wrapper" style={{ padding: '32px', marginBottom: 24, border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
              <h2 className="preview-sobre-title">O Meu Stand (Página Pública)</h2>
              <button onClick={abrirEdicaoSobreNos} style={{ padding: '10px 20px', background: '#102f50', color: '#fff', borderRadius: '8px', fontSize: '13px', fontWeight: 800, border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <Icon path={mdiPencil} size={0.7} /> Editar Página
              </button>
            </div>

            {(!utilizador?.sobreNos?.descricaoLonga && (!utilizador?.sobreNos?.equipa || utilizador?.sobreNos?.equipa.length === 0)) ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                <Icon path={mdiStorefrontOutline} size={2.5} color="#94a3b8" />
                <h3 style={{ margin: '16px 0 8px', color: '#0f172a', fontSize: '18px', fontWeight: 800 }}>Mini-site inativo</h3>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px', maxWidth: 400, margin: '0 auto 20px' }}>Destaca o teu negócio. Adiciona a vossa história, horários e equipa comercial para transmitir confiança aos compradores.</p>
                <button onClick={abrirEdicaoSobreNos} style={{ padding: '12px 24px', background: '#d9c49c', color: '#071326', borderRadius: '8px', fontSize: '14px', fontWeight: 800, border: 'none', cursor: 'pointer' }}>Configurar Agora</button>
              </div>
            ) : (
              <div>
                {utilizador?.sobreNos?.horario && (
                  <div className="preview-sobre-horario">
                    <Icon path={mdiClockOutline} size={0.8} /> {utilizador.sobreNos.horario}
                  </div>
                )}
                {utilizador?.sobreNos?.descricaoLonga && (
                  <div className="preview-sobre-bio">{utilizador.sobreNos.descricaoLonga}</div>
                )}
                {utilizador?.sobreNos?.equipa?.length > 0 && (
                  <>
                    <h3 style={{ fontSize: 18, fontWeight: 900, color: '#0f172a', margin: '0 0 16px' }}>A nossa equipa</h3>
                    <div className="preview-equipa-grid">
                      {utilizador.sobreNos.equipa.map((membro, i) => (
                        <div key={i} className="preview-membro-card">
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#e2e8f0', display: 'grid', placeItems: 'center', color: '#64748b', overflow: 'hidden' }}>
                              {membro.fotoUrl ? (
                                <img src={membro.fotoUrl} alt={membro.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              ) : (
                                <Icon path={mdiAccountCircleOutline} size={1.2} />
                              )}
                            </div>
                            <div>
                              <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: '#0f172a' }}>{membro.nome}</p>
                              <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#102f50', textTransform: 'uppercase' }}>{membro.cargo}</p>
                            </div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
                            {membro.telefone && <span style={{ fontSize: 13, color: '#475569', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><Icon path={mdiPhoneOutline} size={0.6} /> {membro.telefone}</span>}
                            {membro.email && <span style={{ fontSize: 13, color: '#475569', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><Icon path={mdiEmailOutline} size={0.6} /> {membro.email}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        <div className="cards-list">
          {abaActiva !== 'sobre' && anunciosFiltrados.map(anuncio => (
            <div key={anuncio._id} className="card-wrapper">
              <AnuncioCard anuncio={anuncio} showStatus onAnuncioEliminado={handleAnuncioEliminado} />
              <div className="card-controls">
                {anuncio.destacado ? (
                  <div className="badge-destacado"><Icon path={mdiStar} size={0.7} /> Destaque Ativo</div>
                ) : (
                  <button className="btn-destacar" onClick={() => navigate('/sucesso/' + anuncio._id)}>Promover Anúncio (1.99€)</button>
                )}
                <button className="analytics-trigger-btn" onClick={() => verAnalytics(anuncio._id)}>
                  <Icon path={mdiChartBar} size={0.7} /> {anuncioAnalisado === anuncio._id ? 'Ocultar Relatório' : 'Ver Performance'}
                </button>
              </div>

              {anuncioAnalisado === anuncio._id && dadosGrafico && (
                <div className="analytics-panel">
                  <div className="stat-grid">
                    <div className="stat-box"><div className="stat-box-val">{dadosGrafico.totalVisitas}</div><div className="stat-box-lbl">Visitas</div></div>
                    <div className="stat-box" style={{ borderLeft: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0' }}><div className="stat-box-val" style={{ color: '#3b82f6' }}>{dadosGrafico.guardadoEmFavoritos}</div><div className="stat-box-lbl">Favoritos</div></div>
                    <div className="stat-box"><div className="stat-box-val" style={{ color: '#d9c49c' }}>{dadosGrafico.contactosGerados}</div><div className="stat-box-lbl">Mensagens</div></div>
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