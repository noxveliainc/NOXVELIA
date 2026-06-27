// src/components/Notificacoes.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Check } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function Notificacoes() {
  const { signed } = useAuth();
  const navigate = useNavigate();
  const [aberto, setAberto] = useState(false);
  const [notificacoes, setNotificacoes] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickFora = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setAberto(false);
    };
    document.addEventListener('mousedown', handleClickFora);
    return () => document.removeEventListener('mousedown', handleClickFora);
  }, []);

  const carregarNotificacoes = async () => {
    if (!signed) return;
    try {
      const { data } = await api.get('/notificacoes');
      setNotificacoes(data);
    } catch {}
  };

  useEffect(() => {
    carregarNotificacoes();
    const interval = setInterval(carregarNotificacoes, 30000);
    return () => clearInterval(interval);
  }, [signed]);

  const marcarComoLida = async (id, link) => {
    try {
      await api.put(`/notificacoes/${id}/ler`);
      setNotificacoes(prev => prev.map(n => n._id === id ? { ...n, lida: true } : n));
      setAberto(false);
      if (link) navigate(link);
    } catch {}
  };

  const limparTodas = async () => {
    try {
      await api.put('/notificacoes/ler-todas');
      setNotificacoes(prev => prev.map(n => ({ ...n, lida: true })));
    } catch {}
  };

  if (!signed) return null;

  const naoLidas = notificacoes.filter(n => !n.lida).length;

  return (
    <>
      <style>{`
        .notif-wrap { position: relative; }
        .notif-btn {
          position: relative;
          padding: 8px;
          background: transparent;
          border: none;
          color: var(--nx-text-muted);
          cursor: pointer;
          border-radius: var(--nx-radius-sm);
          transition: color 0.2s;
          display: flex; align-items: center; justify-content: center;
        }
        .notif-btn:hover { color: var(--nx-text); }
        .notif-dot-ring {
          position: absolute; top: 5px; right: 5px;
          width: 10px; height: 10px;
        }
        .notif-dot-ring span:first-child {
          position: absolute; inset: 0; border-radius: 50%;
          background: #f87171; opacity: 0.65;
          animation: nx-ping 1.2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .notif-dot-ring span:last-child {
          position: relative; display: inline-flex;
          width: 10px; height: 10px; border-radius: 50%;
          background: #ef4444;
          border: 2px solid var(--nx-bg);
        }
        @keyframes nx-ping {
          75%, 100% { transform: scale(1.8); opacity: 0; }
        }

        .notif-dropdown {
          position: absolute; right: 0; top: calc(100% + 10px);
          width: 320px;
          background: var(--nx-panel-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--nx-border-2);
          border-radius: var(--nx-radius-lg);
          box-shadow: var(--nx-shadow-card);
          overflow: hidden;
          z-index: 999;
          animation: nx-fade-in 0.2s ease;
          font-family: var(--nx-font-body);
        }
        .notif-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 14px 18px;
          border-bottom: 1px solid var(--nx-border);
          background: var(--nx-bg-2);
        }
        .notif-header h3 {
          margin: 0;
          font-family: var(--nx-font-display);
          font-size: 13px; font-weight: 800;
          color: var(--nx-text);
          text-transform: uppercase; letter-spacing: 0.06em;
        }
        .notif-marcar-btn {
          display: inline-flex; align-items: center; gap: 5px;
          background: none; border: none; cursor: pointer;
          font-family: var(--nx-font-body); font-size: 12px; font-weight: 600;
          color: var(--nx-accent-blue); transition: opacity 0.2s;
        }
        .notif-marcar-btn:hover { opacity: 0.75; }

        .notif-list { max-height: 320px; overflow-y: auto; }
        .notif-list::-webkit-scrollbar { width: 5px; }
        .notif-list::-webkit-scrollbar-track { background: transparent; }
        .notif-list::-webkit-scrollbar-thumb { background: var(--nx-border-2); border-radius: 10px; }

        .notif-empty {
          padding: 40px 20px; text-align: center;
          font-size: 13px; color: var(--nx-text-muted);
        }
        .notif-item {
          padding: 14px 18px;
          border-bottom: 1px solid var(--nx-border);
          cursor: pointer;
          transition: background 0.15s;
        }
        .notif-item:last-child { border-bottom: none; }
        .notif-item:hover { background: var(--nx-bg-3); }
        .notif-item.unread { background: rgba(59, 130, 246, 0.04); }
        .notif-item-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .notif-tipo {
          font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;
        }
        .notif-tipo.unread { color: var(--nx-accent-blue); }
        .notif-tipo.read { color: var(--nx-text-muted); }
        .notif-unread-dot {
          width: 8px; height: 8px; border-radius: 50%; background: var(--nx-accent-blue);
          box-shadow: 0 0 6px rgba(59, 130, 246, 0.6);
        }
        .notif-titulo { font-size: 13px; font-weight: 600; color: var(--nx-text); margin-bottom: 3px; }
        .notif-msg { font-size: 12px; color: var(--nx-text-muted); line-height: 1.4;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      <div className="notif-wrap" ref={dropdownRef}>
        <button className="notif-btn" onClick={() => setAberto(!aberto)} aria-label="Notificações">
          <Bell size={20} />
          {naoLidas > 0 && (
            <div className="notif-dot-ring">
              <span />
              <span />
            </div>
          )}
        </button>

        {aberto && (
          <div className="notif-dropdown">
            <div className="notif-header">
              <h3>🔔 Notificações</h3>
              {naoLidas > 0 && (
                <button onClick={limparTodas} className="notif-marcar-btn">
                  <Check size={13} /> Marcar lidas
                </button>
              )}
            </div>

            <div className="notif-list">
              {notificacoes.length === 0 ? (
                <div className="notif-empty">Sem notificações por agora.</div>
              ) : (
                notificacoes.map(n => (
                  <div
                    key={n._id}
                    className={`notif-item${!n.lida ? ' unread' : ''}`}
                    onClick={() => marcarComoLida(n._id, n.link)}
                  >
                    <div className="notif-item-top">
                      <span className={`notif-tipo${!n.lida ? ' unread' : ' read'}`}>
                        {n.tipo?.replace('_', ' ')}
                      </span>
                      {!n.lida && <div className="notif-unread-dot" />}
                    </div>
                    <div className="notif-titulo">{n.titulo}</div>
                    <div className="notif-msg">{n.mensagem}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}