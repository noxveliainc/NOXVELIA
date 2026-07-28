import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import api from '../../services/api';

const POSICOES = [
  { id: 'listagem_topo_carros', label: 'Topo da listagem de automóveis' },
  { id: 'feed_pesquisa_carros', label: 'Feed de automóveis, a cada 6 anúncios' },
  { id: 'listagem_fundo_carros', label: 'Fundo da listagem de automóveis' },
  { id: 'listagem_topo_imoveis', label: 'Topo da listagem de imóveis' },
  { id: 'feed_pesquisa_imoveis', label: 'Feed de imóveis, a cada 6 anúncios' },
  { id: 'listagem_fundo_imoveis', label: 'Fundo da listagem de imóveis' },
  { id: 'detalhe_sidebar', label: 'Barra lateral do detalhe' },
  { id: 'detalhe_sugestoes', label: 'Antes das sugestões no detalhe' },
  { id: 'landing_between_highlights', label: 'Landing, zona intermédia' },
];

const emptyForm = {
  titulo: '',
  imagemUrl: '',
  linkDestino: '',
  posicao: 'listagem_topo_carros',
  vertical: 'todos',
  ativo: true,
  ativoAte: '',
};

const formatDateInput = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
};

const posicaoLabel = (posicao) => POSICOES.find((item) => item.id === posicao)?.label || posicao;

