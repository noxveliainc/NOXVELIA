import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login: sincronizarContexto } = useAuth();

  // Destino de retorno: vem do state (passado pelo BannerCTA),
  // ou do localStorage como fallback, ou /imoveis como último recurso
  const destinoVoltar =
    location.state?.from ||
    (localStorage.getItem('@App:contexto_visual') === 'carro' ? '/carros' : '/imoveis');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      if (sincronizarContexto) {
        await sincronizarContexto(email, password);
      }

      setSucesso(true);

      setTimeout(() => {
        const userGuardado = JSON.parse(localStorage.getItem('@App:user') || '{}');

        if (userGuardado?.tipo === 'admin') {
          navigate('/admin', { replace: true });
          return;
        }

        const contextoSalvo = localStorage.getItem('@App:contexto_visual');
        const fallbackUniverso = contextoSalvo === 'carro' ? '/carros' : '/imoveis';
        const destino = location.state?.from || fallbackUniverso;

        navigate(destino, { replace: true });
      }, 1000);
    } catch (err) {
      console.error(err);
      setErro(err.response?.data?.erro || 'Email ou palavra-passe incorretos.');
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .auth-root {
          background-color: #040711;
          background-image: radial-gradient(circle at top right, rgba(42, 193, 180, 0.05), transparent 45%),
                            radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.05), transparent 45%);

          --nx-text: #f8fafc;
          --nx-text-sub: #94a3b8;
          --nx-text-muted: #64748b;
          --nx-card-bg: rgba(15, 23, 42, 0.6);
          --nx-card-border: rgba(255, 255, 255, 0.08);
          --nx-input-bg: rgba(15, 23, 42, 0.5);
          --nx-input-border: rgba(255, 255, 255, 0.1);

          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          color: var(--nx-text);
          font-family: var(--nx-font-body, 'Inter', sans-serif);
          overflow: hidden;
          box-sizing: border-box;
        }

        .auth-card {
          background: var(--nx-card-bg);
          border: 1px solid var(--nx-card-border);
          border-radius: var(--nx-radius-lg, 20px);
          padding: 48px;
          width: 100%;
          max-width: 460px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          max-height: 90vh;
          overflow-y: auto;
        }

        .auth-card::-webkit-scrollbar { display: none; }
        .auth-card { -ms-overflow-style: none; scrollbar-width: none; }

        .auth-back {
          color: var(--nx-text-sub);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-decoration: none;
          display: inline-block;
          margin-bottom: 32px;
          transition: color 0.2s;
        }
        .auth-back:hover { color: var(--nx-text); }

        .auth-title {
          font-family: var(--nx-font-display, 'Plus Jakarta Sans', sans-serif);
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .auth-subtitle {
          font-size: 14px;
          color: var(--nx-text-sub);
          margin-bottom: 32px;
        }

        .auth-form-group { margin-bottom: 20px; }
        .auth-form-group label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--nx-text-muted);
          margin-bottom: 8px;
        }

        .auth-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .auth-input {
          width: 100%;
          padding: 14px 16px;
          background: var(--nx-input-bg);
          border: 1px solid var(--nx-input-border);
          border-radius: var(--nx-radius-sm, 8px);
          color: var(--nx-text);
          outline: none;
          font-family: inherit;
          font-size: 14px;
          transition: all 0.2s;
          box-sizing: border-box;
        }
        .auth-input:focus {
          border-color: var(--nx-accent-car, #2ac1b4);
          box-shadow: 0 0 0 3px rgba(42, 193, 180, 0.12);
        }
        .auth-input::placeholder { color: var(--nx-text-muted); }

        .auth-input-wrapper .auth-input {
          padding-right: 48px;
        }

        .auth-toggle-pwd {
          position: absolute;
          right: 12px;
          background: transparent;
          border: none;
          color: var(--nx-text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          transition: color 0.2s;
        }
        .auth-toggle-pwd:hover { color: var(--nx-text); }

        .auth-btn {
          width: 100%;
          padding: 16px;
          background: var(--nx-text);
          color: #040711;
          border: none;
          border-radius: var(--nx-radius-sm, 8px);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          font-family: inherit;
          transition: opacity 0.2s;
          margin-top: 12px;
        }
        .auth-btn:hover { opacity: 0.85; }
        .auth-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .auth-links-group {
          margin-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: center;
        }

        .auth-link {
          color: var(--nx-text-sub);
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }
        .auth-link:hover { color: var(--nx-text); }

        .auth-error {
          color: #ef4444;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 24px;
          background: rgba(239, 68, 68, 0.08);
          padding: 14px;
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: var(--nx-radius-sm, 8px);
        }

        .auth-success {
          text-align: center;
          padding: 40px 0;
        }
        .auth-success h2 {
          font-family: var(--nx-font-display, 'Plus Jakarta Sans', sans-serif);
          font-size: 24px;
          color: var(--nx-accent-car, #2ac1b4);
          margin-bottom: 12px;
        }
        .auth-success p {
          color: var(--nx-text-sub);
          font-size: 14px;
        }
      `}</style>

      <div className="auth-root">
        <div className="auth-card">

          {/* ← Voltar: usa o state passado pelo BannerCTA, ou fallback para /carros ou /imoveis */}
          <Link to={destinoVoltar} className="auth-back">← Voltar</Link>

          <div style={{ marginBottom: '24px' }}>
            <img src="/logo-noxvelia.png" alt="NOXVELIA" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
          </div>

          {sucesso ? (
            <div className="auth-success">
              <h2>Bem-vindo de volta!</h2>
              <p>A estabelecer ligação segura com o teu painel...</p>
            </div>
          ) : (
            <>
              <h1 className="auth-title">Iniciar Sessão</h1>
              <p className="auth-subtitle">Acede à tua conta na NOXVELIA.</p>

              {erro && <div className="auth-error">{erro}</div>}

              <form onSubmit={handleLogin}>

                <div className="auth-form-group">
                  <label>Email</label>
                  <input
                    className="auth-input"
                    type="email"
                    placeholder="joao.silva@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="auth-form-group">
                  <label>Palavra-passe</label>
                  <div className="auth-input-wrapper">
                    <input
                      className="auth-input"
                      type={mostrarPassword ? 'text' : 'password'}
                      placeholder="•••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="auth-toggle-pwd"
                      onClick={() => setMostrarPassword(!mostrarPassword)}
                      aria-label="Alternar visibilidade da palavra-passe"
                    >
                      {mostrarPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <button className="auth-btn" type="submit" disabled={loading}>
                  {loading ? 'A verificar credenciais...' : 'Entrar na Plataforma'}
                </button>
              </form>

              <div className="auth-links-group">
                <Link
                  to="/registo"
                  state={{ from: location.state?.from || destinoVoltar }}
                  className="auth-link"
                >
                  Ainda não tens conta? Regista-te aqui.
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}