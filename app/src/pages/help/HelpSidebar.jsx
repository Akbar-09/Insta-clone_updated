import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, LayoutGrid, Lock, User, Shield, EyeOff, FileText, HelpCircle } from 'lucide-react';
import api from '../../api/axios';

const HelpSidebar = () => {
    const [categories, setCategories] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState({});
    const location = useLocation();

    // Icon mapping
    const iconMap = {
        'LayoutGrid': LayoutGrid,
        'Lock': Lock,
        'User': User,
        'Shield': Shield,
        'EyeOff': EyeOff,
        'FileText': FileText,
        'default': HelpCircle
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/help/categories');
                if (response.data.status === 'success') {
                    setCategories(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching help categories:', error);
            }
        };

        fetchCategories();
    }, []);

    // Auto-expand category based on URL
    useEffect(() => {
        if (categories.length > 0) {
            const path = location.pathname;
            // Extract slug from /help/category/:slug
            const categoryMatch = path.match(/\/help\/category\/([^\/]+)/);

            if (categoryMatch) {
                const slug = categoryMatch[1];
                const parentCategory = categories.find(cat =>
                    cat.Subcategories && cat.Subcategories.some(sub => sub.slug === slug)
                );

                if (parentCategory) {
                    setExpandedCategories(prev => ({
                        ...prev,
                        [parentCategory.id]: true
                    }));
                }
            }
        }
    }, [categories, location.pathname]);

    const toggleCategory = (categoryId) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

    const getIcon = (iconName) => {
        const IconComponent = iconMap[iconName] || iconMap['default'];
        return <IconComponent size={20} className="mr-3" />;
    };

    return (
        <div className="w-[300px] hidden md:flex flex-col border-r border-[#dbdbdb] dark:border-[#363636] h-[calc(100vh-60px)] overflow-y-auto bg-white dark:bg-black pt-4 pb-10">
            <h2 className="px-6 mb-4 text-xl font-bold text-text-primary">Help Centre</h2>
            <div className="flex flex-col">
                {categories.map(category => {
                    const hasSubcategories = category.Subcategories && category.Subcategories.length > 0;

                    return (
                        <div key={category.id} className="mb-1">
                            {hasSubcategories ? (
                                <div
                                    className="flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                                    onClick={() => toggleCategory(category.id)}
                                >
                                    <div className="flex items-center text-text-primary font-semibold text-[15px]">
                                        {getIcon(category.icon)}
                                        {category.name}
                                    </div>
                                    {expandedCategories[category.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                </div>
                            ) : (
                                <NavLink
                                    to={`/help/category/${category.slug}`}
                                    className={({ isActive }) =>
                                        `flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${isActive ? 'bg-black/5 dark:bg-white/5 text-[#0095f6]' : 'text-text-primary'}`
                                    }
                                >
                                    <div className="flex items-center font-semibold text-[15px]">
                                        {getIcon(category.icon)}
                                        {category.name}
                                    </div>
                                </NavLink>
                            )}

                            {/* Subcategories */}
                            {hasSubcategories && expandedCategories[category.id] && (
                                <div className="flex flex-col bg-[#fafafa] dark:bg-[#121212]">
                                    {category.Subcategories.map(sub => (
                                        <NavLink
                                            key={sub.id}
                                            to={`/help/category/${sub.slug}`}
                                            className={({ isActive }) =>
                                                `pl-14 pr-6 py-2.5 text-[14px] text-text-secondary hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors block border-l-2 ${isActive ? 'border-text-primary font-medium text-text-primary bg-black/5 dark:bg-white/5' : 'border-transparent'}`
                                            }
                                        >
                                            {sub.name}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HelpSidebar;
