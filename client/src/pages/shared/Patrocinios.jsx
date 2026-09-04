import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Seo from '../../components/Seo';
import api from '../../services/api';
import { Icon } from '@mdi/react';
import { 
  mdiBullhorn, mdiImage, mdiLinkVariant, mdiCalendarClock, 
  mdiShieldCheck, mdiLockCheck, mdiCheckCircle, mdiOpenInNew 
} from '@mdi/js';

const POSICOES_BANNER = [
  { id: 'topo_carros', label: 'Topo Automóveis', desc: 'Banner horizontal em destaque no topo da página de carros', precoBase: 4.99 },
  { id: 'feed_carros', label: 'Meio do Feed Automóveis', desc: 'Banner inserido estrategicamente entre os cartões de carros', precoBase: 4.99 },
  { id: 'topo_imoveis', label: 'Topo Imóveis', desc: 'Banner horizontal em destaque no topo da página de imóveis', precoBase: 4.99 },
  { id: 'feed_imoveis', label: 'Meio do Feed Imóveis', desc: 'Banner inserido estrategicamente entre os cartões de imóveis', precoBase: 4.99 },
  { id: 'lateral_anuncio', label: 'Lateral do Anúncio', desc: 'Formato retângulo lateral de alta visibilidade nos detalhes', precoBase: 4.99 },
  { id: 'fundo_anuncio', label: 'Fundo do Anúncio', desc: 'Posicionado no encerramento das páginas de detalhe', precoBase: 4.99 },
  { id: 'inicio_institucional', label: 'Página Inicial (Landing)', desc: 'Banner institucional de máxima exposição na homepage', precoBase: 6.99 }
];

const DURACOES = [
  { dias: 7, label: '7 Dias', mult: 1, poupanca: null },
  { dias: 14, label: '14 Dias', mult: 1.8, poupanca: 'Mais popular' },
  { dias: 30, label: '30 Dias', mult: 3, poupanca: 'Melhor valor (-40%)' }
];

