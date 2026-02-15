import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { helpApi } from '../api/helpApi';
import { ChevronDown, ChevronRight } from 'lucide-react';

const Sidebar = () => {
    const [categories, setCategories] = useState([]);
    const [expandedIds, setExpandedIds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCats = async () => {
            try {
                const res = await helpApi.getCategories();
                if (res.data.status === 'success') {
                    setCategories(res.data.data);
                }
            } catch (err) {
                console.error('Failed to load categories', err);
            }
        };
        fetchCats();
    }, []);

    const toggleExpand = (id) => {
        setExpandedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <nav className="flex flex-col gap-1 pr-4">
            {categories.map(cat => (
                <div key={cat.id} className="mb-2">
                    <button
                        onClick={() => toggleExpand(cat.id)}
                        className={`w-full flex items-center justify-between text-left py-2 px-3 rounded-lg transition-colors ${expandedIds.includes(cat.id) ? 'bg-[#efefef] font-bold' : 'hover:bg-[#efefef] font-semibold text-[15px]'}`}
                    >
                        <span>{cat.name}</span>
                        {expandedIds.includes(cat.id) ? <ChevronDown size={18} /> : <ChevronRight size={18} className="text-text-secondary" />}
                    </button>

                    {expandedIds.includes(cat.id) && cat.Subcategories && (
                        <div className="ml-4 mt-1 flex flex-col border-l border-border pl-2">
                            {cat.Subcategories.map(sub => (
                                <button
                                    key={sub.id}
                                    onClick={() => navigate(`/category/${sub.slug}`)}
                                    className="text-left py-1.5 px-3 text-[14px] text-text-secondary hover:text-text-primary hover:font-medium transition-all"
                                >
                                    {sub.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </nav>
    );
};

export default Sidebar;
