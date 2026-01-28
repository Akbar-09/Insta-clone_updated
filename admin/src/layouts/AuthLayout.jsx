import React from 'react';
import { Instagram } from 'lucide-react';

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden animate-fade-in border border-gray-100">
                <div className="p-8">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 to-pink-500 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-pink-500/20 transform rotate-[-5deg] hover:rotate-0 transition-transform duration-300">
                            <Instagram className="text-white w-9 h-9" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">Jaadoe Admin</h1>
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
