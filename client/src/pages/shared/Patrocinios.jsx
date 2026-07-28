import React, { useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, ImagePlus, ShieldCheck, UploadCloud } from 'lucide-react';
import api from '../../services/api';
import Seo from '../../components/Seo';
import { useAuth } from '../../context/AuthContext';
import { pathWithSearch } from '../../utils/navigationState';

const DURACOES = [
  { dias: 7, preco: '4,99 €', resumo: 'Teste curto' },
  { dias: 14, preco: '8,99 €', resumo: 'Boa exposição' },
  { dias: 30, preco: '14,99 €', resumo: 'Melhor valor' },
];

const POSICOES = [
  { id: 'listagem_topo_carros', vertical: 'carro', label: 'Topo da listagem de automóveis', detalhe: 'Aparece acima dos resultados de automóveis.' },
  { id: 'feed_pesquisa_carros', vertical: 'carro', label: 'Entre anúncios de automóveis', detalhe: 'Surge no feed a cada 6 anúncios.' },
  { id: 'listagem_fundo_carros', vertical: 'carro', label: 'Fundo da listagem de automóveis', detalhe: 'Aparece depois dos resultados principais.' },
  { id: 'listagem_topo_imoveis', vertical: 'imovel', label: 'Topo da listagem de imóveis', detalhe: 'Aparece acima dos resultados de imóveis.' },
  { id: 'feed_pesquisa_imoveis', vertical: 'imovel', label: 'Entre anúncios de imóveis', detalhe: 'Surge no feed a cada 6 anúncios.' },
  { id: 'listagem_fundo_imoveis', vertical: 'imovel', label: 'Fundo da listagem de imóveis', detalhe: 'Aparece depois dos resultados principais.' },
  { id: 'detalhe_sidebar', vertical: 'todos', label: 'Barra lateral do detalhe', detalhe: 'Aparece junto aos contactos de um anúncio.' },
  { id: 'detalhe_sugestoes', vertical: 'todos', label: 'Antes de sugestões', detalhe: 'Aparece antes dos anúncios recomendados.' },
  { id: 'landing_between_highlights', vertical: 'todos', label: 'Landing page', detalhe: 'Aparece numa zona institucional da página inicial.' },
];

