import React, { useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  BadgeEuro,
  Clock3,
  ExternalLink,
  ImagePlus,
  MousePointerClick,
  UploadCloud,
} from 'lucide-react';
import api from '../../services/api';
import Seo from '../../components/Seo';
import { useAuth } from '../../context/AuthContext';
import { pathWithSearch } from '../../utils/navigationState';

const DURACOES = [
  { dias: 7, preco: '4,99 €', label: '7 Dias' },
  { dias: 14, preco: '8,99 €', label: '14 Dias' },
  { dias: 30, preco: '14,99 €', label: '30 Dias' },
];

const POSICOES = [
  { id: 'listagem_topo_carros', vertical: 'carro', label: 'Topo Automóveis', formato: 'Banner horizontal' },
  { id: 'feed_pesquisa_carros', vertical: 'carro', label: 'Meio do Feed Automóveis', formato: 'Banner entre cartões' },
  { id: 'listagem_fundo_carros', vertical: 'carro', label: 'Fundo Automóveis', formato: 'Banner horizontal' },
  { id: 'listagem_topo_imoveis', vertical: 'imovel', label: 'Topo Imóveis', formato: 'Banner horizontal' },
  { id: 'feed_pesquisa_imoveis', vertical: 'imovel', label: 'Meio do Feed Imóveis', formato: 'Banner entre cartões' },
  { id: 'listagem_fundo_imoveis', vertical: 'imovel', label: 'Fundo Imóveis', formato: 'Banner horizontal' },
  { id: 'detalhe_sidebar', vertical: 'todos', label: 'Lateral do Anúncio', formato: 'Retângulo lateral' },
  { id: 'detalhe_sugestoes', vertical: 'todos', label: 'Fundo do Anúncio', formato: 'Banner horizontal' },
  { id: 'landing_between_highlights', vertical: 'todos', label: 'Página Inicial', formato: 'Banner institucional' },
];

