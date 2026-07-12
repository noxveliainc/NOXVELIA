import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext(null);
const THEME_KEY = '@App:tema';

const getInitialTheme = () => {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark' || stored === 'nx-dark') return 'dark';
    if (stored === 'light' || stored === 'nx-light') return 'light';
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
};

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    const isDark = tema === 'dark';
    root.classList.toggle('dark', isDark);
    root.classList.remove('nx-dark', 'nx-light');
    root.dataset.theme = tema;
    root.style.colorScheme = tema;

    try {
      localStorage.setItem(THEME_KEY, tema);
    } catch {
      // A escolha continua ativa nesta sessão se o armazenamento estiver bloqueado.
    }
  }, [tema]);

  const toggleTema = () => setTema((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const value = useMemo(() => ({ tema, isDark: tema === 'dark', toggleTema }), [tema]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme deve ser utilizado dentro de ThemeProvider.');
  return context;
};
