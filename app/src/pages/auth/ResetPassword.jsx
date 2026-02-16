import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import jaadoeLogo from '../../assets/jaadoe_logo.svg';
import api from '../../api/axios';

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        token: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (location.state?.token) {
            setFormData(prev => ({ ...prev, token: location.state.token }));
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', message: '' });

        if (formData.newPassword !== formData.confirmPassword) {
            return setStatus({ type: 'error', message: 'Passwords do not match.' });
        }

        setIsSubmitting(true);

        try {
            await api.post('auth/reset-password/verify', {
                token: formData.token,
                newPassword: formData.newPassword
            });
            setStatus({ type: 'success', message: 'Password reset successful! Redirecting to login...' });
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setStatus({ type: 'error', message: err.response?.data?.message || 'Invalid token or error occurred.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center py-5 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-slate-900">
            <div className="glass p-8 w-full max-w-[380px] flex flex-col items-center mb-6 rounded-2xl shadow-2xl relative overflow-hidden backdrop-blur-xl border border-white/20">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>

                <img src={jaadoeLogo} alt="Jaadoe" className="w-[150px] mb-6 relative z-10" />

                <h2 className="text-xl font-bold text-text-primary mb-2 relative z-10">Create a New Password</h2>
                <p className="text-sm text-text-secondary text-center mb-6 relative z-10">
                    Enter the token sent to your email and your new password.
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
                        type="text"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder-text-secondary/70 focus:border-white/50 focus:bg-white/20 outline-none transition-all duration-300 shadow-inner"
                        placeholder="Security Token"
                        value={formData.token}
                        onChange={(e) => setFormData({ ...formData, token: e.target.value })}
                        required
                    />

                    <input
                        type="password"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder-text-secondary/70 focus:border-white/50 focus:bg-white/20 outline-none transition-all duration-300 shadow-inner"
                        placeholder="New Password"
                        value={formData.newPassword}
                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                        required
                    />

                    <input
                        type="password"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder-text-secondary/70 focus:border-white/50 focus:bg-white/20 outline-none transition-all duration-300 shadow-inner"
                        placeholder="Confirm New Password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-2.5 font-bold text-sm transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Resetting...' : 'Reset Password'}
                    </button>

                    <div className="mt-4 text-center">
                        <Link to="/login" className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline">Cancel and Back to Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
