import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute() {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) return <div className="flex bg-bg-dark text-text-primary h-screen items-center justify-center">Loading...</div>;

    if (!user) return <Navigate to="/login" replace />;

    // Redirect to onboarding if not completed and not currently on it
    // Handle undefined or false onboardingCompleted
    if (user.onboardingCompleted !== true && !location.pathname.startsWith('/onboarding') && user.createdAt) {
        return <Navigate to="/onboarding" replace />;
    }

    return <Outlet />;
}
