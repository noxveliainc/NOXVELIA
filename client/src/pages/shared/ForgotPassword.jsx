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
        .auth-root { background: #030303; font-family: 'DM Mono', monospace; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; color: #f0ece4; }
        .auth-card { background: #0a0a0a; border: 1px solid rgba(255,255,255,0.1); padding: 60px; width: 100%; max-width: 420px; }
        .auth-back { color: #888; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; text-decoration: none; display: inline-block; margin-bottom: 32px; }
        .auth-title { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 300; margin-bottom: 16px; line-height: 1.2; }
        .auth-desc { color: #666; font-size: 12px; line-height: 1.6; margin-bottom: 28px; }
        .auth-input { width: 100%; padding: 16px; background: #111; border: 1px solid #333; color: white; margin-bottom: 16px; outline: none; font-family: 'DM Mono', monospace; }
        .auth-btn { width: 100%; padding: 16px; background: #f0ece4; color: #030303; border: none; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; cursor: pointer; font-family: 'DM Mono', monospace; }
        .auth-success { color: #3ecf8e; font-size: 13px; line-height: 1.6; text-align: center; font-family: 'DM Mono', monospace; }
      `}</style>

      <div className="auth-root">
        <div className="auth-card">
          <Link to="/login" className="auth-back">← Voltar</Link>
          
          {sucesso ? (
            <div className="auth-success">
              <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '24px', color: '#f0ece4', marginBottom: '12px', fontWeight: 300 }}>E-mail enviado</h2>
              <p>Se o endereço introduzido constar no nosso sistema, receberá um link de recuperação dentro de instantes.</p>
            </div>
          ) : (
            <>
              <h1 className="auth-title">Recuperar<br />Palavra-passe</h1>
              <p className="auth-desc">Introduza o e-mail associado à sua conta. Enviaremos um link de redefinição seguro e válido por 1 hora.</p>
              
              {erro && <p style={{ color: '#e05252', fontSize: '12px', marginBottom: '16px' }}>{erro}</p>}
              
              <form onSubmit={handleSubmit}>
                <input 
                  className="auth-input" 
                  type="email" 
                  placeholder="Introduza o seu e-mail" 
                  value={email}
                  onChange={e => setEmail(e.target.value)} 
                  required 
                />
                <button className="auth-btn" type="submit" disabled={loading}>
                  {loading ? 'A disparar...' : 'Enviar Link'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}