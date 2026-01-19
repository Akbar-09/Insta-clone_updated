import { Monitor } from 'lucide-react';

const WebsitePermissions = () => {
    return (
        <div className="flex flex-col w-full text-text-primary max-w-[600px]">
            <h2 className="text-xl font-bold mb-6">Website permissions</h2>

            <div className="mb-8">
                <div className="flex justify-between items-center py-4 border-b border-border cursor-pointer">
                    <div>
                        <div className="text-base font-medium">Apps and websites</div>
                        <div className="text-sm text-text-secondary">View and manage apps and websites you've connected to your Jaadoe account.</div>
                    </div>
                    <div className="w-4 h-4 text-text-secondary rotate-[-90deg]">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

            {/* Empty State visual if needed, or just the main entry point as per IG */}
        </div>
    );
};

export default WebsitePermissions;
