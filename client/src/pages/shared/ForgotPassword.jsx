import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');
    
    try {
      await api.post('/auth/forgot-password', { email });
      setSucesso(true);
    } catch (err) {
      setErro(err.response?.data?.erro || 'Ocorreu um erro ao processar o pedido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .auth-root { background-color: #040711; background-image: radial-gradient(circle at top right, rgba(42, 193, 180, 0.05), transparent 45%), radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.05), transparent 45%); --nx-text: #f8fafc; --nx-text-sub: #94a3b8; --nx-text-muted: #64748b; --nx-card-bg: rgba(15, 23, 42, 0.6); --nx-card-border: rgba(255, 255, 255, 0.08); --nx-input-bg: rgba(15, 23, 42, 0.5); --nx-input-border: rgba(255, 255, 255, 0.1); height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; color: var(--nx-text); font-family: var(--nx-font-body, 'Inter', sans-serif); overflow: hidden; box-sizing: border-box; }
        .auth-card { background: var(--nx-card-bg); border: 1px solid var(--nx-card-border); border-radius: var(--nx-radius-lg, 20px); padding: 48px; width: 100%; max-width: 460px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }
        .auth-back { color: var(--nx-text-sub); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; text-decoration: none; display: inline-block; margin-bottom: 32px; transition: color 0.2s; }
        .auth-back:hover { color: var(--nx-text); }
        .auth-title { font-family: var(--nx-font-display, 'Plus Jakarta Sans', sans-serif); font-size: 32px; font-weight: 800; margin-bottom: 8px; letter-spacing: -0.02em; }
        .auth-subtitle { font-size: 14px; color: var(--nx-text-sub); margin-bottom: 32px; line-height: 1.5; }
        .auth-form-group { margin-bottom: 20px; }
        .auth-form-group label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--nx-text-muted); margin-bottom: 8px; }
        .auth-input { width: 100%; padding: 14px 16px; background: var(--nx-input-bg); border: 1px solid var(--nx-input-border); border-radius: var(--nx-radius-sm, 8px); color: var(--nx-text); outline: none; font-family: inherit; font-size: 14px; transition: all 0.2s; box-sizing: border-box; }
        .auth-input:focus { border-color: var(--nx-accent-car, #2ac1b4); box-shadow: 0 0 0 3px rgba(42, 193, 180, 0.12); }
        .auth-btn { width: 100%; padding: 16px; background: var(--nx-text); color: #040711; border: none; border-radius: var(--nx-radius-sm, 8px); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; font-family: inherit; transition: opacity 0.2s; margin-top: 12px; }
        .auth-btn:hover { opacity: 0.85; }
        .auth-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .auth-error { color: #ef4444; font-size: 13px; font-weight: 500; margin-bottom: 24px; background: rgba(239, 68, 68, 0.08); padding: 14px; border: 1px solid rgba(239, 68, 68, 0.2); border-radius: var(--nx-radius-sm, 8px); }
        .auth-success { text-align: center; padding: 20px 0; }
        .auth-success h2 { font-family: var(--nx-font-display); font-size: 24px; color: #2ac1b4; margin-bottom: 12px; }
      `}</style>

      <div className="auth-root">
        <div className="auth-card">
          <Link to="/login" className="auth-back">← Voltar</Link>
          
          <div style={{ marginBottom: '24px' }}>
            <img src="/logo-noxvelia.png" alt="NOXVELIA" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
          </div>

          {sucesso ? (
            <div className="auth-success">
              <h2>E-mail Enviado!</h2>
              <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6 }}>
                Se o e-mail existir no nosso sistema, vais receber um link de recuperação válido por 1 hora. Verifica também a tua pasta de Spam.
              </p>
            </div>
          ) : (
            <>
              <h1 className="auth-title">Recuperação</h1>
              <p className="auth-subtitle">Insere o teu e-mail para receberes as instruções de redefinição de palavra-passe.</p>
              
              {erro && <div className="auth-error">{erro}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="auth-form-group">
                  <label>Email Associado</label>
                  <input 
                    className="auth-input" 
                    type="email" 
                    placeholder="joao.silva@email.com" 
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                    required 
                  />
                </div>
                <button className="auth-btn" type="submit" disabled={loading}>
                  {loading ? 'A processar...' : 'Enviar Link'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}