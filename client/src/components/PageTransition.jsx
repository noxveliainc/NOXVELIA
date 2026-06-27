import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition() {
  const location = useLocation();
  const [isRouting, setIsRouting] = useState(false);
  const [render, setRender] = useState(false);

  // 🛡️ A TUA LISTA VIP: A cortina só vai cair quando o utilizador entrar nestas páginas exatas.
  // Podes adicionar ou remover caminhos conforme o que achares melhor.
  const rotasComTransicao = [
    '/',
    '/carros',
    '/imoveis',
    '/login',
    '/registo',
    '/publicar'
  ];

  useEffect(() => {
    // 1. Verifica se a rota atual está na nossa lista VIP
    const deveMostrar = rotasComTransicao.includes(location.pathname);

    // Se não estiver na lista, aborta a animação imediatamente
    if (!deveMostrar) {
      setRender(false);
      setIsRouting(false);
      return;
    }

    // 2. A rota está na lista! Levanta a cortina.
    setRender(true);
    setIsRouting(true);

    // 3. Mantém a cortina o tempo suficiente para a página carregar (400ms)
    const timer = setTimeout(() => {
      setIsRouting(false); // Inicia o desvanecimento
      
      // 4. Destrói o componente depois da animação (500ms)
      setTimeout(() => setRender(false), 500); 
    }, 400);

    return () => clearTimeout(timer);
  }, [location.pathname]); // O gatilho é a mudança de URL

  // Se não for para renderizar, não mostramos nada
  if (!render) return null;

  return (
    <>
      <style>{`
        .nv-transition-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #020617; 
          z-index: 99999; 
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transition: opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1), backdrop-filter 0.5s ease;
          backdrop-filter: blur(12px); 
          pointer-events: all;
        }
        
        .nv-transition-overlay.fade-out {
          opacity: 0;
          backdrop-filter: blur(0px);
          pointer-events: none;
        }

        .nv-transition-logo {
          width: 110px; 
          height: 110px;
          animation: nvCinematicPulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes nvCinematicPulse {
          0%, 100% { 
            transform: scale(1); 
            filter: drop-shadow(0 0 15px rgba(60, 209, 196, 0.15)); 
          }
          50% { 
            transform: scale(1.08); 
            filter: drop-shadow(0 0 40px rgba(60, 209, 196, 0.6)); 
          }
        }
        
        .nv-loading-bar {
          width: 60px;
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
          margin-top: 40px;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }
        
        .nv-loading-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 30%;
          background: #3cd1c4;
          animation: loadingSweep 1s ease-in-out infinite;
          border-radius: 4px;
        }

        @keyframes loadingSweep {
          0% { left: -30%; }
          100% { left: 100%; }
        }
      `}</style>

     <div className={`nv-transition-overlay ${!isRouting ? 'fade-out' : ''}`}>
        
        {/* 🌟 NOVA LOGO NO LOADING ECRÃ */}
       <img 
  src="/logo-noxvelia.png" 
  alt="NOXVELIA" 
  style={{ height: '64px', width: 'auto', objectFit: 'contain' }} 
/>
        
        <div className="nv-loading-bar"></div>
      </div>
    </>
  );
}