import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard2026 } from './pages/Dashboard2026';
import { MobileEntry } from './pages/MobileEntry';
import { DocumentExtract } from './pages/DocumentExtract';
import { Consultation } from './pages/Consultation';
import { ElderlyManagement } from './pages/ElderlyManagement';
import { AlertsCenter } from './pages/AlertsCenter';
import { SettingsPage } from './pages/SettingsPage';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { FirstRunSetupPage } from './pages/FirstRunSetupPage';
import { AiAssistantPage } from './pages/AiAssistantPage';
import { SystemStatusProvider } from './hooks/useSystemStatus';
import { AuthSessionProvider } from './hooks/useAuthSession';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import './styles/index.css';
import './styles/design-system.css';

function AppShell() {
  return (
    <SystemStatusProvider>
      <Layout>
        <Outlet />
      </Layout>
    </SystemStatusProvider>
  );
}

function App() {
  return (
    <AuthSessionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/onboarding"
            element={(
              <ProtectedRoute>
                <OnboardingPage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/setup"
            element={(
              <ProtectedRoute>
                <FirstRunSetupPage />
              </ProtectedRoute>
            )}
          />
          <Route
            element={(
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            )}
          >
            <Route path="/dashboard" element={<Dashboard2026 />} />
            <Route path="/mobile-entry" element={<MobileEntry />} />
            <Route path="/documents" element={<DocumentExtract />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/elderly" element={<ElderlyManagement />} />
            <Route path="/alerts" element={<AlertsCenter />} />
            <Route path="/assistant" element={<AiAssistantPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthSessionProvider>
  );
}

export default App;
