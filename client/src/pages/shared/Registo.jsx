import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import GoogleAuthButton, { googleAuthAvailable } from '../../components/GoogleAuthButton';
import { loginBackPath, loginDestinationPath } from '../../utils/navigationState';

const DISTRITOS_PT = [
  'Aveiro', 'Beja', 'Braga', 'Bragança', 'Castelo Branco', 'Coimbra',
  'Évora', 'Faro', 'Guarda', 'Leiria', 'Lisboa', 'Portalegre', 'Porto',
  'Santarém', 'Setúbal', 'Viana do Castelo', 'Vila Real', 'Viseu',
  'Açores', 'Madeira'
];

export default function Registo() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginGoogle } = useAuth();
  const googleProfileInicial = location.state?.googleProfile || null;
  const [googleCredential, setGoogleCredential] = useState(location.state?.googleCredential || '');
  const [formData, setFormData] = useState({
    nome: googleProfileInicial?.nome || '',
    email: googleProfileInicial?.email || '',
    password: '',
    confirmarPassword: '',
    telefone: '',
    mostrarTelefonePublico: true,
    localidade: '',
    aceitouTermos: false,
    tipoConta: 'particular'
  });
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmarPassword, setMostrarConfirmarPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [contactoConfirmado, setContactoConfirmado] = useState(false);
  const destinoVoltar = loginBackPath(location.state, '/');
  const registoGoogle = Boolean(googleCredential);
  const destinoDepoisAuth = () => loginDestinationPath(location.state, destinoVoltar);
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

  const handlePreSubmit = (e) => {
    e.preventDefault();
    setErro('');

    if (!registoGoogle) {
      if (formData.password !== formData.confirmarPassword) {
        setErro('As palavras-passe não coincidem. Verifica e tenta novamente.');
        return;
      }

      if (!validarPassword(formData.password)) {
        setErro('A palavra-passe tem de ter pelo menos 9 caracteres, 1 maiúscula, 1 número e 1 carácter especial.');
        return;
      }
    }

    const telefoneRegex = /^9[1236]\d{7}$/;
    if (!telefoneRegex.test(formData.telefone)) {
      setErro('O número tem de ser um telemóvel português válido.');
      return;
    }

    if (!formData.localidade) {
      setErro('Por favor, seleciona um distrito válido.');
      return;
    }

    if (!formData.aceitouTermos) {
      setErro('Tens de aceitar os Termos e Condições para criar a conta.');
      return;
    }

    setContactoConfirmado(false);
    setMostrarConfirmacao(true);
  };

  const handleFinalSubmit = async () => {
    if (!contactoConfirmado) return;

    setMostrarConfirmacao(false);
    setLoading(true);
    setErro('');

    try {
      if (registoGoogle) {
        const resposta = await loginGoogle({
          credential: googleCredential,
          nome: formData.nome,
          telefone: formData.telefone,
          mostrarTelefonePublico: formData.mostrarTelefonePublico,
          localidade: formData.localidade,
          tipoConta: formData.tipoConta,
          aceitouTermos: formData.aceitouTermos,
        });

        if (resposta?.requiresCompletion) {
          setErro('Completa os dados obrigatórios para criar a conta com Google.');
          return;
        }

        navigate(destinoDepoisAuth(), { replace: true });
        return;
      }

      const dadosParaSubmeter = {
        nome: formData.nome,
        email: formData.email,
        password: formData.password,
        telefone: formData.telefone,
        mostrarTelefonePublico: formData.mostrarTelefonePublico,
        localidade: formData.localidade,
        tipo: 'cliente',
        tipoConta: 'particular',
        aceitouTermos: formData.aceitouTermos,
      };

      await api.post('/auth/register', dadosParaSubmeter);
      navigate('/login', {
        state: {
          mensagemRegisto: 'Conta criada com sucesso! Verifica o teu email para ativares o acesso.',
          from: location.state?.from,
          returnTo: location.state?.returnTo,
        }
      });
    } catch (err) {
      const erroBackend = err.response?.data?.erro || err.response?.data?.message || err.response?.data?.detalhes;
      if (Array.isArray(erroBackend)) setErro(erroBackend.join(' | '));
      else if (typeof erroBackend === 'object' && erroBackend !== null) setErro(Object.values(erroBackend).join(' | '));
      else if (typeof erroBackend === 'string') setErro(erroBackend);
      else if (err.response?.data?.code === 11000 || err.response?.data?.error?.code === 11000) {
        const erroRaw = JSON.stringify(err.response?.data);
        if (erroRaw.includes('email')) setErro('Este email já se encontra registado.');
        else if (erroRaw.includes('telefone')) setErro('Este número de telemóvel já se encontra em uso.');
        else setErro('Já existe uma conta com estes dados.');
      } else {
        setErro('Erro ao efetuar o registo. Verifica os teus dados e a ligação à internet.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleCredential = async (credential) => {
    setErro('');
    setLoading(true);

    try {
      const resposta = await loginGoogle({ credential });
      if (resposta?.requiresCompletion) {
        setGoogleCredential(credential);
        setFormData((atual) => ({
          ...atual,
          nome: resposta.profile?.nome || atual.nome,
          email: resposta.profile?.email || atual.email,
          password: '',
          confirmarPassword: '',
        }));
        setContactoConfirmado(false);
        setMostrarConfirmacao(false);
        window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
        return;
      }

      navigate(destinoDepoisAuth(), { replace: true });
    } catch (err) {
      console.error(err);
      setErro(err.response?.data?.erro || 'Não foi possível continuar com Google. Tenta novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .auth-root {
          position: relative;
          overflow: hidden;
          background-color: #082126;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          color: #0f172a;
          font-family: 'Inter', sans-serif;
          box-sizing: border-box;
        }

        .auth-root::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url('/social/noxvelia-estate-photo-premium.webp');
          background-size: cover;
          background-position: center;
          opacity: 0.2;
          filter: saturate(0.95) contrast(1.08);
        }

        .auth-root::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(8, 33, 38, 0.78);
        }

        .auth-card {
          position: relative;
          z-index: 1;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 42px 48px;
          width: 100%;
          max-width: 480px;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.24);
          max-height: 94vh;
          overflow-y: auto;
        }

        .auth-card::-webkit-scrollbar { display: none; }
        .auth-card { -ms-overflow-style: none; scrollbar-width: none; }

        .auth-back {
          color: #64748b;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-decoration: none;
          display: inline-block;
          margin-bottom: 24px;
          transition: color 0.2s;
        }
        .auth-back:hover { color: #0f172a; }

        .auth-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .auth-subtitle {
          font-size: 15px;
          color: #475569;
          margin-bottom: 32px;
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

        .auth-input-wrapper { position: relative; display: flex; align-items: center; }

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
        .auth-input[readonly] { background: #f8fafc; color: #334155; cursor: default; }
        select.auth-input { cursor: pointer; }
        select.auth-input:invalid { color: #94a3b8; }

        .auth-input-wrapper .auth-input { padding-right: 48px; }

        .auth-toggle-pwd {
          position: absolute; right: 12px; background: transparent; border: none;
          color: #94a3b8; cursor: pointer; display: flex; align-items: center;
          justify-content: center; padding: 4px; transition: color 0.2s;
        }
        .auth-toggle-pwd:hover { color: #0f172a; }

        .auth-btn {
          width: 100%; padding: 16px; background: #0f172a; color: #ffffff;
          border: none; border-radius: 12px; font-weight: 700;
          font-size: 14px; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
          margin-top: 12px;
        }
        .auth-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 20px -10px rgba(15, 23, 42, 0.3); }
        .auth-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .auth-link {
          color: #475569; font-size: 14px; font-weight: 600; text-decoration: none;
          display: block; margin-top: 24px; text-align: center; transition: color 0.2s;
        }
        .auth-link:hover { color: #0f172a; }

        .auth-error {
          color: #b91c1c; font-size: 13.5px; font-weight: 500; margin-bottom: 24px;
          background: #fef2f2; padding: 14px; border: 1px solid #fecaca; border-radius: 12px;
        }

        .auth-hint { display: block; font-size: 12px; color: #64748b; margin-top: 6px; }
        .password-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 500px) { .password-grid { grid-template-columns: 1fr; gap: 0; } }

        .auth-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0;
          color: #64748b;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .auth-divider::before,
        .auth-divider::after {
          content: '';
          height: 1px;
          flex: 1;
          background: #e2e8f0;
        }
        .auth-google-wrap {
          display: flex;
          justify-content: center;
          min-height: 44px;
        }
        .auth-google-wrap.disabled {
          pointer-events: none;
          opacity: 0.65;
        }
        .auth-phone-visibility {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px;
          border: 1px solid #dbe5e2;
          border-radius: 12px;
          background: #f8fafc;
          margin: -4px 0 20px;
          cursor: pointer;
        }
        .auth-phone-visibility input {
          width: 18px;
          height: 18px;
          margin-top: 3px;
          accent-color: #d9c49c;
          cursor: pointer;
          flex: 0 0 auto;
        }
        .auth-phone-visibility strong {
          display: block;
          font-size: 13px;
          line-height: 1.35;
          color: #0f172a;
          margin-bottom: 4px;
        }
        .auth-phone-visibility small {
          display: block;
          font-size: 12px;
          line-height: 1.45;
          color: #64748b;
          font-weight: 600;
        }

        .auth-terms-accept {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px;
          border: 1px solid #dbe5e2;
          border-radius: 12px;
          background: #f8fafc;
          margin: 0 0 20px;
        }
        .auth-terms-accept input {
          width: 18px;
          height: 18px;
          margin-top: 2px;
          accent-color: #d9c49c;
          cursor: pointer;
          flex: 0 0 auto;
        }
        .auth-terms-accept span {
          display: block;
          font-size: 13px;
          line-height: 1.5;
          color: #475569;
          font-weight: 600;
        }
        .auth-terms-accept a {
          color: #0f172a;
          font-weight: 800;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .auth-terms-accept a:hover { color: #2a7f78; }

        /* Modal Styles */
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(4px); z-index: 9999; display: flex;
          align-items: center; justify-content: center; padding: 24px;
        }
        .modal-box {
          background: #ffffff; border: 1px solid #e2e8f0; border-radius: 24px;
          padding: 40px; max-width: 480px; width: 100%; text-align: center;
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
        }
        .modal-icon {
          width: 64px; height: 64px; background: #f1f5f9; color: #0f172a;
          border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;
        }
        .modal-data-box {
          background: #f8fafc; border-radius: 12px; padding: 16px;
          margin-bottom: 20px; text-align: left; border: 1px solid #e2e8f0;
        }

        .auth-confirm-check {
          display: flex; align-items: flex-start; gap: 10px; text-align: left;
          background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px;
          padding: 16px; margin-bottom: 24px; cursor: pointer; transition: background 0.2s;
        }
        .auth-confirm-check:hover { background: #f1f5f9; }
        .auth-confirm-check input { margin-top: 2px; width: 18px; height: 18px; accent-color: #0f172a; cursor: pointer; flex-shrink: 0; }
        .auth-confirm-check span { font-size: 14px; color: #475569; line-height: 1.5; font-weight: 500; }
      `}</style>

      {mostrarConfirmacao && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <h2 style={{ fontFamily: 'var(--nx-font-display)', fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0 0 12px' }}>Verifica os teus contactos</h2>
            <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '24px', lineHeight: 1.6 }}>
              {registoGoogle ? 'A tua conta Google já confirma o email. Confirma agora os dados que vão identificar a tua conta na Noxvelia.' : 'Vamos enviar um email de confirmação. Vais precisar de clicar no link para ativar a tua conta antes de iniciares sessão. Confirma que os dados estão corretos.'}
            </p>

            <div className="modal-data-box">
              <div style={{ marginBottom: '8px', color: '#0f172a', fontSize: '15px' }}><strong style={{color: '#64748b', fontWeight: 600}}>Email:</strong> {formData.email}</div>
              <div style={{ marginBottom: '8px', color: '#0f172a', fontSize: '15px' }}><strong style={{color: '#64748b', fontWeight: 600}}>Telemóvel:</strong> {formData.telefone}</div>
              <div style={{ color: '#0f172a', fontSize: '15px' }}>
                <strong style={{color: '#64748b', fontWeight: 600}}>Telemóvel público:</strong> {formData.mostrarTelefonePublico ? 'Sim, mostrar nos anúncios e no perfil' : 'Não, mostrar apenas email'}
              </div>
            </div>

            <label className="auth-confirm-check">
              <input
                type="checkbox"
                checked={contactoConfirmado}
                onChange={e => setContactoConfirmado(e.target.checked)}
              />
              <span>Confirmo que o email e o telefone estão corretos e que tenho acesso aos mesmos.</span>
            </label>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => { setMostrarConfirmacao(false); setContactoConfirmado(false); }}
                style={{ flex: 1, padding: '16px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
              >
                Corrigir Dados
              </button>
              <button
                onClick={handleFinalSubmit}
                disabled={!contactoConfirmado}
                style={{
                  flex: 1, padding: '16px', background: '#0f172a', color: '#ffffff', border: 'none', borderRadius: '12px', fontWeight: 700,
                  cursor: contactoConfirmado ? 'pointer' : 'not-allowed', opacity: contactoConfirmado ? 1 : 0.5, transition: 'all 0.2s'
                }}
              >
                {registoGoogle ? 'Concluir registo' : 'Tudo Correto!'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="auth-root">
        <div className="auth-card">
          <Link to={destinoVoltar} className="auth-back">← Voltar</Link>

          <div style={{ marginBottom: '24px' }}>
            <img src="/logo-noxvelia.png" alt="NOXVELIA" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
          </div>

          <h1 className="auth-title">{registoGoogle ? 'Completar registo' : 'Criar Conta'}</h1>
          <p className="auth-subtitle">{registoGoogle ? 'Confirma os dados obrigatórios da Noxvelia para entrares com Google.' : 'Regista-te para aceder e publicar anúncios.'}</p>

          {erro && <div className="auth-error">{erro}</div>}

                    {!registoGoogle && googleAuthAvailable && (
            <>
              <GoogleAuthButton
                text="signup_with"
                disabled={loading}
                onCredential={handleGoogleCredential}
                onError={setErro}
              />
              <div className="auth-divider"><span>ou cria com email</span></div>
            </>
          )}

          <form onSubmit={handlePreSubmit}>
            <div className="auth-form-group">
              <label>Nome Completo</label>
              <input className="auth-input" placeholder="Ex: João Silva" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} required />
            </div>

            <div className="auth-form-group">
              <label>Email</label>
              <input className="auth-input" type="email" placeholder="joao.silva@email.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} readOnly={registoGoogle} required />
            </div>

            {!registoGoogle && (
              <>
                <div className="password-grid">
                              <div className="auth-form-group">
                                <label>Palavra-passe</label>
                                <div className="auth-input-wrapper">
                                  <input className="auth-input" type={mostrarPassword ? "text" : "password"} placeholder="•••••••••" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
                                  <button type="button" className="auth-toggle-pwd" onClick={() => setMostrarPassword(!mostrarPassword)}>
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
                                  <input className="auth-input" type={mostrarConfirmarPassword ? "text" : "password"} placeholder="•••••••••" value={formData.confirmarPassword} onChange={e => setFormData({...formData, confirmarPassword: e.target.value})} required />
                                  <button type="button" className="auth-toggle-pwd" onClick={() => setMostrarConfirmarPassword(!mostrarConfirmarPassword)}>
                                    {mostrarConfirmarPassword ? (
                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                                    ) : (
                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>

                            <span className="auth-hint" style={{ marginTop: '-12px', marginBottom: '20px' }}>
                              Mínimo: 9 caracteres, 1 maiúscula, 1 número e 1 carácter especial (!@#$...).
                            </span>
              </>
            )}

            <div className="auth-form-group">
              <label>Telemóvel</label>
              <input className="auth-input" type="tel" placeholder="Ex: 912345678" value={formData.telefone} onChange={handleTelefoneChange} required />
            </div>

            <label className="auth-phone-visibility">
              <input
                type="checkbox"
                checked={formData.mostrarTelefonePublico}
                onChange={e => setFormData({ ...formData, mostrarTelefonePublico: e.target.checked })}
              />
              <span>
                <strong>Pretendes mostrar este número de telemóvel nos teus anúncios e no teu perfil?</strong>
                <small>Se disseres que não, apresentamos apenas o email como contacto público.</small>
              </span>
            </label>

            <div className="auth-form-group">
              <label>Distrito</label>
              <select className="auth-input" value={formData.localidade} onChange={e => setFormData({...formData, localidade: e.target.value})} required>
                <option value="" disabled>Seleciona o teu distrito</option>
                {DISTRITOS_PT.map(distrito => (
                  <option key={distrito} value={distrito}>{distrito}</option>
                ))}
              </select>
            </div>

            <div className="auth-terms-accept">
              <input
                id="aceitar-termos"
                type="checkbox"
                aria-label="Aceito os Termos e Condições"
                checked={formData.aceitouTermos}
                onChange={e => setFormData({ ...formData, aceitouTermos: e.target.checked })}
                required
              />
              <span>
                Declaro que li e aceito os{' '}
                <Link to="/privacidade" target="_blank" rel="noopener noreferrer">
                  Termos e Condições
                </Link>
                .
              </span>
            </div>

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? 'A processar...' : (registoGoogle ? 'Concluir registo' : 'Criar Conta')}
            </button>
          </form>

          <Link to="/login" state={{ from: location.state?.from, returnTo: location.state?.returnTo }} className="auth-link">Já tens conta? <span style={{fontWeight: 700, color: '#0f172a'}}>Inicia sessão aqui.</span></Link>
        </div>
      </div>
    </>
  );
}