export default function AdminBanners({ colors, fonts }) {
  const fileRef = useRef(null);
  const [banners, setBanners] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [erro, setErro] = useState('');
  const [agoraMs, setAgoraMs] = useState(0);

  const palette = colors || {};
  const typo = fonts || {};

  const carregarBanners = useCallback(async () => {
    setErro('');
    try {
      const { data } = await api.get('/admin/banners');
      setBanners(Array.isArray(data?.banners) ? data.banners : []);
    } catch (error) {
      setErro(error.response?.data?.erro || 'Não foi possível carregar os banners.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setAgoraMs(Date.now());
    carregarBanners();
  }, [carregarBanners]);

  const metricas = useMemo(() => banners.reduce((acc, banner) => ({
    total: acc.total + 1,
    ativos: acc.ativos + (banner.ativo ? 1 : 0),
    visualizacoes: acc.visualizacoes + (banner.visualizacoes || 0),
    cliques: acc.cliques + (banner.cliques || 0),
  }), { total: 0, ativos: 0, visualizacoes: 0, cliques: 0 }), [banners]);

  const updateForm = (campo, valor) => {
    setForm((atual) => ({ ...atual, [campo]: valor }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId('');
    setFeedback('');
    setErro('');
  };

  const editarBanner = (banner) => {
    setEditingId(banner._id);
    setForm({
      titulo: banner.titulo || '',
      imagemUrl: banner.imagemUrl || '',
      linkDestino: banner.linkDestino || '',
      posicao: banner.posicao || 'listagem_topo_carros',
      vertical: banner.vertical || 'todos',
      ativo: banner.ativo !== false,
      ativoAte: formatDateInput(banner.ativoAte),
    });
    setFeedback('Campanha carregada para edição.');
  };

  const guardarBanner = async (event) => {
    event.preventDefault();
    setSaving(true);
    setErro('');
    setFeedback('');

    try {
      const payload = {
        ...form,
        ativoAte: form.ativoAte || null,
      };
      const request = editingId
        ? api.put(`/admin/banners/${editingId}`, payload)
        : api.post('/admin/banners', payload);
      await request;
      await carregarBanners();
      const mensagem = editingId ? 'Campanha atualizada.' : 'Campanha criada.';
      resetForm();
      setFeedback(mensagem);
    } catch (error) {
      setErro(error.response?.data?.erro || 'Não foi possível guardar a campanha.');
    } finally {
      setSaving(false);
    }
  };

  const apagarBanner = async (banner) => {
    if (!window.confirm(`Apagar a campanha "${banner.titulo}"?`)) return;
    try {
      await api.delete(`/admin/banners/${banner._id}`);
      setBanners((atuais) => atuais.filter((item) => item._id !== banner._id));
      if (editingId === banner._id) resetForm();
    } catch (error) {
      setErro(error.response?.data?.erro || 'Não foi possível apagar a campanha.');
    }
  };

  const alternarAtivo = async (banner) => {
    try {
      const payload = {
        titulo: banner.titulo,
        imagemUrl: banner.imagemUrl,
        linkDestino: banner.linkDestino,
        posicao: banner.posicao,
        vertical: banner.vertical || 'todos',
        ativo: !banner.ativo,
        ativoAte: banner.ativoAte || null,
      };
      await api.put(`/admin/banners/${banner._id}`, payload);
      await carregarBanners();
    } catch (error) {
      setErro(error.response?.data?.erro || 'Não foi possível alterar o estado.');
    }
  };

  const uploadImagem = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('imagens', file);
    formData.append('kind', 'cover');
    formData.append('altText', form.titulo || 'Banner publicitário Noxvelia');

    setUploading(true);
    setErro('');
    try {
      const { data } = await api.post('/upload/imagens', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (data?.url) {
        updateForm('imagemUrl', data.url);
        setFeedback('Imagem carregada e aplicada à campanha.');
      }
    } catch (error) {
      setErro(error.response?.data?.erro || 'Não foi possível carregar a imagem.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const statusCampanha = (banner) => {
    if (!banner.ativo) return { label: 'Pausada', color: palette.textFaint || '#64748b' };
    if (agoraMs > 0 && banner.ativoAte && new Date(banner.ativoAte).getTime() < agoraMs) return { label: 'Expirada', color: palette.red || '#ef4444' };
    return { label: 'Ativa', color: palette.green || '#168b82' };
  };

  return (
    <div className="nx-banners-admin">
      <style>{`
        .nx-banners-admin { display: grid; gap: 22px; }
        .nx-banners-metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; }
        .nx-banners-card { border: 1px solid ${palette.border || '#dfe8e4'}; border-radius: 12px; background: ${palette.panelAlt || '#f8faf7'}; padding: 16px; }
        .nx-banners-card small { display: block; color: ${palette.textDim || '#4f646a'}; font-size: 10px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; font-family: ${typo.mono || 'monospace'}; }
        .nx-banners-card strong { display: block; margin-top: 8px; color: ${palette.text || '#102326'}; font-size: 26px; font-weight: 900; font-family: ${typo.display || 'sans-serif'}; }
        .nx-banners-layout { display: grid; grid-template-columns: minmax(300px, 380px) minmax(0, 1fr); gap: 18px; align-items: start; }
        .nx-banners-form { display: grid; gap: 12px; }
        .nx-banners-form label { display: grid; gap: 6px; color: ${palette.textDim || '#4f646a'}; font-size: 11px; font-weight: 900; letter-spacing: .06em; text-transform: uppercase; font-family: ${typo.mono || 'monospace'}; }
        .nx-banners-form input, .nx-banners-form select { min-height: 42px; border: 1px solid ${palette.borderStrong || '#b9cac4'}; border-radius: 8px; background: #fff; color: ${palette.text || '#102326'}; padding: 0 11px; font-size: 13px; font-family: ${typo.body || 'sans-serif'}; }
        .nx-banners-actions { display: flex; gap: 8px; flex-wrap: wrap; }
        .nx-banners-btn { min-height: 38px; display: inline-flex; align-items: center; justify-content: center; border-radius: 8px; border: 1px solid ${palette.borderStrong || '#b9cac4'}; background: #fff; color: ${palette.text || '#102326'}; padding: 0 13px; cursor: pointer; font-size: 12px; font-weight: 850; font-family: ${typo.body || 'sans-serif'}; }
        .nx-banners-btn.primary { background: ${palette.gold || '#9d7b3f'}; border-color: ${palette.gold || '#9d7b3f'}; color: #fffaf0; }
        .nx-banners-btn.danger { color: ${palette.red || '#ef4444'}; border-color: rgba(239,68,68,.35); }
        .nx-banners-preview { overflow: hidden; min-height: 130px; border: 1px dashed ${palette.borderStrong || '#b9cac4'}; border-radius: 10px; background: #fff; display: grid; place-items: center; color: ${palette.textFaint || '#7b8b90'}; font-size: 12px; font-weight: 800; }
        .nx-banners-preview img { width: 100%; height: 180px; object-fit: cover; display: block; }
        .nx-banners-list { display: grid; gap: 12px; }
        .nx-banner-row { display: grid; grid-template-columns: 132px minmax(0, 1fr) auto; gap: 14px; align-items: center; border: 1px solid ${palette.border || '#dfe8e4'}; border-radius: 12px; padding: 12px; background: #fff; }
        .nx-banner-row img { width: 132px; aspect-ratio: 16/9; object-fit: cover; border-radius: 8px; background: #f4efe5; }
        .nx-banner-row h3 { margin: 0 0 5px; color: ${palette.text || '#102326'}; font-size: 15px; font-weight: 900; }
        .nx-banner-row p { margin: 0; color: ${palette.textDim || '#4f646a'}; font-size: 12px; line-height: 1.45; }
        .nx-banner-row-metrics { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 9px; color: ${palette.textFaint || '#7b8b90'}; font-size: 11px; font-family: ${typo.mono || 'monospace'}; }
        .nx-banner-row-actions { display: flex; gap: 7px; flex-wrap: wrap; justify-content: flex-end; }
        .nx-banners-feedback { border-radius: 9px; padding: 11px 12px; font-size: 12px; font-weight: 750; }
        .nx-banners-feedback.ok { background: ${palette.greenDim || 'rgba(36,184,171,.12)'}; color: ${palette.green || '#168b82'}; }
        .nx-banners-feedback.error { background: ${palette.redDim || 'rgba(239,68,68,.1)'}; color: ${palette.red || '#ef4444'}; }
        @media (max-width: 900px) { .nx-banners-layout { grid-template-columns: 1fr; } .nx-banner-row { grid-template-columns: 1fr; } .nx-banner-row img { width: 100%; } .nx-banner-row-actions { justify-content: flex-start; } }
      `}</style>

      <div>
        <h2 style={{ margin: '0 0 6px', color: palette.text, fontFamily: typo.display, fontSize: 24, fontWeight: 900 }}>Publicidade direta</h2>
        <p style={{ margin: 0, color: palette.textDim, fontSize: 13, lineHeight: 1.5 }}>
          Gere campanhas locais para stands, oficinas, imobiliárias ou parceiros. Se não existir campanha direta ativa numa posição, o site pode usar AdSense quando estiver configurado.
        </p>
      </div>

      <div className="nx-banners-metrics">
        <div className="nx-banners-card"><small>Campanhas</small><strong>{metricas.total}</strong></div>
        <div className="nx-banners-card"><small>Ativas</small><strong>{metricas.ativos}</strong></div>
        <div className="nx-banners-card"><small>Visualizações</small><strong>{metricas.visualizacoes.toLocaleString('pt-PT')}</strong></div>
        <div className="nx-banners-card"><small>Cliques</small><strong>{metricas.cliques.toLocaleString('pt-PT')}</strong></div>
      </div>

      {(feedback || erro) && <div className={`nx-banners-feedback ${erro ? 'error' : 'ok'}`}>{erro || feedback}</div>}

      <div className="nx-banners-layout">
        <form className="nx-banners-card nx-banners-form" onSubmit={guardarBanner}>
          <label>Título<input value={form.titulo} onChange={(e) => updateForm('titulo', e.target.value)} placeholder="Ex: Oficina parceira no Porto" /></label>
          <label>Imagem ou GIF URL<input value={form.imagemUrl} onChange={(e) => updateForm('imagemUrl', e.target.value)} placeholder="Upload de imagem ou URL direta do GIF" /></label>
          <div className="nx-banners-actions">
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={uploadImagem} style={{ display: 'none' }} />
            <button type="button" className="nx-banners-btn" onClick={() => fileRef.current?.click()} disabled={uploading}>{uploading ? 'A carregar...' : 'Carregar imagem'}</button>
          </div>
          <div className="nx-banners-preview">{form.imagemUrl ? <img src={form.imagemUrl} alt="" /> : 'Pré-visualização do banner'}</div>
          <label>Link de destino<input value={form.linkDestino} onChange={(e) => updateForm('linkDestino', e.target.value)} placeholder="https://..." /></label>
          <label>Posição<select value={form.posicao} onChange={(e) => updateForm('posicao', e.target.value)}>{POSICOES.map((posicao) => <option key={posicao.id} value={posicao.id}>{posicao.label}</option>)}</select></label>
          <label>Vertical<select value={form.vertical} onChange={(e) => updateForm('vertical', e.target.value)}><option value="todos">Todas</option><option value="carro">Automóveis</option><option value="imovel">Imóveis</option></select></label>
          <label>Ativo até<input type="date" value={form.ativoAte} onChange={(e) => updateForm('ativoAte', e.target.value)} /></label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 9, textTransform: 'none', letterSpacing: 0, fontFamily: typo.body }}>
            <input type="checkbox" checked={form.ativo} onChange={(e) => updateForm('ativo', e.target.checked)} style={{ width: 18, minHeight: 18 }} />
            Campanha ativa
          </label>
          <div className="nx-banners-actions">
            <button type="submit" className="nx-banners-btn primary" disabled={saving}>{saving ? 'A guardar...' : (editingId ? 'Guardar alterações' : 'Criar campanha')}</button>
            {editingId && <button type="button" className="nx-banners-btn" onClick={resetForm}>Nova campanha</button>}
          </div>
        </form>

        <div className="nx-banners-list">
          {loading ? (
            <div className="nx-banners-card">A carregar campanhas...</div>
          ) : banners.length === 0 ? (
            <div className="nx-banners-card">Ainda não existem campanhas diretas.</div>
          ) : banners.map((banner) => {
            const status = statusCampanha(banner);
            const ctr = banner.visualizacoes > 0 ? ((banner.cliques / banner.visualizacoes) * 100).toFixed(1) : '0.0';
            return (
              <article className="nx-banner-row" key={banner._id}>
                <img src={banner.imagemUrl} alt="" loading="lazy" />
                <div>
                  <h3>{banner.titulo}</h3>
                  <p>{posicaoLabel(banner.posicao)} · {banner.vertical === 'todos' ? 'Todas as áreas' : banner.vertical === 'carro' ? 'Automóveis' : 'Imóveis'}</p>
                  <p><a href={banner.linkDestino} target="_blank" rel="noopener noreferrer" style={{ color: palette.blue || '#2563eb' }}>{banner.linkDestino}</a></p>
                  <div className="nx-banner-row-metrics">
                    <span style={{ color: status.color, fontWeight: 900 }}>{status.label}</span>
                    <span>{(banner.visualizacoes || 0).toLocaleString('pt-PT')} visualizações</span>
                    <span>{(banner.cliques || 0).toLocaleString('pt-PT')} cliques</span>
                    <span>CTR {ctr}%</span>
                    {banner.ativoAte && <span>até {new Date(banner.ativoAte).toLocaleDateString('pt-PT')}</span>}
                  </div>
                </div>
                <div className="nx-banner-row-actions">
                  <button type="button" className="nx-banners-btn" onClick={() => editarBanner(banner)}>Editar</button>
                  <button type="button" className="nx-banners-btn" onClick={() => alternarAtivo(banner)}>{banner.ativo ? 'Pausar' : 'Ativar'}</button>
                  <button type="button" className="nx-banners-btn danger" onClick={() => apagarBanner(banner)}>Apagar</button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
