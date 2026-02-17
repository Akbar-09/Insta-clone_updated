import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Feed from './pages/Feed';
import ExplorePage from './pages/ExplorePage';
import SuggestedPeoplePage from './pages/SuggestedPeoplePage';
import Reels from './pages/Reels';
import Messages from './pages/Messages';
import Profile from './pages/profile/ProfilePage';
import Layout from './components/Layout';
import ProfessionalDashboard from './components/professional/ProfessionalDashboard';
import PostPage from './pages/PostPage';
import ArchivePage from './pages/profile/ArchivePage';
import LiveViewerPage from './pages/LiveViewerPage';
import NotificationsPage from './pages/NotificationsPage';


import SettingsLayout from './pages/SettingsLayout';
import EditProfile from './components/settings/EditProfile';
import NotificationsSettings from './components/settings/NotificationsSettings';
import PushNotifications from './components/settings/notifications/PushNotifications';
import EmailNotifications from './components/settings/notifications/EmailNotifications';
import PrivacySettings from './components/settings/PrivacySettings';
import GenericSettings from './components/settings/GenericSettings';
import YourActivityLayout from './pages/YourActivityLayout';
import Interactions from './components/activity/Interactions';
import PhotosAndVideos from './components/activity/PhotosAndVideos';
import AccountHistory from './components/activity/AccountHistory';

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
import StoryAndLiveSettings from './components/settings/StoryAndLiveSettings';
import HideStoryFrom from './components/settings/HideStoryFrom';
import MessagesReplies from './components/settings/MessagesReplies';
import MessageControls from './components/settings/MessageControls';
import StoryReplies from './components/settings/StoryReplies';
import ActivityStatus from './components/settings/ActivityStatus';
import TagsMentions from './components/settings/TagsMentions';
import ContentPreferences from './components/settings/ContentPreferences';
import SensitiveContentControl from './components/settings/SensitiveContentControl';
import Subscriptions from './components/settings/Subscriptions';
import ArchivingDownloading from './components/settings/ArchivingDownloading';
import Accessibility from './components/settings/Accessibility';
import Language from './components/settings/Language';
import WebsitePermissions from './components/settings/WebsitePermissions';
import AppsWebsites from './components/settings/AppsWebsites';
import HelpCentre from './components/settings/HelpCentre';
import RemovedContent from './components/settings/RemovedContent';
import FeatureLimits from './components/settings/FeatureLimits';
import SupportRequests from './components/settings/SupportRequests';
import Help from './components/settings/Help';
import HelpFeedback from './components/settings/HelpFeedback';
import PrivacySecurityHelp from './components/settings/PrivacySecurityHelp';
import PrivacyCenter from './components/settings/PrivacyCenter';
import ManuallyApproveTags from './components/settings/ManuallyApproveTags';
import HideCustomWords from './components/settings/HideCustomWords';
import SupportRequestDetail from './components/settings/SupportRequestDetail';

import HelpLayout from './pages/help/HelpLayout';
import HelpHome from './pages/help/HelpHome';
import CategoryPage from './pages/help/CategoryPage';
import ArticleView from './pages/help/ArticleView';
import SearchResults from './pages/help/SearchResults';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { PrivacyProvider } from './context/PrivacyContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';
import SecurityGate from './components/SecurityGate';

