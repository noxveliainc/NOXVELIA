import React, { useEffect, useRef, useState } from 'react';
import { X, Send } from 'lucide-react';
import api from '../../../services/api';

const TIPOS = [
  { value: 'carro', label: 'Automóvel' },
  { value: 'imovel', label: 'Imóvel' }
];

/**
 * Formulário para quem já tem um anúncio noutra plataforma.
 * Endpoint sugerido: POST /leads/listing-import
 * Body: { name, email, phone, type, listingUrl, message }
 *
 * IMPORTANTE: antes de assumir que este endpoint não existe, confirmar no
 * backend se já existe um sistema de contacto/leads reutilizável. Se o
 * endpoint ainda não existir, este pedido falha com erro tratado abaixo
 * (mensagem genérica), sem quebrar a página.
 */
export default function SendListingModal({ open, onClose, defaultTipo = 'carro' }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    type: defaultTipo,
    listingUrl: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const dialogRef = useRef(null);

  useEffect(() => {
    if (open) {
      setForm((prev) => ({ ...prev, type: defaultTipo }));
      setStatus('idle');
    }
  }, [open, defaultTipo]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    const timer = setTimeout(() => {
      dialogRef.current?.querySelector('input, select')?.focus();
    }, 0);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      clearTimeout(timer);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.listingUrl.trim()) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      await api.post('/leads/listing-import', form);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div
      className="nx-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="nx-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="nx-modal-title"
        ref={dialogRef}
      >
        <button type="button" className="nx-modal-close" onClick={onClose} aria-label="Fechar">
          <X size={18} />
        </button>

        <h3 id="nx-modal-title">Enviar anúncio</h3>
        <p className="nx-modal-sub">
          Envie-nos o link do seu anúncio. A nossa equipa trata da publicação na NOXVELIA.
        </p>

        {status === 'success' ? (
          <div className="nx-modal-success">
            Pedido enviado. Entraremos em contacto para tratar da publicação.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="nx-modal-form" noValidate>
            <div className="nx-modal-field">
              <label htmlFor="nx-lead-name">Nome</label>
              <input id="nx-lead-name" type="text" value={form.name} onChange={handleChange('name')} required />
            </div>

            <div className="nx-modal-field">
              <label htmlFor="nx-lead-email">Email</label>
              <input id="nx-lead-email" type="email" value={form.email} onChange={handleChange('email')} required />
            </div>

            <div className="nx-modal-field">
              <label htmlFor="nx-lead-phone">Telefone (opcional)</label>
              <input id="nx-lead-phone" type="tel" value={form.phone} onChange={handleChange('phone')} />
            </div>

            <div className="nx-modal-field">
              <label htmlFor="nx-lead-type">Tipo</label>
              <select id="nx-lead-type" value={form.type} onChange={handleChange('type')}>
                {TIPOS.map((tipo) => (
                  <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
                ))}
              </select>
            </div>

            <div className="nx-modal-field">
              <label htmlFor="nx-lead-url">Link do anúncio</label>
              <input
                id="nx-lead-url"
                type="url"
                placeholder="https://..."
                value={form.listingUrl}
                onChange={handleChange('listingUrl')}
                required
              />
            </div>

            <div className="nx-modal-field">
              <label htmlFor="nx-lead-message">Mensagem (opcional)</label>
              <textarea id="nx-lead-message" rows={3} value={form.message} onChange={handleChange('message')} />
            </div>

            {status === 'error' && (
              <p className="nx-modal-error">Não foi possível enviar o pedido. Tente novamente.</p>
            )}

            <button type="submit" className="nx-modal-submit" disabled={status === 'sending'}>
              <Send size={15} />
              {status === 'sending' ? 'A enviar...' : 'Enviar pedido'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}