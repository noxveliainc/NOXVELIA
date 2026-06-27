import React, { useState } from 'react';

const HINTS = [
  'T3 no Porto até 200 mil com garagem',
  'Moradia com piscina no Algarve',
  'BMW série 3 abaixo de 20k km',
  'Apartamento T1 perto do metro Lisboa',
  'Eléctrico menos de 80 mil km',
  'T2 renovado Braga centro',
];

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  const handleHint = (hint) => {
    setQuery(hint);
    onSearch(hint);
  };

  return (
    <div className="w-full">
      <div
        className="text-[11px] font-bold mb-3 tracking-widest uppercase"
        style={{ fontFamily: 'Syne, sans-serif', color: 'rgba(255,255,255,.5)' }}
      >
        Pesquisa inteligente com IA
      </div>

      <form onSubmit={handleSubmit}>
        <div
          className="flex items-center overflow-hidden"
          style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}
        >
          {/* Icon */}
          <div className="pl-5 pr-3 flex-shrink-0" style={{ color: 'var(--ink-3)' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <path d="m21 21-4.35-4.35" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>

          {/* Input */}
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Ex: T3 no Porto até 200 mil com garagem…"
            className="flex-1 py-[18px] text-base outline-none bg-transparent"
            style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--ink)' }}
          />

          {/* Limpar (Botão Extra de UX) */}
          {query && (
            <button 
              type="button" 
              onClick={() => setQuery('')}
              className="px-3 text-gray-400 hover:text-white"
            >
              ✕
            </button>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="m-2 px-5 py-3 text-[13px] font-bold text-white rounded-[var(--radius)] transition-all flex items-center gap-2 flex-shrink-0"
            style={{ fontFamily: 'Syne, sans-serif', background: loading ? '#6b7280' : 'var(--accent)' }}
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                A pesquisar…
              </>
            ) : (
              <>Pesquisar ✦</>
            )}
          </button>
        </div>
      </form>

      {/* Hints */}
      <div className="flex gap-2 flex-wrap mt-3.5">
        {HINTS.map(hint => (
          <button
            key={hint}
            type="button" // IMPORTANTE: Adiciona type="button" para evitar submissão do formulário
            onClick={() => handleHint(hint)}
            className="text-xs px-3 py-1.5 rounded-full transition-all border border-[rgba(255,255,255,0.1)]"
            style={{
              background: 'rgba(255,255,255,.1)',
              color: 'rgba(255,255,255,.7)',
            }}
          >
            {hint}
          </button>
        ))}
      </div>
    </div>
  );
}