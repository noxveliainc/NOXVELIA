import React, { useCallback, useEffect, useMemo, useState } from 'react';
import api from '../../services/api';

const emptyManualForm = {
  nome: 'Importacao manual de stock',
  utilizador: '',
  formato: 'csv',
  conteudo: '',
  fileName: '',
  defaultDistrito: '',
  defaultCidade: '',
  defaultTelefone: '',
  defaultEmail: '',
};

const emptyForm = {
  nome: '',
  provider: 'mystand',
  utilizador: '',
  feedUrl: '',
  apiToken: '',
  formato: 'auto',
  ativo: true,
  frequenciaHoras: 6,
  defaultDistrito: '',
  defaultCidade: '',
  defaultTelefone: '',
  defaultEmail: '',
};

const formatarData = (value) => {
  if (!value) return 'Nunca';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Nunca';
  return date.toLocaleString('pt-PT', { dateStyle: 'short', timeStyle: 'short' });
};

const estadoLabel = (estado) => ({
  nunca: 'Nunca sincronizado',
  em_execucao: 'A sincronizar',
  sucesso: 'Sincronizado',
  parcial: 'Parcial',
  erro: 'Erro',
}[estado] || 'Nunca sincronizado');

export default function AdminStockIntegrations({ colors, fonts, utilizadores = [] }) {
  const palette = colors || {};
  const typo = fonts || {};
  const [integracoes, setIntegracoes] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncingId, setSyncingId] = useState('');
  const [manualImporting, setManualImporting] = useState(false);
  const [manualForm, setManualForm] = useState(emptyManualForm);
  const [feedback, setFeedback] = useState('');
  const [erro, setErro] = useState('');

  const standsDisponiveis = useMemo(() => utilizadores
    .filter((user) => user.tipo !== 'admin')
    .sort((a, b) => String(a.nome || '').localeCompare(String(b.nome || ''), 'pt-PT')),
  [utilizadores]);

  const carregarIntegracoes = useCallback(async () => {
    setErro('');
    try {
      const { data } = await api.get('/admin/stock-integrations');
      setIntegracoes(Array.isArray(data?.integracoes) ? data.integracoes : []);
    } catch (error) {
      setErro(error.response?.data?.erro || 'Não foi possível carregar integrações de stock.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { carregarIntegracoes(); }, [carregarIntegracoes]);

  const metricas = useMemo(() => integracoes.reduce((acc, item) => {
    const resumo = item.sincronizacao?.ultimoResumo || {};
    return {
      total: acc.total + 1,
      ativas: acc.ativas + (item.ativo ? 1 : 0),
      criados: acc.criados + (resumo.criados || 0),
      atualizados: acc.atualizados + (resumo.atualizados || 0),
      falhados: acc.falhados + (resumo.falhados || 0),
    };
  }, { total: 0, ativas: 0, criados: 0, atualizados: 0, falhados: 0 }), [integracoes]);

  const updateForm = (campo, valor) => setForm((atual) => ({ ...atual, [campo]: valor }));
  const updateManualForm = (campo, valor) => setManualForm((atual) => ({ ...atual, [campo]: valor }));

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId('');
    setFeedback('');
    setErro('');
  };

  const editar = (integracao) => {
    setEditingId(integracao._id);
    setForm({
      nome: integracao.nome || '',
      provider: integracao.provider || 'mystand',
      utilizador: integracao.utilizador?._id || integracao.utilizador || '',
      feedUrl: integracao.feedUrl || '',
      apiToken: '',
      formato: integracao.formato || 'auto',
      ativo: integracao.ativo !== false,
      frequenciaHoras: integracao.frequenciaHoras || 6,
      defaultDistrito: integracao.defaultDistrito || '',
      defaultCidade: integracao.defaultCidade || '',
      defaultTelefone: integracao.defaultTelefone || '',
      defaultEmail: integracao.defaultEmail || '',
    });
    setFeedback(integracao.apiTokenConfigurado ? 'Integração carregada. O token atual está guardado; só escreve novo token se quiseres substituir.' : 'Integração carregada.');
  };


  const inferirFormatoFicheiro = (nome = '') => {
    const lower = String(nome).toLowerCase();
    if (lower.endsWith('.json')) return 'json';
    if (lower.endsWith('.xml')) return 'xml';
    if (lower.endsWith('.csv')) return 'csv';
    return 'auto';
  };

  const lerFicheiroManual = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 6 * 1024 * 1024) {
      setErro('O ficheiro e demasiado grande para importacao direta. Usa um feed URL ou divide o ficheiro.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setManualForm((atual) => ({
        ...atual,
        conteudo: String(reader.result || ''),
        fileName: file.name,
        formato: atual.formato === 'auto' ? inferirFormatoFicheiro(file.name) : atual.formato,
      }));
      setErro('');
      setFeedback(`Ficheiro carregado: ${file.name}`);
    };
    reader.onerror = () => setErro('Nao foi possivel ler o ficheiro selecionado.');
    reader.readAsText(file, 'UTF-8');
  };

  const importarManual = async (event) => {
    event.preventDefault();
    setManualImporting(true);
    setFeedback('');
    setErro('');
    try {
      const payload = {
        ...manualForm,
        conteudo: manualForm.conteudo.trim(),
      };
      const { data } = await api.post('/admin/stock-integrations/manual-import', payload);
      await carregarIntegracoes();
      const resumo = data?.resumo || {};
      setFeedback(`Importacao concluida: ${resumo.criados || 0} criados, ${resumo.atualizados || 0} atualizados, ${resumo.falhados || 0} falhados.`);
      setManualForm({ ...emptyManualForm, utilizador: manualForm.utilizador, defaultDistrito: manualForm.defaultDistrito, defaultCidade: manualForm.defaultCidade, defaultTelefone: manualForm.defaultTelefone, defaultEmail: manualForm.defaultEmail });
    } catch (error) {
      setErro(error.response?.data?.erro || 'Nao foi possivel importar este ficheiro.');
    } finally {
      setManualImporting(false);
    }
  };

  const guardar = async (event) => {
    event.preventDefault();
    setSaving(true);
    setFeedback('');
    setErro('');
    try {
      const payload = { ...form, frequenciaHoras: Number(form.frequenciaHoras || 6) };
      if (editingId && !payload.apiToken) delete payload.apiToken;
      if (editingId) await api.put(`/admin/stock-integrations/${editingId}`, payload);
      else await api.post('/admin/stock-integrations', payload);
      await carregarIntegracoes();
      resetForm();
      setFeedback(editingId ? 'Integração atualizada.' : 'Integração criada.');
    } catch (error) {
      setErro(error.response?.data?.erro || 'Não foi possível guardar a integração.');
    } finally {
      setSaving(false);
    }
  };

  const sincronizar = async (integracao) => {
    setSyncingId(integracao._id);
    setFeedback('');
    setErro('');
    try {
      const { data } = await api.post(`/admin/stock-integrations/${integracao._id}/sync`);
      await carregarIntegracoes();
      const resumo = data?.resumo || {};
      setFeedback(`Sincronização concluída: ${resumo.criados || 0} criados, ${resumo.atualizados || 0} atualizados, ${resumo.pausados || 0} pausados, ${resumo.falhados || 0} falhados.`);
    } catch (error) {
      setErro(error.response?.data?.erro || 'Não foi possível sincronizar este feed.');
    } finally {
      setSyncingId('');
    }
  };

  const desativar = async (integracao) => {
    if (!window.confirm(`Desativar a integração "${integracao.nome}"? Os anúncios já importados não são apagados.`)) return;
    try {
      await api.delete(`/admin/stock-integrations/${integracao._id}`);
      await carregarIntegracoes();
    } catch (error) {
      setErro(error.response?.data?.erro || 'Não foi possível desativar a integração.');
    }
  };

  return (
    <div className="nx-stock-admin">
      <style>{`
        .nx-stock-admin { display: grid; gap: 22px; }
        .nx-stock-intro { display: flex; justify-content: space-between; gap: 18px; align-items: flex-start; flex-wrap: wrap; }
        .nx-stock-intro h2 { margin: 0 0 6px; color: ${palette.text || '#102326'}; font-family: ${typo.display || 'sans-serif'}; font-size: 24px; font-weight: 900; }
        .nx-stock-intro p { margin: 0; color: ${palette.textDim || '#4f646a'}; font-size: 13px; line-height: 1.55; max-width: 780px; }
        .nx-stock-metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; }
        .nx-stock-card { border: 1px solid ${palette.border || '#dfe8e4'}; border-radius: 12px; background: ${palette.panelAlt || '#f8faf7'}; padding: 16px; }
        .nx-stock-card small { display: block; color: ${palette.textDim || '#4f646a'}; font-size: 10px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; font-family: ${typo.mono || 'monospace'}; }
        .nx-stock-card strong { display: block; margin-top: 8px; color: ${palette.text || '#102326'}; font-size: 25px; font-weight: 900; font-family: ${typo.display || 'sans-serif'}; }
        .nx-stock-layout { display: grid; grid-template-columns: minmax(310px, 400px) minmax(0, 1fr); gap: 18px; align-items: start; }

        .nx-stock-manual-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; flex-wrap: wrap; }
        .nx-stock-manual-head h3 { margin: 0 0 6px; color: ${palette.text || '#102326'}; font-family: ${typo.display || 'sans-serif'}; font-size: 20px; font-weight: 900; }
        .nx-stock-manual-head p { margin: 0; color: ${palette.textDim || '#4f646a'}; font-size: 12px; line-height: 1.55; max-width: 760px; }
        .nx-stock-textarea { width: 100%; min-height: 150px; border: 1px solid ${palette.borderStrong || '#b9cac4'}; border-radius: 8px; background: #fff; color: ${palette.text || '#102326'}; padding: 11px; font-size: 12px; font-family: ${typo.mono || 'monospace'}; resize: vertical; box-sizing: border-box; }
        .nx-stock-template { color: ${palette.gold || '#9d7b3f'}; font-size: 12px; font-weight: 900; text-decoration: none; }
        .nx-stock-template:hover { text-decoration: underline; }
        .nx-stock-form { display: grid; gap: 12px; }
        .nx-stock-form label { display: grid; gap: 6px; color: ${palette.textDim || '#4f646a'}; font-size: 11px; font-weight: 900; letter-spacing: .06em; text-transform: uppercase; font-family: ${typo.mono || 'monospace'}; }
        .nx-stock-form input, .nx-stock-form select { min-height: 42px; border: 1px solid ${palette.borderStrong || '#b9cac4'}; border-radius: 8px; background: #fff; color: ${palette.text || '#102326'}; padding: 0 11px; font-size: 13px; font-family: ${typo.body || 'sans-serif'}; box-sizing: border-box; }
        .nx-stock-grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
        .nx-stock-actions { display: flex; gap: 8px; flex-wrap: wrap; }
        .nx-stock-btn { min-height: 38px; display: inline-flex; align-items: center; justify-content: center; border-radius: 8px; border: 1px solid ${palette.borderStrong || '#b9cac4'}; background: #fff; color: ${palette.text || '#102326'}; padding: 0 13px; cursor: pointer; font-size: 12px; font-weight: 850; font-family: ${typo.body || 'sans-serif'}; }
        .nx-stock-btn.primary { background: ${palette.gold || '#9d7b3f'}; border-color: ${palette.gold || '#9d7b3f'}; color: #fffaf0; }
        .nx-stock-btn.danger { color: ${palette.red || '#ef4444'}; border-color: rgba(239,68,68,.35); }
        .nx-stock-list { display: grid; gap: 12px; }
        .nx-stock-row { display: grid; gap: 14px; border: 1px solid ${palette.border || '#dfe8e4'}; border-radius: 12px; padding: 16px; background: #fff; }
        .nx-stock-row-top { display: flex; justify-content: space-between; gap: 14px; align-items: flex-start; flex-wrap: wrap; }
        .nx-stock-row h3 { margin: 0 0 5px; color: ${palette.text || '#102326'}; font-size: 16px; font-weight: 900; }
        .nx-stock-row p { margin: 0; color: ${palette.textDim || '#4f646a'}; font-size: 12px; line-height: 1.45; }
        .nx-stock-chip { display: inline-flex; align-items: center; min-height: 24px; padding: 0 9px; border-radius: 999px; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: .06em; font-family: ${typo.mono || 'monospace'}; }
        .nx-stock-chip.ok { background: ${palette.greenDim || 'rgba(36,184,171,.12)'}; color: ${palette.green || '#168b82'}; }
        .nx-stock-chip.warn { background: ${palette.goldDim || 'rgba(157,123,63,.12)'}; color: ${palette.gold || '#9d7b3f'}; }
        .nx-stock-chip.error { background: ${palette.redDim || 'rgba(239,68,68,.1)'}; color: ${palette.red || '#ef4444'}; }
        .nx-stock-summary { display: grid; grid-template-columns: repeat(5, minmax(80px, 1fr)); gap: 8px; }
        .nx-stock-summary span { border: 1px solid ${palette.border || '#dfe8e4'}; border-radius: 9px; padding: 9px; color: ${palette.textDim || '#4f646a'}; font-size: 11px; }
        .nx-stock-summary strong { display: block; color: ${palette.text || '#102326'}; font-size: 17px; font-family: ${typo.display || 'sans-serif'}; }
        .nx-stock-logs { display: grid; gap: 6px; }
        .nx-stock-log { border-radius: 8px; background: ${palette.panelAlt || '#f8faf7'}; padding: 9px 10px; color: ${palette.textDim || '#4f646a'}; font-size: 11px; }
        .nx-stock-feedback { border-radius: 9px; padding: 11px 12px; font-size: 12px; font-weight: 750; }
        .nx-stock-feedback.ok { background: ${palette.greenDim || 'rgba(36,184,171,.12)'}; color: ${palette.green || '#168b82'}; }
        .nx-stock-feedback.error { background: ${palette.redDim || 'rgba(239,68,68,.1)'}; color: ${palette.red || '#ef4444'}; }
        @media (max-width: 960px) { .nx-stock-layout { grid-template-columns: 1fr; } .nx-stock-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
      `}</style>

      <div className="nx-stock-intro">
        <div>
          <h2>Integrações de stock</h2>
          <p>
            Liga feeds de stands à NOXVELIA. O sistema cria anúncios novos, atualiza anúncios existentes pelo ID externo e pausa automaticamente viaturas removidas do feed.
          </p>
        </div>
      </div>

      <div className="nx-stock-metrics">
        <div className="nx-stock-card"><small>Integrações</small><strong>{metricas.total}</strong></div>
        <div className="nx-stock-card"><small>Ativas</small><strong>{metricas.ativas}</strong></div>
        <div className="nx-stock-card"><small>Criados última sync</small><strong>{metricas.criados}</strong></div>
        <div className="nx-stock-card"><small>Atualizados última sync</small><strong>{metricas.atualizados}</strong></div>
        <div className="nx-stock-card"><small>Falhas última sync</small><strong>{metricas.falhados}</strong></div>
      </div>

      {(feedback || erro) && <div className={`nx-stock-feedback ${erro ? 'error' : 'ok'}`}>{erro || feedback}</div>}


      <form className="nx-stock-card nx-stock-form" onSubmit={importarManual}>
        <div className="nx-stock-manual-head">
          <div>
            <h3>Importacao rapida</h3>
            <p>Importa CSV, XML ou JSON ja exportado por um stand/software. Esta importacao nao corre automaticamente e nao pausa anuncios ausentes.</p>
          </div>
          <a className="nx-stock-template" href="/templates/importacao-stock-noxvelia.csv" download>Descarregar modelo CSV</a>
        </div>
        <div className="nx-stock-grid-2">
          <label>Nome da importacao<input value={manualForm.nome} onChange={(event) => updateManualForm('nome', event.target.value)} /></label>
          <label>Stand associado<select value={manualForm.utilizador} onChange={(event) => updateManualForm('utilizador', event.target.value)} required><option value="">Escolher utilizador</option>{standsDisponiveis.map((stand) => <option key={stand._id} value={stand._id}>{stand.nome} - {stand.email}</option>)}</select></label>
        </div>
        <div className="nx-stock-grid-2">
          <label>Formato<select value={manualForm.formato} onChange={(event) => updateManualForm('formato', event.target.value)}><option value="csv">CSV</option><option value="json">JSON</option><option value="xml">XML</option><option value="auto">Auto</option></select></label>
          <label>Ficheiro<input type="file" accept=".csv,.json,.xml,text/csv,application/json,application/xml,text/xml" onChange={lerFicheiroManual} /></label>
        </div>
        <div className="nx-stock-grid-2">
          <label>Distrito fallback<input value={manualForm.defaultDistrito} onChange={(event) => updateManualForm('defaultDistrito', event.target.value)} placeholder="Porto" /></label>
          <label>Cidade fallback<input value={manualForm.defaultCidade} onChange={(event) => updateManualForm('defaultCidade', event.target.value)} placeholder="Vila Nova de Gaia" /></label>
        </div>
        <div className="nx-stock-grid-2">
          <label>Telefone fallback<input value={manualForm.defaultTelefone} onChange={(event) => updateManualForm('defaultTelefone', event.target.value)} placeholder="912345678" /></label>
          <label>Email fallback<input value={manualForm.defaultEmail} onChange={(event) => updateManualForm('defaultEmail', event.target.value)} placeholder="stock@stand.pt" /></label>
        </div>
        <label>Conteudo colado ou lido do ficheiro<textarea className="nx-stock-textarea" value={manualForm.conteudo} onChange={(event) => updateManualForm('conteudo', event.target.value)} placeholder="id;marca;modelo;ano;km;preco;fotos;cidade;distrito..." required /></label>
        <div className="nx-stock-actions">
          <button className="nx-stock-btn primary" type="submit" disabled={manualImporting}>{manualImporting ? 'A importar...' : 'Importar agora'}</button>
        </div>
      </form>

      <div className="nx-stock-layout">
        <form className="nx-stock-card nx-stock-form" onSubmit={guardar}>
          <label>Nome da integração<input value={form.nome} onChange={(event) => updateForm('nome', event.target.value)} placeholder="Ex: MyStand · Stand Silva" /></label>
          <label>Stand associado<select value={form.utilizador} onChange={(event) => updateForm('utilizador', event.target.value)}><option value="">Escolher utilizador</option>{standsDisponiveis.map((stand) => <option key={stand._id} value={stand._id}>{stand.nome} · {stand.email}</option>)}</select></label>
          <div className="nx-stock-grid-2">
            <label>Provider<select value={form.provider} onChange={(event) => updateForm('provider', event.target.value)}><option value="mystand">MyStand</option><option value="feed_generico">Feed genérico</option></select></label>
            <label>Formato<select value={form.formato} onChange={(event) => updateForm('formato', event.target.value)}><option value="auto">Auto</option><option value="json">JSON</option><option value="xml">XML</option><option value="csv">CSV</option></select></label>
          </div>
          <label>URL do feed<input value={form.feedUrl} onChange={(event) => updateForm('feedUrl', event.target.value)} placeholder="https://..." /></label>
          <label>Token/API key opcional<input value={form.apiToken} onChange={(event) => updateForm('apiToken', event.target.value)} placeholder={editingId ? 'Manter vazio para não alterar' : 'Bearer token ou chave fornecida'} /></label>
          <div className="nx-stock-grid-2">
            <label>Distrito fallback<input value={form.defaultDistrito} onChange={(event) => updateForm('defaultDistrito', event.target.value)} placeholder="Porto" /></label>
            <label>Cidade fallback<input value={form.defaultCidade} onChange={(event) => updateForm('defaultCidade', event.target.value)} placeholder="Vila Nova de Gaia" /></label>
          </div>
          <div className="nx-stock-grid-2">
            <label>Telefone fallback<input value={form.defaultTelefone} onChange={(event) => updateForm('defaultTelefone', event.target.value)} placeholder="912345678" /></label>
            <label>Email fallback<input value={form.defaultEmail} onChange={(event) => updateForm('defaultEmail', event.target.value)} placeholder="stock@stand.pt" /></label>
          </div>
          <div className="nx-stock-grid-2">
            <label>Frequência<select value={form.frequenciaHoras} onChange={(event) => updateForm('frequenciaHoras', event.target.value)}><option value={6}>4x por dia</option><option value={8}>3x por dia</option><option value={12}>2x por dia</option><option value={24}>1x por dia</option></select></label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 9, textTransform: 'none', letterSpacing: 0, fontFamily: typo.body || 'sans-serif' }}>
              <input type="checkbox" checked={form.ativo} onChange={(event) => updateForm('ativo', event.target.checked)} style={{ width: 18, minHeight: 18 }} /> Integração ativa
            </label>
          </div>
          <div className="nx-stock-actions">
            <button className="nx-stock-btn primary" type="submit" disabled={saving}>{saving ? 'A guardar...' : editingId ? 'Guardar alterações' : 'Criar integração'}</button>
            {editingId && <button className="nx-stock-btn" type="button" onClick={resetForm}>Nova integração</button>}
          </div>
        </form>

        <div className="nx-stock-list">
          {loading ? (
            <div className="nx-stock-card">A carregar integrações...</div>
          ) : integracoes.length === 0 ? (
            <div className="nx-stock-card">Ainda não existem feeds configurados.</div>
          ) : integracoes.map((integracao) => {
            const sync = integracao.sincronizacao || {};
            const resumo = sync.ultimoResumo || {};
            const chipClass = sync.estado === 'erro' ? 'error' : sync.estado === 'parcial' ? 'warn' : 'ok';
            return (
              <article className="nx-stock-row" key={integracao._id}>
                <div className="nx-stock-row-top">
                  <div>
                    <h3>{integracao.nome}</h3>
                    <p>{integracao.utilizador?.nome || 'Stand removido'} · {integracao.provider === 'mystand' ? 'MyStand' : 'Feed genérico'} · {integracao.formato.toUpperCase()}</p>
                    <p>{integracao.feedUrl}</p>
                  </div>
                  <span className={`nx-stock-chip ${chipClass}`}>{estadoLabel(sync.estado)}</span>
                </div>
                <div className="nx-stock-summary">
                  <span><strong>{resumo.recebidos || 0}</strong>recebidos</span>
                  <span><strong>{resumo.criados || 0}</strong>criados</span>
                  <span><strong>{resumo.atualizados || 0}</strong>atualizados</span>
                  <span><strong>{resumo.pausados || 0}</strong>pausados</span>
                  <span><strong>{resumo.falhados || 0}</strong>falhados</span>
                </div>
                <p>Última execução: {formatarData(sync.ultimaExecucaoEm)} · Token: {integracao.apiTokenConfigurado ? 'configurado' : 'não configurado'} · Estado: {integracao.ativo ? 'ativo' : 'inativo'}</p>
                {sync.ultimoErro && <div className="nx-stock-log">Último erro: {sync.ultimoErro}</div>}
                {integracao.logsRecentes?.length > 0 && (
                  <div className="nx-stock-logs">
                    {integracao.logsRecentes.map((log) => <div className="nx-stock-log" key={log._id}>{formatarData(log.iniciadoEm)} · {estadoLabel(log.estado)} · {log.resumo?.criados || 0} criados · {log.resumo?.atualizados || 0} atualizados · {log.resumo?.falhados || 0} falhados</div>)}
                  </div>
                )}
                <div className="nx-stock-actions">
                  {integracao.provider !== 'manual' && <button className="nx-stock-btn navy" type="button" onClick={() => sincronizar(integracao)} disabled={syncingId === integracao._id}>{syncingId === integracao._id ? 'A sincronizar...' : 'Sincronizar agora'}</button>}
                  <button className="nx-stock-btn" type="button" onClick={() => editar(integracao)}>Editar</button>
                  <button className="nx-stock-btn danger" type="button" onClick={() => desativar(integracao)}>Desativar</button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
