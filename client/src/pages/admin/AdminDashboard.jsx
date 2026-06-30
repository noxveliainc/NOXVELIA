import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

import Icon from '@mdi/react';
import { 
  mdiAccountMultiple, mdiFileDocumentOutline, mdiCar, mdiHomeOutline, 
  mdiTrashCanOutline, mdiShieldOutline, mdiLoading, mdiCheck, mdiClose, 
  mdiOpenInNew, mdiCurrencyEur, mdiMagnify, mdiChevronDown, mdiStar, 
  mdiClockOutline, mdiAlertOutline, mdiCrown, mdiChartTimelineVariant, 
  mdiFilterVariant, mdiPhoneOutline, mdiEmailOutline, mdiContentCopy
} from '@mdi/js';

/* ------------------------------------------------------------------ */
/* NOXVELIA · Soberania — Admin Command Center                        */
/* Design language: "Mission Control" — deep navy/ink canvas,         */
/* amber sovereign accent, monospace data readouts, hairline grids.  */
/* ------------------------------------------------------------------ */

const COLORS = {
  bg: '#03060f',
  panel: '#0a0f1e',
  panelAlt: '#0d1426',
  border: 'rgba(255,255,255,0.06)',
  borderStrong: 'rgba(255,255,255,0.12)',
  text: '#e7ecf7',
  textDim: '#7c8aa8',
  textFaint: '#4b5772',
  gold: '#f0b429',
  goldDim: 'rgba(240,180,41,0.12)',
  red: '#ef4444',
  redDim: 'rgba(239,68,68,0.1)',
  green: '#22d3a5',
  greenDim: 'rgba(34,211,165,0.1)',
  blue: '#5b9dff',
  blueDim: 'rgba(91,157,255,0.1)',
  purple: '#a78bfa',
  purpleDim: 'rgba(167,139,250,0.1)',
};

const FONT_DISPLAY = "'Space Grotesk', 'Plus Jakarta Sans', sans-serif";
const FONT_BODY = "'Inter', sans-serif";
const FONT_MONO = "'JetBrains Mono', 'IBM Plex Mono', monospace";

