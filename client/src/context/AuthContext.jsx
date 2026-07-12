import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import { clearAuth, clearLegacyAuth, getAuthToken, getStoredUser, storeAuth, storeUser } from '../utils/authSession';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const atualizarAvatar = useCallback((novoAvatarUrl) => {
    setUser((prev) => {
      if (!prev) return null;
      const utilizadorAtualizado = { ...prev, avatarUrl: novoAvatarUrl };
      storeUser(utilizadorAtualizado);
      return utilizadorAtualizado;
    });
  }, []);

  const atualizarUser = useCallback((novosDados) => {
    setUser((prev) => {
      if (!prev) return novosDados;
      const utilizadorAtualizado = { ...prev, ...novosDados };
      storeUser(utilizadorAtualizado);
      return utilizadorAtualizado;
    });
  }, []);

  const sincronizarUser = useCallback(async () => {
    try {
      const { data } = await api.get('/users/me');
      const dadosAtualizados = data.user || data;
      atualizarUser(dadosAtualizados);
      return dadosAtualizados;
    } catch (err) {
      console.error('Erro ao sincronizar utilizador:', err);
      return null;
    }
  }, [atualizarUser]);

  useEffect(() => {
    const carregarDadosArmazenados = () => {
      clearLegacyAuth();
      const token = getAuthToken();
      const userLocal = getStoredUser();
      if (token && userLocal) {
        try {
          setUser(userLocal);
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          sincronizarUser();
        } catch (e) {
          console.error('Erro ao ler localStorage no arranque', e);
          clearAuth();
        }
      }
      setLoading(false);
    };

    carregarDadosArmazenados();
    const expirada = () => setUser(null);
    window.addEventListener('noxvelia:auth-expired', expirada);
    return () => window.removeEventListener('noxvelia:auth-expired', expirada);
  }, [sincronizarUser]);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, user: userData, utilizador } = response.data;
    const dadosUtilizador = userData || utilizador;

    if (!token || !dadosUtilizador) {
      throw new Error('Resposta do servidor inválida.');
    }

    storeAuth(token, dadosUtilizador);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(dadosUtilizador);
    return response.data;
  };

  const logout = () => {
    clearAuth();
    delete api.defaults.headers.common['Authorization'];
    const rotasPrivadas = ['/perfil', '/publicar', '/mensagens', '/favoritos', '/admin'];
    const pathAtual = window.location.pathname;
    const estaNumaRotaPrivada = rotasPrivadas.some(rota => pathAtual.startsWith(rota));
    if (estaNumaRotaPrivada) {
      const contexto = localStorage.getItem('@App:contexto_visual') || 'imovel';
      window.location.href = contexto === 'carro' ? '/carros' : '/imoveis';
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{
      signed: !!user,
      user,
      loading,
      login,
      logout,
      atualizarAvatar,
      atualizarUser,
      sincronizarUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
