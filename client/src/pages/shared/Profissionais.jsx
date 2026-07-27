import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, Building2, Car, ExternalLink, Home, MapPin, Search, Star, Trophy } from 'lucide-react';
import Seo from '../../components/Seo';
import api from '../../services/api';
import { DISTRITOS } from '../../data/localizacoes';
import { getImageUrl } from '../../utils/images';

const formatarNumero = (valor) => new Intl.NumberFormat('pt-PT').format(valor || 0);

export default function Profissionais() {
  const [q, setQ] = useState('');
  const [distrito, setDistrito] = useState('Todos');
  const [profissionais, setProfissionais] = useState([]);
  const [totalProfissionais, setTotalProfissionais] = useState(0);
  const [totalAnunciosAtivos, setTotalAnunciosAtivos] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const filtrosAtivos = useMemo(() => [
    q.trim() && `"${q.trim()}"`,
    distrito !== 'Todos' && distrito,
  ].filter(Boolean), [q, distrito]);

  useEffect(() => {
    let ativo = true;
    const timer = setTimeout(async () => {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams({ limit: '24' });
        if (q.trim()) params.set('q', q.trim());
        if (distrito !== 'Todos') params.set('distrito', distrito);
        const { data } = await api.get(`/users/profissionais?${params.toString()}`);
        if (!ativo) return;
        setProfissionais(Array.isArray(data?.profissionais) ? data.profissionais : []);
        setTotalProfissionais(Number(data?.totalProfissionais || 0));
        setTotalAnunciosAtivos(Number(data?.totalAnunciosAtivos || 0));
      } catch {
        if (!ativo) return;
        setProfissionais([]);
        setTotalProfissionais(0);
        setTotalAnunciosAtivos(0);
        setError('Não foi possível carregar profissionais neste momento.');
      } finally {
        if (ativo) setLoading(false);
      }
    }, 220);

    return () => {
      ativo = false;
      clearTimeout(timer);
    };
  }, [q, distrito]);

  return (
    <div className="pro-root">
      <Seo
        title="Profissionais com anúncios ativos em Portugal | Noxvelia"
        description="Encontra stands, mediadores e vendedores com anúncios ativos na Noxvelia."
        path="/profissionais"
      />
      <style>{`
        .pro-root { min-height: 100vh; background: #f7f3ea; color: #071326; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
        .pro-shell { width: min(1220px, calc(100% - 36px)); margin: 0 auto; }
        .pro-hero { padding: 44px 0 24px; border-bottom: 1px solid rgba(7,19,38,0.1); background: #fffaf0; }
        .pro-hero-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(320px, 430px); gap: 28px; align-items: end; }
        .pro-kicker { display: inline-flex; align-items: center; gap: 8px; margin-bottom: 12px; color: #102f50; font-size: 11px; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; }
        .pro-hero h1 { margin: 0; max-width: 760px; font-size: 56px; line-height: 1; letter-spacing: 0; font-weight: 900; }
        .pro-hero p { max-width: 650px; margin: 18px 0 0; color: #435363; font-size: 15px; line-height: 1.65; }
        .pro-summary { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
        .pro-summary-item { min-height: 84px; padding: 16px; border: 1px solid rgba(7,19,38,0.1); border-radius: 10px; background: #ffffff; }
        .pro-summary-item strong { display: block; font-size: 28px; line-height: 1; font-weight: 900; }
        .pro-summary-item span { display: block; margin-top: 8px; color: #66717d; font-size: 11px; font-weight: 850; letter-spacing: 0.08em; text-transform: uppercase; }
        .pro-toolbar { position: sticky; top: 72px; z-index: 20; padding: 14px 0; background: rgba(247,243,234,0.92); border-bottom: 1px solid rgba(7,19,38,0.08); backdrop-filter: blur(14px); }
        .pro-tools { display: grid; grid-template-columns: minmax(0, 1fr) minmax(180px, 260px); gap: 10px; }
        .pro-search, .pro-select { min-height: 46px; display: flex; align-items: center; gap: 10px; padding: 0 14px; border: 1px solid rgba(7,19,38,0.14); border-radius: 10px; background: #ffffff; color: #071326; }
        .pro-search input, .pro-select select { width: 100%; border: 0; outline: 0; background: transparent; color: inherit; font: inherit; font-size: 13px; font-weight: 700; }
        .pro-active { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
        .pro-chip { display: inline-flex; min-height: 28px; align-items: center; padding: 0 10px; border: 1px solid rgba(217,196,156,.38); border-radius: 999px; background: #fffaf0; color: #102f50; font-size: 11px; font-weight: 850; }
        .pro-section { padding: 26px 0 56px; }
        .pro-results { display: flex; flex-direction: column; gap: 16px; }
        .pro-list-head { display: flex; align-items: end; justify-content: space-between; gap: 18px; margin-bottom: 4px; }
        .pro-list-kicker { display: block; margin-bottom: 6px; color: #102f50; font-size: 11px; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; }
        .pro-list-title { margin: 0; color: #071326; font-size: 22px; line-height: 1.15; font-weight: 900; }
        .pro-list-note { color: #60767c; font-size: 12px; font-weight: 800; text-align: right; }
        .pro-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
        .pro-card { overflow: hidden; min-height: 314px; display: flex; flex-direction: column; border: 1px solid rgba(7,19,38,0.1); border-radius: 10px; background: #ffffff; color: inherit; text-decoration: none; transition: border-color .18s ease, transform .18s ease; }
        .pro-card:hover { border-color: rgba(217,196,156,0.64); transform: translateY(-2px); }
        .pro-card.is-featured { border-color: rgba(217,196,156,0.58); box-shadow: 0 14px 30px -26px rgba(7,19,38,0.45); }
        .pro-cover { height: 108px; position: relative; background: linear-gradient(135deg, #f0dfbb, #fffaf0); }
        .pro-cover img { width: 100%; height: 100%; display: block; object-fit: cover; }
        .pro-rank { position: absolute; top: 12px; right: 12px; display: inline-flex; align-items: center; gap: 6px; min-height: 28px; padding: 0 10px; border-radius: 999px; background: rgba(7,19,38,0.9); color: #ffffff; font-size: 10px; font-weight: 900; letter-spacing: 0.04em; text-transform: uppercase; }
        .pro-avatar { position: absolute; left: 16px; bottom: -28px; width: 62px; height: 62px; display: grid; place-items: center; overflow: hidden; border: 3px solid #ffffff; border-radius: 50%; background: #fffaf0; color: #102f50; font-size: 22px; font-weight: 900; }
        .pro-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .pro-body { padding: 38px 16px 16px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
        .pro-name-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
        .pro-name { min-width: 0; }
        .pro-name strong { display: block; color: #071326; font-size: 18px; line-height: 1.15; font-weight: 900; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .pro-location { display: inline-flex; align-items: center; gap: 5px; margin-top: 6px; color: #60767c; font-size: 12px; font-weight: 750; }
        .pro-badge { display: inline-flex; align-items: center; gap: 5px; min-height: 26px; padding: 0 9px; border-radius: 999px; background: #071326; color: #ffffff; font-size: 10px; font-weight: 900; letter-spacing: 0.06em; text-transform: uppercase; white-space: nowrap; }
        .pro-bio { min-height: 42px; margin: 0; color: #435363; font-size: 13px; line-height: 1.55; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .pro-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 7px; }
        .pro-stat { min-width: 0; padding: 9px; border: 1px solid #eadfc9; border-radius: 8px; background: #fffaf0; }
        .pro-stat strong { display: block; font-size: 15px; font-weight: 900; line-height: 1; }
        .pro-stat span { display: block; margin-top: 5px; color: #6a7480; font-size: 9px; font-weight: 850; letter-spacing: 0.07em; text-transform: uppercase; }
        .pro-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: auto; padding-top: 4px; color: #102f50; font-size: 12px; font-weight: 900; }
        .pro-rating { display: inline-flex; align-items: center; gap: 5px; color: #9d7b3f; }
        .pro-state { padding: 62px 20px; text-align: center; color: #60767c; font-size: 14px; font-weight: 750; }
        .dark .pro-root { background: #071326; color: #fffaf0; }
        .dark .pro-hero, .dark .pro-toolbar { background: rgba(7,19,38,0.94); border-color: rgba(240,223,187,.18); }
        .dark .pro-card, .dark .pro-summary-item, .dark .pro-search, .dark .pro-select { background: #102f50; border-color: rgba(240,223,187,.18); color: #fffaf0; }
        .dark .pro-card.is-featured { border-color: rgba(217,196,156,0.62); box-shadow: 0 18px 36px -28px rgba(217,196,156,0.38); }
        .dark .pro-name strong, .dark .pro-summary-item strong, .dark .pro-list-title { color: #f8fafc; }
        .dark .pro-hero p, .dark .pro-bio, .dark .pro-location, .dark .pro-summary-item span, .dark .pro-list-note { color: rgba(255,250,240,.74); }
        .dark .pro-stat { background: #071326; border-color: rgba(240,223,187,.18); }
        @media (max-width: 980px) { .pro-hero-grid, .pro-tools { grid-template-columns: 1fr; } .pro-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .pro-toolbar { top: 64px; } }
        @media (max-width: 640px) { .pro-shell { width: min(100% - 24px, 1220px); } .pro-hero { padding-top: 30px; } .pro-hero h1 { font-size: 36px; } .pro-grid, .pro-summary { grid-template-columns: 1fr; } .pro-list-head { align-items: flex-start; flex-direction: column; } .pro-list-note { text-align: left; } .pro-card { min-height: 0; } .pro-summary-item { min-height: 72px; } }
      `}</style>

      <section className="pro-hero">
        <div className="pro-shell pro-hero-grid">
          <div>
            <span className="pro-kicker"><Building2 size={15} /> Diretório profissional</span>
            <h1>Anunciantes com mais oferta ativa.</h1>
            <p>Encontra stands, mediadores e vendedores ordenados por volume real de anúncios ativos, localização e ligação direta ao perfil público.</p>
          </div>
          {(loading || totalProfissionais > 0 || totalAnunciosAtivos > 0) && <div className="pro-summary" aria-label="Resumo de profissionais">
            <div className="pro-summary-item"><strong>{loading ? '...' : formatarNumero(totalProfissionais)}</strong><span>Anunciantes ativos</span></div>
            <div className="pro-summary-item"><strong>{loading ? '...' : formatarNumero(totalAnunciosAtivos)}</strong><span>Anúncios ativos</span></div>
          </div>}
        </div>
      </section>

      <div className="pro-toolbar">
        <div className="pro-shell">
          <div className="pro-tools">
            <label className="pro-search">
              <Search size={18} />
              <input value={q} onChange={(event) => setQ(event.target.value)} placeholder="Pesquisar por nome, bio ou localização" />
            </label>
            <label className="pro-select">
              <MapPin size={18} />
              <select value={distrito} onChange={(event) => setDistrito(event.target.value)}>
                <option value="Todos">Portugal inteiro</option>
                {DISTRITOS.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
          </div>
          {filtrosAtivos.length > 0 && (
            <div className="pro-active">
              {filtrosAtivos.map((item) => <span className="pro-chip" key={item}>{item}</span>)}
            </div>
          )}
        </div>
      </div>

      <section className="pro-section">
        <div className="pro-shell">
          {error && <div className="pro-state">{error}</div>}
          {!error && loading && <div className="pro-state">A carregar profissionais...</div>}
          {!error && !loading && profissionais.length === 0 && <div className="pro-state">Não encontrámos montras profissionais com estes filtros. Podes limpar a pesquisa ou explorar diretamente carros e imóveis.</div>}
          {!error && !loading && profissionais.length > 0 && (
            <div className="pro-results">
              <div className="pro-list-head">
                <div>
                  <span className="pro-list-kicker">Montras ativas</span>
                  <h2 className="pro-list-title">Anunciantes com mais anúncios ativos</h2>
                </div>
                <span className="pro-list-note">Ordenado pelo número de anúncios ativos</span>
              </div>

              <div className="pro-grid">
                {profissionais.map((profissional, index) => {
                  const avatar = getImageUrl(profissional.avatarUrl, 'thumb') || profissional.avatarUrl;
                  const capa = getImageUrl(profissional.capaUrl, 'medium') || profissional.capaUrl;
                  const inicial = profissional.nome?.charAt(0)?.toUpperCase() || 'P';
                  const rankLabel = index === 0 ? 'Top anunciante' : `#${index + 1} mais anúncios`;

                  return (
                    <Link className={`pro-card${index < 3 ? ' is-featured' : ''}`} to={`/vendedor/${profissional._id}`} key={profissional._id}>
                      <div className="pro-cover">
                        {capa && <img src={capa} alt="" loading="lazy" />}
                        {index < 3 && <span className="pro-rank"><Trophy size={13} /> {rankLabel}</span>}
                        <span className="pro-avatar">{avatar ? <img src={avatar} alt="" loading="lazy" /> : inicial}</span>
                      </div>
                      <div className="pro-body">
                        <div className="pro-name-row">
                          <div className="pro-name">
                            <strong>{profissional.nome || 'Profissional'}</strong>
                            <span className="pro-location"><MapPin size={13} /> {profissional.localidade || 'Portugal'}</span>
                          </div>
                          {(profissional.tipoConta === 'profissional' || profissional.tipo === 'admin') && <span className="pro-badge"><BadgeCheck size={13} /> Empresa</span>}
                        </div>
                        <p className="pro-bio">{profissional.bio || 'Perfil com anúncios ativos na Noxvelia.'}</p>
                        <div className="pro-stats">
                          <span className="pro-stat"><strong>{formatarNumero(profissional.totalAnuncios)}</strong><span>Anúncios</span></span>
                          <span className="pro-stat"><strong><Car size={15} /></strong><span>{formatarNumero(profissional.carros)} carros</span></span>
                          <span className="pro-stat"><strong><Home size={15} /></strong><span>{formatarNumero(profissional.imoveis)} imóveis</span></span>
                        </div>
                        <div className="pro-foot">
                          <span className="pro-rating"><Star size={14} /> {profissional.totalAvaliacoes ? `${Number(profissional.rating || 0).toFixed(1)} (${profissional.totalAvaliacoes})` : 'Novo perfil'}</span>
                          <span>Ver montra <ExternalLink size={13} /></span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}