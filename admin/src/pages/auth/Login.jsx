import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import AuthLayout from '../../layouts/AuthLayout';
import { login } from '../../api/adminApi';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await login(email, password);
            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.message || 'Login failed');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Server error. Please check if backend is running.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Admin Login"
            subtitle="Sign in to manage the platform"
        >
            <form onSubmit={handleLogin} className="space-y-5">
                {error && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium animate-shake">
                        {error}
                    </div>
                )}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all font-medium sm:text-sm"
                            placeholder="admin@jaadoe.com"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
                        <a href="#" className="text-xs font-medium text-pink-600 hover:text-pink-700">Forgot password?</a>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all font-medium sm:text-sm"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded cursor-pointer"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 cursor-pointer select-none">
                        Remember me
                    </label>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-pink-500/20 text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all transform hover:scale-[1.02] active:scale-[0.98] ${loading ? 'opacity-70 cursor-wait' : ''}`}
                    >
                        {loading ? 'Authenticating...' : 'Login'}
                    </button>
                </div>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Don't have an admin account?{' '}
                        <Link to="/signup" className="font-semibold text-pink-600 hover:text-pink-700 transition-colors">
                            Create Admin Account
                        </Link>
                    </p>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Login;
