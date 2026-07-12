import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
        .auth-root {
          background-color: #f8fafc;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          color: #0f172a;
          font-family: 'Inter', sans-serif;
          box-sizing: border-box;
        }

        .auth-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 48px;
          width: 100%;
          max-width: 460px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
        }

        .auth-back {
          color: #64748b;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-decoration: none;
          display: inline-block;
          margin-bottom: 32px;
          transition: color 0.2s;
        }
        .auth-back:hover { color: #0f172a; }

        .auth-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
          color: #0f172a;
        }

        .auth-subtitle {
          font-size: 15px;
          color: #475569;
          margin-bottom: 32px;
          line-height: 1.5;
        }

        .auth-form-group { margin-bottom: 20px; }
        .auth-form-group label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748b;
          margin-bottom: 8px;
        }

        .auth-input {
          width: 100%;
          padding: 14px 16px;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          color: #0f172a;
          outline: none;
          font-family: inherit;
          font-size: 15px;
          transition: all 0.2s;
          box-sizing: border-box;
        }
        .auth-input:focus {
          border-color: #0f172a;
          box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.05);
        }
        .auth-input::placeholder { color: #94a3b8; }

        .auth-btn {
          width: 100%;
          padding: 16px;
          background: #0f172a;
          color: #ffffff;
          border: none;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          transition: transform 0.2s, box-shadow 0.2s;
          margin-top: 12px;
        }
        .auth-btn:hover:not(:disabled) { 
          transform: translateY(-2px); 
          box-shadow: 0 10px 20px -10px rgba(15, 23, 42, 0.3); 
        }
        .auth-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .auth-error {
          color: #b91c1c;
          font-size: 13.5px;
          font-weight: 500;
          margin-bottom: 24px;
          background: #fef2f2;
          padding: 14px;
          border: 1px solid #fecaca;
          border-radius: 12px;
        }

        .auth-success { text-align: center; padding: 20px 0; }
        .auth-success h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 24px; color: #0f172a; margin-bottom: 12px; }
        .auth-success p { color: #64748b; font-size: 15px; line-height: 1.6; }
      `}</style>

      <div className="auth-root">
        <div className="auth-card">
          <Link to="/login" className="auth-back">← Voltar</Link>
          
          <div style={{ marginBottom: '24px' }}>
            <img src="/logo-noxvelia.png" alt="NOXVELIA" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
          </div>

          {sucesso ? (
            <div className="auth-success">
              <h2>E-mail Enviado!</h2>
              <p>
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
