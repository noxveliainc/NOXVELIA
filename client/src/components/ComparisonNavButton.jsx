import React from 'react';
import { Link } from 'react-router-dom';
import { useComparison } from '../context/ComparisonContext';

export default function ComparisonNavButton() {
  const { items } = useComparison();
  const label = items.length > 0 ? 'Abrir comparador com ' + items.length + ' anúncios' : 'Abrir comparador';

  return (
    <Link
      to="/comparador"
      className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 no-underline transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-800"
      title={label}
      aria-label={label}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 3 4 7l4 4" /><path d="M4 7h16" /><path d="m16 21 4-4-4-4" /><path d="M20 17H4" />
      </svg>
      {items.length > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-md border-2 border-white bg-teal-500 px-1 text-[10px] font-black leading-none text-slate-950 dark:border-slate-900">
          {items.length}
        </span>
      )}
    </Link>
  );
}
