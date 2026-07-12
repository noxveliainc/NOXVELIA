import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const ComparisonContext = createContext(null);
const STORAGE_KEY = 'noxvelia_comparison';
export const MAX_COMPARISON_ITEMS = 3;

const readItems = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => item?.id && item?.titulo).slice(0, MAX_COMPARISON_ITEMS);
  } catch {
    return [];
  }
};

const persistItems = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // O comparador continua funcional em memória quando o armazenamento está bloqueado.
  }
};

const normalizarAnuncio = (anuncio) => {
  const id = String(anuncio?._id || anuncio?.id || '');
  const isCarro = anuncio?.tipo === 'carro';
  const anoArea = isCarro
    ? (anuncio?.carro?.ano ? String(anuncio.carro.ano) : 'Não indicado')
    : (anuncio?.imovel?.area ? String(anuncio.imovel.area) + ' m²' : 'Não indicada');

  return {
    id,
    tipo: isCarro ? 'carro' : 'imovel',
    imagem: anuncio?.fotos?.[0] || anuncio?.imagens?.[0] || anuncio?.imagem || '',
    titulo: String(anuncio?.titulo || 'Anúncio sem título').slice(0, 140),
    preco: Number(anuncio?.preco) || 0,
    anoArea,
    localizacao: [anuncio?.localizacao?.cidade, anuncio?.localizacao?.distrito].filter(Boolean).join(', ') || 'Não indicada',
  };
};

export function ComparisonProvider({ children }) {
  const [items, setItems] = useState(readItems);

  useEffect(() => {
    const syncOtherTabs = (event) => {
      if (event.key === STORAGE_KEY) setItems(readItems());
    };
    window.addEventListener('storage', syncOtherTabs);
    return () => window.removeEventListener('storage', syncOtherTabs);
  }, []);

  const adicionar = useCallback((anuncio) => {
    const normalizado = normalizarAnuncio(anuncio);
    if (!normalizado.id) return { ok: false, code: 'invalid' };
    if (items.some((item) => item.id === normalizado.id)) return { ok: false, code: 'duplicate' };
    if (items.length >= MAX_COMPARISON_ITEMS) return { ok: false, code: 'limit' };

    const next = [...items, normalizado];
    setItems(next);
    persistItems(next);
    return { ok: true, code: 'added' };
  }, [items]);

  const remover = useCallback((id) => {
    const next = items.filter((item) => item.id !== String(id));
    setItems(next);
    persistItems(next);
  }, [items]);

  const limpar = useCallback(() => {
    setItems([]);
    persistItems([]);
  }, []);

  const isCompared = useCallback((id) => items.some((item) => item.id === String(id)), [items]);
  const value = useMemo(
    () => ({ items, adicionar, remover, limpar, isCompared }),
    [items, adicionar, remover, limpar, isCompared],
  );

  return <ComparisonContext.Provider value={value}>{children}</ComparisonContext.Provider>;
}

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) throw new Error('useComparison deve ser utilizado dentro de ComparisonProvider.');
  return context;
};
