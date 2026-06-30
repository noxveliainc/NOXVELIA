import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * PremiumRoute — Wrapper para proteger páginas exclusivas de utilizadores Premium.
 *
 * Uso:
 *   <Route path="/pagina-premium" element={<PremiumRoute><PaginaPremium /></PremiumRoute>} />
 *
 * Comportamento:
 *   - Se o utilizador não está autenticado → redireciona para /login
 *   - Se o utilizador está autenticado mas não é Premium → redireciona para /planos
 *   - Se o utilizador é Premium → renderiza os filhos normalmente
 */
export default function PremiumRoute({ children }) {
  const { user, signed, loading } = useAuth();
  const location = useLocation();

  // Enquanto o AuthContext ainda está a carregar, não fazer nada
  if (loading) {
    return (
      <div style={{
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--nx-bg)',
      }}>
        <div className="nx-spinner" />
      </div>
    );
  }

  // Não autenticado → vai para login, guarda o destino original
  if (!signed) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Autenticado mas sem Premium → vai para a página de planos
  if (!user?.premiumAtivo) {
    return <Navigate to="/planos" state={{ from: location.pathname }} replace />;
  }

  // Premium ativo → renderiza a página
  return children;
}

s


