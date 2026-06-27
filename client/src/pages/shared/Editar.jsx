import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Icon from '@mdi/react';
import { mdiAlertCircleOutline, mdiCloudUploadOutline, mdiClose } from '@mdi/js';
import { MARCAS, getModelosPorMarca } from '../../data/marcasModelos';
import { DISTRITOS_CIDADES_PT, DISTRITOS } from '../../data/localizacoes'; 

export default function Editar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { signed, loading: authLoading } = useAuth();

  const [fetchingData, setFetchingData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [erro, setErro] = useState('');
  const [fotos, setFotos] = useState([]);
  const [equipamento, setEquipamento] = useState([]);
  const [novoExtra, setNovoExtra] = useState('');

  const [form, setForm] = useState({
    tipo: 'carro', 
    titulo: '',
    descricao: '',
    preco: '',
    telefone: '',
    email: '', 
    cidade: '',
    distrito: '',
    tipoImovel: 'apartamento',
    tipologia: 'T2',
    area: '',
    quartos: '',
    casasBanho: '',
    garagem: false,
    certEnergetico: 'C',
    marca: '',
    modelo: '',
    ano: '',
    km: '',
    combustivel: 'gasolina',
    transmissao: 'manual',
    potencia: '',
    cilindrada: '',
    cor: '',
  });

  useEffect(() => {
    if (!authLoading && !signed) {
      navigate('/login');
      return;
    }

    const carregarAnuncio = async () => {
      try {
        const { data } = await api.get(`/anuncios/${id}`);
        setForm({
          tipo: data.tipo,
          titulo: data.titulo || '',
          descricao: data.descricao || '',
          preco: data.preco || '',
          telefone: data.telefone || '',
          email: data.email || '', 
          cidade: data.localizacao?.cidade || '',
          distrito: data.localizacao?.distrito || '',
          tipoImovel: data.imovel?.tipoImovel || 'apartamento',
          tipologia: data.imovel?.tipologia || 'T2',
          area: data.imovel?.area || '',
          quartos: data.imovel?.quartos || '',
          casasBanho: data.imovel?.casasBanho || '',
          garagem: data.imovel?.garagem || false,
          certEnergetico: data.imovel?.certificadoEnergetico || 'C',
          marca: data.carro?.marca || '',
          modelo: data.carro?.modelo || '',
          ano: data.carro?.ano || '',
          km: data.carro?.km || '',
          combustivel: data.carro?.combustivel || 'gasolina',
          transmissao: data.carro?.transmissao || 'manual',
          potencia: data.carro?.potencia || '',
          cilindrada: data.carro?.cilindrada || '',
          cor: data.carro?.cor || '',
        });
        setFotos(data.fotos || []);
        setEquipamento(data.equipamento || []);
        setFetchingData(false);
      } catch (err) {
        setErro('Não foi possível carregar os dados do anúncio para edição.');
        setFetchingData(false);
      }
    };
    if (signed) carregarAnuncio();
  }, [id, signed, authLoading, navigate]);

  const handle = e => {
    const { name, value, type, checked } = e.target;
    let val = type === 'checkbox' ? checked : value;
    if ((name === 'preco' || name === 'km') && val !== '') {
      val = Math.max(0, Number(val));
    }
    setForm(f => {
      const updated = { ...f, [name]: val };
      if (name === 'marca') updated.modelo = '';
      if (name === 'distrito') updated.cidade = '';
      if (name === 'combustivel' && val === 'eletrico') {
        updated.transmissao = 'automatico';
        updated.cilindrada = ''; 
      }
      return updated;
    });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    if (fotos.length + files.length > 10) {
      setErro('Apenas podes ter no máximo 10 fotografias por anúncio.');
      return;
    }
    setUploadingImage(true);
    setErro('');
    try {
      const data = new FormData();
      files.forEach(file => data.append('imagens', file));
      const res = await api.post('/upload/imagens', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (res.data?.urls) setFotos(prev => [...prev, ...res.data.urls]);
    } catch (err) {
      setErro(err.response?.data?.erro || 'Erro ao carregar as imagens.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddExtra = (e) => {
    if (e) e.preventDefault();
    const valorLimpo = novoExtra.trim();
    if (!valorLimpo) return;
    if (equipamento.some(item => item.toLowerCase() === valorLimpo.toLowerCase())) {
      setNovoExtra(''); return;
    }
    setEquipamento(prev => [...prev, valorLimpo]);
    setNovoExtra('');
  };

  const handleRemoveExtra = (indexParaRemover) => setEquipamento(prev => prev.filter((_, idx) => idx !== indexParaRemover));
  const removerFoto = (idx) => setFotos(f => f.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');

    if (fotos.length === 0) {
      setErro('É obrigatório manter pelo menos 1 fotografia no anúncio.');
      setLoading(false);
      return;
    }

    if (form.tipo === 'carro' && Number(form.ano) < 1930) {
      setErro('O ano de matrícula tem de ser igual ou superior a 1930.');
      setLoading(false); return;
    }
    try {
      const payload = {
        titulo: form.titulo, descricao: form.descricao, preco: Number(form.preco),
        telefone: form.telefone, email: form.email, fotos,
        equipamento: form.tipo === 'carro' ? equipamento : [],
        localizacao: { cidade: form.cidade, distrito: form.distrito },
      };
      if (form.tipo === 'imovel') {
        payload.imovel = {
          tipoImovel: form.tipoImovel, tipologia: form.tipologia, area: Number(form.area),
          quartos: Number(form.quartos), casasBanho: Number(form.casasBanho), garagem: form.garagem, certificadoEnergetico: form.certEnergetico,
        };
      } else {
        payload.carro = {
          marca: form.marca, modelo: form.modelo, ano: Number(form.ano), km: Number(form.km),
          combustivel: form.combustivel, transmissao: form.transmissao, potencia: form.potencia ? Number(form.potencia) : undefined,
          cilindrada: form.cilindrada ? Number(form.cilindrada) : undefined, cor: form.cor
        };
      }
      await api.put(`/anuncios/${id}`, payload);
      navigate(`/anuncio/${id}`);
    } catch (err) {
      const detalhesZod = err.response?.data?.detalhes;
      setErro(detalhesZod ? detalhesZod.join(' | ') : 'Erro ao atualizar. Verifica os campos obrigatórios.');
    } finally {
      setLoading(false);
    }
  };

  const modelosDisponiveis = form.marca ? getModelosPorMarca(form.marca) : [];
  const cidadesDisponiveis = form.distrito ? DISTRITOS_CIDADES_PT[form.distrito] : [];
  const accentColorVar = form.tipo === 'carro' ? 'var(--nx-accent-car)' : 'var(--nx-accent-home)';
  const accentRgb = form.tipo === 'carro' ? '42, 193, 180' : '99, 179, 237';

  if (fetchingData) {
    return (
      <div style={{ minHeight: 'calc(100vh - 72px)', background: 'var(--nx-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="nx-spinner"></div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .pub-root { background: var(--nx-bg); color: var(--nx-text); min-height: calc(100vh - 72px); font-family: var(--nx-font-body); padding: 48px 24px; transition: background 0.3s ease; }
        .pub-container { max-width: 860px; margin: 0 auto; width: 100%; box-sizing: border-box; }
        
        .pub-header { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--nx-border); padding-bottom: 24px; margin-bottom: 40px; flex-wrap: wrap; gap: 16px; }
        .pub-title { font-family: var(--nx-font-display); font-size: 32px; font-weight: 800; margin: 0 0 4px 0; letter-spacing: -0.02em; }
        .pub-subtitle { font-size: 14px; color: var(--nx-text-sub); margin: 0; }
        
        .btn-cancel { padding: 10px 20px; background: var(--nx-card-bg); border: 1px solid var(--nx-card-border); border-radius: 12px; color: var(--nx-text); font-weight: 600; font-size: 13px; cursor: pointer; transition: all 0.2s; box-shadow: var(--nx-shadow-btn); }
        .btn-cancel:hover { background: var(--nx-bg-2); border-color: var(--nx-border-2); transform: translateY(-2px); }

        .pub-error { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); padding: 16px; border-radius: 12px; color: var(--nx-danger); font-size: 14px; font-weight: 500; margin-bottom: 24px; display: flex; align-items: flex-start; gap: 12px; }

        .pub-form { background: var(--nx-card-bg); border: 1px solid var(--nx-card-border); border-radius: 24px; padding: 40px; box-shadow: var(--nx-shadow-card); display: flex; flex-direction: column; gap: 40px; }
        
        .pub-section-header { display: flex; align-items: center; gap: 12px; border-bottom: 1px solid var(--nx-border); padding-bottom: 12px; margin-bottom: 24px; }
        .pub-section-num { width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; background: rgba(${accentRgb}, 0.15); color: ${accentColorVar}; border: 1px solid rgba(${accentRgb}, 0.3); border-radius: 50%; font-size: 11px; font-weight: 800; }
        .pub-section-title { font-family: var(--nx-font-display); font-size: 16px; font-weight: 800; margin: 0; }

        .pub-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .pub-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
        @media (max-width: 768px) { .pub-grid-2, .pub-grid-3 { grid-template-columns: 1fr; } }

        .pub-label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--nx-text-sub); margin-bottom: 7px; }

        .pub-input { width: 100%; padding: 11px 14px; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 10px; color: var(--nx-text); font-family: var(--nx-font-body); font-size: 14px; font-weight: 500; outline: none; transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease; box-sizing: border-box; -webkit-appearance: none; appearance: none; }
        .pub-input::placeholder { color: rgba(255, 255, 255, 0.25); font-weight: 400; }
        .pub-input:hover:not(:disabled):not(:focus) { border-color: rgba(255, 255, 255, 0.22); background: rgba(255, 255, 255, 0.06); }
        .pub-input:disabled { opacity: 0.38; cursor: not-allowed; background: rgba(255, 255, 255, 0.02); }
        
        /* 🌟 NOVO FOCO E OPÇÕES (SELECT) 🌟 */
        .pub-input:focus { 
          border-color: ${accentColorVar}; 
          box-shadow: 0 0 0 4px rgba(${accentRgb}, 0.35), inset 0 1px 2px rgba(0,0,0,0.2); 
          background: rgba(255, 255, 255, 0.08); 
        }

        select.pub-input { 
          cursor: pointer; 
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(255,255,255,0.4)' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); 
          background-repeat: no-repeat; 
          background-position: right 14px center; 
          padding-right: 38px; 
        }

        select.pub-input option { 
          background: #0f172a; 
          color: #ffffff;      
          font-weight: 500;
        }
        /* 🌟 -------------------------------- 🌟 */

        textarea.pub-input { resize: vertical; min-height: 120px; line-height: 1.6; }
        input[type=number].pub-input::-webkit-inner-spin-button, input[type=number].pub-input::-webkit-outer-spin-button { opacity: 0.4; }

        .pub-toggle-box { display: flex; background: var(--nx-bg-2); border: 1px solid var(--nx-border); border-radius: 12px; padding: 4px; gap: 4px; opacity: 0.6; pointer-events: none; }
        .pub-toggle-btn { flex: 1; padding: 10px; border: none; background: transparent; color: var(--nx-text-sub); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border-radius: 8px; }
        .pub-toggle-btn.active { background: var(--nx-card-bg); color: var(--nx-text); border: 1px solid var(--nx-border-2); box-shadow: var(--nx-shadow-btn); opacity: 1; }

        .pub-upload-zone { border: 2px dashed rgba(255, 255, 255, 0.15); border-radius: 16px; padding: 32px 16px; text-align: center; cursor: pointer; background: rgba(255, 255, 255, 0.02); transition: all 0.2s; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .pub-upload-zone:hover { border-color: ${accentColorVar}; background: rgba(${accentRgb}, 0.03); }
        .pub-upload-icon { color: var(--nx-text-sub); margin-bottom: 12px; transition: color 0.2s; }
        .pub-upload-zone:hover .pub-upload-icon { color: ${accentColorVar}; }
        
        .pub-gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px; margin-top: 12px; }
        .pub-thumb-wrap { position: relative; aspect-ratio: 4/3; border-radius: 8px; overflow: hidden; border: 1px solid var(--nx-border); background: var(--nx-bg); }
        .pub-thumb-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .pub-thumb-remove { position: absolute; top: 6px; right: 6px; width: 24px; height: 24px; background: var(--nx-danger); color: #fff; border: none; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; opacity: 0; transition: opacity 0.2s; }
        .pub-thumb-wrap:hover .pub-thumb-remove { opacity: 1; }
        .pub-thumb-badge { position: absolute; bottom: 6px; left: 6px; background: ${accentColorVar}; color: #000; font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; }

        .pub-extra-row { display: flex; gap: 8px; margin-bottom: 16px; }
        .pub-btn-add { padding: 0 20px; background: var(--nx-text); color: var(--nx-bg); border: none; border-radius: 10px; font-weight: 700; font-size: 12px; text-transform: uppercase; cursor: pointer; transition: opacity 0.2s; white-space: nowrap; }
        .pub-btn-add:hover { opacity: 0.85; }

        .pub-extra-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .pub-extra-tag { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px; background: var(--nx-bg-2); border: 1px solid var(--nx-border); border-radius: 8px; font-size: 12px; font-weight: 600; color: var(--nx-text); }
        .pub-extra-del { width: 18px; height: 18px; border-radius: 50%; background: var(--nx-border-2); color: var(--nx-text); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s; }
        .pub-extra-del:hover { background: var(--nx-danger); color: #fff; }

        .pub-submit { width: 100%; padding: 18px; background: ${accentColorVar}; color: #ffffff; border: none; border-radius: 12px; font-family: var(--nx-font-body); font-size: 14px; font-weight: 800; cursor: pointer; transition: all 0.2s; text-transform: uppercase; letter-spacing: 0.05em; box-shadow: 0 10px 25px rgba(${accentRgb}, 0.2); }
        .pub-submit:hover:not(:disabled) { filter: brightness(1.1); transform: translateY(-2px); }
        .pub-submit:disabled { background: var(--nx-border); color: var(--nx-text-sub); cursor: not-allowed; box-shadow: none; transform: none; }
      `}</style>

      <div className="pub-root">
        <div className="pub-container">
          
          <div className="pub-header">
            <div>
              <h1 className="pub-title">Editar Anúncio</h1>
              <p className="pub-subtitle">Altera os parâmetros do teu {form.tipo === 'carro' ? 'veículo' : 'imóvel'}.</p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="button" onClick={() => navigate(`/anuncio/${id}`)} className="btn-cancel">
                Cancelar Edição
              </button>
            </div>
          </div>

          {erro && (
            <div className="pub-error">
              <Icon path={mdiAlertCircleOutline} size={1} />
              <span>{erro}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="pub-form">
            
            {/* SECÇÃO 1 — Categoria */}
            <div>
              <div className="pub-section-header">
                <span className="pub-section-num">01</span>
                <h2 className="pub-section-title">Segmento do Anúncio (Trancado)</h2>
              </div>
              <div className="pub-toggle-box">
                <button type="button" className={`pub-toggle-btn ${form.tipo === 'imovel' ? 'active' : ''}`}>Imóveis</button>
                <button type="button" className={`pub-toggle-btn ${form.tipo === 'carro' ? 'active' : ''}`}>Automóvel</button>
              </div>
            </div>

            {/* SECÇÃO 2 — Media */}
            <div>
              <div className="pub-section-header">
                <span className="pub-section-num">02</span>
                <h2 className="pub-section-title">Galeria & Elementos Digitais *</h2>
              </div>
              <label className="pub-upload-zone">
                <input type="file" multiple onChange={handleImageUpload} disabled={uploadingImage} style={{ display: 'none' }} accept="image/*" />
                <Icon path={mdiCloudUploadOutline} size={1.5} className="pub-upload-icon" />
                <span style={{ fontSize: '14px', fontWeight: 600 }}>{uploadingImage ? 'A carregar imagens...' : 'Solta as fotos aqui ou clica para carregar'}</span>
                <span style={{ fontSize: '12px', color: 'var(--nx-text-muted)', marginTop: '4px' }}>Máx 10 fotografias por publicação (Mínimo 1)</span>
              </label>
              {fotos.length > 0 && (
                <div className="pub-gallery">
                  {fotos.map((url, i) => (
                    <div key={i} className="pub-thumb-wrap">
                      <img src={url} alt="" />
                      <button type="button" onClick={() => removerFoto(i)} className="pub-thumb-remove"><Icon path={mdiClose} size={0.7} /></button>
                      {i === 0 && <span className="pub-thumb-badge">Capa</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SECÇÃO 3 — Parâmetros Comerciais */}
            <div>
              <div className="pub-section-header">
                <span className="pub-section-num">03</span>
                <h2 className="pub-section-title">Especificações de Mercado</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="pub-grid-2" style={{ gridTemplateColumns: '2fr 1fr' }}>
                  <div>
                    <label className="pub-label">Título Comercial *</label>
                    <input className="pub-input" name="titulo" value={form.titulo} onChange={handle} required />
                  </div>
                  <div>
                    <label className="pub-label">Preço (€) *</label>
                    <input className="pub-input" name="preco" type="number" min="0" value={form.preco} onChange={handle} required />
                  </div>
                </div>

                <div className="pub-grid-2">
                  <div>
                    <label className="pub-label" style={{ color: accentColorVar }}>Telemóvel de Contacto *</label>
                    <input className="pub-input" name="telefone" type="tel" value={form.telefone} onChange={handle} required style={{ borderColor: `rgba(${accentRgb}, 0.4)` }} />
                  </div>
                  <div>
                    <label className="pub-label">Email de Contacto *</label>
                    <input className="pub-input" name="email" type="email" value={form.email} onChange={handle} required />
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
                  <label className="pub-label">Descrição Detalhada do Ativo</label>
                  <textarea className="pub-input" name="descricao" value={form.descricao} onChange={handle} rows={5} />
                </div>
              </div>
            </div>

            {/* SECÇÃO 4 — Ficha Técnica */}
            <div>
              <div className="pub-section-header">
                <span className="pub-section-num">04</span>
                <h2 className="pub-section-title">Atributos e Customização</h2>
              </div>
              
              {form.tipo === 'imovel' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="pub-grid-2">
                    <div>
                      <label className="pub-label">Tipo de Imóvel</label>
                      <select className="pub-input" name="tipoImovel" value={form.tipoImovel} onChange={handle}>
                        <option value="apartamento">Apartamento</option>
                        <option value="moradia">Moradia</option>
                        <option value="terreno">Terreno</option>
                      </select>
                    </div>
                    <div>
                      <label className="pub-label">Tipologia</label>
                      <select className="pub-input" name="tipologia" value={form.tipologia} onChange={handle}>
                        {['T0', 'T1', 'T2', 'T3', 'T4', 'T5+'].map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="pub-grid-3">
                    <div>
                      <label className="pub-label">Área (m²)</label>
                      <input className="pub-input" name="area" type="number" min="0" value={form.area} onChange={handle} />
                    </div>
                    <div>
                      <label className="pub-label">Quartos</label>
                      <input className="pub-input" name="quartos" type="number" min="0" value={form.quartos} onChange={handle} />
                    </div>
                    <div>
                      <label className="pub-label">Casas de Banho</label>
                      <input className="pub-input" name="casasBanho" type="number" min="0" value={form.casasBanho} onChange={handle} />
                    </div>
                  </div>
                  <div className="pub-grid-2">
                    <div>
                      <label className="pub-label">Certificado Energético</label>
                      <select className="pub-input" name="certEnergetico" value={form.certEnergetico} onChange={handle}>
                        {['A+', 'A', 'B', 'B-', 'C', 'D', 'E', 'F', 'Isento'].map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', paddingTop: '24px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                        <input type="checkbox" name="garagem" checked={form.garagem} onChange={handle} style={{ width: '18px', height: '18px', accentColor: accentColorVar }} />
                        Inclui Garagem / Box Privada
                      </label>
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
                      </select>
                    </div>
                    <div>
                      <label className="pub-label">Modelo *</label>
                      <select className="pub-input" name="modelo" value={form.modelo} onChange={handle} required disabled={!form.marca}>
                        <option value="">{form.marca ? 'Selecionar Modelo' : 'Escolha primeiro a Marca'}</option>
                        {modelosDisponiveis.map((mod, idx) => {
                          const nome = typeof mod === 'object' ? mod.modelo : mod;
                          return <option key={idx} value={nome}>{nome}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                  
                  <div className="pub-grid-3">
                    <div>
                      <label className="pub-label">Ano *</label>
                      <input className="pub-input" name="ano" type="number" min="1930" max={new Date().getFullYear()} value={form.ano} onChange={handle} required />
                    </div>
                    <div>
                      <label className="pub-label">Quilómetros *</label>
                      <input className="pub-input" name="km" type="number" min="0" value={form.km} onChange={handle} required />
                    </div>
                    <div>
                      <label className="pub-label">Cor Exterior</label>
                      <input className="pub-input" name="cor" value={form.cor} onChange={handle} />
                    </div>
                  </div>

                  <div className="pub-grid-2">
                    <div>
                      <label className="pub-label">Combustível</label>
                      <select className="pub-input" name="combustivel" value={form.combustivel} onChange={handle}>
                        <option value="diesel">Diesel</option>
                        <option value="gasolina">Gasolina</option>
                        <option value="eletrico">Elétrico</option>
                        <option value="hibrido">Híbrido</option>
                      </select>
                    </div>
                    <div>
                      <label className="pub-label">Transmissão</label>
                      <select className="pub-input" name="transmissao" value={form.transmissao} onChange={handle} disabled={form.combustivel === 'eletrico'}>
                        <option value="manual">Manual</option>
                        <option value="automatico">Automático</option>
                      </select>
                    </div>
                  </div>

                  <div className="pub-grid-2">
                    <div>
                      <label className="pub-label">Potência (cv)</label>
                      <input className="pub-input" name="potencia" type="number" min="0" value={form.potencia} onChange={handle} />
                    </div>
                    {form.combustivel !== 'eletrico' && (
                      <div>
                        <label className="pub-label">Cilindrada (cm³)</label>
                        <input className="pub-input" name="cilindrada" type="number" min="0" value={form.cilindrada} onChange={handle} />
                      </div>
                    )}
                  </div>

                  <div style={{ paddingTop: '16px', borderTop: '1px solid var(--nx-border)' }}>
                    <label className="pub-label">Equipamento & Opcionais</label>
                    <div className="pub-extra-row">
                      <input type="text" className="pub-input" value={novoExtra} onChange={e => setNovoExtra(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddExtra(e)} placeholder="Ex: Teto Panorâmico" />
                      <button type="button" onClick={handleAddExtra} className="pub-btn-add">Inserir</button>
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
                </div>
              )}
            </div>

            <button type="submit" disabled={loading || uploadingImage} className="pub-submit">
              {loading ? 'A processar atualização...' : '💾 Guardar Alterações'}
            </button>

          </form>
        </div>
      </div>
    </>
  );
}