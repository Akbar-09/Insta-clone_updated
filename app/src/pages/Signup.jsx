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
        <div className="min-h-screen flex flex-col justify-center items-center py-5">
            <div className="bg-primary border border-border p-10 w-full max-w-[350px] flex flex-col items-center mb-2.5 max-[450px]:border-none max-[450px]:bg-transparent max-[450px]:p-5">
                <img src={jaadoeLogo} alt="Jaadoe" className="w-[175px] mb-8" />
                <div className="text-text-secondary font-semibold text-[17px] text-center mb-5">
                    Sign up to see photos and videos from your friends.
                </div>

                {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

                <form className="flex flex-col w-full gap-2" onSubmit={handleSignup}>
                    <input
                        type="text"
                        name="email"
                        className="bg-secondary border border-border rounded-[3px] px-2 py-[9px] text-sm w-full focus:border-text-secondary outline-none"
                        placeholder="Mobile Number or Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="fullname"
                        className="bg-secondary border border-border rounded-[3px] px-2 py-[9px] text-sm w-full focus:border-text-secondary outline-none"
                        placeholder="Full Name"
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="username"
                        className="bg-secondary border border-border rounded-[3px] px-2 py-[9px] text-sm w-full focus:border-text-secondary outline-none"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        className="bg-secondary border border-border rounded-[3px] px-2 py-[9px] text-sm w-full focus:border-text-secondary outline-none"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <div className="text-xs text-text-secondary text-center my-4">
                        People who use our service may have uploaded your contact information to Jaadoe.
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`bg-blue-btn text-white rounded p-1.5 font-semibold text-sm mt-4 transition-colors hover:bg-blue-btn-hover w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Signing up...' : 'Sign up'}
                    </button>
                </form>
            </div>

            <div className="bg-primary border border-border p-5 w-full max-w-[350px] text-center text-sm max-[450px]:border-none max-[450px]:bg-transparent max-[450px]:p-5">
                Have an account? <Link to="/login" className="text-blue-btn font-semibold ml-1 no-underline">Log in</Link>
            </div>
        </div>
    );
};

export default Signup;
