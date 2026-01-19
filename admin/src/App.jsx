import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import ContentManagement from './pages/ContentManagement';
import Reports from './pages/Reports';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import StoryManagement from './pages/StoryManagement';
import HashtagManagement from './pages/HashtagManagement';
import LanguageManagement from './pages/LanguageManagement';
import NotificationManagement from './pages/NotificationManagement';
import CMSPages from './pages/CMSPages';
import BlockList from './pages/BlockList';
import AvatarManagement from './pages/AvatarManagement';
import UserReportList from './pages/UserReportList';
import PostReportList from './pages/PostReportList';
import ReelReportList from './pages/ReelReportList';
import CountryWiseUsers from './pages/CountryWiseUsers';
import { ThemeProvider } from './context/ThemeContext';

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    <Route path="/" element={<Layout />}>
                        <Route index element={<Navigate to="/dashboard" replace />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="users" element={<UserManagement />} />
                        <Route path="country-wise-users" element={<CountryWiseUsers />} />
                        <Route path="posts" element={<ContentManagement initialTab="posts" />} />
                        <Route path="reels" element={<ContentManagement initialTab="reels" />} />
                        <Route path="stories" element={<StoryManagement />} />
                        <Route path="reports" element={<Reports />} />
                        <Route path="user-reports" element={<UserReportList />} />
                        <Route path="post-reports" element={<PostReportList />} />
                        <Route path="reel-reports" element={<ReelReportList />} />
                        <Route path="analytics" element={<Analytics />} />
                        <Route path="hashtags" element={<HashtagManagement />} />
                        <Route path="languages" element={<LanguageManagement />} />
                        <Route path="notifications" element={<NotificationManagement />} />
                        <Route path="cms" element={<CMSPages />} />
                        <Route path="blocklist" element={<BlockList />} />
                        <Route path="avatars" element={<AvatarManagement />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
