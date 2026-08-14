
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Icon } from '@mdi/react';
import { 
  mdiAlertCircleOutline, mdiCloudUploadOutline, mdiClose, mdiCrown, mdiStar, 
  mdiShieldCheckOutline, mdiSwapHorizontal 
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
  { value: 'loja', label: 'Loja / Comercio' },
  { value: 'escritorio', label: 'Escritorio' },
];
const TIPOS_SEM_TIPOLOGIA = ['terreno', 'loja', 'escritorio'];
const EXTRAS_RAPIDOS_CARRO = ['GPS', 'Camara traseira', 'Sensores estacionamento', 'Bancos aquecidos', 'Teto panoramico', 'Jantes especiais'];
const EXTRAS_RAPIDOS_IMOVEL = ['Piscina', 'Varanda', 'Terraco', 'Ar condicionado', 'Vista mar', 'Elevador', 'Jardim', 'Arrecadacao'];
const COMODIDADES_IMOVEL = [
  { name: 'garagem', label: 'Garagem / estacionamento' },
  { name: 'piscina', label: 'Piscina' },
  { name: 'jardim', label: 'Jardim' },
  { name: 'varanda', label: 'Varanda / terraco' },
  { name: 'elevador', label: 'Elevador' },
  { name: 'arrecadacao', label: 'Arrecadacao' },
  { name: 'mobilado', label: 'Mobilado' },
  { name: 'condominio', label: 'Condominio' },
];
const ANO_ATUAL = new Date().getFullYear();
const CAMPOS_NUMERICOS_CARRO = new Set(['preco', 'km', 'ano', 'mesRegisto', 'potencia', 'cilindrada', 'portas', 'lugares']);
const CAMPOS_TEXTO_CURTO_CARRO = new Set(['versao', 'cor']);
const OPCAO_OUTRO_VEICULO = '__outro__';
const normalizarTextoLivreVeiculo = (value, max = 80) => String(value || '').replace(/\s+/g, ' ').trim().slice(0, max);
const obterMarcaFinal = (form) => form.marca === OPCAO_OUTRO_VEICULO
  ? normalizarTextoLivreVeiculo(form.marcaPersonalizada, 60)
  : normalizarTextoLivreVeiculo(form.marca, 60);
const obterModeloFinal = (form) => form.modelo === OPCAO_OUTRO_VEICULO
  ? normalizarTextoLivreVeiculo(form.modeloPersonalizado, 80)
  : normalizarTextoLivreVeiculo(form.modelo, 80);
