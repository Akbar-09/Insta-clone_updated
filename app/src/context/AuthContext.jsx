import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
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
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
