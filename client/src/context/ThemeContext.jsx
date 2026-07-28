import React, { createContext, useContext, useLayoutEffect, useMemo } from 'react';

const ThemeContext = createContext(null);
const THEME_KEY = '@App:tema';

const applyLightTheme = () => {
  const root = document.documentElement;
  root.classList.remove('dark', 'nx-dark');
  root.classList.add('nx-light');
  root.dataset.theme = 'light';
  root.style.colorScheme = 'light';

  if (document.body) {
    document.body.classList.remove('dark', 'nx-dark');
    document.body.classList.add('nx-light');
  }

  try {
    localStorage.removeItem(THEME_KEY);
  } catch {
    // Sem impacto: a Noxvelia usa sempre tema claro.
  }
};

export function ThemeProvider({ children }) {
  useLayoutEffect(() => {
    applyLightTheme();
  }, []);

  const value = useMemo(() => ({
    tema: 'light',
    isDark: false,
    toggleTema: applyLightTheme,
    setTema: applyLightTheme,
  }), []);

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
