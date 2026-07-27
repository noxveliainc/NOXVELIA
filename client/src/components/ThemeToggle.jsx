import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTema } = useTheme();
  const label = isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro';

  return (
    <button
      type="button"
      onClick={toggleTema}
      className="nx-theme-toggle"
      data-mode={isDark ? 'dark' : 'light'}
      title={label}
      aria-label={label}
      aria-pressed={isDark}
    >
      <span className="nx-theme-toggle-icon sun" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
        </svg>
      </span>
      <span className="nx-theme-toggle-icon moon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.6A8.6 8.6 0 1 1 11.4 3a6.7 6.7 0 0 0 9.6 9.6Z" />
        </svg>
      </span>
      <span className="sr-only">{label}</span>
    </button>
  );
}
