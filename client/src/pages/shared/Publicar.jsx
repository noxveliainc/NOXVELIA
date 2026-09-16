import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Icon } from '@mdi/react';
import imageCompression from 'browser-image-compression';
import {
  mdiAlertCircleOutline, mdiCloudUploadOutline, mdiClose, mdiCrown, mdiCarOutline,
  mdiHomeOutline, mdiImageMultipleOutline, mdiMapMarkerOutline, mdiTagOutline,
  mdiPlus, mdiInformationOutline, mdiArrowLeft, mdiArrowRight, mdiCheck, mdiLoading
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

  // 🔥 FUNÇÃO MÁGICA: Define o erro e força o scroll para o topo!
  const mostrarErro = (mensagem) => {
    setErro(mensagem);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      mostrarErro('Apenas podes carregar no máximo 10 fotografias por anúncio.');
      return;
    }
    setUploadingImage(true);
    setErro('');

    try {
      const compressedFiles = await Promise.all(
        files.map(async (file) => {
          const options = {
            maxSizeMB: 0.8,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          };
          try {
            return await imageCompression(file, options);
          } catch (e) {
            console.warn("Erro ao comprimir imagem, a enviar a original.", e);
            return file; 
          }
        })
      );

      const data = new FormData();
      data.append('kind', 'listing');
      compressedFiles.forEach((file, index) => {
        data.append('imagens', file, files[index].name);
      });

      const res = await api.post('/upload/imagens', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      const imagens = normalizeUploadedImages(res.data);
      if (imagens.length) setFotos(prev => [...prev, ...imagens]);

    } catch (err) {
      mostrarErro(err.response?.data?.erro || 'Erro ao carregar as imagens. Verifica a tua ligação.');
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
    if (fotos.length === 0) return 'É obrigatório carregar pelo menos 1 fotografia da galeria.';
    if (!form.distrito || !form.cidade) return 'Seleciona o distrito e a cidade.';
    const contacto = validarContactosAnuncio(form, ehAdmin);
    if (contacto.erro) return contacto.erro;
    return '';
  };

  const avancarPasso = () => {
    setErro('');
    if (uploadingImage) {
      mostrarErro('Por favor, aguarda que as imagens terminem de ser carregadas antes de avançar.');
      return;
    }

    if (passoAtual === 1) {
      const err = validarPasso1();
      if (err) { mostrarErro(err); return; }
    }
    if (passoAtual === 2) {
      const err = validarPasso2();
      if (err) { mostrarErro(err); return; }
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
    if (uploadingImage) {
      mostrarErro('Por favor, aguarda que as imagens terminem de ser carregadas.');
      return;
    }
    
    setLoading(true);
    setErro('');

    if (form.tipo === 'carro') {
      const erroCarro = validarCamposCarro(form);
      if (erroCarro) { mostrarErro(erroCarro); setLoading(false); return; }
    }

    if (form.videoUrl && !isSupportedVideoUrl(form.videoUrl)) {
      mostrarErro('Utiliza um link válido do YouTube ou de um tour Matterport.');
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
        if (Array.isArray(erroBackend)) mostrarErro(erroBackend.join(' | '));
        else if (typeof erroBackend === 'object' && erroBackend !== null) mostrarErro(Object.values(erroBackend).join(' | '));
        else mostrarErro(erroBackend || 'Não foi possível publicar o anúncio.');
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
        .pub-root { background: #f8fafc; color: #0f172a; min-height: 100vh; font-family: 'Inter', sans-serif; padding: 40px 20px 100px; box-sizing: border-box; }
        .pub-container { max-width: 900px; margin: 0 auto; width: 100%; }

        .pub-header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 32px; }
        .pub-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(26px, 3.5vw, 36px); font-weight: 900; margin: 0; color: #0f172a; letter-spacing: -0.02em; line-height: 1.1; }
        .pub-draft-hint { display: inline-flex; align-items: center; gap: 8px; margin-top: 8px; color: #64748b; font-size: 13px; font-weight: 600; }
        .pub-draft-dot { width: 8px; height: 8px; border-radius: 50%; background: #10b981; flex-shrink: 0; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15); }

        .pub-step-indicator { display: flex; gap: 16px; margin-bottom: 40px; }
        .pub-step-item { flex: 1; display: grid; gap: 8px; }
        .pub-step-pill { height: 6px; border-radius: 999px; background: #e2e8f0; transition: background .3s ease; }
        .pub-step-pill.active { background: #d9c49c; }
        .pub-step-pill.completed { background: #102f50; }
        .pub-step-label { font-size: 12px; font-weight: 800; letter-spacing: .05em; color: #64748b; text-transform: uppercase; }
        .pub-step-item.current .pub-step-label { color: #102f50; }
        .pub-step-desc { display: none; }
        @media (min-width: 640px) { .pub-step-desc { display: block; font-size: 13px; color: #94a3b8; font-weight: 500; } }

        .pub-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 24px; padding: clamp(24px, 5vw, 48px); box-shadow: 0 20px 40px -20px rgba(15,23,42,0.08); }
        .pub-section-title { margin: 0 0 24px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 24px; font-weight: 800; color: #071326; letter-spacing: -0.01em; }
        
        .pub-label { display: flex; justify-content: space-between; align-items: baseline; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; margin-bottom: 10px; }
        .pub-label-count { text-transform: none; font-weight: 600; opacity: .7; letter-spacing: 0; }
        
        .pub-input { width: 100%; padding: 14px 16px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; color: #0f172a; font-size: 15px; font-weight: 500; outline: none; transition: all 0.2s; box-sizing: border-box; }
        .pub-input:focus { border-color: #102f50; background: #ffffff; box-shadow: 0 0 0 3px rgba(16, 47, 80, 0.1); }
        .pub-input:disabled { color: #94a3b8; background: #f1f5f9; cursor: not-allowed; }
        .pub-hint { margin: 6px 0 0; font-size: 13px; color: #64748b; font-weight: 500; }

        .pub-actions-row { display: flex; justify-content: space-between; align-items: center; margin-top: 40px; padding-top: 24px; border-top: 1px solid #e2e8f0; }
        .pub-btn-primary { padding: 16px 32px; background: #102f50; color: #ffffff; border: none; border-radius: 12px; font-weight: 800; font-size: 15px; cursor: pointer; transition: transform 0.15s, background .15s, box-shadow .15s; letter-spacing: 0.02em; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 8px 16px -8px rgba(16,47,80,0.6); }
        .pub-btn-primary:hover:not(:disabled) { transform: translateY(-2px); background: #071326; box-shadow: 0 12px 20px -8px rgba(16,47,80,0.8); }
        .pub-btn-primary:disabled { opacity: .6; cursor: not-allowed; transform: none; box-shadow: none; }
        
        .pub-btn-secondary { padding: 16px 28px; background: transparent; border: 1px solid #cbd5e1; color: #475569; border-radius: 12px; font-weight: 800; font-size: 15px; cursor: pointer; transition: background .15s, color .15s, border-color .15s; display: inline-flex; align-items: center; gap: 8px; }
        .pub-btn-secondary:hover { background: #f8fafc; color: #0f172a; border-color: #94a3b8; }

        .pub-error { background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2); color: #b91c1c; padding: 16px; border-radius: 12px; font-size: 14px; font-weight: 600; margin-bottom: 24px; display: flex; align-items: flex-start; gap: 12px; line-height: 1.5; }

        .pub-category-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .pub-category-card { display: flex; align-items: center; gap: 16px; padding: 20px; border-radius: 16px; border: 2px solid #e2e8f0; background: #ffffff; cursor: pointer; transition: all .2s ease; text-align: left; box-shadow: 0 4px 6px -4px rgba(15,23,42,0.05); }
        .pub-category-card:hover { border-color: #cbd5e1; background: #f8fafc; transform: translateY(-2px); }
        .pub-category-card svg { flex-shrink: 0; }
        .pub-category-card strong { display: block; font-size: 16px; font-weight: 800; color: #0f172a; }
        .pub-category-card span { display: block; font-size: 13px; color: #64748b; margin-top: 2px; font-weight: 500; }
        .pub-category-card.active { border-color: #102f50; background: #102f50; color: #fff; box-shadow: 0 10px 20px -10px rgba(16,47,80,0.5); }
        .pub-category-card.active strong { color: #ffffff; }
        .pub-category-card.active span { color: rgba(255,255,255,.72); }
        .pub-category-card.active .pub-cat-icon { background: rgba(255,255,255,.1); color: #d9c49c; }
        .pub-cat-icon { width: 48px; height: 48px; border-radius: 12px; display: grid; place-items: center; background: #f1f5f9; color: #475569; }

        /* DROPZONE PREMIUM E ESTADOS DE UPLOAD */
        .pub-dropzone { border: 2px dashed #cbd5e1; border-radius: 16px; padding: 40px 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; cursor: pointer; background: #f8fafc; transition: all .2s ease; margin-bottom: 8px; }
        .pub-dropzone:hover, .pub-dropzone.active-drag { border-color: #d9c49c; background: #fffdf5; }
        .pub-dropzone-icon { width: 64px; height: 64px; border-radius: 50%; background: #ffffff; border: 1px solid #e2e8f0; display: grid; place-items: center; margin-bottom: 16px; color: #102f50; box-shadow: 0 4px 10px rgba(15,23,42,0.05); transition: 0.2s; }
        .pub-dropzone:hover .pub-dropzone-icon { transform: scale(1.05); color: #d9c49c; border-color: #d9c49c; }
        .pub-dropzone strong { display: block; font-weight: 800; font-size: 16px; color: #0f172a; margin-bottom: 6px; }
        .pub-dropzone small { display: block; font-size: 13px; color: #64748b; font-weight: 500; }
        
        .upload-banner { margin: 12px 0 24px; padding: 16px; background: #e0f2fe; border: 1px solid #bae6fd; border-radius: 12px; display: flex; align-items: center; gap: 12px; color: #0369a1; font-weight: 700; font-size: 14px; }
        .spin-icon { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }

        .pub-gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 16px; margin-top: 16px; margin-bottom: 24px;}
        .pub-thumb { position: relative; aspect-ratio: 4/3; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(15,23,42,0.05); }
        .pub-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .pub-thumb-cover { position: absolute; bottom: 8px; left: 8px; padding: 4px 10px; border-radius: 6px; background: rgba(16,47,80,.9); color: #fff; font-size: 10px; font-weight: 800; letter-spacing: .05em; text-transform: uppercase; backdrop-filter: blur(4px); }
        .pub-thumb-del { position: absolute; top: 8px; right: 8px; background: #ef4444; color: #fff; border: none; border-radius: 50%; width: 26px; height: 26px; display: grid; place-items: center; cursor: pointer; transition: 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
        .pub-thumb-del:hover { background: #b91c1c; transform: scale(1.1); }

        .pub-toggle-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .pub-toggle-grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
        .pub-toggle-pill { padding: 14px; border-radius: 12px; border: 1px solid #cbd5e1; background: #ffffff; font-size: 14px; font-weight: 700; color: #475569; cursor: pointer; transition: all .15s ease; }
        .pub-toggle-pill:hover { border-color: #94a3b8; background: #f8fafc; }
        .pub-toggle-pill.active { border-color: #102f50; background: #102f50; color: #fff; box-shadow: 0 6px 12px -4px rgba(16,47,80,0.3); }

        .pub-checkbox-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .pub-checkbox-item { display: flex; align-items: center; gap: 12px; padding: 14px; border-radius: 12px; border: 1px solid #cbd5e1; background: #ffffff; font-size: 14px; font-weight: 600; color: #475569; cursor: pointer; transition: all .15s ease; }
        .pub-checkbox-item:hover { background: #f8fafc; border-color: #94a3b8; }
        .pub-checkbox-item.checked { border-color: #d9c49c; background: #fffcf5; color: #0f172a; font-weight: 700; }
        .pub-checkbox-item input { accent-color: #102f50; width: 18px; height: 18px; flex-shrink: 0; }

        .pub-chip-row { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 16px; }
        .pub-chip { display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px; border-radius: 8px; background: #f1f5f9; border: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #334155; }
        .pub-chip button { background: none; border: none; cursor: pointer; display: grid; place-items: center; color: #64748b; padding: 0; transition: 0.2s; }
        .pub-chip button:hover { color: #ef4444; }
        
        .pub-chip-add { display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 8px; background: #ffffff; border: 1px dashed #cbd5e1; font-size: 13px; font-weight: 600; color: #102f50; cursor: pointer; transition: 0.2s; }
        .pub-chip-add:hover { background: #f8fafc; border-color: #102f50; }
        
        .pub-extra-input-row { display: flex; gap: 12px; }
        .pub-extra-input-row .pub-input { flex: 1; }

        .pub-quality-bar { height: 8px; border-radius: 999px; background: #e2e8f0; overflow: hidden; margin-top: 8px; }
        .pub-quality-bar > div { height: 100%; background: linear-gradient(90deg, #d9c49c, #10b981); transition: width .4s cubic-bezier(0.4, 0, 0.2, 1); }

        .pub-gratis-banner { background: #fffbeb; border: 1px solid #fde68a; border-radius: 16px; padding: 16px 20px; margin-bottom: 24px; font-size: 14px; color: #b45309; font-weight: 500; display: flex; align-items: center; gap: 12px; }
        .pub-gratis-banner strong { color: #92400e; font-weight: 800; }

        .pub-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .pub-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
        .pub-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        
        @media (max-width: 768px) { 
          .pub-grid-2, .pub-grid-3, .pub-grid-4, .pub-checkbox-grid, .pub-toggle-grid.cols-3 { grid-template-columns: 1fr 1fr; gap: 16px; } 
          .pub-actions-row { flex-direction: column-reverse; gap: 16px; }
          .pub-btn-primary, .pub-btn-secondary { width: 100%; justify-content: center; }
        }
        @media (max-width: 480px) { 
          .pub-grid-2, .pub-grid-3, .pub-grid-4, .pub-checkbox-grid, .pub-category-grid, .pub-toggle-grid, .pub-toggle-grid.cols-3 { grid-template-columns: 1fr; } 
        }
      `}</style>

      {modalPremiumAberto && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'grid', placeItems: 'center', padding: 24 }}>
          <div style={{ background: '#fff', padding: '48px 32px', borderRadius: 24, maxWidth: 440, width: '100%', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
            <div style={{ width: 64, height: 64, background: '#fffbeb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <Icon path={mdiCrown} size={1.8} color="#d9c49c" />
            </div>
            <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 28, margin: '0 0 16px', color: '#0f172a', fontWeight: 900, letterSpacing: '-0.02em' }}>Limite gratuito atingido</h2>
            <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.6, margin: '0 0 32px' }}>Atingiste o limite do plano gratuito ({limiteGratis} anúncios). Para publicares mais anúncios sem restrições, ativa o teu plano Premium.</p>
            <button onClick={() => navigate('/premium-confirmar')} className="pub-btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Ativar PRO</button>
            <button onClick={() => setModalPremiumAberto(false)} className="pub-btn-secondary" style={{ width: '100%', justifyContent: 'center', marginTop: 12, border: 'none' }}>Cancelar e Fechar</button>
          </div>
        </div>
      )}

      <div className="pub-root">
        <div className="pub-container">
          <div className="pub-header">
            <div>
              <h1 className="pub-title">Publicar Anúncio</h1>
              <span className="pub-draft-hint"><span className="pub-draft-dot" /> Rascunho guardado com sucesso</span>
            </div>
            <button onClick={() => navigate(-1)} className="pub-btn-secondary">
              <Icon path={mdiClose} size={0.8} /> Cancelar
            </button>
          </div>

          <div className="pub-step-indicator">
            {ETAPAS.map((etapa, idx) => {
              const numero = idx + 1;
              return (
                <div className={`pub-step-item ${passoAtual === numero ? 'current' : ''}`} key={etapa.titulo}>
                  <span className={`pub-step-pill ${passoAtual >= numero ? 'active' : ''} ${passoAtual > numero ? 'completed' : ''}`} />
                  <span className="pub-step-label">Passo {numero} - {etapa.titulo}</span>
                  <span className="pub-step-desc">{etapa.descricao}</span>
                </div>
              );
            })}
          </div>

          {usoGratisAtivo && passoAtual === 1 && (
            <div className="pub-gratis-banner">
              <Icon path={mdiInformationOutline} size={1} />
              <div><strong>Plano Base:</strong> Vais publicar o anúncio {proximoAnuncioGratis} de {limiteGratis} gratuitos na tua conta. Tens {restantesGratis} vaga(s) disponível(eis).</div>
            </div>
          )}

          {erro && (
            <div className="pub-error">
              <Icon path={mdiAlertCircleOutline} size={1} style={{ flexShrink: 0, marginTop: 2 }} />
              <span>{erro}</span>
            </div>
          )}

          <div className="pub-card">
            <form onSubmit={passoAtual === 3 ? handleSubmit : (e) => { e.preventDefault(); avancarPasso(); }}>

              {/* PASSO 1: Categoria, Título e Preço */}
              {passoAtual === 1 && (
                <div style={{ display: 'grid', gap: 24 }}>
                  <h3 className="pub-section-title">O que pretendes anunciar hoje?</h3>

                  <div>
                    <label className="pub-label">Selecione a Categoria</label>
                    <div className="pub-category-grid">
                      <button type="button" onClick={() => setForm(f => ({ ...f, tipo: 'carro' }))} className={`pub-category-card ${form.tipo === 'carro' ? 'active' : ''}`}>
                        <span className="pub-cat-icon"><Icon path={mdiCarOutline} size={1.2} /></span>
                        <span><strong>Automóvel</strong><span>Veículos ligeiros e comerciais</span></span>
                      </button>
                      <button type="button" onClick={() => setForm(f => ({ ...f, tipo: 'imovel' }))} className={`pub-category-card ${form.tipo === 'imovel' ? 'active' : ''}`}>
                        <span className="pub-cat-icon"><Icon path={mdiHomeOutline} size={1.2} /></span>
                        <span><strong>Imóvel</strong><span>Casas, terrenos e espaços</span></span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="pub-label">
                      Título atrativo *
                      <span className="pub-label-count">{form.titulo.length}/100</span>
                    </label>
                    <input className="pub-input" name="titulo" value={form.titulo} onChange={handle} required maxLength={100} placeholder={form.tipo === 'carro' ? 'Ex: Audi A3 Sportback S-Line 1.6 TDI 2021' : 'Ex: Apartamento T2 com Terraço no centro de Lisboa'} />
                    <p className="pub-hint">Inclui as informações principais para captar a atenção no título.</p>
                  </div>

                  <div>
                    <label className="pub-label">Preço de Venda (€) *</label>
                    <input className="pub-input" name="preco" type="number" min="0" value={form.preco} onChange={handle} required placeholder={form.tipo === 'carro' ? '19900' : '250000'} style={{ fontSize: '20px', fontWeight: 800 }} />
                  </div>
                </div>
              )}

              {/* PASSO 2: Fotos, Localização e Contactos */}
              {passoAtual === 2 && (
                <div style={{ display: 'grid', gap: 24 }}>
                  <h3 className="pub-section-title">Apresentação e Visibilidade</h3>

                  <div>
                    <label className="pub-label">
                      <span>Galeria de Imagens (Mínimo 1) *</span>
                      <span className="pub-label-count">{fotos.length}/10</span>
                    </label>
                    <label
                      className={`pub-dropzone ${dropzoneAtiva ? 'active-drag' : ''}`}
                      onDragOver={(e) => { e.preventDefault(); setDropzoneAtiva(true); }}
                      onDragLeave={() => setDropzoneAtiva(false)}
                      onDrop={handleDrop}
                    >
                      <input type="file" multiple onChange={handleImageUpload} disabled={uploadingImage} style={{ display: 'none' }} accept="image/*" />
                      <div className="pub-dropzone-icon">
                        <Icon path={mdiCloudUploadOutline} size={1.5} />
                      </div>
                      <strong>{uploadingImage ? 'A preparar as tuas imagens...' : 'Clica aqui ou arrasta as tuas fotos (Até 10)'}</strong>
                      <small>As fotos são otimizadas automaticamente para a Web. A primeira será a capa.</small>
                    </label>

                    {/* AVISO VISUAL DE UPLOAD EM CURSO */}
                    {uploadingImage && (
                      <div className="upload-banner">
                        <Icon path={mdiLoading} size={1.2} className="spin-icon" />
                        <span>A otimizar e a enviar fotografias para o servidor... Aguarda um momento.</span>
                      </div>
                    )}

                    {fotos.length > 0 && !uploadingImage && (
                      <div className="pub-gallery">
                        {fotos.map((f, i) => (
                          <div key={i} className="pub-thumb">
                            <img src={getImageUrl(f, 'thumbnail')} alt="" />
                            {i === 0 && <span className="pub-thumb-cover">Foto Capa</span>}
                            <button type="button" onClick={() => setFotos(arr => arr.filter((_, idx) => idx !== i))} className="pub-thumb-del" title="Remover foto">
                              <Icon path={mdiClose} size={0.7} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pub-grid-2">
                    <div>
                      <label className="pub-label">Distrito do Bem *</label>
                      <select className="pub-input" name="distrito" value={form.distrito} onChange={handle} required>
                        <option value="">Seleciona um distrito</option>
                        {DISTRITOS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="pub-label">Cidade / Concelho *</label>
                      <select className="pub-input" name="cidade" value={form.cidade} onChange={handle} required disabled={!form.distrito}>
                        <option value="">{form.distrito ? 'Seleciona o concelho' : 'Escolhe o distrito primeiro'}</option>
                        {cidadesDisponiveis.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="pub-grid-2">
                    <div>
                      <label className="pub-label">Telemóvel {ehAdmin ? '' : '*'}</label>
                      <input className="pub-input" name="telefone" type="tel" value={form.telefone} onChange={handle} required={!ehAdmin} placeholder="Ex: 912 345 678" />
                    </div>
                    <div>
                      <label className="pub-label">Email {ehAdmin ? '' : '*'}</label>
                      <input className="pub-input" name="email" type="email" value={form.email} onChange={handle} required={!ehAdmin} placeholder="teu@email.com" />
                    </div>
                  </div>
                  {ehAdmin && <p className="pub-hint"><Icon path={mdiInformationOutline} size={0.6} /> Como administrador deves preencher no mínimo um dos contactos caso faças a gestão direta.</p>}
                </div>
              )}

              {/* PASSO 3: Ficha Técnica Completa, Extras e Descrição */}
              {passoAtual === 3 && (
                <div style={{ display: 'grid', gap: 24 }}>
                  <h3 className="pub-section-title">Ficha Técnica e Detalhes Finais</h3>

                  {form.tipo === 'carro' ? (
                    <div style={{ display: 'grid', gap: 20 }}>
                      <div className="pub-grid-2">
                        <div>
                          <label className="pub-label">Marca *</label>
                          <select className="pub-input" name="marca" value={form.marca} onChange={handle} required>
                            <option value="">Selecione...</option>
                            {MARCAS.map(m => <option key={m} value={m}>{m}</option>)}
                            <option value={OPCAO_OUTRO_VEICULO}>Outra marca não listada</option>
                          </select>
                          {form.marca === OPCAO_OUTRO_VEICULO && (
                            <input className="pub-input" name="marcaPersonalizada" value={form.marcaPersonalizada} onChange={handle} placeholder="Qual é a marca?" required style={{ marginTop: 8 }} />
                          )}
                        </div>
                        <div>
                          <label className="pub-label">Modelo *</label>
                          <select className="pub-input" name="modelo" value={form.modelo} onChange={handle} required disabled={!form.marca}>
                            <option value="">{form.marca ? 'Selecione...' : 'Escolha a marca'}</option>
                            {modelosDisponiveis.map((mod, idx) => <option key={idx} value={mod}>{mod}</option>)}
                            {form.marca && <option value={OPCAO_OUTRO_VEICULO}>Outro modelo não listado</option>}
                          </select>
                          {form.modelo === OPCAO_OUTRO_VEICULO && (
                            <input className="pub-input" name="modeloPersonalizado" value={form.modeloPersonalizado} onChange={handle} placeholder="Qual é o modelo?" required style={{ marginTop: 8 }} />
                          )}
                        </div>
                      </div>

                      <div className="pub-grid-2">
                        <div>
                          <label className="pub-label">Versão (Equipamento)</label>
                          <input className="pub-input" name="versao" value={form.versao} onChange={handle} placeholder="Ex: Avant 2.0 TDI S-Tronic" />
                        </div>
                        <div>
                          <label className="pub-label">Cor Exterior</label>
                          <input className="pub-input" name="cor" value={form.cor} onChange={handle} placeholder="Ex: Preto metalizado" />
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
                            <option value="eletrico">Elétrico 100%</option>
                            <option value="hibrido">Híbrido</option>
                            <option value="gpl">GPL</option>
                          </select>
                        </div>
                        <div>
                          <label className="pub-label">Caixa *</label>
                          <select className="pub-input" name="transmissao" value={form.transmissao} onChange={handle} required disabled={form.combustivel === 'eletrico'}>
                            <option value="manual">Manual</option>
                            <option value="automatico">Automática</option>
                          </select>
                        </div>
                        <div>
                          <label className="pub-label">{form.combustivel === 'eletrico' ? 'Cilindrada (N/A)' : 'Cilindrada (cm³)'}</label>
                          <input className="pub-input" name="cilindrada" type="number" min="1" max="10000" value={form.cilindrada} onChange={handle} disabled={form.combustivel === 'eletrico'} placeholder="1968" />
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
                          <label className="pub-label">Condição *</label>
                          <select className="pub-input" name="seccao" value={form.seccao} onChange={handle} required>
                            {SECCOES_CARRO.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="pub-label">Categoria de veículo *</label>
                        <div className="pub-toggle-grid cols-3">
                          {TIPOS_VEICULO_CARRO.map(item => (
                            <button type="button" key={item.value} className={`pub-toggle-pill ${form.tipoVeiculo === item.value ? 'active' : ''}`} onClick={() => setForm(f => ({ ...f, tipoVeiculo: item.value }))}>{item.label}</button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="pub-label">Eixo de Tração *</label>
                        <div className="pub-toggle-grid cols-3">
                          {TRACOES_CARRO.map(item => (
                            <button type="button" key={item.value} className={`pub-toggle-pill ${form.tracao === item.value ? 'active' : ''}`} onClick={() => setForm(f => ({ ...f, tracao: item.value }))}>{item.label}</button>
                          ))}
                        </div>
                      </div>

                      <div className="pub-grid-2">
                        <div>
                          <label className="pub-label">Garantia Incluída?</label>
                          <select className="pub-input" name="garantia" value={form.garantia} onChange={handle}>
                            <option value="">Sem garantia (Particular)</option>
                            {OPCOES_GARANTIA.map(g => <option key={g} value={g}>{g}</option>)}
                          </select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                          <label className={`pub-checkbox-item ${form.aceitaRetoma ? 'checked' : ''}`} style={{ width: '100%', justifyContent: 'center' }}>
                            <input type="checkbox" name="aceitaRetoma" checked={form.aceitaRetoma} onChange={handle} />
                            <span>Aceito Retoma / Troca</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="pub-label">Número de Chassi (VIN)</label>
                        <input className="pub-input" name="vin" value={form.vin} onChange={handle} placeholder="Opcional. Permite associar relatório carVertical." maxLength={17} style={{ textTransform: 'uppercase' }} />
                        <p className="pub-hint">Apenas 17 caracteres. Sem letras I, O ou Q.</p>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gap: 20 }}>
                      <div className="pub-grid-3">
                        <div>
                          <label className="pub-label">Estado</label>
                          <select className="pub-input" name="estado" value={form.estado} onChange={handle}>
                            <option value="Novo">Novo / Em planta</option>
                            <option value="Usado">Usado</option>
                            <option value="Renovado">Remodelado</option>
                            <option value="Para remodelar">Para remodelar / Ruína</option>
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
                          <label className="pub-label">Área Útil (m²)</label>
                          <input className="pub-input" name="area" type="number" min="0" value={form.area} onChange={handle} placeholder="Ex: 120" />
                        </div>
                        <div>
                          <label className="pub-label">Área Terreno (m²)</label>
                          <input className="pub-input" name="areaTerreno" type="number" min="0" value={form.areaTerreno} onChange={handle} placeholder="Ex: 300 (opcional)" />
                        </div>
                        <div>
                          <label className="pub-label">Classificação Energética</label>
                          <select className="pub-input" name="certEnergetico" value={form.certEnergetico} onChange={handle}>
                            {['A+', 'A', 'B', 'B-', 'C', 'D', 'E', 'F', 'Isento', 'Em Processo'].map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="pub-grid-4">
                        {!TIPOS_SEM_TIPOLOGIA.includes(form.tipoImovel) && (
                          <div>
                            <label className="pub-label">Quartos</label>
                            <input className="pub-input" name="quartos" type="number" min="0" value={form.quartos} onChange={handle} placeholder="3" />
                          </div>
                        )}
                        {form.tipoImovel !== 'terreno' && (
                          <div>
                            <label className="pub-label">Casas de Banho</label>
                            <input className="pub-input" name="casasBanho" type="number" min="0" value={form.casasBanho} onChange={handle} placeholder="2" />
                          </div>
                        )}
                        <div>
                          <label className="pub-label">Ano Construção</label>
                          <input className="pub-input" name="anoConstrucao" type="number" min="1800" max={ANO_ATUAL} value={form.anoConstrucao} onChange={handle} placeholder="2005" />
                        </div>
                        {form.tipoImovel !== 'terreno' && (
                          <div>
                            <label className="pub-label">Piso / Andar</label>
                            <input className="pub-input" name="andar" type="number" value={form.andar} onChange={handle} placeholder="Ex: 3" />
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="pub-label">Características Especiais</label>
                        <div className="pub-checkbox-grid">
                          {COMODIDADES_IMOVEL.filter(c => !(form.tipoImovel === 'terreno' && ['garagem', 'elevador', 'mobilado', 'condominio'].includes(c.name))).map(c => (
                            <CampoCheckbox key={c.name} name={c.name} label={c.label} checked={form[c.name]} onChange={handle} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="pub-label">Detalhes & Extras Livres</label>
                    {equipamento.length > 0 && (
                      <div className="pub-chip-row">
                        {equipamento.map((extra, idx) => (
                          <span className="pub-chip" key={`${extra}-${idx}`}>
                            {extra}
                            <button type="button" onClick={() => handleRemoveExtra(idx)}><Icon path={mdiClose} size={0.6} /></button>
                          </span>
                        ))}
                      </div>
                    )}
                    {extrasRapidosDisponiveis.length > 0 && (
                      <div className="pub-chip-row">
                        {extrasRapidosDisponiveis.map(extra => (
                          <button type="button" key={extra} className="pub-chip-add" onClick={() => handleAddExtraRapido(extra)}>
                            <Icon path={mdiPlus} size={0.6} /> {extra}
                          </button>
                        ))}
                      </div>
                    )}
                    <div className="pub-extra-input-row" style={{ marginTop: 12 }}>
                      <input className="pub-input" value={novoExtra} onChange={(e) => setNovoExtra(e.target.value)} placeholder="Escreve um extra e carrega em Adicionar" onKeyDown={(e) => { if (e.key === 'Enter') handleAddExtra(e); }} />
                      <button type="button" className="pub-btn-secondary" onClick={handleAddExtra}>Adicionar</button>
                    </div>
                  </div>

                  <div>
                    <label className="pub-label">
                      Descrição Detalhada do Anúncio
                      <span className="pub-label-count">{form.descricao.length}/2000</span>
                    </label>
                    <textarea className="pub-input" name="descricao" value={form.descricao} onChange={handle} rows={6} maxLength={2000} placeholder="Não deixes pontas soltas. Descreve o estado de conservação real, revisões recentes, motivo de venda ou outros aspetos que ajudem a converter quem está a ler o anúncio..." style={{ resize: 'vertical', lineHeight: 1.6 }} />
                  </div>

                  <div>
                    <label className="pub-label">Link para Vídeo (Opcional)</label>
                    <input type="url" className="pub-input" name="videoUrl" value={form.videoUrl} onChange={handle} placeholder="Cola aqui um link válido do Youtube ou Matterport (3D Tour)" />
                  </div>

                  {ehAdmin && (
                    <div style={{ background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px dashed #cbd5e1' }}>
                      <label className={`pub-checkbox-item ${form.destacado ? 'checked' : ''}`} style={{ width: 'fit-content', border: 'none', background: 'transparent' }}>
                        <input type="checkbox" name="destacado" checked={form.destacado} onChange={handle} />
                        <span style={{ fontWeight: 800 }}>Forçar Destaque Administrativo (Aparece na Home)</span>
                      </label>
                    </div>
                  )}

                  {qualidade != null && (
                    <div style={{ background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                      <label className="pub-label" style={{ marginBottom: 4 }}>
                        Pontuação do teu anúncio
                        <span className="pub-label-count" style={{ fontWeight: 900, color: '#102f50' }}>{Math.round(qualidade)}%</span>
                      </label>
                      <p style={{ margin: '0 0 12px', fontSize: 12, color: '#64748b' }}>Anúncios com mais de 80% recebem 3x mais contactos.</p>
                      <div className="pub-quality-bar"><div style={{ width: `${Math.min(100, Math.max(0, qualidade))}%` }} /></div>
                    </div>
                  )}
                </div>
              )}

              <div className="pub-actions-row">
                {passoAtual > 1 ? (
                  <button type="button" onClick={recuarPasso} className="pub-btn-secondary">
                    <Icon path={mdiArrowLeft} size={0.8} /> Voltar ao Passo Anterior
                  </button>
                ) : <div />}

                {passoAtual < 3 ? (
                  <button type="button" onClick={avancarPasso} className="pub-btn-primary" disabled={uploadingImage}>
                    {uploadingImage ? 'A aguardar imagens...' : <>Avançar para o Passo {passoAtual + 1} <Icon path={mdiArrowRight} size={0.8} /></>}
                  </button>
                ) : (
                  <button type="submit" disabled={loading || uploadingImage} className="pub-btn-primary">
                    {uploadingImage ? 'A aguardar imagens...' : (loading ? 'A publicar...' : <>Concluir e Publicar Anúncio <Icon path={mdiCheck} size={0.8} /></>)}
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