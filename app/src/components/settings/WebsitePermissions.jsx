import { useState, useEffect } from 'react';
import { getConnectedApps, revokeAppAccess } from '../../api/settingsApi';
import { Loader2, ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WebsitePermissions = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl h-full pb-10">
            <div className="flex items-center mb-6 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 md:hidden">
                    <ArrowLeft />
                </button>
                <h2 className="text-xl font-bold">Website permissions</h2>
            </div>

            <p className="text-sm text-text-secondary mb-6">
                View apps and websites you've connected to your Instagram account.
            </p>

            <div
                onClick={() => navigate('/settings/website_permissions/apps')}
                className="flex items-center justify-between py-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 -mx-2 px-2 rounded-lg transition-colors"
            >
                <span className="text-base text-text-primary">Apps and websites</span>
                <ChevronRight size={20} className="text-text-secondary" />
            </div>
        </div>
    );
};

export default WebsitePermissions;
