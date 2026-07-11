import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // O padrão é sempre o imaculado Modo Escuro
  const [tema, setTema] = useState(() => {
    try {
      return localStorage.getItem('@App:tema') || 'nx-dark';
    } catch {
      return 'nx-dark';
    }
  });

  useEffect(() => {
    // Aplica a classe diretamente na raiz do documento HTML
    const root = document.documentElement;
    root.classList.remove('nx-dark', 'nx-light');
    root.classList.add(tema);
  }, [tema]);

  const toggleTema = () => {
    setTema((prev) => {
      const proximoTema = prev === 'nx-dark' ? 'nx-light' : 'nx-dark';
      try {
        localStorage.setItem('@App:tema', proximoTema);
      } catch {
        // O tema continua a funcionar nesta sessão se o navegador bloquear armazenamento.
      }
      return proximoTema;
    });
  };

  return (
    <ThemeContext.Provider value={{ tema, toggleTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook personalizado para usares em qualquer página
export const useTheme = () => useContext(ThemeContext);
