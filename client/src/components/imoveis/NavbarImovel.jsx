import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export default function NavbarImovel() {
  const { user, signed, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); 
  const [scrolled, setScrolled] = useState(false);
  
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const logoRef = useRef(null);

  const [notificacoes, setNotificacoes] = useState([]);
  const [sinoAberto, setSinoAberto] = useState(false);
  const sinoRef = useRef(null);
  const naoLidasSino = notificacoes.filter(n => !n.lida).length;

  const [userMenuAberto, setUserMenuAberto] = useState(false);
  const userMenuRef = useRef(null);
  
  const [mostrarModalPassword, setMostrarModalPassword] = useState(false);
  const [dadosPassword, setDadosPassword] = useState({ atual: '', nova: '', confirmar: '' });
  const [isUpdatingPwd, setIsUpdatingPwd] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  // 🌟 NOVO: Estado para controlar o menu mobile
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const cliqueFora = (e) => {
      if (logoRef.current && !logoRef.current.contains(e.target)) setDropdownAberto(false);
      if (sinoRef.current && !sinoRef.current.contains(e.target)) setSinoAberto(false);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuAberto(false);
    };
    window.addEventListener('click', cliqueFora);
    return () => window.removeEventListener('click', cliqueFora);
  }, []);

  useEffect(() => {
    if (!signed) return;
    const fetchNotificacoes = async () => {
      try {
        const resNotif = await api.get('/notificacoes').catch(() => ({ data: [] }));
        setNotificacoes(resNotif.data || []);
      } catch {}
    };
    fetchNotificacoes();
    const id = setInterval(fetchNotificacoes, 8000);
    return () => clearInterval(id);
  }, [signed]);

  const handleLerNotificacao = async (notif) => {
    if (!notif.lida) {
      setNotificacoes(prev => prev.map(n => n._id === notif._id ? { ...n, lida: true } : n));
      api.put(`/notificacoes/${notif._id}/ler`).catch(() => {});
    }
    setSinoAberto(false);
    if (notif.link) navigate(notif.link);
  };

  const handleIrParaHome = (e) => {
    e.preventDefault();
    setMenuMobileAberto(false);
    navigate('/imoveis');
  };

  const handlePremium = (e) => {
    e.preventDefault();
    setMenuMobileAberto(false);
    navigate('/planos');
  };

  const alterarPassword = async (e) => {
    e.preventDefault();
    if (dadosPassword.nova !== dadosPassword.confirmar) return alert('As novas palavras-passe não coincidem!');
    try {
      setIsUpdatingPwd(true);
      await api.put('/users/me/password', { passwordAtual: dadosPassword.atual, novaPassword: dadosPassword.nova });
      alert('Palavra-passe alterada com sucesso!');
      setMostrarModalPassword(false);
      setDadosPassword({ atual: '', nova: '', confirmar: '' });
      setMostrarPassword(false);
    } catch (err) { alert(err.response?.data?.erro || 'Erro ao alterar a palavra-passe.'); } finally { setIsUpdatingPwd(false); }
  };

  const obterUserLocal = () => { try { const guardado = localStorage.getItem('@App:user'); return guardado ? JSON.parse(guardado) : null; } catch { return null; } };
  const dadosUser = user || obterUserLocal();
  const avatarImg = dadosUser?.avatarUrl || dadosUser?.avatar;
  const inicial = dadosUser?.nome?.charAt(0).toUpperCase() || 'U';
  const primeiroNome = dadosUser?.nome?.split(' ')[0] || '';
  const isPremium = dadosUser?.premiumAtivo === true;
  const isAdmin = dadosUser?.tipo === 'admin';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@800&display=swap');
        html, body { overflow-x: hidden; overscroll-behavior-x: none; }
        .nim-root { position: sticky; top: 0; z-index: 1000; height: 72px; display: flex; align-items: center; padding: 0 32px; justify-content: space-between; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid #e2e8f0; transition: all 0.25s ease; font-family: 'Inter', sans-serif; }
        .nim-root.scrolled { background: #ffffff; box-shadow: 0 4px 12px -4px rgba(15, 23, 42, 0.03); height: 68px; }
        .nim-logo-wrapper { position: relative; display: flex; align-items: center; cursor: pointer; }
        .nim-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; user-select: none; }
        .nim-logo-brand-text { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 18px; font-weight: 800; color: #0f172a; letter-spacing: -0.03em; display: flex; align-items: center; gap: 6px; }
        .nim-logo-brand-text span { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 700; color: #3ecf8e; letter-spacing: 0.05em; text-transform: uppercase; display: inline-flex; align-items: center; gap: 4px; }
        .nim-logo-brand-text span::after { content: '▾'; font-size: 12px; color: #64748b; transition: transform 0.2s ease; }
        .nim-logo-wrapper.active .nim-logo-brand-text span::after { transform: rotate(180deg); }
        .nim-switcher-dropdown { position: absolute; top: calc(100% + 12px); left: 0; background: rgba(255, 255, 255, 0.9); border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08); padding: 6px; min-width: 220px; display: flex; flex-direction: column; gap: 4px; z-index: 1010; }
        .nim-switcher-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600; color: #475569; }
        .nim-switcher-item:hover { background: #f1f5f9; color: #0f172a; }
        .nim-switcher-item.current { background: rgba(62, 207, 142, 0.08); color: #3ecf8e; pointer-events: none; }

        .nim-actions { display: flex; align-items: center; gap: 8px; }
        .nim-btn-publish { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; background: #059669; color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none; border-radius: 8px; border: none; transition: all 0.2s ease; margin-right: 12px; }
        .nim-btn-publish:hover { background: #047857; }
        .nim-divider { width: 1px; height: 20px; background: #e2e8f0; margin: 0 8px; flex-shrink: 0; }
        .nim-icon-btn { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 8px; background: transparent; border: none; cursor: pointer; color: #475569; text-decoration: none; transition: all 0.2s ease; }
        .nim-icon-btn:hover { background: #f8fafc; color: #0f172a; }
        .nim-icon-btn svg { width: 20px; height: 20px; stroke-width: 2; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; }
        .nim-icon-btn.admin { color: #6366f1; }
        .nim-icon-btn.admin:hover { background: rgba(99, 102, 241, 0.1); color: #4f46e5; }
        .nim-badge { position: absolute; top: -2px; right: -2px; min-width: 16px; height: 16px; background: #ef4444; color: #ffffff; font-size: 9px; font-weight: 800; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #ffffff; line-height: 1; padding: 0 4px; box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2); }
        .nim-btn-premium { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 8px; background: transparent; border: none; cursor: pointer; color: #eab308; text-decoration: none; transition: all 0.2s ease; }
        .nim-btn-premium:hover { background: rgba(234, 179, 8, 0.1); color: #ca8a04; }
        .nim-btn-premium svg { width: 20px; height: 20px; stroke-width: 2; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; }
        .nim-btn-premium.active { color: #eab308; }
        .nim-btn-premium.active svg { fill: rgba(234,179,8,0.15); }

        .nim-sino-dropdown { position: absolute; top: calc(100% + 12px); right: -6px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1); width: 320px; display: flex; flex-direction: column; z-index: 1020; overflow: hidden; }
        .nim-sino-header { padding: 14px 16px; font-weight: 800; font-size: 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a; background: #f8fafc; }
        .nim-sino-body { max-height: 320px; overflow-y: auto; }
        .nim-sino-item { padding: 14px 16px; border-bottom: 1px solid #f1f5f9; cursor: pointer; transition: background 0.2s; text-align: left; }
        .nim-sino-item:hover { background: #f8fafc; }
        .nim-sino-item.unread { background: rgba(62, 207, 142, 0.05); border-left: 3px solid #3ecf8e; padding-left: 13px; }
        .nim-sino-text { font-size: 13px; color: #334155; margin-bottom: 6px; line-height: 1.4; }
        .nim-sino-date { font-size: 10px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
        .nim-sino-empty { padding: 32px 16px; text-align: center; font-size: 13px; color: #94a3b8; }

        .nim-user-trigger { display: inline-flex; align-items: center; gap: 8px; background: transparent; padding: 4px 10px 4px 4px; border-radius: 20px; transition: background 0.2s ease; border: 1px solid transparent; cursor: pointer; }
        .nim-user-trigger:hover, .nim-user-trigger.active { background: #f8fafc; border-color: #e2e8f0; }
        .nim-avatar { width: 32px; height: 32px; border-radius: 50%; border: 1px solid #cbd5e1; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #e2e8f0; flex-shrink: 0; }
        .nim-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .nim-avatar-initial { font-size: 13px; font-weight: 700; color: #0f172a; }
        .nim-username { font-size: 13px; font-weight: 600; color: #0f172a; display: flex; align-items: center; gap: 5px; }
        .nim-pro-badge { display: inline-flex; align-items: center; padding: 2px 7px; background: linear-gradient(135deg, #3ecf8e, #2ac1b4); color: #040711; font-size: 9px; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 20px; line-height: 1; flex-shrink: 0; }
        .nim-user-dropdown { position: absolute; top: calc(100% + 12px); right: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1); width: 220px; display: flex; flex-direction: column; padding: 8px; z-index: 1020; }
        .nim-ud-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; font-size: 13px; font-weight: 600; color: #475569; text-decoration: none; cursor: pointer; border: none; background: transparent; width: 100%; text-align: left; transition: all 0.2s; }
        .nim-ud-item:hover { background: #f8fafc; color: #0f172a; }
        .nim-ud-item svg { width: 16px; height: 16px; flex-shrink: 0; stroke-width: 2; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; }
        .nim-ud-divider { height: 1px; background: #e2e8f0; margin: 6px 0; }
        .nim-ud-item.logout:hover { background: #fff1f2; color: #be123c; }
        .nim-ud-pro { margin-left: auto; padding: 2px 7px; background: linear-gradient(135deg, #3ecf8e, #2ac1b4); color: #040711; font-size: 9px; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; border-radius: 20px; line-height: 1; flex-shrink: 0; }
        .nim-ud-admin-badge { margin-left: auto; padding: 2px 7px; background: linear-gradient(135deg, #818cf8, #6366f1); color: #ffffff; font-size: 9px; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; border-radius: 20px; line-height: 1; flex-shrink: 0; }
        .nim-btn-login { display: inline-flex; align-items: center; gap: 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; color: #0f172a; font-size: 13px; font-weight: 600; padding: 9px 20px; text-decoration: none; }

        .nav-modal-overlay { position: fixed; inset: 0; background: rgba(4, 7, 17, 0.9); backdrop-filter: blur(10px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 24px; }
        .nav-modal-card { background: rgba(15, 23, 42, 0.95); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; width: 100%; max-width: 480px; padding: 40px; position: relative; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); color: #f8fafc; }
        .nav-modal-close { position: absolute; top: 24px; right: 24px; background: transparent; border: none; color: #94a3b8; cursor: pointer; transition: color 0.2s; }
        .nav-modal-close:hover { color: #f8fafc; }
        .nav-modal-title { font-size: 22px; font-weight: 800; margin: 0 0 8px; display: flex; align-items: center; gap: 10px; }
        .nav-modal-title svg { width: 20px; height: 20px; stroke-width: 2; fill: none; stroke: #3ecf8e; stroke-linecap: round; stroke-linejoin: round; flex-shrink: 0; }
        .nav-modal-desc { font-size: 13px; color: #94a3b8; margin: 0 0 24px; line-height: 1.5; }
        .nav-modal-form-group { margin-bottom: 20px; text-align: left; }
        .nav-modal-form-group label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin-bottom: 8px; }
        .nav-modal-input-wrapper { position: relative; display: flex; align-items: center; }
        .nav-modal-input { width: 100%; padding: 14px 48px 14px 16px; background: rgba(0, 0, 0, 0.2); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: #f8fafc; outline: none; font-size: 14px; transition: all 0.2s; box-sizing: border-box; }
        .nav-modal-input:focus { border-color: #3ecf8e; box-shadow: 0 0 0 3px rgba(62, 207, 142, 0.1); }
        .nav-modal-toggle-pwd { position: absolute; right: 12px; background: transparent; border: none; color: #94a3b8; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 4px; transition: color 0.2s; }
        .nav-modal-toggle-pwd:hover { color: #f8fafc; }
        .nav-modal-btn { width: 100%; padding: 16px; background: #3ecf8e; color: #040711; border: none; border-radius: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; transition: opacity 0.2s; margin-top: 12px; }
        .nav-modal-btn:hover { opacity: 0.9; }
        .nav-modal-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        /* 🌟 CSS MOBILE - MENU HAMBÚRGUER E GAVETA LATERAL */
        .nim-burger-btn { display: none; background: none; border: none; color: #475569; cursor: pointer; padding: 6px; align-items: center; justify-content: center; }
        .nim-mobile-drawer { position: fixed; inset: 0; z-index: 9999; pointer-events: none; visibility: hidden; }
        .nim-mobile-drawer.active { visibility: visible; pointer-events: auto; }
        .nim-drawer-overlay { position: absolute; inset: 0; background: rgba(4, 7, 17, 0.4); opacity: 0; backdrop-filter: blur(4px); transition: opacity 0.3s ease; pointer-events: none; }
        .nim-drawer-content { position: fixed; top: 0; right: 0; width: min(290px, 85vw); height: 100vh; height: 100dvh; background: #ffffff; box-shadow: -10px 0 40px rgba(0,0,0,0.15); transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); padding: 24px; box-sizing: border-box; display: flex; flex-direction: column; pointer-events: auto; will-change: transform; }
        
        .nim-mobile-drawer.active .nim-drawer-overlay { opacity: 1; pointer-events: auto; }
        .nim-mobile-drawer.active .nim-drawer-content { transform: translateX(0); }

        .nim-drawer-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; }
        .nim-drawer-user { display: flex; align-items: center; gap: 12px; text-align: left; }
        .nim-drawer-close { background: none; border: none; color: #64748b; cursor: pointer; padding: 4px; }
        .nim-drawer-menu { display: flex; flex-direction: column; gap: 8px; flex: 1; overflow-y: auto; }
        .nim-drawer-link { display: flex; align-items: center; gap: 12px; padding: 14px 16px; border-radius: 10px; color: #334155; font-size: 14px; font-weight: 600; text-decoration: none; transition: background 0.2s; border: none; background: transparent; width: 100%; text-align: left; cursor: pointer; }
        .nim-drawer-link svg { width: 18px; height: 18px; flex-shrink: 0; stroke-width: 2; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; }
        .nim-drawer-link:hover { background: #f1f5f9; color: #0f172a; }
        .nim-drawer-link.publish { background: #059669; color: #ffffff; justify-content: center; margin-bottom: 12px; box-shadow: 0 4px 12px rgba(5,150,105,0.2); }
        .nim-drawer-link.admin { background: rgba(99, 102, 241, 0.08); color: #4f46e5; }
        .nim-drawer-link.admin:hover { background: rgba(99, 102, 241, 0.14); }
        .nim-drawer-link.logout-btn { color: #ef4444; margin-top: auto; border-top: 1px solid #f1f5f9; padding-top: 16px; border-radius: 0; }

        @media (max-width: 820px) {
          .nim-root { padding: 0 20px; height: 64px; }
          .nim-actions { display: none; }
          .nim-burger-btn { display: inline-flex; }
        }
      `}</style>

      {mostrarModalPassword && (
        <div className="nav-modal-overlay">
          <div className="nav-modal-card">
            <button className="nav-modal-close" onClick={() => setMostrarModalPassword(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
            <h2 className="nav-modal-title">
              <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              Alterar Palavra-passe
            </h2>
            <p className="nav-modal-desc">Define uma nova palavra-passe forte para proteger a tua conta.</p>
            <form onSubmit={alterarPassword}>
              <div className="nav-modal-form-group">
                <label>Palavra-passe Atual</label>
                <div className="nav-modal-input-wrapper">
                  <input className="nav-modal-input" type={mostrarPassword ? 'text' : 'password'} value={dadosPassword.atual} onChange={e => setDadosPassword({ ...dadosPassword, atual: e.target.value })} required />
                  <button type="button" className="nav-modal-toggle-pwd" onClick={() => setMostrarPassword(!mostrarPassword)}>
                    {mostrarPassword ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg> : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>}
                  </button>
                </div>
              </div>
              <div className="nav-modal-form-group">
                <label>Nova Palavra-passe (Mín. 9 caracteres)</label>
                <div className="nav-modal-input-wrapper">
                  <input className="nav-modal-input" type={mostrarPassword ? 'text' : 'password'} value={dadosPassword.nova} onChange={e => setDadosPassword({ ...dadosPassword, nova: e.target.value })} required minLength={9} />
                  <button type="button" className="nav-modal-toggle-pwd" onClick={() => setMostrarPassword(!mostrarPassword)}>
                    {mostrarPassword ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg> : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>}
                  </button>
                </div>
              </div>
              <div className="nav-modal-form-group">
                <label>Confirmar Nova Palavra-passe</label>
                <div className="nav-modal-input-wrapper">
                  <input className="nav-modal-input" type={mostrarPassword ? 'text' : 'password'} value={dadosPassword.confirmar} onChange={e => setDadosPassword({ ...dadosPassword, confirmar: e.target.value })} required minLength={9} />
                  <button type="button" className="nav-modal-toggle-pwd" onClick={() => setMostrarPassword(!mostrarPassword)}>
                    {mostrarPassword ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg> : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>}
                  </button>
                </div>
              </div>
              <button className="nav-modal-btn" type="submit" disabled={isUpdatingPwd}>
                {isUpdatingPwd ? 'A Gravar...' : 'Gravar Palavra-passe'}
              </button>
            </form>
          </div>
        </div>
      )}

      <nav className={`nim-root${scrolled ? ' scrolled' : ''}`}>
        <div ref={logoRef} className={`nim-logo-wrapper ${dropdownAberto ? 'active' : ''}`} onClick={() => setDropdownAberto(prev => !prev)}>
          <div className="nim-logo">
            <img src="/logo-noxvelia.png" alt="NOXVELIA" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
            <div className="nim-logo-brand-text">NOXVELIA <span style={{ color: '#3ecf8e' }}>Estate</span></div>
          </div>
          {dropdownAberto && (
            <div className="nim-switcher-dropdown" onClick={e => e.stopPropagation()}>
              <Link to="/imoveis" className="nim-switcher-item current" onClick={() => setDropdownAberto(false)}>NOXVELIA Estate</Link>
              <Link to="/carros" className="nim-switcher-item" onClick={() => setDropdownAberto(false)}>NOXVELIA Drive</Link>
            </div>
          )}
        </div>

        {/* 🌟 DESKTOP ACTIONS */}
        <div className="nim-actions">
          {signed ? (
            <>
              <Link to="/publicar" className="nim-btn-publish">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="6" y1="1" x2="6" y2="11" /><line x1="1" y1="6" x2="11" y2="6" /></svg>
                Criar Anúncio
              </Link>
              {isAdmin && (
                <Link to="/admin" className="nim-icon-btn admin" title="Painel Admin">
                  <svg viewBox="0 0 24 24"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
                </Link>
              )}
              <button type="button" onClick={handleIrParaHome} className="nim-icon-btn"><svg viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" /><polyline points="9 21 9 12 15 12 15 21" /></svg></button>
              <button type="button" onClick={handlePremium} className={`nim-btn-premium${isPremium ? ' active' : ''}`}><svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" /></svg></button>
              <Link to="/favoritos" className="nim-icon-btn"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg></Link>
              
              <div ref={sinoRef} style={{ position: 'relative' }}>
                <button type="button" className="nim-icon-btn" onClick={() => setSinoAberto(!sinoAberto)}>
                  <svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                  {naoLidasSino > 0 && <span className="nim-badge">{naoLidasSino}</span>}
                </button>
                {sinoAberto && (
                  <div className="nim-sino-dropdown" onClick={e => e.stopPropagation()}>
                    <div className="nim-sino-header">Notificações</div>
                    <div className="nim-sino-body">
                      {notificacoes.length > 0 ? notificacoes.map(n => (
                        <div key={n._id} className={`nim-sino-item ${!n.lida ? 'unread' : ''}`} onClick={() => handleLerNotificacao(n)}>
                          <div className="nim-sino-text">{n.mensagem}</div>
                          <div className="nim-sino-date">{new Date(n.createdAt).toLocaleDateString()}</div>
                        </div>
                      )) : <div className="nim-sino-empty">Sem notificações</div>}
                    </div>
                  </div>
                )}
              </div>
              <div className="nim-divider" />
              <div ref={userMenuRef} style={{ position: 'relative' }}>
                <button className={`nim-user-trigger ${userMenuAberto ? 'active' : ''}`} onClick={() => setUserMenuAberto(!userMenuAberto)}>
                  <div className="nim-avatar">{avatarImg ? <img src={avatarImg} alt="Perfil" /> : <span className="nim-avatar-initial">{inicial}</span>}</div>
                  {primeiroNome && <span className="nim-username">{primeiroNome} {isPremium && <span className="nim-pro-badge">PRO</span>}</span>}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                {userMenuAberto && (
                  <div className="nim-user-dropdown" onClick={(e) => e.stopPropagation()}>
                    <Link to="/perfil" onClick={() => setUserMenuAberto(false)} className="nim-ud-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>O Meu Perfil {isPremium && <span className="nim-ud-pro">PRO</span>}</Link>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setUserMenuAberto(false)} className="nim-ud-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></svg>Painel Admin <span className="nim-ud-admin-badge">ADMIN</span></Link>
                    )}
                    <button onClick={() => { setUserMenuAberto(false); setMostrarModalPassword(true); }} className="nim-ud-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>Alterar Password</button>
                    <div className="nim-ud-divider" />
                    <button onClick={() => { setUserMenuAberto(false); logout(); }} className="nim-ud-item logout"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>Terminar Sessão</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link to="/login" state={{ from: location.pathname }} className="nim-btn-login">Entrar</Link>
              <Link to="/registo" className="nim-btn-publish" style={{ marginRight: 0 }}>Registar</Link>
            </div>
          )}
        </div>

        {/* 🌟 MOBILE BURGER BUTTON */}
        <button type="button" className="nim-burger-btn" onClick={() => setMenuMobileAberto(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>

        {/* 🌟 MOBILE DRAWER (GAVETA NATIVA) */}
        <div className={`nim-mobile-drawer ${menuMobileAberto ? 'active' : ''}`}>
          <div className="nim-drawer-overlay" onClick={() => setMenuMobileAberto(false)} />
          <div className="nim-drawer-content">
            <div className="nim-drawer-header">
              {signed ? (
                <div className="nim-drawer-user">
                  <div className="nim-avatar">{avatarImg ? <img src={avatarImg} alt="Perfil" /> : <span className="nim-avatar-initial">{inicial}</span>}</div>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Olá, {primeiroNome}!</span>
                </div>
              ) : (
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Menu</span>
              )}
              <button className="nim-drawer-close" onClick={() => setMenuMobileAberto(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="nim-drawer-menu">
              {signed ? (
                <>
                  <Link to="/publicar" className="nim-drawer-link publish" onClick={() => setMenuMobileAberto(false)}>
                    <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    Criar Anúncio
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="nim-drawer-link admin" onClick={() => setMenuMobileAberto(false)}>
                      <svg viewBox="0 0 24 24"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
                      Painel Admin
                    </Link>
                  )}
                  <Link to="/perfil" className="nim-drawer-link" onClick={() => setMenuMobileAberto(false)}>
                    <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    O Meu Perfil {isPremium && <span className="nim-ud-pro">PRO</span>}
                  </Link>
                  <button type="button" className="nim-drawer-link" onClick={handleIrParaHome}>
                    <svg viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" /><polyline points="9 21 9 12 15 12 15 21" /></svg>
                    Início (Estate)
                  </button>
                  <button type="button" className="nim-drawer-link" onClick={handlePremium}>
                    <svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" /></svg>
                    Plano Profissional {isPremium && <span className="nim-ud-pro">PRO</span>}
                  </button>
                  <Link to="/favoritos" className="nim-drawer-link" onClick={() => setMenuMobileAberto(false)}>
                    <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                    Favoritos
                  </Link>
                  <button type="button" className="nim-drawer-link" onClick={() => { setMenuMobileAberto(false); setMostrarModalPassword(true); }}>
                    <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    Alterar Password
                  </button>
                  <button type="button" className="nim-drawer-link logout-btn" onClick={() => { setMenuMobileAberto(false); logout(); }}>
                    <svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    Terminar Sessão
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nim-drawer-link publish" onClick={() => setMenuMobileAberto(false)}>Entrar</Link>
                  <Link to="/registo" className="nim-drawer-link" style={{ justifyContent: 'center', border: '1px solid #cbd5e1' }} onClick={() => setMenuMobileAberto(false)}>Registar Conta</Link>
                </>
              )}
            </div>
          </div>
        </div>

      </nav>
    </>
  );
}