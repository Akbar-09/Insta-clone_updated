
import { Outlet, Link } from 'react-router-dom';
import jaadoeLogo from '../../assets/jaadoe_logo.svg';
import HelpSidebar from './HelpSidebar';

const HelpLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-black text-text-primary">
            {/* Top Navigation Bar */}
            <div className="w-full h-[60px] border-b border-[#dbdbdb] dark:border-[#363636] flex items-center justify-between px-6 sticky top-0 bg-white dark:bg-black z-50">
                <div className="flex items-center">
                    <Link to="/help" className="flex items-center gap-3">
                        <img src={jaadoeLogo} alt="Jaadoe" className="h-8 w-auto" />
                        <div className="h-6 w-[1px] bg-gray-300 dark:bg-gray-700 mx-1"></div>
                        <span className="text-xl font-semibold tracking-tight">Help Centre</span>
                    </Link>
                </div>

                {/* Right side actions - e.g. Language selector or Back to Jaadoe */}
                <div className="flex items-center gap-4">
                    <Link to="/" className="text-sm font-semibold hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                        Back to Jaadoe
                    </Link>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 max-w-[1200px] mx-auto w-full">
                {/* Left Sidebar */}
                <HelpSidebar />

                {/* Center Content */}
                <div className="flex-1 min-w-0 p-8 md:p-12 overflow-y-auto h-[calc(100vh-60px)]">
                    <Outlet />
                </div>
            </div>

            {/* Footer could go here */}
        </div>
    );
};

export default HelpLayout;
