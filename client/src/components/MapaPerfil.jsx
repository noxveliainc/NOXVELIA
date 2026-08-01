import React, { useEffect, useMemo, useState } from 'react';
import { DISTRITOS_CIDADES_PT } from '../data/localizacoes';

const COORDENADAS_DISTRITO = {
  Aveiro: [40.6405, -8.6538],
  Beja: [38.0151, -7.8632],
  Braga: [41.5454, -8.4265],
  Braganca: [41.8061, -6.7567],
  'Castelo Branco': [39.8222, -7.4909],
  Coimbra: [40.2033, -8.4103],
  Evora: [38.5714, -7.9135],
  Faro: [37.0194, -7.9304],
  Guarda: [40.5373, -7.2658],
  Leiria: [39.7436, -8.8071],
  Lisboa: [38.7223, -9.1393],
  Portalegre: [39.2967, -7.4289],
  Porto: [41.1579, -8.6291],
  Santarem: [39.2362, -8.6854],
  Setubal: [38.5244, -8.8882],
  'Viana do Castelo': [41.6918, -8.8344],
  'Vila Real': [41.3006, -7.7441],
  Viseu: [40.6566, -7.9125],
  Acores: [37.7412, -25.6756],
  Madeira: [32.6669, -16.9241],
};

const normalizar = (valor) => String(valor || '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .trim();

const normalizarChave = (valor) => String(valor || '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '');

const correspondeLocalidade = (alvo, valor) => {
  const normalizado = normalizar(valor);
  return normalizado && (alvo === normalizado || alvo.includes(normalizado) || normalizado.includes(alvo));
};

const obterCoordenadasPerfil = (localidade) => {
  const alvo = normalizar(localidade);
  if (!alvo) return null;

  const distritoDireto = Object.keys(DISTRITOS_CIDADES_PT).find((distrito) => correspondeLocalidade(alvo, distrito));
  if (distritoDireto) {
    return {
      centro: COORDENADAS_DISTRITO[normalizarChave(distritoDireto)] || COORDENADAS_DISTRITO[distritoDireto],
      label: distritoDireto,
      zoom: 11,
      aproximado: true,
    };
  }

  for (const [distrito, cidades] of Object.entries(DISTRITOS_CIDADES_PT)) {
    const cidade = cidades.find((item) => correspondeLocalidade(alvo, item));
    if (cidade) {
      return {
        centro: COORDENADAS_DISTRITO[normalizarChave(distrito)] || COORDENADAS_DISTRITO[distrito],
        label: cidade,
        distrito,
        zoom: 11,
        aproximado: true,
      };
    }
  }

  return null;
};

const criarQueryMapa = ({ morada, codigoPostal, localidade }) => [morada, codigoPostal, localidade, 'Portugal']
  .map((item) => String(item || '').trim())
  .filter(Boolean)
  .join(', ');

const criarBbox = ([lat, lng], zoom = 14) => {
  const delta = zoom >= 15 ? 0.012 : zoom >= 13 ? 0.035 : 0.08;
  return [lng - delta, lat - delta, lng + delta, lat + delta]
    .map((valor) => valor.toFixed(5))
    .join('%2C');
};

const lerCacheMapa = (key) => {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.centro || Date.now() - parsed.createdAt > 1000 * 60 * 60 * 24 * 30) return null;
    return parsed;
  } catch {
    return null;
  }
};

const guardarCacheMapa = (key, ponto) => {
  try {
    window.localStorage.setItem(key, JSON.stringify({ ...ponto, createdAt: Date.now() }));
  } catch {
    // O mapa continua a funcionar sem cache local.
  }
};

