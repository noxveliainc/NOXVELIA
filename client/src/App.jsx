import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import { HelmetProvider } from 'react-helmet-async'; 

// --- COMPONENTES ---
import ProtectedRoute from './components/ProtectedRoute';
import NavbarCarro from './components/carros/NavbarCarro';
import NavbarImovel from './components/imoveis/NavbarImovel';
import PageTransition from './components/PageTransition'; 
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import LoadingScreen from './components/LoadingScreen';

// --- PÁGINAS (lazy) ---
const Landing        = lazy(() => import('./pages/shared/Landing'));
const Login          = lazy(() => import('./pages/shared/Login'));
const Registo        = lazy(() => import('./pages/shared/Registo'));
const ForgotPassword = lazy(() => import('./pages/shared/ForgotPassword'));
const ResetPassword  = lazy(() => import('./pages/auth/ResetPassword'));
const VerificarEmail = lazy(() => import('./pages/shared/VerificarEmail'));

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
const PremiumConfirmar = lazy(() => import('./pages/shared/PremiumConfirmar'));
const SeoPesquisa    = lazy(() => import('./pages/shared/SeoPesquisa'));
const Profissionais  = lazy(() => import('./pages/shared/Profissionais'));
const Patrocinios    = lazy(() => import('./pages/shared/Patrocinios'));

// 🌟 NOVA PÁGINA IMPORTADA
const PoliticaPrivacidade = lazy(() => import('./pages/shared/PoliticaPrivacidade'));
const SobreNos = lazy(() => import('./pages/shared/SobreNos'));

function LoadingFallback() {
  return (
    <LoadingScreen label="A preparar a NOXVELIA" detail="A carregar a experiência." minHeight="60vh" />
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
            <Route path="/carros/marca/:marca" element={<SeoPesquisa tipo="carro" />} />
            <Route path="/carros/marca/:marca/:modelo" element={<SeoPesquisa tipo="carro" />} />
            <Route path="/carros/em/:cidade" element={<SeoPesquisa tipo="carro" />} />
            <Route path="/imoveis/:tipologia/em/:cidade" element={<SeoPesquisa tipo="imovel" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registo" element={<Registo />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verificar-email/:token" element={<VerificarEmail />} />
            <Route path="/anuncio/:id" element={<Anuncio />} />
            <Route path="/carros/:marca/:modelo/:cidade/:id" element={<Anuncio />} />
            <Route path="/imoveis/:categoria/:cidade/:id" element={<Anuncio />} />
            <Route path="/vendedor/:id" element={<PerfilPublico />} />
            <Route path="/profissionais" element={<Profissionais />} />
            <Route path="/patrocinios" element={<Patrocinios />} />
            
            {/* 🌟 ROTA DA POLÍTICA E TERMOS */}
            <Route path="/privacidade" element={<PoliticaPrivacidade />} />
            <Route path="/sobre-nos" element={<SobreNos />} />
            
            {/* Protegidas por Login (Auth) */}
            <Route path="/publicar" element={<ProtectedRoute><Publicar /></ProtectedRoute>} />
            <Route path="/editar/:id" element={<ProtectedRoute><Editar /></ProtectedRoute>} />
            <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
            <Route path="/favoritos" element={<ProtectedRoute><Favoritos /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/sucesso/:id" element={<ProtectedRoute><SucessoUpsell /></ProtectedRoute>} />
            <Route path="/planos" element={<Planos />} />
            <Route path="/premium-confirmar" element={<ProtectedRoute><PremiumConfirmar /></ProtectedRoute>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      {!esconderFooter && <Footer />}
      <CookieBanner />
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

