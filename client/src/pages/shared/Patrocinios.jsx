import React, { useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  BadgeEuro,
  Clock3,
  ExternalLink,
  ImagePlus,
  LayoutDashboard,
  MousePointerClick,
  ShieldCheck,
  UploadCloud,
} from 'lucide-react';
import api from '../../services/api';
import Seo from '../../components/Seo';
import { useAuth } from '../../context/AuthContext';
import { pathWithSearch } from '../../utils/navigationState';

const DURACOES = [
  { dias: 7, preco: '4,99 €', resumo: 'Teste curto', detalhe: 'Ideal para validar uma campanha, promover uma abertura ou testar uma zona.' },
  { dias: 14, preco: '8,99 €', resumo: 'Boa exposição', detalhe: 'Boa opção para campanhas locais com stock limitado ou campanhas de captação.' },
  { dias: 30, preco: '14,99 €', resumo: 'Melhor valor', detalhe: 'Recomendado para stands, imobiliárias, oficinas e marcas parceiras.' },
];

const POSICOES = [
  { id: 'listagem_topo_carros', vertical: 'carro', label: 'Topo da listagem de automóveis', detalhe: 'Aparece antes dos resultados de automóveis.', formato: 'Banner horizontal', exemplo: 'Bom para stands, retomas, garantias, financiamento e campanhas de stock.' },
  { id: 'feed_pesquisa_carros', vertical: 'carro', label: 'Entre anúncios de automóveis', detalhe: 'Surge no feed a cada 6 anúncios.', formato: 'Banner entre cartões', exemplo: 'Bom para campanhas que devem aparecer enquanto o visitante compara viaturas.' },
  { id: 'listagem_fundo_carros', vertical: 'carro', label: 'Fundo da listagem de automóveis', detalhe: 'Aparece depois dos resultados principais.', formato: 'Banner horizontal', exemplo: 'Bom para serviços complementares: crédito, histórico automóvel, seguros ou oficinas.' },
  { id: 'listagem_topo_imoveis', vertical: 'imovel', label: 'Topo da listagem de imóveis', detalhe: 'Aparece antes dos resultados de imóveis.', formato: 'Banner horizontal', exemplo: 'Bom para imobiliárias, mediação, crédito habitação e avaliação de imóveis.' },
  { id: 'feed_pesquisa_imoveis', vertical: 'imovel', label: 'Entre anúncios de imóveis', detalhe: 'Surge no feed a cada 6 anúncios.', formato: 'Banner entre cartões', exemplo: 'Bom para campanhas enquanto o visitante compara casas, tipologias e localizações.' },
  { id: 'listagem_fundo_imoveis', vertical: 'imovel', label: 'Fundo da listagem de imóveis', detalhe: 'Aparece depois dos resultados principais.', formato: 'Banner horizontal', exemplo: 'Bom para serviços de mudanças, obras, certificados energéticos e crédito.' },
  { id: 'detalhe_sidebar', vertical: 'todos', label: 'Barra lateral do detalhe', detalhe: 'Aparece junto aos contactos de um anúncio.', formato: 'Retângulo lateral', exemplo: 'Bom para marcas que querem aparecer no momento em que o utilizador decide contactar.' },
  { id: 'detalhe_sugestoes', vertical: 'todos', label: 'Antes de sugestões', detalhe: 'Aparece antes dos anúncios recomendados.', formato: 'Banner horizontal', exemplo: 'Bom para captar quem ainda está a ver alternativas.' },
  { id: 'landing_between_highlights', vertical: 'todos', label: 'Página inicial', detalhe: 'Aparece numa zona institucional da landing page.', formato: 'Banner institucional', exemplo: 'Bom para notoriedade local, lançamentos, campanhas de marca ou serviços nacionais.' },
];

