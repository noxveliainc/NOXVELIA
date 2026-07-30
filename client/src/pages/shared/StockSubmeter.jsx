import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const formatos = [
  { value: 'csv', label: 'CSV' },
  { value: 'xlsx', label: 'Excel .xlsx' },
  { value: 'xls', label: 'Excel .xls' },
  { value: 'xml', label: 'XML' },
  { value: 'json', label: 'JSON' },
  { value: 'outro', label: 'Outro' },
];

const estadoInicial = {
  empresa: '',
  nome: '',
  email: '',
  telefone: '',
  website: '',
  formato: 'csv',
  mensagem: '',
};

export default function StockSubmeter() {
  const [form, setForm] = useState(estadoInicial);
  const [ficheiro, setFicheiro] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const tamanhoFicheiro = useMemo(() => {
    if (!ficheiro?.size) return '';
    if (ficheiro.size < 1024 * 1024) return `${Math.ceil(ficheiro.size / 1024)} KB`;
    return `${(ficheiro.size / (1024 * 1024)).toFixed(1)} MB`;
  }, [ficheiro]);

  const atualizar = (campo) => (event) => {
    setForm((atual) => ({ ...atual, [campo]: event.target.value }));
  };

  const submeter = async (event) => {
    event.preventDefault();
    setErro('');
    setSucesso(false);

    if (!ficheiro) {
      setErro('Anexa o ficheiro de stock para conseguirmos preparar a importação.');
      return;
    }

    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => payload.append(key, value));
    payload.append('ficheiro', ficheiro);

    try {
      setEnviando(true);
      await api.post('/stock-submissions', payload);
      setSucesso(true);
      setForm(estadoInicial);
      setFicheiro(null);
      event.currentTarget.reset();
    } catch (error) {
      setErro(error.response?.data?.erro || 'Não foi possível enviar o stock. Confirma os dados e tenta novamente.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="stock-page">
      <style>{`
        .stock-page, .stock-page * { box-sizing: border-box; }
        .stock-page {
          min-height: 100%;
          background: #f6f1e7;
          color: #071326;
          padding: 58px 18px 78px;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .stock-wrap {
          width: min(1120px, 100%);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, .88fr) minmax(420px, 1fr);
          gap: 28px;
          align-items: start;
        }
        .stock-hero { padding: 34px 0 0; }
        .stock-kicker {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 18px;
          color: #102f50;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .16em;
          text-transform: uppercase;
        }
        .stock-kicker::before { content: ""; width: 34px; height: 1px; background: #d9c49c; }
        .stock-title {
          margin: 0;
          max-width: 680px;
          color: #071326;
          font-size: clamp(38px, 6vw, 72px);
          line-height: .94;
          letter-spacing: -0.035em;
          font-weight: 900;
        }
        .stock-lead {
          max-width: 620px;
          margin: 22px 0 0;
          color: #405a63;
          font-size: 17px;
          line-height: 1.65;
        }
        .stock-points {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-top: 28px;
        }
        .stock-point {
          min-height: 88px;
          padding: 15px;
          border: 1px solid #ddd1bc;
          border-radius: 12px;
          background: rgba(255,255,255,.55);
        }
        .stock-point strong { display: block; color: #071326; font-size: 15px; margin-bottom: 5px; }
        .stock-point span { color: #587076; font-size: 12px; line-height: 1.45; }
        .stock-card {
          border: 1px solid #d9d2c4;
          border-radius: 18px;
          background: rgba(255,255,255,.82);
          box-shadow: 0 26px 70px -52px rgba(7,19,38,.42);
          overflow: hidden;
        }
        .stock-card-head {
          padding: 24px 26px 18px;
          border-bottom: 1px solid #e4ddcf;
          background: rgba(255,250,240,.72);
        }
        .stock-card-head h1 { margin: 0; font-size: 26px; letter-spacing: -.02em; }
        .stock-card-head p { margin: 8px 0 0; color: #536b72; line-height: 1.5; }
        .stock-form { display: grid; gap: 16px; padding: 24px 26px 26px; }
        .stock-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
        .stock-field { display: grid; gap: 7px; }
        .stock-field label {
          color: #102f50;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .11em;
          text-transform: uppercase;
        }
        .stock-field input, .stock-field select, .stock-field textarea {
          width: 100%;
          min-height: 48px;
          border: 1px solid #d7dfe4;
          border-radius: 11px;
          background: #fff;
          color: #071326;
          padding: 0 13px;
          font: inherit;
          font-size: 14px;
          outline: none;
          transition: border-color .15s ease, box-shadow .15s ease;
        }
        .stock-field textarea { min-height: 104px; padding-top: 12px; resize: vertical; }
        .stock-field input:focus, .stock-field select:focus, .stock-field textarea:focus {
          border-color: #102f50;
          box-shadow: 0 0 0 4px rgba(16,47,80,.08);
        }
        .stock-file {
          display: grid;
          gap: 9px;
          padding: 16px;
          border: 1px dashed #c9b78f;
          border-radius: 14px;
          background: #fffaf0;
        }
        .stock-file input { min-height: auto; padding: 0; border: 0; background: transparent; }
        .stock-file small, .stock-note { color: #60767c; font-size: 12px; line-height: 1.45; }
        .stock-note a { color: #102f50; font-weight: 800; text-underline-offset: 3px; }
        .stock-error {
          padding: 12px 13px;
          border: 1px solid #f0b4a6;
          border-radius: 11px;
          color: #9f2a1f;
          background: #fff2ee;
          font-weight: 700;
          font-size: 13px;
        }
        .stock-success {
          padding: 18px;
          border: 1px solid #d9c49c;
          border-radius: 14px;
          background: #fff7e4;
          color: #102f50;
        }
        .stock-success strong { display: block; color: #071326; margin-bottom: 5px; }
        .stock-submit {
          min-height: 52px;
          border: 0;
          border-radius: 12px;
          background: #071326;
          color: #fffaf0;
          font-weight: 900;
          cursor: pointer;
          transition: transform .15s ease, background .15s ease;
        }
        .stock-submit:hover:not(:disabled) { transform: translateY(-1px); background: #102f50; }
        .stock-submit:disabled { opacity: .62; cursor: wait; }
        .stock-secondary { display: inline-flex; align-items: center; color: #102f50; font-weight: 850; text-decoration: none; }
        @media (max-width: 920px) { .stock-wrap { grid-template-columns: 1fr; } .stock-hero { padding-top: 0; } }
        @media (max-width: 620px) {
          .stock-page { padding: 34px 12px 58px; }
          .stock-grid, .stock-points { grid-template-columns: 1fr; }
          .stock-card-head, .stock-form { padding-left: 18px; padding-right: 18px; }
        }
      `}</style>

      <div className="stock-wrap">
        <section className="stock-hero">
          <div className="stock-kicker">Stock de stands</div>
          <h1 className="stock-title">Coloca vários automóveis na NOXVELIA sem inserir um a um.</h1>
          <p className="stock-lead">
            Envia o ficheiro de stock do teu stand. A equipa valida o formato, prepara a importação e responde-te com os próximos passos.
          </p>
          <div className="stock-points">
            <div className="stock-point"><strong>Rápido</strong><span>CSV, Excel, XML ou JSON num único envio.</span></div>
            <div className="stock-point"><strong>Sem API</strong><span>Funciona mesmo antes de existir integração automática.</span></div>
            <div className="stock-point"><strong>Controlado</strong><span>Os anúncios só entram depois de validação.</span></div>
          </div>
        </section>

        <section className="stock-card" aria-label="Enviar ficheiro de stock">
          <div className="stock-card-head">
            <h1>Enviar stock</h1>
            <p>Preenche os contactos e anexa o ficheiro. Se tiveres dúvidas, usa o modelo recomendado.</p>
          </div>

          <form className="stock-form" onSubmit={submeter}>
            {sucesso && (
              <div className="stock-success">
                <strong>Pedido recebido.</strong>
                Vamos analisar o ficheiro e responder pelo email indicado.
              </div>
            )}
            {erro && <div className="stock-error">{erro}</div>}

            <div className="stock-grid">
              <div className="stock-field">
                <label htmlFor="empresa">Empresa / Stand</label>
                <input id="empresa" value={form.empresa} onChange={atualizar('empresa')} required placeholder="Nome do stand" />
              </div>
              <div className="stock-field">
                <label htmlFor="nome">Contacto</label>
                <input id="nome" value={form.nome} onChange={atualizar('nome')} required placeholder="Nome da pessoa" />
              </div>
              <div className="stock-field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={form.email} onChange={atualizar('email')} required placeholder="stock@stand.pt" />
              </div>
              <div className="stock-field">
                <label htmlFor="telefone">Telemóvel</label>
                <input id="telefone" value={form.telefone} onChange={atualizar('telefone')} placeholder="Opcional" />
              </div>
              <div className="stock-field">
                <label htmlFor="website">Website</label>
                <input id="website" value={form.website} onChange={atualizar('website')} placeholder="https://..." />
              </div>
              <div className="stock-field">
                <label htmlFor="formato">Formato</label>
                <select id="formato" value={form.formato} onChange={atualizar('formato')}>
                  {formatos.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                </select>
              </div>
            </div>

            <div className="stock-field">
              <label htmlFor="mensagem">Notas</label>
              <textarea id="mensagem" value={form.mensagem} onChange={atualizar('mensagem')} placeholder="Ex: todos os automóveis estão disponíveis, imagens no ficheiro, preços com IVA incluído..." />
            </div>

            <div className="stock-file">
              <div className="stock-field">
                <label htmlFor="ficheiro">Ficheiro de stock</label>
                <input id="ficheiro" type="file" accept=".csv,.xls,.xlsx,.xml,.json,.txt" onChange={(event) => setFicheiro(event.target.files?.[0] || null)} required />
              </div>
              <small>{ficheiro ? `${ficheiro.name} · ${tamanhoFicheiro}` : 'Tamanho máximo: 10 MB.'}</small>
            </div>

            <p className="stock-note">
              Modelo recomendado: <a href="/templates/importacao-stock-noxvelia.csv" download>descarregar CSV da NOXVELIA</a>. Não partilhamos o ficheiro com terceiros; é usado apenas para preparar a publicação dos anúncios.
            </p>

            <button className="stock-submit" type="submit" disabled={enviando}>{enviando ? 'A enviar...' : 'Enviar ficheiro de stock'}</button>
            <Link className="stock-secondary" to="/publicar">Prefiro criar apenas um anúncio</Link>
          </form>
        </section>
      </div>
    </main>
  );
}
