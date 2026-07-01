import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export default function NavbarCarro() {
  const { user, signed, logout, atualizarUser } = useAuth();
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
  
  const [mostrarModalInfo, setMostrarModalInfo] = useState(false);
  const [dadosInfo, setDadosInfo] = useState({ email: '', telefone: '' });
  const [dadosPassword, setDadosPassword] = useState({ atual: '', nova: '', confirmar: '' });
  const [isUpdatingInfo, setIsUpdatingInfo] = useState(false);
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
    navigate('/carros');
  };

  const handlePremium = (e) => {
    e.preventDefault();
    setMenuMobileAberto(false);
    navigate('/planos');
  };

  // 🌟 Abre o modal unificado de Informações Pessoais, pré-preenchido com os dados atuais
  const abrirModalInfo = async () => {
    setDadosInfo({ email: dadosUser?.email || '', telefone: dadosUser?.telefone || '' });
    try {
      const { data } = await api.get('/users/me');
      setDadosInfo({ email: data.email || '', telefone: data.telefone || '' });
    } catch {}
    setMostrarModalInfo(true);
  };

  const guardarInformacoesPessoais = async (e) => {
    e.preventDefault();
    setIsUpdatingInfo(true);
    try {
      if (dadosPassword.atual || dadosPassword.nova || dadosPassword.confirmar) {
        if (dadosPassword.nova !== dadosPassword.confirmar) {
          alert('A nova password e a confirmação não coincidem.');
          setIsUpdatingInfo(false);
          return;
        }
        if (dadosPassword.nova.length < 9) {
          alert('A nova password tem de ter pelo menos 9 caracteres.');
          setIsUpdatingInfo(false);
          return;
        }
        await api.put('/users/me/password', {
          passwordAtual: dadosPassword.atual,
          novaPassword: dadosPassword.nova
        });
      }
      const res = await api.put('/users/me', {
        email: dadosInfo.email,
        telefone: dadosInfo.telefone
      });
      if (atualizarUser) atualizarUser(res.data);
      setDadosPassword({ atual: '', nova: '', confirmar: '' });
      setMostrarPassword(false);
      setMostrarModalInfo(false);
      alert('Informações atualizadas com sucesso!');
    } catch (err) {
      alert(err.response?.data?.erro || 'Erro ao atualizar informações. Verifica se a password atual está correta ou se o email já está em uso.');
    } finally {
      setIsUpdatingInfo(false);
    }
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
        .ncr-root { position: sticky; top: 0; z-index: 1000; height: 72px; display: flex; align-items: center; padding: 0 32px; justify-content: space-between; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid #e2e8f0; transition: all 0.25s ease; font-family: 'Inter', sans-serif; }
        .ncr-root.scrolled { background: #ffffff; box-shadow: 0 4px 12px -4px rgba(15, 23, 42, 0.03); height: 68px; }
        .ncr-logo-wrapper { position: relative; display: flex; align-items: center; cursor: pointer; }
        .ncr-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; user-select: none; }
        .ncr-logo-brand-text { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 18px; font-weight: 800; color: #0f172a; letter-spacing: -0.03em; display: flex; align-items: center; gap: 6px; }
        .ncr-logo-brand-text span { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 700; color: #2ac1b4; letter-spacing: 0.05em; text-transform: uppercase; display: inline-flex; align-items: center; gap: 4px; }
        .ncr-logo-brand-text span::after { content: '▾'; font-size: 12px; color: #64748b; transition: transform 0.2s ease; }
        .ncr-logo-wrapper.active .ncr-logo-brand-text span::after { transform: rotate(180deg); }
        .ncr-switcher-dropdown { position: absolute; top: calc(100% + 12px); left: 0; background: rgba(255, 255, 255, 0.9); border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08); padding: 6px; min-width: 220px; display: flex; flex-direction: column; gap: 4px; z-index: 1010; }
        .ncr-switcher-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600; color: #475569; }
        .ncr-switcher-item:hover { background: #f1f5f9; color: #0f172a; }
        .ncr-switcher-item.current { background: rgba(42, 193, 180, 0.08); color: #2ac1b4; pointer-events: none; }
        
        .ncr-actions { display: flex; align-items: center; gap: 8px; }
        .ncr-btn-publish { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; background: #0f172a; color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none; border-radius: 8px; border: none; cursor: pointer; transition: all 0.2s ease; margin-right: 12px; }
        .ncr-btn-publish:hover { background: #1e293b; }
        .ncr-divider { width: 1px; height: 20px; background: #e2e8f0; margin: 0 8px; flex-shrink: 0; }
        .ncr-icon-btn { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 8px; background: transparent; border: none; cursor: pointer; color: #475569; text-decoration: none; transition: all 0.2s ease; }
        .ncr-icon-btn:hover { background: #f8fafc; color: #0f172a; }
        .ncr-icon-btn svg { width: 20px; height: 20px; stroke-width: 2; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; }
        .ncr-icon-btn.admin { color: #6366f1; }
        .ncr-icon-btn.admin:hover { background: rgba(99, 102, 241, 0.1); color: #4f46e5; }
        .ncr-badge { position: absolute; top: -2px; right: -2px; min-width: 16px; height: 16px; background: #ef4444; color: #ffffff; font-size: 9px; font-weight: 700; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #ffffff; line-height: 1; padding: 0 4px; box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2); }
        .ncr-btn-premium { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 8px; background: transparent; border: none; cursor: pointer; color: #eab308; text-decoration: none; transition: all 0.2s ease; }
        .ncr-btn-premium:hover { background: rgba(234, 179, 8, 0.1); color: #ca8a04; }
        .ncr-btn-premium svg { width: 20px; height: 20px; stroke-width: 2; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; }
        .ncr-btn-premium.active { color: #eab308; }
        .ncr-btn-premium.active svg { fill: rgba(234,179,8,0.15); }

        .ncr-pro-badge { display: inline-flex; align-items: center; padding: 2px 7px; background: linear-gradient(135deg, #2ac1b4, #0f9d92); color: #040711; font-size: 9px; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 20px; line-height: 1; flex-shrink: 0; }
        .ncr-ud-pro { margin-left: auto; padding: 2px 7px; background: linear-gradient(135deg, #2ac1b4, #0f9d92); color: #040711; font-size: 9px; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; border-radius: 20px; line-height: 1; flex-shrink: 0; }
        .ncr-ud-admin-badge { margin-left: auto; padding: 2px 7px; background: linear-gradient(135deg, #818cf8, #6366f1); color: #ffffff; font-size: 9px; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; border-radius: 20px; line-height: 1; flex-shrink: 0; }

        /* SINO DROPDOWN */
        .ncr-sino-dropdown { position: absolute; top: calc(100% + 12px); right: -6px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1); width: 320px; display: flex; flex-direction: column; z-index: 1020; overflow: hidden; }
        .ncr-sino-header { padding: 14px 16px; font-weight: 800; font-size: 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a; background: #f8fafc; }
        .ncr-sino-body { max-height: 320px; overflow-y: auto; }
        .ncr-sino-item { padding: 14px 16px; border-bottom: 1px solid #f1f5f9; cursor: pointer; transition: background 0.2s; text-align: left; }
        .ncr-sino-item:hover { background: #f8fafc; }
        .ncr-sino-item.unread { background: rgba(42, 193, 180, 0.05); border-left: 3px solid #2ac1b4; padding-left: 13px; }
        .ncr-sino-text { font-size: 13px; color: #334155; margin-bottom: 6px; line-height: 1.4; }
        .ncr-sino-date { font-size: 10px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
        .ncr-sino-empty { padding: 32px 16px; text-align: center; font-size: 13px; color: #94a3b8; }

        .ncr-user-trigger { display: inline-flex; align-items: center; gap: 8px; background: transparent; padding: 4px 10px 4px 4px; border-radius: 20px; transition: background 0.2s ease; border: 1px solid transparent; cursor: pointer; }
        .ncr-user-trigger:hover, .ncr-user-trigger.active { background: #f8fafc; border-color: #e2e8f0; }
        .ncr-avatar { width: 32px; height: 32px; border-radius: 50%; border: 1px solid #cbd5e1; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #e2e8f0; flex-shrink: 0; }
        .ncr-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .ncr-avatar-initial { font-size: 13px; font-weight: 700; color: #0f172a; }
        .ncr-username { font-size: 13px; font-weight: 600; color: #0f172a; display: flex; align-items: center; gap: 5px; }
        .ncr-user-dropdown { position: absolute; top: calc(100% + 12px); right: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1); width: 220px; display: flex; flex-direction: column; padding: 8px; z-index: 1020; }
        .ncr-ud-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; font-size: 13px; font-weight: 600; color: #475569; text-decoration: none; cursor: pointer; border: none; background: transparent; width: 100%; text-align: left; transition: all 0.2s; }
        .ncr-ud-item:hover { background: #f8fafc; color: #0f172a; }
        .ncr-ud-item svg { width: 16px; height: 16px; flex-shrink: 0; stroke-width: 2; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; }
        .ncr-ud-divider { height: 1px; background: #e2e8f0; margin: 6px 0; }
        .ncr-ud-item.logout:hover { background: #fff1f2; color: #be123c; }
        .ncr-btn-login { display: inline-flex; align-items: center; gap: 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; color: #0f172a; font-size: 13px; font-weight: 600; padding: 9px 20px; text-decoration: none; }
        
        .nav-modal-overlay { position: fixed; inset: 0; background: rgba(4, 7, 17, 0.9); backdrop-filter: blur(10px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 24px; overflow-y: auto; }
        .nav-modal-card { background: rgba(15, 23, 42, 0.95); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; width: 100%; max-width: 480px; padding: 40px; position: relative; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); color: #f8fafc; margin: auto; }
        .nav-modal-close { position: absolute; top: 24px; right: 24px; background: transparent; border: none; color: #94a3b8; cursor: pointer; transition: color 0.2s; }
        .nav-modal-close:hover { color: #f8fafc; }
        .nav-modal-title { font-family: var(--nx-font-display, sans-serif); font-size: 22px; font-weight: 800; margin: 0 0 8px; display: flex; align-items: center; gap: 10px; }
        .nav-modal-title svg { width: 20px; height: 20px; stroke-width: 2; fill: none; stroke: #2ac1b4; stroke-linecap: round; stroke-linejoin: round; flex-shrink: 0; }
        .nav-modal-desc { font-size: 13px; color: #94a3b8; margin: 0 0 24px; line-height: 1.5; }
        .nav-modal-form-group { margin-bottom: 20px; text-align: left; }
        .nav-modal-form-group label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin-bottom: 8px; }
        .nav-modal-input-wrapper { position: relative; display: flex; align-items: center; }
        .nav-modal-input { width: 100%; padding: 14px 16px; background: rgba(0, 0, 0, 0.2); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: #f8fafc; outline: none; font-size: 14px; transition: all 0.2s; box-sizing: border-box; }
        .nav-modal-input.has-toggle { padding-right: 48px; }
        .nav-modal-input:focus { border-color: #2ac1b4; box-shadow: 0 0 0 3px rgba(42, 193, 180, 0.1); }
        .nav-modal-toggle-pwd { position: absolute; right: 12px; background: transparent; border: none; color: #94a3b8; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 4px; transition: color 0.2s; }
        .nav-modal-toggle-pwd:hover { color: #f8fafc; }
        .nav-modal-divider { height: 1px; background: rgba(255, 255, 255, 0.1); margin: 28px 0 20px; }
        .nav-modal-btn { width: 100%; padding: 16px; background: #2ac1b4; color: #040711; border: none; border-radius: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; transition: opacity 0.2s; margin-top: 12px; }
        .nav-modal-btn:hover { opacity: 0.9; }
        .nav-modal-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        /* 🌟 CSS MOBILE - MENU HAMBÚRGUER E GAVETA LATERAL */
        .ncr-burger-btn { display: none; background: none; border: none; color: #475569; cursor: pointer; padding: 6px; align-items: center; justify-content: center; }
        .ncr-mobile-drawer { position: fixed; inset: 0; z-index: 9999; pointer-events: none; visibility: hidden; }
        .ncr-mobile-drawer.active { visibility: visible; pointer-events: auto; }
        .ncr-drawer-overlay { position: absolute; inset: 0; background: rgba(4, 7, 17, 0.4); opacity: 0; backdrop-filter: blur(4px); transition: opacity 0.3s ease; pointer-events: none; }
        .ncr-drawer-content { position: fixed; top: 0; right: 0; width: min(290px, 85vw); height: 100vh; height: 100dvh; background: #ffffff; box-shadow: -10px 0 40px rgba(0,0,0,0.15); transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); padding: 24px; box-sizing: border-box; display: flex; flex-direction: column; pointer-events: auto; will-change: transform; }
        
        .ncr-mobile-drawer.active .ncr-drawer-overlay { opacity: 1; pointer-events: auto; }
        .ncr-mobile-drawer.active .ncr-drawer-content { transform: translateX(0); }

        .ncr-drawer-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; }
        .ncr-drawer-user { display: flex; align-items: center; gap: 12px; text-align: left; }
        .ncr-drawer-close { background: none; border: none; color: #64748b; cursor: pointer; padding: 4px; }
        .ncr-drawer-menu { display: flex; flex-direction: column; gap: 8px; flex: 1; overflow-y: auto; }
        .ncr-drawer-link { display: flex; align-items: center; gap: 12px; padding: 14px 16px; border-radius: 10px; color: #334155; font-size: 14px; font-weight: 600; text-decoration: none; transition: background 0.2s; border: none; background: transparent; width: 100%; text-align: left; cursor: pointer; }
        .ncr-drawer-link svg { width: 18px; height: 18px; flex-shrink: 0; stroke-width: 2; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; }
        .ncr-drawer-link:hover { background: #f1f5f9; color: #0f172a; }
        .ncr-drawer-link.publish { background: #0f172a; color: #ffffff; justify-content: center; margin-bottom: 12px; box-shadow: 0 4px 12px rgba(15,23,42,0.15); }
        .ncr-drawer-link.admin { background: rgba(99, 102, 241, 0.08); color: #4f46e5; }
        .ncr-drawer-link.admin:hover { background: rgba(99, 102, 241, 0.14); }
        .ncr-drawer-link.logout-btn { color: #ef4444; margin-top: auto; border-top: 1px solid #f1f5f9; padding-top: 16px; border-radius: 0; }

        @media (max-width: 820px) {
          .ncr-root { padding: 0 20px; height: 64px; }
          .ncr-actions { display: none; }
          .ncr-burger-btn { display: inline-flex; }
        }
      `}</style>

      {mostrarModalInfo && (
        <div className="nav-modal-overlay">
          <div className="nav-modal-card">
            <button className="nav-modal-close" onClick={() => setMostrarModalInfo(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <h2 className="nav-modal-title">
              <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              Informações Pessoais
            </h2>
            <p className="nav-modal-desc">Atualiza os teus contactos ou altera a tua palavra-passe.</p>
            <form onSubmit={guardarInformacoesPessoais}>
              <div className="nav-modal-form-group">
                <label>Email da Conta</label>
                <div className="nav-modal-input-wrapper">
                  <input
                    className="nav-modal-input"
                    type="email"
                    value={dadosInfo.email}
                    onChange={e => setDadosInfo({ ...dadosInfo, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="nav-modal-form-group">
                <label>Telemóvel / Telefone</label>
                <div className="nav-modal-input-wrapper">
                  <input
                    className="nav-modal-input"
                    type="tel"
                    value={dadosInfo.telefone}
                    onChange={e => {
                      const apenasNumeros = e.target.value.replace(/\D/g, '');
                      if (apenasNumeros.length <= 9) setDadosInfo({ ...dadosInfo, telefone: apenasNumeros });
                    }}
                    required
                  />
                </div>
              </div>

              <div className="nav-modal-divider" />

              <p className="nav-modal-desc" style={{ marginBottom: '16px', fontSize: '12px' }}>
                Para alterares a palavra-passe, preenche os campos abaixo. Caso contrário, deixa-os em branco.
              </p>

              <div className="nav-modal-form-group">
                <label>Palavra-passe Atual</label>
                <div className="nav-modal-input-wrapper">
                  <input className="nav-modal-input has-toggle" type={mostrarPassword ? "text" : "password"} placeholder="Deixa em branco se não quiseres alterar" value={dadosPassword.atual} onChange={e => setDadosPassword({...dadosPassword, atual: e.target.value})} />
                  <button type="button" className="nav-modal-toggle-pwd" onClick={() => setMostrarPassword(!mostrarPassword)}>
                    {mostrarPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="nav-modal-form-group">
                <label>Nova Password</label>
                <div className="nav-modal-input-wrapper">
                  <input className="nav-modal-input has-toggle" type={mostrarPassword ? "text" : "password"} placeholder="Mínimo 9 caracteres" value={dadosPassword.nova} onChange={e => setDadosPassword({...dadosPassword, nova: e.target.value})} minLength={9} />
                </div>
              </div>
              <div className="nav-modal-form-group">
                <label>Confirmar Nova Password</label>
                <div className="nav-modal-input-wrapper">
                  <input className="nav-modal-input has-toggle" type={mostrarPassword ? "text" : "password"} value={dadosPassword.confirmar} onChange={e => setDadosPassword({...dadosPassword, confirmar: e.target.value})} minLength={9} />
                </div>
              </div>

              <button className="nav-modal-btn" type="submit" disabled={isUpdatingInfo}>
                {isUpdatingInfo ? 'A Gravar...' : 'Guardar Informações'}
              </button>
            </form>
          </div>
        </div>
      )}

      <nav className={`ncr-root${scrolled ? ' scrolled' : ''}`}>
        <div ref={logoRef} className={`ncr-logo-wrapper ${dropdownAberto ? 'active' : ''}`} onClick={() => setDropdownAberto(prev => !prev)}>
          <div className="ncr-logo">
            <img src="/logo-noxvelia.png" alt="NOXVELIA" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
            <div className="ncr-logo-brand-text">NOXVELIA <span>Drive</span></div>
          </div>
          {dropdownAberto && (
            <div className="ncr-switcher-dropdown" onClick={e => e.stopPropagation()}>
              <Link to="/carros" className="ncr-switcher-item current" onClick={() => setDropdownAberto(false)}>NOXVELIA Drive</Link>
              <Link to="/imoveis" className="ncr-switcher-item" onClick={() => setDropdownAberto(false)}>NOXVELIA Estate</Link>
            </div>
          )}
        </div>

        {/* 🌟 DESKTOP ACTIONS */}
        <div className="ncr-actions">
          {signed ? (
            <>
              <Link to="/publicar" className="ncr-btn-publish">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="6" y1="1" x2="6" y2="11" /><line x1="1" y1="6" x2="11" y2="6" /></svg>
                Criar Anúncio
              </Link>
              {isAdmin && (
                <Link to="/admin" className="ncr-icon-btn admin" title="Painel Admin">
                  <svg viewBox="0 0 24 24"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
                </Link>
              )}
              <button type="button" onClick={handleIrParaHome} className="ncr-icon-btn"><svg viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" /><polyline points="9 21 9 12 15 12 15 21" /></svg></button>
              <button type="button" onClick={handlePremium} className={`ncr-btn-premium${isPremium ? ' active' : ''}`}><svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" /></svg></button>
              <Link to="/favoritos" className="ncr-icon-btn"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg></Link>
              
              <div ref={sinoRef} style={{ position: 'relative' }}>
                <button type="button" className="ncr-icon-btn" onClick={() => setSinoAberto(!sinoAberto)}>
                  <svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                  {naoLidasSino > 0 && <span className="ncr-badge">{naoLidasSino}</span>}
                </button>
                {sinoAberto && (
                  <div className="ncr-sino-dropdown" onClick={e => e.stopPropagation()}>
                    <div className="ncr-sino-header">Notificações</div>
                    <div className="ncr-sino-body">
                      {notificacoes.length > 0 ? notificacoes.map(n => (
                        <div key={n._id} className={`ncr-sino-item ${!n.lida ? 'unread' : ''}`} onClick={() => handleLerNotificacao(n)}>
                          <div className="ncr-sino-text">{n.mensagem}</div>
                          <div className="ncr-sino-date">{new Date(n.createdAt).toLocaleDateString()}</div>
                        </div>
                      )) : <div className="ncr-sino-empty">Sem notificações</div>}
                    </div>
                  </div>
                )}
              </div>
              <div className="ncr-divider" />
              <div ref={userMenuRef} style={{ position: 'relative' }}>
                <button className={`ncr-user-trigger ${userMenuAberto ? 'active' : ''}`} onClick={() => setUserMenuAberto(!userMenuAberto)}>
                  <div className="ncr-avatar">{avatarImg ? <img src={avatarImg} alt="Perfil" /> : <span className="ncr-avatar-initial">{inicial}</span>}</div>
                  {primeiroNome && <span className="ncr-username">{primeiroNome} {isPremium && <span className="ncr-pro-badge">PRO</span>}</span>}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                {userMenuAberto && (
                  <div className="ncr-user-dropdown" onClick={(e) => e.stopPropagation()}>
                    <Link to="/perfil" onClick={() => setUserMenuAberto(false)} className="ncr-ud-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>O Meu Perfil {isPremium && <span className="ncr-ud-pro">PRO</span>}</Link>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setUserMenuAberto(false)} className="ncr-ud-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></svg>Painel Admin <span className="ncr-ud-admin-badge">ADMIN</span></Link>
                    )}
                    <button onClick={() => { setUserMenuAberto(false); abrirModalInfo(); }} className="ncr-ud-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>Informações Pessoais</button>
                    <div className="ncr-ud-divider" />
                    <button onClick={() => { setUserMenuAberto(false); logout(); }} className="ncr-ud-item logout"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>Terminar Sessão</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link to="/login" state={{ from: location.pathname }} className="ncr-btn-login">Entrar</Link>
              <Link to="/registo" className="ncr-btn-publish" style={{ marginRight: 0 }}>Registar</Link>
            </div>
          )}
        </div>

        {/* 🌟 MOBILE BURGER BUTTON */}
        <button type="button" className="ncr-burger-btn" onClick={() => setMenuMobileAberto(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>

        {/* 🌟 MOBILE DRAWER (GAVETA NATIVA) */}
        <div className={`ncr-mobile-drawer ${menuMobileAberto ? 'active' : ''}`}>
          <div className="ncr-drawer-overlay" onClick={() => setMenuMobileAberto(false)} />
          <div className="ncr-drawer-content">
            <div className="ncr-drawer-header">
              {signed ? (
                <div className="ncr-drawer-user">
                  <div className="ncr-avatar">{avatarImg ? <img src={avatarImg} alt="Perfil" /> : <span className="ncr-avatar-initial">{inicial}</span>}</div>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Olá, {primeiroNome}!</span>
                </div>
              ) : (
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Menu</span>
              )}
              <button className="ncr-drawer-close" onClick={() => setMenuMobileAberto(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="ncr-drawer-menu">
              {signed ? (
                <>
                  <Link to="/publicar" className="ncr-drawer-link publish" onClick={() => setMenuMobileAberto(false)}>
                    <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    Criar Anúncio
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="ncr-drawer-link admin" onClick={() => setMenuMobileAberto(false)}>
                      <svg viewBox="0 0 24 24"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
                      Painel Admin
                    </Link>
                  )}
                  <Link to="/perfil" className="ncr-drawer-link" onClick={() => setMenuMobileAberto(false)}>
                    <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    O Meu Perfil {isPremium && <span className="ncr-ud-pro">PRO</span>}
                  </Link>
                  <button type="button" className="ncr-drawer-link" onClick={handleIrParaHome}>
                    <svg viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" /><polyline points="9 21 9 12 15 12 15 21" /></svg>
                    Início (Drive)
                  </button>
                  <button type="button" className="ncr-drawer-link" onClick={handlePremium}>
                    <svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" /></svg>
                    Plano Profissional {isPremium && <span className="ncr-ud-pro">PRO</span>}
                  </button>
                  <Link to="/favoritos" className="ncr-drawer-link" onClick={() => setMenuMobileAberto(false)}>
                    <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                    Favoritos
                  </Link>
                  <button type="button" className="ncr-drawer-link" onClick={() => { setMenuMobileAberto(false); abrirModalInfo(); }}>
                    <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    Informações Pessoais
                  </button>
                  <button type="button" className="ncr-drawer-link logout-btn" onClick={() => { setMenuMobileAberto(false); logout(); }}>
                    <svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    Terminar Sessão
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="ncr-drawer-link publish" onClick={() => setMenuMobileAberto(false)}>Entrar</Link>
                  <Link to="/registo" className="ncr-drawer-link" style={{ justifyContent: 'center', border: '1px solid #cbd5e1' }} onClick={() => setMenuMobileAberto(false)}>Registar Conta</Link>
                </>
              )}
            </div>
          </div>
        </div>

      </nav>
    </>
  );
}