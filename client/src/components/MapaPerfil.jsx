import React, { useMemo } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
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
      zoom: 10,
    };
  }

  for (const [distrito, cidades] of Object.entries(DISTRITOS_CIDADES_PT)) {
    const cidade = cidades.find((item) => correspondeLocalidade(alvo, item));
    if (cidade) {
      return {
        centro: COORDENADAS_DISTRITO[normalizarChave(distrito)] || COORDENADAS_DISTRITO[distrito],
        label: cidade,
        distrito,
        zoom: 10,
      };
    }
  }

  return null;
};

const normalizarChave = (valor) => String(valor || '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace('Braganca', 'Braganca')
  .replace('Evora', 'Evora')
  .replace('Santarem', 'Santarem')
  .replace('Setubal', 'Setubal')
  .replace('Acores', 'Acores');

const criarIconePerfil = () => L.divIcon({
  className: 'nx-profile-map-pin',
  html: '<span></span>',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

export default function MapaPerfil({ localidade, nome }) {
  const ponto = useMemo(() => obterCoordenadasPerfil(localidade), [localidade]);
  const icone = useMemo(() => criarIconePerfil(), []);

  if (!ponto?.centro) return null;

  return (
    <div className="nx-profile-map">
      <MapContainer
        center={ponto.centro}
        zoom={ponto.zoom}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
        zoomControl={false}
        attributionControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution="&copy; OpenStreetMap &copy; CARTO"
        />
        <Marker position={ponto.centro} icon={icone} />
      </MapContainer>
      <div className="nx-profile-map-card">
        <span>Localização indicada</span>
        <strong>{ponto.label}</strong>
        <em>{ponto.distrito ? `${ponto.distrito} · Portugal` : 'Portugal'}</em>
        {nome && <small>{nome}</small>}
      </div>
      <style>{`
        .nx-profile-map { position: relative; min-height: 230px; border-radius: 16px; overflow: hidden; background: #e2e8f0; }
        .nx-profile-map::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(90deg, rgba(7,19,38,.48), transparent 58%); }
        .nx-profile-map-card { position: absolute; left: 16px; bottom: 16px; z-index: 500; display: grid; gap: 3px; min-width: 190px; padding: 14px; border: 1px solid rgba(255,255,255,.18); border-radius: 12px; background: rgba(7,19,38,.88); color: #fffaf0; box-shadow: 0 20px 45px -28px rgba(0,0,0,.9); }
        .nx-profile-map-card span { color: #d9c49c; font-size: 10px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
        .nx-profile-map-card strong { font-size: 18px; line-height: 1.1; }
        .nx-profile-map-card em, .nx-profile-map-card small { color: rgba(255,250,240,.72); font-size: 12px; font-style: normal; }
        .nx-profile-map-pin { background: transparent; border: 0; }
        .nx-profile-map-pin span { width: 30px; height: 30px; display: block; border-radius: 999px; background: #d9c49c; border: 7px solid #102f50; box-shadow: 0 0 0 5px rgba(217,196,156,.26), 0 16px 26px -16px rgba(0,0,0,.9); }
      `}</style>
    </div>
  );
}
