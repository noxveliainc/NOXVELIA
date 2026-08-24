import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Icon } from '@mdi/react';
import { 
  mdiAlertCircleOutline, mdiCloudUploadOutline, mdiClose, mdiCrown, mdiStar, 
  mdiShieldCheckOutline, mdiSwapHorizontal, mdiArrowLeft, mdiArrowRight, mdiCheck
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

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
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
  const modeloPersonalizadoAtivo = form.modelo === OPCAO_OUTRO_VEICULO;
  const modelosDisponiveis = marcaFinalFormulario && !marcaPersonalizadaAtiva ? obterNomesModelos(marcaFinalFormulario) : [];
  const cidadesDisponiveis = form.distrito ? DISTRITOS_CIDADES_PT[form.distrito] : [];
  const accentColorVar = '#102f50';
  const accentRgb = '16, 47, 80';
  const ehPremium = user?.premiumAtivo === true;
  const usoGratisAtivo = limitePublicacao && !limitePublicacao.ilimitado;
  const anunciosAtivosGratis = Number(limitePublicacao?.ativos || 0);
  const limiteGratis = Number(limitePublicacao?.limite || 5);
  const restantesGratis = Number(limitePublicacao?.restantes ?? Math.max(0, limiteGratis - anunciosAtivosGratis));
  const proximoAnuncioGratis = Math.min(Number(limitePublicacao?.proximo || anunciosAtivosGratis + 1), limiteGratis);
  const limiteGratisAtingido = usoGratisAtivo && restantesGratis <= 0;
  const progressoGratis = Math.min(100, Math.max(0, (anunciosAtivosGratis / Math.max(limiteGratis, 1)) * 100));
  const qualidade = calcularQualidadeFormulario(form, fotos, equipamento);

  return (
    <>
      <style>{`
        .pub-root { background: #f4f7f3; color: #102326; min-height: 100vh; font-family: 'Inter', sans-serif; padding: 36px 20px 80px; box-sizing: border-box; }
        .pub-container { max-width: 820px; margin: 0 auto; width: 100%; }
        
        .pub-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #dfe8e4; padding-bottom: 20px; margin-bottom: 28px; }
        .pub-title { font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 800; margin: 0; color: #102326; }
        .pub-steps-bar { display: flex; gap: 8px; margin-bottom: 28px; }
        .pub-step-pill { flex: 1; height: 6px; border-radius: 999px; background: #dfe8e4; transition: background 0.3s; }
        .pub-step-pill.active { background: #9d7b3f; }
        .pub-step-pill.completed { background: #168b82; }

        .pub-card { background: #ffffff; border: 1px solid #dfe8e4; border-radius: 20px; padding: 32px; box-shadow: 0 12px 32px rgba(16,35,38,0.04); }
        .pub-label { display: block; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #4f646a; margin-bottom: 8px; font-family: 'JetBrains Mono', monospace; }
        .pub-input { width: 100%; padding: 12px 16px; background: #f8faf7; border: 1px solid #dfe8e4; border-radius: 11px; color: #102326; font-size: 14px; outline: none; transition: all 0.2s; box-sizing: border-box; }
        .pub-input:focus { border-color: #9d7b3f; background: #ffffff; box-shadow: 0 0 0 3px rgba(157,123,63,0.12); }
        
        .pub-actions-row { display: flex; justify-content: space-between; align-items: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid #dfe8e4; }
        .pub-btn-primary { padding: 14px 28px; background: #102326; color: #ffffff; border: none; border-radius: 12px; font-weight: 800; font-size: 13px; cursor: pointer; transition: transform 0.15s; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.05em; display: inline-flex; align-items: center; gap: 8px; }
        .pub-btn-primary:hover { transform: translateY(-1px); background: #16383e; }
        .pub-btn-secondary { padding: 14px 24px; background: transparent; border: 1px solid #dfe8e4; color: #4f646a; border-radius: 12px; font-weight: 700; font-size: 13px; cursor: pointer; }
        .pub-btn-secondary:hover { background: #f8faf7; color: #102326; }
        
        .pub-error { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2); color: #ef4444; padding: 12px 16px; border-radius: 10px; font-size: 13px; font-weight: 600; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
        
        .pub-gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px; margin-top: 12px; }
        .pub-thumb { position: relative; aspect-ratio: 4/3; border-radius: 8px; overflow: hidden; border: 1px solid #dfe8e4; }
        .pub-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .pub-thumb-del { position: absolute; top: 4px; right: 4px; background: #ef4444; color: #fff; border: none; border-radius: 50%; width: 22px; height: 22px; display: grid; place-items: center; cursor: pointer; }
        
        .pub-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .pub-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
        .pub-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        @media (max-width: 768px) { .pub-grid-2, .pub-grid-3, .pub-grid-4 { grid-template-columns: 1fr; } }
      `}</style>

      {modalPremiumAberto && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(16,35,38,0.6)', backdropFilter: 'blur(6px)', zIndex: 999, display: 'grid', placeItems: 'center', padding: 20 }}>
          <div style={{ background: '#fff', padding: 40, borderRadius: 24, maxWidth: 460, textAlign: 'center' }}>
            <Icon path={mdiCrown} size={2} color="#9d7b3f" style={{ margin: '0 auto 16px' }} />
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 24, margin: '0 0 10px' }}>Limite gratuito atingido</h2>
            <p style={{ color: '#4f646a', fontSize: 14, lineHeight: 1.6, margin: '0 0 24px' }}>Atingiste o limite do plano gratuito ({limiteGratis} anúncios). Para publicar mais anúncios sem restrições, ativa o teu plano Premium.</p>
            <button onClick={() => navigate('/premium-confirmar')} className="pub-btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Aderir ao Premium</button>
          </div>
        </div>
      )}

      <div className="pub-root">
        <div className="pub-container">
          <div className="pub-header">
            <div>
              <h1 className="pub-title">Publicar Anúncio</h1>
              <p style={{ margin: '4px 0 0', color: '#4f646a', fontSize: '13px' }}>Passo {passoAtual} de 3 — Noxvelia</p>
            </div>
            <button onClick={() => navigate(-1)} className="pub-btn-secondary">Cancelar</button>
          </div>

          <div className="pub-steps-bar">
            <span className={`pub-step-pill ${passoAtual >= 1 ? 'active' : ''} ${passoAtual > 1 ? 'completed' : ''}`} />
            <span className={`pub-step-pill ${passoAtual >= 2 ? 'active' : ''} ${passoAtual > 2 ? 'completed' : ''}`} />
            <span className={`pub-step-pill ${passoAtual === 3 ? 'active' : ''}`} />
          </div>

          {usoGratisAtivo && passoAtual === 1 && (
            <div style={{ background: '#fff', border: '1px solid #d9c38d', borderRadius: 14, padding: 16, marginBottom: 20, fontSize: 13, color: '#46566d' }}>
              <strong>Plano gratuito:</strong> Anúncio {proximoAnuncioGratis} de {limiteGratis} permitidos.
            </div>
          )}

          {erro && (
            <div className="pub-error">
              <Icon path={mdiAlertCircleOutline} size={0.8} />
              <span>{erro}</span>
            </div>
          )}

          <div className="pub-card">
            <form onSubmit={passoAtual === 3 ? handleSubmit : (e) => { e.preventDefault(); avancarPasso(); }}>
              
              {/* PASSO 1: Categoria, Título e Preço */}
              {passoAtual === 1 && (
                <div style={{ display: 'grid', gap: 20 }}>
                  <h3 style={{ margin: '0 0 4px', fontFamily: 'Space Grotesk', fontSize: 18 }}>1. O que pretendes publicar?</h3>
                  
                  <div>
                    <label className="pub-label">Categoria</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      <button type="button" onClick={() => setForm(f => ({ ...f, tipo: 'carro' }))} className="pub-btn-secondary" style={{ borderColor: form.tipo === 'carro' ? '#102326' : '#dfe8e4', background: form.tipo === 'carro' ? '#102326' : '#fff', color: form.tipo === 'carro' ? '#fff' : '#102326' }}>Automóvel (Drive)</button>
                      <button type="button" onClick={() => setForm(f => ({ ...f, tipo: 'imovel' }))} className="pub-btn-secondary" style={{ borderColor: form.tipo === 'imovel' ? '#102326' : '#dfe8e4', background: form.tipo === 'imovel' ? '#102326' : '#fff', color: form.tipo === 'imovel' ? '#fff' : '#102326' }}>Imóvel (Estate)</button>
                    </div>
                  </div>

                  <div>
                    <label className="pub-label">Título do Anúncio *</label>
                    <input className="pub-input" name="titulo" value={form.titulo} onChange={handle} required placeholder={form.tipo === 'carro' ? "Ex: Audi A3 Sportback 1.6 TDI" : "Ex: Apartamento T2 com Garagem e Varanda"} />
                  </div>

                  <div>
                    <label className="pub-label">Preço (€) *</label>
                    <input className="pub-input" name="preco" type="number" min="0" value={form.preco} onChange={handle} required placeholder={form.tipo === 'carro' ? "19900" : "250000"} />
                  </div>
                </div>
              )}

              {/* PASSO 2: Fotos, Localização e Contactos */}
              {passoAtual === 2 && (
                <div style={{ display: 'grid', gap: 20 }}>
                  <h3 style={{ margin: '0 0 4px', fontFamily: 'Space Grotesk', fontSize: 18 }}>2. Fotografias e Contactos</h3>
                  
                  <div>
                    <label className="pub-label">Fotografias (Mínimo 1) *</label>
                    <label style={{ border: '2px dashed #b9cac4', borderRadius: 12, padding: '24px', display: 'block', textAlign: 'center', cursor: 'pointer', background: '#f8faf7' }}>
                      <input type="file" multiple onChange={handleImageUpload} disabled={uploadingImage} style={{ display: 'none' }} accept="image/*" />
                      <Icon path={mdiCloudUploadOutline} size={1.2} color="#4f646a" />
                      <span style={{ display: 'block', fontWeight: 700, fontSize: 13, marginTop: 8 }}>{uploadingImage ? 'A carregar imagens...' : 'Clica para carregar fotografias (máx. 10)'}</span>
                    </label>
                    {fotos.length > 0 && (
                      <div className="pub-gallery">
                        {fotos.map((f, i) => (
                          <div key={i} className="pub-thumb">
                            <img src={getImageUrl(f, 'thumbnail')} alt="" />
                            <button type="button" onClick={() => setFotos(arr => arr.filter((_, idx) => idx !== i))} className="pub-thumb-del"><Icon path={mdiClose} size={0.5} /></button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pub-grid-2">
                    <div>
                      <label className="pub-label">Distrito *</label>
                      <select className="pub-input" name="distrito" value={form.distrito} onChange={handle} required>
                        <option value="">Selecionar Distrito</option>
                        {DISTRITOS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="pub-label">Cidade / Concelho *</label>
                      <select className="pub-input" name="cidade" value={form.cidade} onChange={handle} required disabled={!form.distrito}>
                        <option value="">{form.distrito ? 'Selecionar Cidade' : 'Escolha o Distrito'}</option>
                        {cidadesDisponiveis.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="pub-grid-2">
                    <div>
                      <label className="pub-label">Telemóvel de Contacto *</label>
                      <input className="pub-input" name="telefone" type="tel" value={form.telefone} onChange={handle} required placeholder="9XX XXX XXX" />
                    </div>
                    <div>
                      <label className="pub-label">Email de Contacto *</label>
                      <input className="pub-input" name="email" type="email" value={form.email} onChange={handle} required placeholder="exemplo@email.com" />
                    </div>
                  </div>
                </div>
              )}

              {/* PASSO 3: Ficha Técnica Completa, Extras e Descrição */}
              {passoAtual === 3 && (
                <div style={{ display: 'grid', gap: 20 }}>
                  <h3 style={{ margin: '0 0 4px', fontFamily: 'Space Grotesk', fontSize: 18 }}>3. Ficha Técnica e Detalhes</h3>

                  {form.tipo === 'carro' ? (
                    <div style={{ display: 'grid', gap: 14 }}>
                      <div className="pub-grid-2">
                        <div>
                          <label className="pub-label">Marca *</label>
                          <select className="pub-input" name="marca" value={form.marca} onChange={handle} required>
                            <option value="">Selecionar Marca</option>
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
                            <option value="">{form.marca ? 'Selecionar Modelo' : 'Escolha a Marca'}</option>
                            {modelosDisponiveis.map((mod, idx) => <option key={idx} value={mod}>{mod}</option>)}
                            {form.marca && <option value={OPCAO_OUTRO_VEICULO}>Outro modelo</option>}
                          </select>
                          {form.modelo === OPCAO_OUTRO_VEICULO && (
                            <input className="pub-input" name="modeloPersonalizado" value={form.modeloPersonalizado} onChange={handle} placeholder="Escreve o modelo" required style={{ marginTop: 8 }} />
                          )}
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
                          <label className="pub-label">Quilómetros *</label>
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
                          <label className="pub-label">Secção *</label>
                          <select className="pub-input" name="seccao" value={form.seccao} onChange={handle} required>
                            {SECCOES_CARRO.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="pub-label">Número de Chassi / VIN (Opcional para carVertical)</label>
                        <input className="pub-input" name="vin" value={form.vin} onChange={handle} placeholder="17 caracteres" maxLength={17} style={{ textTransform: 'uppercase' }} />
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gap: 14 }}>
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
                          <label className="pub-label">Tipo de Imóvel</label>
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

                      <div className="pub-grid-2">
                        <div>
                          <label className="pub-label">Área Útil (m²)</label>
                          <input className="pub-input" name="area" type="number" min="0" value={form.area} onChange={handle} placeholder="120" />
                        </div>
                        <div>
                          <label className="pub-label">Certificado Energético</label>
                          <select className="pub-input" name="certEnergetico" value={form.certEnergetico} onChange={handle}>
                            {['A+', 'A', 'B', 'B-', 'C', 'D', 'E', 'F', 'Isento'].map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="pub-label">Descrição do Anúncio</label>
                    <textarea className="pub-input" name="descricao" value={form.descricao} onChange={handle} rows={4} placeholder="Detalhes adicionais, estado de conservação, pontos fortes..." style={{ resize: 'vertical' }} />
                  </div>

                  <div>
                    <label className="pub-label">Tour Virtual / Vídeo (Opcional)</label>
                    <input type="url" className="pub-input" name="videoUrl" value={form.videoUrl} onChange={handle} placeholder="https://www.youtube.com/watch?v=..." />
                  </div>
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
                  <button type="submit" disabled={loading || uploadingImage} className="pub-btn-primary" style={{ background: '#168b82' }}>
                    {loading ? 'A publicar...' : 'Publicar Anúncio Agora'} <Icon path={mdiCheck} size={0.7} />
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