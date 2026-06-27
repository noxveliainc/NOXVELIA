import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Icon from '@mdi/react';
import { mdiCheckBold, mdiCrown, mdiLoading } from '@mdi/js';
import api from '../../services/api';

export default function Planos() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { sincronizarUser, user } = useAuth();
  const [loadingStripe, setLoadingStripe] = useState(false);
  const [aSincronizar, setASincronizar] = useState(false);

  // 🔄 Quando o Stripe devolve com sucesso, sincroniza o estado premium
  useEffect(() => {
    const resultado = searchParams.get('premium');
    if (resultado === 'sucesso') {
      setASincronizar(true);
      sincronizarUser().finally(() => setASincronizar(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const iniciarAssinatura = async () => {
    setLoadingStripe(true);
    try {
      const res = await api.post('/stripe/criar-checkout-premium');
      if (res.data && res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      alert('Erro ao iniciar pagamento. Tenta novamente.');
      setLoadingStripe(false);
    }
  };

  // 🌟 Abre o Billing Portal da Stripe para quem já é Premium gerir a subscrição
  const abrirPortalCliente = async () => {
    setLoadingStripe(true);
    try {
      const res = await api.post('/stripe/criar-portal-cliente');
      if (res.data && res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      alert('Erro ao abrir o portal de gestão. Tenta novamente.');
      setLoadingStripe(false);
    }
  };

  return (
    <div style={{ padding: '80px 20px', background: '#040711', minHeight: 'calc(100vh - 72px)', color: '#fff', textAlign: 'center', fontFamily: 'var(--nx-font-body)' }}>
      <h1 style={{ fontFamily: 'var(--nx-font-display)', fontSize: '40px', marginBottom: '16px' }}>Escolhe o teu estatuto</h1>
      <p style={{ color: '#94a3b8', marginBottom: '60px' }}>Eleva a tua presença na NOXVELIA e publica sem limites.</p>

      {aSincronizar && (
        <p style={{ color: '#2ac1b4', fontSize: '13px', marginBottom: '30px', fontWeight: 600 }}>
          A confirmar o teu pagamento...
        </p>
      )}

      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>

        {/* PLANO GRATUITO */}
        <div style={{ background: '#0f172a', padding: '40px', borderRadius: '24px', border: '1px solid #1e293b', width: '320px', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '24px', margin: 0 }}>Particular</h2>
          <div style={{ fontSize: '32px', fontWeight: '800', margin: '20px 0' }}>Gratuito</div>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '30px' }}>Para quem quer vender esporadicamente.</p>
          <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', marginBottom: '40px', flex: 1 }}>
            <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><Icon path={mdiCheckBold} size={0.7} color="#2ac1b4" /> Até 10 anúncios simultâneos</li>
            <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><Icon path={mdiCheckBold} size={0.7} color="#2ac1b4" /> Suporte Base</li>
          </ul>
          <button onClick={() => navigate('/perfil')} style={{ background: 'transparent', border: '1px solid #3b82f6', color: '#3b82f6', padding: '15px', borderRadius: '12px', width: '100%', fontWeight: '700', cursor: 'pointer' }}>
            Ir para o meu Perfil
          </button>
        </div>

        {/* PLANO PREMIUM */}
        <div style={{ background: 'linear-gradient(180deg, #1e293b, #0f172a)', padding: '40px', borderRadius: '24px', border: '2px solid #eab308', width: '320px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: user?.premiumAtivo ? '#22c55e' : '#eab308', color: '#000', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 800, letterSpacing: '0.05em' }}>
            {user?.premiumAtivo ? '✓ O TEU PLANO ATUAL' : 'MAIS ESCOLHIDO'}
          </div>
          <div style={{ color: '#eab308', marginBottom: '10px' }}><Icon path={mdiCrown} size={1.5} /></div>
          <h2 style={{ fontSize: '24px', margin: 0 }}>Profissional</h2>
          <div style={{ fontSize: '32px', fontWeight: '800', margin: '20px 0' }}>10.99€ <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 500 }}>/mês</span></div>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '30px' }}>Para stands e imobiliárias de elite.</p>
          <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', marginBottom: '40px', flex: 1 }}>
            <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><Icon path={mdiCheckBold} size={0.7} color="#eab308" /> Anúncios <strong>Ilimitados</strong></li>
            <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><Icon path={mdiCheckBold} size={0.7} color="#eab308" /> Selo de Vendedor Verificado</li>
            <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><Icon path={mdiCheckBold} size={0.7} color="#eab308" /> Destaque Prioritário no Algoritmo</li>
            <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><Icon path={mdiCheckBold} size={0.7} color="#eab308" /> Apoio Dedicado</li>
          </ul>

          {user?.premiumAtivo ? (
            <button onClick={abrirPortalCliente} disabled={loadingStripe} style={{ background: 'transparent', border: '2px solid #eab308', color: '#eab308', padding: '15px', borderRadius: '12px', width: '100%', fontWeight: '800', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              {loadingStripe ? <Icon path={mdiLoading} size={0.8} className="animate-spin" /> : 'Gerir a Minha Subscrição'}
            </button>
          ) : (
            <button onClick={iniciarAssinatura} disabled={loadingStripe} style={{ background: '#eab308', border: 'none', color: '#000', padding: '15px', borderRadius: '12px', width: '100%', fontWeight: '800', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              {loadingStripe ? <Icon path={mdiLoading} size={0.8} className="animate-spin" /> : 'Aderir ao Profissional'}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}