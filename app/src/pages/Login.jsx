import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import jaadoeLogo from '../assets/jaadoe_logo.svg';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

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
        <div className="min-h-screen flex flex-col justify-center items-center py-5">
            <div className="bg-primary border border-border p-10 w-full max-w-[350px] flex flex-col items-center mb-2.5 max-[450px]:border-none max-[450px]:bg-transparent max-[450px]:p-5">
                <img src={jaadoeLogo} alt="Jaadoe" className="w-[175px] mb-8" />

                {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

                <form className="flex flex-col w-full gap-2" onSubmit={handleLogin}>
                    <input
                        type="text"
                        className="bg-secondary border border-border rounded-[3px] px-2 py-[9px] text-sm w-full focus:border-text-secondary outline-none"
                        placeholder="Phone number, username, or email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="bg-secondary border border-border rounded-[3px] px-2 py-[9px] text-sm w-full focus:border-text-secondary outline-none"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`bg-blue-btn text-white rounded p-1.5 font-semibold text-sm mt-4 transition-colors hover:bg-blue-btn-hover w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Logging in...' : 'Log in'}
                    </button>
                </form>

                <div className="flex items-center w-full my-5 text-text-secondary text-[13px] font-semibold before:h-px before:bg-border before:flex-1 before:mr-4 after:h-px after:bg-border after:flex-1 after:ml-4">OR</div>

                {/* Placeholder for "Log in with Facebook" if needed later */}
                <div className="text-[#385185] font-semibold text-sm cursor-pointer">
                    Log in with Facebook
                </div>
            </div>

            <div className="bg-primary border border-border p-5 w-full max-w-[350px] text-center text-sm max-[450px]:border-none max-[450px]:bg-transparent max-[450px]:p-5">
                Don't have an account? <Link to="/signup" className="text-blue-btn font-semibold ml-1 no-underline">Sign up</Link>
            </div>
        </div>
    );
};

export default Login;
