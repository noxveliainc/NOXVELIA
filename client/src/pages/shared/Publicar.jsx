import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Icon } from '@mdi/react';
import {
  mdiAlertCircleOutline, mdiCloudUploadOutline, mdiClose, mdiCrown, mdiCarOutline,
  mdiHomeOutline, mdiImageMultipleOutline, mdiMapMarkerOutline, mdiTagOutline,
  mdiPlus, mdiInformationOutline, mdiArrowLeft, mdiArrowRight, mdiCheck
} from '@mdi/js';
import { MARCAS, getModelosPorMarca } from '../../data/marcasModelos';
import { DISTRITOS_CIDADES_PT, DISTRITOS } from '../../data/localizacoes';
import { isSupportedVideoUrl } from '../../utils/videoEmbed';
import { calcularQualidadeFormulario } from '../../utils/anuncioQuality';
import { juntarExtras, normalizarExtras } from '../../utils/extras';
import { getImageUrl, normalizeUploadedImages } from '../../utils/images';
import { trackFunnelEvent } from '../../utils/funnelAnalytics';

const OPCOES_GARANTIA = ['6 meses', '12 meses', '18 meses', '24 meses', 'Garantia de fábrica'];
const MESES_ANO = [
  { v: 1, l: 'Janeiro' }, { v: 2, l: 'Fevereiro' }, { v: 3, l: 'Março' },
  { v: 4, l: 'Abril' }, { v: 5, l: 'Maio' }, { v: 6, l: 'Junho' },
  { v: 7, l: 'Julho' }, { v: 8, l: 'Agosto' }, { v: 9, l: 'Setembro' },
  { v: 10, l: 'Outubro' }, { v: 11, l: 'Novembro' }, { v: 12, l: 'Dezembro' }
];

const TIPOS_IMOVEL = [
  { value: 'apartamento', label: 'Apartamento' },
  { value: 'moradia', label: 'Moradia' },
  { value: 'terreno', label: 'Terreno' },
  { value: 'loja', label: 'Loja / Comércio' },
  { value: 'escritorio', label: 'Escritório' },
];
const TIPOS_SEM_TIPOLOGIA = ['terreno', 'loja', 'escritorio'];
const EXTRAS_RAPIDOS_CARRO = ['GPS', 'Câmara traseira', 'Sensores estacionamento', 'Bancos aquecidos', 'Teto panorâmico', 'Jantes especiais'];
const EXTRAS_RAPIDOS_IMOVEL = ['Piscina', 'Varanda', 'Terraço', 'Ar condicionado', 'Vista mar', 'Elevador', 'Jardim', 'Arrecadação'];
const COMODIDADES_IMOVEL = [
  { name: 'garagem', label: 'Garagem / estacionamento' },
  { name: 'piscina', label: 'Piscina' },
  { name: 'jardim', label: 'Jardim' },
  { name: 'varanda', label: 'Varanda / terraço' },
  { name: 'elevador', label: 'Elevador' },
  { name: 'arrecadacao', label: 'Arrecadação' },
  { name: 'mobilado', label: 'Mobilado' },
  { name: 'condominio', label: 'Condomínio' },
];
const ANO_ATUAL = new Date().getFullYear();
const CAMPOS_NUMERICOS_CARRO = new Set(['preco', 'km', 'ano', 'mesRegisto', 'potencia', 'cilindrada', 'portas', 'lugares']);
const CAMPOS_TEXTO_CURTO_CARRO = new Set(['versao', 'cor']);
const OPCAO_OUTRO_VEICULO = '__outro__';

const normalizarTextoLivreVeiculo = (value, max = 80) => String(value || '').replace(/\s+/g, ' ').trim().slice(0, max);
const obterMarcaFinal = (form) => form.marca === OPCAO_OUTRO_VEICULO ? normalizarTextoLivreVeiculo(form.marcaPersonalizada, 60) : normalizarTextoLivreVeiculo(form.marca, 60);
const obterModeloFinal = (form) => form.modelo === OPCAO_OUTRO_VEICULO ? normalizarTextoLivreVeiculo(form.modeloPersonalizado, 80) : normalizarTextoLivreVeiculo(form.modelo, 80);
const obterNomesModelos = (marca) => getModelosPorMarca(marca).map((modelo) => (typeof modelo === 'object' ? modelo.modelo || modelo.nome : modelo)).filter(Boolean);

const TRACOES_CARRO = [
  { value: 'dianteira', label: 'Dianteira' },
  { value: 'traseira', label: 'Traseira' },
  { value: 'integral', label: 'Integral / 4x4' },
];
const SECCOES_CARRO = [
  { value: 'usado', label: 'Usado' },
  { value: 'seminovo', label: 'Seminovo' },
  { value: 'novo', label: 'Novo' },
  { value: 'classico', label: 'Clássico' },
];
const TIPOS_VEICULO_CARRO = [
  { value: 'citadino', label: 'Citadino' },
  { value: 'utilitario', label: 'Utilitário' },
  { value: 'sedan', label: 'Sedan / Berlina' },
  { value: 'carrinha', label: 'Carrinha' },
  { value: 'suv', label: 'SUV' },
  { value: 'crossover', label: 'Crossover' },
  { value: 'coupe', label: 'Coupé' },
  { value: 'cabrio', label: 'Cabrio' },
  { value: 'monovolume', label: 'Monovolume' },
  { value: 'pickup', label: 'Pick-up' },
  { value: 'comercial', label: 'Comercial' },
  { value: 'van', label: 'Van' },
  { value: 'outro', label: 'Outro' },
];

const numeroInteiroValido = (value, min, max) => {
  const numero = Number(value);
  return Number.isInteger(numero) && numero >= min && numero <= max;
};

const validarCamposCarro = (form) => {
  if (!obterMarcaFinal(form)) return 'Indica a marca da viatura.';
  if (!obterModeloFinal(form)) return 'Indica o modelo da viatura.';
  if (!numeroInteiroValido(form.ano, 1930, ANO_ATUAL + 1)) return `O ano deve estar entre 1930 e ${ANO_ATUAL + 1}.`;
  if (!numeroInteiroValido(form.mesRegisto, 1, 12)) return 'Seleciona o mês de registo.';
  if (!numeroInteiroValido(form.km, 0, 2000000)) return 'A quilometragem deve estar entre 0 e 2 000 000 km.';
  if (!form.combustivel) return 'Seleciona o combustível.';
  if (!form.transmissao) return 'Seleciona a transmissão.';
  if (!numeroInteiroValido(form.potencia, 1, 2000)) return 'A potência deve estar entre 1 e 2000 cv.';
  if (form.combustivel !== 'eletrico' && !numeroInteiroValido(form.cilindrada, 1, 10000)) return 'A cilindrada deve estar entre 1 e 10 000 cm³.';
  if (!numeroInteiroValido(form.portas, 2, 6)) return 'O número de portas deve estar entre 2 e 6.';
  if (!numeroInteiroValido(form.lugares, 1, 9)) return 'O número de lugares deve estar entre 1 e 9.';
  if (!form.tracao) return 'Seleciona a tracção.';
  if (!form.seccao) return 'Seleciona a secção.';
  if (!form.tipoVeiculo) return 'Seleciona o tipo de veículo.';
  if (form.seccao === 'novo' && Number(form.km || 0) > 1000) return 'Viaturas novas não devem ultrapassar 1000 km. Usa Seminovo ou Usado.';
  if (form.vin && !/^[A-HJ-NPR-Z0-9]{17}$/.test(form.vin)) return 'O VIN deve ter 17 caracteres e não pode conter I, O ou Q.';
  return '';
};

