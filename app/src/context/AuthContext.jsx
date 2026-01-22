import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const storedToken = localStorage.getItem('token');
                if (storedToken) {
                    setToken(storedToken);
                    // Using /auth/me to get current user details
                    const { data } = await api.get('/auth/me');
                    if (data.status === 'success') {
                        setUser(data.data);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch user", err);
                logout();
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await api.post('/auth/login', { email, password });
            if (data.status === 'success') {
                localStorage.setItem('token', data.data.token);
                setToken(data.data.token);
                setUser(data.data.user);
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
            const { data } = await api.post('/auth/signup', userData);
            if (data.status === 'success') {
                localStorage.setItem('token', data.data.token);
                setToken(data.data.token);
                setUser(data.data.user);
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

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    const updateUser = (updates) => {
        setUser(prev => ({ ...prev, ...updates }));
    };

    return (
        <AuthContext.Provider value={{ user, token, login, signup, logout, loading, updateUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