const CONDICOES = [
  {
    titulo: 'O que o patrocinador compra',
    itens: [
      'Um espaço publicitário dentro da Noxvelia durante 7, 14 ou 30 dias.',
      'O banner aparece na posição escolhida, em rotação caso existam várias campanhas ativas nessa mesma zona.',
      'A campanha começa automaticamente quando o pagamento for confirmado pelo Stripe.',
    ],
  },
  {
    titulo: 'Criativo e imagem',
    itens: [
      'Podes carregar imagem JPG, PNG ou WebP diretamente na Noxvelia.',
      'Se quiseres usar GIF animado, deves inserir uma URL direta para o GIF.',
      'O criativo deve ser legível em telemóvel e computador, sem texto minúsculo ou promessas agressivas.',
    ],
  },
  {
    titulo: 'Link de destino',
    itens: [
      'O clique no banner abre o link indicado pelo patrocinador numa nova aba.',
      'O link deve começar por http:// ou https:// e levar para uma página funcional.',
      'Exemplos válidos: página de stock, formulário de contacto, WhatsApp Business, campanha, imóvel, oficina ou landing própria.',
    ],
  },
  {
    titulo: 'Conteúdo aceite',
    itens: [
      'Automóveis, imóveis, stands, imobiliárias, oficinas, crédito, seguros, inspeções, histórico automóvel, obras, mudanças e serviços úteis para estes públicos.',
      'Não aceitamos conteúdo enganoso, ilegal, ofensivo, adulto, apostas, crédito abusivo ou uso de marcas de terceiros sem autorização.',
      'A Noxvelia pode remover campanhas que prejudiquem a confiança dos utilizadores.',
    ],
  },
  {
    titulo: 'Transparência',
    itens: [
      'O espaço é identificado como publicidade para não confundir o visitante com anúncios normais.',
      'O patrocínio aumenta visibilidade, mas não garante vendas, contactos ou cliques.',
      'Visualizações e cliques são registados para acompanhamento interno da campanha.',
    ],
  },
];

const PASSOS = [
  { titulo: 'Escolhe a zona', texto: 'Seleciona onde queres aparecer: listagem, feed, detalhe do anúncio ou página inicial.', icon: LayoutDashboard },
  { titulo: 'Prepara o criativo', texto: 'Carrega uma imagem ou usa URL direta para GIF, com mensagem curta e clara.', icon: ImagePlus },
  { titulo: 'Define o link', texto: 'O clique leva para o destino que indicares: site, stock, landing, WhatsApp ou formulário.', icon: MousePointerClick },
  { titulo: 'Paga e ativa', texto: 'Depois do pagamento, a campanha fica ativa pelo período escolhido.', icon: BadgeEuro },
];

