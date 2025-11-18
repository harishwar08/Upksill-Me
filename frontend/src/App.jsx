import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import DashboardPage from './pages/DashboardPage';
import BrowsePage from './pages/BrowsePage';
import MessagesPage from './pages/MessagesPage';
import LeaderboardPage from './pages/LeaderboardPage';
import RequestsPage from './pages/RequestsPage';
import CreateRequestPage from './pages/CreateRequestPage';
import MatchesPage from './pages/MatchesPage';
import MatchDetailPage from './pages/MatchDetailPage';
import ResourcesPage from './pages/ResourcesPage';
import AchievementsPage from './pages/AchievementsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import OnboardingStep1 from './pages/OnboardingStep1';
import OnboardingStep2 from './pages/OnboardingStep2';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/onboarding" element={<OnboardingStep1 />} />

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* All Routes - No Authentication Required for now */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/connections" element={<MessagesPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/create-request" element={<CreateRequestPage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/matches/:id" element={<MatchDetailPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
