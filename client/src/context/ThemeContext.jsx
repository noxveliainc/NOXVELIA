import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // O padrão é sempre o imaculado Modo Escuro
  const [tema, setTema] = useState(() => {
    return localStorage.getItem('@App:tema') || 'nx-dark';
  });

  useEffect(() => {
    // Aplica a classe diretamente na raiz do documento HTML
    const root = document.documentElement;
    root.classList.remove('nx-dark', 'nx-light');
    root.classList.add(tema);
    
    // Guarda na memória para não haver "flashes" ao recarregar a página
    localStorage.setItem('@App:tema', tema);
  }, [tema]);

  const toggleTema = () => {
    setTema(prev => prev === 'nx-dark' ? 'nx-light' : 'nx-dark');
  };

  return (
    <ThemeContext.Provider value={{ tema, toggleTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook personalizado para usares em qualquer página
export const useTheme = () => useContext(ThemeContext);