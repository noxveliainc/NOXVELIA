import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import AnuncioCard from '../../pages/shared/AnuncioCard';
import Icon from '@mdi/react';
import { 
  mdiCheckDecagram, mdiChartBar, mdiShareVariantOutline, mdiDomain, 
  mdiClose, mdiCrown, mdiCheck, mdiEmailOutline, mdiPhoneOutline, mdiStar,
  mdiChevronLeft   // <-- adicionar isto
} from '@mdi/js';

export default function Perfil() {
  const { user, signed, atualizarAvatar, atualizarUser, logout: limparSessaoGlobal } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const contextoVisualAtual = localStorage.getItem('@App:contexto_visual') || 'imovel';

  const [utilizador, setUtilizador] = useState(null);
  const [anuncios, setAnuncios] = useState([]);
  const [abaActiva, setAbaActiva] = useState(contextoVisualAtual); 
  
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [erro, setErro] = useState(null);
  const [linkCopiado, setLinkCopiado] = useState(false);
  
  const [anuncioAnalisado, setAnuncioAnalisado] = useState(null);
  const [dadosGrafico, setDadosGrafico] = useState(null);

  const [mostrarModalEvolucao, setMostrarModalEvolucao] = useState(false);
  const [dadosEvolucao, setDadosEvolucao] = useState({ nomeEmpresa: '', nif: '', website: '' });

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
      setErro('Erro ao processar a imagem.');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const promoverParaProfissional = async (e) => {
    e.preventDefault();
    if (!dadosEvolucao.nomeEmpresa) {
      alert('O Nome da Empresa é obrigatório para contas profissionais.');
      return;
    }
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

  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}><div className="nx-spinner" style={{ borderColor: 'rgba(42, 193, 180, 0.2)', borderTopColor: '#2ac1b4' }} /></div>;

  return (
    <>
      <style>{`
        .perfil-outer { background: #f8fafc; min-height: calc(100vh - 72px); padding: 40px 24px; display: flex; justify-content: center; font-family: 'Inter', sans-serif; color: #0f172a; }
        .perfil-moldura { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 32px; width: 100%; max-width: 1100px; padding: 48px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); position: relative; }
        
        .perfil-back { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: #64748b; text-decoration: none; letter-spacing: .05em; text-transform: uppercase; background: none; border: none; cursor: pointer; padding: 0; transition: color .2s; margin-bottom: 32px; }
        .perfil-back:hover { color: #0f172a; }
        
        .perfil-header { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 20px; padding: 36px; margin-bottom: 32px; display: flex; align-items: center; gap: 32px; flex-wrap: wrap; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
        
        .perfil-avatar-wrap { position: relative; cursor: pointer; flex-shrink: 0; }
        .perfil-avatar { width: 100px; height: 100px; border-radius: 20px; border: 1px solid #cbd5e1; overflow: hidden; background: #ffffff; display: flex; align-items: center; justify-content: center; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 32px; color: #2ac1b4; transition: filter .2s, border-color .2s, box-shadow .2s; }
        .perfil-avatar-wrap:hover .perfil-avatar { filter: brightness(.95); }
        .perfil-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .perfil-avatar-overlay { position: absolute; inset: 0; border-radius: 20px; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity .2s; background: rgba(15,23,42,0.6); pointer-events: none; }
        .perfil-avatar-wrap:hover .perfil-avatar-overlay { opacity: 1; }

        .perfil-avatar-wrap.is-premium .perfil-avatar { border: 2px solid #eab308; box-shadow: 0 0 0 4px rgba(234, 179, 8, 0.15); }
        
        .perfil-info { flex: 1; min-width: 0; }
        
        .perfil-badge-conta { display: inline-block; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; padding: 4px 10px; border-radius: 6px; }
        .badge-profissional { background: rgba(42, 193, 180, 0.1); color: #0d9488; border: 1px solid rgba(42, 193, 180, 0.2); }
        .badge-particular { background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; }
        .badge-premium { background: rgba(234, 179, 8, 0.1); color: #d97706; border: 1px solid rgba(234, 179, 8, 0.3); margin-left: 8px; }
        
        .btn-upgrade { margin-left: 12px; background: transparent; color: #2563eb; border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 6px; font-size: 10px; font-weight: 800; padding: 6px 12px; cursor: pointer; text-transform: uppercase; transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px; }
        .btn-upgrade:hover { background: rgba(59, 130, 246, 0.05); border-color: rgba(59, 130, 246, 0.5); }

        .perfil-name { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 28px; font-weight: 800; color: #0f172a; margin: 0 0 4px; display: flex; align-items: center; gap: 8px; }
        .perfil-email { font-size: 13px; color: #64748b; margin: 0; display: flex; align-items: center; }
        
        .stars-container { display: flex; align-items: center; gap: 4px; color: #f59e0b; margin-top: 8px; margin-bottom: 20px; }
        .stars-text { font-size: 13px; font-weight: 700; color: #0f172a; margin-left: 4px; }
        .stars-count { font-size: 12px; font-weight: 500; color: #64748b; }

        .perfil-stats { display: flex; gap: 32px; }
        .perfil-stat-val { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 24px; font-weight: 700; color: #0f172a; line-height: 1; }
        .perfil-stat-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: #64748b; margin-top: 3px; }
        .perfil-stat-divider { width: 1px; background: #e2e8f0; margin: 0 4px; }
        
        .perfil-actions { display: flex; flex-direction: column; gap: 10px; width: 200px; }
        @media (max-width: 768px) { .perfil-actions { width: 100%; } }

        .btn-action-primary { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; background: rgba(42, 193, 180, 0.1); color: #0d9488; border: 1px solid rgba(42, 193, 180, 0.2); border-radius: 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; cursor: pointer; transition: all .2s; }
        .btn-action-primary:hover { background: rgba(42, 193, 180, 0.15); }

        .btn-action-solid { padding: 12px; background: #0f172a; color: #ffffff; border: none; border-radius: 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; cursor: pointer; transition: opacity .2s; }
        .btn-action-solid:hover { opacity: 0.85; }
        
        .btn-action-outline { padding: 12px; background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 12px; font-weight: 600; text-transform: uppercase; cursor: pointer; transition: all .2s; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.02); }
        .btn-action-outline:hover { border-color: #94a3b8; color: #0f172a; background: #f8fafc; }
        .btn-action-outline.danger:hover { border-color: #ef4444; color: #ef4444; background: #fef2f2; }
        
        .tabs-row { display: flex; gap: 4px; margin-bottom: 28px; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 10px; padding: 4px; width: fit-content; }
        .tab-btn { padding: 9px 22px; border: none; border-radius: 7px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all .2s; background: transparent; color: #64748b; }
        .tab-btn.active-imovel { background: #3ecf8e; color: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .tab-btn.active-carro { background: #2ac1b4; color: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        
        .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
        .card-wrapper { display: flex; flex-direction: column; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 12px; gap: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); transition: border-color .2s; }
        .card-wrapper:hover { border-color: #cbd5e1; }
        
        .btn-destacar { width: 100%; padding: 10px; background: #fefce8; color: #a16207; border: 1px solid #fde047; border-radius: 8px; font-size: 11px; font-weight: 800; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
        .btn-destacar:hover { background: #fef08a; }
        .badge-destacado { width: 100%; padding: 10px; background: #fefce8; color: #ca8a04; border: 1px dashed #fde047; border-radius: 8px; font-size: 11px; font-weight: 800; text-transform: uppercase; text-align: center; }
        
        .analytics-trigger-btn { width: 100%; padding: 10px; background: #f8fafc; border: 1px dashed #cbd5e1; color: #64748b; border-radius: 8px; font-size: 11px; font-weight: 700; text-transform: uppercase; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.2s;}
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

        .modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(8px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 24px; overflow-y: auto;}
        .modal-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 24px; width: 100%; max-width: 480px; padding: 40px; position: relative; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1); margin: auto; }
        .modal-close { position: absolute; top: 24px; right: 24px; background: transparent; border: none; color: #94a3b8; cursor: pointer; transition: color 0.2s; }
        .modal-close:hover { color: #0f172a; }
        .modal-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 24px; font-weight: 800; color: #0f172a; margin: 0 0 8px; display: flex; align-items: center; gap: 10px; }
        .modal-desc { font-size: 14px; color: #64748b; margin: 0 0 24px; line-height: 1.5; }
        
        .modal-form-group { margin-bottom: 20px; }
        .modal-form-group label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 8px; }
        .modal-input { width: 100%; padding: 14px 16px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; color: #0f172a; outline: none; font-size: 14px; transition: all 0.2s; box-sizing: border-box; }
        .modal-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15); }
        .modal-input::placeholder { color: #94a3b8; }
        
        .modal-divider { height: 1px; background: #e2e8f0; margin: 32px 0; }
        
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

          <div className="perfil-header">
            <div className={`perfil-avatar-wrap${utilizador?.premiumAtivo ? ' is-premium' : ''}`} onClick={() => fileInputRef.current?.click()}>
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
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
            </div>

            <div className="perfil-info">
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                <div className={`perfil-badge-conta ${utilizador?.tipoConta === 'profissional' ? 'badge-profissional' : 'badge-particular'}`}>
                  {utilizador?.tipoConta === 'profissional' ? 'Conta Profissional' : 'Conta Particular'}
                </div>

                {utilizador?.premiumAtivo && (
                  <div className="perfil-badge-conta badge-premium"><Icon path={mdiStar} size={0.4} /> Premium</div>
                )}
                
                {utilizador?.tipoConta !== 'profissional' && utilizador?.tipo !== 'admin' && (
                  <button className="btn-upgrade" onClick={() => setMostrarModalEvolucao(true)}>
                    <Icon path={mdiDomain} size={0.5} /> Evoluir para Profissional
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

              {/* 🌟 ESTRELAS DE AVALIAÇÃO REAIS */}
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
              <button className="btn-action-primary" onClick={copiarLinkMontra}>
                <Icon path={mdiShareVariantOutline} size={0.7} /> 
                {linkCopiado ? 'Link Copiado!' : 'Partilhar Montra'}
              </button>
              
              <button className="btn-action-solid" onClick={() => navigate('/publicar')}>+ Criar Anúncio</button>

              <button className="btn-action-outline danger" onClick={handleLogout}>Terminar Sessão</button>
            </div>
          </div>

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