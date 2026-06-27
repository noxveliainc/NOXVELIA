import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import Icon from '@mdi/react';
import { mdiLockOutline, mdiEyeOutline, mdiEyeOffOutline, mdiCheckCircleOutline, mdiAlertCircleOutline, mdiArrowLeft } from '@mdi/js';

export default function ResetPassword() {
  const { token } = useParams(); // Extrai o token misterioso do link
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (password.length < 6) {
      return setErro('A palavra-passe tem de ter pelo menos 6 caracteres.');
    }
    if (password !== confirmPassword) {
      return setErro('As palavras-passe não coincidem. Verifica e tenta novamente.');
    }

    setLoading(true);

    try {
      // Dispara a nova palavra-passe para a rota do backend que criaste no authController
      await api.post(`/auth/reset-password/${token}`, { password });
      setSucesso(true);
      
      // Redireciona para o login passado 3 segundos
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (err) {
      setErro(err.response?.data?.erro || 'Ocorreu um erro ou o link expirou. Tenta pedir um novo link.');
    } finally {
      setLoading(false);
    }
  };

  const theme = {
    bg: '#060b13',
    card: '#0a0f1e',
    border: 'rgba(255,255,255,0.08)',
    text: '#f8fafc',
    textDim: '#94a3b8',
    inputBg: 'rgba(15, 23, 42, 0.6)',
    primary: '#3ecf8e'
  };

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: "'Inter', sans-serif", color: theme.text }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 8px 0' }}>
            NOXVELIA

          </h1>
          <p style={{ color: theme.textDim, fontSize: '15px', margin: 0 }}>
            Cria uma nova palavra-passe segura.
          </p>
        </div>

        <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: '16px', padding: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
          {sucesso ? (
            <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease' }}>
              <Icon path={mdiCheckCircleOutline} size={2.5} color={theme.primary} style={{ marginBottom: '16px' }} />
              <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px 0' }}>Palavra-passe atualizada!</h2>
              <p style={{ color: theme.textDim, fontSize: '14px', marginBottom: '24px' }}>
                A tua conta está novamente segura. Vais ser redirecionado para o login.
              </p>
              <Link to="/login" style={{ display: 'inline-block', width: '100%', padding: '12px', background: theme.primary, color: '#04140f', textDecoration: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '14px', transition: 'all 0.2s' }}>
                Ir para o Login Agora
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {erro && (
                <div style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', color: '#ef4444', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon path={mdiAlertCircleOutline} size={0.8} /> {erro}
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: theme.textDim, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Nova Palavra-Passe
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', display: 'flex' }}>
                    <Icon path={mdiLockOutline} size={0.8} />
                  </div>
                  <input
                    type={mostrarPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    style={{ width: '100%', padding: '12px 40px', background: theme.inputBg, border: `1px solid ${theme.border}`, borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                    style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', padding: 0 }}
                  >
                    <Icon path={mostrarPassword ? mdiEyeOffOutline : mdiEyeOutline} size={0.8} />
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: theme.textDim, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Confirmar Palavra-Passe
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', display: 'flex' }}>
                    <Icon path={mdiLockOutline} size={0.8} />
                  </div>
                  <input
                    type={mostrarPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repete a nova palavra-passe"
                    style={{ width: '100%', padding: '12px 14px 12px 40px', background: theme.inputBg, border: `1px solid ${theme.border}`, borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{ marginTop: '8px', width: '100%', padding: '14px', background: theme.primary, color: '#04140f', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '14px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'all 0.2s' }}
              >
                {loading ? 'A Guardar Segurança...' : 'Guardar Nova Palavra-passe'}
              </button>
            </form>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link to="/login" style={{ color: theme.textDim, fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
            <Icon path={mdiArrowLeft} size={0.6} /> Voltar ao Login
          </Link>
        </div>

      </div>
    </div>
  );
}