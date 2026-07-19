import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import PartnershipEmails from './PartnershipEmails';
import AdminPostImages from './AdminPostImages';
import LoadingScreen from '../../components/LoadingScreen';

import { Icon } from '@mdi/react';
import { 
  mdiAccountMultiple, mdiFileDocumentOutline, mdiCar, mdiHomeOutline, 
  mdiTrashCanOutline, mdiLoading, mdiCheck,
  mdiOpenInNew, mdiCurrencyEur, mdiMagnify, mdiStar,
  mdiAlertOutline, mdiCrown, mdiChartTimelineVariant,
  mdiFilterVariant, mdiPhoneOutline, mdiEmailOutline, mdiRefresh,
  mdiEyeOutline, mdiViewDashboardOutline, mdiImageMultipleOutline
} from '@mdi/js';

/* ------------------------------------------------------------------ */
/* NOXVELIA · Soberania — Admin Command Center                        */
/* Design language: "Mission Control" — deep navy/ink canvas,         */
/* amber sovereign accent, monospace data readouts, hairline grids.  */
/* ------------------------------------------------------------------ */

const COLORS = {
  bg: '#f4f7f3',
  panel: '#ffffff',
  panelAlt: '#f8faf7',
  border: '#dfe8e4',
  borderStrong: '#b9cac4',
  text: '#102326',
  textDim: '#4f646a',
  textFaint: '#7b8b90',
  gold: '#9d7b3f',
  goldDim: 'rgba(157,123,63,0.12)',
  red: '#ef4444',
  redDim: 'rgba(239,68,68,0.1)',
  green: '#168b82',
  greenDim: 'rgba(36,184,171,0.12)',
  blue: '#2563eb',
  blueDim: 'rgba(37,99,235,0.1)',
  purple: '#64748b',
  purpleDim: 'rgba(100,116,139,0.12)',
};

const FONT_DISPLAY = "'Space Grotesk', 'Plus Jakarta Sans', sans-serif";
const FONT_BODY = "'Inter', sans-serif";
const FONT_MONO = "'JetBrains Mono', 'IBM Plex Mono', monospace";

