import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link } from 'react-router-dom';

// Componente para ajustar o zoom automaticamente aos pins
function ChangeView({ bounds }) {
  const map = useMap();
  if (bounds && bounds.length > 0) {
    map.fitBounds(bounds, { padding: [50, 50] });
  }
  return null;
}

export default function MapaResultados({ imoveis }) {
  const [bounds, setBounds] = useState([]);

  useEffect(() => {
    if (imoveis && imoveis.length > 0) {
      const pontas = imoveis
        .filter(i => i.localizacao?.coordenadas?.lat && i.localizacao?.coordenadas?.lng)
        .map(i => [i.localizacao.coordenadas.lat, i.localizacao.coordenadas.lng]);
      
      if (pontas.length > 0) setBounds(pontas);
    }
  }, [imoveis]);

  // Se não houver imóveis com coordenadas, mostra o centro de Portugal
  const centroDefault = [39.3999, -8.2245];
  const zoomDefault = 6;

  // Função para criar o Pin com o Preço (Design NOXVELIA Estate)
  const criarIconePreco = (precoNum) => {
    const precoFormatado = new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(precoNum);
    
    return L.divIcon({
      className: 'custom-NOXVELIA-pin',
      html: `
        <div style="
          background: #3ecf8e; 
          color: #020617; 
          font-family: 'Inter', sans-serif;
          font-weight: 800; 
          padding: 4px 8px; 
          border-radius: 8px; 
          font-size: 12px; 
          box-shadow: 0 4px 10px rgba(0,0,0,0.4); 
          border: 2px solid #ffffff;
          white-space: nowrap;
          transform: translate(-50%, -100%);
        ">
          ${precoFormatado}
        </div>
      `,
      iconSize: [0, 0], 
      iconAnchor: [0, 0] 
    });
  };

  return (
    <div style={{ height: '100%', width: '100%', borderRadius: '16px', overflow: 'hidden', zIndex: 0, position: 'relative' }}>
      <MapContainer 
        center={centroDefault} 
        zoom={zoomDefault} 
        style={{ height: '100%', width: '100%', zIndex: 1 }}
        zoomControl={false}
      >
        {/* Mapa Base Escuro / Premium */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap &copy; CARTO'
        />
        
        {/* 🌟 A CORREÇÃO DE OURO ESTÁ AQUI: O uso do ternário (? : null) evita a tela branca! */}
        {bounds.length > 0 ? <ChangeView bounds={bounds} /> : null}

        {imoveis.map(imovel => {
          if (!imovel.localizacao?.coordenadas?.lat || !imovel.localizacao?.coordenadas?.lng) return null;
          
          return (
            <Marker 
              key={imovel._id}
              position={[imovel.localizacao.coordenadas.lat, imovel.localizacao.coordenadas.lng]}
              icon={criarIconePreco(imovel.preco)}
            >
              <Popup closeButton={false} className="NOXVELIA-popup">
                <Link to={`/anuncio/${imovel._id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '200px' }}>
                  <div style={{ height: '120px', width: '100%', borderRadius: '8px', overflow: 'hidden', marginBottom: '8px' }}>
                    {imovel.fotos?.[0] ? (
                      <img src={imovel.fotos[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🏠</div>
                    )}
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif" }}>
                    <div style={{ fontWeight: 800, fontSize: '16px', color: '#0f172a', marginBottom: '4px' }}>
                      {new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(imovel.preco)}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {imovel.titulo}
                    </div>
                  </div>
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <style>{`
        /* Anula estilos default do Leaflet para ficar com aspeto clean */
        .leaflet-popup-content-wrapper { border-radius: 12px; padding: 0; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
        .leaflet-popup-content { margin: 8px; }
        .leaflet-popup-tip { background: #fff; }
        .custom-NOXVELIA-pin { background: transparent; border: none; }
      `}</style>
    </div>
  );
}