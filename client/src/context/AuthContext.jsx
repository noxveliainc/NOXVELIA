
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarDadosArmazenados = () => {
      const token = localStorage.getItem('@App:token');
      const userLocal = localStorage.getItem('@App:user');
      if (token && userLocal) {
        try {
          setUser(JSON.parse(userLocal));
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          sincronizarUser();
        } catch (e) {
          console.error("Erro ao ler localStorage no arranque", e);
          localStorage.removeItem('@App:token');
          localStorage.removeItem('@App:user');
        }
      }
      setLoading(false);
    };
    carregarDadosArmazenados();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user: userData, utilizador } = response.data;
      const dadosUtilizador = userData || utilizador;
      
      if (!token || !dadosUtilizador) {
        throw new Error('Resposta do servidor inválida.');
      }
      
      localStorage.setItem('@App:token', token);
      localStorage.setItem('@App:user', JSON.stringify(dadosUtilizador));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(dadosUtilizador);
      return response.data;
    } catch (err) {
      // 🌟 CORREÇÃO: Lança o erro para o Login.jsx conseguir ler o setErro
      throw err; 
    }
  };

  const logout = () => {
    localStorage.removeItem('@App:token');
    localStorage.removeItem('@App:user');
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

  const atualizarAvatar = (novoAvatarUrl) => {
    setUser((prev) => {
      if (!prev) return null;
      const utilizadorAtualizado = { ...prev, avatarUrl: novoAvatarUrl };
      localStorage.setItem('@App:user', JSON.stringify(utilizadorAtualizado));
      return utilizadorAtualizado;
    });
  };

  const atualizarUser = (novosDados) => {
    setUser((prev) => {
      if (!prev) return novosDados;
      const utilizadorAtualizado = { ...prev, ...novosDados };
      localStorage.setItem('@App:user', JSON.stringify(utilizadorAtualizado));
      return utilizadorAtualizado;
    });
  };

  const sincronizarUser = async () => {
    try {
      const { data } = await api.get('/users/me');
      const dadosAtualizados = data.user || data;
      atualizarUser(dadosAtualizados);
      return dadosAtualizados;
    } catch (err) {
      console.error('Erro ao sincronizar utilizador:', err);
      return null;
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