const obterNomesModelos = (marca) => getModelosPorMarca(marca)
  .map((modelo) => (typeof modelo === 'object' ? modelo.modelo || modelo.nome : modelo))
  .filter(Boolean);
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
    if (!telefone && !email) {
      return { erro: 'Indica pelo menos um contacto autorizado: telemóvel ou email.' };
    }
    return { telefone, email };
  }

  if (!telefone || !email) {
    return { erro: 'Indica o telemóvel e o email de contacto.' };
  }

  return { telefone, email };
};
export default function Publicar() {
  const navigate = useNavigate();
  const { user, signed, loading: authLoading } = useAuth();

  const [contextoFocado] = useState(() => {
    return localStorage.getItem('@App:contexto_visual') || 'carro';
  });

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [erro, setErro] = useState('');
  const [fotos, setFotos] = useState([]);

  const [equipamento, setEquipamento] = useState([]);
  const [novoExtra, setNovoExtra] = useState('');

  const [modalPremiumAberto, setModalPremiumAberto] = useState(false);
  const [limitePublicacao, setLimitePublicacao] = useState(null);

  const [form, setForm] = useState({
    tipo: contextoFocado,
    titulo: '',
    descricao: '',
    videoUrl: '',
    preco: '',
    telefone: '',
    email: '',
    cidade: '',
    distrito: '',
    estado: 'Usado',
    tipoImovel: 'apartamento',
    tipologia: 'T2',
    area: '',
    areaTerreno: '',
    anoConstrucao: '',
    quartos: '',
    casasBanho: '',
    garagem: false,
    jardim: false,
    piscina: false,
    varanda: false,
    elevador: false,
    arrecadacao: false,
    mobilado: false,
    condominio: false,
    andar: '',
    certEnergetico: 'C',
    marca: '',
    marcaPersonalizada: '',
    modelo: '',
    modeloPersonalizado: '',
    versao: '',
    ano: '',
    mesRegisto: '',
    vin: '',
    km: '',
    combustivel: 'gasolina',
    transmissao: 'manual',
    potencia: '',
    cilindrada: '',
    cor: '',
    portas: '',
    lugares: '',
    tracao: 'dianteira',
    seccao: 'usado',
    tipoVeiculo: '',
    garantia: '',
    aceitaRetoma: false,
    destacado: false,
  });


  const ehAdmin = user?.tipo === 'admin';

  useEffect(() => {
    if (!authLoading && !signed) {
      navigate('/login');
    } else if (user && !ehAdmin) {
      setForm(f => ({ ...f, telefone: user.telefone || '', email: user.email || '' }));
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
      .then(({ data }) => {
        if (ativo) setLimitePublicacao(data || null);
      })
      .catch(() => {
        if (ativo) setLimitePublicacao(null);
      });

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

  const removerFoto = (idx) => setFotos(f => f.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');

    if (fotos.length === 0) {
      setErro('É obrigatório carregar pelo menos 1 fotografia para publicar o anúncio.');
      setLoading(false);
      return;
    }

    if (form.tipo === 'carro') {
      const erroCarro = validarCamposCarro(form);
      if (erroCarro) {
        setErro(erroCarro);
        setLoading(false);
        return;
      }
    }

    if (form.videoUrl && !isSupportedVideoUrl(form.videoUrl)) {
      setErro('Utiliza um link válido do YouTube ou de um tour Matterport.');
      setLoading(false);
      return;
    }

    const marcaFinal = obterMarcaFinal(form);
    const modeloFinal = obterModeloFinal(form);
    const contacto = validarContactosAnuncio(form, ehAdmin);
    if (contacto.erro) {
      setErro(contacto.erro);
      setLoading(false);
      return;
    }

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
        localizacao: {
          cidade: form.cidade,
          distrito: form.distrito,
        },
        garantia: form.garantia || null,
        aceitaRetoma: !!form.aceitaRetoma,
        ...(ehAdmin ? { destacado: !!form.destacado } : {}),
        ...(form.tipo === 'imovel'
          ? {
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
                garagem: form.garagem,
                jardim: form.jardim,
                piscina: form.piscina,
                varanda: form.varanda,
                elevador: form.elevador,
                arrecadacao: form.arrecadacao,
                mobilado: form.mobilado,
                condominio: form.condominio,
                certificadoEnergetico: form.certEnergetico,
              },
            }
          : {
              carro: {
                marca: marcaFinal,
                modelo: modeloFinal,
                ...(form.versao.trim() ? { versao: form.versao.trim() } : {}),
                ano: Number(form.ano),
                ...(form.mesRegisto ? { mesRegisto: Number(form.mesRegisto) } : {}),
                ...(form.vin ? { vin: form.vin.toUpperCase() } : {}),
                km: Number(form.km),
                combustivel: form.combustivel,
                transmissao: form.transmissao,
                ...(form.potencia ? { potencia: Number(form.potencia) } : {}),
                ...(form.cilindrada ? { cilindrada: Number(form.cilindrada) } : {}),
                cor: form.cor.trim(),
                portas: Number(form.portas),
                lugares: Number(form.lugares),
                tracao: form.tracao,
                seccao: form.seccao,
                tipoVeiculo: form.tipoVeiculo,
              },
            }
        ),
      };

      const res = await api.post('/anuncios', payload);
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
        if (Array.isArray(erroBackend))
          setErro(erroBackend.join(' | '));
        else if (typeof erroBackend === 'object' && erroBackend !== null)
          setErro(Object.values(erroBackend).join(' | '));
        else
          setErro(erroBackend || 'Não foi possível publicar o anúncio. Revisa os dados preenchidos.');
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
        .pub-root { background: #f8fafc; color: #0f172a; min-height: 100%; height: auto; font-family: 'Inter', sans-serif; padding: 48px 24px; box-sizing: border-box; }
        .pub-container { max-width: 860px; margin: 0 auto; width: 100%; box-sizing: border-box; }

        .pub-header { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 24px; margin-bottom: 40px; flex-wrap: wrap; gap: 16px; }
        .pub-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 32px; font-weight: 800; margin: 0 0 4px 0; letter-spacing: -0.02em; color: #0f172a; }
        .pub-subtitle { font-size: 14px; color: #64748b; margin: 0; }

        .btn-cancel { padding: 10px 20px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; color: #475569; font-weight: 600; font-size: 13px; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
        .btn-cancel:hover { background: #f1f5f9; border-color: #cbd5e1; color: #0f172a; transform: translateY(-2px); }

        .pub-error { background: #fef2f2; border: 1px solid #fecaca; padding: 16px; border-radius: 12px; color: #ef4444; font-size: 14px; font-weight: 500; margin-bottom: 24px; display: flex; align-items: flex-start; gap: 12px; }
        .pub-limit-meter { background: #ffffff; border: 1px solid #d9c38d; border-radius: 18px; padding: 18px; margin-bottom: 18px; box-shadow: 0 12px 28px rgba(15, 23, 42, 0.07); }
        .pub-limit-meter span { display: block; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: .08em; color: #5f6f86; margin-bottom: 4px; }
        .pub-limit-meter strong { display: block; color: #06152a; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 22px; line-height: 1.1; }
        .pub-limit-meter p { margin: 10px 0 0; color: #46566d; font-size: 13px; line-height: 1.55; }
        .pub-limit-progress { overflow: hidden; height: 8px; margin-top: 14px; border-radius: 999px; background: #edf2f7; }
        .pub-limit-progress span { display: block; height: 100%; margin: 0; border-radius: inherit; background: linear-gradient(90deg, #102f50, #d9c38d); transition: width .25s ease; }
        .pub-limit-card { background: #ffffff; border: 1px solid #d9c38d; border-radius: 22px; padding: 28px; box-shadow: 0 16px 38px rgba(15, 23, 42, 0.08); }
        .pub-limit-card h2 { margin: 0 0 10px; color: #06152a; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 26px; line-height: 1.15; }
        .pub-limit-card p { margin: 0; color: #46566d; line-height: 1.65; font-size: 14px; }
        .pub-limit-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 22px; }
        .pub-limit-actions button { border: 1px solid #d8c494; border-radius: 12px; min-height: 46px; padding: 0 18px; font-weight: 800; cursor: pointer; }
        .pub-limit-primary { background: #102f50; color: #fff; }
        .pub-limit-secondary { background: #ffffff; color: #102f50; }

        .pub-form { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 24px; padding: 40px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); display: flex; flex-direction: column; gap: 40px; }

        .pub-section-header { display: flex; align-items: center; gap: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 24px; }
        .pub-section-num { width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; background: rgba(${accentRgb}, 0.1); color: ${accentColorVar}; border: 1px solid rgba(${accentRgb}, 0.2); border-radius: 50%; font-size: 11px; font-weight: 800; }
        .pub-section-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 16px; font-weight: 800; margin: 0; color: #0f172a; }

        .pub-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .pub-grid-title-price { grid-template-columns: 2fr 1fr; }
        .pub-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
        .pub-grid-4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; }
        @media (max-width: 768px) { .pub-grid-2, .pub-grid-3, .pub-grid-4, .pub-grid-title-price { grid-template-columns: 1fr; } }

        .pub-label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; margin-bottom: 7px; }

        .pub-input { width: 100%; padding: 11px 14px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; color: #0f172a; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500; outline: none; transition: border-color 0.18s ease, box-shadow 0.18s ease; box-sizing: border-box; -webkit-appearance: none; appearance: none; }
        .pub-input::placeholder { color: #94a3b8; font-weight: 400; }
        .pub-input:hover:not(:disabled):not(:focus) { border-color: #94a3b8; }
        .pub-input:disabled { opacity: 0.5; cursor: not-allowed; background: #f8fafc; }
        .pub-input:focus { border-color: ${accentColorVar}; box-shadow: 0 0 0 3px rgba(${accentRgb}, 0.15); }

        select.pub-input { cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2364748b' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 38px; }
        select.pub-input option { background: #ffffff; color: #0f172a; }
        textarea.pub-input { resize: vertical; min-height: 120px; line-height: 1.6; }

        .pub-toggle-box { display: flex; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 12px; padding: 4px; gap: 4px; }
        .pub-toggle-btn { flex: 1; padding: 10px; border: none; background: transparent; color: #64748b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
        .pub-toggle-btn:not(:disabled):hover { color: #0f172a; }
        .pub-toggle-btn:disabled { cursor: not-allowed; opacity: 0.5; }
        .pub-toggle-btn.active { background: #ffffff; color: #0f172a; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.1); opacity: 1; }

        .pub-upload-zone { border: 2px dashed #cbd5e1; border-radius: 16px; padding: 32px 16px; text-align: center; cursor: pointer; background: #f8fafc; transition: all 0.2s; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .pub-upload-zone:hover { border-color: ${accentColorVar}; background: rgba(${accentRgb}, 0.02); }
        .pub-upload-icon { color: #64748b; margin-bottom: 12px; transition: color 0.2s; }
        .pub-upload-zone:hover .pub-upload-icon { color: ${accentColorVar}; }

        .pub-gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px; margin-top: 12px; }
        .pub-thumb-wrap { position: relative; aspect-ratio: 4/3; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; background: #f8fafc; }
        .pub-thumb-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .pub-thumb-remove { position: absolute; top: 6px; right: 6px; width: 24px; height: 24px; background: #ef4444; color: #fff; border: none; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; opacity: 0; transition: opacity 0.2s; }
        .pub-thumb-wrap:hover .pub-thumb-remove { opacity: 1; }
        .pub-thumb-badge { position: absolute; bottom: 6px; left: 6px; background: ${accentColorVar}; color: #fff; font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; }

        .pub-extra-row { display: flex; gap: 8px; margin-bottom: 16px; }
        .pub-btn-add { padding: 0 20px; background: #0f172a; color: #ffffff; border: none; border-radius: 10px; font-weight: 700; font-size: 12px; text-transform: uppercase; cursor: pointer; transition: opacity 0.2s; white-space: nowrap; }
        .pub-btn-add:hover { opacity: 0.85; }

        .pub-extra-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .pub-extra-tag { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 12px; font-weight: 600; color: #0f172a; }
        .pub-extra-del { width: 18px; height: 18px; border-radius: 50%; background: #e2e8f0; color: #475569; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s, color 0.2s; }
        .pub-extra-del:hover { background: #ef4444; color: #fff; }
        .pub-quick-tags { display: flex; flex-wrap: wrap; gap: 8px; margin: -4px 0 14px; }
        .pub-quick-tag { min-height: 34px; border: 1px solid rgba(${accentRgb}, 0.24); background: rgba(${accentRgb}, 0.06); color: #0f172a; border-radius: 999px; padding: 0 11px; font-size: 11px; font-weight: 800; cursor: pointer; }
        .pub-quick-tag:hover { border-color: ${accentColorVar}; background: rgba(${accentRgb}, 0.12); }
        .pub-feature-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-top: 16px; }
        .pub-feature-tile { position: relative; min-height: 48px; display: flex; align-items: center; gap: 10px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff; padding: 12px; color: #0f172a; font-size: 12px; font-weight: 800; cursor: pointer; box-sizing: border-box; transition: border-color .2s, background .2s, box-shadow .2s; }
        .pub-feature-tile input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
        .pub-feature-box { width: 18px; height: 18px; border-radius: 6px; border: 1px solid #cbd5e1; background: #f8fafc; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .pub-feature-box::after { content: ''; width: 8px; height: 8px; border-radius: 3px; background: transparent; transition: background .2s; }
        .pub-feature-tile.is-active { border-color: ${accentColorVar}; background: rgba(${accentRgb}, 0.06); box-shadow: 0 10px 22px -20px rgba(${accentRgb}, 0.8); }
        .pub-feature-tile.is-active .pub-feature-box { border-color: ${accentColorVar}; background: rgba(${accentRgb}, 0.12); }
        .pub-feature-tile.is-active .pub-feature-box::after { background: ${accentColorVar}; }

        .pub-pro-badge { display: flex; align-items: center; gap: 12px; padding: 14px 18px; background: #fefce8; border: 1px solid #fde047; border-radius: 12px; margin-bottom: 0; box-sizing: border-box; }
        .pub-pro-badge-icon { color: #d97706; flex-shrink: 0; }
        .pub-pro-badge-text { font-size: 13px; font-weight: 600; color: #92400e; line-height: 1.4; margin: 0; }
        .pub-pro-badge-text strong { color: #d97706; }
        .pub-admin-contact-note { display: flex; align-items: flex-start; gap: 10px; padding: 13px 14px; border: 1px solid rgba(${accentRgb}, 0.3); border-radius: 12px; background: rgba(${accentRgb}, 0.08); color: #0f172a; font-size: 12.5px; font-weight: 650; line-height: 1.45; }
        .pub-admin-contact-note svg { flex: 0 0 auto; margin-top: 1px; color: ${accentColorVar}; }
        .pub-admin-contact-note strong { color: ${accentColorVar}; }

        .pub-quality-card { border: 1px solid rgba(${accentRgb}, 0.24); background: linear-gradient(135deg, rgba(${accentRgb}, 0.08), #ffffff 58%); border-radius: 16px; padding: 16px; margin-bottom: 20px; box-sizing: border-box; }
        .pub-quality-head { display: flex; align-items: center; justify-content: space-between; gap: 14px; margin-bottom: 12px; }
        .pub-quality-title { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
        .pub-quality-title strong { font-size: 14px; font-weight: 900; color: #0f172a; }
        .pub-quality-title span { font-size: 12px; color: #64748b; font-weight: 600; }
        .pub-quality-score { flex-shrink: 0; min-width: 78px; text-align: right; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 22px; font-weight: 900; color: ${accentColorVar}; line-height: 1; }
        .pub-quality-score span { font-size: 11px; color: #64748b; font-family: 'Inter', sans-serif; font-weight: 800; }
        .pub-quality-track { height: 9px; background: #e2e8f0; border-radius: 999px; overflow: hidden; }
        .pub-quality-fill { height: 100%; width: ${qualidade.percentagem}%; background: linear-gradient(90deg, #102f50, #d9c49c); border-radius: inherit; transition: width .25s ease; }
        .pub-quality-tips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
        .pub-quality-tip { border: 1px solid #e2e8f0; background: rgba(255,255,255,.84); border-radius: 999px; padding: 7px 10px; color: #475569; font-size: 11px; font-weight: 700; }

        .pub-trust-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 768px) { .pub-trust-grid { grid-template-columns: 1fr; } }
        .pub-trust-card { border: 1px solid #e2e8f0; border-radius: 14px; padding: 16px; background: #ffffff; transition: border-color .2s, background .2s, box-shadow .2s; box-sizing: border-box; }
        .pub-trust-card.is-active { border-color: ${accentColorVar}; background: rgba(${accentRgb}, 0.03); box-shadow: 0 4px 6px -1px rgba(${accentRgb}, 0.1); }
        .pub-trust-card-head { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .pub-trust-card-title { font-size: 13px; font-weight: 700; color: #0f172a; }
        .pub-trust-card-desc { font-size: 11.5px; color: #64748b; line-height: 1.5; margin: 0 0 12px; }
        .pub-switch-row { display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 13px; font-weight: 600; color: #0f172a; position: relative; }
        .pub-switch { position: relative; width: 40px; height: 22px; border-radius: 20px; background: #cbd5e1; flex-shrink: 0; transition: background .2s; }
        .pub-switch.checked { background: ${accentColorVar}; }
        .pub-switch::after { content: ''; position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: transform .2s; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
        .pub-switch.checked::after { transform: translateX(18px); }

        .pub-submit { width: 100%; padding: 18px; background: ${accentColorVar}; color: #ffffff; border: none; border-radius: 12px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 800; cursor: pointer; transition: all 0.2s; text-transform: uppercase; letter-spacing: 0.05em; box-shadow: 0 10px 25px rgba(${accentRgb}, 0.2); }
        .pub-submit:hover:not(:disabled) { filter: brightness(1.05); transform: translateY(-2px); }
        .pub-submit:disabled { background: #e2e8f0; color: #94a3b8; cursor: not-allowed; box-shadow: none; transform: none; }

        @media (max-width: 640px) {
          .pub-root { padding: 24px 12px 42px; }
          .pub-header { align-items: stretch; margin-bottom: 24px; }
          .pub-header > div:last-child, .btn-cancel { width: 100%; }
          .pub-form { padding: 22px 14px; border-radius: 18px; gap: 30px; }
          .pub-title { font-size: 26px; }
          .pub-section-header { align-items: flex-start; }
          .pub-extra-row { flex-direction: column; }
          .pub-btn-add { min-height: 44px; width: 100%; }
          .pub-feature-grid { grid-template-columns: 1fr; }
          .pub-quality-head { align-items: flex-start; flex-direction: column; }
          .pub-quality-score { text-align: left; }
          .pub-limit-actions { flex-direction: column; }
          .pub-limit-actions button { width: 100%; }
        }

        .premium-modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(8px); z-index: 99999; display: flex; align-items: center; justify-content: center; padding: 24px; animation: fadeIn 0.2s ease-out; }
        .premium-modal-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 24px; width: 100%; max-width: 520px; padding: 48px; text-align: center; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1); position: relative; animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .premium-icon-wrap { width: 80px; height: 80px; margin: 0 auto 24px; background: #fefce8; border: 2px solid #fef08a; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #eab308; }
        .premium-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 28px; font-weight: 800; color: #0f172a; margin: 0 0 12px; }
        .premium-desc { font-size: 15px; color: #475569; line-height: 1.6; margin: 0 0 32px; }
        .premium-btn { display: block; width: 100%; padding: 18px; background: #eab308; color: #ffffff; border: none; border-radius: 12px; font-family: 'Inter', sans-serif; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; font-size: 15px; cursor: pointer; transition: all 0.2s; text-decoration: none; margin-bottom: 16px; }
        .premium-btn:hover { background: #ca8a04; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(234, 179, 8, 0.2); }
        .premium-close-btn { background: transparent; border: none; color: #64748b; font-weight: 600; font-size: 13px; cursor: pointer; text-decoration: underline; text-underline-offset: 4px; transition: color 0.2s; }
        .premium-close-btn:hover { color: #0f172a; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>

      {modalPremiumAberto && (
        <div className="premium-modal-overlay">
          <div className="premium-modal-card">
            <div className="premium-icon-wrap">
              <Icon path={mdiCrown} size={1.8} />
            </div>
            <h2 className="premium-title">Limite atingido</h2>
            <p className="premium-desc">
              O plano gratuito permite manter até <strong>{limiteGratis} anúncios ativos</strong>. Os anúncios existentes continuam online; para publicar sem limite enquanto o plano estiver ativo, adere ao <strong>Premium</strong>.
            </p>
            <button className="premium-btn" onClick={() => navigate('/premium-confirmar')}>
              Aderir ao Premium
            </button>
            <button className="premium-close-btn" onClick={() => navigate('/perfil')}>
              Voltar ao meu Perfil
            </button>
          </div>
        </div>
      )}

      <div className="pub-root">
        <div className="pub-container">

          <div className="pub-header">
            <div>
              <h1 className="pub-title">Criar anúncio</h1>
              <p className="pub-subtitle">Adiciona os dados principais para o anúncio ficar claro.</p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="button" onClick={() => navigate(form.tipo === 'carro' ? '/carros' : '/imoveis')} className="btn-cancel">
                Cancelar e Voltar
              </button>
            </div>
          </div>

          {erro && (
            <div className="pub-error">
              <Icon path={mdiAlertCircleOutline} size={1} />
              <span>{erro}</span>
            </div>
          )}

          {usoGratisAtivo && (
            <div className="pub-limit-meter" role="status">
              <span>Plano gratuito</span>
              <strong>{limiteGratisAtingido ? `${limiteGratis} de ${limiteGratis} anúncios ativos` : `Anúncio ${proximoAnuncioGratis} de ${limiteGratis}`}</strong>
              <div className="pub-limit-progress" aria-hidden="true">
                <span style={{ width: `${progressoGratis}%` }} />
              </div>
              <p>
                {limiteGratisAtingido
                  ? 'Atingiste o limite de anúncios ativos gratuitos. Os anúncios atuais continuam online; para publicar mais, renova para Premium ou remove ou desativa um anúncio.'
                  : `Ainda podes publicar ${restantesGratis} anúncio${restantesGratis === 1 ? '' : 's'} ativo${restantesGratis === 1 ? '' : 's'} no plano gratuito.`}
              </p>
            </div>
          )}

          {limiteGratisAtingido ? (
            <section className="pub-limit-card">
              <h2>Limite gratuito atingido</h2>
              <p>
                O plano gratuito permite {limiteGratis} anúncios ativos. Mantemos os teus anúncios online, mas novas publicações ficam disponíveis quando passares para Premium ou ficares abaixo do limite gratuito.
              </p>
              <div className="pub-limit-actions">
                <button type="button" className="pub-limit-primary" onClick={() => navigate('/premium-confirmar')}>Ver Premium</button>
                <button type="button" className="pub-limit-secondary" onClick={() => navigate('/perfil')}>Gerir anúncios</button>
              </div>
            </section>
          ) : (
            <form onSubmit={handleSubmit} className="pub-form">

            <div>
              <div className="pub-section-header">
                <span className="pub-section-num">01</span>
                <h2 className="pub-section-title">Tipo de anúncio</h2>
              </div>
              <div className="pub-toggle-box">
                <button type="button" disabled={contextoFocado === 'carro'} className={`pub-toggle-btn ${form.tipo === 'imovel' ? 'active' : ''}`}>Imóveis</button>
                <button type="button" disabled={contextoFocado === 'imovel'} className={`pub-toggle-btn ${form.tipo === 'carro' ? 'active' : ''}`}>Automóvel</button>
              </div>
            </div>

            <div>
              <div className="pub-section-header">
                <span className="pub-section-num">02</span>
                <h2 className="pub-section-title">Fotografias *</h2>
              </div>
              <label className="pub-upload-zone">
                <input type="file" multiple onChange={handleImageUpload} disabled={uploadingImage} style={{ display: 'none' }} accept="image/*" />
                <Icon path={mdiCloudUploadOutline} size={1.5} className="pub-upload-icon" />
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>
                  {uploadingImage ? 'A carregar imagens...' : 'Solta as fotos aqui ou clica para carregar'}
                </span>
                <span style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                  Máx 10 fotografias por publicação (Mínimo 1)
                </span>
              </label>
              {fotos.length > 0 && (
                <div className="pub-gallery">
                  {fotos.map((foto, i) => (
                    <div key={i} className="pub-thumb-wrap">
                      <img src={getImageUrl(foto, 'thumbnail')} width="400" height="300" alt="" />
                      <button type="button" onClick={() => removerFoto(i)} className="pub-thumb-remove">
                        <Icon path={mdiClose} size={0.7} />
                      </button>
                      {i === 0 && <span className="pub-thumb-badge">Capa</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="pub-section-header">
                <span className="pub-section-num">03</span>
                <h2 className="pub-section-title">Dados principais</h2>
              </div>

              {ehPremium && !ehAdmin && (
                <div className="pub-pro-badge" style={{ marginBottom: '20px' }}>
                  <Icon path={mdiShieldCheckOutline} size={1.1} className="pub-pro-badge-icon" />
                  <p className="pub-pro-badge-text">
                    <strong>Plano Premium ativo</strong> — Este anúncio terá{' '}
                    <strong>mais destaque</strong> e não conta para o limite gratuito.
                  </p>
                </div>
              )}

              {ehAdmin && (
                <div className={`pub-trust-card ${form.destacado ? 'is-active' : ''}`} style={{ marginBottom: '20px' }}>
                  <div className="pub-trust-card-head">
                    <Icon path={mdiStar} size={0.9} color={accentColorVar} />
                    <span className="pub-trust-card-title">Destacar este anúncio</span>
                  </div>
                  <p className="pub-trust-card-desc">
                    Como admin podes publicar sem limite. Liga isto apenas quando quiseres dar destaque a este anúncio.
                  </p>
                  <label className="pub-switch-row">
                    <span className={`pub-switch ${form.destacado ? 'checked' : ''}`}>
                      <input
                        type="checkbox"
                        name="destacado"
                        checked={form.destacado}
                        onChange={handle}
                        style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', margin: 0, cursor: 'pointer' }}
                      />
                    </span>
                    {form.destacado ? 'Sim, destacar' : 'Não destacar'}
                  </label>
                </div>
              )}


              <div className="pub-quality-card">
                <div className="pub-quality-head">
                  <div className="pub-quality-title">
                    <strong>Força do anúncio: {qualidade.nivel}</strong>
                    <span>Anúncios completos tendem a receber mais contactos.</span>
                  </div>
                  <div className="pub-quality-score">{qualidade.score}<span>/10</span></div>
                </div>
                <div className="pub-quality-track" aria-hidden="true">
                  <div className="pub-quality-fill" />
                </div>
                {qualidade.sugestoes.length > 0 && (
                  <div className="pub-quality-tips">
                    {qualidade.sugestoes.map((sugestao) => (
                      <span key={sugestao} className="pub-quality-tip">{sugestao}</span>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="pub-grid-2 pub-grid-title-price">
                  <div>
                    <label className="pub-label">Título do anúncio *</label>
                    <input className="pub-input" name="titulo" value={form.titulo} onChange={handle} required placeholder={form.tipo === 'carro' ? "Ex: Audi A3 Sportback" : "Ex: Moradia T3 no Porto"} />
                  </div>
                  <div>
                    <label className="pub-label">Preço (€) *</label>
                    <input className="pub-input" name="preco" type="number" min="0" value={form.preco} onChange={handle} required placeholder={form.tipo === 'carro' ? "19900" : "350000"} />
                  </div>
                </div>

                {ehAdmin && (
                  <div className="pub-admin-contact-note">
                    <Icon path={mdiShieldCheckOutline} size={0.82} />
                    <span>
                      <strong>Publicação em nome de terceiros:</strong> podes preencher só telemóvel ou só email, desde que seja um contacto autorizado da pessoa dona do anúncio.
                    </span>
                  </div>
                )}

                <div className="pub-grid-2">
                  <div>
                    <label className="pub-label" style={{ color: accentColorVar }}>{ehAdmin ? 'Telemóvel da pessoa' : 'Telemóvel de Contacto *'}</label>
                    <input className="pub-input" name="telefone" type="tel" value={form.telefone} onChange={handle} required={!ehAdmin} placeholder={ehAdmin ? 'Contacto autorizado' : '9XX XXX XXX'} autoComplete="off" style={{ borderColor: `rgba(${accentRgb}, 0.4)` }} />
                  </div>
                  <div>
                    <label className="pub-label">{ehAdmin ? 'Email da pessoa' : 'Email de Contacto *'}</label>
                    <input className="pub-input" name="email" type="email" value={form.email} onChange={handle} required={!ehAdmin} placeholder={ehAdmin ? 'email autorizado' : 'exemplo@email.com'} autoComplete="off" />
                  </div>
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
                      <option value="">{form.distrito ? 'Selecionar Cidade' : 'Escolha primeiro o Distrito'}</option>
                      {cidadesDisponiveis.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="pub-label">Descrição</label>
                  <textarea className="pub-input" name="descricao" value={form.descricao} onChange={handle} rows={5} placeholder={form.tipo === 'carro' ? "Características e detalhes gerais do veículo..." : "Características, localização e detalhes gerais do imóvel..."} />
                </div>
              </div>
            </div>

            <div>
              <div className="pub-section-header">
                <span className="pub-section-num">04</span>
                <h2 className="pub-section-title">Condições</h2>
              </div>

              <div className="pub-trust-grid">
                <div className={`pub-trust-card ${form.garantia ? 'is-active' : ''}`}>
                  <div className="pub-trust-card-head">
                    <Icon path={mdiShieldCheckOutline} size={0.9} color={accentColorVar} />
                    <span className="pub-trust-card-title">Garantia</span>
                  </div>
                  <p className="pub-trust-card-desc">
                    Se ofereces garantia, escolhe o período para mostrar essa informação no anúncio.
                  </p>
                  <select className="pub-input" name="garantia" value={form.garantia} onChange={handle}>
                    <option value="">Sem garantia</option>
                    {OPCOES_GARANTIA.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>

                <div className={`pub-trust-card ${form.aceitaRetoma ? 'is-active' : ''}`}>
                  <div className="pub-trust-card-head">
                    <Icon path={mdiSwapHorizontal} size={0.9} color={accentColorVar} />
                    <span className="pub-trust-card-title">{form.tipo === 'carro' ? 'Aceita Retoma' : 'Aceita Permuta'}</span>
                  </div>
                  <p className="pub-trust-card-desc">
                    {form.tipo === 'carro' 
                      ? 'Indica se estás disposto a aceitar o carro do comprador como parte do pagamento.' 
                      : 'Indica se estás aberto a permutar o teu imóvel por outro no negócio.'}
                  </p>
                  <label className="pub-switch-row">
                    <span className={`pub-switch ${form.aceitaRetoma ? 'checked' : ''}`}>
                      <input
                        type="checkbox"
                        name="aceitaRetoma"
                        checked={form.aceitaRetoma}
                        onChange={handle}
                        style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', margin: 0, cursor: 'pointer' }}
                      />
                    </span>
                    {form.aceitaRetoma ? 'Sim, aceito' : 'Não aceito'}
                  </label>
                </div>
              </div>
            </div>

            <div>
              <div className="pub-section-header">
                <span className="pub-section-num">05</span>
                <h2 className="pub-section-title">Ficha Técnica</h2>
              </div>

              {form.tipo === 'imovel' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="pub-grid-3">
                    <div>
                      <label className="pub-label">Estado</label>
                      <select className="pub-input" name="estado" value={form.estado} onChange={handle}>
                        <option value="Novo">Novo</option>
                        <option value="Usado">Usado</option>
                        <option value="Renovado">Renovado</option>
                        <option value="Para remodelar">Para remodelar</option>
                        <option value="Em construção">Em construção</option>
                        <option value="Ruína">Ruína</option>
                      </select>
                    </div>
                    <div>
                      <label className="pub-label">Tipo de Imóvel</label>
                      <select className="pub-input" name="tipoImovel" value={form.tipoImovel} onChange={handle}>
                        {TIPOS_IMOVEL.map(tipo => <option key={tipo.value} value={tipo.value}>{tipo.label}</option>)}
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
                      <label className="pub-label">Área Útil (m²)</label>
                      <input className="pub-input" name="area" type="number" min="0" value={form.area} onChange={handle} placeholder="Ex: 120" />
                    </div>
                    <div>
                      <label className="pub-label">Área Terreno / Bruta (m²)</label>
                      <input className="pub-input" name="areaTerreno" type="number" min="0" value={form.areaTerreno} onChange={handle} placeholder="Ex: 300" />
                    </div>
                    <div>
                      <label className="pub-label">Ano de Construção</label>
                      <input className="pub-input" name="anoConstrucao" type="number" min="1000" max={new Date().getFullYear() + 5} value={form.anoConstrucao} onChange={handle} placeholder="Ex: 2015" />
                    </div>
                  </div>

                  <div className="pub-grid-3">
                    <div>
                      <label className="pub-label">Quartos</label>
                      <input className="pub-input" name="quartos" type="number" min="0" value={form.quartos} onChange={handle} placeholder="0" disabled={TIPOS_SEM_TIPOLOGIA.includes(form.tipoImovel)} />
                    </div>
                    <div>
                      <label className="pub-label">Casas de Banho</label>
                      <input className="pub-input" name="casasBanho" type="number" min="0" value={form.casasBanho} onChange={handle} placeholder="0" disabled={form.tipoImovel === 'terreno'} />
                    </div>
                    <div>
                      <label className="pub-label">Certificado Energético</label>
                      <select className="pub-input" name="certEnergetico" value={form.certEnergetico} onChange={handle}>
                        {['A+', 'A', 'B', 'B-', 'C', 'D', 'E', 'F', 'Isento'].map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="pub-grid-3">
                    <div>
                      <label className="pub-label">Andar</label>
                      <input className="pub-input" name="andar" type="number" value={form.andar} onChange={handle} placeholder="Ex: 2" disabled={form.tipoImovel === 'terreno'} />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label className="pub-label">Comodidades principais</label>
                      <div className="pub-feature-grid">
                        {COMODIDADES_IMOVEL.map(item => {
                          const disabled = form.tipoImovel === 'terreno' && ['garagem', 'elevador', 'mobilado', 'condominio'].includes(item.name);
                          return (
                            <label key={item.name} className={`pub-feature-tile ${form[item.name] ? 'is-active' : ''}`} style={disabled ? { opacity: 0.45, pointerEvents: 'none' } : undefined}>
                              <input type="checkbox" name={item.name} checked={!!form[item.name]} onChange={handle} disabled={disabled} />
                              <span className="pub-feature-box" aria-hidden="true" />
                              {item.label}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="pub-grid-2">
                    <div>
                      <label className="pub-label">Marca *</label>
                      <select className="pub-input" name="marca" value={form.marca} onChange={handle} required>
                        <option value="">Selecionar Marca</option>
                        {MARCAS.map(m => <option key={m} value={m}>{m}</option>)}
                        <option value={OPCAO_OUTRO_VEICULO}>Outra marca</option>
                      </select>
                      {marcaPersonalizadaAtiva && (
                        <input
                          className="pub-input"
                          name="marcaPersonalizada"
                          value={form.marcaPersonalizada}
                          onChange={handle}
                          placeholder="Escreve a marca"
                          maxLength={60}
                          required
                          style={{ marginTop: 8 }}
                        />
                      )}
                    </div>
                    <div>
                      <label className="pub-label">Modelo *</label>
                      <select className="pub-input" name="modelo" value={form.modelo} onChange={handle} required disabled={!form.marca}>
                        <option value="">{form.marca ? 'Selecionar Modelo' : 'Escolha primeiro a Marca'}</option>
                        {modelosDisponiveis.map((nome, idx) => <option key={idx} value={nome}>{nome}</option>)}
                        {form.marca && <option value={OPCAO_OUTRO_VEICULO}>Outro modelo</option>}
                      </select>
                      {modeloPersonalizadoAtivo && (
                        <input
                          className="pub-input"
                          name="modeloPersonalizado"
                          value={form.modeloPersonalizado}
                          onChange={handle}
                          placeholder="Escreve o modelo"
                          maxLength={80}
                          required
                          style={{ marginTop: 8 }}
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="pub-label">Versão</label>
                    <input className="pub-input" name="versao" value={form.versao} onChange={handle} placeholder="Ex: 1.9 TDI Highline" maxLength={100} />
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
                      <input className="pub-input" name="ano" type="number" min="1930" max={ANO_ATUAL + 1} step="1" value={form.ano} onChange={handle} required placeholder={String(ANO_ATUAL)} />
                    </div>
                    <div>
                      <label className="pub-label">Quilometragem *</label>
                      <input className="pub-input" name="km" type="number" min="0" max="2000000" step="1" value={form.km} onChange={handle} required placeholder="359515" />
                    </div>
                    <div>
                      <label className="pub-label">Cor Exterior</label>
                      <input className="pub-input" name="cor" value={form.cor} onChange={handle} placeholder="Ex: Preto" maxLength={40} />
                    </div>
                  </div>

                  <div className="pub-grid-4">
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
                      <label className="pub-label">Tracção *</label>
                      <select className="pub-input" name="tracao" value={form.tracao} onChange={handle} required>
                        {TRACOES_CARRO.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="pub-label">Secção *</label>
                      <select className="pub-input" name="seccao" value={form.seccao} onChange={handle} required>
                        {SECCOES_CARRO.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="pub-grid-4">
                    <div>
                      <label className="pub-label">Tipo de Veículo *</label>
                      <select className="pub-input" name="tipoVeiculo" value={form.tipoVeiculo} onChange={handle} required>
                        <option value="">Selecionar Tipo</option>
                        {TIPOS_VEICULO_CARRO.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="pub-label">Núm. Portas *</label>
                      <input className="pub-input" name="portas" type="number" min="2" max="6" step="1" value={form.portas} onChange={handle} required placeholder="5" />
                    </div>
                    <div>
                      <label className="pub-label">Núm. Lugares *</label>
                      <input className="pub-input" name="lugares" type="number" min="1" max="9" step="1" value={form.lugares} onChange={handle} required placeholder="5" />
                    </div>
                    <div>
                      <label className="pub-label">Potência (cv) *</label>
                      <input className="pub-input" name="potencia" type="number" min="1" max="2000" step="1" value={form.potencia} onChange={handle} required placeholder="130" />
                    </div>
                  </div>

                  <div className="pub-grid-2">
                    {form.combustivel !== 'eletrico' && (
                      <div>
                        <label className="pub-label">Cilindrada (cm³) *</label>
                        <input className="pub-input" name="cilindrada" type="number" min="1" max="10000" step="1" value={form.cilindrada} onChange={handle} required placeholder="1896" />
                      </div>
                    )}
                    <div>
                      <label className="pub-label">Número de Quadro / Chassi (VIN)</label>
                      <input
                        className="pub-input"
                        name="vin"
                        value={form.vin}
                        onChange={handle}
                        placeholder="Introduz o VIN (Opcional)"
                        style={{ textTransform: 'uppercase' }}
                        maxLength={17}
                        pattern="[A-HJ-NPR-Z0-9]{17}"
                        title="17 caracteres, sem I, O ou Q"
                      />
                      <span style={{ display: 'block', fontSize: '11px', color: '#64748b', marginTop: '6px' }}>
                        Se fornecido, permite aos compradores consultar o histórico na carVertical diretamente pelo teu anúncio.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div style={{ paddingTop: '24px', marginTop: '24px', borderTop: '1px solid #e2e8f0' }}>
                <label className="pub-label">
                  {form.tipo === 'carro' ? 'Equipamento & Opcionais' : 'Características & Extras'}
                </label>
                <div className="pub-extra-row">
                  <input
                    type="text"
                    className="pub-input"
                    value={novoExtra}
                    onChange={e => setNovoExtra(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAddExtra(e)}
                    placeholder={form.tipo === 'carro' ? "Ex: Teto Panorâmico" : "Ex: Piscina, Ar Condicionado, Vista Mar"}
                  />
                  <button type="button" onClick={handleAddExtra} className="pub-btn-add">Inserir</button>
                </div>
                <div className="pub-quick-tags" aria-label="Sugestoes rapidas de extras">
                  {(form.tipo === 'carro' ? EXTRAS_RAPIDOS_CARRO : EXTRAS_RAPIDOS_IMOVEL).map(extra => (
                    <button key={extra} type="button" className="pub-quick-tag" onClick={() => handleAddExtraRapido(extra)}>
                      + {extra}
                    </button>
                  ))}
                </div>
                {equipamento.length > 0 && (
                  <div className="pub-extra-tags">
                    {equipamento.map((extra, idx) => (
                      <span key={idx} className="pub-extra-tag">
                        {extra}
                        <button type="button" onClick={() => handleRemoveExtra(idx)} className="pub-extra-del">
                          <Icon path={mdiClose} size={0.6} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ paddingTop: '24px', marginTop: '24px', borderTop: '1px solid var(--nx-border)' }}>
                <label className="pub-label">Tour Virtual / Vídeo</label>
                <input
                  type="url"
                  className="pub-input"
                  name="videoUrl"
                  value={form.videoUrl}
                  onChange={handle}
                  placeholder="https://www.youtube.com/watch?v=... ou https://my.matterport.com/show/?m=..."
                  inputMode="url"
                  maxLength={500}
                />
                <span style={{ display: 'block', fontSize: '11px', color: 'var(--nx-text-sub)', marginTop: '7px', lineHeight: 1.5 }}>
                  Opcional. Aceitamos ligações públicas do YouTube e tours Matterport; o vídeo é incorporado diretamente no anúncio.
                </span>
              </div>
            </div>

            <button type="submit" disabled={loading || uploadingImage} className="pub-submit">
              Publicar anúncio
            </button>

          </form>
          )}
        </div>
      </div>
    </>
  );
}
