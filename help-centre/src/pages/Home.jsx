import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { helpApi } from '../api/helpApi';
import { LayoutGrid, Lock, User, Shield, EyeOff, FileText, ChevronRight } from 'lucide-react';

const ICON_MAP = {
    LayoutGrid, Lock, User, Shield, EyeOff, FileText
};

const Home = () => {
    const [featured, setFeatured] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [featRes, catRes] = await Promise.all([
                    helpApi.getFeaturedArticles(),
                    helpApi.getCategories()
                ]);
                setFeatured(featRes.data.data);
                setCategories(catRes.data.data);
            } catch (err) {
                console.error('Data loading error', err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="flex flex-col gap-12">
            {/* Hero Section */}
            <section className="help-gradient rounded-3xl p-10 md:p-16 flex flex-col items-center text-center shadow-sm">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">How can we help?</h1>
                <p className="text-text-secondary max-w-[600px] mb-8">
                    Browse categories below or search to find answers about our features, safety, and policies.
                </p>
            </section>

            {/* Featured Topics Grid */}
            <section>
                <h2 className="text-xl font-bold mb-6">Popular Topics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map(cat => {
                        const Icon = ICON_MAP[cat.icon] || LayoutGrid;
                        return (
                            <div
                                key={cat.id}
                                onClick={() => navigate(`/category/${cat.slug}`)}
                                className="group p-6 bg-white border border-border rounded-xl hover:shadow-md hover:border-[#0095f6] transition-all cursor-pointer flex flex-col gap-4"
                            >
                                <div className="w-12 h-12 bg-[#efefef] rounded-lg flex items-center justify-center group-hover:bg-[#0095f6] group-hover:text-white transition-colors">
                                    <Icon size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[17px] mb-1">{cat.name}</h3>
                                    <p className="text-[13px] text-text-secondary">Learn more about {cat.name.toLowerCase()}.</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Featured Articles List */}
            <section>
                <h2 className="text-xl font-bold mb-6">Trending Articles</h2>
                <div className="flex flex-col border border-border rounded-xl overflow-hidden bg-white">
                    {featured.map((article, idx) => (
                        <div
                            key={article.id}
                            onClick={() => navigate(`/article/${article.slug}`)}
                            className={`p-4 flex items-center justify-between hover:bg-[#fafafa] cursor-pointer transition-colors ${idx !== featured.length - 1 ? 'border-b border-border' : ''}`}
                        >
                            <span className="font-medium text-[15px]">{article.title}</span>
                            <ChevronRight size={18} className="text-text-secondary" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Promo CTA Cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0095f6] text-white p-8 rounded-2xl flex flex-col items-start gap-4">
                    <h3 className="text-xl font-bold">Jaadoe for Business</h3>
                    <p className="opacity-90">Scale your brand with our professional tools and insights.</p>
                    <button className="bg-white text-[#0095f6] px-5 py-2 rounded-lg font-bold text-[14px]">Get Started</button>
                </div>
                <div className="bg-black text-white p-8 rounded-2xl flex flex-col items-start gap-4">
                    <h3 className="text-xl font-bold">Advertise on Jaadoe</h3>
                    <p className="opacity-90">Reach millions of potential customers with targeted ads.</p>
                    <button className="bg-white text-black px-5 py-2 rounded-lg font-bold text-[14px]">Create Ad</button>
                </div>
            </section>
        </div>
    );
};

export default Home;
