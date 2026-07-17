import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { pathWithSearch, publicReturnPath } from '../utils/navigationState';
import LoadingScreen from './LoadingScreen';

export default function ProtectedRoute({ children }) {
  const { signed, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen label="A confirmar sessão" detail="Estamos a preparar o teu acesso." minHeight="calc(100vh - 72px)" tone="light" />;
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
