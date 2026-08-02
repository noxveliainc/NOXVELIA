import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { Car, House } from 'lucide-react';

export default function NavbarCarro() {
  const { user, signed, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const logoRef = useRef(null);


  const [userMenuAberto, setUserMenuAberto] = useState(false);
  const userMenuRef = useRef(null);
  
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);

  // 🔐 MODAL ALTERAR PALAVRA-PASSE
  const [modalPassAberto, setModalPassAberto] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erroPass, setErroPass] = useState('');
  const [sucessoPass, setSucessoPass] = useState('');
  const [carregandoPass, setCarregandoPass] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const cliqueFora = (e) => {
      if (logoRef.current && !logoRef.current.contains(e.target)) setDropdownAberto(false);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuAberto(false);
    };
    window.addEventListener('click', cliqueFora);
    return () => window.removeEventListener('click', cliqueFora);
  }, []);



  const handleIrParaHome = (e) => {
    e.preventDefault();
    setMenuMobileAberto(false);
    navigate('/');
  };


  const handlePremium = (e) => {
    e.preventDefault();
    setMenuMobileAberto(false);
    navigate('/planos');
  };

  const fecharModalPass = () => {
    setModalPassAberto(false);
    setSenhaAtual('');
    setNovaSenha('');
    setConfirmarSenha('');
    setErroPass('');
    setSucessoPass('');
  };

  const handleAlterarPassword = async (e) => {
    e.preventDefault();
    setErroPass('');
    setSucessoPass('');

    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      setErroPass('Preenche todos os campos.');
      return;
    }
    if (novaSenha.length < 9) {
      setErroPass('A nova palavra-passe deve ter pelo menos 9 caracteres.');
      return;
    }
    if (novaSenha !== confirmarSenha) {
      setErroPass('As palavras-passe não coincidem.');
      return;
    }

    setCarregandoPass(true);
    try {
      const res = await api.put('/users/me/password', {
        passwordAtual: senhaAtual,
        novaPassword: novaSenha,
      });
      setSucessoPass(res.data?.mensagem || 'Palavra-passe alterada com sucesso.');
      setSenhaAtual('');
      setNovaSenha('');
      setConfirmarSenha('');
      setTimeout(() => fecharModalPass(), 1800);
    } catch (err) {
      setErroPass(err.response?.data?.erro || 'Erro ao alterar a palavra-passe.');
    } finally {
      setCarregandoPass(false);
    }
  };

  const obterUserLocal = () => { try { const guardado = sessionStorage.getItem('@App:user'); return guardado ? JSON.parse(guardado) : null; } catch { return null; } };
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
        .ncr-root { justify-content: flex-start; gap: 14px; }
        .ncr-logo-wrapper { position: relative; display: flex; align-items: center; cursor: pointer; }
        .ncr-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; user-select: none; }
        .ncr-logo-brand-text { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 18px; font-weight: 800; color: #0f172a; letter-spacing: -0.03em; display: flex; align-items: center; gap: 6px; }
        .ncr-logo-brand-text span { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 700; color: #d9c49c; letter-spacing: 0.05em; text-transform: uppercase; display: inline-flex; align-items: center; gap: 4px; }
        .ncr-logo-brand-text span::after { content: '▾'; font-size: 12px; color: #64748b; transition: transform 0.2s ease; }
        .ncr-logo-wrapper.active .ncr-logo-brand-text span::after { transform: rotate(180deg); }
        .ncr-switcher-dropdown { position: absolute; top: calc(100% + 12px); left: 0; background: rgba(255, 255, 255, 0.9); border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08); padding: 6px; min-width: 220px; display: flex; flex-direction: column; gap: 4px; z-index: 1010; }
        .ncr-switcher-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600; color: #475569; }
        .ncr-switcher-item:hover { background: #f1f5f9; color: #0f172a; }
        .ncr-switcher-item.current { background: rgba(217, 196, 156, 0.08); color: #d9c49c; pointer-events: none; }
        
        .ncr-actions { display: flex; align-items: center; gap: 8px; margin-left: auto; }
        .ncr-section-links { display: flex; align-items: center; gap: 3px; margin-left: 2px; padding: 3px; border: 1px solid rgba(148, 163, 184, 0.24); border-radius: 999px; background: rgba(255, 255, 255, 0.06); box-shadow: none; }
        .ncr-section-link { display: inline-flex; align-items: center; justify-content: center; gap: 6px; width: auto; min-width: 34px; height: 34px; padding: 0 11px; border-radius: 999px; color: #64748b; text-decoration: none; transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease; font-size: 11px; font-weight: 850; }
        .ncr-section-link:hover { background: rgba(148, 163, 184, 0.14); color: #0f172a; transform: translateY(-1px); }
        .ncr-section-link.active.carros { background: rgba(15, 111, 120, 0.14); color: #0f6f78; }
        .ncr-section-link.active.imoveis { background: rgba(47, 125, 87, 0.14); color: #2f7d57; }
        .ncr-section-link svg { width: 18px; height: 18px; stroke-width: 2.2; flex-shrink: 0; }
        .ncr-section-label { line-height: 1; white-space: nowrap; }
        .ncr-btn-menu { display: inline-flex; align-items: center; gap: 8px; padding: 9px 14px; background: #ffffff; color: #0f172a; font-size: 13px; font-weight: 700; text-decoration: none; border-radius: 8px; border: 1px solid #e2e8f0; cursor: pointer; transition: all 0.2s ease; }
        .ncr-btn-menu:hover { background: #f8fafc; border-color: #cbd5e1; transform: translateY(-1px); }
        .ncr-btn-sponsor { border-color: rgba(217, 196, 156, 0.72); background: rgba(217, 196, 156, 0.16); color: #102f50; }
        .ncr-btn-sponsor:hover { border-color: #d9c49c; background: rgba(217, 196, 156, 0.28); color: #071326; }
        .ncr-btn-menu svg { width: 17px; height: 17px; stroke-width: 2; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; }
        .ncr-btn-publish { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; background: #0f172a; color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none; border-radius: 8px; border: none; cursor: pointer; transition: all 0.2s ease; margin-right: 12px; }
        .ncr-btn-publish:hover { background: #1e293b; }
        .ncr-divider { width: 1px; height: 20px; background: #e2e8f0; margin: 0 8px; flex-shrink: 0; }
        .ncr-icon-btn { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 8px; background: transparent; border: none; cursor: pointer; color: #475569; text-decoration: none; transition: all 0.2s ease; }
        .ncr-icon-btn:hover { background: #f8fafc; color: #0f172a; }
        .ncr-icon-btn svg { width: 20px; height: 20px; stroke-width: 2; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; }
        .ncr-icon-btn.admin { color: #102f50; }
        .ncr-icon-btn.admin:hover { background: rgba(217, 196, 156, 0.16); color: #102f50; }
        .ncr-btn-premium { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 8px; background: transparent; border: none; cursor: pointer; color: #eab308; text-decoration: none; transition: all 0.2s ease; }
        .ncr-btn-premium:hover { background: rgba(234, 179, 8, 0.1); color: #ca8a04; }
        .ncr-btn-premium svg { width: 20px; height: 20px; stroke-width: 2; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; }
        .ncr-btn-premium.active { color: #eab308; }
        .ncr-btn-premium.active svg { fill: rgba(234,179,8,0.15); }

        .ncr-pro-badge { display: inline-flex; align-items: center; padding: 2px 7px; background: #d9c49c; color: #040711; font-size: 9px; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 20px; line-height: 1; flex-shrink: 0; }
        /* Menu do utilizador */
        .ncr-ud-pro { margin-left: 6px; padding: 2px 7px; background: #d9c49c; color: #040711; font-size: 9px; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; border-radius: 20px; line-height: 1; flex-shrink: 0; }
        .ncr-ud-admin-badge { margin-left: 6px; padding: 2px 7px; background: #102f50; color: #fffaf0; border: 1px solid rgba(217,196,156,.36); font-size: 9px; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; border-radius: 20px; line-height: 1; flex-shrink: 0; }


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
        
        .ncr-burger-btn { display: none; margin-left: auto; background: none; border: none; color: #475569; cursor: pointer; padding: 6px; align-items: center; justify-content: center; }
        .ncr-burger-btn.with-avatar { padding: 3px; border: 1px solid #e2e8f0; border-radius: 999px; background: #ffffff; box-shadow: 0 8px 18px -16px rgba(15,23,42,0.5); }
        .ncr-burger-btn.with-avatar .ncr-avatar { width: 34px; height: 34px; }
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
          .ncr-root { padding: 0 14px; height: 64px; gap: 10px; }
          .ncr-logo-brand-text { font-size: 15px; }
          .ncr-logo-brand-text span { display: none; }
          .ncr-section-links { gap: 4px; padding: 3px; }
          .ncr-section-link { width: 32px; min-width: 32px; height: 32px; padding: 0; }
          .ncr-section-label { display: none; }
          .ncr-actions { display: none; }
          .ncr-burger-btn { display: inline-flex; }
        }

        @media (max-width: 380px) {
          .ncr-logo-brand-text { display: none; }
        }

        /* 🔐 MODAL ALTERAR PALAVRA-PASSE */
        .ncr-pwm-overlay { position: fixed; inset: 0; z-index: 10000; background: rgba(4, 7, 17, 0.45); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; padding: 20px; }
        .ncr-pwm-card { background: #ffffff; border-radius: 16px; width: 100%; max-width: 380px; box-shadow: 0 30px 60px -15px rgba(0,0,0,0.25); overflow: hidden; font-family: 'Inter', sans-serif; }
        .ncr-pwm-header { display: flex; align-items: center; justify-content: space-between; padding: 20px 22px; border-bottom: 1px solid #e2e8f0; }
        .ncr-pwm-title { font-size: 15px; font-weight: 800; color: #0f172a; }
        .ncr-pwm-close { background: none; border: none; color: #64748b; cursor: pointer; padding: 4px; display: flex; }
        .ncr-pwm-close svg { width: 18px; height: 18px; stroke-width: 2; fill: none; stroke: currentColor; }
        .ncr-pwm-body { padding: 22px; display: flex; flex-direction: column; gap: 14px; }
        .ncr-pwm-field { display: flex; flex-direction: column; gap: 6px; }
        .ncr-pwm-label { font-size: 12px; font-weight: 700; color: #475569; }
        .ncr-pwm-input { border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px; font-size: 13px; font-family: 'Inter', sans-serif; color: #0f172a; outline: none; transition: border-color 0.2s; }
        .ncr-pwm-input:focus { border-color: #d9c49c; }
        .ncr-pwm-error { font-size: 12px; font-weight: 600; color: #be123c; background: #fff1f2; padding: 8px 10px; border-radius: 8px; }
        .ncr-pwm-success { font-size: 12px; font-weight: 600; color: #047857; background: #ecfdf5; padding: 8px 10px; border-radius: 8px; }
        .ncr-pwm-submit { margin-top: 4px; background: #0f172a; color: #ffffff; border: none; border-radius: 8px; padding: 11px; font-size: 13px; font-weight: 700; cursor: pointer; transition: background 0.2s; }
        .ncr-pwm-submit:hover { background: #1e293b; }
        .ncr-pwm-submit:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

      <nav className={`ncr-root${scrolled ? ' scrolled' : ''}`}>
        <div ref={logoRef} className={`ncr-logo-wrapper ${dropdownAberto ? 'active' : ''}`} onClick={() => setDropdownAberto(prev => !prev)}>
          <div className="ncr-logo">
            <img src="/logo-noxvelia.png" alt="NOXVELIA" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
            <div className="ncr-logo-brand-text">NOXVELIA <span>Automóveis</span></div>
          </div>
          {dropdownAberto && (
            <div className="ncr-switcher-dropdown" onClick={e => e.stopPropagation()}>
              <Link to="/carros" className="ncr-switcher-item current" onClick={() => setDropdownAberto(false)}>Automóveis</Link>
              <Link to="/imoveis" className="ncr-switcher-item" onClick={() => setDropdownAberto(false)}>Imóveis</Link>
            </div>
          )}
        </div>

        <div className="ncr-section-links" aria-label="Pesquisar por categoria">
          <Link to="/carros" className="ncr-section-link active carros" aria-label="Pesquisar automóveis" title="Pesquisar automóveis" onClick={() => setMenuMobileAberto(false)}>
            <Car aria-hidden="true" />
            <span className="ncr-section-label">Automóveis</span>
          </Link>
          <Link to="/imoveis" className="ncr-section-link imoveis" aria-label="Pesquisar imoveis" title="Pesquisar imoveis" onClick={() => setMenuMobileAberto(false)}>
            <House aria-hidden="true" />
            <span className="ncr-section-label">Imóveis</span>
          </Link>
        </div>

        {/* 🌟 DESKTOP ACTIONS */}
        <div className="ncr-actions">
          <button type="button" onClick={handleIrParaHome} className="ncr-btn-menu ncr-btn-home" aria-label="Voltar à página inicial">
            <svg viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5" /><path d="M5.5 10.5V20h13v-9.5" /><path d="M9.5 20v-5h5v5" /></svg>
            Início
          </button>
          <Link to="/profissionais" className="ncr-btn-menu">
            <svg viewBox="0 0 24 24"><path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-3" /><path d="M9 9h1M9 13h1M9 17h1" /></svg>
            Profissionais
          </Link>
          <Link to="/patrocinios" className="ncr-btn-menu ncr-btn-sponsor">
            <svg viewBox="0 0 24 24"><path d="M4 13V7a2 2 0 0 1 2-2h7l7 4v6l-7 4H6a2 2 0 0 1-2-2v-4z" /><path d="M13 5v14" /><path d="M7 19v2" /></svg>
            Patrocinar
          </Link>
          {signed ? (
            <>
              <Link to="/publicar" className="ncr-btn-publish">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="6" y1="1" x2="6" y2="11" /><line x1="1" y1="6" x2="11" y2="6" /></svg>
                Criar anúncio
              </Link>
              {isAdmin && (
                <Link to="/admin" className="ncr-icon-btn admin" title="Painel Admin">
                  <svg viewBox="0 0 24 24"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
                </Link>
              )}
              <button type="button" onClick={handlePremium} className={`ncr-btn-premium${isPremium ? ' active' : ''}`}><svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" /></svg></button>
              <Link to="/favoritos" className="ncr-icon-btn"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg></Link>
              
              <div className="ncr-divider" />
              <div ref={userMenuRef} style={{ position: 'relative' }}>
                <button className={`ncr-user-trigger ${userMenuAberto ? 'active' : ''}`} onClick={() => setUserMenuAberto(!userMenuAberto)}>
                  <div className="ncr-avatar">{avatarImg ? <img src={avatarImg} alt="Perfil" /> : <span className="ncr-avatar-initial">{inicial}</span>}</div>
                  {primeiroNome && <span className="ncr-username">{primeiroNome} {isPremium && <span className="ncr-pro-badge">Premium</span>}</span>}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                {userMenuAberto && (
                  <div className="ncr-user-dropdown" onClick={(e) => e.stopPropagation()}>
                    <Link to="/perfil" onClick={() => setUserMenuAberto(false)} className="ncr-ud-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>O Meu Perfil {isPremium && <span className="ncr-ud-pro">Premium</span>}</Link>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setUserMenuAberto(false)} className="ncr-ud-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></svg>Painel Admin <span className="ncr-ud-admin-badge">ADMIN</span></Link>
                    )}
                    <div className="ncr-ud-divider" />
                    <button type="button" onClick={() => { setUserMenuAberto(false); setModalPassAberto(true); }} className="ncr-ud-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                      Alterar Palavra-passe
                    </button>
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
        <button type="button" className={`ncr-burger-btn${signed ? ' with-avatar' : ''}`} onClick={() => setMenuMobileAberto(true)} aria-label="Abrir menu" aria-expanded={menuMobileAberto} aria-controls="ncr-mobile-drawer">
          {signed ? (
            <div className="ncr-avatar">{avatarImg ? <img src={avatarImg} alt="Perfil" /> : <span className="ncr-avatar-initial">{inicial}</span>}</div>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>

        {/* 🌟 MOBILE DRAWER (GAVETA NATIVA) */}
        <div id="ncr-mobile-drawer" className={`ncr-mobile-drawer ${menuMobileAberto ? 'active' : ''}`} role="dialog" aria-modal={menuMobileAberto ? 'true' : undefined} aria-hidden={!menuMobileAberto}>
          <div className="ncr-drawer-overlay" onClick={() => setMenuMobileAberto(false)} />
          <div className="ncr-drawer-content">
            <div className="ncr-drawer-header">
              {signed ? (
                <div className="ncr-drawer-user">
                  <div className="ncr-avatar">{avatarImg ? <img src={avatarImg} alt="Perfil" /> : <span className="ncr-avatar-initial">{inicial}</span>}</div>
                  <span className="ncr-drawer-title">Olá, {primeiroNome}!</span>
                </div>
              ) : (
                <span className="ncr-drawer-title">Menu</span>
              )}
              <button type="button" className="ncr-drawer-close" onClick={() => setMenuMobileAberto(false)} aria-label="Fechar menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="ncr-drawer-menu">
              <button type="button" className="ncr-drawer-link ncr-drawer-link-home" onClick={handleIrParaHome}>
                <svg viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5" /><path d="M5.5 10.5V20h13v-9.5" /><path d="M9.5 20v-5h5v5" /></svg>
                Página inicial
              </button>
              <Link to="/profissionais" className="ncr-drawer-link" onClick={() => setMenuMobileAberto(false)}>
                <svg viewBox="0 0 24 24"><path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-3" /><path d="M9 9h1M9 13h1M9 17h1" /></svg>
                Profissionais
              </Link>
              <Link to="/enviar-stock" className="ncr-drawer-link" onClick={() => setMenuMobileAberto(false)}>
                <svg viewBox="0 0 24 24"><path d="M4 5h16v14H4z" /><path d="M8 9h8M8 13h5" /></svg>
                Enviar stock
              </Link>
              <Link to="/patrocinios" className="ncr-drawer-link sponsor" onClick={() => setMenuMobileAberto(false)}>
                <svg viewBox="0 0 24 24"><path d="M4 13V7a2 2 0 0 1 2-2h7l7 4v6l-7 4H6a2 2 0 0 1-2-2v-4z" /><path d="M13 5v14" /><path d="M7 19v2" /></svg>
                Torne-se patrocinador
              </Link>
              {signed ? (
                <>
                  <Link to="/publicar" className="ncr-drawer-link publish" onClick={() => setMenuMobileAberto(false)}>
                    <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    Criar anúncio
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="ncr-drawer-link admin" onClick={() => setMenuMobileAberto(false)}>
                      <svg viewBox="0 0 24 24"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
                      Painel Admin
                    </Link>
                  )}
                  <Link to="/perfil" className="ncr-drawer-link" onClick={() => setMenuMobileAberto(false)}>
                    <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    O Meu Perfil {isPremium && <span className="ncr-ud-pro">Premium</span>}
                  </Link>
                  <button type="button" className="ncr-drawer-link" onClick={handlePremium}>
                    <svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" /></svg>
                    Plano Premium {isPremium && <span className="ncr-ud-pro">Premium</span>}
                  </button>
                  <Link to="/favoritos" className="ncr-drawer-link" onClick={() => setMenuMobileAberto(false)}>
                    <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                    Favoritos
                  </Link>
                  <button type="button" className="ncr-drawer-link" onClick={() => { setMenuMobileAberto(false); setModalPassAberto(true); }}>
                    <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    Alterar Palavra-passe
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

      {/* 🔐 MODAL ALTERAR PALAVRA-PASSE (renderizado via Portal em document.body,
          fora da <nav> para não ser afetado pelo backdrop-filter que quebra
          o position: fixed) */}
      {modalPassAberto && createPortal(
        <div className="ncr-pwm-overlay" onClick={fecharModalPass}>
          <div className="ncr-pwm-card" onClick={(e) => e.stopPropagation()}>
            <div className="ncr-pwm-header">
              <span className="ncr-pwm-title">Alterar Palavra-passe</span>
              <button type="button" className="ncr-pwm-close" onClick={fecharModalPass}>
                <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <form className="ncr-pwm-body" onSubmit={handleAlterarPassword}>
              <div className="ncr-pwm-field">
                <label className="ncr-pwm-label">Palavra-passe atual</label>
                <input type="password" className="ncr-pwm-input" value={senhaAtual} onChange={(e) => setSenhaAtual(e.target.value)} autoComplete="current-password" />
              </div>
              <div className="ncr-pwm-field">
                <label className="ncr-pwm-label">Nova palavra-passe</label>
                <input type="password" className="ncr-pwm-input" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} autoComplete="new-password" />
              </div>
              <div className="ncr-pwm-field">
                <label className="ncr-pwm-label">Confirmar nova palavra-passe</label>
                <input type="password" className="ncr-pwm-input" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} autoComplete="new-password" />
              </div>
              {erroPass && <div className="ncr-pwm-error">{erroPass}</div>}
              {sucessoPass && <div className="ncr-pwm-success">{sucessoPass}</div>}
              <button type="submit" className="ncr-pwm-submit" disabled={carregandoPass}>
                {carregandoPass ? 'A alterar...' : 'Alterar Palavra-passe'}
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

