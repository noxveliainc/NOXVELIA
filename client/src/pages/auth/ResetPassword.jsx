import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const validarPassword = (pwd) => {
    const temTamanho = pwd.length >= 9;
    const temMaiuscula = /[A-Z]/.test(pwd);
    const temNumero = /\d/.test(pwd);
    const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    return temTamanho && temMaiuscula && temNumero && temEspecial;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (password !== confirmPassword) {
      return setErro('As palavras-passe não coincidem.');
    }

    if (!validarPassword(password)) {
      return setErro('A palavra-passe tem de ter pelo menos 9 caracteres, 1 maiúscula, 1 número e 1 carácter especial.');
    }

    setLoading(true);
    try {
      await api.post(`/auth/reset-password/${token}`, { password });
      setSucesso(true);
    } catch (err) {
      setErro(err.response?.data?.erro || 'Link de recuperação inválido ou expirado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .auth-root { background-color: #040711; background-image: radial-gradient(circle at top right, rgba(42, 193, 180, 0.05), transparent 45%), radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.05), transparent 45%); --nx-text: #f8fafc; --nx-text-sub: #94a3b8; --nx-text-muted: #64748b; --nx-card-bg: rgba(15, 23, 42, 0.6); --nx-card-border: rgba(255, 255, 255, 0.08); --nx-input-bg: rgba(15, 23, 42, 0.5); --nx-input-border: rgba(255, 255, 255, 0.1); height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; color: var(--nx-text); font-family: var(--nx-font-body, 'Inter', sans-serif); overflow: hidden; box-sizing: border-box; }
        .auth-card { background: var(--nx-card-bg); border: 1px solid var(--nx-card-border); border-radius: var(--nx-radius-lg, 20px); padding: 48px; width: 100%; max-width: 460px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }
        .auth-title { font-family: var(--nx-font-display, 'Plus Jakarta Sans', sans-serif); font-size: 32px; font-weight: 800; margin-bottom: 8px; letter-spacing: -0.02em; }
        .auth-subtitle { font-size: 14px; color: var(--nx-text-sub); margin-bottom: 32px; line-height: 1.5; }
        .auth-form-group { margin-bottom: 20px; }
        .auth-form-group label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--nx-text-muted); margin-bottom: 8px; }
        .auth-input-wrapper { position: relative; display: flex; align-items: center; }
        .auth-input { width: 100%; padding: 14px 16px; background: var(--nx-input-bg); border: 1px solid var(--nx-input-border); border-radius: var(--nx-radius-sm, 8px); color: var(--nx-text); outline: none; font-family: inherit; font-size: 14px; transition: all 0.2s; box-sizing: border-box; }
        .auth-input:focus { border-color: var(--nx-accent-car, #2ac1b4); box-shadow: 0 0 0 3px rgba(42, 193, 180, 0.12); }
        .auth-input-wrapper .auth-input { padding-right: 48px; }
        .auth-toggle-pwd { position: absolute; right: 12px; background: transparent; border: none; color: var(--nx-text-muted); cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 4px; transition: color 0.2s; }
        .auth-toggle-pwd:hover { color: var(--nx-text); }
        .auth-btn { width: 100%; padding: 16px; background: var(--nx-text); color: #040711; border: none; border-radius: var(--nx-radius-sm, 8px); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; font-family: inherit; transition: opacity 0.2s; margin-top: 12px; text-decoration: none; display: inline-block; text-align: center; box-sizing: border-box;}
        .auth-btn:hover { opacity: 0.85; }
        .auth-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .auth-error { color: #ef4444; font-size: 13px; font-weight: 500; margin-bottom: 24px; background: rgba(239, 68, 68, 0.08); padding: 14px; border: 1px solid rgba(239, 68, 68, 0.2); border-radius: var(--nx-radius-sm, 8px); line-height: 1.4; }
        .auth-hint { display: block; font-size: 11px; color: var(--nx-text-muted); margin-top: -10px; margin-bottom: 24px; }
        .auth-success { text-align: center; padding: 20px 0; }
        .auth-success h2 { font-family: var(--nx-font-display); font-size: 24px; color: #2ac1b4; margin-bottom: 12px; }
      `}</style>

      <div className="auth-root">
        <div className="auth-card">
          
          <div style={{ marginBottom: '24px' }}>
            <img src="/logo-noxvelia.png" alt="NOXVELIA" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
          </div>

          {sucesso ? (
            <div className="auth-success">
              <h2>Palavra-passe Atualizada!</h2>
              <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, margin: '0 0 24px' }}>
                A tua conta está novamente segura. Já podes iniciar sessão com as tuas novas credenciais.
              </p>
              <Link to="/login" className="auth-btn">Ir para o Login</Link>
            </div>
          ) : (
            <>
              <h1 className="auth-title">Nova Palavra-passe</h1>
              <p className="auth-subtitle">Cria uma nova palavra-passe forte e segura para a tua conta.</p>
              
              {erro && <div className="auth-error">{erro}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="auth-form-group">
                  <label>Nova Palavra-passe</label>
                  <div className="auth-input-wrapper">
                    <input 
                      className="auth-input" 
                      type={mostrarPassword ? 'text' : 'password'}
                      placeholder="•••••••••" 
                      value={password}
                      onChange={e => setPassword(e.target.value)} 
                      required 
                    />
                    <button type="button" className="auth-toggle-pwd" onClick={() => setMostrarPassword(!mostrarPassword)}>
                      {mostrarPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="auth-form-group">
                  <label>Confirmar Nova Palavra-passe</label>
                  <input 
                    className="auth-input" 
                    type={mostrarPassword ? 'text' : 'password'}
                    placeholder="•••••••••" 
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)} 
                    required 
                  />
                </div>

                <span className="auth-hint">
                  Mín. 9 caracteres, 1 maiúscula, 1 número e 1 especial (!@#$...).
                </span>

                <button className="auth-btn" type="submit" disabled={loading}>
                  {loading ? 'A guardar...' : 'Atualizar Palavra-passe'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}