export default function MapaPerfil({ localidade, nome, standNome, morada, codigoPostal }) {
  const queryMapa = useMemo(() => criarQueryMapa({ morada, codigoPostal, localidade }), [morada, codigoPostal, localidade]);
  const fallback = useMemo(() => obterCoordenadasPerfil(localidade), [localidade]);
  const [pontoGeocodificado, setPontoGeocodificado] = useState(null);
  const [aPesquisar, setAPesquisar] = useState(false);

  useEffect(() => {
    setPontoGeocodificado(null);
    if (!queryMapa) return undefined;

    const cacheKey = `nx-profile-map:${normalizar(queryMapa)}`;
    const cache = lerCacheMapa(cacheKey);
    if (cache) {
      setPontoGeocodificado(cache);
      return undefined;
    }

    const controller = new AbortController();
    let ativo = true;
    setAPesquisar(true);

    fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=pt&q=${encodeURIComponent(queryMapa)}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((resultados) => {
        if (!ativo) return;
        const resultado = Array.isArray(resultados) ? resultados[0] : null;
        if (!resultado?.lat || !resultado?.lon) return;

        const ponto = {
          centro: [Number(resultado.lat), Number(resultado.lon)],
          label: morada || localidade || resultado.display_name,
          distrito: localidade,
          zoom: morada ? 16 : 13,
          aproximado: !morada,
        };
        guardarCacheMapa(cacheKey, ponto);
        setPontoGeocodificado(ponto);
      })
      .catch(() => {})
      .finally(() => {
        if (ativo) setAPesquisar(false);
      });

    return () => {
      ativo = false;
      controller.abort();
    };
  }, [queryMapa, morada, localidade]);

  const ponto = pontoGeocodificado || fallback;

  if (!queryMapa && !ponto?.centro) return null;

  if (!ponto?.centro) {
    return (
      <div className="nx-profile-map nx-profile-map-empty">
        <div className="nx-profile-map-card">
          <span>Localização indicada</span>
          <strong>{morada || localidade || 'Portugal'}</strong>
          {standNome && <small>{standNome}</small>}
        </div>
        <style>{mapStyles}</style>
      </div>
    );
  }

  const [lat, lng] = ponto.centro;
  const zoom = ponto.zoom || 14;
  const bbox = criarBbox(ponto.centro, zoom);
  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat.toFixed(5)}%2C${lng.toFixed(5)}`;
  const openUrl = `https://www.openstreetmap.org/?mlat=${lat.toFixed(5)}&mlon=${lng.toFixed(5)}#map=${zoom}/${lat.toFixed(5)}/${lng.toFixed(5)}`;
  const tituloMapa = standNome || nome || 'Localização do vendedor';

  return (
    <div className="nx-profile-map">
      <iframe
        src={embedUrl}
        title={`Mapa de ${tituloMapa}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="nx-profile-map-card">
        <span>{morada ? 'Morada indicada' : 'Localização indicada'}</span>
        <strong>{standNome || ponto.label}</strong>
        {morada && <em>{morada}</em>}
        <em>{[codigoPostal, localidade || ponto.distrito].filter(Boolean).join(' · ') || 'Portugal'}</em>
        {nome && standNome && <small>{nome}</small>}
        {ponto.aproximado && <small>Localização aproximada</small>}
        {aPesquisar && <small>A afinar o mapa...</small>}
        <a href={openUrl} target="_blank" rel="noopener noreferrer">Abrir mapa</a>
      </div>
      <style>{mapStyles}</style>
    </div>
  );
}

const mapStyles = `
  .nx-profile-map { position: relative; min-height: 260px; border-radius: 16px; overflow: hidden; background: #e2e8f0; border: 1px solid #d8e0dd; }
  .nx-profile-map iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; filter: saturate(.92) contrast(1.02); }
  .nx-profile-map::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(90deg, rgba(7,19,38,.34), transparent 52%); }
  .nx-profile-map-card { position: absolute; left: 16px; bottom: 16px; z-index: 2; display: grid; gap: 4px; min-width: min(260px, calc(100% - 32px)); max-width: 360px; padding: 14px; border: 1px solid rgba(255,255,255,.18); border-radius: 12px; background: rgba(7,19,38,.9); color: #fffaf0; box-shadow: 0 20px 45px -28px rgba(0,0,0,.9); }
  .nx-profile-map-card span { color: #d9c49c; font-size: 10px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
  .nx-profile-map-card strong { font-size: 18px; line-height: 1.15; }
  .nx-profile-map-card em, .nx-profile-map-card small { color: rgba(255,250,240,.76); font-size: 12px; font-style: normal; line-height: 1.35; }
  .nx-profile-map-card a { justify-self: start; margin-top: 6px; min-height: 30px; display: inline-flex; align-items: center; padding: 0 10px; border-radius: 8px; background: #d9c49c; color: #071326; font-size: 11px; font-weight: 900; text-decoration: none; text-transform: uppercase; letter-spacing: .06em; }
  .nx-profile-map-empty { display: flex; align-items: flex-end; background: linear-gradient(135deg, #dbe3ea, #edf2f7); }
  @media (max-width: 640px) { .nx-profile-map { min-height: 300px; } .nx-profile-map-card { left: 12px; right: 12px; bottom: 12px; min-width: 0; } }
`;
