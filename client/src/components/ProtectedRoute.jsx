import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { pathWithSearch, publicReturnPath } from '../utils/navigationState';

export default function ProtectedRoute({ children }) {
  const { signed, loading } = useAuth();
  const location = useLocation();

  // 1. Enquanto verifica a sessão: devolvemos 'null' em vez de um ecrã preto.
  // Isto evita que o componente <PageTransition /> fique encravado a esconder a página!
  if (loading) {
    return null; 
  }

  // 2. Se o utilizador não estiver autenticado, recambiá-lo para o Login
  if (!signed) {
    return (
      <Navigate
        to="/login"
        state={{
          from: pathWithSearch(location),
          returnTo: location.state?.returnTo || publicReturnPath(location, '/'),
        }}
        replace
      />
    );
  }

  // 3. Se estiver tudo OK, deixa-o entrar na página!
  return children;
}
