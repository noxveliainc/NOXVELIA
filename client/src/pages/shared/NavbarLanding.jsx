import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function NavbarLanding() {
  const { user, signed, logout } = useAuth();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [userMenuAberto, setUserMenuAberto] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          height: 84px;
          padding: 0 28px;
          background: linear-gradient(to bottom, rgba(4,7,17,0.5), rgba(4,7,17,0));
          border-bottom: 1px solid transparent;
          transition: background .3s ease, height .3s ease, box-shadow .3s ease, border-color .3s ease;
          font-family: 'Inter', sans-serif;
        }
        .nl-root.scrolled {
          height: 68px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid #e2e8f0;
          box-shadow: 0 4px 20px -10px rgba(15,23,42,0.1);
        }

        .nl-side { display: flex; align-items: center; height: 100%; }
        .nl-side.right { justify-content: flex-end; gap: 10px; position: relative; }

        .nl-logo {
          grid-column: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nl-logo img {
          height: 46px;
          width: auto;
          object-fit: contain;
          transition: height .3s ease;
        }
        .nl-root.scrolled .nl-logo img { height: 38px; }

        .nl-btn-ghost {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 10px 20px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.35);
          color: #ffffff;
          font-size: 13px; font-weight: 600;
          text-decoration: none;
          transition: background .2s ease, border-color .2s ease, color .2s ease;
        }
        .nl-btn-ghost:hover { background: rgba(255,255,255,0.12); }
        .nl-root.scrolled .nl-btn-ghost { border-color: #cbd5e1; color: #0f172a; }
        .nl-root.scrolled .nl-btn-ghost:hover { background: rgba(15,23,42,0.04); }

        .nl-btn-solid {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 10px 20px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(120deg, #3ecf8e, #2ac1b4);
          color: #040711;
          font-size: 13px; font-weight: 800;
          text-decoration: none;
          transition: transform .2s ease;
        }
        .nl-btn-solid:hover { transform: translateY(-1px); }

        .nl-user-trigger {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 4px 14px 4px 4px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.3);
          cursor: pointer;
          transition: background .2s ease, border-color .2s ease;
        }
        .nl-user-trigger:hover { background: rgba(255,255,255,0.12); }
        .nl-root.scrolled .nl-user-trigger { border-color: #e2e8f0; }
        .nl-root.scrolled .nl-user-trigger:hover { background: #f8fafc; }

        .nl-avatar {
          width: 30px; height: 30px; border-radius: 50%;
          overflow: hidden; display: flex; align-items: center; justify-content: center;
          background: #e2e8f0; flex-shrink: 0;
        }
        .nl-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .nl-avatar-initial { font-size: 12px; font-weight: 700; color: #0f172a; }
        .nl-username { font-size: 13px; font-weight: 600; color: #ffffff; }
        .nl-root.scrolled .nl-username { color: #0f172a; }
        .nl-chevron { stroke: #ffffff; }
        .nl-root.scrolled .nl-chevron { stroke: #0f172a; }

        .nl-user-dropdown {
          position: absolute; top: calc(100% + 12px); right: 0;
          background: #fff; border: 1px solid #e2e8f0; border-radius: 12px;
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.15);
          width: 190px; padding: 8px; display: flex; flex-direction: column;
          z-index: 1020;
        }
        .nl-ud-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; border-radius: 8px;
          font-size: 13px; font-weight: 600; color: #475569;
          text-decoration: none; border: none; background: transparent;
          width: 100%; text-align: left; cursor: pointer;
        }
        .nl-ud-item:hover { background: #f8fafc; color: #0f172a; }
        .nl-ud-item svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
        .nl-ud-divider { height: 1px; background: #e2e8f0; margin: 6px 0; }
        .nl-ud-item.logout:hover { background: #fff1f2; color: #be123c; }

        @media (max-width: 560px) {
          .nl-root { padding: 0 14px; height: 70px; }
          .nl-root.scrolled { height: 58px; }
          .nl-logo img { height: 34px; }
          .nl-root.scrolled .nl-logo img { height: 28px; }
          .nl-btn-ghost, .nl-btn-solid { padding: 8px 14px; font-size: 12px; }
          .nl-username { display: none; }
        }
      `}</style>

      <nav className={`nl-root${scrolled ? ' scrolled' : ''}`}>
        <div className="nl-side left" />

        <Link to="/" className="nl-logo">
          <img src="/logo-noxvelia.png" alt="NOXVELIA" />
        </Link>

        <div className="nl-side right">
          {signed ? (
            <div ref={userMenuRef} style={{ position: 'relative' }}>
              <button className="nl-user-trigger" onClick={() => setUserMenuAberto(!userMenuAberto)}>
                <div className="nl-avatar">
                  {avatarImg ? <img src={avatarImg} alt="Perfil" /> : <span className="nl-avatar-initial">{inicial}</span>}
                </div>
                {primeiroNome && <span className="nl-username">{primeiroNome}</span>}
                <svg className="nl-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
              </button>
              {userMenuAberto && (
                <div className="nl-user-dropdown" onClick={(e) => e.stopPropagation()}>
                  <Link to="/perfil" onClick={() => setUserMenuAberto(false)} className="nl-ud-item">
                    <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    O Meu Perfil
                  </Link>
                  <div className="nl-ud-divider" />
                  <button onClick={() => { setUserMenuAberto(false); logout(); }} className="nl-ud-item logout">
                    <svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
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