export default function Patrocinios() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const { signed } = useAuth();

  const posicaoInicial = POSICOES.some((item) => item.id === searchParams.get('posicao'))
    ? searchParams.get('posicao')
    : 'feed_pesquisa_carros';
  const posicaoInicialInfo = POSICOES.find((item) => item.id === posicaoInicial);

  const [form, setForm] = useState({
    titulo: '',
    imagemUrl: '',
    linkDestino: '',
    posicao: posicaoInicial,
    vertical: searchParams.get('vertical') || posicaoInicialInfo?.vertical || 'todos',
    duracaoDias: 14,
  });
  
  const [erro, setErro] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const pagamento = searchParams.get('pagamento');

  const posicaoSelecionada = useMemo(
    () => POSICOES.find((item) => item.id === form.posicao) || POSICOES[0],
    [form.posicao],
  );

  const duracaoSelecionada = useMemo(
    () => DURACOES.find((item) => item.dias === Number(form.duracaoDias)) || DURACOES[1],
    [form.duracaoDias],
  );

  const previewTitle = form.titulo.trim() || 'Nome da sua marca';
  const previewDestination = form.linkDestino.trim() || 'https://o-seu-site.pt';
  const previewIsSidebar = posicaoSelecionada.id === 'detalhe_sidebar';

  const updateForm = (campo, valor) => {
    setForm((atual) => {
      const next = { ...atual, [campo]: valor };
      if (campo === 'posicao') {
        const novaPosicao = POSICOES.find((item) => item.id === valor);
        next.vertical = novaPosicao?.vertical || 'todos';
      }
      return next;
    });
  };

  const pedirLogin = () => {
    navigate('/login', {
      state: {
        from: pathWithSearch(location),
        returnTo: pathWithSearch(location),
      },
    });
  };

  const uploadCriativo = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!signed) {
      pedirLogin();
      return;
    }

    const data = new FormData();
    data.append('imagens', file);
    data.append('kind', 'cover');
    data.append('altText', form.titulo || 'Patrocínio Noxvelia');

    setUploading(true);
    setErro('');
    try {
      const response = await api.post('/upload/imagens', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data?.url) {
        updateForm('imagemUrl', response.data.url);
        setFeedback('Criativo carregado com sucesso.');
      }
    } catch (error) {
      setErro(error.response?.data?.erro || 'Não foi possível carregar o criativo.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const iniciarPagamento = async (event) => {
    event.preventDefault();
    setErro('');
    setFeedback('');

    if (!signed) {
      pedirLogin();
      return;
    }

    if (!form.titulo.trim() || !form.imagemUrl.trim() || !form.linkDestino.trim()) {
      setErro('Preencha o nome da campanha, carregue um criativo e insira o link de destino.');
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post('/stripe/criar-checkout-patrocinio', form);
      if (data?.url) window.location.href = data.url;
    } catch (error) {
      setErro(error.response?.data?.erro || 'Não foi possível iniciar o pagamento.');
      setLoading(false);
    }
  };

  return (
    <div className="sponsor-page">
      <Seo
        title="Anunciar Marca | NOXVELIA"
        description="Posicione a sua marca na NOXVELIA. Crie a sua campanha de publicidade em minutos."
        path="/patrocinios"
      />
      <style>{`
        .sponsor-page { min-height: 100vh; background: var(--cor-fundo); color: var(--cor-texto); font-family: var(--nx-font-body); }
        .sponsor-shell { width: min(1180px, calc(100% - 36px)); margin: 0 auto; }
        
        .sponsor-hero { padding: 64px 0 44px; background: #102f50; color: #fffaf0; text-align: center; }
        .sponsor-kicker { display: inline-flex; align-items: center; gap: 8px; color: #d9c49c; font-size: 12px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; margin-bottom: 16px; }
        .sponsor-hero h1 { margin: 0 auto 16px; font-size: clamp(34px, 4vw, 54px); font-family: var(--nx-font-display); font-weight: 900; line-height: 1.1; max-width: 700px; }
        .sponsor-hero p { margin: 0 auto; color: rgba(255,250,240,0.8); font-size: 16px; line-height: 1.6; max-width: 600px; }
        
        .sponsor-section { padding: 54px 0; }
        .sponsor-grid { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(380px, 0.8fr); gap: 32px; align-items: start; }
        
        .sponsor-panel { border: 1px solid var(--cor-borda); border-radius: 16px; background: #ffffff; padding: 32px; box-shadow: 0 12px 32px -20px rgba(7,19,38,.1); }
        .sponsor-panel h2 { margin: 0 0 24px; font-size: 22px; font-weight: 900; font-family: var(--nx-font-display); }
        
        .sponsor-form { display: grid; gap: 20px; }
        .sponsor-field { display: grid; gap: 8px; }
        .sponsor-field label, .sponsor-group-title { color: var(--cor-texto-secundario); font-size: 11px; font-weight: 800; letter-spacing: .05em; text-transform: uppercase; }
        .sponsor-field input { width: 100%; min-height: 48px; border: 1px solid var(--cor-borda); border-radius: 10px; background: #fcfbfa; color: var(--cor-texto); padding: 0 14px; font-size: 14px; font-weight: 600; outline: none; transition: border-color 0.2s; }
        .sponsor-field input:focus { border-color: var(--cor-champagne); background: #ffffff; }
        
        .sponsor-duration-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
        .sponsor-position-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
        
        .sponsor-choice { border: 1px solid var(--cor-borda); border-radius: 10px; background: #fcfbfa; padding: 14px; text-align: left; cursor: pointer; transition: all 0.2s; color: var(--cor-texto); }
        .sponsor-choice:hover { border-color: #d9c49c; }
        .sponsor-choice.is-selected { border-color: #102f50; background: #102f50; color: #ffffff; }
        .sponsor-choice.is-selected strong { color: #ffffff; }
        .sponsor-choice.is-selected span { color: rgba(255,255,255,0.7); }
        
        .sponsor-choice strong { display: block; font-size: 15px; font-weight: 800; margin-bottom: 2px; }
        .sponsor-choice span { display: block; color: var(--cor-texto-secundario); font-size: 12px; line-height: 1.4; }
        
        .sponsor-upload-row { display: flex; gap: 12px; align-items: center; }
        .sponsor-button { min-height: 48px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-radius: 10px; border: none; background: #102f50; color: #ffffff; padding: 0 24px; font-size: 14px; font-weight: 800; cursor: pointer; transition: transform 0.2s, filter 0.2s; width: 100%; }
        .sponsor-button:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(1.1); }
        .sponsor-button:disabled { opacity: 0.6; cursor: not-allowed; }
        .sponsor-button.secondary { width: auto; background: #fcfbfa; border: 1px solid var(--cor-borda); color: var(--cor-texto); }
        .sponsor-button.secondary:hover { border-color: #102f50; }
        
        /* Preview Side */
        .sponsor-preview-shell { position: sticky; top: 24px; display: grid; gap: 20px; }
        .sponsor-browser { overflow: hidden; border: 1px solid var(--cor-borda); border-radius: 12px; background: var(--cor-fundo-suave); }
        .sponsor-browser-top { display: flex; gap: 6px; align-items: center; min-height: 36px; padding: 0 14px; border-bottom: 1px solid var(--cor-borda); background: #ffffff; }
        .sponsor-browser-dot { width: 10px; height: 10px; border-radius: 50%; background: #e0e0e0; }
        .sponsor-browser-dot:nth-child(1) { background: #ff5f56; }
        .sponsor-browser-dot:nth-child(2) { background: #ffbd2e; }
        .sponsor-browser-dot:nth-child(3) { background: #27c93f; }
        .sponsor-browser-body { padding: 20px; }
        
        .sponsor-mock-list { display: grid; gap: 12px; }
        .sponsor-mock-card { height: 50px; border-radius: 8px; background: #ffffff; border: 1px solid rgba(7,19,38,.06); }
        
        .sponsor-ad-preview { position: relative; overflow: hidden; min-height: 140px; border-radius: 10px; background: #102f50; color: #ffffff; }
        .sponsor-ad-preview.sidebar { min-height: 240px; }
        .sponsor-ad-preview img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .sponsor-ad-preview::after { content: ''; position: absolute; inset: 0; background: linear-gradient(0deg, rgba(7,19,38,.9) 0%, rgba(7,19,38,.2) 100%); }
        
        .sponsor-ad-content { position: relative; z-index: 1; display: flex; min-height: inherit; flex-direction: column; justify-content: flex-end; gap: 6px; padding: 20px; }
        .sponsor-ad-label { position: absolute; top: 12px; left: 12px; z-index: 2; border-radius: 4px; background: rgba(255,255,255,.9); color: #102f50; padding: 4px 8px; font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: .05em; }
        .sponsor-ad-content strong { font-size: 18px; font-weight: 800; line-height: 1.2; }
        .sponsor-ad-link { display: inline-flex; width: fit-content; align-items: center; gap: 6px; border-radius: 6px; background: rgba(255,255,255,.15); color: #ffffff; padding: 6px 12px; font-size: 11px; font-weight: 700; border: 1px solid rgba(255,255,255,0.3); font-style: normal; }
        
        .sponsor-price-summary { display: flex; justify-content: space-between; align-items: center; padding-top: 20px; border-top: 1px solid var(--cor-borda); }
        .sponsor-price-summary span { color: var(--cor-texto-secundario); font-size: 13px; font-weight: 600; }
        .sponsor-price-summary strong { font-size: 24px; font-weight: 900; color: #102f50; }
        
        .sponsor-alert { border-radius: 8px; padding: 14px; font-size: 13px; font-weight: 700; margin-bottom: 20px; }
        .sponsor-alert.ok { background: rgba(36,184,171,.15); color: #0d5c56; border: 1px solid rgba(36,184,171,.3); }
        .sponsor-alert.err { background: rgba(239,68,68,.1); color: #b91c1c; border: 1px solid rgba(239,68,68,.2); }
        
        @media (max-width: 980px) { .sponsor-grid { grid-template-columns: 1fr; } .sponsor-preview-shell { position: static; } }
        @media (max-width: 620px) { .sponsor-position-grid, .sponsor-duration-grid { grid-template-columns: 1fr; } .sponsor-upload-row { flex-direction: column; align-items: stretch; } }
      `}</style>

      <header className="sponsor-hero">
        <div className="sponsor-shell">
          <span className="sponsor-kicker">Publicidade Noxvelia</span>
          <h1>Posicione a sua marca no momento da decisão.</h1>
          <p>Crie a sua campanha em minutos. Escolha o espaço, carregue a sua imagem e chegue a quem procura automóveis e imóveis em Portugal.</p>
        </div>
      </header>

      <main className="sponsor-section">
        <div className="sponsor-shell sponsor-grid">
          
          {/* LADO ESQUERDO: O FORMULÁRIO */}
          <section className="sponsor-panel">
            <h2>Configurar Campanha</h2>
            
            {pagamento === 'sucesso' && <div className="sponsor-alert ok">Pagamento recebido. A campanha será ativada automaticamente assim que o Stripe confirmar.</div>}
            {pagamento === 'cancelado' && <div className="sponsor-alert err">Pagamento cancelado. Pode ajustar a campanha e tentar novamente.</div>}
            {feedback && <div className="sponsor-alert ok">{feedback}</div>}
            {erro && <div className="sponsor-alert err">{erro}</div>}

            <form className="sponsor-form" onSubmit={iniciarPagamento}>
              
              <div className="sponsor-field">
                <label>Nome da marca ou campanha</label>
                <input value={form.titulo} onChange={(e) => updateForm('titulo', e.target.value)} placeholder="Ex: Stand Silva Matosinhos" />
              </div>

              <div>
                <div className="sponsor-group-title" style={{ marginBottom: '8px' }}>Disposição no site</div>
                <div className="sponsor-position-grid">
                  {POSICOES.map((posicao) => (
                    <button type="button" className={`sponsor-choice ${form.posicao === posicao.id ? 'is-selected' : ''}`} key={posicao.id} onClick={() => updateForm('posicao', posicao.id)}>
                      <strong>{posicao.label}</strong>
                      <span>{posicao.formato}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="sponsor-field">
                <label>Criativo (Imagem ou GIF)</label>
                <div className="sponsor-upload-row">
                  <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={uploadCriativo} style={{ display: 'none' }} />
                  <button type="button" className="sponsor-button secondary" onClick={() => signed ? fileRef.current?.click() : pedirLogin()} disabled={uploading}>
                    <UploadCloud size={18} /> {uploading ? 'A carregar...' : 'Fazer Upload'}
                  </button>
                  <input value={form.imagemUrl} onChange={(e) => updateForm('imagemUrl', e.target.value)} placeholder="Ou cole o link da imagem/GIF aqui" style={{ flex: 1 }} />
                </div>
              </div>

              <div className="sponsor-field">
                <label>Link de destino (Onde o cliente vai ter ao clicar)</label>
                <input value={form.linkDestino} onChange={(e) => updateForm('linkDestino', e.target.value)} placeholder="https://o-seu-site.pt" />
              </div>

              <div>
                <div className="sponsor-group-title" style={{ marginBottom: '8px' }}>Duração da Campanha</div>
                <div className="sponsor-duration-grid">
                  {DURACOES.map((duracao) => (
                    <button type="button" className={`sponsor-choice ${Number(form.duracaoDias) === duracao.dias ? 'is-selected' : ''}`} key={duracao.dias} onClick={() => updateForm('duracaoDias', duracao.dias)}>
                      <strong>{duracao.label}</strong>
                      <span>{duracao.preco}</span>
                    </button>
                  ))}
                </div>
              </div>

            </form>
          </section>

          {/* LADO DIREITO: O PREVIEW E CHECKOUT */}
          <section className="sponsor-preview-shell">
            <div className="sponsor-panel" style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '16px', marginBottom: '16px' }}>Pré-visualização</h2>
              
              <div className="sponsor-browser">
                <div className="sponsor-browser-top">
                  <span className="sponsor-browser-dot" />
                  <span className="sponsor-browser-dot" />
                  <span className="sponsor-browser-dot" />
                </div>
                <div className="sponsor-browser-body">
                  <div className={previewIsSidebar ? "sponsor-mock-layout" : "sponsor-mock-list"}>
                    <div className="sponsor-mock-card" />
                    <div className={`sponsor-ad-preview ${previewIsSidebar ? 'sidebar' : ''}`}>
                      <span className="sponsor-ad-label">Patrocinado</span>
                      {form.imagemUrl ? (
                        <img src={form.imagemUrl} alt="Preview" />
                      ) : (
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e2e8f0', color: '#94a3b8' }}>
                          <ImagePlus size={32} />
                        </div>
                      )}
                      <div className="sponsor-ad-content">
                        <strong>{previewTitle}</strong>
                        <em className="sponsor-ad-link">Visitar site <ExternalLink size={12} /></em>
                      </div>
                    </div>
                    <div className="sponsor-mock-card" />
                  </div>
                </div>
              </div>

              <div className="sponsor-price-summary" style={{ marginTop: '24px' }}>
                <span>Total a pagar</span>
                <strong>{duracaoSelecionada.preco}</strong>
              </div>

              <button type="button" className="sponsor-button" style={{ marginTop: '16px', background: '#d9c49c', color: '#102f50' }} onClick={iniciarPagamento} disabled={loading}>
                {signed ? 'Finalizar Pagamento Seguro' : 'Entrar para Pagar'}
                <ArrowRight size={18} />
              </button>
              <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '11px', color: 'var(--cor-texto-secundario)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <BadgeEuro size={12} /> Pagamento processado via Stripe
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}