export default function Patrocinios() {
  const navigate = useNavigate();
  const { user, signed } = useAuth();

  const [nomeCampanha, setNomeCampanha] = useState('');
  const [posicaoSelecionada, setPosicaoSelecionada] = useState('topo_carros');
  const [duracaoSelecionada, setDuracaoSelecionada] = useState(14);
  const [imagemUrl, setImagemUrl] = useState('');
  const [linkDestino, setLinkDestino] = useState('');
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [erro, setErro] = useState('');

  // Cálculo dinâmico do preço baseado na posição e duração
  const posicaoObj = POSICOES_BANNER.find(p => p.id === posicaoSelecionada) || POSICOES_BANNER[0];
  const duracaoObj = DURACOES.find(d => d.dias === duracaoSelecionada) || DURACOES[1];
  const precoTotal = Number((posicaoObj.precoBase * duracaoObj.mult).toFixed(2));

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoadingUpload(true);
    setErro('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data?.url) {
        setImagemUrl(res.data.url);
      } else {
        throw new Error('URL não retornado');
      }
    } catch {
      setErro('Erro ao carregar imagem. Tente novamente ou cole o link direto.');
    } finally {
      setLoadingUpload(false);
    }
  };

  const handleCriarCampanhaECheckout = async (e) => {
    e.preventDefault();
    if (!signed) {
      navigate('/login', { state: { from: '/patrocinios' } });
      return;
    }
    if (!nomeCampanha.trim() || !imagemUrl.trim() || !linkDestino.trim()) {
      setErro('Por favor, preencha o nome, adicione a imagem criativa e o link de destino.');
      return;
    }

    setLoadingCheckout(true);
    setErro('');

    try {
      // Criação da intenção / banner patrocinado pendente no backend
      const res = await api.post('/banners/patrocinados', {
        titulo: nomeCampanha,
        posicao: posicaoSelecionada,
        imagemUrl,
        linkDestino,
        dias: duracaoSelecionada,
        valor: precoTotal
      });

      const checkoutUrl = res.data?.url || res.data?.checkoutUrl;
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error('Sessão de pagamento Stripe não iniciada.');
      }
    } catch (err) {
      setErro(err.response?.data?.erro || 'Erro ao iniciar o processo de pagamento. Tente novamente.');
      setLoadingCheckout(false);
    }
  };

  return (
    <>
      <Seo 
        title="Patrocínios e Campanhas Publicitárias | Noxvelia" 
        description="Promova a sua marca, stand ou imobiliária nos melhores espaços do portal Noxvelia em Portugal. Visibilidade direta com zero intermediários." 
        path="/patrocinios" 
      />

      <style>{`
        .pat-root {
          font-family: 'Inter', sans-serif;
          background: #fdfdfd;
          color: #071326;
          min-height: 100vh;
          padding: 48px 24px 80px;
          box-sizing: border-box;
        }

        .pat-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .pat-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 48px;
        }
        .pat-eyebrow {
          font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em;
          color: #102f50; background: rgba(16, 47, 80, 0.06); padding: 6px 14px; border-radius: 100px;
          display: inline-block; margin-bottom: 14px;
        }
        .pat-header h1 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(30px, 4vw, 40px);
          font-weight: 800;
          letter-spacing: -0.03em;
          margin: 0 0 12px;
          color: #071326;
        }
        .pat-header p {
          font-size: 15.5px;
          color: #5d6b78;
          line-height: 1.6;
          margin: 0;
        }

        .pat-layout {
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 32px;
          align-items: flex-start;
        }

        /* CARTÕES DE CONFIGURAÇÃO */
        .pat-card {
          background: #ffffff;
          border: 1px solid #e6e1d6;
          border-radius: 20px;
          padding: 32px;
          margin-bottom: 24px;
          box-shadow: 0 10px 30px -10px rgba(7, 19, 38, 0.04);
        }
        .pat-card-title {
          font-size: 16px;
          font-weight: 800;
          color: #071326;
          margin: 0 0 6px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .pat-card-desc {
          font-size: 13.5px;
          color: #5d6b78;
          margin: 0 0 20px;
        }

        .pat-label {
          display: block;
          font-size: 12px;
          font-weight: 800;
          color: #071326;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }
        .pat-input {
          width: 100%;
          min-height: 48px;
          border: 1px solid #e6e1d6;
          border-radius: 10px;
          background: #ffffff;
          color: #071326;
          padding: 0 16px;
          font-size: 14px;
          font-weight: 600;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .pat-input:focus {
          border-color: #102f50;
          box-shadow: 0 0 0 3px rgba(16, 47, 80, 0.08);
        }

        /* GRELHA DE POSIÇÕES */
        .pat-positions-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }
        .pat-pos-option {
          border: 1px solid #e6e1d6;
          border-radius: 12px;
          padding: 16px;
          background: #ffffff;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s ease;
        }
        .pat-pos-option:hover {
          border-color: #102f50;
          background: #f7f5ef;
        }
        .pat-pos-option.active {
          border: 2px solid #102f50;
          background: #f7f5ef;
          box-shadow: 0 4px 12px rgba(16, 47, 80, 0.08);
        }
        .pat-pos-title {
          font-size: 13.5px;
          font-weight: 800;
          color: #071326;
          margin-bottom: 4px;
        }
        .pat-pos-sub {
          font-size: 11.5px;
          color: #5d6b78;
          line-height: 1.4;
        }

        /* GRELHA DE DURAÇÃO */
        .pat-duration-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }
        .pat-dur-option {
          border: 1px solid #e6e1d6;
          border-radius: 12px;
          padding: 16px 12px;
          background: #ffffff;
          cursor: pointer;
          text-align: center;
          transition: all 0.2s ease;
        }
        .pat-dur-option:hover {
          border-color: #102f50;
          background: #f7f5ef;
        }
        .pat-dur-option.active {
          border: 2px solid #102f50;
          background: #f7f5ef;
          box-shadow: 0 4px 12px rgba(16, 47, 80, 0.08);
        }
        .pat-dur-days {
          font-size: 15px;
          font-weight: 800;
          color: #071326;
          margin-bottom: 4px;
        }
        .pat-dur-price {
          font-size: 13px;
          font-weight: 700;
          color: #102f50;
          margin-bottom: 4px;
        }
        .pat-dur-badge {
          font-size: 9.5px;
          font-weight: 800;
          color: #854d0e;
          background: #fef08a;
          padding: 2px 6px;
          border-radius: 4px;
          display: inline-block;
        }

        /* UPLOAD DE CRIATIVO */
        .pat-upload-box {
          border: 2px dashed #cbd5e1;
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          background: #f8fafc;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .pat-upload-box:hover {
          border-color: #102f50;
        }

        /* COLUNA DIREITA: RESUMO E PREVIEW */
        .pat-sidebar {
          position: sticky;
          top: 92px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .pat-preview-card {
          background: #ffffff;
          border: 1px solid #e6e1d6;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 15px 35px -10px rgba(7, 19, 38, 0.06);
        }
        .pat-preview-box {
          background: #f7f5ef;
          border: 1px dashed #cbd5e1;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          min-height: 140px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin-top: 12px;
        }
        .pat-preview-img {
          max-width: 100%;
          max-height: 120px;
          object-fit: cover;
          border-radius: 8px;
        }

        .pat-checkout-box {
          border-top: 1px solid #e6e1d6;
          padding-top: 20px;
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .pat-total-label {
          font-size: 12px;
          font-weight: 800;
          color: #5d6b78;
          text-transform: uppercase;
        }
        .pat-total-val {
          font-size: 28px;
          font-weight: 900;
          color: #071326;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .pat-btn-pay {
          width: 100%;
          min-height: 52px;
          border: none;
          border-radius: 12px;
          background: #102f50;
          color: #ffffff;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: background 0.2s, transform 0.1s;
          margin-top: 20px;
          box-shadow: 0 6px 20px rgba(16, 47, 80, 0.25);
        }
        .pat-btn-pay:hover {
          background: #071326;
          transform: translateY(-1px);
        }
        .pat-btn-pay:disabled {
          opacity: 0.7;
          cursor: default;
          transform: none;
        }

        .pat-secure-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 12px;
          font-size: 11.5px;
          color: #5d6b78;
          font-weight: 600;
        }

        .pat-error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #991b1b;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        @media (max-width: 1024px) {
          .pat-layout { grid-template-columns: 1fr; }
          .pat-sidebar { position: static; }
          .pat-positions-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="pat-root">
        <div className="pat-container">
          
          <div className="pat-header">
            <span className="pat-eyebrow">Publicidade Direta & Visibilidade</span>
            <h1>Destaque a sua marca no topo da Noxvelia</h1>
            <p>AlCance milhares de compradores ativos em Portugal no setor automóvel e imobiliário com banners de alta conversão.</p>
          </div>

          {erro && <div className="pat-error">{erro}</div>}

          <form onSubmit={handleCriarCampanhaECheckout} className="pat-layout">
            
            {/* COLUNA ESQUERDA: CONFIGURAÇÃO */}
            <div className="pat-main-config">
              
              {/* PASSO 1: IDENTIDADE */}
              <div className="pat-card">
                <h3 className="pat-card-title"><Icon path={mdiBullhorn} size={0.9} color="#102f50" /> 1. Identidade da Campanha</h3>
                <p className="pat-card-desc">Atribua um nome claro para identificar facilmente a sua campanha publicitária.</p>
                
                <label className="pat-label">Nome da Marca ou Campanha</label>
                <input 
                  type="text" 
                  className="pat-input" 
                  placeholder="Ex: Stand Silva Matosinhos / Imobiliária Prime" 
                  value={nomeCampanha}
                  onChange={(e) => setNomeCampanha(e.target.value)}
                  required 
                />
              </div>

              {/* PASSO 2: POSIÇÃO */}
              <div className="pat-card">
                <h3 className="pat-card-title"><Icon path={mdiImage} size={0.9} color="#102f50" /> 2. Escolha a Localização do Banner</h3>
                <p className="pat-card-desc">Selecione onde pretende que o seu anúncio aparecido para os utilizadores.</p>

                <div className="pat-positions-grid">
                  {POSICOES_BANNER.map((pos) => (
                    <div 
                      key={pos.id} 
                      className={`pat-pos-option ${posicaoSelecionada === pos.id ? 'active' : ''}`}
                      onClick={() => setPosicaoSelecionada(pos.id)}
                    >
                      <div className="pat-pos-title">{pos.label}</div>
                      <div className="pat-pos-sub">{pos.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PASSO 3: CRIATIVO E DESTINO */}
              <div className="pat-card">
                <h3 className="pat-card-title"><Icon path={mdiLinkVariant} size={0.9} color="#102f50" /> 3. Criativo e Link de Destino</h3>
                <p className="pat-card-desc">Carregue a imagem ou GIF do banner e indique o link para onde o cliente será redirecionado.</p>

                <div style={{ marginBottom: 20 }}>
                  <label className="pat-label">Imagem do Banner (Upload ou URL)</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 10, alignItems: 'center' }}>
                    <input 
                      type="text" 
                      className="pat-input" 
                      placeholder="https://exemplo.com/banner.webp ou faça upload ao lado" 
                      value={imagemUrl}
                      onChange={(e) => setImagemUrl(e.target.value)}
                      required 
                    />
                    <label className="pat-btn-pay" style={{ margin: 0, padding: '0 20px', minHeight: 48, fontSize: 13, cursor: 'pointer' }}>
                      {loadingUpload ? 'A carregar...' : 'Fazer Upload'}
                      <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="pat-label">Link de Destino (Onde o cliente vai ter ao clicar)</label>
                  <input 
                    type="url" 
                    className="pat-input" 
                    placeholder="https://o-seu-site.pt ou página de stock" 
                    value={linkDestino}
                    onChange={(e) => setLinkDestino(e.target.value)}
                    required 
                  />
                </div>
              </div>

              {/* PASSO 4: DURAÇÃO */}
              <div className="pat-card">
                <h3 className="pat-card-title"><Icon path={mdiCalendarClock} size={0.9} color="#102f50" /> 4. Duração da Campanha</h3>
                <p className="pat-card-desc">Selecione o período de exibição contínua do seu patrocínio.</p>

                <div className="pat-duration-grid">
                  {DURACOES.map((dur) => (
                    <div 
                      key={dur.dias} 
                      className={`pat-dur-option ${duracaoSelecionada === dur.dias ? 'active' : ''}`}
                      onClick={() => setDuracaoSelecionada(dur.dias)}
                    >
                      <div className="pat-dur-days">{dur.label}</div>
                      <div className="pat-dur-price">{(posicaoObj.precoBase * dur.mult).toFixed(2)} €</div>
                      {dur.poupanca && <span className="pat-dur-badge">{dur.poupanca}</span>}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* COLUNA DIREITA: RESUMO E CHECKOUT */}
            <div className="pat-sidebar">
              <div className="pat-preview-card">
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#071326', margin: '0 0 4px' }}>Pré-visualização</h3>
                <p style={{ fontSize: 12.5, color: '#5d6b78', margin: 0 }}>Como o seu banner aparecerá no portal.</p>

                <div className="pat-preview-box">
                  {imagemUrl ? (
                    <img src={imagemUrl} alt="Preview do Banner" className="pat-preview-img" />
                  ) : (
                    <>
                      <Icon path={mdiImage} size={1.8} color="#cbd5e1" style={{ marginBottom: 6 }} />
                      <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>Insira um criativo para visualizar</span>
                    </>
                  )}
                </div>

                <div style={{ marginTop: 16, fontSize: 13 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, color: '#5d6b78' }}>
                    <span>Posição:</span>
                    <strong style={{ color: '#071326' }}>{posicaoObj.label}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#5d6b78' }}>
                    <span>Duração:</span>
                    <strong style={{ color: '#071326' }}>{duracaoObj.label}</strong>
                  </div>
                </div>

                <div className="pat-checkout-box">
                  <div>
                    <span className="pat-total-label">Total a pagar</span>
                    <div className="pat-total-val">{precoTotal.toFixed(2)} €</div>
                  </div>
                </div>

                <button type="submit" className="pat-btn-pay" disabled={loadingCheckout}>
                  {loadingCheckout ? (
                    <>
                      <span className="pat-spinner" style={{ width: 16, height: 16, border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'pl-spin 0.8s linear infinite' }} />
                      A processar segurança...
                    </>
                  ) : (
                    'Finalizar Pagamento Seguro →'
                  )}
                </button>

                <div className="pat-secure-note">
                  <Icon path={mdiLockCheck} size={0.7} color="#102f50" />
                  Pagamento 100% encriptado e processado via Stripe
                </div>

              </div>
            </div>

          </form>

        </div>
      </div>
    </>
  );
}