import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  // 🌟 ESTADO PARA CONTROLAR OS TICKETS DE SUPORTE
  const [modalSuporteAberto, setModalSuporteAberto] = useState(false);
  const [suporteSucesso, setSuporteSucesso] = useState(false); // Fica a true se o form for submetido

  return (
    <>
      <style>{`
        .nx-footer { background: #0f172a; border-top: 1px solid rgba(255, 255, 255, 0.05); padding: 48px 32px 32px; margin-top: auto; font-family: var(--nx-font-body, 'Inter', sans-serif); }
        .nx-footer-inner { max-width: 1280px; margin: 0 auto; display: flex; flex-direction: column; gap: 40px; }
        .nx-footer-top { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 32px; }
        .nx-footer-brand p { color: #94a3b8; font-size: 13px; line-height: 1.6; max-width: 320px; margin-top: 16px; }
        .nx-footer-links { display: flex; gap: 64px; }
        .nx-footer-col h4 { color: #f8fafc; font-family: var(--nx-font-display, 'Plus Jakarta Sans', sans-serif); font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 20px; }
        .nx-footer-col a, .nx-footer-col button { display: block; color: #94a3b8; text-decoration: none; font-size: 14px; margin-bottom: 12px; transition: color 0.2s; background: none; border: none; padding: 0; cursor: pointer; text-align: left; font-family: inherit; }
        .nx-footer-col a:hover, .nx-footer-col button:hover { color: #2ac1b4; }
        .nx-footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 32px; border-top: 1px solid rgba(255, 255, 255, 0.05); flex-wrap: wrap; gap: 20px; }
        .nx-footer-copy { color: #64748b; font-size: 13px; }
        
        .nx-social-links { display: flex; gap: 16px; }
        .nx-social-btn { width: 40px; height: 40px; border-radius: 50%; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); display: flex; align-items: center; justify-content: center; color: #94a3b8; transition: all 0.2s; text-decoration: none; }
        .nx-social-btn:hover { background: rgba(42, 193, 180, 0.1); border-color: rgba(42, 193, 180, 0.3); color: #2ac1b4; transform: translateY(-2px); }
        .nx-social-btn svg { width: 18px; height: 18px; fill: currentColor; }

        /* 🌟 CSS DO MODAL DE SUPORTE */
        .suporte-modal-overlay { position: fixed; inset: 0; background: rgba(4, 7, 17, 0.85); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center; z-index: 10000; animation: fadeIn 0.2s ease-out; padding: 20px; }
        .suporte-modal-card { background: #0f172a; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; width: 100%; max-width: 460px; padding: 36px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); box-sizing: border-box; animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1); color: #f8fafc; }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        
        @media (max-width: 768px) { .nx-footer-top { flex-direction: column; } .nx-footer-links { flex-direction: column; gap: 32px; } .nx-footer-bottom { flex-direction: column-reverse; justify-content: center; text-align: center; } }
      `}</style>

      {/* 🌟 O MODAL DE TICKETS VOLTOU (Agora é Global!) */}
      {modalSuporteAberto && (
        <div className="suporte-modal-overlay" onClick={() => setModalSuporteAberto(false)}>
          <div className="suporte-modal-card" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily: 'var(--nx-font-display, sans-serif)', fontSize: '24px', fontWeight: 800, margin: '0 0 8px 0' }}>Central de Ajuda</h2>
            <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 28px 0', lineHeight: 1.5 }}>Submete as tuas questões técnicas.</p>

            {suporteSucesso ? (
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textAlign: 'center' }}>
                ✓ Ticket enviado com sucesso para a fila!
              </div>
            ) : (
              <form 
                action="https://formspree.io/f/xzdqlwvj" 
                method="POST" 
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', marginBottom: '8px' }}>O Teu Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="exemplo@dominio.com"
                    style={{ width: '100%', padding: '14px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', background: 'rgba(0,0,0,0.2)', color: '#fff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', marginBottom: '8px' }}>Descrição do Problema</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Descreve detalhadamente o erro ou dúvida..."
                    style={{ width: '100%', padding: '14px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '14px', outline: 'none', resize: 'none', boxSizing: 'border-box', background: 'rgba(0,0,0,0.2)', color: '#fff', lineHeight: 1.5 }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '4px' }}>
                  <button
                    type="button"
                    onClick={() => setModalSuporteAberto(false)}
                    style={{ padding: '12px 20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '14px', fontWeight: 600, color: '#94a3b8', cursor: 'pointer' }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    style={{ padding: '12px 24px', background: '#f8fafc', color: '#0f172a', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Enviar Ticket
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <footer className="nx-footer">
        <div className="nx-footer-inner">
          <div className="nx-footer-top">
            
            <div className="nx-footer-brand">
              <img src="/logo-noxvelia.png" alt="NOXVELIA" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
              <p>A plataforma premium que liga vendedores de excelência aos melhores compradores de automóveis e imóveis em Portugal.</p>
            </div>

            <div className="nx-footer-links">
              <div className="nx-footer-col">
                <h4>Plataforma</h4>
                <Link to="/carros">NOXVELIA Drive</Link>
                <Link to="/imoveis">NOXVELIA Estate</Link>
              </div>
              <div className="nx-footer-col">
                <h4>Empresa</h4>
                {/* 🌟 O BOTÃO DE SUPORTE CHAMA AGORA O MODAL AQUI */}
                <button onClick={() => setModalSuporteAberto(true)}>Suporte Técnico</button>
                <a href="#">Termos e Condições</a>
                <a href="#">Política de Privacidade</a>
              </div>
            </div>

          </div>

          <div className="nx-footer-bottom">
            <div className="nx-footer-copy">
              &copy; {new Date().getFullYear()} NOXVELIA INC. Todos os direitos reservados.
            </div>
            
            <div className="nx-social-links">
              {/* FACEBOOK - Coloca o link da página no href abaixo */}
              <a href="https://www.facebook.com/share/18vFY6qwK6/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="nx-social-btn" aria-label="Facebook">
                <svg viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>
              </a>
              {/* INSTAGRAM - Coloca o link da página no href abaixo */}
              <a href="https://instagram.com/noxvelia_group" target="_blank" rel="noopener noreferrer" className="nx-social-btn" aria-label="Instagram">
                <svg viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
              </a>
              {/* TIKTOK - Coloca o link da página no href abaixo */}
              <a href="https://tiktok.com/@noxvelia7" target="_blank" rel="noopener noreferrer" className="nx-social-btn" aria-label="TikTok">
                <svg viewBox="0 0 448 512"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}