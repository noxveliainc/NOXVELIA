import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import AnuncioCard from './AnuncioCard';
import Icon from '@mdi/react';
import { mdiCheckDecagram, mdiWhatsapp, mdiPhone, mdiMapMarker, mdiEmailOutline, mdiWeb } from '@mdi/js';

export default function PerfilPublico() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [vendedor, setVendedor] = useState(null);
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const carregarMontra = async () => {
      try {
        const { data } = await api.get(`/users/vendedor/${id}`);
        setVendedor(data.vendedor);
        setAnuncios(data.anuncios || []);
      } catch (err) {
        setErro('Erro ao carregar a montra do vendedor.');
      } finally {
        setLoading(false);
      }
    };
    carregarMontra();
  }, [id]);

  if (loading) return <div style={{ minHeight: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#040711' }}><div className="nx-spinner" style={{ borderColor: 'rgba(42, 193, 180, 0.2)', borderTopColor: '#2ac1b4' }} /></div>;
  if (erro) return <div style={{ minHeight: 'calc(100vh - 72px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#040711', color: '#f8fafc' }}><div style={{ fontSize: '40px', marginBottom: '16px' }}>🏢</div><p style={{ color: '#94a3b8', marginBottom: '24px', fontSize: '15px' }}>{erro}</p><button onClick={() => navigate(-1)} style={{ padding: '12px 24px', background: '#2ac1b4', color: '#040711', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>← Voltar à Pesquisa</button></div>;

  const inicial = vendedor?.nome?.charAt(0).toUpperCase() || '?';
  const isAdmin = vendedor?.tipo === 'admin'; 
  
  // 🌟 O NOVO ESTATUTO DE VERIFICAÇÃO PARA A MONTRA
  const isVerificado = isAdmin || vendedor?.premiumAtivo === true;

  const nomeExibicao = isAdmin ? (vendedor.nome.toUpperCase().includes('NOXVELIA') ? vendedor.nome : `NOXVELIA ${vendedor.nome}`) : vendedor?.nome;
  const isProfissional = vendedor?.tipoConta === 'profissional' || isAdmin;
  const telefoneLimpo = vendedor?.telefone?.replace(/\D/g, '');

  return (
    <>
      <style>{`
        .pp-root { background: #040711; min-height: calc(100vh - 72px); font-family: var(--nx-font-body, sans-serif); color: #f8fafc; padding-bottom: 80px; }
        .pp-hero { position: relative; background-image: radial-gradient(circle at top right, rgba(42, 193, 180, 0.1), transparent 50%), radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.08), transparent 50%); border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding: 64px 24px 80px 24px; margin-bottom: 48px; overflow: hidden; }
        .pp-hero-content { max-width: 1200px; margin: 0 auto; position: relative; z-index: 2; }
        .pp-back { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; text-decoration: none; cursor: pointer; background: none; border: none; padding: 0; margin-bottom: 40px; transition: color 0.2s; }
        .pp-back:hover { color: #f8fafc; }
        .pp-user-section { display: flex; align-items: flex-start; gap: 40px; background: rgba(15, 23, 42, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); padding: 40px; border-radius: 24px; backdrop-filter: blur(16px); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
        @media (max-width: 860px) { .pp-user-section { flex-direction: column; text-align: center; align-items: center; gap: 24px; padding: 32px 20px; } }
        .pp-avatar { width: 140px; height: 140px; border-radius: 24px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); display: flex; align-items: center; justify-content: center; font-family: var(--nx-font-display); font-size: 48px; font-weight: 800; color: #2ac1b4; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); flex-shrink: 0; }
        .pp-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .pp-info { flex: 1; }
        .pp-badge-pro { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #2ac1b4; background: rgba(42, 193, 180, 0.1); padding: 6px 12px; border-radius: 8px; margin-bottom: 12px; border: 1px solid rgba(42, 193, 180, 0.2); }
        .pp-name { font-family: var(--nx-font-display, sans-serif); font-size: 36px; font-weight: 800; letter-spacing: -0.02em; margin: 0 0 12px 0; display: flex; align-items: center; gap: 10px; color: #f8fafc; }
        @media (max-width: 860px) { .pp-name { justify-content: center; } }
        .pp-location { font-size: 14px; color: #94a3b8; font-weight: 500; margin: 0 0 24px 0; display: flex; align-items: center; gap: 6px; }
        @media (max-width: 860px) { .pp-location { justify-content: center; } }
        
        .pp-actions { display: flex; gap: 12px; flex-wrap: wrap; }
        @media (max-width: 860px) { .pp-actions { justify-content: center; width: 100%; } }
        
        .btn-contact { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 24px; border-radius: 10px; font-size: 13px; font-weight: 700; text-decoration: none; transition: all 0.2s; }
        .btn-whatsapp { background: #25D366; color: #ffffff; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3); }
        .btn-whatsapp:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4); }
        .btn-secondary { background: transparent; color: #f8fafc; border: 1px solid rgba(255, 255, 255, 0.2); }
        .btn-secondary:hover { background: rgba(255, 255, 255, 0.05); border-color: rgba(255, 255, 255, 0.4); }
        .btn-website { background: rgba(59, 130, 246, 0.1); color: #3b82f6; border: 1px solid rgba(59, 130, 246, 0.3); }
        .btn-website:hover { background: rgba(59, 130, 246, 0.2); }

        .pp-main { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        .pp-section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; padding-bottom: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
        .pp-section-title { font-family: var(--nx-font-display, sans-serif); font-size: 20px; font-weight: 800; margin: 0; color: #f8fafc; }
        .pp-count { font-size: 13px; color: #94a3b8; font-weight: 600; background: rgba(255, 255, 255, 0.05); padding: 6px 12px; border-radius: 20px; }
        .pp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 32px; }
      `}</style>

      <div className="pp-root">
        <div className="pp-hero">
          <div className="pp-hero-content">
            <button onClick={() => navigate(-1)} className="pp-back">← Voltar Atrás</button>

            <div className="pp-user-section">
              <div className="pp-avatar">
                {vendedor?.avatarUrl ? <img src={vendedor.avatarUrl} alt={nomeExibicao} /> : inicial}
              </div>
              
              <div className="pp-info">
                {isProfissional ? (
                  <div className="pp-badge-pro">✓ Vendedor Profissional</div>
                ) : (
                  <div className="pp-badge-pro" style={{ color: '#94a3b8', background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>Anunciante Particular</div>
                )}

                <h1 className="pp-name">
                  {nomeExibicao}
                  {/* 🌟 CRACHÁ DE VERIFICADO */}
                  {isVerificado && <Icon path={mdiCheckDecagram} size={1.2} color="#3b82f6" title="Vendedor Verificado" />}
                </h1>

                <div className="pp-location">
                  <Icon path={mdiMapMarker} size={0.7} />
                  {vendedor?.localidade ? `Distrito de ${vendedor.localidade}` : 'Portugal'}
                </div>

                {!isAdmin && (
                  <div className="pp-actions">
                    {telefoneLimpo && (
                      <>
                        <a href={`https://wa.me/351${telefoneLimpo}?text=Olá! Vi os seus anúncios na NOXVELIA.`} target="_blank" rel="noopener noreferrer" className="btn-contact btn-whatsapp">
                          <Icon path={mdiWhatsapp} size={0.8} /> WhatsApp
                        </a>
                        <a href={`tel:+351${telefoneLimpo}`} className="btn-contact btn-secondary">
                          <Icon path={mdiPhone} size={0.8} /> Ligar
                        </a>
                      </>
                    )}
                    {vendedor?.email && (
                      <a href={`mailto:${vendedor.email}`} className="btn-contact btn-secondary">
                        <Icon path={mdiEmailOutline} size={0.8} /> Email
                      </a>
                    )}
                    {vendedor?.website && (
                      <a href={vendedor.website.startsWith('http') ? vendedor.website : `https://${vendedor.website}`} target="_blank" rel="noopener noreferrer" className="btn-contact btn-website">
                        <Icon path={mdiWeb} size={0.8} /> Visitar Site
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="pp-main">
          <div className="pp-section-header">
            <h2 className="pp-section-title">Portfólio de Ativos</h2>
            <div className="pp-count">{anuncios.length} Disponíveis</div>
          </div>
          
          <div className="pp-grid">
            {anuncios.map(anuncio => (
              <AnuncioCard key={anuncio._id} anuncio={anuncio} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}