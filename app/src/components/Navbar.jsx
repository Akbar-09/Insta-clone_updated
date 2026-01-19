import { Link, useLocation } from 'react-router-dom';
import { Home, PlusSquare, User } from 'lucide-react';


const Navbar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed bottom-0 left-0 right-0 h-[50px] bg-primary border-t border-border flex justify-around items-center z-50 md:hidden">
            Jaadoe

            <div className="flex justify-around w-full items-center">
                <Link to="/feed">
                    <Home
                        size={24}
                        className="text-text-primary"
                        fill={isActive('/feed') ? 'currentColor' : 'none'}
                        strokeWidth={isActive('/feed') ? 3 : 2}
                    />
                </Link>

                <Link to="/upload">
                    <PlusSquare
                        size={24}
                        className="text-text-primary"
                        fill={isActive('/upload') ? 'currentColor' : 'none'}
                        strokeWidth={isActive('/upload') ? 3 : 2}
                    />
                </Link>

                <Link to="/profile/me">
                    {/* Using an icon for now, could be an image */}
                    <User
                        size={24}
                        className="text-text-primary"
                        fill={isActive('/profile/me') ? 'currentColor' : 'none'}
                        strokeWidth={isActive('/profile/me') ? 3 : 2}
                    />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
