import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// Dashboard
import Dashboard from './pages/dashboard';

// User Management
import UserManagement from './pages/users';
import BlockList from './pages/users/BlockList';

// Content & Stories
import ContentManagement from './pages/content';
import StoryManagement from './pages/stories';
import AvatarManagement from './pages/stories/Avatars';

// Moderation
import CommentModeration from './pages/moderation/Comments';

// Messages
import DMOversight from './pages/messages';

// Explore
import ExploreControl from './pages/explore';

// Systems
import RoleManagement from './pages/roles';
import AuditLogs from './pages/logs';

// Reports
import Reports from './pages/reports';
import UserReportList from './pages/reports/UserReports';
import PostReportList from './pages/reports/PostReports';
import ReelReportList from './pages/reports/ReelReports';

// Analytics
import Analytics from './pages/analytics';
import CountryWiseUsers from './pages/analytics/CountryWiseUsers';

// Interactions & Trends
import HashtagManagement from './pages/hashtags';

// Settings & Config
import Settings from './pages/settings';
import LanguageManagement from './pages/settings/Languages';
import NotificationManagement from './pages/notifications';
import CMSPages from './pages/cms';

import { ThemeProvider } from './context/ThemeContext';

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    <Route path="/" element={<Layout />}>
                        <Route index element={<Navigate to="/login" replace />} />
                        <Route path="dashboard" element={<Dashboard />} />

                        {/* User Management */}
                        <Route path="users" element={<UserManagement />} />
                        <Route path="users/blocklist" element={<BlockList />} />

                        {/* Content Management (Standard List) */}
                        <Route path="content/posts" element={<ContentManagement initialTab="posts" />} />
                        <Route path="content/reels" element={<ContentManagement initialTab="reels" />} />
                        <Route path="stories" element={<StoryManagement />} />
                        <Route path="avatars" element={<AvatarManagement />} />

                        {/* Reports & Moderation */}
                        <Route path="reports" element={<Reports />} />
                        <Route path="reports/users" element={<UserReportList />} />
                        <Route path="reports/posts" element={<PostReportList />} />
                        <Route path="reports/reels" element={<ReelReportList />} />

                        {/* Analytics */}
                        <Route path="analytics" element={<Analytics />} />
                        <Route path="analytics/geo" element={<CountryWiseUsers />} />

                        {/* Trends */}
                        <Route path="hashtags" element={<HashtagManagement />} />

                        {/* Communications */}
                        <Route path="notifications" element={<NotificationManagement />} />

                        {/* Settings & CMS */}
                        <Route path="cms" element={<CMSPages />} />
                        <Route path="languages" element={<LanguageManagement />} />
                        <Route path="settings" element={<Settings />} />

                        {/* Moderation */}
                        <Route path="moderation/comments" element={<CommentModeration />} />

                        {/* Communications */}
                        <Route path="messages" element={<DMOversight />} />

                        {/* Discovery */}
                        <Route path="explore" element={<ExploreControl />} />

                        {/* System */}
                        <Route path="roles" element={<RoleManagement />} />
                        <Route path="logs" element={<AuditLogs />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
