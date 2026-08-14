import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { publishIntentState } from '../../utils/navigationState';

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
      const guardado = sessionStorage.getItem('@App:user');
      return guardado ? JSON.parse(guardado) : null;
    } catch {
      return null;
    }
  };

  const dadosUser = user || obterUserLocal();
  const avatarImg = dadosUser?.avatarUrl || dadosUser?.avatar;
  const inicial = dadosUser?.nome?.charAt(0).toUpperCase() || 'U';
  const primeiroNome = dadosUser?.nome?.split(' ')[0] || '';
  const publicarTo = signed ? '/publicar' : '/login';
  const publicarState = signed ? undefined : publishIntentState(location, '/');

  return (
    <>
      <style>{`
        .nl-root,
        .nl-root * {
          box-sizing: border-box;
        }

        .nl-root {
          position: relative;
          z-index: 50;
          width: 100%;
          isolation: isolate;
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
          color: #071326;
          text-decoration: none;
        }

        .nl-brand img {
          width: 44px;
          height: 44px;
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
          background: #d9c49c;
          transition: right 0.2s ease;
        }

        .nl-links a:hover {
          color: #071326;
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
          color: #102f50;
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
          gap: 8px;
          padding: 12px;
          border: 1px solid rgba(8, 33, 38, 0.12);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 22px 54px -30px rgba(8, 33, 38, 0.5);
        }

        .nl-mobile-menu-head {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          gap: 10px;
          min-height: 52px;
          padding: 6px 6px 12px;
          border-bottom: 1px solid #e3ebe8;
          color: #071326;
        }

        .nl-mobile-menu-head img {
          width: 38px;
          height: 38px;
          display: block;
          object-fit: contain;
        }

        .nl-mobile-menu-head strong {
          display: block;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .nl-mobile-menu-head span {
          display: block;
          margin-top: 2px;
          color: #60767c;
          font-size: 11px;
          font-weight: 720;
        }



        .nl-mobile-menu a,
        .nl-mobile-menu button {
          display: flex;
          align-items: center;
          min-height: 42px;
          width: 100%;
          padding: 0 12px;
          color: #355158;
          border: 0;
          border-radius: 9px;
          text-decoration: none;
          font-size: 12px;
          font-weight: 780;
          background: transparent;
          cursor: pointer;
        }

        .nl-mobile-menu a.nl-mobile-primary {
          grid-column: 1 / -1;
          justify-content: center;
          min-height: 46px;
          color: #ffffff;
          background: #071326;
        }

        .nl-mobile-menu a:hover,
        .nl-mobile-menu button:hover {
          color: #071326;
          background: #edf6f3;
        }

        .nl-mobile-menu a.nl-mobile-primary:hover {
          color: #ffffff;
          background: #102f50;
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
          color: #102f50;
          border: 1px solid rgba(8, 33, 38, 0.16);
          background: rgba(255, 255, 255, 0.56);
        }

        .nl-btn-ghost:hover {
          border-color: rgba(8, 33, 38, 0.28);
          background: #fff;
        }

        .nl-btn-solid {
          color: #102f50;
          border: 1px solid #102f50;
          background: transparent;
          box-shadow: none;
        }

        .nl-btn-solid:hover {
          transform: translateY(-1px);
          color: #071326;
          border-color: #071326;
          background: rgba(255, 255, 255, 0.72);
          box-shadow: none;
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
          color: #102f50;
          border: 1px solid rgba(8, 33, 38, 0.14);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .nl-user-trigger:hover,
        .nl-user-trigger.active {
          border-color: rgba(217, 196, 156, 0.62);
          background: #fff;
        }

        .nl-avatar {
          width: 32px;
          height: 32px;
          flex: 0 0 auto;
          overflow: hidden;
          display: grid;
          place-items: center;
          color: #102f50;
          border: 1px solid rgba(217, 196, 156, 0.42);
          border-radius: 50%;
          background: rgba(217, 196, 156, 0.18);
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
          color: #071326;
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
            width: 38px;
            height: 38px;
          }

          .nl-wordmark {
            display: inline;
            font-size: 12px;
            letter-spacing: 0.1em;
          }

          .nl-actions {
            gap: 6px;
          }

          .nl-btn-ghost,
          .nl-btn-solid,
          .nl-user-wrap {
            display: none;
          }

          .nl-user-trigger {
            padding-right: 8px;
          }

          .nl-menu-toggle {
            width: 36px;
            height: 36px;
          }

          .nl-mobile-menu {
            left: 10px;
            right: 10px;
            grid-template-columns: 1fr;
          }
        }

        /* Noxvelia logo palette navbar */
        .nl-root {
          border-bottom-color: rgba(7, 19, 38, 0.12) !important;
          background: rgba(255, 250, 240, 0.9) !important;
        }

        .nl-brand,
        .nl-links a,
        .nl-btn-ghost,
        .nl-user-trigger {
          color: #071326 !important;
        }

        .nl-links a::after {
          background: #d9c49c !important;
        }

        .nl-btn-ghost {
          border-color: rgba(7, 19, 38, 0.16) !important;
          background: rgba(255, 255, 255, 0.66) !important;
        }

        .nl-btn-ghost:hover {
          border-color: #d9c49c !important;
          background: #f0dfbb !important;
        }

                .nl-btn-solid {
          color: #102f50 !important;
          border-color: #102f50 !important;
          background: transparent !important;
          box-shadow: none !important;
        }

        .nl-btn-solid:hover {
          color: #071326 !important;
          border-color: #071326 !important;
          background: rgba(255, 255, 255, 0.72) !important;
        }

        .nl-mobile-menu a.nl-mobile-primary {
          color: #ffffff !important;
          border-color: #071326 !important;
          background: #071326 !important;
        }

        .nl-mobile-menu a.nl-mobile-primary:hover {
          color: #ffffff !important;
          background: #102f50 !important;
          border-color: #102f50 !important;
        }


        /* Noxvelia navy shell - referencia premium com CTA dourado */
        .nl-root {
          background: #102f50 !important;
          border-bottom: 1px solid rgba(217, 196, 156, .42) !important;
          box-shadow: 0 16px 34px -30px rgba(7, 19, 38, .9) !important;
        }

        .nl-brand,
        .nl-wordmark,
        .nl-links a,
        .nl-btn-ghost,
        .nl-user-trigger {
          color: #fffaf0 !important;
        }

        .nl-links a:hover {
          color: #f0dfbb !important;
        }

        .nl-links a::after {
          background: #d9c49c !important;
        }

        .nl-btn-ghost {
          border-color: rgba(255, 250, 240, .24) !important;
          background: rgba(255, 250, 240, .05) !important;
        }

        .nl-btn-ghost:hover {
          color: #071326 !important;
          border-color: #fffaf0 !important;
          background: #fffaf0 !important;
        }

        .nl-btn-solid {
          color: #071326 !important;
          border-color: #d9c49c !important;
          background: #d9c49c !important;
          box-shadow: 0 12px 24px -18px rgba(217, 196, 156, .8) !important;
        }

        .nl-btn-solid::before {
          content: '+';
          margin-right: 7px;
          font-weight: 900;
        }

        .nl-btn-solid:hover {
          color: #071326 !important;
          border-color: #f0dfbb !important;
          background: #f0dfbb !important;
        }

        .nl-menu-toggle {
          color: #fffaf0 !important;
          border-color: rgba(255, 250, 240, .22) !important;
          background: rgba(255, 250, 240, .06) !important;
        }

        .nl-user-trigger:hover,
        .nl-user-trigger.active {
          border-color: rgba(217, 196, 156, .72) !important;
          background: rgba(255, 250, 240, .08) !important;
        }

        .nl-avatar {
          color: #102f50 !important;
          border-color: rgba(217, 196, 156, .82) !important;
          background: #fffaf0 !important;
        }

        .nl-chevron { stroke: #f0dfbb !important; }
      `}</style>

      <nav className="nl-root" aria-label="Navegação principal" ref={navRef}>
        <div className="nl-inner">
          <Link to="/" className="nl-brand" aria-label="Noxvelia — página inicial">
            <img src="/logo-noxvelia.png" alt="" />
            <span className="nl-wordmark">Noxvelia</span>
          </Link>

          <div className="nl-links">
            <a href="#pesquisa">Pesquisar</a>
            <a href="#anunciar">Criar anúncio</a>
            <Link to="/profissionais">Profissionais</Link>
            <Link to="/enviar-stock">Enviar stock</Link>
            <Link to="/patrocinios">Patrocinar</Link>
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
            <Link to="/patrocinios" className="nl-btn-ghost nl-btn-sponsor">Patrocinar</Link>
            {!signed && <Link to="/login" state={{ from: location.pathname }} className="nl-btn-ghost">Entrar</Link>}
            <Link to={publicarTo} state={publicarState} className="nl-btn-solid">Criar anúncio</Link>

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
            ) : null}
          </div>
        </div>

        {menuMobileAberto && (
          <div className="nl-mobile-menu" id="nl-mobile-menu">
            <div className="nl-mobile-menu-head" aria-hidden="true">
              <img src="/logo-noxvelia.png" alt="" />
              <div>
                <strong>Noxvelia</strong>
                <span>Automóveis e imóveis em Portugal</span>
              </div>
            </div>
            <a href="#pesquisa" onClick={() => setMenuMobileAberto(false)}>Pesquisar</a>
            <a href="#anunciar" onClick={() => setMenuMobileAberto(false)}>Criar anúncio</a>
            <Link to="/carros" onClick={() => setMenuMobileAberto(false)}>Automóveis</Link>
            <Link to="/imoveis" onClick={() => setMenuMobileAberto(false)}>Imóveis</Link>
            <Link to="/profissionais" onClick={() => setMenuMobileAberto(false)}>Profissionais</Link>
            <Link to="/enviar-stock" onClick={() => setMenuMobileAberto(false)}>Enviar stock</Link>
            <Link to="/patrocinios" onClick={() => setMenuMobileAberto(false)}>Torne-se patrocinador</Link>
            <Link className="nl-mobile-primary" to={publicarTo} state={publicarState} onClick={() => setMenuMobileAberto(false)}>Criar anúncio</Link>
            {signed ? (
              <>
                <Link to="/perfil" onClick={() => setMenuMobileAberto(false)}>O meu perfil</Link>
                <button type="button" onClick={() => { setMenuMobileAberto(false); logout(); }}>Terminar sessão</button>
              </>
            ) : (
              <>
                <Link to="/login" state={{ from: location.pathname }} onClick={() => setMenuMobileAberto(false)}>Entrar</Link>
                <Link to="/registo" onClick={() => setMenuMobileAberto(false)}>Registar</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
}
