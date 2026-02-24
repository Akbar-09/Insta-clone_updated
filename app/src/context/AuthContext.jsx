import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { registerServiceWorker, requestNotificationPermission } from '../utils/pushNotifications';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const [sessions, setSessions] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('sessions')) || [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        const initPush = async () => {
            await registerServiceWorker();
        };
        initPush();
    }, []);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const storedToken = localStorage.getItem('token');
                if (storedToken) {
                    setToken(storedToken);
                    // Using /auth/me to get current user details
                    const { data } = await api.get('auth/me');
                    if (data.status === 'success') {
                        const userData = data.data;

                        // Fetch additional profile data from user-service
                        try {
                            const profileRes = await api.get(`/users/${userData.username}`);
                            if (profileRes.data.status === 'success') {
                                // Merge data and ensure 'avatar' is set for the sidebar
                                userData.avatar = profileRes.data.data.profilePicture;
                                userData.fullName = profileRes.data.data.fullName;
                            }
                        } catch (profileErr) {
                            console.error("Failed to fetch profile supplemental data", profileErr);
                        }

                        setUser(userData);
                        // Request notification permission if not already granted
                        requestNotificationPermission();
                    }
                }
            } catch (err) {
                console.error("Failed to fetch user", err);
                // Only clear session on explicit 401 (invalid/expired token).
                // Network errors (503, 500) should NOT log the user out.
                if (err.response?.status === 401) {
                    logout();
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, []);


    // Listen for storage changes from other tabs
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'token') {
                if (e.newValue) {
                    setToken(e.newValue);
                    // Refresh user data based on new token
                    api.get('auth/me').then(({ data }) => {
                        if (data.status === 'success') {
                            setUser(data.data);
                        }
                    }).catch(() => logout());
                } else {
                    // Logic for logout in other tab
                    setUser(null);
                    setToken(null);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);


    const login = async (email, password) => {
        try {
            const { data } = await api.post('auth/login', { email, password });
            if (data.status === 'success') {
                localStorage.setItem('token', data.data.token);
                setToken(data.data.token);

                const userData = data.data.user;

                // Fetch additional profile data from user-service
                try {
                    const profileRes = await api.get(`/users/${userData.username}`);
                    if (profileRes.data.status === 'success') {
                        userData.avatar = profileRes.data.data.profilePicture;
                        userData.fullName = profileRes.data.data.fullName;
                    }
                } catch (profileErr) {
                    console.error("Failed to fetch profile on login", profileErr);
                }

                setUser(userData);

                // Request notification permission
                requestNotificationPermission();

                // Add to sessions list
                setSessions(prev => {
                    const exists = prev.find(s => s.userId === userData.id);
                    if (exists) {
                        // Update token/info
                        const updated = prev.map(s => s.userId === userData.id ? { ...s, token: data.data.token, ...userData } : s);
                        localStorage.setItem('sessions', JSON.stringify(updated));
                        return updated;
                    }
                    const newSessions = [...prev, { ...userData, userId: userData.id, token: data.data.token }];
                    localStorage.setItem('sessions', JSON.stringify(newSessions));
                    return newSessions;
                });


                return { success: true };
            }
            return { success: false, message: 'Invalid response format' };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const signup = async (userData) => {
        try {
            const { data } = await api.post('auth/signup', userData);
            if (data.status === 'success') {
                localStorage.setItem('token', data.data.token);
                setToken(data.data.token);

                const userData = data.data.user;

                // Fetch profile (may be empty but consistent)
                try {
                    const profileRes = await api.get(`/users/${userData.username}`);
                    if (profileRes.data.status === 'success') {
                        userData.avatar = profileRes.data.data.profilePicture;
                    }
                } catch (e) { }

                setUser(userData);
                return { success: true };
            }

            return { success: false, message: 'Invalid response format' };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Signup failed'
            };
        }
    };

    const logout = async () => {
        try {
            // Include deviceId if we had one
            await api.post('auth/logout');
        } catch (error) {
            console.error("Logout API failed", error);
        } finally {
            // Remove current session from list
            const currentSessions = sessions.filter(s => s.userId !== (user?.id || user?.userId));
            setSessions(currentSessions);
            localStorage.setItem('sessions', JSON.stringify(currentSessions));

            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
        }
    };

    const switchAccount = (userId) => {
        const session = sessions.find(s => s.userId === userId);
        if (session) {
            localStorage.setItem('token', session.token);
            setToken(session.token);
            setUser(session);
            window.location.reload(); // Reload to refresh all state cleanly
        }
    };

    const updateUser = (updates) => {
        setUser(prev => ({ ...prev, ...updates }));
    };

    return (
        <AuthContext.Provider value={{ user, token, sessions, login, signup, logout, switchAccount, loading, updateUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
