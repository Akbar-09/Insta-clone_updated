import jaadoeLogo from '../assets/jaadoe_logo.svg';

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden animate-fade-in border border-gray-100">
                <div className="p-8">
                    <div className="text-center mb-10">
                        <div className="mx-auto flex items-center justify-center mb-6 transform hover:scale-105 transition-transform duration-300">
                            <img src={jaadoeLogo} alt="Jaadoe Logo" className="h-16 w-auto" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
                        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
                    </div>

                    {children}
                </div>
            </div>

            <div className="fixed bottom-6 text-xs text-gray-400 font-medium">
                &copy; 2026 Social Media Inc. Admin Portal
            </div>
        </div>
    );
};

export default AuthLayout;
