import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jaadoeLogo from '../../assets/jaadoe_logo.svg';
import api from '../../api/axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', message: '' });
        setIsSubmitting(true);

        try {
            const response = await api.post('auth/reset-password/request', { email });
            setStatus({ type: 'success', message: 'If an account exists with that email, you will receive a reset token.' });
            // For demo purposes, we can redirect to reset page if we got a token back
            if (response.data.token) {
                setTimeout(() => {
                    navigate('/reset-password', { state: { email, token: response.data.token } });
                }, 2000);
            }
        } catch (err) {
            setStatus({ type: 'error', message: err.response?.data?.message || 'Something went wrong. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center py-5 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-slate-900">
            <div className="glass p-8 w-full max-w-[380px] flex flex-col items-center mb-6 rounded-2xl shadow-2xl relative overflow-hidden backdrop-blur-xl border border-white/20">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>

                <img src={jaadoeLogo} alt="Jaadoe" className="w-[150px] mb-6 relative z-10" />

                <div className="w-16 h-16 rounded-full border-2 border-text-primary/20 flex items-center justify-center mb-4 relative z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>

                <h2 className="text-lg font-bold text-text-primary mb-2 relative z-10">Trouble logging in?</h2>
                <p className="text-sm text-text-secondary text-center mb-6 relative z-10">
                    Enter your email and we'll send you a token to get back into your account.
                </p>

                {status.message && (
                    <div className={`w-full text-sm mb-6 text-center font-medium p-3 rounded-lg border backdrop-blur-md ${status.type === 'success'
                        ? 'text-green-600 bg-green-100/10 border-green-500/20'
                        : 'text-red-500 bg-red-100/10 border-red-500/20'
                        }`}>
                        {status.message}
                    </div>
                )}

                <form className="flex flex-col w-full gap-4 relative z-10" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder-text-secondary/70 focus:border-white/50 focus:bg-white/20 outline-none transition-all duration-300 shadow-inner"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-2.5 font-bold text-sm transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Login Token'}
                    </button>
                </form>

                <div className="flex items-center w-full my-6 text-text-secondary text-[10px] font-bold tracking-wider opacity-60 before:h-px before:bg-white/30 before:flex-1 before:mr-4 after:h-px after:bg-white/30 after:flex-1 after:ml-4 uppercase">OR</div>

                <Link to="/signup" className="text-sm font-bold text-text-primary hover:opacity-70 transition-opacity">Create New Account</Link>

                <div className="mt-8 pt-4 border-t border-white/10 w-full text-center">
                    <Link to="/login" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">Back to Login</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
