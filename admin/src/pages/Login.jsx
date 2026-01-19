import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Instagram } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);

        // Mock Auth
        setTimeout(() => {
            setLoading(false);
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden relative">
            {/* Background Animated Blobs */}
            <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

            <div className="w-full max-w-md p-8 glass-card rounded-2xl shadow-2xl z-10 animate-fade-in mx-4">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 to-pink-600 rounded-xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-pink-500/30">
                        <Instagram className="text-white w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Admin Portal</h2>
                    <p className="text-gray-300">Enter your credentials to access the dashboard</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl leading-5 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:bg-white/10 focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all"
                                placeholder="admin@instagram.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl leading-5 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:bg-white/10 focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all transform hover:scale-[1.02] active:scale-[0.98] ${loading ? 'opacity-70 cursor-wait' : ''}`}
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Authenticating...
                            </span>
                        ) : 'Sign In to Dashboard'}
                    </button>
                </form>

                <div className="mt-8 text-center text-xs text-gray-400">
                    <p>&copy; 2026 Social Media Inc. Admin Only.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