const validarContactosAnuncio = (form, ehAdmin) => {
  const telefone = String(form.telefone || '').trim();
  const email = String(form.email || '').trim();
  if (ehAdmin) {
    if (!telefone && !email) return { erro: 'Indica pelo menos um contacto autorizado: telemóvel ou email.' };
    return { telefone, email };
  }
  if (!telefone || !email) return { erro: 'Indica o telemóvel e o email de contacto.' };
  return { telefone, email };
};

const ETAPAS = [
  { titulo: 'Essencial', descricao: 'Categoria, título e preço' },
  { titulo: 'Fotos e contacto', descricao: 'Imagens, localização e contactos' },
  { titulo: 'Ficha técnica', descricao: 'Detalhes, extras e descrição' },
];

// Checkbox estilizado como "chip" — reutilizado nas comodidades do imóvel
function CampoCheckbox({ name, label, checked, onChange }) {
  return (
    <label className={`pub-checkbox-item ${checked ? 'checked' : ''}`}>
      <input type="checkbox" name={name} checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
}

export default function Publicar() {
  const navigate = useNavigate();
  const { user, signed, loading: authLoading } = useAuth();

  const [contextoFocado] = useState(() => localStorage.getItem('@App:contexto_visual') || 'carro');
  const [passoAtual, setPassoAtual] = useState(1);

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [erro, setErro] = useState('');
  const [fotos, setFotos] = useState([]);
  const [equipamento, setEquipamento] = useState([]);
  const [novoExtra, setNovoExtra] = useState('');
  const [modalPremiumAberto, setModalPremiumAberto] = useState(false);
  const [limitePublicacao, setLimitePublicacao] = useState(null);
  const [dropzoneAtiva, setDropzoneAtiva] = useState(false);

  const [form, setForm] = useState(() => {
    try {
      const salvo = localStorage.getItem('@Noxvelia:rascunho_anuncio');
      if (salvo) return JSON.parse(salvo);
    } catch { /* silenciado */ }
    return {
      tipo: contextoFocado,
      titulo: '', descricao: '', videoUrl: '', preco: '', telefone: '', email: '',
      cidade: '', distrito: '', estado: 'Usado', tipoImovel: 'apartamento', tipologia: 'T2',
      area: '', areaTerreno: '', anoConstrucao: '', quartos: '', casasBanho: '',
      garagem: false, jardim: false, piscina: false, varanda: false, elevador: false,
      arrecadacao: false, mobilado: false, condominio: false, andar: '', certEnergetico: 'C',
      marca: '', marcaPersonalizada: '', modelo: '', modeloPersonalizado: '', versao: '',
      ano: '', mesRegisto: '', vin: '', km: '', combustivel: 'gasolina', transmissao: 'manual',
      potencia: '', cilindrada: '', cor: '', portas: '', lugares: '', tracao: 'dianteira',
      seccao: 'usado', tipoVeiculo: '', garantia: '', aceitaRetoma: false, destacado: false,
    };
  });

  const ehAdmin = user?.tipo === 'admin';

  useEffect(() => {
    try {
      localStorage.setItem('@Noxvelia:rascunho_anuncio', JSON.stringify(form));
    } catch { /* silenciado */ }
  }, [form]);

  useEffect(() => {
    if (!authLoading && !signed) {
      navigate('/login');
    } else if (user && !ehAdmin) {
      setForm(f => ({ ...f, telefone: user.telefone || f.telefone, email: user.email || f.email }));
    } else if (user && ehAdmin) {
      setForm(f => ({
        ...f,
        telefone: f.telefone === user.telefone ? '' : f.telefone,
        email: f.email === user.email ? '' : f.email,
      }));
    }
  }, [signed, authLoading, navigate, user, ehAdmin]);

  useEffect(() => {
    if (signed) trackFunnelEvent('publish_start', { vertical: contextoFocado });
  }, [signed, contextoFocado]);

  useEffect(() => {
    if (authLoading || !signed) return undefined;
    let ativo = true;
    api.get('/anuncios/limite-publicacao')
      .then(({ data }) => { if (ativo) setLimitePublicacao(data || null); })
      .catch(() => { if (ativo) setLimitePublicacao(null); });
    return () => { ativo = false; };
  }, [authLoading, signed, user?.premiumAtivo, user?.tipo]);

  const handle = e => {
    const { name, value, type, checked } = e.target;
    let val = type === 'checkbox' ? checked : value;
    if (CAMPOS_NUMERICOS_CARRO.has(name) && val !== '') {
      const numero = Number(val);
      val = Number.isFinite(numero) ? Math.max(0, Math.floor(numero)) : '';
    }
    if (name === 'vin') val = String(val || '').toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '').slice(0, 17);
    if (name === 'marcaPersonalizada') val = String(val || '').replace(/\s+/g, ' ').slice(0, 60);
    if (name === 'modeloPersonalizado') val = String(val || '').replace(/\s+/g, ' ').slice(0, 80);
    if (CAMPOS_TEXTO_CURTO_CARRO.has(name)) val = String(val || '').replace(/\s+/g, ' ').slice(0, name === 'versao' ? 100 : 40);

    setForm(f => {
      const updated = { ...f, [name]: val };
      if (name === 'marca') {
        updated.modelo = val === OPCAO_OUTRO_VEICULO ? OPCAO_OUTRO_VEICULO : '';
        updated.modeloPersonalizado = '';
        if (val !== OPCAO_OUTRO_VEICULO) updated.marcaPersonalizada = '';
      }
      if (name === 'modelo' && val !== OPCAO_OUTRO_VEICULO) updated.modeloPersonalizado = '';
      if (name === 'distrito') updated.cidade = '';
      if (name === 'tipoImovel') {
        if (TIPOS_SEM_TIPOLOGIA.includes(val)) {
          updated.tipologia = '-';
          updated.quartos = '';
        } else if (updated.tipologia === '-') {
          updated.tipologia = 'T2';
        }
        if (val === 'terreno') {
          updated.casasBanho = '';
          updated.garagem = false;
          updated.elevador = false;
          updated.mobilado = false;
          updated.condominio = false;
        }
      }
      if (name === 'combustivel' && val === 'eletrico') {
        updated.transmissao = 'automatico';
        updated.cilindrada = '';
      }
      if (name === 'seccao' && val === 'novo' && Number(updated.km || 0) > 1000) {
        updated.seccao = 'seminovo';
      }
      return updated;
    });
  };

  const processarFicheiros = async (files) => {
    if (!files.length) return;
    if (fotos.length + files.length > 10) {
      setErro('Apenas podes carregar no máximo 10 fotografias por anúncio.');
      return;
    }
    setUploadingImage(true);
    setErro('');
    try {
      const data = new FormData();
      data.append('kind', 'listing');
      files.forEach(file => data.append('imagens', file));
      const res = await api.post('/upload/imagens', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      const imagens = normalizeUploadedImages(res.data);
      if (imagens.length) setFotos(prev => [...prev, ...imagens]);
    } catch (err) {
      setErro(err.response?.data?.erro || 'Erro ao carregar as imagens.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageUpload = (e) => processarFicheiros(Array.from(e.target.files));

  const handleDrop = (e) => {
    e.preventDefault();
    setDropzoneAtiva(false);
    processarFicheiros(Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/')));
  };

  const handleAddExtra = (e) => {
    if (e) e.preventDefault();
    const novosExtras = normalizarExtras(novoExtra);
    if (!novosExtras.length) return;
    setEquipamento(prev => juntarExtras(prev, novosExtras));
    setNovoExtra('');
  };

  const handleAddExtraRapido = (extra) => {
    setEquipamento(prev => juntarExtras(prev, extra));
  };

  const handleRemoveExtra = (indexParaRemover) => {
    setEquipamento(prev => prev.filter((_, idx) => idx !== indexParaRemover));
  };

  const validarPasso1 = () => {
    if (!form.titulo.trim()) return 'Indica o título do anúncio.';
    if (!form.preco || Number(form.preco) <= 0) return 'Indica um preço válido.';
    return '';
  };

  const validarPasso2 = () => {
    if (fotos.length === 0) return 'É obrigatório carregar pelo menos 1 fotografia.';
    if (!form.distrito || !form.cidade) return 'Seleciona o distrito e a cidade.';
    const contacto = validarContactosAnuncio(form, ehAdmin);
    if (contacto.erro) return contacto.erro;
    return '';
  };

  const avancarPasso = () => {
    setErro('');
    if (passoAtual === 1) {
      const err = validarPasso1();
      if (err) { setErro(err); return; }
    }
    if (passoAtual === 2) {
      const err = validarPasso2();
      if (err) { setErro(err); return; }
    }
    setPassoAtual(p => Math.min(3, p + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const recuarPasso = () => {
    setErro('');
    setPassoAtual(p => Math.max(1, p - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');

    if (form.tipo === 'carro') {
      const erroCarro = validarCamposCarro(form);
      if (erroCarro) { setErro(erroCarro); setLoading(false); return; }
    }

    if (form.videoUrl && !isSupportedVideoUrl(form.videoUrl)) {
      setErro('Utiliza um link válido do YouTube ou de um tour Matterport.');
      setLoading(false);
      return;
    }

    const marcaFinal = obterMarcaFinal(form);
    const modeloFinal = obterModeloFinal(form);
    const contacto = validarContactosAnuncio(form, ehAdmin);

    try {
      const equipamentosNormalizados = normalizarExtras(equipamento);
      const semTipologia = TIPOS_SEM_TIPOLOGIA.includes(form.tipoImovel);

      const payload = {
        tipo: form.tipo,
        titulo: form.titulo,
        descricao: form.descricao,
        preco: Number(form.preco),
        telefone: contacto.telefone,
        email: contacto.email,
        fotos,
        equipamento: equipamentosNormalizados,
        videoUrl: form.videoUrl.trim(),
        localizacao: { cidade: form.cidade, distrito: form.distrito },
        garantia: form.garantia || null,
        aceitaRetoma: !!form.aceitaRetoma,
        ...(ehAdmin ? { destacado: !!form.destacado } : {}),
        ...(form.tipo === 'imovel' ? {
          imovel: {
            tipoImovel: form.tipoImovel,
            tipologia: semTipologia ? '-' : form.tipologia,
            area: Number(form.area),
            ...(form.areaTerreno ? { areaTerreno: Number(form.areaTerreno) } : {}),
            ...(!semTipologia && form.quartos !== '' ? { quartos: Number(form.quartos) } : {}),
            ...(form.tipoImovel !== 'terreno' && form.casasBanho !== '' ? { casasBanho: Number(form.casasBanho) } : {}),
            ...(form.anoConstrucao ? { anoConstrucao: Number(form.anoConstrucao) } : {}),
            ...(form.andar !== '' && form.tipoImovel !== 'terreno' ? { andar: Number(form.andar) } : {}),
            estadoConservacao: form.estado,
            garagem: form.garagem, jardim: form.jardim, piscina: form.piscina,
            varanda: form.varanda, elevador: form.elevador, arrecadacao: form.arrecadacao,
            mobilado: form.mobilado, condominio: form.condominio, certificadoEnergetico: form.certEnergetico,
          }
        } : {
          carro: {
            marca: marcaFinal, modelo: modeloFinal,
            ...(form.versao.trim() ? { versao: form.versao.trim() } : {}),
            ano: Number(form.ano),
            ...(form.mesRegisto ? { mesRegisto: Number(form.mesRegisto) } : {}),
            ...(form.vin ? { vin: form.vin.toUpperCase() } : {}),
            km: Number(form.km), combustivel: form.combustivel, transmissao: form.transmissao,
            ...(form.potencia ? { potencia: Number(form.potencia) } : {}),
            ...(form.cilindrada ? { cilindrada: Number(form.cilindrada) } : {}),
            cor: form.cor.trim(), portas: Number(form.portas), lugares: Number(form.lugares),
            tracao: form.tracao, seccao: form.seccao, tipoVeiculo: form.tipoVeiculo,
          }
        })
      };

      const res = await api.post('/anuncios', payload);
      try { localStorage.removeItem('@Noxvelia:rascunho_anuncio'); } catch {}
      trackFunnelEvent('publish_complete', { listingId: res.data?._id, vertical: form.tipo });

      if (user?.premiumAtivo === true || user?.tipo === 'admin') {
        navigate('/anuncio/' + res.data._id, { replace: true });
      } else {
        navigate('/sucesso/' + res.data._id);
      }
    } catch (err) {
      if (err.response?.data?.erro === 'LIMITE_ATINGIDO') {
        setModalPremiumAberto(true);
      } else {
        const erroBackend = err.response?.data?.erro || err.response?.data?.detalhes;
        if (Array.isArray(erroBackend)) setErro(erroBackend.join(' | '));
        else if (typeof erroBackend === 'object' && erroBackend !== null) setErro(Object.values(erroBackend).join(' | '));
        else setErro(erroBackend || 'Não foi possível publicar o anúncio.');
      }
    } finally {
      setLoading(false);
    }
  };

  const marcaFinalFormulario = obterMarcaFinal(form);
  const marcaPersonalizadaAtiva = form.marca === OPCAO_OUTRO_VEICULO;
  const modelosDisponiveis = marcaFinalFormulario && !marcaPersonalizadaAtiva ? obterNomesModelos(marcaFinalFormulario) : [];
  const cidadesDisponiveis = form.distrito ? DISTRITOS_CIDADES_PT[form.distrito] : [];
  const usoGratisAtivo = limitePublicacao && !limitePublicacao.ilimitado;
  const anunciosAtivosGratis = Number(limitePublicacao?.ativos || 0);
  const limiteGratis = Number(limitePublicacao?.limite || 5);
  const restantesGratis = Number(limitePublicacao?.restantes ?? Math.max(0, limiteGratis - anunciosAtivosGratis));
  const proximoAnuncioGratis = Math.min(Number(limitePublicacao?.proximo || anunciosAtivosGratis + 1), limiteGratis);
  const qualidade = calcularQualidadeFormulario(form, fotos, equipamento);
  const extrasRapidosDisponiveis = (form.tipo === 'carro' ? EXTRAS_RAPIDOS_CARRO : EXTRAS_RAPIDOS_IMOVEL).filter(x => !equipamento.includes(x));

  return (
    <>
      <style>{`
        .pub-root { background: var(--cor-fundo-suave, #f4f6f2); color: var(--cor-texto, #102326); min-height: 100vh; font-family: var(--nx-font-body, 'Inter', sans-serif); padding: 36px 20px 100px; box-sizing: border-box; }
        .pub-container { max-width: 860px; margin: 0 auto; width: 100%; }

        .pub-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--cor-borda, #dfe8e4); padding-bottom: 20px; margin-bottom: 24px; }
        .pub-title { font-family: var(--nx-font-display, 'Space Grotesk'), sans-serif; font-size: clamp(22px, 3vw, 28px); font-weight: 900; margin: 0; color: var(--cor-navy, #102f50); }
        .pub-draft-hint { display: inline-flex; align-items: center; gap: 6px; margin-top: 4px; color: var(--cor-texto-secundario, #5d6b78); font-size: 12px; }
        .pub-draft-dot { width: 6px; height: 6px; border-radius: 50%; background: #3ecf8e; flex-shrink: 0; }

        .pub-step-indicator { display: flex; gap: 10px; margin-bottom: 28px; }
        .pub-step-item { flex: 1; display: grid; gap: 6px; }
        .pub-step-pill { height: 5px; border-radius: 999px; background: var(--cor-borda, #dfe8e4); transition: background .25s ease; }
        .pub-step-pill.active { background: var(--cor-champagne, #d9c49c); }
        .pub-step-pill.completed { background: var(--cor-navy, #102f50); }
        .pub-step-label { font-size: 11px; font-weight: 800; letter-spacing: .04em; color: var(--cor-texto-secundario, #8b9299); }
        .pub-step-item.current .pub-step-label { color: var(--cor-navy, #102f50); }
        .pub-step-desc { display: none; }
        @media (min-width: 640px) { .pub-step-desc { display: block; font-size: 11px; color: var(--cor-texto-secundario, #8b9299); margin-top: -2px; } }

        .pub-card { background: #ffffff; border: 1px solid var(--cor-borda, #dfe8e4); border-radius: 20px; padding: clamp(20px, 4vw, 32px); box-shadow: 0 12px 32px rgba(16,35,38,0.04); }
        .pub-section-title { margin: 0 0 4px; font-family: var(--nx-font-display, 'Space Grotesk'), sans-serif; font-size: 18px; font-weight: 800; color: var(--cor-navy, #102f50); }
        .pub-subsection-title { margin: 8px 0 -6px; font-size: 12px; font-weight: 850; letter-spacing: .07em; text-transform: uppercase; color: var(--cor-texto-secundario, #8b9299); }
        .pub-label { display: flex; justify-content: space-between; align-items: baseline; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: var(--cor-texto-secundario, #4f646a); margin-bottom: 8px; }
        .pub-label-count { text-transform: none; font-weight: 600; opacity: .7; letter-spacing: 0; }
        .pub-input { width: 100%; padding: 12px 16px; background: var(--cor-fundo-suave, #f8faf7); border: 1px solid var(--cor-borda, #dfe8e4); border-radius: 11px; color: var(--cor-texto, #102326); font-size: 14px; outline: none; transition: all 0.2s; box-sizing: border-box; }
        .pub-input:focus { border-color: var(--cor-champagne, #d9c49c); background: #ffffff; box-shadow: 0 0 0 3px rgba(217,196,156,0.28); }
        .pub-input:disabled { color: #9aa6b2; background: #f0efe9; }
        .pub-hint { margin: 4px 0 0; font-size: 12px; color: var(--cor-texto-secundario, #8b9299); }

        .pub-actions-row { display: flex; justify-content: space-between; align-items: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid var(--cor-borda, #dfe8e4); }
        .pub-btn-primary { padding: 14px 26px; background: var(--cor-navy, #102f50); color: #ffffff; border: none; border-radius: 12px; font-weight: 800; font-size: 13px; cursor: pointer; transition: transform 0.15s, background .15s; letter-spacing: 0.02em; display: inline-flex; align-items: center; gap: 8px; }
        .pub-btn-primary:hover:not(:disabled) { transform: translateY(-1px); background: #071f38; }
        .pub-btn-primary:disabled { opacity: .6; cursor: not-allowed; transform: none; }
        .pub-btn-secondary { padding: 14px 22px; background: transparent; border: 1px solid var(--cor-borda, #dfe8e4); color: var(--cor-texto-secundario, #4f646a); border-radius: 12px; font-weight: 700; font-size: 13px; cursor: pointer; transition: background .15s, color .15s; }
        .pub-btn-secondary:hover { background: var(--cor-fundo-suave, #f8faf7); color: var(--cor-texto, #102326); }

        .pub-error { background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.22); color: #dc3545; padding: 12px 16px; border-radius: 10px; font-size: 13px; font-weight: 600; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }

        .pub-category-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .pub-category-card { display: flex; align-items: center; gap: 12px; padding: 16px; border-radius: 14px; border: 1.5px solid var(--cor-borda, #dfe8e4); background: #ffffff; cursor: pointer; transition: all .15s ease; text-align: left; }
        .pub-category-card svg { flex-shrink: 0; }
        .pub-category-card strong { display: block; font-size: 14px; font-weight: 800; }
        .pub-category-card span { display: block; font-size: 12px; color: var(--cor-texto-secundario, #8b9299); margin-top: 2px; }
        .pub-category-card.active { border-color: var(--cor-navy, #102f50); background: var(--cor-navy, #102f50); color: #fff; }
        .pub-category-card.active span { color: rgba(255,255,255,.72); }
        .pub-category-card.active .pub-cat-icon { background: rgba(255,255,255,.14); color: #fff; }
        .pub-cat-icon { width: 40px; height: 40px; border-radius: 10px; display: grid; place-items: center; background: var(--cor-fundo-suave, #f0efe9); color: var(--cor-navy, #102f50); }

        .pub-dropzone { border: 2px dashed var(--cor-borda, #b9cac4); border-radius: 14px; padding: 26px; display: block; text-align: center; cursor: pointer; background: var(--cor-fundo-suave, #f8faf7); transition: border-color .15s, background .15s; }
        .pub-dropzone.active-drag { border-color: var(--cor-champagne, #d9c49c); background: #fffaf0; }
        .pub-dropzone strong { display: block; font-weight: 700; font-size: 13px; margin-top: 8px; color: var(--cor-texto, #102326); }
        .pub-dropzone small { display: block; margin-top: 4px; font-size: 12px; color: var(--cor-texto-secundario, #8b9299); }

        .pub-gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(96px, 1fr)); gap: 10px; margin-top: 12px; }
        .pub-thumb { position: relative; aspect-ratio: 4/3; border-radius: 10px; overflow: hidden; border: 1px solid var(--cor-borda, #dfe8e4); }
        .pub-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .pub-thumb-cover { position: absolute; bottom: 4px; left: 4px; padding: 2px 7px; border-radius: 999px; background: rgba(16,47,80,.82); color: #fff; font-size: 9px; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; }
        .pub-thumb-del { position: absolute; top: 4px; right: 4px; background: #dc3545; color: #fff; border: none; border-radius: 50%; width: 22px; height: 22px; display: grid; place-items: center; cursor: pointer; }

        .pub-toggle-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
        .pub-toggle-grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
        .pub-toggle-pill { padding: 10px 12px; border-radius: 10px; border: 1.5px solid var(--cor-borda, #dfe8e4); background: #fff; font-size: 13px; font-weight: 700; color: var(--cor-texto, #102326); cursor: pointer; transition: all .12s ease; }
        .pub-toggle-pill.active { border-color: var(--cor-navy, #102f50); background: var(--cor-navy, #102f50); color: #fff; }

        .pub-checkbox-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
        .pub-checkbox-item { display: flex; align-items: center; gap: 9px; padding: 10px 12px; border-radius: 10px; border: 1.5px solid var(--cor-borda, #dfe8e4); background: #fff; font-size: 13px; font-weight: 650; cursor: pointer; transition: all .12s ease; }
        .pub-checkbox-item.checked { border-color: var(--cor-champagne, #d9c49c); background: #fffaf0; }
        .pub-checkbox-item input { accent-color: var(--cor-navy, #102f50); width: 15px; height: 15px; flex-shrink: 0; }

        .pub-chip-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .pub-chip { display: inline-flex; align-items: center; gap: 7px; padding: 7px 12px; border-radius: 999px; background: var(--cor-fundo-suave, #f0efe9); border: 1px solid var(--cor-borda, #dfe8e4); font-size: 12px; font-weight: 700; }
        .pub-chip button { background: none; border: none; cursor: pointer; display: grid; place-items: center; color: #8b9299; padding: 0; }
        .pub-chip-add { display: inline-flex; align-items: center; gap: 6px; padding: 7px 12px; border-radius: 999px; background: #fff; border: 1.5px dashed var(--cor-borda, #dfe8e4); font-size: 12px; font-weight: 700; color: var(--cor-navy, #102f50); cursor: pointer; }
        .pub-extra-input-row { display: flex; gap: 8px; }
        .pub-extra-input-row .pub-input { flex: 1; }

        .pub-quality-bar { height: 6px; border-radius: 999px; background: var(--cor-borda, #dfe8e4); overflow: hidden; margin-top: 6px; }
        .pub-quality-bar > div { height: 100%; background: linear-gradient(90deg, var(--cor-champagne, #d9c49c), #3ecf8e); transition: width .25s ease; }

        .pub-gratis-banner { background: #fffaf0; border: 1px solid var(--cor-champagne, #d9c49c); border-radius: 14px; padding: 14px 16px; margin-bottom: 20px; font-size: 13px; color: #46566d; }

        .pub-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .pub-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
        .pub-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        @media (max-width: 768px) { .pub-grid-2, .pub-grid-3, .pub-grid-4, .pub-checkbox-grid, .pub-toggle-grid.cols-3 { grid-template-columns: 1fr 1fr; } .pub-grid-4 { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 480px) { .pub-grid-2, .pub-grid-3, .pub-grid-4, .pub-checkbox-grid { grid-template-columns: 1fr; } }
      `}</style>

      {modalPremiumAberto && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(16,35,38,0.6)', backdropFilter: 'blur(6px)', zIndex: 999, display: 'grid', placeItems: 'center', padding: 20 }}>
          <div style={{ background: '#fff', padding: 40, borderRadius: 24, maxWidth: 460, textAlign: 'center' }}>
            <Icon path={mdiCrown} size={2} color="var(--cor-champagne, #d9c49c)" style={{ margin: '0 auto 16px' }} />
            <h2 style={{ fontFamily: 'var(--nx-font-display), sans-serif', fontSize: 24, margin: '0 0 10px', color: 'var(--cor-navy, #102f50)' }}>Limite gratuito atingido</h2>
            <p style={{ color: '#4f646a', fontSize: 14, lineHeight: 1.6, margin: '0 0 24px' }}>Atingiste o limite do plano gratuito ({limiteGratis} anúncios). Para publicar mais anúncios sem restrições, ativa o teu plano Premium.</p>
            <button onClick={() => navigate('/premium-confirmar')} className="pub-btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Aderir ao Premium</button>
            <button onClick={() => setModalPremiumAberto(false)} className="pub-btn-secondary" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}>Fechar</button>
          </div>
        </div>
      )}

      <div className="pub-root">
        <div className="pub-container">
          <div className="pub-header">
            <div>
              <h1 className="pub-title">Publicar anúncio</h1>
              <span className="pub-draft-hint"><span className="pub-draft-dot" /> Rascunho guardado automaticamente</span>
            </div>
            <button onClick={() => navigate(-1)} className="pub-btn-secondary">Cancelar</button>
          </div>

          <div className="pub-step-indicator">
            {ETAPAS.map((etapa, idx) => {
              const numero = idx + 1;
              return (
                <div className={`pub-step-item ${passoAtual === numero ? 'current' : ''}`} key={etapa.titulo}>
                  <span className={`pub-step-pill ${passoAtual >= numero ? 'active' : ''} ${passoAtual > numero ? 'completed' : ''}`} />
                  <span className="pub-step-label">{numero}. {etapa.titulo}</span>
                  <span className="pub-step-desc">{etapa.descricao}</span>
                </div>
              );
            })}
          </div>

          {usoGratisAtivo && passoAtual === 1 && (
            <div className="pub-gratis-banner">
              <strong>Plano gratuito:</strong> Anúncio {proximoAnuncioGratis} de {limiteGratis} permitidos ({restantesGratis} restante{restantesGratis === 1 ? '' : 's'}).
            </div>
          )}

          {erro && (
            <div className="pub-error">
              <Icon path={mdiAlertCircleOutline} size={0.8} style={{ flexShrink: 0 }} />
              <span>{erro}</span>
            </div>
          )}

          <div className="pub-card">
            <form onSubmit={passoAtual === 3 ? handleSubmit : (e) => { e.preventDefault(); avancarPasso(); }}>

              {/* PASSO 1: Categoria, Título e Preço */}
              {passoAtual === 1 && (
                <div style={{ display: 'grid', gap: 20 }}>
                  <h3 className="pub-section-title">O que pretendes publicar?</h3>

                  <div>
                    <label className="pub-label">Categoria</label>
                    <div className="pub-category-grid">
                      <button type="button" onClick={() => setForm(f => ({ ...f, tipo: 'carro' }))} className={`pub-category-card ${form.tipo === 'carro' ? 'active' : ''}`}>
                        <span className="pub-cat-icon"><Icon path={mdiCarOutline} size={1} /></span>
                        <span><strong>Automóvel</strong><span>Noxvelia Drive</span></span>
                      </button>
                      <button type="button" onClick={() => setForm(f => ({ ...f, tipo: 'imovel' }))} className={`pub-category-card ${form.tipo === 'imovel' ? 'active' : ''}`}>
                        <span className="pub-cat-icon"><Icon path={mdiHomeOutline} size={1} /></span>
                        <span><strong>Imóvel</strong><span>Noxvelia Estate</span></span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="pub-label">
                      Título do anúncio *
                      <span className="pub-label-count">{form.titulo.length}/100</span>
                    </label>
                    <input className="pub-input" name="titulo" value={form.titulo} onChange={handle} required maxLength={100} placeholder={form.tipo === 'carro' ? 'Ex: Audi A3 Sportback 1.6 TDI' : 'Ex: Apartamento T2 com Garagem e Varanda'} />
                  </div>

                  <div>
                    <label className="pub-label"><Icon path={mdiTagOutline} size={0.55} /> Preço (€) *</label>
                    <input className="pub-input" name="preco" type="number" min="0" value={form.preco} onChange={handle} required placeholder={form.tipo === 'carro' ? '19900' : '250000'} />
                  </div>
                </div>
              )}

              {/* PASSO 2: Fotos, Localização e Contactos */}
              {passoAtual === 2 && (
                <div style={{ display: 'grid', gap: 20 }}>
                  <h3 className="pub-section-title">Fotografias e contactos</h3>

                  <div>
                    <label className="pub-label">
                      <span><Icon path={mdiImageMultipleOutline} size={0.55} /> Fotografias (mínimo 1) *</span>
                      <span className="pub-label-count">{fotos.length}/10</span>
                    </label>
                    <label
                      className={`pub-dropzone ${dropzoneAtiva ? 'active-drag' : ''}`}
                      onDragOver={(e) => { e.preventDefault(); setDropzoneAtiva(true); }}
                      onDragLeave={() => setDropzoneAtiva(false)}
                      onDrop={handleDrop}
                    >
                      <input type="file" multiple onChange={handleImageUpload} disabled={uploadingImage} style={{ display: 'none' }} accept="image/*" />
                      <Icon path={mdiCloudUploadOutline} size={1.2} color="#4f646a" />
                      <strong>{uploadingImage ? 'A carregar imagens...' : 'Clica ou arrasta as fotografias para aqui'}</strong>
                      <small>A primeira fotografia será usada como capa do anúncio.</small>
                    </label>
                    {fotos.length > 0 && (
                      <div className="pub-gallery">
                        {fotos.map((f, i) => (
                          <div key={i} className="pub-thumb">
                            <img src={getImageUrl(f, 'thumbnail')} alt="" />
                            {i === 0 && <span className="pub-thumb-cover">Capa</span>}
                            <button type="button" onClick={() => setFotos(arr => arr.filter((_, idx) => idx !== i))} className="pub-thumb-del"><Icon path={mdiClose} size={0.5} /></button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pub-grid-2">
                    <div>
                      <label className="pub-label"><Icon path={mdiMapMarkerOutline} size={0.55} /> Distrito *</label>
                      <select className="pub-input" name="distrito" value={form.distrito} onChange={handle} required>
                        <option value="">Selecionar distrito</option>
                        {DISTRITOS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="pub-label">Cidade / Concelho *</label>
                      <select className="pub-input" name="cidade" value={form.cidade} onChange={handle} required disabled={!form.distrito}>
                        <option value="">{form.distrito ? 'Selecionar cidade' : 'Escolhe o distrito'}</option>
                        {cidadesDisponiveis.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="pub-grid-2">
                    <div>
                      <label className="pub-label">Telemóvel de contacto {ehAdmin ? '' : '*'}</label>
                      <input className="pub-input" name="telefone" type="tel" value={form.telefone} onChange={handle} required={!ehAdmin} placeholder="9XX XXX XXX" />
                    </div>
                    <div>
                      <label className="pub-label">Email de contacto {ehAdmin ? '' : '*'}</label>
                      <input className="pub-input" name="email" type="email" value={form.email} onChange={handle} required={!ehAdmin} placeholder="exemplo@email.com" />
                    </div>
                  </div>
                  {ehAdmin && <p className="pub-hint"><Icon path={mdiInformationOutline} size={0.5} /> Como administrador só precisas de preencher um dos contactos.</p>}
                </div>
              )}

              {/* PASSO 3: Ficha Técnica Completa, Extras e Descrição */}
              {passoAtual === 3 && (
                <div style={{ display: 'grid', gap: 20 }}>
                  <h3 className="pub-section-title">Ficha técnica e detalhes</h3>

                  {form.tipo === 'carro' ? (
                    <div style={{ display: 'grid', gap: 16 }}>
                      <div className="pub-grid-2">
                        <div>
                          <label className="pub-label">Marca *</label>
                          <select className="pub-input" name="marca" value={form.marca} onChange={handle} required>
                            <option value="">Selecionar marca</option>
                            {MARCAS.map(m => <option key={m} value={m}>{m}</option>)}
                            <option value={OPCAO_OUTRO_VEICULO}>Outra marca</option>
                          </select>
                          {form.marca === OPCAO_OUTRO_VEICULO && (
                            <input className="pub-input" name="marcaPersonalizada" value={form.marcaPersonalizada} onChange={handle} placeholder="Escreve a marca" required style={{ marginTop: 8 }} />
                          )}
                        </div>
                        <div>
                          <label className="pub-label">Modelo *</label>
                          <select className="pub-input" name="modelo" value={form.modelo} onChange={handle} required disabled={!form.marca}>
                            <option value="">{form.marca ? 'Selecionar modelo' : 'Escolhe a marca'}</option>
                            {modelosDisponiveis.map((mod, idx) => <option key={idx} value={mod}>{mod}</option>)}
                            {form.marca && <option value={OPCAO_OUTRO_VEICULO}>Outro modelo</option>}
                          </select>
                          {form.modelo === OPCAO_OUTRO_VEICULO && (
                            <input className="pub-input" name="modeloPersonalizado" value={form.modeloPersonalizado} onChange={handle} placeholder="Escreve o modelo" required style={{ marginTop: 8 }} />
                          )}
                        </div>
                      </div>

                      <div className="pub-grid-2">
                        <div>
                          <label className="pub-label">Versão</label>
                          <input className="pub-input" name="versao" value={form.versao} onChange={handle} placeholder="Ex: Sport 150cv" />
                        </div>
                        <div>
                          <label className="pub-label">Cor</label>
                          <input className="pub-input" name="cor" value={form.cor} onChange={handle} placeholder="Ex: Cinzento Nardo" />
                        </div>
                      </div>

                      <div className="pub-grid-4">
                        <div>
                          <label className="pub-label">Mês *</label>
                          <select className="pub-input" name="mesRegisto" value={form.mesRegisto} onChange={handle} required>
                            <option value="">Mês</option>
                            {MESES_ANO.map(m => <option key={m.v} value={m.v}>{m.l}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="pub-label">Ano *</label>
                          <input className="pub-input" name="ano" type="number" min="1930" max={ANO_ATUAL + 1} value={form.ano} onChange={handle} required placeholder="2020" />
                        </div>
                        <div>
                          <label className="pub-label">Km *</label>
                          <input className="pub-input" name="km" type="number" min="0" value={form.km} onChange={handle} required placeholder="95000" />
                        </div>
                        <div>
                          <label className="pub-label">Potência (cv) *</label>
                          <input className="pub-input" name="potencia" type="number" min="1" max="2000" value={form.potencia} onChange={handle} required placeholder="150" />
                        </div>
                      </div>

                      <div className="pub-grid-3">
                        <div>
                          <label className="pub-label">Combustível *</label>
                          <select className="pub-input" name="combustivel" value={form.combustivel} onChange={handle} required>
                            <option value="diesel">Diesel</option>
                            <option value="gasolina">Gasolina</option>
                            <option value="eletrico">Elétrico</option>
                            <option value="hibrido">Híbrido</option>
                            <option value="gpl">GPL</option>
                          </select>
                        </div>
                        <div>
                          <label className="pub-label">Transmissão *</label>
                          <select className="pub-input" name="transmissao" value={form.transmissao} onChange={handle} required disabled={form.combustivel === 'eletrico'}>
                            <option value="manual">Manual</option>
                            <option value="automatico">Automático</option>
                          </select>
                        </div>
                        <div>
                          <label className="pub-label">{form.combustivel === 'eletrico' ? 'Cilindrada (n/a)' : 'Cilindrada (cm³)'}</label>
                          <input className="pub-input" name="cilindrada" type="number" min="1" max="10000" value={form.cilindrada} onChange={handle} disabled={form.combustivel === 'eletrico'} placeholder="1600" />
                        </div>
                      </div>

                      <div className="pub-grid-3">
                        <div>
                          <label className="pub-label">Portas *</label>
                          <input className="pub-input" name="portas" type="number" min="2" max="6" value={form.portas} onChange={handle} required placeholder="5" />
                        </div>
                        <div>
                          <label className="pub-label">Lugares *</label>
                          <input className="pub-input" name="lugares" type="number" min="1" max="9" value={form.lugares} onChange={handle} required placeholder="5" />
                        </div>
                        <div>
                          <label className="pub-label">Secção *</label>
                          <select className="pub-input" name="seccao" value={form.seccao} onChange={handle} required>
                            {SECCOES_CARRO.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="pub-label">Tipo de veículo *</label>
                        <div className="pub-toggle-grid cols-3">
                          {TIPOS_VEICULO_CARRO.map(item => (
                            <button type="button" key={item.value} className={`pub-toggle-pill ${form.tipoVeiculo === item.value ? 'active' : ''}`} onClick={() => setForm(f => ({ ...f, tipoVeiculo: item.value }))}>{item.label}</button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="pub-label">Tração *</label>
                        <div className="pub-toggle-grid cols-3">
                          {TRACOES_CARRO.map(item => (
                            <button type="button" key={item.value} className={`pub-toggle-pill ${form.tracao === item.value ? 'active' : ''}`} onClick={() => setForm(f => ({ ...f, tracao: item.value }))}>{item.label}</button>
                          ))}
                        </div>
                      </div>

                      <div className="pub-grid-2">
                        <div>
                          <label className="pub-label">Garantia</label>
                          <select className="pub-input" name="garantia" value={form.garantia} onChange={handle}>
                            <option value="">Sem garantia</option>
                            {OPCOES_GARANTIA.map(g => <option key={g} value={g}>{g}</option>)}
                          </select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                          <label className={`pub-checkbox-item ${form.aceitaRetoma ? 'checked' : ''}`} style={{ width: '100%', justifyContent: 'center' }}>
                            <input type="checkbox" name="aceitaRetoma" checked={form.aceitaRetoma} onChange={handle} />
                            <span>Aceita retoma</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="pub-label">Número de chassi / VIN (opcional, para carVertical)</label>
                        <input className="pub-input" name="vin" value={form.vin} onChange={handle} placeholder="17 caracteres" maxLength={17} style={{ textTransform: 'uppercase' }} />
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gap: 16 }}>
                      <div className="pub-grid-3">
                        <div>
                          <label className="pub-label">Estado</label>
                          <select className="pub-input" name="estado" value={form.estado} onChange={handle}>
                            <option value="Novo">Novo</option>
                            <option value="Usado">Usado</option>
                            <option value="Renovado">Renovado</option>
                            <option value="Para remodelar">Para remodelar</option>
                          </select>
                        </div>
                        <div>
                          <label className="pub-label">Tipo de imóvel</label>
                          <select className="pub-input" name="tipoImovel" value={form.tipoImovel} onChange={handle}>
                            {TIPOS_IMOVEL.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="pub-label">Tipologia</label>
                          <select className="pub-input" name="tipologia" value={form.tipologia} onChange={handle} disabled={TIPOS_SEM_TIPOLOGIA.includes(form.tipoImovel)}>
                            <option value="-">-</option>
                            {['T0', 'T1', 'T2', 'T3', 'T4', 'T5+'].map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="pub-grid-3">
                        <div>
                          <label className="pub-label">Área útil (m²)</label>
                          <input className="pub-input" name="area" type="number" min="0" value={form.area} onChange={handle} placeholder="120" />
                        </div>
                        <div>
                          <label className="pub-label">Área terreno (m²)</label>
                          <input className="pub-input" name="areaTerreno" type="number" min="0" value={form.areaTerreno} onChange={handle} placeholder="300" />
                        </div>
                        <div>
                          <label className="pub-label">Certificado energético</label>
                          <select className="pub-input" name="certEnergetico" value={form.certEnergetico} onChange={handle}>
                            {['A+', 'A', 'B', 'B-', 'C', 'D', 'E', 'F', 'Isento'].map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="pub-grid-4">
                        {!TIPOS_SEM_TIPOLOGIA.includes(form.tipoImovel) && (
                          <div>
                            <label className="pub-label">Quartos</label>
                            <input className="pub-input" name="quartos" type="number" min="0" value={form.quartos} onChange={handle} placeholder="2" />
                          </div>
                        )}
                        {form.tipoImovel !== 'terreno' && (
                          <div>
                            <label className="pub-label">Casas de banho</label>
                            <input className="pub-input" name="casasBanho" type="number" min="0" value={form.casasBanho} onChange={handle} placeholder="1" />
                          </div>
                        )}
                        <div>
                          <label className="pub-label">Ano construção</label>
                          <input className="pub-input" name="anoConstrucao" type="number" min="1800" max={ANO_ATUAL} value={form.anoConstrucao} onChange={handle} placeholder="2005" />
                        </div>
                        {form.tipoImovel !== 'terreno' && (
                          <div>
                            <label className="pub-label">Andar</label>
                            <input className="pub-input" name="andar" type="number" value={form.andar} onChange={handle} placeholder="3" />
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="pub-label">Comodidades</label>
                        <div className="pub-checkbox-grid">
                          {COMODIDADES_IMOVEL.filter(c => !(form.tipoImovel === 'terreno' && ['garagem', 'elevador', 'mobilado', 'condominio'].includes(c.name))).map(c => (
                            <CampoCheckbox key={c.name} name={c.name} label={c.label} checked={form[c.name]} onChange={handle} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="pub-label">Extras / equipamento</label>
                    {equipamento.length > 0 && (
                      <div className="pub-chip-row" style={{ marginBottom: 10 }}>
                        {equipamento.map((extra, idx) => (
                          <span className="pub-chip" key={`${extra}-${idx}`}>
                            {extra}
                            <button type="button" onClick={() => handleRemoveExtra(idx)}><Icon path={mdiClose} size={0.5} /></button>
                          </span>
                        ))}
                      </div>
                    )}
                    {extrasRapidosDisponiveis.length > 0 && (
                      <div className="pub-chip-row" style={{ marginBottom: 10 }}>
                        {extrasRapidosDisponiveis.map(extra => (
                          <button type="button" key={extra} className="pub-chip-add" onClick={() => handleAddExtraRapido(extra)}>
                            <Icon path={mdiPlus} size={0.5} /> {extra}
                          </button>
                        ))}
                      </div>
                    )}
                    <div className="pub-extra-input-row">
                      <input className="pub-input" value={novoExtra} onChange={(e) => setNovoExtra(e.target.value)} placeholder="Adicionar outro extra e pressionar Enter" onKeyDown={(e) => { if (e.key === 'Enter') handleAddExtra(e); }} />
                      <button type="button" className="pub-btn-secondary" onClick={handleAddExtra}>Adicionar</button>
                    </div>
                  </div>

                  <div>
                    <label className="pub-label">
                      Descrição do anúncio
                      <span className="pub-label-count">{form.descricao.length}/2000</span>
                    </label>
                    <textarea className="pub-input" name="descricao" value={form.descricao} onChange={handle} rows={4} maxLength={2000} placeholder="Detalhes adicionais, estado de conservação, pontos fortes..." style={{ resize: 'vertical' }} />
                  </div>

                  <div>
                    <label className="pub-label">Tour virtual / vídeo (opcional)</label>
                    <input type="url" className="pub-input" name="videoUrl" value={form.videoUrl} onChange={handle} placeholder="https://www.youtube.com/watch?v=..." />
                  </div>

                  {ehAdmin && (
                    <label className={`pub-checkbox-item ${form.destacado ? 'checked' : ''}`} style={{ width: 'fit-content' }}>
                      <input type="checkbox" name="destacado" checked={form.destacado} onChange={handle} />
                      <span>Marcar como anúncio destacado</span>
                    </label>
                  )}

                  {qualidade != null && (
                    <div>
                      <label className="pub-label">
                        Qualidade do anúncio
                        <span className="pub-label-count">{Math.round(qualidade)}%</span>
                      </label>
                      <div className="pub-quality-bar"><div style={{ width: `${Math.min(100, Math.max(0, qualidade))}%` }} /></div>
                    </div>
                  )}
                </div>
              )}

              <div className="pub-actions-row">
                {passoAtual > 1 ? (
                  <button type="button" onClick={recuarPasso} className="pub-btn-secondary">
                    <Icon path={mdiArrowLeft} size={0.7} /> Anterior
                  </button>
                ) : <div />}

                {passoAtual < 3 ? (
                  <button type="button" onClick={avancarPasso} className="pub-btn-primary">
                    Seguinte <Icon path={mdiArrowRight} size={0.7} />
                  </button>
                ) : (
                  <button type="submit" disabled={loading || uploadingImage} className="pub-btn-primary">
                    {loading ? 'A publicar...' : 'Publicar anúncio agora'} <Icon path={mdiCheck} size={0.7} />
                  </button>
                )}
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}