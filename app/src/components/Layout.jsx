import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Suggestions from './Suggestions';
import FloatingMessages from './FloatingMessages';


const Layout = () => {
    const location = useLocation();
    const isFeed = location.pathname === '/feed' || location.pathname === '/';

    const isMessages = /^\/messages/i.test(location.pathname);
    const isReels = location.pathname.startsWith('/reels');

    return (
        <div className="flex min-h-screen">
            {/* Sidebar (Fixed position handled in Sidebar component) */}
            <Sidebar />

            {/* Main Content Area (Offset by sidebar width) */}
            <main className={`flex-grow flex h-screen overflow-hidden transition-[margin] duration-200 ease-in-out max-md:ml-0
                ${isMessages ? 'ml-[72px]' : 'ml-[245px] max-[1264px]:ml-[72px] justify-center'}
                ${isReels ? 'bg-transparent' : ''} 
            `}>
                <div className={`flex w-full h-full max-md:pt-0
                    ${isMessages || isReels ? '' : 'max-w-[1024px] justify-center'} 
                `}>
                    {isFeed ? (
                        <>
                            {/* Feed Column - CENTER SCROLLABLE */}
                            {/* This div becomes the ONLY scrollable area for the feed. */}
                            <div className="w-full max-w-[600px] flex flex-col mr-[64px] max-[1160px]:mr-0 max-[1160px]:max-w-[500px] shrink-0 h-full overflow-y-auto scrollbar-none pb-20">
                                <div className="pt-[30px]">
                                    <Outlet />
                                </div>
                            </div>

                            {/* Right Column: Suggestions (Only on Feed) - FIXED */}
                            {/* Hidden on screens < 1160px (Instagram standard breakpoint ~1160px) */}
                            <div className="hidden min-[1160px]:block w-[319px] h-full pt-[30px] pr-4">
                                <aside className="fixed top-0 h-full w-[319px] pt-[30px]"> {/* Fixed relative to viewport if needed, or just static in non-scrolling container */}
                                    {/* Actually, if the parent div doesn't scroll, static placement is fine. But user requested 'position: fixed' explicitly. */}
                                    <Suggestions />
                                </aside>
                            </div>
                        </>
                    ) : (
                        /* Full Width Content (Explore, Profile, etc) - SCROLLABLE */
                        <div className={`w-full h-full overflow-y-auto scrollbar-none ${isReels ? 'snap-y snap-mandatory pt-0' : (isMessages ? 'pt-0' : 'pt-[30px]')
                            }`}>
                            <Outlet />
                        </div>
                    )}
                </div>
            </main>

            {/* Floating Messages usually on Feed/Explore but not on Messages page itself */}
            {!isMessages && <FloatingMessages />}
        </div>
    );
};

export default Layout;
