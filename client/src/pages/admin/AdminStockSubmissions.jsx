import React, { useCallback, useEffect, useMemo, useState } from 'react';
import api from '../../services/api';

const estados = [
  { id: 'todos', label: 'Todos' },
  { id: 'novo', label: 'Novos' },
  { id: 'em_analise', label: 'Em análise' },
  { id: 'importado', label: 'Importados' },
  { id: 'rejeitado', label: 'Rejeitados' },
];

const estadoLabels = {
  novo: 'Novo',
  em_analise: 'Em análise',
  importado: 'Importado',
  rejeitado: 'Rejeitado',
};

export default function AdminStockSubmissions({ colors, fonts }) {
  const c = colors;
  const f = fonts;
  const [pedidos, setPedidos] = useState([]);
  const [estadoFiltro, setEstadoFiltro] = useState('todos');
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [updating, setUpdating] = useState('');
  const [downloading, setDownloading] = useState('');

  const carregar = useCallback(async () => {
    setErro('');
    setLoading(true);
    try {
      const query = estadoFiltro !== 'todos' ? `?estado=${estadoFiltro}` : '';
      const { data } = await api.get(`/stock-submissions/admin${query}`);
      setPedidos(data.pedidos || []);
    } catch (error) {
      setErro(error.response?.data?.erro || 'Erro ao carregar pedidos de stock.');
    } finally {
      setLoading(false);
    }
  }, [estadoFiltro]);

  useEffect(() => { carregar(); }, [carregar]);

  const totais = useMemo(() => pedidos.reduce((acc, item) => {
    acc[item.estado] = (acc[item.estado] || 0) + 1;
    return acc;
  }, {}), [pedidos]);

  const formatarData = (value) => value ? new Date(value).toLocaleString('pt-PT', { dateStyle: 'short', timeStyle: 'short' }) : '-';
  const formatarTamanho = (bytes = 0) => {
    if (!bytes) return '-';
    if (bytes < 1024 * 1024) return `${Math.ceil(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const atualizarEstado = async (id, estado) => {
    setUpdating(`${id}-${estado}`);
    try {
      const { data } = await api.patch(`/stock-submissions/admin/${id}`, { estado });
      setPedidos((atuais) => atuais.map((item) => (item.id === id ? data.pedido : item)));
    } catch (error) {
      alert(error.response?.data?.erro || 'Erro ao atualizar o pedido.');
    } finally {
      setUpdating('');
    }
  };

  const descarregar = async (pedido) => {
    setDownloading(pedido.id);
    try {
      const response = await api.get(`/stock-submissions/admin/${pedido.id}/download`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = pedido.ficheiro?.nomeOriginal || 'stock-noxvelia.csv';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert(error.response?.data?.erro || 'Erro ao descarregar o ficheiro.');
    } finally {
      setDownloading('');
    }
  };

  return (
    <section>
      <style>{`
        .stock-admin-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 18px; flex-wrap: wrap; margin-bottom: 18px; }
        .stock-admin-title { margin: 0; color: ${c.text}; font-family: ${f.display}; font-size: 22px; letter-spacing: -0.02em; }
        .stock-admin-copy { margin: 6px 0 0; color: ${c.textDim}; max-width: 720px; line-height: 1.55; font-size: 14px; }
        .stock-admin-actions { display: flex; gap: 8px; flex-wrap: wrap; }
        .stock-admin-btn { min-height: 38px; display: inline-flex; align-items: center; justify-content: center; gap: 7px; padding: 0 13px; border: 1px solid ${c.border}; border-radius: 9px; background: #fff; color: ${c.text}; font-weight: 800; font-size: 12px; cursor: pointer; text-decoration: none; }
        .stock-admin-btn.primary { border-color: ${c.text}; background: ${c.text}; color: #fff; }
        .stock-admin-btn.gold { border-color: rgba(157,123,63,.28); background: ${c.goldDim}; color: ${c.gold}; }
        .stock-admin-btn:disabled { opacity: .58; cursor: wait; }
        .stock-admin-tabs { display: flex; gap: 7px; margin-bottom: 18px; overflow-x: auto; padding-bottom: 2px; }
        .stock-admin-tab { border: 1px solid ${c.border}; border-radius: 999px; background: #fff; color: ${c.textDim}; padding: 8px 12px; font-weight: 800; font-size: 12px; cursor: pointer; white-space: nowrap; }
        .stock-admin-tab.active { border-color: ${c.borderStrong}; color: ${c.text}; background: ${c.panelAlt}; }
        .stock-admin-grid { display: grid; gap: 12px; }
        .stock-request { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(260px, .8fr) auto; gap: 16px; padding: 16px; border: 1px solid ${c.border}; border-radius: 13px; background: #fff; }
        .stock-request h3 { margin: 8px 0 6px; color: ${c.text}; font-family: ${f.display}; font-size: 17px; }
        .stock-meta { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; color: ${c.textDim}; font-size: 12px; }
        .stock-chip { display: inline-flex; align-items: center; min-height: 26px; padding: 0 9px; border: 1px solid ${c.border}; border-radius: 999px; background: ${c.panelAlt}; color: ${c.textDim}; font-size: 11px; font-weight: 850; }
        .stock-chip.novo { color: ${c.blue}; background: ${c.blueDim}; border-color: rgba(37,99,235,.18); }
        .stock-chip.em_analise { color: ${c.gold}; background: ${c.goldDim}; border-color: rgba(157,123,63,.2); }
        .stock-chip.importado { color: ${c.green}; background: ${c.greenDim}; border-color: rgba(22,139,130,.2); }
        .stock-chip.rejeitado { color: ${c.red}; background: ${c.redDim}; border-color: rgba(239,68,68,.18); }
        .stock-file-line { display: grid; gap: 6px; color: ${c.textDim}; font-size: 13px; }
        .stock-file-line strong { color: ${c.text}; overflow-wrap: anywhere; }
        .stock-request-actions { display: flex; flex-direction: column; gap: 8px; min-width: 150px; }
        .stock-empty { padding: 42px 20px; border: 1px dashed ${c.borderStrong}; border-radius: 13px; text-align: center; color: ${c.textDim}; background: ${c.panelAlt}; }
        @media (max-width: 900px) { .stock-request { grid-template-columns: 1fr; } .stock-request-actions { flex-direction: row; flex-wrap: wrap; } }
      `}</style>

      <div className="stock-admin-head">
        <div>
          <h2 className="stock-admin-title">Pedidos de stock</h2>
          <p className="stock-admin-copy">
            Recebe ficheiros de stands em CSV, Excel, XML ou JSON. Depois descarregas, validas e usas a importação manual em Integrações.
          </p>
        </div>
        <div className="stock-admin-actions">
          <a className="stock-admin-btn" href="/enviar-stock" target="_blank" rel="noreferrer">Abrir página pública</a>
          <a className="stock-admin-btn gold" href="/templates/importacao-stock-noxvelia.csv" download>Modelo CSV</a>
          <button type="button" className="stock-admin-btn primary" onClick={carregar}>Atualizar</button>
        </div>
      </div>

      <div className="stock-admin-tabs">
        {estados.map((item) => (
          <button key={item.id} type="button" className={`stock-admin-tab ${estadoFiltro === item.id ? 'active' : ''}`} onClick={() => setEstadoFiltro(item.id)}>
            {item.label}{item.id !== 'todos' && totais[item.id] ? ` · ${totais[item.id]}` : ''}
          </button>
        ))}
      </div>

      {erro && <div className="stock-empty" style={{ borderColor: c.red, color: c.red }}>{erro}</div>}
      {loading && !erro ? <div className="stock-empty">A carregar pedidos...</div> : null}
      {!loading && !erro && pedidos.length === 0 ? (
        <div className="stock-empty">Ainda não há pedidos de stock. Quando um stand enviar ficheiro, aparece aqui.</div>
      ) : null}

      {!loading && !erro && pedidos.length > 0 ? (
        <div className="stock-admin-grid">
          {pedidos.map((pedido) => (
            <article key={pedido.id} className="stock-request">
              <div>
                <div className={`stock-chip ${pedido.estado}`}>{estadoLabels[pedido.estado] || pedido.estado}</div>
                <h3>{pedido.empresa}</h3>
                <div style={{ color: c.textDim, fontSize: 13, lineHeight: 1.55 }}>
                  {pedido.nome} · {pedido.email}{pedido.telefone ? ` · ${pedido.telefone}` : ''}
                </div>
                {pedido.website && <div style={{ marginTop: 4 }}><a href={pedido.website} target="_blank" rel="noreferrer" style={{ color: c.blue, fontWeight: 800 }}>{pedido.website}</a></div>}
                {pedido.mensagem && <p style={{ margin: '10px 0 0', color: c.textDim, lineHeight: 1.5, fontSize: 13 }}>{pedido.mensagem}</p>}
                <div className="stock-meta">
                  <span>{formatarData(pedido.createdAt)}</span>
                  <span>{pedido.formato?.toUpperCase()}</span>
                </div>
              </div>

              <div className="stock-file-line">
                <span>Ficheiro recebido</span>
                <strong>{pedido.ficheiro?.nomeOriginal || 'Sem nome'}</strong>
                <span>{formatarTamanho(pedido.ficheiro?.tamanho)}</span>
              </div>

              <div className="stock-request-actions">
                <button type="button" className="stock-admin-btn primary" onClick={() => descarregar(pedido)} disabled={downloading === pedido.id}>
                  {downloading === pedido.id ? 'A descarregar...' : 'Descarregar'}
                </button>
                <button type="button" className="stock-admin-btn" onClick={() => atualizarEstado(pedido.id, 'em_analise')} disabled={updating === `${pedido.id}-em_analise`}>Em análise</button>
                <button type="button" className="stock-admin-btn gold" onClick={() => atualizarEstado(pedido.id, 'importado')} disabled={updating === `${pedido.id}-importado`}>Importado</button>
                <button type="button" className="stock-admin-btn" onClick={() => atualizarEstado(pedido.id, 'rejeitado')} disabled={updating === `${pedido.id}-rejeitado`}>Rejeitado</button>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
