import { useState, useEffect } from 'react';
import { getRestrictedAccounts, unrestrictUser } from '../../api/settingsApi';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RestrictedAccounts = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getRestrictedAccounts()
            .then(res => setUsers(res.data.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const handleUnrestrict = async (id) => {
        const old = [...users];
        setUsers(prev => prev.filter(u => u.userId !== id));
        try {
            await unrestrictUser(id);
        } catch (err) {
            console.error(err);
            setUsers(old);
        }
    };

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl h-full pb-10">
            <div className="flex items-center mb-6 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 md:hidden">
                    <ArrowLeft />
                </button>
                <h2 className="text-xl font-bold">Restricted accounts</h2>
            </div>

            <p className="text-sm text-text-secondary mb-6">
                Protect yourself from unwanted interactions without blocking people. You can restrict someone to hide their comments and messages.
            </p>

            {users.length === 0 ? (
                <div className="text-center text-text-secondary py-10 font-medium">
                    You haven't restricted anyone.
                </div>
            ) : (
                <div className="flex flex-col space-y-4">
                    {users.map(user => (
                        <div key={user.userId} className="flex items-center justify-between">
                            <div className="flex items-center">
                                <img
                                    src={user.profilePicture || '/default-avatar.png'}
                                    alt={user.username}
                                    className="w-10 h-10 rounded-full object-cover mr-3"
                                />
                                <div className="font-semibold text-sm">{user.username}</div>
                            </div>
                            <button
                                onClick={() => handleUnrestrict(user.userId)}
                                className="bg-[#efefef] dark:bg-[#363636] px-4 py-1.5 rounded-lg text-sm font-semibold hover:opacity-80 transition-opacity"
                            >
                                Unrestrict
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RestrictedAccounts;
