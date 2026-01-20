import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Feed from './pages/Feed';
import ExplorePage from './pages/ExplorePage';
import Reels from './pages/Reels';
import Messages from './pages/Messages';
import Profile from './pages/profile/ProfilePage';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PostPage from './pages/PostPage';

import SettingsLayout from './pages/SettingsLayout';
import EditProfile from './components/settings/EditProfile';
import NotificationsSettings from './components/settings/NotificationsSettings';
import PrivacySettings from './components/settings/PrivacySettings';
import GenericSettings from './components/settings/GenericSettings';
import YourActivityLayout from './pages/YourActivityLayout';
import Interactions from './components/activity/Interactions';
import PhotosAndVideos from './components/activity/PhotosAndVideos';
import AccountHistory from './components/activity/AccountHistory';

// Settings Components
import ProfessionalAccount from './components/settings/ProfessionalAccount';
import CreatorTools from './components/settings/CreatorTools';
import AccountStatus from './components/settings/AccountStatus';
import MetaVerified from './components/settings/MetaVerified';
import About from './components/settings/About';
import CommentsSettings from './components/settings/CommentsSettings';
import SharingSettings from './components/settings/SharingSettings';
import RestrictedAccounts from './components/settings/RestrictedAccounts';
import HiddenWords from './components/settings/HiddenWords';
import MutedAccounts from './components/settings/MutedAccounts';
import LikeCounts from './components/settings/LikeCounts';
import CloseFriends from './components/settings/CloseFriends';
import BlockedAccounts from './components/settings/BlockedAccounts';
import StoryHighlights from './components/settings/StoryHighlights';
import MessagesReplies from './components/settings/MessagesReplies';
import TagsMentions from './components/settings/TagsMentions';
import ArchivingDownloading from './components/settings/ArchivingDownloading';
import Accessibility from './components/settings/Accessibility';
import Language from './components/settings/Language';
import WebsitePermissions from './components/settings/WebsitePermissions';
import FamilyCentre from './components/settings/FamilyCentre';
import Help from './components/settings/Help';
import PrivacyCenter from './components/settings/PrivacyCenter';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes (Wrapped in Layout) */}
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/feed" element={<Feed />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/reels" element={<Reels />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/post/:id" element={<PostPage />} />

                {/* Settings Routes */}
                <Route path="/settings" element={<SettingsLayout />}>
                  <Route index element={<Navigate to="edit-profile" replace />} />
                  <Route path="edit-profile" element={<EditProfile />} />
                  <Route path="notifications" element={<NotificationsSettings />} />
                  <Route path="professional_account" element={<ProfessionalAccount />} />
                  <Route path="creator_tools" element={<CreatorTools />} />
                  <Route path="privacy" element={<PrivacySettings />} />
                  <Route path="close_friends" element={<CloseFriends />} />
                  <Route path="blocked" element={<BlockedAccounts />} />
                  <Route path="story_highlights" element={<StoryHighlights />} />
                  <Route path="messages_replies" element={<MessagesReplies />} />
                  <Route path="tags_mentions" element={<TagsMentions />} />
                  <Route path="comments" element={<CommentsSettings />} />
                  <Route path="sharing" element={<SharingSettings />} />
                  <Route path="restricted_accounts" element={<RestrictedAccounts />} />
                  <Route path="hidden_words" element={<HiddenWords />} />
                  <Route path="muted_accounts" element={<MutedAccounts />} />
                  <Route path="like_counts" element={<LikeCounts />} />
                  <Route path="archiving" element={<ArchivingDownloading />} />
                  <Route path="accessibility" element={<Accessibility />} />
                  <Route path="language" element={<Language />} />
                  <Route path="website_permissions" element={<WebsitePermissions />} />
                  <Route path="supervision" element={<FamilyCentre />} />
                  <Route path="help" element={<Help />} />
                  <Route path="privacy_center" element={<PrivacyCenter />} />
                  <Route path="account_status" element={<AccountStatus />} />
                  <Route path="meta_verified" element={<MetaVerified />} />
                  <Route path="about" element={<About />} />
                  <Route path="*" element={<GenericSettings />} />
                </Route>

                {/* Activity Routes */}
                <Route path="/your_activity" element={<YourActivityLayout />}>
                  <Route index element={<Navigate to="interactions" replace />} />
                  <Route path="interactions" element={<Interactions />} />
                  <Route path="photos" element={<PhotosAndVideos />} />
                  <Route path="history" element={<AccountHistory />} />
                </Route>
              </Route>
            </Route>

            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
