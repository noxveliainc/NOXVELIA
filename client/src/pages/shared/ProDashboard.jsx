import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@mdi/react';
import {
  mdiAlertCircleOutline, mdiCar, mdiChartBar, mdiCheckCircleOutline, mdiContentCopy,
  mdiCrown, mdiDownload, mdiEmailOutline, mdiEyeOutline, mdiHeartOutline, mdiHomeCityOutline,
  mdiMagnify, mdiOpenInNew, mdiPause, mdiPencil, mdiPhone,
  mdiPlay, mdiPlus, mdiUpload, mdiWhatsapp,
} from '@mdi/js';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import LoadingScreen from '../../components/LoadingScreen';
import { anuncioPath } from '../../utils/seo';
import { getImageUrl } from '../../utils/images';
import './ProDashboard.css';

const n = (valor) => new Intl.NumberFormat('pt-PT').format(Number(valor || 0));
const eur = (valor) => new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(Number(valor || 0));
const dataCurta = (valor) => (valor ? new Date(valor).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' }) : '-');
const filtrosEstado = [['', 'Todos'], ['ativo', 'Ativos'], ['pausado', 'Pausados'], ['vendido', 'Vendidos'], ['pendente', 'Pendentes'], ['expirado', 'Expirados']];
const filtrosTipo = [['', 'Tudo'], ['carro', 'Automóveis'], ['imovel', 'Imóveis']];
const ordenacoes = [['recentes', 'Recentes'], ['contactos', 'Contactos'], ['visitas', 'Visitas'], ['qualidade', 'Qualidade baixa'], ['preco_desc', 'Preço maior'], ['preco_asc', 'Preço menor']];
const statusLabel = { ativo: 'Ativo', pausado: 'Pausado', vendido: 'Vendido', pendente: 'Pendente', expirado: 'Expirado' };

const score100 = (anuncio) => {
  const explicito = Number(anuncio?.scoreQualidade100);
  if (Number.isFinite(explicito) && explicito > 0) return Math.round(explicito);
  const bruto = Number(anuncio?.scoreQualidade || 0);
  return Math.round(bruto <= 10 ? bruto * 10 : bruto);
};

function Trend({ trend, unavailableText = 'sem histórico por período' }) {
  if (!trend) return <small className="pro-trend muted">{unavailableText}</small>;
  if (trend.semBase) return <small className="pro-trend up">↑ novo vs. período anterior</small>;
  const percentagem = Number(trend.percentagem || 0);
  const direction = percentagem > 0 ? 'up' : percentagem < 0 ? 'down' : 'flat';
  const arrow = direction === 'up' ? '↑' : direction === 'down' ? '↓' : '→';
  return <small className={`pro-trend ${direction}`}>{arrow} {Math.abs(percentagem)}% vs. período anterior</small>;
}

function Metric({ icon, label, value, detail, trend, trendUnavailableText, tone = '' }) {
  return (
    <div className={`pro-metric ${tone}`.trim()}>
      <span className="pro-metric-icon"><Icon path={icon} size={0.82} /></span>
      <span className="pro-metric-label">{label}</span>
      <strong>{value}</strong>
      {trend !== undefined ? <Trend trend={trend} unavailableText={trendUnavailableText} /> : detail && <small className="pro-detail">{detail}</small>}
      {trend !== undefined && detail && <small className="pro-detail">{detail}</small>}
    </div>
  );
}

function EmptyState({ title, text, action }) {
  return <div className="pro-empty"><Icon path={mdiAlertCircleOutline} size={1} /><strong>{title}</strong><span>{text}</span>{action}</div>;
}

function StatCell({ label, value, trend }) {
  return <div className="pro-stat-cell"><span>{label}</span><strong>{n(value)}</strong><Trend trend={trend} /></div>;
}

function ChannelCell({ icon, label, value, trend, tone }) {
  return <div className={`pro-channel ${tone}`.trim()}><Icon path={icon} size={0.82} /><span>{label}</span><strong>{n(value)}</strong><Trend trend={trend} /></div>;
}

function QualityCategories({ categorias = [] }) {
  return (
    <div className="pro-quality-categories">
      {categorias.map((categoria) => {
        const percentagem = categoria.max ? Math.round((categoria.pontos / categoria.max) * 100) : 0;
        return (
          <div className="pro-quality-category" key={categoria.key}>
            <div className="pro-quality-category-head"><span>{categoria.label}</span><strong>{categoria.pontos}/{categoria.max}</strong></div>
            <div className="pro-quality-bar"><i style={{ width: `${Math.max(4, percentagem)}%` }} /></div>
            <div className="pro-quality-mini">
              {(categoria.itens || []).map((item) => <em className={item.ok ? 'ok' : 'warn'} key={item.key}>{item.label}</em>)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RankingList({ title, items, valueFor, emptyText }) {
  return (
    <section className="pro-panel">
      <h2>{title}</h2>
      {items?.length ? (
        <div className="pro-ranking-list">
          {items.slice(0, 5).map((anuncio, index) => (
            <Link className="pro-ranking-row" to={anuncioPath(anuncio)} key={anuncio._id}>
              <span className="pro-rank">{index + 1}</span>
              <div>
                <strong>{anuncio.titulo || 'Anúncio sem título'}</strong>
                <span>{valueFor(anuncio)}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : <EmptyState title="Sem dados" text={emptyText} />}
    </section>
  );
}

function QualityList({ items }) {
  return (
    <section className="pro-panel">
      <h2>Anúncios a melhorar</h2>
      {items?.length ? (
        <div className="pro-quality-list">
          {items.map((anuncio) => {
            const qualidade = anuncio.qualidade || {};
            const acoes = qualidade.para90?.acoes || [];
            return (
              <Link className="pro-quality-row" to={`/editar/${anuncio._id}`} key={anuncio._id}>
                <div className="pro-quality-score"><strong>{score100(anuncio)}</strong><span>/100</span></div>
                <div className="pro-quality-main">
                  <strong>{anuncio.titulo || 'Anúncio sem título'}</strong>
                  <span>{qualidade.recomendacao || 'Melhore este anúncio para aumentar a probabilidade de contacto.'}</span>
                  <QualityCategories categorias={qualidade.categorias || []} />
                  <div className="pro-quality-target">
                    <div><span>Como chegar aos 90/100</span><strong>{qualidade.para90?.faltam ? `faltam ${qualidade.para90.faltam} pts` : 'meta atingida'}</strong></div>
                    {acoes.length ? (
                      <div className="pro-quality-actions">
                        {acoes.map((acao) => <em key={`${acao.categoria}-${acao.key}`}>{acao.melhorar}</em>)}
                      </div>
                    ) : <p>Este anúncio já está muito perto do topo.</p>}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : <EmptyState title="Stock bem tratado" text="Não há anúncios prioritários para rever neste momento." />}
    </section>
  );
}

function ContactFunnel({ funil }) {
  const etapas = funil?.etapas || [];
  const canais = etapas.filter((etapa) => ['phone_reveal', 'email_reveal', 'whatsapp_click'].includes(etapa.key));
  const visualizacao = etapas.find((etapa) => etapa.key === 'visualizacao')?.valor || 0;
  const revelou = etapas.find((etapa) => etapa.key === 'contact_reveal')?.valor || 0;
  const contacto = etapas.find((etapa) => etapa.key === 'contacto')?.valor || 0;

  return (
    <section className="pro-panel pro-funnel-panel">
      <div className="pro-panel-head">
        <div>
          <h2>Funil de contacto</h2>
          <p className="pro-note">Últimos 30 dias · conversão {Number(funil?.taxaContacto || 0).toFixed(1)}%</p>
        </div>
      </div>
      <div className="pro-funnel">
        <div className="pro-funnel-step"><span>Visualização</span><strong>{n(visualizacao)}</strong></div>
        <span className="pro-funnel-arrow">→</span>
        <div className="pro-funnel-step"><span>Revelou contacto</span><strong>{n(revelou)}</strong></div>
        <span className="pro-funnel-arrow">→</span>
        <div className="pro-funnel-channels">
          {canais.map((canal) => <div key={canal.key}><span>{canal.label}</span><strong>{n(canal.valor)}</strong></div>)}
        </div>
        <span className="pro-funnel-arrow">→</span>
        <div className="pro-funnel-step"><span>Contacto</span><strong>{n(contacto)}</strong></div>
      </div>
    </section>
  );
}

const estadoPrimario = (estado) => estado === 'ativo'
  ? { estado: 'pausado', label: 'Pausar', icon: mdiPause }
  : { estado: 'ativo', label: 'Ativar', icon: mdiPlay };

export default function ProDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingStock, setLoadingStock] = useState(false);
  const [erro, setErro] = useState('');
  const [selecionados, setSelecionados] = useState([]);
  const [acaoLoading, setAcaoLoading] = useState('');
  const [filtros, setFiltros] = useState({ estado: '', tipo: '', sort: 'recentes', q: '' });
  const [importacao, setImportacao] = useState({ conteudo: '', formato: 'auto', fileName: '', defaultCidade: '', defaultDistrito: '' });
  const [importando, setImportando] = useState(false);
  const [resultadoImportacao, setResultadoImportacao] = useState(null);

  const temPro = dashboard?.temPro || user?.premiumAtivo === true || user?.tipo === 'admin';
  const resumo = dashboard?.resumo || {};
  const metricas = dashboard?.metricas || {};
  const visitas = metricas.visitas || {};
  const contactos = metricas.contactos || {};
  const favoritos = metricas.favoritos || {};
  const canais30 = contactos.canais30Dias || {};
  const canaisComparacao = contactos.canaisComparacao || {};
  const stockResumo = metricas.stock || {};
  const performance = dashboard?.performance || {};
  const melhorar = dashboard?.melhorar || [];
  const maiorBarra = Math.max(...(dashboard?.serieSemanal || []).map((item) => item.visitas || 0), 1);
  const idsStock = useMemo(() => stock.map((item) => item._id), [stock]);
  const todosSelecionados = idsStock.length > 0 && idsStock.every((id) => selecionados.includes(id));

  const carregarDashboard = async () => {
    const { data } = await api.get('/pro/dashboard');
    setDashboard(data);
    return data;
  };
  const carregarStock = async () => {
    setLoadingStock(true);
    try {
      const { data } = await api.get('/pro/stock', { params: filtros });
      setStock(data.anuncios || []);
    } finally {
      setLoadingStock(false);
    }
  };

  useEffect(() => {
    let ativo = true;
    setLoading(true);
    carregarDashboard()
      .then((data) => (ativo && data.temPro ? carregarStock() : null))
      .catch((error) => { if (ativo) setErro(error.response?.data?.erro || 'Não foi possível carregar a área PRO.'); })
      .finally(() => { if (ativo) setLoading(false); });
    return () => { ativo = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!temPro || loading) return undefined;
    const timeout = setTimeout(() => carregarStock().catch(() => setErro('Não foi possível atualizar o stock.')), 180);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros.estado, filtros.tipo, filtros.sort, filtros.q, temPro]);

  const recarregarTudo = async () => Promise.all([carregarDashboard(), carregarStock()]);
  const setFiltro = (campo) => (event) => setFiltros((atual) => ({ ...atual, [campo]: event.target.value }));
  const selecionarTodos = () => setSelecionados(todosSelecionados ? [] : idsStock);
  const alternarSelecao = (id) => setSelecionados((atuais) => atuais.includes(id) ? atuais.filter((item) => item !== id) : [...atuais, id]);

  const atualizarEstado = async (id, estado) => {
    setAcaoLoading(`${id}:${estado}`);
    try {
      await api.patch(`/pro/stock/${id}/estado`, { estado });
      await recarregarTudo();
    } catch (error) {
      alert(error.response?.data?.erro || 'Não foi possível alterar o estado.');
    } finally {
      setAcaoLoading('');
    }
  };
  const duplicarAnuncio = async (id) => {
    setAcaoLoading(`${id}:duplicar`);
    try {
      await api.post(`/pro/stock/${id}/duplicar`);
      await recarregarTudo();
    } catch (error) {
      alert(error.response?.data?.erro || 'Não foi possível duplicar o anúncio.');
    } finally {
      setAcaoLoading('');
    }
  };
  const aplicarBulk = async (estado) => {
    if (!selecionados.length) return;
    setAcaoLoading(`bulk:${estado}`);
    try {
      await api.patch('/pro/stock/bulk', { ids: selecionados, estado });
      setSelecionados([]);
      await recarregarTudo();
    } catch (error) {
      alert(error.response?.data?.erro || 'Não foi possível atualizar os anúncios selecionados.');
    } finally {
      setAcaoLoading('');
    }
  };

  const lerFicheiroImportacao = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const lowerName = file.name.toLowerCase();
    setResultadoImportacao(null);
    if (lowerName.endsWith('.xls') || lowerName.endsWith('.xlsx')) {
      setImportacao((atual) => ({ ...atual, conteudo: '', fileName: file.name, formato: 'auto' }));
      setResultadoImportacao({ tipo: 'excel', mensagem: 'Excel entra pelo fluxo assistido. Usa o botão de avaliação para ficheiros .xls/.xlsx.' });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImportacao((atual) => ({
      ...atual,
      conteudo: String(reader.result || ''),
      fileName: file.name,
      formato: lowerName.endsWith('.csv') ? 'csv' : lowerName.endsWith('.xml') ? 'xml' : lowerName.endsWith('.json') ? 'json' : 'auto',
    }));
    reader.readAsText(file, 'UTF-8');
  };
  const submeterImportacao = async (event) => {
    event.preventDefault();
    if (!importacao.conteudo.trim()) {
      setResultadoImportacao({ tipo: 'erro', mensagem: 'Adiciona CSV, XML ou JSON para importar diretamente.' });
      return;
    }
    setImportando(true);
    setResultadoImportacao(null);
    try {
      const { data } = await api.post('/pro/importar-stock', importacao);
      setResultadoImportacao({ tipo: data.estado, mensagem: `${data.resumo?.criados || 0} criados, ${data.resumo?.atualizados || 0} atualizados, ${data.resumo?.falhados || 0} falhados.` });
      setImportacao({ conteudo: '', formato: 'auto', fileName: '', defaultCidade: '', defaultDistrito: '' });
      await recarregarTudo();
    } catch (error) {
      setResultadoImportacao({ tipo: 'erro', mensagem: error.response?.data?.erro || 'Não foi possível importar o stock.' });
    } finally {
      setImportando(false);
    }
  };

  if (loading) return <LoadingScreen label="A carregar área PRO" detail="A preparar stock, tendências e quality score." minHeight="100vh" tone="light" />;
  if (erro) return <main className="pro-root"><div className="pro-shell"><EmptyState title="Não foi possível abrir a área PRO" text={erro} action={<button className="pro-btn primary" onClick={() => navigate('/perfil')}>Voltar ao perfil</button>} /></div></main>;

  return (
    <main className="pro-root">
      <div className="pro-shell">
        <section className="pro-topbar">
          <div>
            <span className="pro-kicker"><Icon path={mdiCrown} size={0.62} /> NOXVELIA PRO v1.1</span>
            <h1 className="pro-title">Performance com contexto</h1>
            <p className="pro-subtitle">Compara períodos, entende canais de contacto e melhora anúncios até aos 90/100.</p>
          </div>
          <div className="pro-actions"><Link className="pro-btn" to="/perfil">Perfil</Link><Link className="pro-btn" to={`/vendedor/${user?._id || user?.id}`}><Icon path={mdiOpenInNew} size={0.65} /> Montra</Link><Link className="pro-btn gold" to="/publicar"><Icon path={mdiPlus} size={0.7} /> Publicar</Link></div>
        </section>

        {!temPro ? (
          <section className="pro-upgrade">
            <div className="pro-upgrade-main"><span className="pro-kicker"><Icon path={mdiCrown} size={0.62} /> Prévia PRO</span><h2>O teu plano Particular mantém até {dashboard?.plano?.limiteAnunciosAtivos || 5} anúncios ativos.</h2><p className="pro-note">Com PRO desbloqueias tendências vs. período anterior, funil de contacto, ranking de anúncios, quality score 100 e importação direta.</p><div className="pro-upgrade-list"><div className="pro-upgrade-item"><Icon path={mdiChartBar} size={0.7} /> Comparação por período</div><div className="pro-upgrade-item"><Icon path={mdiPhone} size={0.7} /> Contactos por canal</div><div className="pro-upgrade-item"><Icon path={mdiCheckCircleOutline} size={0.7} /> Como chegar aos 90/100</div><div className="pro-upgrade-item"><Icon path={mdiContentCopy} size={0.7} /> Duplicar e pausar stock</div></div></div>
            <div className="pro-panel"><h2>Passar para PRO</h2><p className="pro-note">O checkout continua seguro pela Stripe e a gestão da subscrição fica no portal de faturação.</p><div className="pro-actions" style={{ justifyContent: 'flex-start', marginTop: 16 }}><Link className="pro-btn primary" to="/premium-confirmar">Aderir ao PRO</Link><Link className="pro-btn" to="/planos">Comparar planos</Link></div></div>
          </section>
        ) : (
          <>
            <section className="pro-metrics" aria-label="Resumo PRO v1.1">
              <Metric icon={mdiEyeOutline} label="Visitas" value={n(visitas.trintaDias)} trend={visitas.comparacao?.trintaDias} detail="últimos 30 dias" />
              <Metric icon={mdiPhone} label="Contactos" value={n(contactos.trintaDias)} trend={contactos.comparacao?.trintaDias} detail="últimos 30 dias" tone="gold" />
              <Metric icon={mdiPhone} label="Telefone" value={n(canais30.phone_reveal)} trend={canaisComparacao.phone_reveal} detail="revelações em 30 dias" />
              <Metric icon={mdiEmailOutline} label="Email" value={n(canais30.email_reveal)} trend={canaisComparacao.email_reveal} detail="revelações em 30 dias" />
              <Metric icon={mdiWhatsapp} label="WhatsApp" value={n(canais30.whatsapp_click)} trend={canaisComparacao.whatsapp_click} detail="cliques em 30 dias" />
              <Metric icon={mdiHeartOutline} label="Favoritos" value={n(favoritos.total ?? resumo.guardados)} trend={favoritos.historicoDisponivel ? favoritos.comparacao : null} trendUnavailableText="sem histórico por período" />
            </section>

            <section className="pro-dashboard-grid">
              <section className="pro-panel">
                <h2>Visitas</h2>
                <div className="pro-stat-grid"><StatCell label="Hoje" value={visitas.hoje} trend={visitas.comparacao?.hoje} /><StatCell label="7 dias" value={visitas.seteDias} trend={visitas.comparacao?.seteDias} /><StatCell label="30 dias" value={visitas.trintaDias} trend={visitas.comparacao?.trintaDias} /></div>
                <div className="pro-chart">{(dashboard?.serieSemanal || []).map((dia) => <div className="pro-bar-wrap" key={dia.data} title={`${dia.visitas} visitas`}><div className="pro-bar" style={{ height: `${Math.max((dia.visitas / maiorBarra) * 100, dia.visitas ? 8 : 4)}%`, opacity: dia.visitas ? 1 : 0.28 }} /><span className="pro-bar-label">{dia.label}</span></div>)}</div>
              </section>

              <section className="pro-panel">
                <h2>Contactos</h2>
                <div className="pro-stat-grid"><StatCell label="Hoje" value={contactos.hoje} trend={contactos.comparacao?.hoje} /><StatCell label="7 dias" value={contactos.seteDias} trend={contactos.comparacao?.seteDias} /><StatCell label="30 dias" value={contactos.trintaDias} trend={contactos.comparacao?.trintaDias} /></div>
                <div className="pro-channel-grid"><ChannelCell icon={mdiPhone} label="Telefone" value={canais30.phone_reveal} trend={canaisComparacao.phone_reveal} tone="phone" /><ChannelCell icon={mdiEmailOutline} label="Email" value={canais30.email_reveal} trend={canaisComparacao.email_reveal} tone="email" /><ChannelCell icon={mdiWhatsapp} label="WhatsApp" value={canais30.whatsapp_click} trend={canaisComparacao.whatsapp_click} tone="whatsapp" /></div>
              </section>

              <section className="pro-panel">
                <h2>Stock</h2>
                <div className="pro-stat-grid stock"><StatCell label="Ativos" value={stockResumo.ativos} /><StatCell label="Pausados" value={stockResumo.pausados} /><StatCell label="Vendidos" value={stockResumo.vendidos} /><StatCell label="A melhorar" value={stockResumo.aMelhorar} /></div>
              </section>
            </section>

            <ContactFunnel funil={dashboard?.funil} />

            <section className="pro-performance-grid">
              <RankingList title="Top 5 anúncios" items={performance.topAnuncios || []} valueFor={(anuncio) => `${n(anuncio.contactos)} contactos · ${n(anuncio.visitas)} visitas`} emptyText="Ainda não há dados de performance." />
              <RankingList title="Top 5 por contactos" items={performance.topContactos || []} valueFor={(anuncio) => `${n(anuncio.contactos)} contactos`} emptyText="Os contactos diretos aparecem aqui." />
              <RankingList title="Top 5 por visualizações" items={performance.topVisualizacoes || []} valueFor={(anuncio) => `${n(anuncio.visitas)} visualizações`} emptyText="As visualizações aparecem aqui." />
            </section>

            <section className="pro-layout">
              <div className="pro-panel">
                <div className="pro-panel-head"><div><h2>Gestão de stock</h2><p className="pro-note">{n(resumo.total)} anúncios na carteira. Quality médio: {resumo.qualidadeMedia ? `${resumo.qualidadeMedia}/100` : '-'}</p></div><div className="pro-actions"><Link className="pro-btn" to="/enviar-stock"><Icon path={mdiUpload} size={0.65} /> Excel assistido</Link><a className="pro-btn" href="/templates/importacao-stock-noxvelia.csv" download><Icon path={mdiDownload} size={0.65} /> CSV modelo</a></div></div>
                <div className="pro-filters"><div className="pro-input-wrap"><Icon path={mdiMagnify} size={0.72} /><input className="pro-input with-icon" value={filtros.q} onChange={setFiltro('q')} placeholder="Pesquisar no stock" /></div><select className="pro-select" value={filtros.estado} onChange={setFiltro('estado')}>{filtrosEstado.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><select className="pro-select" value={filtros.tipo} onChange={setFiltro('tipo')}>{filtrosTipo.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><select className="pro-select" value={filtros.sort} onChange={setFiltro('sort')}>{ordenacoes.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div>
                <div className="pro-bulk"><label className="pro-btn"><input className="pro-check" type="checkbox" checked={todosSelecionados} onChange={selecionarTodos} /> Selecionar página</label><span>{selecionados.length ? `${selecionados.length} selecionados` : 'Ações em lote'}</span><div className="pro-actions"><button className="pro-btn" disabled={!selecionados.length || acaoLoading} onClick={() => aplicarBulk('ativo')}><Icon path={mdiPlay} size={0.6} /> Ativar</button><button className="pro-btn" disabled={!selecionados.length || acaoLoading} onClick={() => aplicarBulk('pausado')}><Icon path={mdiPause} size={0.6} /> Pausar</button><button className="pro-btn" disabled={!selecionados.length || acaoLoading} onClick={() => aplicarBulk('vendido')}><Icon path={mdiCheckCircleOutline} size={0.6} /> Vendido</button></div></div>
                {loadingStock ? <EmptyState title="A atualizar stock" text="Só um instante." /> : stock.length ? <div className="pro-stock-list">{stock.map((anuncio) => {
                  const imagem = getImageUrl(anuncio.fotos?.[0], 'medium') || getImageUrl(anuncio.fotos?.[0]);
                  const principal = estadoPrimario(anuncio.estado);
                  const bloqueado = acaoLoading.startsWith(`${anuncio._id}:`);
                  return <article className="pro-stock-row" key={anuncio._id}><input className="pro-check" type="checkbox" checked={selecionados.includes(anuncio._id)} onChange={() => alternarSelecao(anuncio._id)} aria-label={`Selecionar ${anuncio.titulo}`} /><Link className="pro-thumb" to={anuncioPath(anuncio)}>{imagem ? <img src={imagem} alt="" /> : <Icon path={anuncio.tipo === 'carro' ? mdiCar : mdiHomeCityOutline} size={0.9} />}</Link><div className="pro-stock-main"><div className="pro-stock-title"><strong>{anuncio.titulo || 'Anúncio sem título'}</strong><span className={`pro-pill ${anuncio.estado}`.trim()}>{statusLabel[anuncio.estado] || anuncio.estado}</span></div><div className="pro-stock-meta"><span>{eur(anuncio.preco)}</span><span><Icon path={mdiEyeOutline} size={0.55} /> {n(anuncio.visitas)}</span><span><Icon path={mdiPhone} size={0.55} /> {n(anuncio.contactos)}</span><span>{score100(anuncio)}/100</span><span>{dataCurta(anuncio.updatedAt)}</span></div></div><div className="pro-row-actions"><button className="pro-mini-btn" disabled={bloqueado} onClick={() => atualizarEstado(anuncio._id, principal.estado)}><Icon path={principal.icon} size={0.58} /> {principal.label}</button>{anuncio.estado !== 'vendido' && <button className="pro-mini-btn" disabled={bloqueado} onClick={() => atualizarEstado(anuncio._id, 'vendido')}><Icon path={mdiCheckCircleOutline} size={0.58} /> Vendido</button>}<button className="pro-mini-btn" disabled={bloqueado} onClick={() => duplicarAnuncio(anuncio._id)}><Icon path={mdiContentCopy} size={0.58} /></button><Link className="pro-mini-btn" to={`/editar/${anuncio._id}`}><Icon path={mdiPencil} size={0.58} /></Link><Link className="pro-mini-btn" to={anuncioPath(anuncio)}><Icon path={mdiOpenInNew} size={0.58} /></Link></div></article>;
                })}</div> : <EmptyState title="Sem anúncios neste filtro" text="Ajusta os filtros ou publica/importa novo stock." action={<Link className="pro-btn primary" to="/publicar">Publicar anúncio</Link>} />}
              </div>
              <aside className="pro-side">
                <QualityList items={melhorar} />
                <section className="pro-panel"><h2>Importação direta</h2><p className="pro-note">CSV, XML ou JSON. Para Excel, usa avaliação assistida.</p><form className="pro-import-form" onSubmit={submeterImportacao}><label className="pro-file">Ficheiro de stock<input type="file" accept=".csv,.xml,.json,.txt,.xls,.xlsx" onChange={lerFicheiroImportacao} /></label><div className="pro-import-grid"><input className="pro-input" value={importacao.defaultCidade} onChange={(event) => setImportacao((atual) => ({ ...atual, defaultCidade: event.target.value }))} placeholder="Cidade padrão" /><input className="pro-input" value={importacao.defaultDistrito} onChange={(event) => setImportacao((atual) => ({ ...atual, defaultDistrito: event.target.value }))} placeholder="Distrito padrão" /></div><select className="pro-select" value={importacao.formato} onChange={(event) => setImportacao((atual) => ({ ...atual, formato: event.target.value }))}><option value="auto">Detetar formato</option><option value="csv">CSV</option><option value="xml">XML</option><option value="json">JSON</option></select><textarea className="pro-textarea" value={importacao.conteudo} onChange={(event) => setImportacao((atual) => ({ ...atual, conteudo: event.target.value, fileName: atual.fileName || 'paste.txt' }))} placeholder="Ou cola aqui CSV, XML ou JSON" />{resultadoImportacao && <div className={`pro-result ${resultadoImportacao.tipo || ''}`.trim()}>{resultadoImportacao.mensagem}</div>}<button className="pro-btn primary" type="submit" disabled={importando}><Icon path={mdiUpload} size={0.65} /> {importando ? 'A importar...' : 'Importar stock'}</button></form></section>
              </aside>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
