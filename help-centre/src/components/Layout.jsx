import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-1 max-w-[1400px] mx-auto w-full px-4 md:px-10 gap-10">
                <aside className="hidden md:block w-[300px] shrink-0 pt-10 sticky top-[64px] h-[calc(100vh-64px)] overflow-y-auto scrollbar-hide">
                    <Sidebar />
                </aside>
                <main className="flex-1 pt-10 pb-20 overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
