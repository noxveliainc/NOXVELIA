import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function NavbarLanding() {
  const { user, signed, logout } = useAuth();
  const location = useLocation();
  const [userMenuAberto, setUserMenuAberto] = useState(false);
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);
  const userMenuRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const cliqueFora = (evento) => {
      if (userMenuRef.current && !userMenuRef.current.contains(evento.target)) {
        setUserMenuAberto(false);
      }
      if (navRef.current && !navRef.current.contains(evento.target)) {
        setMenuMobileAberto(false);
      }
    };

    const fecharComEscape = (evento) => {
      if (evento.key === 'Escape') {
        setUserMenuAberto(false);
        setMenuMobileAberto(false);
      }
    };

    window.addEventListener('click', cliqueFora);
    window.addEventListener('keydown', fecharComEscape);
    return () => {
      window.removeEventListener('click', cliqueFora);
      window.removeEventListener('keydown', fecharComEscape);
    };
  }, []);

  useEffect(() => {
    setUserMenuAberto(false);
    setMenuMobileAberto(false);
  }, [location.pathname]);

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
        .nl-root,
        .nl-root * {
          box-sizing: border-box;
        }

        .nl-root {
          position: sticky;
          top: 0;
          z-index: 1000;
          height: 74px;
          display: flex;
          align-items: center;
          padding: 0 24px;
          border-bottom: 1px solid rgba(8, 33, 38, 0.1);
          background: rgba(248, 246, 239, 0.88);
          backdrop-filter: blur(18px) saturate(145%);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .nl-inner {
          width: min(1260px, 100%);
          height: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 28px;
        }

        .nl-brand {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          color: #082126;
          text-decoration: none;
        }

        .nl-brand img {
          width: 40px;
          height: 40px;
          display: block;
          object-fit: contain;
        }

        .nl-wordmark {
          font-size: 15px;
          font-weight: 850;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .nl-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(18px, 2.5vw, 34px);
        }

        .nl-links a {
          position: relative;
          padding: 8px 0;
          color: #456067;
          text-decoration: none;
          font-size: 12px;
          font-weight: 760;
          transition: color 0.2s ease;
        }

        .nl-links a::after {
          content: "";
          position: absolute;
          left: 0;
          right: 100%;
          bottom: 3px;
          height: 2px;
          border-radius: 2px;
          background: #2ac1b4;
          transition: right 0.2s ease;
        }

        .nl-links a:hover {
          color: #082126;
        }

        .nl-links a:hover::after {
          right: 0;
        }

        .nl-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 9px;
          min-width: 0;
        }

        .nl-menu-toggle {
          width: 40px;
          height: 40px;
          display: none;
          place-items: center;
          padding: 0;
          color: #143238;
          border: 1px solid rgba(8, 33, 38, 0.16);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.62);
          cursor: pointer;
        }

        .nl-menu-toggle svg {
          width: 19px;
          height: 19px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
        }

        .nl-mobile-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 16px;
          right: 16px;
          display: none;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 6px;
          padding: 10px;
          border: 1px solid rgba(8, 33, 38, 0.12);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 22px 54px -30px rgba(8, 33, 38, 0.5);
        }

        .nl-mobile-menu a {
          display: flex;
          align-items: center;
          min-height: 42px;
          padding: 0 12px;
          color: #355158;
          border-radius: 9px;
          text-decoration: none;
          font-size: 12px;
          font-weight: 780;
        }

        .nl-mobile-menu a:hover {
          color: #082126;
          background: #edf6f3;
        }

        .nl-btn-ghost,
        .nl-btn-solid {
          min-height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 16px;
          border-radius: 10px;
          text-decoration: none;
          font-size: 12px;
          font-weight: 800;
          transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .nl-btn-ghost {
          color: #143238;
          border: 1px solid rgba(8, 33, 38, 0.16);
          background: rgba(255, 255, 255, 0.56);
        }

        .nl-btn-ghost:hover {
          border-color: rgba(8, 33, 38, 0.28);
          background: #fff;
        }

        .nl-btn-solid {
          color: #fff;
          border: 1px solid #082126;
          background: #082126;
          box-shadow: 0 12px 24px -18px rgba(8, 33, 38, 0.75);
        }

        .nl-btn-solid:hover {
          transform: translateY(-1px);
          background: #0d3036;
          box-shadow: 0 16px 28px -18px rgba(8, 33, 38, 0.8);
        }

        .nl-user-wrap {
          position: relative;
        }

        .nl-user-trigger {
          min-height: 42px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 12px 4px 4px;
          color: #143238;
          border: 1px solid rgba(8, 33, 38, 0.14);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .nl-user-trigger:hover,
        .nl-user-trigger.active {
          border-color: rgba(42, 193, 180, 0.5);
          background: #fff;
        }

        .nl-avatar {
          width: 32px;
          height: 32px;
          flex: 0 0 auto;
          overflow: hidden;
          display: grid;
          place-items: center;
          color: #0d5955;
          border: 1px solid rgba(42, 193, 180, 0.24);
          border-radius: 50%;
          background: rgba(42, 193, 180, 0.14);
        }

        .nl-avatar img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .nl-avatar-initial,
        .nl-username {
          font-size: 12px;
          font-weight: 800;
        }

        .nl-chevron {
          stroke: #6b7d82;
          transition: transform 0.2s ease;
        }

        .nl-user-trigger.active .nl-chevron {
          transform: rotate(180deg);
        }

        .nl-user-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          width: 210px;
          display: flex;
          flex-direction: column;
          padding: 8px;
          border: 1px solid rgba(8, 33, 38, 0.12);
          border-radius: 14px;
          background: #fff;
          box-shadow: 0 22px 54px -30px rgba(8, 33, 38, 0.5);
        }

        .nl-ud-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 11px;
          color: #4d656b;
          border: 0;
          border-radius: 9px;
          background: transparent;
          text-align: left;
          text-decoration: none;
          font-size: 12px;
          font-weight: 720;
          cursor: pointer;
          transition: color 0.2s ease, background 0.2s ease;
        }

        .nl-ud-item:hover {
          color: #082126;
          background: #f1f6f4;
        }

        .nl-ud-item svg {
          width: 16px;
          height: 16px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .nl-ud-divider {
          height: 1px;
          margin: 6px 0;
          background: #e5eceb;
        }

        .nl-ud-item.logout:hover {
          color: #b42318;
          background: #fff3f1;
        }

        @media (max-width: 920px) {
          .nl-inner {
            gap: 18px;
          }

          .nl-links {
            display: none;
          }

          .nl-inner {
            grid-template-columns: auto 1fr;
          }

          .nl-actions {
            grid-column: 2;
          }

          .nl-menu-toggle,
          .nl-mobile-menu {
            display: grid;
          }
        }

        @media (max-width: 540px) {
          .nl-root {
            height: 66px;
            padding: 0 14px;
          }

          .nl-inner {
            gap: 10px;
          }

          .nl-brand img {
            width: 34px;
            height: 34px;
          }

          .nl-wordmark {
            display: none;
          }

          .nl-actions {
            gap: 6px;
          }

          .nl-btn-ghost,
          .nl-btn-solid {
            min-height: 36px;
            padding: 0 11px;
            font-size: 11px;
          }

          .nl-username {
            display: none;
          }

          .nl-user-trigger {
            padding-right: 8px;
          }

          .nl-menu-toggle {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>

      <nav className="nl-root" aria-label="Navegação principal" ref={navRef}>
        <div className="nl-inner">
          <Link to="/" className="nl-brand" aria-label="Noxvelia — página inicial">
            <img src="/logo-noxvelia.png" alt="" />
            <span className="nl-wordmark">Noxvelia</span>
          </Link>

          <div className="nl-links">
            <a href="#marcas">Marcas</a>
            <a href="#destaques">Em destaque</a>
            <a href="#carvertical">carVertical</a>
            <Link to="/carros">Drive</Link>
            <Link to="/imoveis">Estate</Link>
          </div>

          <div className="nl-actions">
            <button
              type="button"
              className="nl-menu-toggle"
              onClick={() => {
                setUserMenuAberto(false);
                setMenuMobileAberto((aberto) => !aberto);
              }}
              aria-expanded={menuMobileAberto}
              aria-controls="nl-mobile-menu"
              aria-label={menuMobileAberto ? 'Fechar navegação' : 'Abrir navegação'}
            >
              {menuMobileAberto ? (
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
              )}
            </button>

            {signed ? (
              <div ref={userMenuRef} className="nl-user-wrap">
                <button
                  type="button"
                  className={`nl-user-trigger ${userMenuAberto ? 'active' : ''}`}
                  onClick={() => {
                    setMenuMobileAberto(false);
                    setUserMenuAberto((aberto) => !aberto);
                  }}
                  aria-expanded={userMenuAberto}
                  aria-label="Abrir menu de utilizador"
                >
                  <span className="nl-avatar">
                    {avatarImg ? <img src={avatarImg} alt="" /> : <span className="nl-avatar-initial">{inicial}</span>}
                  </span>
                  {primeiroNome && <span className="nl-username">{primeiroNome}</span>}
                  <svg className="nl-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {userMenuAberto && (
                  <div className="nl-user-dropdown">
                    <Link to="/perfil" onClick={() => setUserMenuAberto(false)} className="nl-ud-item">
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      O meu perfil
                    </Link>
                    <div className="nl-ud-divider" />
                    <button
                      type="button"
                      onClick={() => { setUserMenuAberto(false); logout(); }}
                      className="nl-ud-item logout"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                      Terminar sessão
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
        </div>

        {menuMobileAberto && (
          <div className="nl-mobile-menu" id="nl-mobile-menu">
            <a href="#marcas" onClick={() => setMenuMobileAberto(false)}>Marcas</a>
            <a href="#destaques" onClick={() => setMenuMobileAberto(false)}>Em destaque</a>
            <a href="#carvertical" onClick={() => setMenuMobileAberto(false)}>carVertical</a>
            <Link to="/carros" onClick={() => setMenuMobileAberto(false)}>Drive</Link>
            <Link to="/imoveis" onClick={() => setMenuMobileAberto(false)}>Estate</Link>
          </div>
        )}
      </nav>
    </>
  );
}
