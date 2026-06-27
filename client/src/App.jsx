import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import { HelmetProvider } from 'react-helmet-async'; 

// --- COMPONENTES ---
import ProtectedRoute from './components/ProtectedRoute';
import PremiumRoute from './components/PremiumRoute'; // 🌟 Importado
import NavbarCarro from './components/carros/NavbarCarro';
import NavbarImovel from './components/imoveis/NavbarImovel';
import PageTransition from './components/PageTransition'; 
import Footer from './components/Footer';

// --- PÁGINAS (lazy) ---
const Landing        = lazy(() => import('./pages/shared/Landing'));
const Login          = lazy(() => import('./pages/shared/Login'));
const Registo        = lazy(() => import('./pages/shared/Registo'));
const ForgotPassword = lazy(() => import('./pages/shared/ForgotPassword'));
const ResetPassword  = lazy(() => import('./pages/auth/ResetPassword'));
const VerificarEmail = lazy(() => import('./pages/shared/VerificarEmail')); // 🌟 NOVO

const PesquisaCarro  = lazy(() => import('./pages/carros/PesquisaCarro'));
const PesquisaImovel = lazy(() => import('./pages/imoveis/PesquisaImovel'));

const Anuncio        = lazy(() => import('./pages/shared/Anuncio'));
const Publicar       = lazy(() => import('./pages/shared/Publicar'));
const Editar         = lazy(() => import('./pages/shared/Editar'));
const Perfil         = lazy(() => import('./pages/shared/Perfil'));
const Favoritos      = lazy(() => import('./pages/shared/Favoritos'));
const PerfilPublico  = lazy(() => import('./pages/shared/PerfilPublico'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const SucessoUpsell  = lazy(() => import('./pages/shared/SucessoUpsell'));
const Planos         = lazy(() => import('./pages/shared/Planos'));

function LoadingFallback() {
  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#040711', minHeight: '60vh' }}>
      <div style={{ width: '28px', height: '28px', border: '2px solid rgba(255,255,255,0.08)', borderTopColor: '#2ac1b4', borderRadius: '50%', animation: 'nx-spin 0.7s linear infinite' }} />
      <style>{`@keyframes nx-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function AppShell() {
  const location = useLocation();
  const [contextoVisual, setContextoVisual] = useState(() => localStorage.getItem('@App:contexto_visual') || 'carro');

  useEffect(() => {
    if (location.pathname.startsWith('/carros')) {
      localStorage.setItem('@App:contexto_visual', 'carro');
      setContextoVisual('carro');
    } else if (location.pathname.startsWith('/imoveis')) {
      localStorage.setItem('@App:contexto_visual', 'imovel');
      setContextoVisual('imovel');
    }
  }, [location.pathname]);

  const rotasSemNavbar = ['/', '/login', '/registo', '/forgot-password'];
  // 🌟 NOVO: /verificar-email também entra na lista de rotas "auth" sem navbar/footer
  const isAuthRoute = location.pathname.startsWith('/reset-password') || location.pathname.startsWith('/verificar-email');
  const esconderNavbar = rotasSemNavbar.includes(location.pathname) || isAuthRoute;
  const esconderFooter = rotasSemNavbar.includes(location.pathname) || isAuthRoute || location.pathname.startsWith('/admin');

  const NavbarComponent = contextoVisual === 'imovel' ? NavbarImovel : NavbarCarro;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--nx-bg, #040711)', transition: 'background 0.3s ease' }}>
      <PageTransition />
      {!esconderNavbar && <NavbarComponent />}
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Públicas */}
            <Route path="/" element={<Landing />} />
            <Route path="/carros" element={<PesquisaCarro />} />
            <Route path="/imoveis" element={<PesquisaImovel />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registo" element={<Registo />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verificar-email/:token" element={<VerificarEmail />} /> {/* 🌟 NOVO */}
            <Route path="/anuncio/:id" element={<Anuncio />} />
            <Route path="/vendedor/:id" element={<PerfilPublico />} />
            
            {/* Protegidas por Login (Auth) */}
            <Route path="/publicar" element={<ProtectedRoute><Publicar /></ProtectedRoute>} />
            <Route path="/editar/:id" element={<ProtectedRoute><Editar /></ProtectedRoute>} />
            <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
            <Route path="/favoritos" element={<ProtectedRoute><Favoritos /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/sucesso/:id" element={<ProtectedRoute><SucessoUpsell /></ProtectedRoute>} />
            <Route path="/planos" element={<ProtectedRoute><Planos /></ProtectedRoute>} />

            {/* Protegidas por Plano Premium (Exemplo de uso) */}
            {/* <Route path="/dashboard-exclusiva" element={<PremiumRoute><DashboardPro /></PremiumRoute>} /> */}
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      {!esconderFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <AppShell />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}