function App() {
  return (
    <SecurityGate>
      <AuthProvider>
        <PrivacyProvider>
          <LanguageProvider>
            <ThemeProvider>
              <ToastProvider>
                <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />

                    {/* Protected Routes */}
                    <Route path="/help" element={<HelpLayout />}>
                      <Route index element={<HelpHome />} />
                      <Route path="category/:slug" element={<CategoryPage />} />
                      <Route path="article/:slug" element={<ArticleView />} />
                      <Route path="search" element={<SearchResults />} />
                    </Route>

                    <Route element={<ProtectedRoute />}>
                      <Route path="/live/:id" element={<LiveViewerPage />} />
                      <Route element={<Layout />}>
                        <Route path="/feed" element={<Feed />} />
                        <Route path="/explore" element={<ExplorePage />} />
                        <Route path="/explore/people" element={<SuggestedPeoplePage />} />
                        <Route path="/reels" element={<Reels />} />
                        <Route path="/reels/:reelId" element={<Reels />} />
                        <Route path="/notifications" element={<NotificationsPage />} />
                        <Route path="/messages" element={<Messages />} />

                        <Route path="/messages/:conversationId" element={<Messages />} />
                        <Route path="/profile/:id" element={<Profile />} />
                        <Route path="/profile/:id/saved" element={<Profile section="saved" />} />
                        <Route path="/profile/:id/reels" element={<Profile section="reels" />} />
                        <Route path="/profile/:id/tagged" element={<Profile section="tagged" />} />
                        <Route path="/dashboard" element={<ProfessionalDashboard />} />
                        <Route path="/post/:id" element={<PostPage />} />
                        <Route path="/archive/stories" element={<ArchivePage />} />

                        {/* Settings Routes */}
                        <Route path="/settings" element={<SettingsLayout />}>
                          <Route index element={<Navigate to="edit-profile" replace />} />
                          <Route path="edit-profile" element={<EditProfile />} />
                          <Route path="notifications" element={<NotificationsSettings />} />
                          <Route path="notifications/push" element={<PushNotifications />} />
                          <Route path="notifications/email" element={<EmailNotifications />} />
                          <Route path="professional_account" element={<ProfessionalAccount />} />
                          <Route path="creator_tools" element={<CreatorTools />} />
                          <Route path="privacy" element={<PrivacySettings />} />
                          <Route path="close_friends" element={<CloseFriends />} />
                          <Route path="blocked" element={<BlockedAccounts />} />
                          <Route path="story_highlights" element={<StoryAndLiveSettings />} />
                          <Route path="story_and_live" element={<StoryAndLiveSettings />} />
                          <Route path="story_highlights/hide_from" element={<HideStoryFrom />} />
                          <Route path="story_and_live/hide_from" element={<HideStoryFrom />} />
                          <Route path="messages_replies" element={<MessagesReplies />} />
                          <Route path="messages_replies/controls" element={<MessageControls />} />
                          <Route path="messages_replies/story_replies" element={<StoryReplies />} />
                          <Route path="messages_replies/activity_status" element={<ActivityStatus />} />
                          <Route path="tags_mentions" element={<TagsMentions />} />
                          <Route path="manually_approve_tags" element={<ManuallyApproveTags />} />
                          <Route path="comments" element={<CommentsSettings />} />
                          <Route path="sharing" element={<SharingSettings />} />
                          <Route path="sharing_and_reuse" element={<SharingSettings />} />
                          <Route path="restricted_accounts" element={<RestrictedAccounts />} />
                          <Route path="hidden_words" element={<HiddenWords />} />
                          <Route path="hidden_words/custom" element={<HideCustomWords />} />
                          <Route path="muted_accounts" element={<MutedAccounts />} />
                          <Route path="content_preferences" element={<ContentPreferences />} />
                          <Route path="content_preferences/sensitive" element={<SensitiveContentControl />} />
                          <Route path="like_counts" element={<LikeCounts />} />
                          <Route path="subscriptions" element={<Subscriptions />} />
                          <Route path="archiving" element={<ArchivingDownloading />} />
                          <Route path="accessibility" element={<Accessibility />} />
                          <Route path="language" element={<Language />} />
                          <Route path="website_permissions" element={<WebsitePermissions />} />
                          <Route path="website_permissions/apps" element={<AppsWebsites />} />
                          <Route path="help" element={<Help />} />
                          <Route path="help/help_centre" element={<HelpCentre />} />
                          <Route path="help/feedback" element={<HelpFeedback />} />
                          <Route path="help/privacy_help" element={<PrivacySecurityHelp />} />
                          <Route path="help/support_requests" element={<SupportRequests />} />
                          <Route path="help/support_requests/:category" element={<SupportRequestDetail />} />
                          <Route path="privacy_center" element={<PrivacyCenter />} />
                          <Route path="account_status" element={<AccountStatus />} />
                          <Route path="account_status/removed_content" element={<RemovedContent />} />
                          <Route path="account_status/feature_limits" element={<FeatureLimits />} />
                          <Route path="meta_verified" element={<MetaVerified />} />
                          <Route path="about" element={<About />} />
                          <Route path="*" element={<GenericSettings />} />
                        </Route>

                        {/* Activity Routes */}
                        <Route path="/your_activity" element={<YourActivityLayout />}>
                          <Route index element={<Navigate to="interactions" replace />} />
                          <Route path="interactions" element={<Interactions />} />
                          <Route path="photos_and_videos" element={<PhotosAndVideos />} />
                          <Route path="account_history" element={<AccountHistory />} />
                        </Route>
                      </Route>
                    </Route>

                    <Route path="/" element={<Navigate to="/login" replace />} />
                  </Routes>
                </BrowserRouter>
              </ToastProvider>
            </ThemeProvider>
          </LanguageProvider>
        </PrivacyProvider>
      </AuthProvider>
    </SecurityGate>
  );
}

export default App;
