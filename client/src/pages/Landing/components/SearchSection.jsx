import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Home as HomeIcon, Search, ArrowRight } from 'lucide-react';
import { MARCAS, getModelosPorMarca } from '../../../data/marcasModelos2';
import { DISTRITOS, DISTRITOS_CIDADES_PT } from '../../../data/temp1';
import trackEvent from './TrackEvent';

export default function SearchSection() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('carro');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [distrito, setDistrito] = useState('');
  const [cidade, setCidade] = useState('');

  const modelosDisponiveis = marca
    ? getModelosPorMarca(marca).map((m) => (typeof m === 'object' ? m.modelo || m.nome : m))
    : [];
  const cidadesDisponiveis = distrito ? DISTRITOS_CIDADES_PT[distrito] || [] : [];

  const handleAdvancedSearch = (event) => {
    event.preventDefault();
    trackEvent('search_submit', { tipo: tab });
    const params = new URLSearchParams();

    if (tab === 'carro') {
      if (marca) params.set('marca', marca);
      if (modelo) params.set('modelo', modelo);
      navigate(`/carros${params.toString() ? `?${params.toString()}` : ''}`);
      return;
    }

    if (distrito) params.set('distrito', distrito);
    if (cidade) params.set('cidade', cidade);
    navigate(`/imoveis${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <section className="nx-section nx-bg-white" data-reveal>
      <div className="nx-shell">
        <div className="nx-section-header nx-center">
          <div>
            <span className="nx-kicker">PESQUISA</span>
            <h2>O que procura?</h2>
          </div>
        </div>

        <div className="nx-search-floater nx-search-floater-static">
          <div className="nx-search-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'carro'}
              className={tab === 'carro' ? 'active' : ''}
              onClick={() => { setTab('carro'); setDistrito(''); setCidade(''); }}
            >
              <Car size={16} strokeWidth={2.5} /> Automóveis
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'imovel'}
              className={tab === 'imovel' ? 'active' : ''}
              onClick={() => { setTab('imovel'); setMarca(''); setModelo(''); }}
            >
              <HomeIcon size={16} strokeWidth={2.5} /> Imóveis
            </button>
          </div>

          <form onSubmit={handleAdvancedSearch} className="nx-search-grid">
            {tab === 'carro' ? (
              <>
                <div className="nx-input-group">
                  <label htmlFor="nx-marca">Marca</label>
                  <select
                    id="nx-marca"
                    value={marca}
                    onChange={(event) => { setMarca(event.target.value); setModelo(''); }}
                  >
                    <option value="">Todas as marcas</option>
                    {MARCAS.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
                <div className="nx-input-group">
                  <label htmlFor="nx-modelo">Modelo</label>
                  <select
                    id="nx-modelo"
                    value={modelo}
                    onChange={(event) => setModelo(event.target.value)}
                    disabled={!marca}
                  >
                    <option value="">{marca ? 'Todos os modelos' : 'Selecione marca'}</option>
                    {modelosDisponiveis.map((item, index) => (
                      <option key={`${item}-${index}`} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <>
                <div className="nx-input-group">
                  <label htmlFor="nx-distrito">Distrito</label>
                  <select
                    id="nx-distrito"
                    value={distrito}
                    onChange={(event) => { setDistrito(event.target.value); setCidade(''); }}
                  >
                    <option value="">Todos os distritos</option>
                    {DISTRITOS.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
                <div className="nx-input-group">
                  <label htmlFor="nx-cidade">Cidade</label>
                  <select
                    id="nx-cidade"
                    value={cidade}
                    onChange={(event) => setCidade(event.target.value)}
                    disabled={!distrito}
                  >
                    <option value="">{distrito ? 'Todas as cidades' : 'Selecione distrito'}</option>
                    {cidadesDisponiveis.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <button type="submit" className="nx-btn-search" aria-label="Pesquisar">
              <Search size={18} /> <span>Pesquisar</span>
            </button>
          </form>
        </div>

        <div className="nx-search-quicklinks">
          <Link to="/carros">Ver todos os automóveis <ArrowRight size={14} /></Link>
          <Link to="/imoveis">Ver todos os imóveis <ArrowRight size={14} /></Link>
        </div>
      </div>
    </section>
  );
}