import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function NavbarLanding() {
  const { user, signed, logout } = useAuth();
  const location = useLocation();

  const [userMenuAberto, setUserMenuAberto] = useState(false);
  const userMenuRef = useRef(null);

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
          position: sticky;
          top: 0;
          z-index: 1000;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          height: 80px;
          padding: 0 32px;
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          font-family: 'Inter', sans-serif;
        }

        .nl-side { display: flex; align-items: center; height: 100%; }
        .nl-side.right { justify-content: flex-end; gap: 12px; position: relative; }

        .nl-logo {
          grid-column: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }
        .nl-logo img {
          height: 38px;
          width: auto;
          object-fit: contain;
        }

        .nl-btn-ghost {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 10px 20px;
          border-radius: 999px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          color: #0f172a;
          font-size: 13px; font-weight: 600;
          text-decoration: none;
          transition: all .2s ease;
        }
        .nl-btn-ghost:hover { background: #f8fafc; border-color: #94a3b8; }

        .nl-btn-solid {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 10px 24px;
          border-radius: 999px;
          border: none;
          background: #0f172a;
          color: #ffffff;
          font-size: 13px; font-weight: 700;
          text-decoration: none;
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .nl-btn-solid:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(15,23,42,0.15); }

        .nl-user-trigger {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 4px 14px 4px 4px;
          border-radius: 999px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          cursor: pointer;
          transition: all .2s ease;
        }
        .nl-user-trigger:hover, .nl-user-trigger.active { background: #f8fafc; border-color: #cbd5e1; }

        .nl-avatar {
          width: 32px; height: 32px; border-radius: 50%;
          overflow: hidden; display: flex; align-items: center; justify-content: center;
          background: #f1f5f9; border: 1px solid #e2e8f0; flex-shrink: 0;
        }
        .nl-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .nl-avatar-initial { font-size: 12px; font-weight: 700; color: #0f172a; }
        .nl-username { font-size: 13px; font-weight: 600; color: #0f172a; }
        .nl-chevron { stroke: #64748b; }

        .nl-user-dropdown {
          position: absolute; top: calc(100% + 12px); right: 0;
          background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
          width: 200px; padding: 8px; display: flex; flex-direction: column;
          z-index: 1020;
        }
        .nl-ud-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; border-radius: 8px;
          font-size: 13px; font-weight: 600; color: #475569;
          text-decoration: none; border: none; background: transparent;
          width: 100%; text-align: left; cursor: pointer; transition: all .2s;
        }
        .nl-ud-item:hover { background: #f8fafc; color: #0f172a; }
        .nl-ud-item svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
        .nl-ud-divider { height: 1px; background: #e2e8f0; margin: 6px 0; }
        .nl-ud-item.logout:hover { background: #fef2f2; color: #dc2626; }

        @media (max-width: 768px) {
          .nl-root { padding: 0 16px; height: 70px; }
          .nl-logo img { height: 32px; }
          .nl-actions { right: 16px; gap: 8px; }
          .nl-btn-ghost, .nl-btn-solid { padding: 8px 16px; font-size: 12px; }
          .nl-username { display: none; }
        }
      `}</style>

      <nav className="nl-root">
        <div className="nl-side left" />

        <Link to="/" className="nl-logo">
          <img src="/logo-noxvelia.png" alt="NOXVELIA" />
        </Link>

        <div className="nl-side right">
          {signed ? (
            <div ref={userMenuRef} style={{ position: 'relative' }}>
              <button className={`nl-user-trigger ${userMenuAberto ? 'active' : ''}`} onClick={() => setUserMenuAberto(!userMenuAberto)}>
                <div className="nl-avatar">
                  {avatarImg ? <img src={avatarImg} alt="Perfil" /> : <span className="nl-avatar-initial">{inicial}</span>}
                </div>
                {primeiroNome && <span className="nl-username">{primeiroNome}</span>}
                <svg className="nl-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
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