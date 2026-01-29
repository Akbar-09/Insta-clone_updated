Based on the codebase analysis, here is a detailed overview of the Jaadoe Admin Panel frontend:

🏗️ Architecture & Tech Stack
Framework: React 19 + Vite (for fast development and building)
Routing: react-router-dom v7 (Client-side routing)
Styling: Tailwind CSS (Utility-first styling, responsive design, dark mode support) + lucide-react (Icons)
State Management: React Context API (ThemeContext, AuthContext)
🧩 Core Structure
The application is wrapped in a main 
Layout.jsx
 component that ensures a consistent interface across all pages.

Sidebar (
src/components/Sidebar.jsx
):
Fixed on the left (width 64px/256px).
Contains navigation groups: Overview, User Management, Content, Moderation, Discovery, Analytics, System.
Displays the Jaadoe logo (recently updated).
Highlighted active states with gradient backgrounds.
Navbar (
src/components/Navbar.jsx
):
Fixed at the top.
Likely contains global actions like Search, Theme Toggle, Notifications, and User Profile.
Main Content Area:
Renders dynamic page content via <Outlet />.
centered with a max-w-7xl container for optimal readability on large screens.
📱 Key Modules & Pages
1. Authentication (/src/pages/auth/)
Login: Dedicated entry point with email/password authentication.
Signup: Admin registration page.
Layout: Uses 
AuthLayout
 with a split-screen or centered card design.
2. Dashboard (/src/pages/dashboard/)
The landing hub (once logged in).
Typically displays high-level metrics (User count, Active sessions, Recent reports).
3. User Management (/src/pages/users/)
User List: Table view to browse, search, and manage registered users.
Block List: Management of banned/restricted accounts.
4. Content & Media
Posts & Reels (/src/pages/content/): Moderation feeds for user-generated content.
Stories (/src/pages/stories/): View and manage 24h stories.
Avatars: Management of user avatar assets (likely for the placeholder system).
5. Moderation & Safety
Reports Center (/src/pages/reports/): Central hub for flagged content (Users, Posts, Reels).
Comments: specialized view for harmonizing comment sections.
DM Oversight (/src/pages/messages/): Tooling to review flagged private messages (Privacy-sensitive).
6. Discovery & Trends
Hashtags (/src/pages/hashtags/): Manage trending tags.
Explore Control (/src/pages/explore/): Configure what appears on the global Explore page.
7. Analytics (/src/pages/analytics/)
Performance: System health and engagement graphs.
Geo Growth: likely a map or list view of user growth by country (CountryWiseUsers).
8. System & Configurations
Settings: General platform settings.
CMS & Pages: Content Management for static pages (Terms, Privacy, etc.).
Notifications: Global push notification manager.
Roles & Permissions: Access control for different admin levels.
Audit Logs: Security trail of admin actions.
🎨 UI/UX Characteristics
Glassmorphism: The design uses backdrop-blur and semi-transparent backgrounds (bg-white/80) for a modern, premium feel.
Gradients: Uses from-pink-500 to-violet-600 consistently, aligning with the Jaadoe/Instagram aesthetic.
Responsiveness: Built with mobile-first classes, though primarily optimized for Desktop/Tablet administration contexts.
Dark Mode: Native support via dark: classes and a Toggle wrapper.