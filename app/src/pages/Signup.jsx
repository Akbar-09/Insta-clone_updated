import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import jaadoeLogo from '../assets/jaadoe_logo.svg';

const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: '',
        fullname: '',
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const result = await signup(formData);
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
            <div className="glass p-10 w-full max-w-[400px] flex flex-col items-center mb-6 rounded-2xl shadow-2xl relative overflow-hidden">
                {/* Subtle sheen effect */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>

                <img src={jaadoeLogo} alt="Jaadoe" className="w-[180px] mb-4 relative z-10 drop-shadow-sm transition-transform hover:scale-105 duration-500" />
                <div className="text-text-secondary font-bold text-[16px] text-center mb-8 relative z-10 opacity-80 leading-snug">
                    Sign up to see photos and videos from your friends.
                </div>

                {error && <div className="text-red-500 text-sm mb-6 text-center font-medium bg-red-100/10 py-2 px-4 rounded-lg border border-red-500/20 backdrop-blur-md">{error}</div>}

                <form className="flex flex-col w-full gap-3 relative z-10" onSubmit={handleSignup}>
                    <input
                        type="text"
                        name="email"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder-text-secondary/70 focus:border-white/50 focus:bg-white/20 outline-none transition-all duration-300 shadow-inner backdrop-blur-md"
                        placeholder="Mobile Number or Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="fullname"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder-text-secondary/70 focus:border-white/50 focus:bg-white/20 outline-none transition-all duration-300 shadow-inner backdrop-blur-md"
                        placeholder="Full Name"
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="username"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder-text-secondary/70 focus:border-white/50 focus:bg-white/20 outline-none transition-all duration-300 shadow-inner backdrop-blur-md"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder-text-secondary/70 focus:border-white/50 focus:bg-white/20 outline-none transition-all duration-300 shadow-inner backdrop-blur-md"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <div className="text-xs text-text-secondary/70 text-center my-4 px-2 leading-relaxed">
                        People who use our service may have uploaded your contact information to Jaadoe. <Link to="/help" className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 hover:underline">Learn More</Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl py-3.5 font-bold text-sm tracking-wide shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform active:scale-[0.98] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Signing up...' : 'Sign up'}
                    </button>

                    <div className="text-xs text-text-secondary/70 text-center mt-4 leading-relaxed px-4">
                        By signing up, you agree to our <span className="font-semibold cursor-pointer hover:text-text-primary">Terms</span>, <span className="font-semibold cursor-pointer hover:text-text-primary">Privacy Policy</span> and <span className="font-semibold cursor-pointer hover:text-text-primary">Cookies Policy</span>.
                    </div>
                </form>
            </div>

            {/* Login Link Glass Card */}
            <div className="glass p-5 w-full max-w-[400px] text-center text-sm rounded-xl shadow-lg relative z-10 transition-transform hover:-translate-y-1 duration-300">
                <span className="text-text-secondary">Have an account?</span>
                <Link to="/login" className="text-blue-600 dark:text-blue-400 font-bold ml-1.5 hover:text-blue-500 transition-colors">Log in</Link>
            </div>
        </div>
    );
};

export default Signup;
