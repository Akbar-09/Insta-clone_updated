import { Ban } from 'lucide-react';

const BlockedAccounts = () => {
    return (
        <div className="flex flex-col w-full text-text-primary max-w-[600px]">
            <h2 className="text-xl font-bold mb-6">Blocked Accounts</h2>

            <div className="mb-6">
                <p className="text-sm text-text-secondary mb-4">
                    You can block people anytime from their profiles.
                </p>
                <p className="text-sm text-text-secondary">
                    When you block someone, they won't be able to message you or find your profile, posts or stories on Jaadoe. They won't be notified that you blocked them.
                </p>
            </div>

            {/* Empty State / List */}
            <div className="flex flex-col items-center justify-center py-20 text-text-secondary opacity-60">
                <div className="w-16 h-16 rounded-full border-2 border-text-primary flex items-center justify-center mb-4 opacity-40">
                    <Ban size={32} />
                </div>
                <h3 className="text-lg font-bold mb-2">No blocked accounts</h3>
                <p className="text-sm">You haven't blocked anyone.</p>
            </div>
        </div>
    );
};

export default BlockedAccounts;
