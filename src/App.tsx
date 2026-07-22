import { Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppProvider';
import { RequireOnboarding } from './components/layout/RequireOnboarding';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { LogEntryPage } from './pages/LogEntryPage';
import { SchoolsPage } from './pages/SchoolsPage';
import { RoadmapPage } from './pages/RoadmapPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/onboarding" replace />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route
        path="/dashboard"
        element={
          <RequireOnboarding>
            <DashboardPage />
          </RequireOnboarding>
        }
      />
      <Route
        path="/log"
        element={
          <RequireOnboarding>
            <LogEntryPage />
          </RequireOnboarding>
        }
      />
      <Route
        path="/schools"
        element={
          <RequireOnboarding>
            <SchoolsPage />
          </RequireOnboarding>
        }
      />
      <Route
        path="/roadmap"
        element={
          <RequireOnboarding>
            <RoadmapPage />
          </RequireOnboarding>
        }
      />
      <Route path="*" element={<Navigate to="/onboarding" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
