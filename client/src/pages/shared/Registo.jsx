import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

const DISTRITOS_PT = [
  'Aveiro', 'Beja', 'Braga', 'Bragança', 'Castelo Branco', 'Coimbra',
  'Évora', 'Faro', 'Guarda', 'Leiria', 'Lisboa', 'Portalegre', 'Porto',
  'Santarém', 'Setúbal', 'Viana do Castelo', 'Vila Real', 'Viseu',
  'Açores', 'Madeira'
];

export default function Registo() {
  const [formData, setFormData] = useState({ 
    nome: '', 
    email: '', 
    password: '',
    confirmarPassword: '', 
    telefone: '',
    localidade: '',
    tipoConta: 'particular' 
  });
  const [mostrarPassword, setMostrarPassword] = useState(false); 
  const [mostrarConfirmarPassword, setMostrarConfirmarPassword] = useState(false); 

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  
  // 🌟 NOVO: Estado para controlar o modal de dupla verificação
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  
  const navigate = useNavigate();

  const handleTelefoneChange = (e) => {
    const apenasNumeros = e.target.value.replace(/\D/g, ''); 
    if (apenasNumeros.length <= 9) {
      setFormData({ ...formData, telefone: apenasNumeros });
    }
  };

  const validarPassword = (password) => {
    const temTamanho = password.length >= 9;
    const temMaiuscula = /[A-Z]/.test(password);
    const temNumero = /\d/.test(password);
    const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return temTamanho && temMaiuscula && temNumero && temEspecial;
  };

  // 🌟 NOVO: Interceta o clique em Registar para validar e abrir o modal
  const handlePreSubmit = (e) => {
    e.preventDefault();
    setErro('');

    if (formData.password !== formData.confirmarPassword) {
      setErro('As palavras-passe não coincidem. Verifica e tenta novamente.');
      return;
    }

    const telefoneRegex = /^9[1236]\d{7}$/;
    if (!telefoneRegex.test(formData.telefone)) {
      setErro('O número tem de ser um telemóvel português válido (começar por 91, 92, 93 ou 96 e ter 9 dígitos).');
      return;
    }

    if (!validarPassword(formData.password)) {
      setErro('A palavra-passe tem de ter pelo menos 9 caracteres, 1 maiúscula, 1 número e 1 carácter especial.');
      return;
    }

    if (!formData.localidade) {
      setErro('Por favor, seleciona um distrito válido.');
      return;
    }

    // Se tudo estiver bem, abre o modal de confirmação
    setMostrarConfirmacao(true);
  };

  // 🌟 NOVO: Função que efetivamente faz o POST para a API
  const handleFinalSubmit = async () => {
    setMostrarConfirmacao(false);
    setLoading(true);
    setErro('');

    try {
      const { confirmarPassword, ...dadosReais } = formData;
      const dadosParaSubmeter = { ...dadosReais, tipo: 'cliente', tipoConta: 'particular' };
      
      await api.post('/auth/register', dadosParaSubmeter);
      navigate('/login');
    } catch (err) {
      const erroBackend = err.response?.data?.erro || err.response?.data?.message || err.response?.data?.detalhes;
      
      if (Array.isArray(erroBackend)) {
        setErro(erroBackend.join(' | '));
      } else if (typeof erroBackend === 'object' && erroBackend !== null) {
        setErro(Object.values(erroBackend).join(' | '));
      } else if (typeof erroBackend === 'string') {
        setErro(erroBackend);
      } else if (err.response?.data?.code === 11000 || err.response?.data?.error?.code === 11000) {
        const erroRaw = JSON.stringify(err.response?.data);
        if (erroRaw.includes('email')) {
          setErro('Este email já se encontra registado.');
        } else if (erroRaw.includes('telefone')) {
          setErro('Este número de telemóvel já se encontra em uso.');
        } else {
          setErro('Estes dados já existem na nossa base de dados.');
        }
      } else {
        setErro('Erro ao efetuar o registo. Verifica os teus dados e a ligação à internet.');
      }
    } finally {
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
          padding: 42px 48px; 
          width: 100%; 
          max-width: 460px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          
          max-height: 94vh;
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
          margin-bottom: 24px; 
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
          margin-bottom: 24px;
        }
        
        .auth-form-group { margin-bottom: 18px; }
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
        select.auth-input option { background: #0f172a; color: #f8fafc; }
        select.auth-input:invalid { color: var(--nx-text-muted); }

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
        .auth-toggle-pwd:hover {
          color: var(--nx-text);
        }
        
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
        
        .auth-link { 
          color: var(--nx-text-sub); 
          font-size: 13px; 
          font-weight: 600;
          text-decoration: none; 
          display: block; 
          margin-top: 24px; 
          text-align: center; 
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

        .auth-hint {
          display: block;
          font-size: 11px;
          color: var(--nx-text-muted);
          margin-top: 6px;
        }

        .password-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 500px) {
          .password-grid { grid-template-columns: 1fr; gap: 0; }
        }
      `}</style>

      {/* 🌟 MODAL DE CONFIRMAÇÃO DE DADOS */}
      {mostrarConfirmacao && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(4, 7, 17, 0.9)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '40px', maxWidth: '480px', width: '100%', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
            <div style={{ width: '64px', height: '64px', background: 'rgba(42, 193, 180, 0.1)', color: '#2ac1b4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <h2 style={{ fontFamily: 'var(--nx-font-display)', fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>Verifica os teus contactos</h2>
            <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '24px', lineHeight: 1.5 }}>
              Para garantirmos a segurança da plataforma, não enviamos emails de verificação. É crucial que os teus dados estejam corretos para que os compradores te consigam contactar.
            </p>
            
            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '16px', marginBottom: '32px', textAlign: 'left', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ marginBottom: '8px', color: '#f8fafc', fontSize: '15px' }}><strong style={{color: '#64748b'}}>Email:</strong> {formData.email}</div>
              <div style={{ color: '#f8fafc', fontSize: '15px' }}><strong style={{color: '#64748b'}}>Telefone:</strong> {formData.telefone}</div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setMostrarConfirmacao(false)} style={{ flex: 1, padding: '14px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>
                Corrigir Dados
              </button>
              <button onClick={handleFinalSubmit} style={{ flex: 1, padding: '14px', background: '#2ac1b4', color: '#040711', border: 'none', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s' }}>
                Tudo Correto!
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="auth-root">
        <div className="auth-card">
          <Link to="/" className="auth-back">← Voltar</Link>

          <div style={{ marginBottom: '20px' }}>
            <img src="/logo-noxvelia.png" alt="NOXVELIA" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
          </div>

          <h1 className="auth-title">Registo</h1>
          <p className="auth-subtitle">Cria a tua conta e gere os teus anúncios.</p>
          
          {erro && <div className="auth-error">{erro}</div>}

          {/* 🌟 MUDANÇA: O form agora dispara o handlePreSubmit */}
          <form onSubmit={handlePreSubmit}>
            
            <div className="auth-form-group">
              <label>Nome Completo</label>
              <input 
                className="auth-input" 
                placeholder="Ex: João Silva" 
                value={formData.nome} 
                onChange={e => setFormData({...formData, nome: e.target.value})} 
                required 
              />
            </div>
            
            <div className="auth-form-group">
              <label>Email</label>
              <input className="auth-input" type="email" placeholder="joao.silva@email.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
            </div>
            
            <div className="password-grid">
              <div className="auth-form-group">
                <label>Palavra-passe</label>
                <div className="auth-input-wrapper">
                  <input 
                    className="auth-input" 
                    type={mostrarPassword ? "text" : "password"} 
                    placeholder="•••••••••" 
                    value={formData.password} 
                    onChange={e => setFormData({...formData, password: e.target.value})} 
                    required 
                  />
                  <button 
                    type="button" 
                    className="auth-toggle-pwd" 
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                  >
                    {mostrarPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="auth-form-group">
                <label>Confirmar Password</label>
                <div className="auth-input-wrapper">
                  <input 
                    className="auth-input" 
                    type={mostrarConfirmarPassword ? "text" : "password"} 
                    placeholder="•••••••••" 
                    value={formData.confirmarPassword} 
                    onChange={e => setFormData({...formData, confirmarPassword: e.target.value})} 
                    required 
                  />
                  <button 
                    type="button" 
                    className="auth-toggle-pwd" 
                    onClick={() => setMostrarConfirmarPassword(!mostrarConfirmarPassword)}
                  >
                    {mostrarConfirmarPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            <span className="auth-hint" style={{ marginTop: '-12px', marginBottom: '18px' }}>
              Mín. 9 caracteres, 1 maiúscula, 1 número e 1 especial (!@#$...).
            </span>

            <div className="auth-form-group">
              <label>Telemóvel</label>
              <input 
                className="auth-input" 
                type="tel"
                placeholder="Ex: 912345678" 
                value={formData.telefone} 
                onChange={handleTelefoneChange} 
                required 
              />
            </div>
            
            <div className="auth-form-group">
              <label>Distrito</label>
              <select 
                className="auth-input" 
                value={formData.localidade} 
                onChange={e => setFormData({...formData, localidade: e.target.value})} 
                required
              >
                <option value="" disabled>Seleciona o teu distrito</option>
                {DISTRITOS_PT.map(distrito => (
                  <option key={distrito} value={distrito}>{distrito}</option>
                ))}
              </select>
            </div>

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? 'A processar...' : 'Criar Conta'}
            </button>
          </form>
          
          <Link to="/login" className="auth-link">Já tens conta? Inicia sessão aqui.</Link>
        </div>
      </div>
    </>
  );
}