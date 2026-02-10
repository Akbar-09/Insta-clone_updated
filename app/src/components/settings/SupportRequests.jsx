import { useState, useEffect } from 'react';
import { getSupportRequests } from '../../api/settingsApi';
import { Loader2, ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SupportRequests = () => {
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await getSupportRequests();
                if (res.data.status === 'success') {
                    setRequests(res.data.data);
                }
            } catch (err) {
                console.error('Failed to fetch support requests', err);
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

    const getCount = (cat) => requests.filter(r => r.category === cat).length;

    const sections = [
        {
            label: 'Reports',
            description: "These are reports you've submitted.",
            category: 'report'
        },
        {
            label: 'Safety Notices',
            description: 'Find resources to help you recover from a difficult experience.',
            category: 'safety'
        },
        {
            label: 'Violations',
            description: "These are posts you've shared that go against our guidelines.",
            category: 'violation'
        },
        {
            label: 'Monetization Support',
            description: "These are monetization support tickets you've submitted.",
            category: 'monetisation'
        },
    ];

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-text-secondary" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl mx-auto h-full pb-10">
            <div className="flex items-center mb-10 mt-1">
                <button onClick={() => navigate(-1)} className="mr-0 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <div className="flex-1 flex justify-center mr-6">
                    <h2 className="text-base font-bold">Help</h2>
                </div>
            </div>

            <div className="flex flex-col">
                {sections.map((section, index) => (
                    <div key={section.label}>
                        <div
                            onClick={() => navigate(`/settings/help/support_requests/${section.category}`)}
                            className="flex items-center justify-between py-[18px] cursor-pointer group"
                        >
                            <div className="flex flex-col">
                                <span className="text-[15px] font-bold text-text-primary mb-1">{section.label}</span>
                                <p className="text-[13px] text-text-secondary leading-normal">
                                    {section.description}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-[#0095f6]" />
                                    <span className="text-[14px] text-[#8e8e8e]">{getCount(section.category)}</span>
                                </div>
                                <ChevronRight size={18} className="text-[#8e8e8e] group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                        {index < sections.length - 1 && <div className="h-px bg-border my-1" />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SupportRequests;
