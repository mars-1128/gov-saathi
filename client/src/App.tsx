import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { LocationProvider } from './context/LocationContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AIChatWidget } from './components/AIChatWidget';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryDetailPage } from './pages/CategoryDetailPage';
import { ProblemSolverPage } from './pages/ProblemSolverPage';
import { SchemesPage } from './pages/SchemesPage';
import { AppsPage } from './pages/AppsPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { AISaathiPage } from './pages/AISaathiPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { AuthPage } from './pages/AuthPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPage } from './pages/AdminPage';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isDedicatedAIChat = location.pathname === '/ai-saathi';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:slug" element={<CategoryDetailPage />} />
          <Route path="/problem-solver" element={<ProblemSolverPage />} />
          <Route path="/schemes" element={<SchemesPage />} />
          <Route path="/apps" element={<AppsPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/ai-saathi" element={<AISaathiPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Floating AI widget available on all pages except full AI Saathi page */}
      {!isDedicatedAIChat && <AIChatWidget />}

      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <LocationProvider>
          <AuthProvider>
            <Router>
              <AppLayout />
            </Router>
          </AuthProvider>
        </LocationProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
