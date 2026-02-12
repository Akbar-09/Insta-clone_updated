import { useNavigate, Link } from 'react-router-dom';
import { Search, Globe } from 'lucide-react';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="h-16 border-b border-border bg-white sticky top-0 z-40">
            <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between px-4 md:px-10">
                <Link to="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold tracking-tight">Jaadoe</span>
                    <span className="text-xl text-text-secondary">Help Centre</span>
                </Link>

                <div className="hidden md:flex flex-1 max-w-[480px] mx-10 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-text-secondary" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search help articles..."
                        className="w-full bg-[#efefef] border-transparent focus:bg-white focus:ring-1 focus:ring-border rounded-lg py-2 pl-10 pr-4 text-[14px] outline-none transition-all"
                    />
                </div>

                <div className="flex items-center gap-6 text-[14px] font-semibold">
                    <div className="hidden lg:flex items-center gap-1 text-text-secondary cursor-pointer">
                        <Globe size={18} />
                        <span>English</span>
                    </div>
                    <a href="https://jaadoe.com/privacy" className="text-text-secondary hover:underline">Privacy</a>
                    <a href="https://jaadoe.com/terms" className="text-text-secondary hover:underline">Terms</a>
                </div>
            </div>
        </header>
    );
};

export default Header;
