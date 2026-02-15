import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import jaadoeLogo from '../assets/jaadoe_logo.svg';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const { t } = useLanguage();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const result = await login(email, password);
            if (result.success) {
                navigate('/feed');
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center py-5 px-4">
            {/* Main Glass Card */}
            <div className="glass p-8 w-full max-w-[350px] flex flex-col items-center mb-6 rounded-2xl shadow-2xl relative overflow-hidden">
                {/* Subtle sheen effect */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>

                <img src={jaadoeLogo} alt="Jaadoe" className="w-[150px] mb-8 relative z-10 drop-shadow-sm transition-transform hover:scale-105 duration-500" />

                {error && <div className="text-red-500 text-sm mb-6 text-center font-medium bg-red-100/10 py-2 px-4 rounded-lg border border-red-500/20 backdrop-blur-md">{error}</div>}

                <form className="flex flex-col w-full gap-4 relative z-10" onSubmit={handleLogin}>
                    <div className="relative group">
                        <input
                            type="text"
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder-text-secondary/70 focus:border-white/50 focus:bg-white/20 outline-none transition-all duration-300 shadow-inner backdrop-blur-md"
                            placeholder={t('Phone number, username, or email')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="relative group">
                        <input
                            type="password"
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder-text-secondary/70 focus:border-white/50 focus:bg-white/20 outline-none transition-all duration-300 shadow-inner backdrop-blur-md"
                            placeholder={t('Password')}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`mt-4 w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl py-3.5 font-bold text-sm tracking-wide shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform active:scale-[0.98] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? t('Logging in...') : t('Log in')}
                    </button>

                    <div className="flex items-center w-full my-6 text-text-secondary text-[12px] font-bold tracking-wider opacity-60 before:h-px before:bg-white/30 before:flex-1 before:mr-4 after:h-px after:bg-white/30 after:flex-1 after:ml-4">{t('OR')}</div>

                    <div className="text-indigo-900 dark:text-indigo-300 font-semibold text-sm cursor-pointer hover:text-indigo-700 dark:hover:text-white transition-colors flex items-center justify-center gap-2">
                        <span>{t('Log in with Facebook')}</span>
                    </div>
                </form>

                <div className="mt-8 text-xs text-text-secondary/80">
                    <span className="cursor-pointer hover:underline">{t('Forgot password?')}</span>
                </div>
            </div>

            {/* Signup Link Glass Card */}
            <div className="glass p-5 w-full max-w-[400px] text-center text-sm rounded-xl shadow-lg relative z-10 transition-transform hover:-translate-y-1 duration-300">
                <span className="text-text-secondary">{t("Don't have an account?")}</span>
                <Link to="/signup" className="text-blue-600 dark:text-blue-400 font-bold ml-1.5 hover:text-blue-500 transition-colors">{t('Sign up')}</Link>
            </div>
        </div>
    );
};

export default Login;
