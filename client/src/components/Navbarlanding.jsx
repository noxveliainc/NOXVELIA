import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Navbar da Landing Page — fixa e flutua transparente sobre o hero em
// ecrã inteiro, tornando-se sólida assim que se ultrapassa essa secção.
// Não tem modais nem lógica de login/registo própria — usa as páginas
// /login e /registo que já existem no projeto, tal como a NavbarImovel.
//
// Caminho do import ('../context/AuthContext') assume que este ficheiro
// vive em src/components/NavbarLanding.jsx. Ajusta o caminho se necessário.

export default function NavbarLanding() {
  const { user, signed, logout } = useAuth();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [userMenuAberto, setUserMenuAberto] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const limiar = () => Math.max(window.innerHeight - 110, 240);
    const onScroll = () => setScrolled(window.scrollY > limiar());
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const cliqueFora = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuAberto(false);
    };
    window.addEventListener('click', cliqueFora);
    return () => window.removeEventListener('click', cliqueFora);
  }, []);

  const obterUserLocal = () => {
    try {
      const guardado = localStorage.getItem('@App:user');
      return guardado ? JSON.parse(guardado) : null;
    } catch {
      return null;
    }
  };
  const dadosUser = user || obterUserLocal();
  const avatarImg = dadosUser?.avatarUrl || dadosUser?.avatar;
  const inicial = dadosUser?.nome?.charAt(0).toUpperCase() || 'U';
  const primeiroNome = dadosUser?.nome?.split(' ')[0] || '';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .nl-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          height: 88px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 28px;
          background: linear-gradient(to bottom, rgba(4,7,17,0.45), rgba(4,7,17,0));
          border-bottom: 1px solid transparent;
          transition: background .35s ease, border-color .35s ease, height .35s ease;
          font-family: 'Inter', sans-serif;
        }
        .nl-root.scrolled {
          height: 70px;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid #e2e8f0;
          box-shadow: 0 4px 20px -8px rgba(15, 23, 42, 0.08);
        }

        .nl-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          user-select: none;
          padding: 8px 18px;
          border-radius: 999px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.16);
          backdrop-filter: blur(6px);
          transition: all .35s ease;
        }
        .nl-root.scrolled .nl-logo {
          background: transparent;
          border-color: transparent;
          padding: 4px 0;
        }
        .nl-logo img {
          height: 42px;
          width: auto;
          object-fit: contain;
          transition: height .35s ease;
        }
        .nl-root.scrolled .nl-logo img { height: 32px; }

        .nl-actions {
          position: absolute;
          right: 28px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nl-btn-ghost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 11px 22px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.35);
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(6px);
          color: #ffffff;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: all .25s ease;
        }
        .nl-btn-ghost:hover { background: rgba(255,255,255,0.18); }
        .nl-root.scrolled .nl-btn-ghost {
          border-color: #cbd5e1;
          background: transparent;
          color: #0f172a;
          backdrop-filter: none;
        }
        .nl-root.scrolled .nl-btn-ghost:hover { border-color: #94a3b8; background: rgba(15,23,42,0.03); }

        .nl-btn-solid {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 11px 22px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(120deg, #3ecf8e, #2ac1b4);
          color: #040711;
          font-size: 13px;
          font-weight: 800;
          text-decoration: none;
          box-shadow: 0 8px 20px -8px rgba(42, 193, 180, 0.6);
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .nl-btn-solid:hover { transform: translateY(-1px); box-shadow: 0 10px 24px -8px rgba(42, 193, 180, 0.75); }

        /* --- Utilizador autenticado --- */
        .nl-user-trigger {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.1);
          padding: 4px 16px 4px 4px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.25);
          backdrop-filter: blur(6px);
          cursor: pointer;
          transition: all .25s ease;
        }
        .nl-user-trigger:hover, .nl-user-trigger.active { background: rgba(255,255,255,0.2); }
        .nl-root.scrolled .nl-user-trigger {
          background: transparent; border-color: transparent; backdrop-filter: none;
        }
        .nl-root.scrolled .nl-user-trigger:hover,
        .nl-root.scrolled .nl-user-trigger.active { background: #f8fafc; border-color: #e2e8f0; }

        .nl-avatar {
          width: 32px; height: 32px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.5); overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          background: #e2e8f0; flex-shrink: 0;
        }
        .nl-root.scrolled .nl-avatar { border-color: #cbd5e1; }
        .nl-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .nl-avatar-initial { font-size: 13px; font-weight: 700; color: #0f172a; }
        .nl-username { font-size: 13px; font-weight: 600; color: #ffffff; transition: color .35s ease; }
        .nl-root.scrolled .nl-username { color: #0f172a; }
        .nl-chevron { stroke: #ffffff; transition: stroke .35s ease; }
        .nl-root.scrolled .nl-chevron { stroke: #0f172a; }

        .nl-user-dropdown {
          position: absolute; top: calc(100% + 14px); right: 0;
          background: #fff; border: 1px solid #e2e8f0; border-radius: 12px;
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.15);
          width: 200px; display: flex; flex-direction: column; padding: 8px;
          z-index: 1020;
        }
        .nl-ud-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; border-radius: 8px;
          font-size: 13px; font-weight: 600; color: #475569;
          text-decoration: none; cursor: pointer; border: none;
          background: transparent; width: 100%; text-align: left;
          transition: all .2s;
        }
        .nl-ud-item:hover { background: #f8fafc; color: #0f172a; }
        .nl-ud-item svg { width: 16px; height: 16px; flex-shrink: 0; stroke-width: 2; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; }
        .nl-ud-divider { height: 1px; background: #e2e8f0; margin: 6px 0; }
        .nl-ud-item.logout:hover { background: #fff1f2; color: #be123c; }

        @media (max-width: 560px) {
          .nl-root { padding: 0 16px; height: 76px; }
          .nl-root.scrolled { height: 62px; }
          .nl-logo img { height: 32px; }
          .nl-root.scrolled .nl-logo img { height: 26px; }
          .nl-actions { right: 16px; gap: 6px; }
          .nl-btn-ghost, .nl-btn-solid { padding: 9px 15px; font-size: 12.5px; }
          .nl-username { display: none; }
        }
      `}</style>

      <nav className={`nl-root${scrolled ? ' scrolled' : ''}`}>
        <Link to="/" className="nl-logo">
          <img src="/logo-noxvelia.png" alt="NOXVELIA" />
        </Link>

        <div className="nl-actions">
          {signed ? (
            <div ref={userMenuRef} style={{ position: 'relative' }}>
              <button className={`nl-user-trigger ${userMenuAberto ? 'active' : ''}`} onClick={() => setUserMenuAberto(!userMenuAberto)}>
                <div className="nl-avatar">
                  {avatarImg ? <img src={avatarImg} alt="Perfil" /> : <span className="nl-avatar-initial">{inicial}</span>}
                </div>
                {primeiroNome && <span className="nl-username">{primeiroNome}</span>}
                <svg className="nl-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
              </button>
              {userMenuAberto && (
                <div className="nl-user-dropdown" onClick={(e) => e.stopPropagation()}>
                  <Link to="/perfil" onClick={() => setUserMenuAberto(false)} className="nl-ud-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    O Meu Perfil
                  </Link>
                  <div className="nl-ud-divider" />
                  <button onClick={() => { setUserMenuAberto(false); logout(); }} className="nl-ud-item logout">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    Terminar Sessão
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" state={{ from: location.pathname }} className="nl-btn-ghost">Entrar</Link>
              <Link to="/registo" className="nl-btn-solid">Registar</Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}