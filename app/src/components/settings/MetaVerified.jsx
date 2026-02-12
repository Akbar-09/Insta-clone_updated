import { BadgeCheck, Check, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import jaadoeLogo from '../../assets/jaadoe_logo.svg';

const MetaVerified = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col w-full text-text-primary max-w-[600px] items-center text-center">

            <div className="mb-6 mt-8 relative">
                <img src={jaadoeLogo} alt="Jaadoe" className="h-16 w-auto object-contain opacity-80" />
                <div className="absolute -top-2 -right-6 text-blue-500">
                    <BadgeCheck size={32} fill="currentColor" className="text-blue-500 bg-white rounded-full" />
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Jaadoe Verified</h2>
            <p className="text-base text-text-secondary mb-8 max-w-[400px]">
                Grow your presence on Jaadoe with a Verified badge and other benefits.
            </p>

            <div className="w-full max-w-[400px] text-left">
                <div className="flex items-start gap-4 mb-6">
                    <div className="mt-1 min-w-[24px]">
                        <Check size={24} className="text-text-primary" />
                    </div>
                    <div>
                        <h3 className="font-bold text-base">A verified badge</h3>
                        <p className="text-sm text-text-secondary">Your audience can trust that you're a real person sharing your real stories.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 mb-6">
                    <div className="mt-1 min-w-[24px]">
                        <ShieldCheck className="w-6 h-6 text-text-primary" />
                    </div>
                    <div>
                        <h3 className="font-bold text-base">Increased account protection</h3>
                        <p className="text-sm text-text-secondary">Worry less about impersonation with proactive identity monitoring.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 mb-6">
                    <div className="mt-1 min-w-[24px]">
                        <Star className="w-6 h-6 text-text-primary" />
                    </div>
                    <div>
                        <h3 className="font-bold text-base">Support when you need it</h3>
                        <p className="text-sm text-text-secondary">Get answers more quickly about the things that matter to you. Support is currently available in English, French, Portuguese and Spanish.</p>
                    </div>
                </div>
            </div>

            <button
                onClick={() => navigate('/help/category/verified-badge')}
                className="w-full max-w-[400px] bg-blue-btn hover:bg-[#1877f2] text-white py-3 rounded-xl font-semibold text-base transition-colors mt-4"
            >
                Subscribe
            </button>

            <p className="text-xs text-text-secondary mt-6 max-w-[360px] text-center">
                Jaadoe Verified is not available for businesses or people younger than 18 years of age.
            </p>
        </div>
    );
};

// Helper Icon
const ShieldCheck = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
);

export default MetaVerified;
