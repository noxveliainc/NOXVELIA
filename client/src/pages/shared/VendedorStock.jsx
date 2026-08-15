import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Seo from '../../components/Seo';
import { absoluteUrl } from '../../utils/seo';
import api from '../../services/api';
import LoadingScreen from '../../components/LoadingScreen';
import AnuncioCard from './AnuncioCard';
import { formatarMarcaModeloVeiculo } from '../../data/marcasModelos';

const normalizarTexto = (valor) => String(valor || '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .trim();

const numero = (valor) => {
  const n = Number(valor);
  return Number.isFinite(n) ? n : null;
};

const unicoOrdenado = (lista) => [...new Set(lista.filter(Boolean))]
  .sort((a, b) => String(a).localeCompare(String(b), 'pt-PT'));

const obterNomeVendedor = (vendedor) => {
  if (!vendedor) return 'Vendedor';
  if (vendedor.tipo === 'admin') {
    const nome = vendedor.nome || 'Noxvelia';
    return nome.toUpperCase().includes('NOXVELIA') ? nome : `NOXVELIA ${nome}`;
  }
  return vendedor.nome || vendedor.standNome || 'Vendedor';
};

const obterMarca = (anuncio) => anuncio?.carro?.marca || '';
const obterModelo = (anuncio) => anuncio?.carro?.modelo || '';
const obterDistrito = (anuncio) => anuncio?.localizacao?.distrito || '';

export default function VendedorStock() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vendedor, setVendedor] = useState(null);
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [filtros, setFiltros] = useState({
    q: '',
    categoria: 'todos',
    marca: '',
    modelo: '',
    distrito: '',
    precoMin: '',
    precoMax: '',
    ordem: 'destaque',
  });

  useEffect(() => {
    let ativo = true;

    const carregarStock = async () => {
      try {
        const { data } = await api.get(`/users/vendedor/${id}`);
        if (!ativo) return;
        setVendedor(data.vendedor || null);
        setAnuncios(Array.isArray(data.anuncios) ? data.anuncios : []);
      } catch {
        if (ativo) setErro('Não foi possível carregar o stock deste vendedor.');
      } finally {
        if (ativo) setLoading(false);
      }
    };

    carregarStock();
    return () => { ativo = false; };
  }, [id]);

  const nomeVendedor = obterNomeVendedor(vendedor);

  const opcoes = useMemo(() => {
    const carros = anuncios.filter((anuncio) => anuncio.tipo === 'carro');
    const marcaAtiva = filtros.marca;
    const carrosDaMarca = marcaAtiva
      ? carros.filter((anuncio) => obterMarca(anuncio) === marcaAtiva)
      : carros;

    return {
      marcas: unicoOrdenado(carros.map(obterMarca)),
      modelos: unicoOrdenado(carrosDaMarca.map(obterModelo)),
      distritos: unicoOrdenado(anuncios.map(obterDistrito)),
    };
  }, [anuncios, filtros.marca]);

  const totais = useMemo(() => ({
    todos: anuncios.length,
    carro: anuncios.filter((anuncio) => anuncio.tipo === 'carro').length,
    imovel: anuncios.filter((anuncio) => anuncio.tipo === 'imovel').length,
    destacados: anuncios.filter((anuncio) => anuncio.destacado).length,
  }), [anuncios]);

  const anunciosFiltrados = useMemo(() => {
    const termo = normalizarTexto(filtros.q);
    const min = numero(filtros.precoMin);
    const max = numero(filtros.precoMax);

    const filtrados = anuncios.filter((anuncio) => {
      if (filtros.categoria === 'carro' && anuncio.tipo !== 'carro') return false;
      if (filtros.categoria === 'imovel' && anuncio.tipo !== 'imovel') return false;
      if (filtros.categoria === 'destacados' && !anuncio.destacado) return false;
      if (filtros.marca && obterMarca(anuncio) !== filtros.marca) return false;
      if (filtros.modelo && obterModelo(anuncio) !== filtros.modelo) return false;
      if (filtros.distrito && obterDistrito(anuncio) !== filtros.distrito) return false;
      if (min !== null && Number(anuncio.preco || 0) < min) return false;
      if (max !== null && Number(anuncio.preco || 0) > max) return false;

      if (!termo) return true;
      const texto = normalizarTexto([
        anuncio.titulo,
        formatarMarcaModeloVeiculo(anuncio.carro),
        anuncio.carro?.combustivel,
        anuncio.imovel?.tipoImovel,
        anuncio.imovel?.tipologia,
        anuncio.localizacao?.cidade,
        anuncio.localizacao?.distrito,
      ].filter(Boolean).join(' '));

      return texto.includes(termo);
    });

    return [...filtrados].sort((a, b) => {
      if (filtros.ordem === 'preco-asc') return Number(a.preco || 0) - Number(b.preco || 0);
      if (filtros.ordem === 'preco-desc') return Number(b.preco || 0) - Number(a.preco || 0);
      if (filtros.ordem === 'recentes') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      return Number(b.destacado === true) - Number(a.destacado === true)
        || new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  }, [anuncios, filtros]);

  const handleFiltro = (campo) => (event) => {
    const valor = event.target.value;
    setFiltros((atual) => ({
      ...atual,
      [campo]: valor,
      ...(campo === 'marca' ? { modelo: '' } : {}),
    }));
  };

  const limparFiltros = () => {
    setFiltros({
      q: '',
      categoria: 'todos',
      marca: '',
      modelo: '',
      distrito: '',
      precoMin: '',
      precoMax: '',
      ordem: 'destaque',
    });
  };

  if (loading) {
    return (
      <LoadingScreen label="A carregar stock" detail="Estamos a organizar os anúncios deste vendedor." minHeight="calc(100vh - 80px)" tone="light" />
    );
  }

  if (erro) {
    return (
      <div className="nvs-error">
        <p>{erro}</p>
        <button type="button" onClick={() => navigate(-1)}>Voltar atrás</button>
      </div>
    );
  }

  return (
    <>
      <Seo
        title={`Stock de ${nomeVendedor} | Noxvelia`}
        description={`Consulta automóveis e imóveis ativos de ${nomeVendedor} na Noxvelia, com filtros por categoria, preço e localização.`}
        path={`/vendedor/${id}/stock`}
        image={vendedor?.avatarUrl || undefined}
        type="profile"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': vendedor?.tipoConta === 'profissional' || vendedor?.tipo === 'admin' ? 'Organization' : 'Person',
          name: nomeVendedor,
          url: absoluteUrl(`/vendedor/${id}/stock`),
        }}
      />

      <style>{`
        .nvs-root { min-height: calc(100vh - 80px); background: #ffffff; color: #071326; font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 38px 0 80px; }
        .nvs-shell { width: min(100% - clamp(28px, 5vw, 96px), 1480px); margin: 0 auto; }
        .nvs-back { display: inline-flex; align-items: center; gap: 8px; margin-bottom: 22px; border: 0; background: transparent; color: #5d6b78; font-size: 12px; font-weight: 850; letter-spacing: .08em; text-transform: uppercase; cursor: pointer; }
        .nvs-back:hover { color: #102f50; }
        .nvs-hero { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: clamp(18px, 4vw, 46px); align-items: end; padding: clamp(24px, 4vw, 48px); border: 1px solid #e6e1d6; border-radius: 26px; background: linear-gradient(135deg, #ffffff 0%, #f7f5ef 100%); }
        .nvs-kicker { display: inline-flex; align-items: center; min-height: 28px; padding: 0 10px; border: 1px solid rgba(217, 195, 145, .65); border-radius: 999px; color: #102f50; background: rgba(217, 195, 145, .12); font-size: 11px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
        .nvs-title { margin: 18px 0 10px; max-width: 820px; font-size: clamp(38px, 5.2vw, 76px); line-height: .94; letter-spacing: -.05em; font-weight: 900; color: #071326; }
        .nvs-copy { margin: 0; max-width: 720px; color: #5d6b78; font-size: clamp(15px, 1.15vw, 18px); line-height: 1.55; font-weight: 500; }
        .nvs-profile-link { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 0 18px; border-radius: 12px; border: 1px solid #102f50; color: #102f50; background: transparent; font-size: 13px; font-weight: 850; text-decoration: none; white-space: nowrap; }
        .nvs-profile-link:hover { background: #102f50; color: #ffffff; }
        .nvs-stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin: 18px 0 24px; }
        .nvs-stat { border: 1px solid #e6e1d6; border-radius: 16px; padding: 14px 16px; background: #ffffff; }
        .nvs-stat strong { display: block; color: #071326; font-size: 24px; line-height: 1; font-weight: 900; }
        .nvs-stat span { display: block; margin-top: 7px; color: #5d6b78; font-size: 11px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
        .nvs-filters { margin: 24px 0 28px; padding: clamp(16px, 2vw, 22px); border: 1px solid #e6e1d6; border-radius: 22px; background: #f7f5ef; }
        .nvs-filter-top { display: grid; grid-template-columns: minmax(220px, 1.4fr) repeat(3, minmax(150px, .7fr)) auto; gap: 12px; align-items: end; }
        .nvs-field { display: grid; gap: 7px; }
        .nvs-field label { color: #102f50; font-size: 10px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
        .nvs-field input,
        .nvs-field select { width: 100%; min-height: 46px; border: 1px solid #e6e1d6; border-radius: 12px; background: #ffffff; color: #071326; padding: 0 13px; font: inherit; font-size: 14px; font-weight: 650; outline: none; }
        .nvs-field input:focus-visible,
        .nvs-field select:focus-visible,
        .nvs-clear:focus-visible,
        .nvs-back:focus-visible,
        .nvs-profile-link:focus-visible { outline: 2px solid #102f50; outline-offset: 2px; }
        .nvs-clear { min-height: 46px; padding: 0 16px; border: 1px solid #102f50; border-radius: 12px; color: #102f50; background: #ffffff; font-size: 12px; font-weight: 900; cursor: pointer; white-space: nowrap; }
        .nvs-filter-bottom { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin-top: 12px; }
        .nvs-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 18px; margin-bottom: 20px; }
        .nvs-result-count { color: #102f50; font-size: 13px; font-weight: 900; letter-spacing: .07em; text-transform: uppercase; }
        .nvs-result-copy { margin: 0; color: #5d6b78; font-size: 13px; font-weight: 650; }
        .nvs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(255px, 1fr)); gap: clamp(18px, 2vw, 26px); align-items: start; }
        .nvs-empty,
        .nvs-error { min-height: 320px; display: grid; place-items: center; padding: 36px; border: 1px dashed #d8d0c1; border-radius: 22px; background: #f7f5ef; text-align: center; }
        .nvs-empty h2 { margin: 0 0 10px; font-size: 28px; line-height: 1.05; color: #071326; }
        .nvs-empty p,
        .nvs-error p { margin: 0 0 18px; color: #5d6b78; line-height: 1.6; }
        .nvs-empty button,
        .nvs-error button { min-height: 42px; padding: 0 16px; border: 0; border-radius: 12px; color: #ffffff; background: #102f50; font-weight: 850; cursor: pointer; }
        @media (max-width: 1100px) {
          .nvs-hero { grid-template-columns: 1fr; }
          .nvs-filter-top,
          .nvs-filter-bottom { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .nvs-clear { width: 100%; }
        }
        @media (max-width: 720px) {
          .nvs-root { padding-top: 22px; }
          .nvs-shell { width: min(100% - 28px, 1480px); }
          .nvs-hero { border-radius: 20px; padding: 22px; }
          .nvs-stats,
          .nvs-filter-top,
          .nvs-filter-bottom { grid-template-columns: 1fr; }
          .nvs-toolbar { align-items: flex-start; flex-direction: column; }
          .nvs-grid { grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 16px; }
        }
      `}</style>

      <div className="nvs-root">
        <div className="nvs-shell">
          <button type="button" className="nvs-back" onClick={() => navigate(-1)}>← Voltar atrás</button>

          <section className="nvs-hero">
            <div>
              <span className="nvs-kicker">Stock público</span>
              <h1 className="nvs-title">{nomeVendedor}</h1>
              <p className="nvs-copy">
                Consulta todos os anúncios ativos deste vendedor num só lugar. Filtra por categoria, preço,
                localização, marca ou modelo antes de abrir cada anúncio.
              </p>
            </div>
            <Link className="nvs-profile-link" to={`/vendedor/${id}`}>Ver perfil do vendedor</Link>
          </section>

          <div className="nvs-stats" aria-label="Resumo do stock">
            <div className="nvs-stat"><strong>{totais.todos}</strong><span>Anúncios ativos</span></div>
            <div className="nvs-stat"><strong>{totais.carro}</strong><span>Automóveis</span></div>
            <div className="nvs-stat"><strong>{totais.imovel}</strong><span>Imóveis</span></div>
            <div className="nvs-stat"><strong>{totais.destacados}</strong><span>Destaques</span></div>
          </div>

          {anuncios.length > 0 && (
            <section className="nvs-filters" aria-label="Filtros do stock">
              <div className="nvs-filter-top">
                <div className="nvs-field">
                  <label htmlFor="nvs-q">Pesquisa</label>
                  <input id="nvs-q" value={filtros.q} onChange={handleFiltro('q')} placeholder="Marca, modelo, cidade ou palavra-chave" />
                </div>
                <div className="nvs-field">
                  <label htmlFor="nvs-categoria">Categoria</label>
                  <select id="nvs-categoria" value={filtros.categoria} onChange={handleFiltro('categoria')}>
                    <option value="todos">Tudo</option>
                    <option value="carro">Automóveis</option>
                    <option value="imovel">Imóveis</option>
                    <option value="destacados">Destaques</option>
                  </select>
                </div>
                <div className="nvs-field">
                  <label htmlFor="nvs-distrito">Distrito</label>
                  <select id="nvs-distrito" value={filtros.distrito} onChange={handleFiltro('distrito')}>
                    <option value="">Portugal inteiro</option>
                    {opcoes.distritos.map((distrito) => <option key={distrito} value={distrito}>{distrito}</option>)}
                  </select>
                </div>
                <div className="nvs-field">
                  <label htmlFor="nvs-ordem">Ordenar</label>
                  <select id="nvs-ordem" value={filtros.ordem} onChange={handleFiltro('ordem')}>
                    <option value="destaque">Destaque primeiro</option>
                    <option value="recentes">Mais recentes</option>
                    <option value="preco-asc">Preço crescente</option>
                    <option value="preco-desc">Preço decrescente</option>
                  </select>
                </div>
                <button type="button" className="nvs-clear" onClick={limparFiltros}>Limpar</button>
              </div>

              <div className="nvs-filter-bottom">
                <div className="nvs-field">
                  <label htmlFor="nvs-marca">Marca</label>
                  <select id="nvs-marca" value={filtros.marca} onChange={handleFiltro('marca')}>
                    <option value="">Todas</option>
                    {opcoes.marcas.map((marca) => <option key={marca} value={marca}>{marca}</option>)}
                  </select>
                </div>
                <div className="nvs-field">
                  <label htmlFor="nvs-modelo">Modelo</label>
                  <select id="nvs-modelo" value={filtros.modelo} onChange={handleFiltro('modelo')}>
                    <option value="">Todos</option>
                    {opcoes.modelos.map((modelo) => <option key={modelo} value={modelo}>{modelo}</option>)}
                  </select>
                </div>
                <div className="nvs-field">
                  <label htmlFor="nvs-preco-min">Preço mínimo</label>
                  <input id="nvs-preco-min" type="number" min="0" value={filtros.precoMin} onChange={handleFiltro('precoMin')} placeholder="Mínimo" />
                </div>
                <div className="nvs-field">
                  <label htmlFor="nvs-preco-max">Preço máximo</label>
                  <input id="nvs-preco-max" type="number" min="0" value={filtros.precoMax} onChange={handleFiltro('precoMax')} placeholder="Máximo" />
                </div>
              </div>
            </section>
          )}

          <div className="nvs-toolbar">
            <div>
              <div className="nvs-result-count">{anunciosFiltrados.length} anúncios encontrados</div>
              <p className="nvs-result-copy">Resultados do stock ativo de {nomeVendedor}.</p>
            </div>
          </div>

          {anunciosFiltrados.length > 0 ? (
            <div className="nvs-grid">
              {anunciosFiltrados.map((anuncio) => {
                const utilizadorPopulado = anuncio?.utilizador && typeof anuncio.utilizador === 'object'
                  ? anuncio.utilizador
                  : vendedor;

                return (
                  <AnuncioCard
                    key={anuncio._id}
                    anuncio={{ ...anuncio, utilizador: utilizadorPopulado }}
                    forceSellerIdentity
                  />
                );
              })}
            </div>
          ) : (
            <div className="nvs-empty">
              <div>
                <h2>{anuncios.length ? 'Sem resultados para estes filtros' : 'Sem anúncios ativos de momento'}</h2>
                <p>
                  {anuncios.length
                    ? 'Experimenta limpar os filtros ou procurar por outra marca, localização ou intervalo de preço.'
                    : 'Este vendedor ainda não tem anúncios ativos publicados na Noxvelia.'}
                </p>
                {anuncios.length > 0 && <button type="button" onClick={limparFiltros}>Limpar filtros</button>}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