const regras = [
  'O patrocínio começa automaticamente após confirmação do pagamento.',
  'A disposição escolhida pode entrar em rotação se existir mais do que uma campanha ativa na mesma zona.',
  'São aceites imagens JPG, PNG ou WebP por upload. Para GIF animado, usa uma URL direta do GIF.',
  'O criativo deve ser comercial, legível e relacionado com automóveis, imóveis ou serviços úteis para estes públicos.',
  'Não são permitidos conteúdos enganosos, ofensivos, ilegais, adultos, apostas, crédito abusivo ou marcas de terceiros sem autorização.',
  'O link de destino deve começar por https:// ou http:// e abrir uma página funcional.',
  'O patrocínio aumenta visibilidade, mas não garante contactos, vendas ou cliques.',
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
        setFeedback('Criativo carregado.');
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
      setErro('Preenche nome da campanha, criativo e link de destino.');
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
        title="Patrocínios Noxvelia | Publicidade em automóveis e imóveis"
        description="Compra espaços patrocinados na Noxvelia por 7, 14 ou 30 dias."
        path="/patrocinios"
      />
      <style>{`
        .sponsor-page { min-height: 100vh; background: #f4efe5; color: #071326; font-family: Inter, system-ui, sans-serif; }
        .sponsor-shell { width: min(1180px, calc(100% - 36px)); margin: 0 auto; }
        .sponsor-hero { padding: 54px 0 34px; border-bottom: 1px solid rgba(7,19,38,.12); background: linear-gradient(180deg, #fffaf0, #f4efe5); }
        .sponsor-hero-grid { display: grid; grid-template-columns: minmax(0, 1fr) 360px; gap: 28px; align-items: end; }
        .sponsor-kicker { display: inline-flex; align-items: center; gap: 8px; color: #102f50; font-size: 11px; font-weight: 950; letter-spacing: .12em; text-transform: uppercase; }
        .sponsor-kicker::before { content: ''; width: 28px; height: 1px; background: #d9c49c; }
        .sponsor-hero h1 { max-width: 760px; margin: 14px 0 12px; font-size: clamp(36px, 6vw, 72px); line-height: .98; letter-spacing: 0; font-weight: 950; }
        .sponsor-hero p { max-width: 650px; margin: 0; color: #45576a; font-size: 17px; line-height: 1.55; }
        .sponsor-price-card { border: 1px solid rgba(7,19,38,.14); border-radius: 14px; background: #ffffff; padding: 18px; box-shadow: 0 24px 60px -44px rgba(7,19,38,.55); }
        .sponsor-price-card strong { display: block; font-size: 34px; font-weight: 950; }
        .sponsor-price-card span { color: #596b7c; font-size: 13px; font-weight: 750; }
        .sponsor-section { padding: 34px 0; }
        .sponsor-grid { display: grid; grid-template-columns: minmax(0, .92fr) minmax(360px, 1.08fr); gap: 22px; align-items: start; }
        .sponsor-panel { border: 1px solid rgba(7,19,38,.13); border-radius: 14px; background: #ffffff; padding: 22px; }
        .sponsor-panel h2 { margin: 0 0 14px; font-size: 24px; font-weight: 950; }
        .sponsor-rules { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; }
        .sponsor-rules li { display: grid; grid-template-columns: 20px minmax(0, 1fr); gap: 10px; color: #45576a; font-size: 14px; line-height: 1.45; }
        .sponsor-rules svg { color: #102f50; margin-top: 1px; }
        .sponsor-form { display: grid; gap: 16px; }
        .sponsor-field { display: grid; gap: 7px; }
        .sponsor-field label, .sponsor-group-title { color: #4f6173; font-size: 10px; font-weight: 950; letter-spacing: .08em; text-transform: uppercase; }
        .sponsor-field input, .sponsor-field select { width: 100%; min-height: 46px; border: 1px solid rgba(7,19,38,.16); border-radius: 9px; background: #fffaf0; color: #071326; padding: 0 12px; font-size: 14px; font-weight: 760; box-sizing: border-box; }
        .sponsor-duration-grid, .sponsor-position-grid { display: grid; gap: 10px; }
        .sponsor-duration-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .sponsor-choice { border: 1px solid rgba(7,19,38,.16); border-radius: 10px; background: #fffaf0; padding: 13px; text-align: left; cursor: pointer; color: #071326; }
        .sponsor-choice.active { border-color: #9d7b3f; background: rgba(217,196,156,.28); box-shadow: inset 0 0 0 1px rgba(157,123,63,.28); }
        .sponsor-choice strong { display: block; font-size: 19px; font-weight: 950; }
        .sponsor-choice span { color: #596b7c; font-size: 12px; font-weight: 780; }
        .sponsor-position-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .sponsor-position-grid .sponsor-choice strong { font-size: 14px; }
        .sponsor-position-grid .sponsor-choice span { display: block; margin-top: 4px; line-height: 1.35; }
        .sponsor-upload-row { display: flex; gap: 9px; flex-wrap: wrap; }
        .sponsor-button { min-height: 46px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-radius: 9px; border: 1px solid #d9c49c; background: #d9c49c; color: #071326; padding: 0 16px; font-size: 14px; font-weight: 900; cursor: pointer; text-decoration: none; }
        .sponsor-button.secondary { background: #ffffff; border-color: rgba(7,19,38,.16); color: #071326; }
        .sponsor-preview { min-height: 170px; overflow: hidden; border: 1px dashed rgba(7,19,38,.18); border-radius: 12px; background: #fffaf0; display: grid; place-items: center; color: #596b7c; font-size: 13px; font-weight: 850; }
        .sponsor-preview img { width: 100%; height: 220px; object-fit: cover; display: block; }
        .sponsor-alert { border-radius: 10px; padding: 12px 14px; font-size: 13px; font-weight: 800; }
        .sponsor-alert.ok { background: rgba(22,139,130,.12); color: #0f766e; }
        .sponsor-alert.err { background: rgba(239,68,68,.1); color: #b91c1c; }
        .sponsor-help { color: #596b7c; font-size: 12px; align-self: center; }
        .dark .sponsor-page { background: #071326; color: #fffaf0; }
        .dark .sponsor-hero { background: linear-gradient(180deg, #071326, #102f50); border-color: rgba(240,223,187,.14); }
        .dark .sponsor-hero p, .dark .sponsor-rules li, .dark .sponsor-price-card span, .dark .sponsor-choice span { color: rgba(255,250,240,.72); }
        .dark .sponsor-panel, .dark .sponsor-price-card { background: #0d1d33; border-color: rgba(240,223,187,.16); }
        .dark .sponsor-field input, .dark .sponsor-field select, .dark .sponsor-choice, .dark .sponsor-preview { background: #071326; border-color: rgba(240,223,187,.18); color: #fffaf0; }
        .dark .sponsor-help { color: rgba(255,250,240,.7); }
        @media (max-width: 920px) { .sponsor-hero-grid, .sponsor-grid { grid-template-columns: 1fr; } .sponsor-position-grid { grid-template-columns: 1fr; } }
        @media (max-width: 620px) { .sponsor-shell { width: min(100% - 24px, 1180px); } .sponsor-duration-grid { grid-template-columns: 1fr; } .sponsor-panel { padding: 16px; } .sponsor-hero { padding-top: 36px; } }
      `}</style>

      <header className="sponsor-hero">
        <div className="sponsor-shell sponsor-hero-grid">
          <div>
            <span className="sponsor-kicker">Patrocínios Noxvelia</span>
            <h1>Zonas publicitárias simples, diretas e acessíveis.</h1>
            <p>Escolhe onde queres aparecer, carrega o criativo, define a duração e segue para pagamento. A campanha entra automaticamente após confirmação.</p>
          </div>
          <div className="sponsor-price-card">
            <span>desde</span>
            <strong>4,99 €</strong>
            <span>por 7 dias de exposição</span>
          </div>
        </div>
      </header>

      <main className="sponsor-section">
        <div className="sponsor-shell sponsor-grid">
          <section className="sponsor-panel">
            <h2>Regras da campanha</h2>
            <ul className="sponsor-rules">
              {regras.map((regra) => (
                <li key={regra}><ShieldCheck size={16} strokeWidth={2.4} /> <span>{regra}</span></li>
              ))}
            </ul>
          </section>

          <form className="sponsor-panel sponsor-form" onSubmit={iniciarPagamento}>
            <h2>Comprar patrocínio</h2>
            {pagamento === 'sucesso' && <div className="sponsor-alert ok">Pagamento recebido. A campanha será ativada automaticamente assim que o Stripe confirmar.</div>}
            {pagamento === 'cancelado' && <div className="sponsor-alert err">Pagamento cancelado. Podes ajustar a campanha e tentar novamente.</div>}
            {feedback && <div className="sponsor-alert ok">{feedback}</div>}
            {erro && <div className="sponsor-alert err">{erro}</div>}

            <div className="sponsor-field">
              <label>Nome da marca ou campanha</label>
              <input value={form.titulo} onChange={(e) => updateForm('titulo', e.target.value)} placeholder="Ex: Stand Silva Porto" />
            </div>

            <div>
              <div className="sponsor-group-title">Duração</div>
              <div className="sponsor-duration-grid">
                {DURACOES.map((duracao) => (
                  <button type="button" className={`sponsor-choice ${Number(form.duracaoDias) === duracao.dias ? 'active' : ''}`} key={duracao.dias} onClick={() => updateForm('duracaoDias', duracao.dias)}>
                    <strong>{duracao.preco}</strong>
                    <span>{duracao.dias} dias · {duracao.resumo}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="sponsor-group-title">Disposição no site</div>
              <div className="sponsor-position-grid">
                {POSICOES.map((posicao) => (
                  <button type="button" className={`sponsor-choice ${form.posicao === posicao.id ? 'active' : ''}`} key={posicao.id} onClick={() => updateForm('posicao', posicao.id)}>
                    <strong>{posicao.label}</strong>
                    <span>{posicao.detalhe}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="sponsor-field">
              <label>URL do criativo</label>
              <input value={form.imagemUrl} onChange={(e) => updateForm('imagemUrl', e.target.value)} placeholder="https://... imagem ou GIF" />
            </div>
            <div className="sponsor-upload-row">
              <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={uploadCriativo} style={{ display: 'none' }} />
              <button type="button" className="sponsor-button secondary" onClick={() => signed ? fileRef.current?.click() : pedirLogin()} disabled={uploading}>
                <UploadCloud size={17} /> {uploading ? 'A carregar...' : 'Carregar imagem'}
              </button>
              <span className="sponsor-help">GIF animado: usa URL direta.</span>
            </div>

            <div className="sponsor-preview">
              {form.imagemUrl ? <img src={form.imagemUrl} alt="Pré-visualização do patrocínio" /> : <span><ImagePlus size={22} /> Pré-visualização do criativo</span>}
            </div>

            <div className="sponsor-field">
              <label>Link de destino</label>
              <input value={form.linkDestino} onChange={(e) => updateForm('linkDestino', e.target.value)} placeholder="https://site-do-parceiro.pt" />
            </div>

            <button type="submit" className="sponsor-button" disabled={loading}>
              {signed ? `Prosseguir para pagamento · ${duracaoSelecionada.preco}` : 'Entrar para prosseguir'}
              <ArrowRight size={17} />
            </button>
            <p className="sponsor-help" style={{ margin: 0, lineHeight: 1.45 }}>
              Selecionado: {posicaoSelecionada.label}, {duracaoSelecionada.dias} dias. O valor é final para esta campanha.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
