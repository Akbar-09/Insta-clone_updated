import jaadoeLogo from '../../assets/jaadoe_logo.svg';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl mx-auto pb-10">
            <div className="flex items-center mb-8 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold">About</h2>
            </div>

            <div className="flex flex-col gap-1">
                {['Data Policy', 'Terms of Use'].map(item => (
                    <div
                        key={item}
                        onClick={() => {
                            if (item === 'Data Policy') window.open('/help/category/data-policy', '_blank');
                            else if (item === 'Terms of Use') window.open('/help/category/terms-of-use', '_blank');
                        }}
                        className="py-4 border-b border-border cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 -mx-4 px-4 flex justify-between items-center transition-colors"
                    >
                        <span className="text-base font-medium">{item}</span>
                        <div className="w-4 h-4 text-text-secondary rotate-[-90deg]">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 flex flex-col items-center opacity-60">
                <img src={jaadoeLogo} alt="Jaadoe" className="h-10 w-auto mb-2 opacity-80 filter grayscale" />
                <div className="text-xs font-semibold text-text-secondary">Jaadoe for Web</div>
                <div className="text-[10px] text-text-secondary mt-1">Version 124.0.0.18.473</div>
                <div className="text-[10px] text-text-secondary mt-4">© 2026 Jaadoe from Jaadoe</div>
            </div>
        </div>
    );
};

export default About;
