import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function UserMenu({ theme }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  if (!user) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link to="/login" style={{ fontSize: 12, fontWeight: 600, color: theme === 'carro' ? '#666' : 'rgba(255,255,255,.65)', textDecoration: 'none', padding: '6px 10px' }}>
          Entrar
        </Link>
        <Link to="/publicar" style={{ fontSize: 11, fontWeight: 700, padding: '7px 16px', background: theme === 'carro' ? '#E94560' : 'var(--accent)', color: '#fff', textDecoration: 'none', textTransform: 'uppercase' }}>
          + Publicar
        </Link>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Link to="/publicar" style={{ fontSize: 11, fontWeight: 700, padding: '7px 16px', background: theme === 'carro' ? '#E94560' : 'var(--accent)', color: '#fff', textDecoration: 'none', textTransform: 'uppercase' }}>
        + Publicar
      </Link>
      <Link to="/perfil" style={{ width: 32, height: 32, background: theme === 'carro' ? 'rgba(233,69,96,.15)' : 'rgba(255,255,255,.15)', color: theme === 'carro' ? '#E94560' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
        {user.nome?.charAt(0).toUpperCase()}
      </Link>
      <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme === 'carro' ? '#555' : 'rgba(255,255,255,.5)' }}>
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
      </button>
    </div>
  );
}