export default function AdminDashboard() {
  const { user, signed } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [funnel, setFunnel] = useState(null);
  const [funnelDays, setFunnelDays] = useState(30);
  const [utilizadores, setUtilizadores] = useState([]);
  const [anuncios, setAnuncios] = useState([]);

  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [activeTab, setActiveTab] = useState('visao-geral');
  const [isDeleting, setIsDeleting] = useState(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(null);
  const [reloading, setReloading] = useState(false);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(null);
  
  // Feedback visual para quando se copia um contacto
  const [copiadoFeedback, setCopiadoFeedback] = useState(null);

  const [searchUsers, setSearchUsers] = useState('');
  const [filterPlano, setFilterPlano] = useState('todos');
  const [searchAnuncios, setSearchAnuncios] = useState('');
  const [filterTipo, setFilterTipo] = useState('todos');

  const carregarQuartelGeneral = useCallback(async (atualizacaoManual = false) => {
    if (atualizacaoManual) setReloading(true);
    setErro('');

    try {
      const [resStats, resUsers, resAnuncios, resFunnel] = await Promise.all([
        api.get('/admin/dashboard/stats'),
        api.get('/admin/utilizadores'),
        api.get('/admin/anuncios'),
        api.get(`/admin/dashboard/funnel?days=${funnelDays}`)
      ]);
      setStats(resStats.data);
      setUtilizadores(resUsers.data);
      setAnuncios(resAnuncios.data);
      setFunnel(resFunnel.data);
      setUltimaAtualizacao(new Date());
    } catch {
      setErro('Não foi possível atualizar os dados operacionais. Tenta novamente.');
    } finally {
      setLoading(false);
      setReloading(false);
    }
  }, [funnelDays]);

  useEffect(() => {
    if (!signed || user?.tipo !== 'admin') {
      navigate('/');
      return;
    }

    carregarQuartelGeneral();
  }, [signed, user, navigate, carregarQuartelGeneral]);

  const alterarPeriodoFunil = (event) => {
    setFunnelDays(Number(event.target.value));
  };

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
        setStats(prev => ({ ...prev, totalAnuncios: prev.totalAnuncios - 1 }));
      } catch (err) {
        alert(err.response?.data?.erro || 'Erro ao eliminar anúncio.');
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const alterarEstadoAnuncio = async (id, estado) => {
    setIsUpdatingStatus(id);
    try {
      await api.put(`/admin/anuncios/${id}/estado`, { estado });
      await carregarQuartelGeneral(true);
    } catch (err) {
      alert(err.response?.data?.erro || 'Erro ao atualizar o estado do anúncio.');
    } finally {
      setIsUpdatingStatus(null);
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
      const matchTipo =
        filterTipo === 'todos' ||
        a.tipo === filterTipo ||
        a.estado === filterTipo;
      return matchSearch && matchTipo;
    });
  }, [anuncios, searchAnuncios, filterTipo]);

  const totalPremium = stats?.premiumAtivos ?? utilizadores.filter(u => u.tipo !== 'admin' && u.premiumAtivo).length;
  const conversao = stats?.totalUsers ? ((totalPremium / stats.totalUsers) * 100).toFixed(1) : '0.0';
  const topAnuncios = stats?.topAnuncios || [];
  const funnelMetric = (key) => funnel?.metricas?.[key] || { total: 0, sessoes: 0 };
  const funnelCards = [
    { key: 'entradas', label: 'Entradas', detail: 'sessões na página', color: COLORS.blue },
    { key: 'pesquisas', label: 'Pesquisas', detail: 'sessões que pesquisaram', color: COLORS.green },
    { key: 'anunciosAbertos', label: 'Anúncios abertos', detail: 'sessões com detalhe', color: COLORS.purple },
    { key: 'cliquesWhatsapp', label: 'Cliques WhatsApp', detail: 'ações de contacto', color: COLORS.gold },
    { key: 'publicacoesIniciadas', label: 'Publicações iniciadas', detail: 'sessões no formulário', color: '#38bdf8' },
    { key: 'publicacoesConcluidas', label: 'Publicações concluídas', detail: 'anúncios criados', color: COLORS.green },
    { key: 'respostasProfissionais', label: 'Respostas profissionais', detail: 'respostas às parcerias', color: '#fb7185' },
  ];
  const formatMetric = (value) => new Intl.NumberFormat('pt-PT').format(value || 0);

  // ---- Loading state ---------------------------------------------------

  if (loading) return (
    <LoadingScreen
      label="A iniciar administração"
      detail="A carregar dados operacionais da NOXVELIA."
      minHeight="100vh"
      tone="light"
    />
  );

  // ---- Render ------------------------------------------------------------

  return (
    <div className="nx-admin-root" style={{
      background: COLORS.bg,
      backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.72), rgba(244,247,243,0))',
      minHeight: '100vh', color: COLORS.text, fontFamily: FONT_BODY, padding: '32px 24px 80px'
    }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .nx-row { animation: fadeUp 0.25s ease both; }
        .nx-row:hover { background: rgba(8,33,38,0.025); }
        .nx-btn { transition: all 0.15s ease; text-decoration: none; }
        .nx-btn:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(0.98); }
        .nx-btn:active:not(:disabled) { transform: translateY(0); }
        .nx-tab { transition: all 0.15s ease; }
        .nx-card { transition: border-color 0.15s ease, transform 0.15s ease; }
        .nx-card:hover { border-color: ${COLORS.borderStrong}; transform: translateY(-2px); }
        .nx-input::placeholder { color: ${COLORS.textFaint}; }
        .nx-scroll::-webkit-scrollbar { height: 6px; width: 6px; }
        .nx-scroll::-webkit-scrollbar-thumb { background: ${COLORS.borderStrong}; border-radius: 3px; }
        .nx-live { animation: pulse 2s ease-in-out infinite; }
        
        .contact-badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 8px; background: #ffffff; border: 1px solid ${COLORS.border}; border-radius: 6px; font-family: ${FONT_MONO}; font-size: 11px; color: ${COLORS.textDim}; cursor: pointer; transition: all 0.2s; }
        .contact-badge:hover { background: ${COLORS.panelAlt}; color: ${COLORS.text}; border-color: ${COLORS.borderStrong}; }
        .contact-badge.copied { background: ${COLORS.greenDim}; color: ${COLORS.green}; border-color: rgba(34,211,165,0.3); }
        .nx-status-chip { display: inline-flex; align-items: center; gap: 5px; padding: 4px 8px; border-radius: 999px; font-family: ${FONT_MONO}; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .05em; }
        .nx-status-chip.ativo { color: ${COLORS.green}; background: ${COLORS.greenDim}; border: 1px solid rgba(34,211,165,.22); }
        .nx-status-chip.pendente { color: ${COLORS.gold}; background: ${COLORS.goldDim}; border: 1px solid rgba(240,180,41,.22); }
        .nx-status-chip.pausado, .nx-status-chip.expirado { color: ${COLORS.textDim}; background: #f2f5f3; border: 1px solid ${COLORS.borderStrong}; }
        .nx-overview-grid { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(320px, .9fr); gap: 18px; }
        .nx-overview-card { border: 1px solid ${COLORS.border}; border-radius: 12px; background: ${COLORS.panelAlt}; padding: 18px; min-width: 0; }
        .nx-overview-title { margin: 0 0 15px; color: ${COLORS.text}; font-family: ${FONT_DISPLAY}; font-size: 16px; }
        .nx-signal-list { display: grid; gap: 10px; }
        .nx-signal { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 12px; border: 1px solid ${COLORS.border}; border-radius: 10px; background: #ffffff; }
        .nx-signal strong { color: ${COLORS.text}; font-size: 13px; }
        .nx-signal span { color: ${COLORS.textDim}; font-size: 12px; }
        .nx-top-list { display: grid; gap: 8px; }
        .nx-top-item { display: grid; grid-template-columns: 34px minmax(0,1fr) auto; gap: 10px; align-items: center; padding: 10px; border-radius: 9px; color: inherit; text-decoration: none; }
        .nx-top-item:hover { background: rgba(8,33,38,.035); }
        .nx-top-rank { width: 34px; height: 34px; border-radius: 9px; display: flex; align-items: center; justify-content: center; color: ${COLORS.gold}; background: ${COLORS.goldDim}; font-family: ${FONT_MONO}; font-weight: 900; }
        .nx-top-copy { min-width: 0; }
        .nx-top-copy strong { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: ${COLORS.text}; font-size: 13px; }
        .nx-top-copy span, .nx-top-metrics { color: ${COLORS.textDim}; font-size: 11px; }
        @media (max-width: 860px) {
          .nx-overview-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .nx-admin-root { padding: 22px 14px 64px !important; }
          .nx-admin-header { align-items: flex-start !important; }
          .nx-admin-title { font-size: 27px !important; }
          .nx-admin-panel { padding: 14px !important; }
          .nx-admin-refresh { width: 100%; justify-content: center; }
          .nx-signal { align-items: flex-start; flex-direction: column; }
          .nx-top-item { grid-template-columns: 34px minmax(0,1fr); }
          .nx-top-metrics { grid-column: 2; }
        }
        @media (max-width: 760px) {
          .nx-admin-panel { overflow-x: visible !important; }
          .nx-admin-table {
            display: block !important;
            width: 100% !important;
            min-width: 0 !important;
          }
          .nx-admin-table thead {
            display: none !important;
          }
          .nx-admin-table tbody {
            display: grid !important;
            gap: 12px !important;
          }
          .nx-admin-table tr {
            display: grid !important;
            gap: 11px !important;
            padding: 14px !important;
            border: 1px solid ${COLORS.border} !important;
            border-radius: 12px !important;
            background: #ffffff !important;
          }
          .nx-admin-table td {
            display: grid !important;
            grid-template-columns: minmax(92px, 0.36fr) minmax(0, 1fr) !important;
            gap: 10px !important;
            align-items: start !important;
            width: 100% !important;
            padding: 0 !important;
            border: 0 !important;
            text-align: left !important;
            white-space: normal !important;
            min-width: 0 !important;
          }
          .nx-admin-table td::before {
            content: attr(data-label);
            color: ${COLORS.textFaint};
            font-family: ${FONT_MONO};
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }
          .nx-admin-table td[colspan] {
            display: block !important;
            text-align: center !important;
            padding: 28px 12px !important;
          }
          .nx-admin-table td[colspan]::before {
            content: none !important;
          }
          .nx-admin-table td > *,
          .nx-admin-table td a,
          .nx-admin-table td button {
            max-width: 100%;
            min-width: 0;
          }
          .nx-admin-table td[data-label="Ações"] > div {
            justify-content: flex-start !important;
          }
          .contact-badge {
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .nx-panel-toolbar {
            display: grid !important;
            grid-template-columns: 1fr !important;
            align-items: stretch !important;
          }
          .nx-panel-search {
            max-width: none !important;
          }
          .nx-filter-row {
            overflow-x: auto;
            flex-wrap: nowrap !important;
            padding-bottom: 4px;
          }
          .nx-filter-row .nx-tab {
            flex: 0 0 auto;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>

        {/* ===================== HEADER ===================== */}
        <div className="nx-admin-header" style={{
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
              Sistema ativo
            </div>
            <h1 className="nx-admin-title" style={{
              margin: 0, fontSize: '34px', fontFamily: FONT_DISPLAY, fontWeight: 700,
              color: COLORS.text, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '12px'
            }}>
              Painel NOXVELIA
              <Icon path={mdiCrown} size={1.2} color={COLORS.gold} />
            </h1>
            <p style={{ margin: '8px 0 0 0', color: COLORS.textDim, fontSize: '14px' }}>
              Bem-vindo ao painel, <span style={{ color: COLORS.text, fontWeight: 600 }}>{user?.nome}</span>.
            </p>
          </div>
          <button
            type="button"
            className="nx-btn nx-admin-refresh"
            onClick={() => carregarQuartelGeneral(true)}
            disabled={reloading}
            style={{
            display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 18px',
            background: COLORS.goldDim, color: COLORS.gold, border: `1px solid rgba(240,180,41,0.25)`,
            borderRadius: '10px', fontSize: '12px', fontWeight: 700, fontFamily: FONT_MONO,
            letterSpacing: '0.08em', textTransform: 'uppercase', cursor: reloading ? 'wait' : 'pointer'
          }}>
            <Icon path={reloading ? mdiLoading : mdiRefresh} size={0.7} style={reloading ? { animation: 'spin 1s linear infinite' } : undefined} />
            {reloading ? 'A atualizar' : 'Atualizar dados'}
          </button>
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
            { label: 'Utilizadores', value: stats?.totalUsers ?? 0, sub: `+${stats?.novosUsers7d ?? 0} nos últimos 7 dias`, color: COLORS.blue, icon: <Icon path={mdiAccountMultiple} size={0.8} /> },
            { label: 'Anúncios ativos', value: stats?.anunciosAtivos ?? 0, sub: `${stats?.anunciosPendentes ?? 0} pendentes`, color: COLORS.purple, icon: <Icon path={mdiFileDocumentOutline} size={0.8} /> },
            { label: 'Visualizações', value: new Intl.NumberFormat('pt-PT').format(stats?.totalVisitas ?? 0), sub: 'interesse acumulado', color: COLORS.blue, icon: <Icon path={mdiEyeOutline} size={0.8} /> },
            { label: 'Drive', value: stats?.carrosAtivos ?? 0, sub: 'carros ativos', color: '#2ac1b4', icon: <Icon path={mdiCar} size={0.8} /> },
            { label: 'Estate', value: stats?.imoveisAtivos ?? 0, sub: 'imóveis ativos', color: '#3ecf8e', icon: <Icon path={mdiHomeOutline} size={0.8} /> },
            { label: 'Receita confirmada', value: `${(stats?.receitaTotal ?? 0).toFixed(2)}€`, sub: `${(stats?.receita30Dias ?? 0).toFixed(2)}€ nos últimos 30 dias`, color: COLORS.gold, icon: <Icon path={mdiCurrencyEur} size={0.8} /> },
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
              <div style={{ fontSize: '26px', fontWeight: 800, color: COLORS.text, fontFamily: FONT_DISPLAY, marginBottom: '4px' }}>
                {m.value}
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textDim }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* ===================== TABS ===================== */}
        <div style={{
          display: 'flex', gap: '6px', marginBottom: '20px', borderBottom: `1px solid ${COLORS.border}`,
          paddingBottom: '0px', overflowX: 'auto'
        }}>
          {[
            { id: 'visao-geral', label: 'Visão geral', icon: <Icon path={mdiViewDashboardOutline} size={0.7} /> },
            { id: 'contas', label: 'Gestão & Auditoria', icon: <Icon path={mdiAccountMultiple} size={0.7} />, count: utilizadores.length },
            { id: 'anuncios', label: 'Moderação de Anúncios', icon: <Icon path={mdiFileDocumentOutline} size={0.7} />, count: anuncios.length },
            { id: 'criativos', label: 'Criativos', icon: <Icon path={mdiImageMultipleOutline} size={0.7} /> },
            { id: 'parcerias', label: 'Emails de Parcerias', icon: <Icon path={mdiEmailOutline} size={0.7} /> },
            { id: 'funil', label: 'Funil', icon: <Icon path={mdiChartTimelineVariant} size={0.7} /> },
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
                  color: isActive ? (tab.premium ? COLORS.gold : COLORS.text) : COLORS.textFaint,
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
                    background: isActive ? (tab.premium ? COLORS.goldDim : COLORS.blueDim) : 'rgba(8,33,38,0.05)',
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
        }} className="nx-scroll nx-admin-panel">

          {activeTab === 'visao-geral' && (
            <div className="nx-overview-grid">
              <section className="nx-overview-card">
                <h2 className="nx-overview-title">Prioridades operacionais</h2>
                <div className="nx-signal-list">
                  <button
                    type="button"
                    className="nx-signal nx-btn"
                    onClick={() => { setFilterTipo('pendente'); setActiveTab('anuncios'); }}
                    style={{ width: '100%', cursor: 'pointer', textAlign: 'left' }}
                  >
                    <div>
                      <strong>Anúncios pendentes</strong>
                      <span style={{ display: 'block', marginTop: 3 }}>Rever conteúdo ainda marcado como pendente.</span>
                    </div>
                    <span className="nx-status-chip pendente">{stats?.anunciosPendentes ?? 0}</span>
                  </button>
                  <button
                    type="button"
                    className="nx-signal nx-btn"
                    onClick={() => { setFilterTipo('pausado'); setActiveTab('anuncios'); }}
                    style={{ width: '100%', cursor: 'pointer', textAlign: 'left' }}
                  >
                    <div>
                      <strong>Anúncios pausados</strong>
                      <span style={{ display: 'block', marginTop: 3 }}>Monitorizar inventário temporariamente indisponível.</span>
                    </div>
                    <span className="nx-status-chip pausado">{stats?.anunciosPausados ?? 0}</span>
                  </button>
                  <div className="nx-signal">
                    <div>
                      <strong>Base profissional e premium</strong>
                      <span style={{ display: 'block', marginTop: 3 }}>{stats?.profissionais ?? 0} profissionais · {totalPremium} premium</span>
                    </div>
                    <span>{conversao}% conversão</span>
                  </div>
                  <div className="nx-signal">
                    <div>
                      <strong>Pagamentos por confirmar</strong>
                      <span style={{ display: 'block', marginTop: 3 }}>Registos de pagamento que exigem acompanhamento.</span>
                    </div>
                    <span className={`nx-status-chip ${(stats?.pagamentosPendentes ?? 0) > 0 ? 'pendente' : 'ativo'}`}>
                      {stats?.pagamentosPendentes ?? 0}
                    </span>
                  </div>
                </div>
              </section>

              <section className="nx-overview-card">
                <h2 className="nx-overview-title">Anúncios com mais alcance</h2>
                {topAnuncios.length > 0 ? (
                  <div className="nx-top-list">
                    {topAnuncios.map((anuncio, index) => (
                      <Link key={anuncio._id} to={`/anuncio/${anuncio._id}`} className="nx-top-item">
                        <span className="nx-top-rank">{index + 1}</span>
                        <span className="nx-top-copy">
                          <strong>{anuncio.titulo}</strong>
                          <span>{anuncio.tipo === 'carro' ? 'Drive' : 'Estate'} · {anuncio.utilizador?.nome || 'Sem proprietário'}</span>
                        </span>
                        <span className="nx-top-metrics">{anuncio.visitas || 0} visitas · {anuncio.guardados || 0} favoritos</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div style={{ color: COLORS.textDim, fontSize: 13, padding: '28px 0' }}>Ainda não existem anúncios ativos com dados de alcance.</div>
                )}
              </section>
            </div>
          )}

          {activeTab === 'funil' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap', marginBottom: '22px' }}>
                <div>
                  <h2 className="nx-overview-title" style={{ marginBottom: '6px' }}>Funil de crescimento</h2>
                  <p style={{ margin: 0, color: COLORS.textDim, fontSize: '13px', lineHeight: 1.5, maxWidth: '720px' }}>
                    Últimos {funnel?.periodo?.dias || 30} dias. As entradas e etapas mostram sessões anónimas únicas; as ações mostram o total registado.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <select value={funnelDays} onChange={alterarPeriodoFunil} style={{ minHeight: '34px', padding: '0 10px', color: COLORS.text, background: COLORS.panelAlt, border: `1px solid ${COLORS.borderStrong}`, borderRadius: '8px', fontSize: '12px' }} aria-label="Período do funil">
                    <option value="7">Últimos 7 dias</option>
                    <option value="30">Últimos 30 dias</option>
                    <option value="90">Últimos 90 dias</option>
                  </select>
                  <span className="nx-status-chip ativo">Medição ativa</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '22px' }}>
                {funnelCards.map((card) => {
                  const value = funnelMetric(card.key);
                  return (
                    <div key={card.key} className="nx-card" style={{ background: COLORS.panelAlt, border: `1px solid ${COLORS.border}`, borderRadius: '12px', padding: '15px', borderTop: `2px solid ${card.color}` }}>
                      <div style={{ color: COLORS.textDim, fontSize: '10px', fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '.08em' }}>{card.label}</div>
                      <div style={{ color: COLORS.text, fontSize: '25px', fontFamily: FONT_DISPLAY, fontWeight: 800, marginTop: '10px' }}>{formatMetric(value.sessoes)}</div>
                      <div style={{ color: COLORS.textDim, fontSize: '11px', marginTop: '3px' }}>{card.detail} · {formatMetric(value.total)} ações</div>
                    </div>
                  );
                })}
              </div>

              <div className="nx-overview-grid">
                <section className="nx-overview-card">
                  <h3 className="nx-overview-title">Conversões entre etapas</h3>
                  <div className="nx-signal-list">
                    {[
                      ['Entrada → pesquisa', funnel?.conversoes?.entradaParaPesquisa],
                      ['Pesquisa → anúncio', funnel?.conversoes?.pesquisaParaAnuncio],
                      ['Anúncio → WhatsApp', funnel?.conversoes?.anuncioParaWhatsapp],
                      ['Publicação iniciada → concluída', funnel?.conversoes?.inicioParaConclusao],
                    ].map(([label, value]) => (
                      <div className="nx-signal" key={label}>
                        <span>{label}</span>
                        <strong style={{ color: COLORS.green }}>{Number(value || 0).toFixed(1)}%</strong>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="nx-overview-card">
                  <h3 className="nx-overview-title">Leitura comercial</h3>
                  <div className="nx-signal-list">
                    <div className="nx-signal"><span>Profissionais contactados</span><strong>{formatMetric(funnelMetric('profissionaisContactados').total)}</strong></div>
                    <div className="nx-signal"><span>Respostas recebidas</span><strong>{formatMetric(funnelMetric('respostasProfissionais').total)}</strong></div>
                    <p style={{ margin: '4px 0 0', color: COLORS.textDim, fontSize: '12px', lineHeight: 1.5 }}>
                      As respostas de profissionais vêm da caixa de parcerias já integrada.
                    </p>
                  </div>
                </section>
              </div>

              <section className="nx-overview-card" style={{ marginTop: '18px' }}>
                <h3 className="nx-overview-title">Evolução diária</h3>
                <div className="nx-scroll" style={{ overflowX: 'auto' }}>
                  <table className="nx-admin-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '760px', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ color: COLORS.textFaint, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.08em', fontFamily: FONT_MONO }}>
                        {['Dia', 'Entradas', 'Pesquisas', 'Anúncios', 'WhatsApp', 'Publicações', 'Concluídas'].map((label) => <th key={label} style={{ padding: '10px 8px', borderBottom: `1px solid ${COLORS.border}` }}>{label}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {(funnel?.diario || []).slice(-14).reverse().map((day) => (
                        <tr key={day.data} style={{ borderBottom: `1px solid ${COLORS.border}`, color: COLORS.textDim, fontSize: '12px' }}>
                          <td data-label="Dia" style={{ padding: '10px 8px', color: COLORS.text, fontFamily: FONT_MONO }}>{day.data}</td>
                          <td data-label="Entradas" style={{ padding: '10px 8px' }}>{formatMetric(day.landing_view?.sessoes)}</td>
                          <td data-label="Pesquisas" style={{ padding: '10px 8px' }}>{formatMetric(day.search_start?.sessoes)}</td>
                          <td data-label="Anúncios" style={{ padding: '10px 8px' }}>{formatMetric(day.listing_view?.sessoes)}</td>
                          <td data-label="WhatsApp" style={{ padding: '10px 8px' }}>{formatMetric(day.whatsapp_click?.total)}</td>
                          <td data-label="Publicações" style={{ padding: '10px 8px' }}>{formatMetric(day.publish_start?.sessoes)}</td>
                          <td data-label="Concluídas" style={{ padding: '10px 8px' }}>{formatMetric(day.publish_complete?.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}

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
              <table className="nx-admin-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
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
                      const contactoAdminOculto = u.tipo === 'admin';
                      return (
                        <tr key={u._id} className="nx-row" style={{ borderBottom: `1px solid ${COLORS.border}`, color: COLORS.textDim, animationDelay: `${idx * 0.02}s` }}>
                          
                          {/* Coluna 1: Avatar, Nome e Contactos Copiáveis */}
                          <td data-label="Utilizador" style={{ padding: '16px 12px' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                              <Avatar nome={u.nome} isSoberano={u.tipo === 'admin'} premium={u.premiumAtivo} />
                              <div>
                                <div style={{ fontWeight: 700, color: COLORS.text, fontSize: '14px', marginBottom: '6px' }}>{u.nome}</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                  
                                  {contactoAdminOculto ? (
                                    <span className="contact-badge" title="Contacto de conta admin oculto">
                                      <Icon path={mdiAlertOutline} size={0.5} />
                                      Contacto admin oculto
                                    </span>
                                  ) : (
                                    <>
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
                                    </>
                                  )}
                                  
                                </div>
                              </div>
                            </div>
                          </td>

                          <td data-label="Plano" style={{ padding: '16px 12px' }}>
                            <PlanoBadge tipo={u.tipo} premium={u.premiumAtivo} tipoConta={u.tipoConta} />
                          </td>

                          <td data-label="Registo" style={{ padding: '16px 12px', color: COLORS.textDim, fontSize: '13px', fontFamily: FONT_MONO }}>
                            {u.createdAt ? formatarData(u.createdAt) : '—'}
                          </td>

                          <td data-label="Ações" style={{ padding: '16px 12px', textAlign: 'right' }}>
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
                  { id: 'ativo', label: 'Ativos' },
                  { id: 'pendente', label: 'Pendentes' },
                  { id: 'pausado', label: 'Pausados' },
                ]}
                activeFilter={filterTipo}
                onFilter={setFilterTipo}
                resultCount={anunciosFiltrados.length}
                totalCount={anuncios.length}
              />
              <table className="nx-admin-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '820px' }}>
                <thead>
                  <tr style={{ color: COLORS.textFaint, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: `1px solid ${COLORS.border}`, fontFamily: FONT_MONO }}>
                    <th style={{ padding: '10px 12px' }}>Anúncio</th>
                    <th style={{ padding: '10px 12px' }}>Área / Estado</th>
                    <th style={{ padding: '10px 12px' }}>Proprietário</th>
                    <th style={{ padding: '10px 12px' }}>Interação</th>
                    <th style={{ padding: '10px 12px' }}>Publicado</th>
                    <th style={{ padding: '10px 12px', textAlign: 'right' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {anunciosFiltrados.length === 0 ? (
                    <EmptyRow colSpan={6} text="Nenhum anúncio corresponde aos filtros aplicados." />
                  ) : (
                    anunciosFiltrados.map((a, idx) => (
                      <tr key={a._id} className="nx-row" style={{ borderBottom: `1px solid ${COLORS.border}`, color: COLORS.textDim, animationDelay: `${idx * 0.02}s` }}>
                        <td data-label="Anúncio" style={{ padding: '14px 12px', fontWeight: 500, color: COLORS.text, fontSize: '14px' }}>
                          <Link to={`/anuncio/${a._id}`} target="_blank" rel="noreferrer" style={{ color: COLORS.text, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
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
                        <td data-label="Estado" style={{ padding: '14px 12px' }}>
                          <div style={{ display: 'grid', gap: 7 }}>
                            {a.tipo === 'carro'
                              ? <TipoTag color="#2ac1b4" icon={<Icon path={mdiCar} size={0.6} />} label="Drive" />
                              : <TipoTag color="#3ecf8e" icon={<Icon path={mdiHomeOutline} size={0.6} />} label="Estate" />}
                            <span className={`nx-status-chip ${a.estado || 'pendente'}`}>{a.estado || 'pendente'}</span>
                          </div>
                        </td>
                        <td data-label="Proprietário" style={{ padding: '14px 12px', color: COLORS.textDim, fontSize: '13px' }}>
                          {a.utilizador?.nome || 'Utilizador Removido'}
                        </td>
                        <td data-label="Interação" style={{ padding: '14px 12px', color: COLORS.textDim, fontSize: '12px', fontFamily: FONT_MONO, whiteSpace: 'nowrap' }}>
                          {a.visitas || 0} visitas<br />{a.guardados || 0} favoritos · {a.contactos || 0} contactos
                        </td>
                        <td data-label="Publicado" style={{ padding: '14px 12px', color: COLORS.textDim, fontSize: '12px', fontFamily: FONT_MONO, whiteSpace: 'nowrap' }}>
                          {a.createdAt ? formatarData(a.createdAt) : '—'}
                        </td>
                        <td data-label="Ações" style={{ padding: '14px 12px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, flexWrap: 'wrap' }}>
                            {a.estado !== 'ativo' ? (
                              <ActionButton
                                onClick={() => alterarEstadoAnuncio(a._id, 'ativo')}
                                loading={isUpdatingStatus === a._id}
                                color={COLORS.green}
                                icon={<Icon path={mdiCheck} size={0.6} />}
                                label="Ativar"
                                solid
                              />
                            ) : (
                              <ActionButton
                                onClick={() => alterarEstadoAnuncio(a._id, 'pausado')}
                                loading={isUpdatingStatus === a._id}
                                color={COLORS.textDim}
                                icon={<Icon path={mdiAlertOutline} size={0.6} />}
                                label="Pausar"
                              />
                            )}
                            <ActionButton
                              onClick={() => apagarAnuncio(a._id, a.titulo)}
                              loading={isDeleting === a._id}
                              color="#f97316"
                              icon={<Icon path={mdiTrashCanOutline} size={0.6} />}
                              label="Eliminar"
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </>
          )}

          {activeTab === 'parcerias' && (
            <PartnershipEmails colors={COLORS} fonts={{ display: FONT_DISPLAY, body: FONT_BODY, mono: FONT_MONO }} />
          )}

          {activeTab === 'criativos' && (
            <AdminPostImages anuncios={anuncios} colors={COLORS} fonts={{ display: FONT_DISPLAY, body: FONT_BODY, mono: FONT_MONO }} />
          )}
        </div>

        {/* ===================== FOOTER STRIP ===================== */}
        <div style={{
          marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          color: COLORS.textFaint, fontSize: '12px', fontFamily: FONT_MONO, flexWrap: 'wrap', gap: '8px'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon path={mdiChartTimelineVariant} size={0.6} />
            {ultimaAtualizacao
              ? `Última atualização às ${ultimaAtualizacao.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}`
              : 'Dados operacionais'}
          </span>
          <span>NOXVELIA &middot; Administração</span>
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
  let bg = '#e8f0ed', border = COLORS.border, color = COLORS.text;
  if (isSoberano) { bg = 'rgba(239,68,68,0.15)'; border = 'rgba(239,68,68,0.3)'; }
  else if (premium) { bg = COLORS.purpleDim; border = 'rgba(100,116,139,0.28)'; color = COLORS.purple; }
  return (
    <div style={{
      width: '42px', height: '42px', borderRadius: '50%', background: bg, color,
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
          background: '#f5f7f6', color: COLORS.textDim, padding: '4px 9px', borderRadius: '5px',
          fontSize: '11px', fontWeight: 700, fontFamily: FONT_MONO, letterSpacing: '0.05em', border: `1px solid ${COLORS.border}`
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
        color: solid ? '#ffffff' : color,
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
    <div className="nx-panel-toolbar" style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      marginBottom: '18px', gap: '14px', flexWrap: 'wrap'
    }}>
      <div className="nx-panel-search" style={{ position: 'relative', flex: '1 1 260px', maxWidth: '360px' }}>
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
      <div className="nx-filter-row" style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Icon path={mdiFilterVariant} size={0.6} color={COLORS.textFaint} style={{ marginRight: '2px' }} />
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => onFilter(f.id)}
            className="nx-tab"
            style={{
              padding: '6px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 600,
              cursor: 'pointer', border: `1px solid ${activeFilter === f.id ? COLORS.borderStrong : COLORS.border}`,
              background: activeFilter === f.id ? COLORS.panelAlt : 'transparent',
              color: activeFilter === f.id ? COLORS.text : COLORS.textDim
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
