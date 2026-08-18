/**
 * App.jsx — Root router.
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import OnboardingScreen from './components/onboarding/OnboardingScreen';
import RightsMap from './components/rights-map/RightsMap';
import StoryScreen from './components/story-engine/StoryScreen';
import Leaderboard from './components/leaderboard/Leaderboard';
import CommunityWall from './components/community/CommunityWall';
import ResourceDirectory from './components/resources/ResourceDirectory';
import LandingPage from './components/landing/LandingPage';
import AdvocateDashboard from './components/advocate/AdvocateDashboard';
import CompletionCertificate from './components/certificate/CompletionCertificate';
import TeacherToolkit from './components/teachers/TeacherToolkit';
import ImpactDashboard from './components/impact/ImpactDashboard';
import { Analytics } from '@vercel/analytics/react';

function RootRedirect() {
  const { state } = useApp();
  return state.currentUser?.nickname ? <Navigate to="/map" replace /> : <Navigate to="/landing" replace />;
}

function Protected({ children }) {
  const { state } = useApp();
  return state.currentUser?.nickname ? children : <Navigate to="/onboarding" replace />;
}

export default function App() {
  const { state } = useApp();
  const isDyslexia = state.settings?.dyslexiaMode;

  return (
    <div className={isDyslexia ? 'dyslexia-mode' : ''}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/showcase" element={<LandingPage />} />
          <Route path="/onboarding" element={<OnboardingScreen />} />
          <Route path="/map" element={<Protected><RightsMap /></Protected>} />
          <Route path="/story/:storyId" element={<Protected><StoryScreen /></Protected>} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/community/:storyId" element={<CommunityWall />} />
          <Route path="/qa" element={<CommunityWall />} />
          <Route path="/resources" element={<ResourceDirectory />} />
          <Route path="/certificate" element={<Protected><CompletionCertificate /></Protected>} />
          <Route path="/advocate-login" element={<AdvocateDashboard />} />
          <Route path="/advocate-portal" element={<AdvocateDashboard />} />
          <Route path="/teachers" element={<TeacherToolkit />} />
          <Route path="/impact" element={<ImpactDashboard />} />
          <Route path="/stats" element={<ImpactDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </div>
  );
}