const EXEMPLOS = [
  {
    titulo: 'Stand automóvel no Porto',
    campanha: 'Campanha: BMW, Renault e Mercedes com garantia incluída.',
    posicao: 'Entre anúncios de automóveis',
    criativo: 'Imagem horizontal com uma viatura real, nome do stand e chamada curta: Ver stock disponível.',
    destino: 'Página do stock do stand ou WhatsApp Business.',
  },
  {
    titulo: 'Imobiliária em Lisboa',
    campanha: 'Campanha: apartamentos T1 e T2 para venda ou arrendamento.',
    posicao: 'Topo da listagem de imóveis',
    criativo: 'Fotografia luminosa de um imóvel, zona, contacto e frase simples: Fale com a nossa equipa.',
    destino: 'Página da agência, formulário de contacto ou montra de imóveis.',
  },
  {
    titulo: 'Oficina ou serviço parceiro',
    campanha: 'Campanha: revisão, pneus, inspeção, histórico automóvel ou financiamento.',
    posicao: 'Barra lateral do detalhe do anúncio',
    criativo: 'Banner direto com benefício claro: Marque revisão, peça orçamento ou verifique histórico.',
    destino: 'Landing do serviço, formulário, campanha com código ou página de marca.',
  },
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

  const previewTitle = form.titulo.trim() || 'Nome da campanha';
  const previewDestination = form.linkDestino.trim() || 'https://site-do-parceiro.pt';
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
        .sponsor-page { min-height: 100vh; background: #ffffff; color: #071326; font-family: Inter, system-ui, sans-serif; }
        .sponsor-shell { width: min(1180px, calc(100% - 36px)); margin: 0 auto; }
        .sponsor-hero { padding: 54px 0 34px; border-bottom: 1px solid rgba(7,19,38,.12); background: #ffffff; }
        .sponsor-hero-grid { display: grid; grid-template-columns: minmax(0, 1fr) 360px; gap: 28px; align-items: end; }
        .sponsor-kicker { display: inline-flex; align-items: center; gap: 8px; color: #102f50; font-size: 11px; font-weight: 950; letter-spacing: .12em; text-transform: uppercase; }
        .sponsor-kicker::before { content: ''; width: 28px; height: 1px; background: #d9c49c; }
        .sponsor-hero h1 { max-width: 760px; margin: 14px 0 12px; font-size: clamp(34px, 5.4vw, 66px); line-height: .98; letter-spacing: 0; font-weight: 950; }
        .sponsor-hero p { max-width: 650px; margin: 0; color: #45576a; font-size: 17px; line-height: 1.55; }
        .sponsor-price-card { border: 1px solid rgba(7,19,38,.14); border-radius: 14px; background: #ffffff; padding: 18px; box-shadow: 0 24px 60px -44px rgba(7,19,38,.55); }
        .sponsor-price-card strong { display: block; font-size: 34px; font-weight: 950; }
        .sponsor-price-card span { color: #596b7c; font-size: 13px; font-weight: 750; }
        .sponsor-price-meta { display: grid; gap: 9px; margin-top: 14px; }
        .sponsor-price-meta div { display: flex; gap: 8px; align-items: center; color: #45576a; font-size: 13px; font-weight: 780; }
        .sponsor-section { padding: 34px 0; }
        .sponsor-grid { display: grid; grid-template-columns: minmax(0, .96fr) minmax(370px, 1.04fr); gap: 22px; align-items: start; }
        .sponsor-stack { display: grid; gap: 18px; }
        .sponsor-panel { border: 1px solid rgba(7,19,38,.13); border-radius: 14px; background: #ffffff; padding: 22px; box-shadow: 0 18px 50px -44px rgba(7,19,38,.46); }
        .sponsor-panel h2 { margin: 0 0 14px; font-size: 24px; font-weight: 950; }
        .sponsor-panel-intro { margin: -6px 0 16px; color: #596b7c; font-size: 14px; line-height: 1.5; }
        .sponsor-steps { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
        .sponsor-step { border: 1px solid rgba(7,19,38,.11); border-radius: 12px; background: #ffffff; padding: 14px; }
        .sponsor-step svg { color: #102f50; margin-bottom: 9px; }
        .sponsor-step strong { display: block; font-size: 14px; font-weight: 950; }
        .sponsor-step span { display: block; margin-top: 5px; color: #596b7c; font-size: 12px; line-height: 1.4; }
        .sponsor-rules { display: grid; gap: 12px; }
        .sponsor-rule-card { border: 1px solid rgba(7,19,38,.11); border-radius: 12px; background: #ffffff; padding: 15px; }
        .sponsor-rule-card h3 { margin: 0 0 10px; font-size: 15px; font-weight: 950; }
        .sponsor-rule-card ul { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
        .sponsor-rule-card li { display: grid; grid-template-columns: 18px minmax(0, 1fr); gap: 8px; color: #45576a; font-size: 13px; line-height: 1.42; }
        .sponsor-rule-card svg { color: #102f50; margin-top: 1px; }
        .sponsor-examples { display: grid; gap: 10px; }
        .sponsor-example { border: 1px solid rgba(7,19,38,.11); border-radius: 12px; background: #ffffff; padding: 15px; }
        .sponsor-example h3 { margin: 0 0 8px; font-size: 15px; font-weight: 950; }
        .sponsor-example p { margin: 0 0 8px; color: #45576a; font-size: 13px; line-height: 1.42; }
        .sponsor-example dl { display: grid; gap: 6px; margin: 0; }
        .sponsor-example div { display: grid; grid-template-columns: 82px minmax(0, 1fr); gap: 8px; }
        .sponsor-example dt { color: #4f6173; font-size: 10px; font-weight: 950; letter-spacing: .08em; text-transform: uppercase; }
        .sponsor-example dd { margin: 0; color: #071326; font-size: 12px; font-weight: 780; line-height: 1.38; }
        .sponsor-preview-shell { display: grid; gap: 12px; }
        .sponsor-browser { overflow: hidden; border: 1px solid rgba(7,19,38,.13); border-radius: 14px; background: #f8f3ea; }
        .sponsor-browser-top { display: flex; gap: 6px; align-items: center; min-height: 34px; padding: 0 12px; border-bottom: 1px solid rgba(7,19,38,.1); background: #ffffff; }
        .sponsor-browser-dot { width: 8px; height: 8px; border-radius: 999px; background: #d9c49c; }
        .sponsor-browser-url { margin-left: 8px; color: #596b7c; font-size: 11px; font-weight: 800; }
        .sponsor-browser-body { padding: 16px; }
        .sponsor-mock-list { display: grid; gap: 10px; }
        .sponsor-mock-card { height: 46px; border-radius: 10px; border: 1px solid rgba(7,19,38,.08); background: #ffffff; }
        .sponsor-mock-layout { display: grid; grid-template-columns: minmax(0, 1fr) 150px; gap: 10px; }
        .sponsor-mock-main { display: grid; gap: 10px; }
        .sponsor-ad-preview { position: relative; overflow: hidden; min-height: 118px; border: 1px dashed rgba(157,123,63,.46); border-radius: 12px; background: linear-gradient(135deg, #102f50 0%, #071326 62%, #d9c49c 180%); color: #fffaf0; }
        .sponsor-ad-preview.sidebar { min-height: 190px; }
        .sponsor-ad-preview img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .sponsor-ad-preview::after { content: ''; position: absolute; inset: 0; background: linear-gradient(0deg, rgba(7,19,38,.78), rgba(7,19,38,.12)); }
        .sponsor-ad-content { position: relative; z-index: 1; display: flex; min-height: inherit; flex-direction: column; justify-content: flex-end; gap: 8px; padding: 38px 16px 14px; }
        .sponsor-ad-label { position: absolute; top: 10px; left: 12px; z-index: 2; border-radius: 999px; background: rgba(255,250,240,.94); color: #596b7c; border: 1px solid rgba(217,196,156,.6); padding: 5px 9px; font-size: 9px; font-weight: 950; letter-spacing: .08em; text-transform: uppercase; }
        .sponsor-ad-content strong { font-size: 18px; line-height: 1.12; font-weight: 950; }
        .sponsor-ad-content span { color: #f0dfbb; font-size: 12px; font-weight: 820; }
        .sponsor-ad-link { display: inline-flex; width: fit-content; align-items: center; gap: 6px; border-radius: 999px; background: rgba(255,250,240,.12); border: 1px solid rgba(255,250,240,.22); color: #fffaf0; padding: 7px 10px; font-size: 11px; font-weight: 900; }
        .sponsor-preview-note { display: grid; grid-template-columns: 18px minmax(0, 1fr); gap: 8px; color: #45576a; font-size: 13px; line-height: 1.45; }
        .sponsor-form { display: grid; gap: 16px; }
        .sponsor-field { display: grid; gap: 7px; }
        .sponsor-field label, .sponsor-group-title { color: #4f6173; font-size: 10px; font-weight: 950; letter-spacing: .08em; text-transform: uppercase; }
        .sponsor-field input, .sponsor-field select { width: 100%; min-height: 46px; border: 1px solid rgba(7,19,38,.16); border-radius: 9px; background: #ffffff; color: #071326; padding: 0 12px; font-size: 14px; font-weight: 760; box-sizing: border-box; }
        .sponsor-duration-grid, .sponsor-position-grid { display: grid; gap: 10px; }
        .sponsor-duration-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .sponsor-choice { border: 1px solid rgba(7,19,38,.16); border-radius: 10px; background: #ffffff; padding: 13px; text-align: left; cursor: pointer; color: #071326; }
        .sponsor-choice.active { border-color: #9d7b3f; background: rgba(217,196,156,.28); box-shadow: inset 0 0 0 1px rgba(157,123,63,.28); }
        .sponsor-choice strong { display: block; font-size: 19px; font-weight: 950; }
        .sponsor-choice span { display: block; margin-top: 4px; color: #596b7c; font-size: 12px; font-weight: 780; line-height: 1.35; }
        .sponsor-position-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .sponsor-position-grid .sponsor-choice strong { font-size: 14px; }
        .sponsor-upload-row { display: flex; gap: 9px; flex-wrap: wrap; }
        .sponsor-button { min-height: 46px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-radius: 9px; border: 1px solid #d9c49c; background: #d9c49c; color: #071326; padding: 0 16px; font-size: 14px; font-weight: 900; cursor: pointer; text-decoration: none; }
        .sponsor-button.secondary { background: #ffffff; border-color: rgba(7,19,38,.16); color: #071326; }
        .sponsor-preview { min-height: 170px; overflow: hidden; border: 1px dashed rgba(7,19,38,.18); border-radius: 12px; background: #ffffff; display: grid; place-items: center; color: #596b7c; font-size: 13px; font-weight: 850; }
        .sponsor-preview img { width: 100%; height: 220px; object-fit: cover; display: block; }
        .sponsor-alert { border-radius: 10px; padding: 12px 14px; font-size: 13px; font-weight: 800; }
        .sponsor-alert.ok { background: rgba(22,139,130,.12); color: #0f766e; }
        .sponsor-alert.err { background: rgba(239,68,68,.1); color: #b91c1c; }
        .sponsor-help { color: #596b7c; font-size: 12px; align-self: center; }
        .dark .sponsor-page { background: #071326; color: #fffaf0; }
        .dark .sponsor-hero { background: linear-gradient(180deg, #071326, #102f50); border-color: rgba(240,223,187,.14); }
        .dark .sponsor-hero p, .dark .sponsor-panel-intro, .dark .sponsor-price-card span, .dark .sponsor-price-meta div, .dark .sponsor-step span, .dark .sponsor-rule-card li, .dark .sponsor-example p, .dark .sponsor-preview-note, .dark .sponsor-choice span { color: rgba(255,250,240,.72); }
        .dark .sponsor-panel, .dark .sponsor-price-card, .dark .sponsor-browser-top { background: #0d1d33; border-color: rgba(240,223,187,.16); }
        .dark .sponsor-step, .dark .sponsor-rule-card, .dark .sponsor-example, .dark .sponsor-browser, .dark .sponsor-mock-card { background: #071326; border-color: rgba(240,223,187,.14); }
        .dark .sponsor-field input, .dark .sponsor-field select, .dark .sponsor-choice, .dark .sponsor-preview { background: #071326; border-color: rgba(240,223,187,.18); color: #fffaf0; }
        .dark .sponsor-example dd, .dark .sponsor-empty-creative { color: #fffaf0; }
        .dark .sponsor-help { color: rgba(255,250,240,.7); }
        @media (max-width: 980px) { .sponsor-hero-grid, .sponsor-grid { grid-template-columns: 1fr; } .sponsor-position-grid { grid-template-columns: 1fr; } }
        @media (max-width: 720px) { .sponsor-steps, .sponsor-duration-grid { grid-template-columns: 1fr; } .sponsor-mock-layout { grid-template-columns: 1fr; } }
        @media (max-width: 620px) { .sponsor-shell { width: min(100% - 24px, 1180px); } .sponsor-panel { padding: 16px; } .sponsor-hero { padding-top: 36px; } .sponsor-hero h1 { font-size: clamp(32px, 11vw, 48px); } .sponsor-example div { grid-template-columns: 1fr; gap: 2px; } .sponsor-ad-content strong { font-size: 15px; } }
      `}</style>

      <header className="sponsor-hero">
        <div className="sponsor-shell sponsor-hero-grid">
          <div>
            <span className="sponsor-kicker">Patrocínios Noxvelia</span>
            <h1>Preço de lançamento para marcas que querem aparecer no momento certo.</h1>
            <p>Nesta fase inicial, os espaços têm preço de lançamento para parceiros que querem testar presença na Noxvelia desde cedo. Escolhes a posição, carregas o criativo, indicas o link e defines a duração.</p>
          </div>
          <div className="sponsor-price-card">
            <span>desde</span>
            <strong>4,99 €</strong>
            <span>por 7 dias de exposição</span>
            <div className="sponsor-price-meta">
              <div><Clock3 size={15} /> 7, 14 ou 30 dias</div>
              <div><MousePointerClick size={15} /> Clique para o teu link</div>
              <div><ShieldCheck size={15} /> Espaço identificado como publicidade</div>
            </div>
          </div>
        </div>
      </header>

      <main className="sponsor-section">
        <div className="sponsor-shell sponsor-grid">
          <div className="sponsor-stack">
            <section className="sponsor-panel">
              <h2>Como funciona</h2>
              <p className="sponsor-panel-intro">O processo foi pensado para parceiros locais conseguirem anunciar sem trocar emails, sem enviar ficheiros manualmente e sem esperar por configuração.</p>
              <div className="sponsor-steps">
                {PASSOS.map(({ titulo, texto, icon: Icon }) => (
                  <div className="sponsor-step" key={titulo}>
                    <Icon size={20} strokeWidth={2.3} />
                    <strong>{titulo}</strong>
                    <span>{texto}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="sponsor-panel">
              <h2>Condições da campanha</h2>
              <p className="sponsor-panel-intro">Estas regras protegem o anunciante, os visitantes e a credibilidade da Noxvelia.</p>
              <div className="sponsor-rules">
                {CONDICOES.map((grupo) => (
                  <article className="sponsor-rule-card" key={grupo.titulo}>
                    <h3>{grupo.titulo}</h3>
                    <ul>
                      {grupo.itens.map((item) => (
                        <li key={item}><ShieldCheck size={15} strokeWidth={2.4} /> <span>{item}</span></li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section className="sponsor-panel">
              <h2>Exemplos práticos</h2>
              <p className="sponsor-panel-intro">Algumas formas reais de usar estes espaços sem parecer publicidade genérica.</p>
              <div className="sponsor-examples">
                {EXEMPLOS.map((exemplo) => (
                  <article className="sponsor-example" key={exemplo.titulo}>
                    <h3>{exemplo.titulo}</h3>
                    <p>{exemplo.campanha}</p>
                    <dl>
                      <div><dt>Posição</dt><dd>{exemplo.posicao}</dd></div>
                      <div><dt>Criativo</dt><dd>{exemplo.criativo}</dd></div>
                      <div><dt>Destino</dt><dd>{exemplo.destino}</dd></div>
                    </dl>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <div className="sponsor-stack">
            <section className="sponsor-panel sponsor-preview-shell">
              <h2>Exemplo de apresentação</h2>
              <p className="sponsor-panel-intro">A pré-visualização adapta-se à posição escolhida. O aspeto final pode variar ligeiramente conforme a página e o tamanho do ecrã.</p>
              <div className="sponsor-browser">
                <div className="sponsor-browser-top">
                  <span className="sponsor-browser-dot" />
                  <span className="sponsor-browser-dot" />
                  <span className="sponsor-browser-dot" />
                  <span className="sponsor-browser-url">noxvelia.com</span>
                </div>
                <div className="sponsor-browser-body">
                  {previewIsSidebar ? (
                    <div className="sponsor-mock-layout">
                      <div className="sponsor-mock-main">
                        <div className="sponsor-mock-card" />
                        <div className="sponsor-mock-card" />
                        <div className="sponsor-mock-card" />
                      </div>
                      <div className="sponsor-ad-preview sidebar">
                        <span className="sponsor-ad-label">Publicidade</span>
                        {form.imagemUrl && <img src={form.imagemUrl} alt="" />}
                        <div className="sponsor-ad-content">
                          <strong>{previewTitle}</strong>
                          <span>{posicaoSelecionada.formato}</span>
                          <em className="sponsor-ad-link">Abrir destino <ExternalLink size={12} /></em>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="sponsor-mock-list">
                      <div className="sponsor-mock-card" />
                      <div className="sponsor-ad-preview">
                        <span className="sponsor-ad-label">Publicidade</span>
                        {form.imagemUrl && <img src={form.imagemUrl} alt="" />}
                        <div className="sponsor-ad-content">
                          <strong>{previewTitle}</strong>
                          <span>{posicaoSelecionada.formato}</span>
                          <em className="sponsor-ad-link">Abrir destino <ExternalLink size={12} /></em>
                        </div>
                      </div>
                      <div className="sponsor-mock-card" />
                    </div>
                  )}
                </div>
              </div>
              <div className="sponsor-preview-note"><MousePointerClick size={16} /> <span>Ao clicar no banner ativo, o visitante abre: {previewDestination}</span></div>
              <div className="sponsor-preview-note"><LayoutDashboard size={16} /> <span>{posicaoSelecionada.exemplo}</span></div>
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
                      <span>{duracao.dias} dias. {duracao.resumo}. {duracao.detalhe}</span>
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
                      <span>{posicao.detalhe} {posicao.formato}.</span>
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
        </div>
      </main>
    </div>
  );
}