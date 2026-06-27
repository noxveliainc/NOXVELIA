import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { BadgeCheck } from 'lucide-react';
import { io } from 'socket.io-client'; // 🌟 Antena do WebSockets

export default function Mensagens() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [socket, setSocket] = useState(null);
  const [conversas, setConversas] = useState([]);
  const [conversaAtiva, setConversaAtiva] = useState(null);
  const [mensagens, setMensagens] = useState([]);
  const [novoTexto, setNovoTexto] = useState('');
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  
  const chatEndRef = useRef(null);

  // 🧭 RESOLUÇÃO DE ROTAS CONTEXTUAIS
  const contextoVisualAtual = localStorage.getItem('@App:contexto_visual') || 'carro';
  const veioDeCarros = contextoVisualAtual === 'carro';
  const rotaVoltar = veioDeCarros ? '/carros' : '/imoveis';
  const labelVoltar = veioDeCarros ? 'Automóveis' : 'Imóveis';

  // 🌟 MÁSCARA SOBERANA: Função que injeta a autoridade visual
  const renderNomeSoberano = (nome, tipo, iconSize = 14) => {
    if (tipo === 'admin') {
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          NOXVELIA {nome}
          <BadgeCheck size={iconSize} fill="#3b82f6" color="#ffffff" title="Conta Oficial NOXVELIA" style={{ flexShrink: 0 }} />
        </span>
      );
    }
    return nome;
  };

  // 1. CARREGAR A LISTA INICIAL DE CONVERSAS
  const carregarConversas = async () => {
    try {
      const { data } = await api.get('/mensagens/conversas');
      setConversas(data || []);
    } catch (err) {
      console.error('Erro ao carregar a caixa de mensagens:', err);
    } finally {
      setLoading(false);
    }
  };

  // 2. INICIALIZAR O SOCKET.IO EM TEMPO REAL (Substitui o setInterval)
  useEffect(() => {
    if (!user) return;

    // Conecta ao Backend
    const socketURL = (import.meta.env.VITE_API_URL || 'http://localhost:4000').replace('/api', '');
    const novoSocket = io(socketURL);
    setSocket(novoSocket);

    // Entra na sala pessoal com o ID do utilizador
    novoSocket.emit('entrar_sala_pessoal', user.id || user._id);

    // Escuta novas mensagens vindas do ar!
    novoSocket.on('nova_mensagem', (mensagemRecebida) => {
      setMensagens((prev) => {
        // Se a conversa que recebeu a msg estiver aberta, renderiza a bolha
        if (prev.length > 0 && prev[0].conversa === mensagemRecebida.conversa) {
          return [...prev, mensagemRecebida];
        }
        return prev;
      });
      // Atualiza a Inbox para que a mensagem mais recente salte para o topo
      carregarConversas();
    });

    carregarConversas(); // Carrega pela primeira vez

    return () => novoSocket.close(); // Limpa a antena ao sair da página
  }, [user]);

  // 3. CARREGAR HISTÓRICO QUANDO CLICAMOS NUMA CONVERSA
  useEffect(() => {
    if (!conversaAtiva?.conversaId) return;

    const carregarMensagens = async () => {
      try {
        const { data } = await api.get(`/mensagens/conversa/${conversaAtiva.conversaId}`);
        setMensagens(data || []);
      } catch (err) {
        console.error('Erro ao carregar histórico:', err);
      }
    };

    carregarMensagens();
  }, [conversaAtiva]);

  // Rola para a última mensagem
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens]);

  // 4. ENVIAR MENSAGEM
  const handleEnviar = async (e) => {
    e.preventDefault();
    if (!novoTexto.trim() || !conversaAtiva) return;

    const textoGuardado = novoTexto.trim();
    setNovoTexto('');
    setEnviando(true);

    try {
      const payload = {
        anuncioId: conversaAtiva.anuncio._id,
        destinatarioId: conversaAtiva.interlocutor._id,
        texto: textoGuardado
      };

      const { data } = await api.post('/mensagens', payload);
      
      // Injeta o remetente local
      const mensagemConstruida = data.mensagem;
      mensagemConstruida.remetente = { _id: user?.id || user?._id, nome: user?.nome, tipo: user?.tipo };
      
      // Coloca no próprio ecrã instantaneamente
      setMensagens(prev => [...prev, mensagemConstruida]);
      
      // 🌟 MAGIA: Dispara pelo socket para o outro ecrã
      if (socket) {
        socket.emit('enviar_mensagem_realtime', {
          destinatarioId: conversaAtiva.interlocutor._id,
          mensagem: mensagemConstruida
        });
      }

      carregarConversas();
    } catch (err) {
      console.error('Erro ao entregar mensagem:', err);
      alert('Não foi possível entregar a tua mensagem.');
      setNovoTexto(textoGuardado); // Devolve o texto
    } finally {
      setEnviando(false);
    }
  };

  if (loading) {
    return (
      <div className="chat-loader flex items-center justify-center bg-white" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p style={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', color: '#666', letterSpacing: '0.1em' }}>
            A abrir a tua inbox de {veioDeCarros ? 'Carros 🚗' : 'Imóveis 🏠'}…
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=IBM+Plex+Mono:wght@300;400;600&display=swap');
        
        .chat-root { font-family: 'IBM Plex Mono', monospace; background: #fafaf9; min-height: calc(100vh - 80px); display: flex; }
        .chat-sidebar { width: 340px; background: white; border-right: 1px solid #e5e3e0; display: flex; flex-direction: column; }
        
        .chat-sidebar-back-btn { display: block; padding: 16px 24px 0 24px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #888; text-decoration: none; transition: color 0.2s; }
        .chat-sidebar-back-btn:hover { color: #000; }
        .chat-sidebar-header { padding: 12px 24px 24px 24px; border-bottom: 1px solid #e5e3e0; }
        .chat-sidebar-header h1 { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: #0d0d0d; margin: 0; }
        .chat-list { flex: 1; overflow-y: auto; }
        
        .chat-item { width: 100%; text-align: left; padding: 16px 24px; display: flex; gap: 12px; border: none; border-bottom: 1px solid #fafaf9; background: white; cursor: pointer; transition: all 0.2s; position: relative; }
        .chat-item:hover { background: #f5f3f0; }
        .chat-item.active { background: #0d0d0d; color: white; }
        .chat-item-img { width: 50px; height: 50px; border-radius: 6px; overflow: hidden; background: #eee; flex-shrink: 0; border: 1px solid #e5e3e0; }
        .chat-item-img img { width: 100%; height: 100%; object-fit: cover; }
        .chat-item-title { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .chat-item-user { font-size: 11px; opacity: 0.6; margin-top: 2px; }
        
        .badge-nao-lida { width: 8px; height: 8px; background-color: #ff3b30; border-radius: 50%; position: absolute; right: 24px; top: 50%; transform: translateY(-50%); }
        
        .chat-main { flex: 1; display: flex; flex-direction: column; background: #fafaf9; }
        .chat-main-empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #999; text-align: center; }
        .chat-main-header { padding: 18px 32px; background: white; border-bottom: 1px solid #e5e3e0; display: flex; align-items: center; justify-content: space-between; }
        .chat-main-header-title { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: #0d0d0d; }
        
        .chat-body { flex: 1; padding: 32px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; }
        .msg-row { display: flex; width: 100%; }
        .msg-row.me { justify-content: flex-end; }
        .msg-row.other { justify-content: flex-start; }
        .msg-bubble { max-width: 60%; padding: 12px 16px; border-radius: 8px; font-size: 13px; line-height: 1.5; position: relative; }
        .msg-row.me .msg-bubble { background: #0d0d0d; color: white; border-bottom-right-radius: 2px; }
        .msg-row.other .msg-bubble { background: white; color: #0d0d0d; border: 1px solid #e5e3e0; border-bottom-left-radius: 2px; }
        
        .msg-name-tag { font-size: 10px; font-weight: 700; margin-bottom: 4px; display: flex; align-items: center; gap: 4px; opacity: 0.7; }
        .msg-row.me .msg-name-tag { color: #a1a1aa; }
        .msg-row.other .msg-name-tag { color: #52525b; }

        .msg-meta-footer { display: flex; justify-content: flex-end; align-items: center; gap: 6px; margin-top: 6px; font-size: 9px; opacity: 0.5; }
        .msg-row.me .msg-meta-footer { color: rgba(255,255,255,0.8); }
        .status-visto { font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; font-size: 8px; }
        .status-visto.lido { color: #34c759; }
        
        .chat-footer { padding: 24px 32px; background: white; border-top: 1px solid #e5e3e0; }
        .chat-input-form { display: flex; gap: 12px; }
        .chat-input { flex: 1; padding: 14px 18px; border: 1px solid #e5e3e0; border-radius: 6px; font-family: 'IBM Plex Mono', monospace; font-size: 13px; outline: none; }
        .chat-input:focus { border-color: #0d0d0d; }
        .chat-btn { padding: 0 24px; background: #0d0d0d; color: white; border: none; border-radius: 6px; font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; }
        .chat-btn:disabled { background: #ccc; cursor: not-allowed; }
      `}</style>

      <div className="chat-root">
        <div className="chat-sidebar">
          <Link to={rotaVoltar} className="chat-sidebar-back-btn">
            ← Voltar aos {labelVoltar}
          </Link>

          <div className="chat-sidebar-header">
            <h1>Mensagens</h1>
          </div>
          
          <div className="chat-list">
            {conversas.length === 0 ? (
              <div style={{ padding: '40px 24px', textAlign: 'center', fontSize: '12px', color: '#999' }}>Nenhuma negociação em curso.</div>
            ) : (
              conversas.map((chat) => {
                const isActive = conversaAtiva?.conversaId === chat.conversaId;
                const temMensagensNovas = chat.naoLidas > 0;

                return (
                  <button
                    key={chat.conversaId}
                    onClick={() => {
                      setConversaAtiva(chat);
                      chat.naoLidas = 0;
                    }}
                    className={`chat-item ${isActive ? 'active' : ''}`}
                  >
                    <div className="chat-item-img">
                      {chat.anuncio?.fotos?.[0] ? (
                        <img src={chat.anuncio.fotos[0]} alt="" />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eee', fontSize: '18px' }}>
                          {veioDeCarros ? '🚗' : '🏠'}
                        </div>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0, paddingRight: '15px' }}>
                      <div 
                        className="chat-item-title" 
                        style={{ 
                          color: isActive ? 'white' : '#0d0d0d',
                          fontWeight: (temMensagensNovas && !isActive) ? '700' : '400' 
                        }}
                      >
                        {chat.anuncio?.titulo || 'Anúncio indisponível'}
                      </div>
                      <div className="chat-item-user" style={{ color: isActive ? 'rgba(255,255,255,0.7)' : '#666' }}>
                        {renderNomeSoberano(chat.interlocutor?.nome, chat.interlocutor?.tipo, 12)}
                      </div>
                    </div>

                    {temMensagensNovas && !isActive && <div className="badge-nao-lida" />}
                  </button>
                );
              })
            )}
          </div>
        </div>

        <div className="chat-main">
          {conversaAtiva ? (
            <>
              <div className="chat-main-header">
                <div>
                  <div className="chat-main-header-title">{conversaAtiva.anuncio?.titulo}</div>
                  <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
                    Interlocutor: <span style={{ fontWeight: 600, color: '#0d0d0d' }}>
                      {renderNomeSoberano(conversaAtiva.interlocutor?.nome, conversaAtiva.interlocutor?.tipo, 14)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="chat-body">
                {mensagens.map((msg) => {
                  const remetenteId = msg.remetente?._id || msg.remetente;
                  const isMe = remetenteId === (user?.id || user?._id);

                  return (
                    <div key={msg._id} className={`msg-row ${isMe ? 'me' : 'other'}`}>
                      <div className="msg-bubble">
                        <div className="msg-name-tag">
                          {renderNomeSoberano(msg.remetente?.nome, msg.remetente?.tipo, 10)}
                        </div>

                        <div>{msg.texto}</div>
                        
                        <div className="msg-meta-footer">
                          <span>
                            {new Date(msg.createdAt).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {isMe && (
                            <span className={`status-visto ${msg.lida ? 'lido' : ''}`}>
                              • {msg.lida ? 'Visto' : 'Enviado'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={chatEndRef} />
              </div>

              <div className="chat-footer">
                <form onSubmit={handleEnviar} className="chat-input-form">
                  <input
                    type="text"
                    value={novoTexto}
                    onChange={(e) => setNovoTexto(e.target.value)}
                    placeholder="Escreve uma mensagem para negociar..."
                    className="chat-input"
                    disabled={enviando}
                    maxLength={1000}
                  />
                  <button type="submit" className="chat-btn" disabled={enviando || !novoTexto.trim()}>
                    {enviando ? '...' : 'Enviar'}
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="chat-main-empty">
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>💬</div>
              <h3 style={{ fontFamily: 'Syne', fontSize: '16px', fontWeight: 700, color: '#0d0d0d', marginBottom: '6px' }}>
                O teu Centro de Negociações
              </h3>
              <p style={{ fontSize: '12px', color: '#666', maxWidth: '320px', lineHeight: 1.6 }}>
                Seleciona uma conversa na barra lateral para começares a falar em tempo real e de forma segura com os anunciantes.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}