export default function AdminDashboard() {
  const { user, signed } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [utilizadores, setUtilizadores] = useState([]);
  const [anuncios, setAnuncios] = useState([]);
  const [pedidosDestaque, setPedidosDestaque] = useState([]);

  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [activeTab, setActiveTab] = useState('contas');
  const [isDeleting, setIsDeleting] = useState(null);
  
  // Feedback visual para quando se copia um contacto
  const [copiadoFeedback, setCopiadoFeedback] = useState(null);

  const [searchUsers, setSearchUsers] = useState('');
  const [filterPlano, setFilterPlano] = useState('todos');
  const [searchAnuncios, setSearchAnuncios] = useState('');
  const [filterTipo, setFilterTipo] = useState('todos');

  useEffect(() => {
    if (!signed || user?.tipo !== 'admin') {
      navigate('/');
      return;
    }

    const carregarQuartelGeneral = async () => {
      try {
        const [resStats, resUsers, resAnuncios, resPedidos] = await Promise.all([
          api.get('/admin/dashboard/stats'),
          api.get('/admin/utilizadores'),
          api.get('/admin/anuncios'),
          api.get('/admin/destaques/pedidos')
        ]);
        setStats(resStats.data);
        setUtilizadores(resUsers.data);
        setAnuncios(resAnuncios.data);
        setPedidosDestaque(resPedidos.data);
      } catch (err) {
        setErro('Erro ao ligar aos servidores da NOXVELIA.');
      } finally {
        setLoading(false);
      }
    };

    carregarQuartelGeneral();
  }, [signed, user, navigate]);

  const copiarParaClipboard = (texto, idTracker) => {
    navigator.clipboard.writeText(texto);
    setCopiadoFeedback(idTracker);
    setTimeout(() => setCopiadoFeedback(null), 2000);
  };

  const apagarAnuncio = async (id, titulo) => {
    if (window.confirm(`Tens a certeza que pretendes eliminar permanentemente o anúncio: "${titulo}"?`)) {
      setIsDeleting(id);
      try {
        await api.delete(`/admin/anuncios/${id}`);
        setAnuncios(anuncios.filter(a => a._id !== id));
        setPedidosDestaque(pedidosDestaque.filter(p => p._id !== id));
        setStats(prev => ({ ...prev, totalAnuncios: prev.totalAnuncios - 1 }));
      } catch (err) {
        alert(err.response?.data?.erro || 'Erro ao eliminar anúncio.');
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const aprovarDestaque = async (id, titulo) => {
    if (window.confirm(`Confirmas o recebimento do pagamento para destacar: "${titulo}"?`)) {
      setIsDeleting(id);
      try {
        await api.put(`/admin/anuncios/${id}/aprovar-destaque`);
        setPedidosDestaque(pedidosDestaque.filter(p => p._id !== id));
        setAnuncios(anuncios.map(a => a._id === id ? { ...a, destacado: true } : a));
        setStats(prev => ({ ...prev, receitaTotal: (prev.receitaTotal || 0) + 2.99 }));
        alert('Destaque dourado injetado com sucesso por 7 dias!');
      } catch (err) {
        alert(err.response?.data?.erro || 'Erro ao aprovar destaque.');
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const rejeitarDestaque = async (id) => {
    if (window.confirm(`Tens a certeza que queres REJEITAR este pedido de destaque?`)) {
      setIsDeleting(id);
      try {
        await api.put(`/admin/anuncios/${id}/rejeitar-destaque`);
        setPedidosDestaque(pedidosDestaque.filter(p => p._id !== id));
      } catch (err) {
        alert(err.response?.data?.erro || 'Erro ao rejeitar destaque.');
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const formatarData = (dataString) => new Date(dataString).toLocaleDateString('pt-PT');

  // ---- Derived data --------------------------------------------------

  const utilizadoresFiltrados = useMemo(() => {
    return utilizadores.filter(u => {
      const matchSearch = !searchUsers ||
        (u.nome?.toLowerCase().includes(searchUsers.toLowerCase()) ||
         u.email?.toLowerCase().includes(searchUsers.toLowerCase()) ||
         u.telefone?.includes(searchUsers));
      
      const matchPlano =
        filterPlano === 'todos' ||
        (filterPlano === 'admin' && u.tipo === 'admin') ||
        (filterPlano === 'premium' && u.tipo !== 'admin' && u.premiumAtivo) ||
        (filterPlano === 'profissional' && u.tipo !== 'admin' && u.tipoConta === 'profissional') ||
        (filterPlano === 'particular' && u.tipo !== 'admin' && (!u.tipoConta || u.tipoConta === 'particular'));
        
      return matchSearch && matchPlano;
    });
  }, [utilizadores, searchUsers, filterPlano]);

  const anunciosFiltrados = useMemo(() => {
    return anuncios.filter(a => {
      const matchSearch = !searchAnuncios ||
        (a.titulo?.toLowerCase().includes(searchAnuncios.toLowerCase()) ||
         a.utilizador?.nome?.toLowerCase().includes(searchAnuncios.toLowerCase()));
      const matchTipo = filterTipo === 'todos' || a.tipo === filterTipo;
      return matchSearch && matchTipo;
    });
  }, [anuncios, searchAnuncios, filterTipo]);

  const totalPremium = utilizadores.filter(u => u.tipo !== 'admin' && u.premiumAtivo).length;
  const conversao = stats?.totalUsers ? ((totalPremium / stats.totalUsers) * 100).toFixed(1) : '0.0';
  const receitaPotencial = pedidosDestaque.length * 2.99;

  // ---- Loading state ---------------------------------------------------

  if (loading) return (
    <div style={{
      background: COLORS.bg, minHeight: '100vh', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px',
      fontFamily: FONT_BODY, color: COLORS.textDim
    }}>
      <div style={{ position: 'relative', width: '56px', height: '56px' }}>
        <div style={{
          position: 'absolute', inset: 0, border: `2px solid ${COLORS.border}`,
          borderTopColor: COLORS.gold, borderRadius: '50%',
          animation: 'spin 0.9s linear infinite'
        }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: COLORS.gold }}>
          <Icon path={mdiShieldOutline} size={1} />
        </div>
      </div>
      <div style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        A iniciar centro de comando
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  // ---- Render ------------------------------------------------------------

  return (
    <div style={{
      background: COLORS.bg,
      backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -10%, rgba(240,180,41,0.06), transparent)`,
      minHeight: '100vh', color: COLORS.text, fontFamily: FONT_BODY, padding: '32px 24px 80px'
    }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .nx-row { animation: fadeUp 0.25s ease both; }
        .nx-row:hover { background: rgba(255,255,255,0.02); }
        .nx-btn { transition: all 0.15s ease; text-decoration: none; }
        .nx-btn:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(1.15); }
        .nx-btn:active:not(:disabled) { transform: translateY(0); }
        .nx-tab { transition: all 0.15s ease; }
        .nx-card { transition: border-color 0.15s ease, transform 0.15s ease; }
        .nx-card:hover { border-color: ${COLORS.borderStrong}; transform: translateY(-2px); }
        .nx-input::placeholder { color: ${COLORS.textFaint}; }
        .nx-scroll::-webkit-scrollbar { height: 6px; width: 6px; }
        .nx-scroll::-webkit-scrollbar-thumb { background: ${COLORS.borderStrong}; border-radius: 3px; }
        .nx-live { animation: pulse 2s ease-in-out infinite; }
        
        .contact-badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 8px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; font-family: ${FONT_MONO}; font-size: 11px; color: ${COLORS.textDim}; cursor: pointer; transition: all 0.2s; }
        .contact-badge:hover { background: rgba(255,255,255,0.08); color: #fff; border-color: rgba(255,255,255,0.2); }
        .contact-badge.copied { background: ${COLORS.greenDim}; color: ${COLORS.green}; border-color: rgba(34,211,165,0.3); }
      `}</style>

      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>

        {/* ===================== HEADER ===================== */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          borderBottom: `1px solid ${COLORS.border}`, paddingBottom: '24px', marginBottom: '32px',
          flexWrap: 'wrap', gap: '16px'
        }}>
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px',
              fontFamily: FONT_MONO, fontSize: '11px', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: COLORS.textFaint
            }}>
              <span className="nx-live" style={{
                width: '6px', height: '6px', borderRadius: '50%', background: COLORS.green,
                display: 'inline-block', boxShadow: `0 0 8px ${COLORS.green}`
              }} />
              Sistema operacional
            </div>
            <h1 style={{
              margin: 0, fontSize: '34px', fontFamily: FONT_DISPLAY, fontWeight: 700,
              color: '#fff', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '12px'
            }}>
              Soberania NOXVELIA
              <Icon path={mdiCrown} size={1.2} color={COLORS.gold} />
            </h1>
            <p style={{ margin: '8px 0 0 0', color: COLORS.textDim, fontSize: '14px' }}>
              Bem-vindo ao quartel-general, <span style={{ color: COLORS.text, fontWeight: 600 }}>{user?.nome}</span>.
            </p>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 18px',
            background: COLORS.goldDim, color: COLORS.gold, border: `1px solid rgba(240,180,41,0.25)`,
            borderRadius: '10px', fontSize: '12px', fontWeight: 700, fontFamily: FONT_MONO,
            letterSpacing: '0.1em', textTransform: 'uppercase'
          }}>
            <Icon path={mdiShieldOutline} size={0.7} /> Nível: Máximo
          </div>
        </div>

        {erro && (
          <div style={{
            background: COLORS.redDim, color: COLORS.red, padding: '14px 18px', borderRadius: '10px',
            marginBottom: '24px', border: `1px solid rgba(239,68,68,0.2)`, display: 'flex',
            alignItems: 'center', gap: '10px', fontSize: '14px'
          }}>
            <Icon path={mdiAlertOutline} size={0.8} /> {erro}
          </div>
        )}

        {/* ===================== KPI GRID ===================== */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '28px'
        }}>
          {[
            { label: 'Utilizadores', value: stats?.totalUsers ?? 0, sub: `${totalPremium} premium`, color: COLORS.blue, icon: <Icon path={mdiAccountMultiple} size={0.8} /> },
            { label: 'Anúncios', value: stats?.totalAnuncios ?? 0, sub: `${anuncios.filter(a => a.destacado).length} destacados`, color: COLORS.purple, icon: <Icon path={mdiFileDocumentOutline} size={0.8} /> },
            { label: 'Drive', value: stats?.carrosAtivos ?? 0, sub: 'carros ativos', color: '#2ac1b4', icon: <Icon path={mdiCar} size={0.8} /> },
            { label: 'Estate', value: stats?.imoveisAtivos ?? 0, sub: 'imóveis ativos', color: '#3ecf8e', icon: <Icon path={mdiHomeOutline} size={0.8} /> },
            { label: 'Faturação', value: `${(stats?.receitaTotal ?? 0).toFixed(2)}€`, sub: `conv. ${conversao}%`, color: COLORS.gold, icon: <Icon path={mdiCurrencyEur} size={0.8} /> },
          ].map((m, i) => (
            <div key={i} className="nx-card" style={{
              background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: '14px',
              padding: '18px', position: 'relative', overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '2px',
                background: m.color, opacity: 0.6
              }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div style={{
                  fontSize: '10px', color: COLORS.textFaint, textTransform: 'uppercase',
                  fontWeight: 700, letterSpacing: '0.12em', fontFamily: FONT_MONO
                }}>{m.label}</div>
                <div style={{ color: m.color, opacity: 0.7 }}>{m.icon}</div>
              </div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#fff', fontFamily: FONT_DISPLAY, marginBottom: '4px' }}>
                {m.value}
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textDim }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* ===================== ALERT BAR ===================== */}
        {pedidosDestaque.length > 0 && activeTab !== 'pedidos' && (
          <div
            onClick={() => setActiveTab('pedidos')}
            style={{
              cursor: 'pointer', background: COLORS.goldDim, border: `1px solid rgba(240,180,41,0.25)`,
              borderRadius: '12px', padding: '14px 20px', marginBottom: '24px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px'
            }}
            className="nx-card"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Icon path={mdiStar} size={0.9} color={COLORS.gold} />
              <span style={{ fontSize: '14px', color: COLORS.text }}>
                <strong style={{ color: COLORS.gold }}>{pedidosDestaque.length}</strong> pedido(s) de destaque à espera de validação
                {' '}— receita potencial <strong style={{ color: COLORS.gold }}>{receitaPotencial.toFixed(2)}€</strong>
              </span>
            </div>
            <span style={{ color: COLORS.gold, fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              Rever agora <Icon path={mdiChevronDown} size={0.7} style={{ transform: 'rotate(-90deg)' }} />
            </span>
          </div>
        )}

        {/* ===================== TABS ===================== */}
        <div style={{
          display: 'flex', gap: '6px', marginBottom: '20px', borderBottom: `1px solid ${COLORS.border}`,
          paddingBottom: '0px', overflowX: 'auto'
        }}>
          {[
            { id: 'contas', label: 'Gestão & Auditoria', icon: <Icon path={mdiAccountMultiple} size={0.7} />, count: utilizadores.length },
            { id: 'anuncios', label: 'Moderação de Anúncios', icon: <Icon path={mdiFileDocumentOutline} size={0.7} />, count: anuncios.length },
            { id: 'pedidos', label: 'Pedidos de Destaque', icon: <Icon path={mdiStar} size={0.7} />, count: pedidosDestaque.length, premium: true },
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="nx-tab"
                style={{
                  padding: '12px 18px', borderRadius: '10px 10px 0 0', cursor: 'pointer',
                  fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px',
                  background: isActive ? COLORS.panel : 'transparent',
                  color: isActive ? (tab.premium ? COLORS.gold : '#fff') : COLORS.textFaint,
                  border: 'none',
                  borderBottom: isActive ? `2px solid ${tab.premium ? COLORS.gold : COLORS.blue}` : '2px solid transparent',
                  position: 'relative', top: '1px', whiteSpace: 'nowrap'
                }}
              >
                {tab.icon}
                {tab.label}
                {tab.count > 0 && (
                  <span style={{
                    fontFamily: FONT_MONO, fontSize: '11px', padding: '2px 7px', borderRadius: '999px',
                    background: isActive ? (tab.premium ? COLORS.goldDim : COLORS.blueDim) : 'rgba(255,255,255,0.05)',
                    color: isActive ? (tab.premium ? COLORS.gold : COLORS.blue) : COLORS.textFaint,
                    fontWeight: 700
                  }}>{tab.count}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* ===================== PANEL ===================== */}
        <div style={{
          background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: '14px',
          padding: '24px', overflowX: 'auto'
        }} className="nx-scroll">

          {/* ---------- CONTAS / AUDITORIA ---------- */}
          {activeTab === 'contas' && (
            <>
              <PanelToolbar
                searchValue={searchUsers}
                onSearch={setSearchUsers}
                placeholder="Procurar por nome, email ou telefone..."
                filters={[
                  { id: 'todos', label: 'Todos' },
                  { id: 'admin', label: 'Soberanos' },
                  { id: 'profissional', label: 'Stands/Agências' },
                  { id: 'particular', label: 'Particulares' },
                  { id: 'premium', label: 'Premium' },
                ]}
                activeFilter={filterPlano}
                onFilter={setFilterPlano}
                resultCount={utilizadoresFiltrados.length}
                totalCount={utilizadores.length}
              />
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                <thead>
                  <tr style={{ color: COLORS.textFaint, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: `1px solid ${COLORS.border}`, fontFamily: FONT_MONO }}>
                    <th style={{ padding: '10px 12px' }}>Utilizador & Contactos</th>
                    <th style={{ padding: '10px 12px' }}>Tipo de Conta / Plano</th>
                    <th style={{ padding: '10px 12px' }}>Registado a</th>
                    <th style={{ padding: '10px 12px', textAlign: 'right' }}>Ações de Auditoria</th>
                  </tr>
                </thead>
                <tbody>
                  {utilizadoresFiltrados.length === 0 ? (
                    <EmptyRow colSpan={4} text="Nenhum utilizador corresponde aos filtros aplicados." />
                  ) : (
                    utilizadoresFiltrados.map((u, idx) => {
                      const isSoberano = u._id === user?.id || u._id === user?._id;
                      return (
                        <tr key={u._id} className="nx-row" style={{ borderBottom: `1px solid ${COLORS.border}`, color: '#cbd5e1', animationDelay: `${idx * 0.02}s` }}>
                          
                          {/* Coluna 1: Avatar, Nome e Contactos Copiáveis */}
                          <td style={{ padding: '16px 12px' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                              <Avatar nome={u.nome} isSoberano={u.tipo === 'admin'} premium={u.premiumAtivo} />
                              <div>
                                <div style={{ fontWeight: 600, color: '#fff', fontSize: '14px', marginBottom: '6px' }}>{u.nome}</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                  
                                  {/* Botão de Email */}
                                  <button 
                                    className={`contact-badge ${copiadoFeedback === `email-${u._id}` ? 'copied' : ''}`}
                                    onClick={() => copiarParaClipboard(u.email, `email-${u._id}`)}
                                    title="Clique para copiar o email"
                                  >
                                    <Icon path={copiadoFeedback === `email-${u._id}` ? mdiCheck : mdiEmailOutline} size={0.5} />
                                    {u.email}
                                  </button>

                                  {/* Botão de Telefone */}
                                  <button 
                                    className={`contact-badge ${copiadoFeedback === `tel-${u._id}` ? 'copied' : ''}`}
                                    onClick={() => copiarParaClipboard(u.telefone, `tel-${u._id}`)}
                                    title="Clique para copiar o telemóvel"
                                  >
                                    <Icon path={copiadoFeedback === `tel-${u._id}` ? mdiCheck : mdiPhoneOutline} size={0.5} />
                                    {u.telefone || 'Sem número'}
                                  </button>
                                  
                                </div>
                              </div>
                            </div>
                          </td>

                          <td style={{ padding: '16px 12px' }}>
                            <PlanoBadge tipo={u.tipo} premium={u.premiumAtivo} tipoConta={u.tipoConta} />
                          </td>

                          <td style={{ padding: '16px 12px', color: COLORS.textDim, fontSize: '13px', fontFamily: FONT_MONO }}>
                            {u.createdAt ? formatarData(u.createdAt) : '—'}
                          </td>

                          <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                            <Link 
                              to={`/vendedor/${u._id}`} 
                              target="_blank"
                              className="nx-btn"
                              style={{
                                background: 'transparent', border: `1px solid ${COLORS.blue}`,
                                color: COLORS.blue, padding: '7px 13px', borderRadius: '7px',
                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                fontWeight: 700, fontSize: '12px', fontFamily: FONT_MONO, letterSpacing: '0.03em'
                              }}
                            >
                              <Icon path={mdiOpenInNew} size={0.6} /> VER PERFIL
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </>
          )}

          {/* ---------- ANÚNCIOS ---------- */}
          {activeTab === 'anuncios' && (
            <>
              <PanelToolbar
                searchValue={searchAnuncios}
                onSearch={setSearchAnuncios}
                placeholder="Procurar por título ou proprietário..."
                filters={[
                  { id: 'todos', label: 'Todos' },
                  { id: 'carro', label: 'Drive' },
                  { id: 'imovel', label: 'Estate' },
                ]}
                activeFilter={filterTipo}
                onFilter={setFilterTipo}
                resultCount={anunciosFiltrados.length}
                totalCount={anuncios.length}
              />
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
                <thead>
                  <tr style={{ color: COLORS.textFaint, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: `1px solid ${COLORS.border}`, fontFamily: FONT_MONO }}>
                    <th style={{ padding: '10px 12px' }}>Anúncio</th>
                    <th style={{ padding: '10px 12px' }}>Universo</th>
                    <th style={{ padding: '10px 12px' }}>Proprietário</th>
                    <th style={{ padding: '10px 12px', textAlign: 'right' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {anunciosFiltrados.length === 0 ? (
                    <EmptyRow colSpan={4} text="Nenhum anúncio corresponde aos filtros aplicados." />
                  ) : (
                    anunciosFiltrados.map((a, idx) => (
                      <tr key={a._id} className="nx-row" style={{ borderBottom: `1px solid ${COLORS.border}`, color: '#cbd5e1', animationDelay: `${idx * 0.02}s` }}>
                        <td style={{ padding: '14px 12px', fontWeight: 500, color: '#fff', fontSize: '14px' }}>
                          <Link to={`/anuncio/${a._id}`} target="_blank" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ textDecoration: 'underline', textUnderlineOffset: '4px' }}>{a.titulo || 'Anúncio Sem Título'}</span>
                            <Icon path={mdiOpenInNew} size={0.5} color={COLORS.textDim} />
                            {a.destacado && (
                              <span style={{
                                background: COLORS.goldDim, color: COLORS.gold, fontSize: '10px',
                                padding: '3px 7px', borderRadius: '5px', fontWeight: 700, display: 'inline-flex',
                                alignItems: 'center', gap: '4px', fontFamily: FONT_MONO, letterSpacing: '0.05em'
                              }}>
                                <Icon path={mdiStar} size={0.5} color={COLORS.gold} /> DESTACADO
                              </span>
                            )}
                          </Link>
                        </td>
                        <td style={{ padding: '14px 12px' }}>
                          {a.tipo === 'carro'
                            ? <TipoTag color="#2ac1b4" icon={<Icon path={mdiCar} size={0.6} />} label="Drive" />
                            : <TipoTag color="#3ecf8e" icon={<Icon path={mdiHomeOutline} size={0.6} />} label="Estate" />}
                        </td>
                        <td style={{ padding: '14px 12px', color: COLORS.textDim, fontSize: '13px' }}>
                          {a.utilizador?.nome || 'Utilizador Removido'}
                        </td>
                        <td style={{ padding: '14px 12px', textAlign: 'right' }}>
                          <ActionButton
                            onClick={() => apagarAnuncio(a._id, a.titulo)}
                            loading={isDeleting === a._id}
                            color="#f97316"
                            icon={<Icon path={mdiTrashCanOutline} size={0.6} />}
                            label="Eliminar"
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </>
          )}

          {/* ---------- PEDIDOS DE DESTAQUE ---------- */}
          {activeTab === 'pedidos' && (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
              <thead>
                <tr style={{ color: COLORS.textFaint, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: `1px solid ${COLORS.border}`, fontFamily: FONT_MONO }}>
                  <th style={{ padding: '10px 12px' }}>Anúncio Alvo</th>
                  <th style={{ padding: '10px 12px' }}>Proprietário</th>
                  <th style={{ padding: '10px 12px' }}>Método / Referência</th>
                  <th style={{ padding: '10px 12px' }}>Comprovativo</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>Decisão Real</th>
                </tr>
              </thead>
              <tbody>
                {pedidosDestaque.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '48px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                        <Icon path={mdiClockOutline} size={1.5} color={COLORS.textFaint} />
                      </div>
                      <div style={{ color: COLORS.textDim, fontStyle: 'italic', fontSize: '14px' }}>
                        Nenhum pagamento pendente de validação.
                      </div>
                    </td>
                  </tr>
                ) : (
                  pedidosDestaque.map((p, idx) => (
                    <tr key={p._id} className="nx-row" style={{ borderBottom: `1px solid ${COLORS.border}`, color: '#cbd5e1', animationDelay: `${idx * 0.02}s` }}>
                      <td style={{ padding: '16px 12px' }}>
                        <div style={{ fontWeight: 600, color: '#fff', fontSize: '14px' }}>{p.titulo}</div>
                        <div style={{ fontSize: '12px', color: p.tipo === 'carro' ? '#2ac1b4' : '#3ecf8e', marginTop: '2px' }}>
                          {p.tipo === 'carro' ? '🚗 Drive' : '🏠 Estate'} • {p.preco}€
                        </div>
                      </td>
                      <td style={{ padding: '16px 12px' }}>
                        <div style={{ color: '#fff', fontSize: '14px' }}>{p.utilizador?.nome}</div>
                        <div style={{ fontSize: '12px', color: COLORS.textFaint, fontFamily: FONT_MONO }}>{p.utilizador?.email}</div>
                      </td>
                      <td style={{ padding: '16px 12px' }}>
                        <span style={{
                          textTransform: 'uppercase', fontSize: '10px', fontWeight: 800, background: 'rgba(255,255,255,0.04)',
                          padding: '4px 7px', borderRadius: '5px', marginRight: '8px',
                          color: p.pedidoDestaque?.metodo === 'mbway' ? COLORS.green : COLORS.blue,
                          fontFamily: FONT_MONO, letterSpacing: '0.05em'
                        }}>
                          {p.pedidoDestaque?.metodo}
                        </span>
                        <span style={{ fontFamily: FONT_MONO, fontSize: '13px', color: '#fff' }}>
                          {p.pedidoDestaque?.referencia}
                        </span>
                      </td>
                      <td style={{ padding: '16px 12px' }}>
                        {p.pedidoDestaque?.comprovativoUrl ? (
                          <a
                            href={p.pedidoDestaque.comprovativoUrl}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              color: COLORS.blue, textDecoration: 'none', display: 'inline-flex',
                              alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: 500,
                              padding: '5px 10px', borderRadius: '6px', background: COLORS.blueDim,
                              border: `1px solid rgba(91,157,255,0.2)`
                            }}
                          >
                            Abrir Imagem <Icon path={mdiOpenInNew} size={0.6} />
                          </a>
                        ) : (
                          <span style={{ color: COLORS.textFaint, fontSize: '13px', fontStyle: 'italic' }}>Não anexado</span>
                        )}
                      </td>
                      <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <ActionButton
                            onClick={() => aprovarDestaque(p._id, p.titulo)}
                            loading={isDeleting === p._id}
                            color={COLORS.green}
                            solid
                            icon={<Icon path={mdiCheck} size={0.6} />}
                            label="Aprovar"
                          />
                          <ActionButton
                            onClick={() => rejeitarDestaque(p._id)}
                            loading={isDeleting === p._id}
                            color={COLORS.red}
                            icon={<Icon path={mdiClose} size={0.6} />}
                            label="Recusar"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* ===================== FOOTER STRIP ===================== */}
        <div style={{
          marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          color: COLORS.textFaint, fontSize: '12px', fontFamily: FONT_MONO, flexWrap: 'wrap', gap: '8px'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon path={mdiChartTimelineVariant} size={0.6} /> Painel atualizado em tempo real
          </span>
          <span>NOXVELIA &middot; Soberania v2</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                     */
/* ------------------------------------------------------------------ */

function Avatar({ nome, isSoberano, premium }) {
  const inicial = nome ? nome.charAt(0).toUpperCase() : '?';
  let bg = '#1e293b', border = 'transparent';
  if (isSoberano) { bg = 'rgba(239,68,68,0.15)'; border = 'rgba(239,68,68,0.3)'; }
  else if (premium) { bg = 'rgba(167,139,250,0.15)'; border = 'rgba(167,139,250,0.3)'; }
  return (
    <div style={{
      width: '42px', height: '42px', borderRadius: '50%', background: bg, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700,
      fontFamily: FONT_DISPLAY, fontSize: '15px', border: `1px solid ${border}`, flexShrink: 0
    }}>
      {inicial}
    </div>
  );
}

function PlanoBadge({ tipo, premium, tipoConta }) {
  if (tipo === 'admin') {
    return (
      <span style={{
        background: COLORS.redDim, color: COLORS.red, padding: '4px 9px', borderRadius: '5px',
        fontSize: '11px', fontWeight: 700, fontFamily: FONT_MONO, letterSpacing: '0.05em',
        display: 'inline-flex', alignItems: 'center', gap: '5px', border: `1px solid rgba(239,68,68,0.2)`
      }}>
        <Icon path={mdiCrown} size={0.5} /> SOBERANO
      </span>
    );
  }

  return (
    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
      {tipoConta === 'profissional' ? (
        <span style={{
          background: 'rgba(42, 193, 180, 0.1)', color: '#2ac1b4', padding: '4px 9px', borderRadius: '5px',
          fontSize: '11px', fontWeight: 700, fontFamily: FONT_MONO, letterSpacing: '0.05em', border: '1px solid rgba(42, 193, 180, 0.2)'
        }}>
          PROFISSIONAL
        </span>
      ) : (
        <span style={{
          background: 'rgba(255,255,255,0.04)', color: COLORS.textDim, padding: '4px 9px', borderRadius: '5px',
          fontSize: '11px', fontWeight: 700, fontFamily: FONT_MONO, letterSpacing: '0.05em', border: '1px solid rgba(255,255,255,0.1)'
        }}>
          PARTICULAR
        </span>
      )}

      {premium && (
        <span style={{
          background: COLORS.purpleDim, color: COLORS.purple, padding: '4px 9px', borderRadius: '5px',
          fontSize: '11px', fontWeight: 700, fontFamily: FONT_MONO, letterSpacing: '0.05em', border: `1px solid rgba(167,139,250,0.2)`
        }}>
          PREMIUM
        </span>
      )}
    </div>
  );
}

function TipoTag({ color, icon, label }) {
  return (
    <span style={{ color, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600 }}>
      {icon} {label}
    </span>
  );
}

function ActionButton({ onClick, loading, color, icon, label, solid = false }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="nx-btn"
      style={{
        background: solid ? color : 'transparent',
        border: `1px solid ${color}`,
        color: solid ? '#04140f' : color,
        padding: '7px 13px', borderRadius: '7px',
        cursor: loading ? 'not-allowed' : 'pointer',
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        opacity: loading ? 0.5 : 1, fontWeight: 700, fontSize: '12px',
        fontFamily: FONT_MONO, letterSpacing: '0.03em'
      }}
    >
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', animation: 'spin 1s linear infinite' }}>
          <Icon path={mdiLoading} size={0.6} />
        </div>
      ) : icon}
      {label.toUpperCase()}
    </button>
  );
}

function EmptyRow({ colSpan, text }) {
  return (
    <tr>
      <td colSpan={colSpan} style={{ padding: '48px', textAlign: 'center', color: COLORS.textDim, fontSize: '14px' }}>
        {text}
      </td>
    </tr>
  );
}

function PanelToolbar({ searchValue, onSearch, placeholder, filters, activeFilter, onFilter, resultCount, totalCount }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      marginBottom: '18px', gap: '14px', flexWrap: 'wrap'
    }}>
      <div style={{ position: 'relative', flex: '1 1 260px', maxWidth: '360px' }}>
        <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: COLORS.textFaint, display: 'flex', alignItems: 'center' }}>
          <Icon path={mdiMagnify} size={0.7} />
        </div>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={placeholder}
          className="nx-input"
          style={{
            width: '100%', background: COLORS.panelAlt, border: `1px solid ${COLORS.border}`,
            borderRadius: '8px', padding: '9px 12px 9px 36px', color: COLORS.text, fontSize: '13px',
            outline: 'none', fontFamily: FONT_BODY, boxSizing: 'border-box'
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Icon path={mdiFilterVariant} size={0.6} color={COLORS.textFaint} style={{ marginRight: '2px' }} />
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => onFilter(f.id)}
            className="nx-tab"
            style={{
              padding: '6px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 600,
              cursor: 'pointer', border: `1px solid ${activeFilter === f.id ? COLORS.borderStrong : COLORS.border}`,
              background: activeFilter === f.id ? 'rgba(255,255,255,0.06)' : 'transparent',
              color: activeFilter === f.id ? '#fff' : COLORS.textDim
            }}
          >
            {f.label}
          </button>
        ))}
        <span style={{ fontFamily: FONT_MONO, fontSize: '11px', color: COLORS.textFaint, marginLeft: '6px' }}>
          {resultCount}/{totalCount}
        </span>
      </div>
    </div>
  );
}