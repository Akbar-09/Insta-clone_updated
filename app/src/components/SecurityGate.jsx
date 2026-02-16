import { useState, useEffect } from 'react';
import { Lock, ShieldCheck, KeyRound, ArrowRight } from 'lucide-react';

const SecurityGate = ({ children }) => {
    const [password, setPassword] = useState('');
    const [isGranted, setIsGranted] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const ACCESS_PASSWORD = 'jaadoe_access'; // Default password

    useEffect(() => {
        const granted = sessionStorage.getItem('jaadoe_access_granted');
        if (granted === 'true') {
            setIsGranted(true);
        }
        setLoading(false);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === ACCESS_PASSWORD) {
            sessionStorage.setItem('jaadoe_access_granted', 'true');
            setIsGranted(true);
            setError(false);
        } else {
            setError(true);
            setPassword('');
            // Shake effect or feedback
        }
    };

    if (loading) return null;

    if (isGranted) {
        return children;
    }

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-[#000] overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]" />

            <div className="w-full max-w-md p-8 relative">
                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-black/5 dark:bg-white/5 rounded-3xl flex items-center justify-center mb-6 animate-pulse">
                        <Lock className="w-10 h-10 text-text-primary" />
                    </div>

                    <h1 className="text-3xl font-bold mb-2 tracking-tight">Protected Access</h1>
                    <p className="text-text-secondary mb-8">Please enter the security password to access Jaadoe app.</p>

                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <KeyRound className={`w-5 h-5 transition-colors ${error ? 'text-red-500' : 'text-gray-400 group-focus-within:text-text-primary'}`} />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (error) setError(false);
                                }}
                                placeholder="Security Password"
                                className={`w-full bg-black/5 dark:bg-white/5 border-2 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all ${error
                                    ? 'border-red-500/50 focus:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]'
                                    : 'border-transparent focus:border-text-primary/20 focus:bg-white dark:focus:bg-[#0a0a0a]'
                                    }`}
                                autoFocus
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm font-medium animate-bounce">
                                Incorrect password. Access denied.
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-[#000] dark:bg-[#fff] text-white dark:text-black rounded-2xl py-4 font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-black/10"
                        >
                            Unlock Access
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>

                    <div className="mt-12 flex items-center gap-2 text-text-secondary/50 text-xs tracking-widest uppercase">
                        <ShieldCheck className="w-4 h-4" />
                        Secure Encrypted Channel
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecurityGate;
