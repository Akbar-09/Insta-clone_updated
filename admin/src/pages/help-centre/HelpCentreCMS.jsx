import { useState, useEffect } from 'react';
import { Plus, Edit, Trash, HelpCircle, FileText, X, Save, ChevronDown, ChevronRight } from 'lucide-react';
import axios from 'axios';

const ADMIN_HELP_API = '/api/v1/help/admin';
const PUBLIC_HELP_API = '/api/v1/help';

const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
};
function CategoryList({ categories, onEdit, onDelete }) {
    if (categories.length === 0) return <div className="p-8 text-center text-gray-500">No categories found.</div>;
    return (
        <div className="flex flex-col">
            {categories.map((category) => (
                <CategoryItem key={category.id} category={category} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
}

function CategoryItem({ category, onEdit, onDelete, depth = 0 }) {
    const [expanded, setExpanded] = useState(false);
    const hasChildren = category.Subcategories && category.Subcategories.length > 0;

    return (
        <div className="flex flex-col">
            <div className={`p-4 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center justify-between group transition-colors border-l-4 ${depth === 0 ? 'border-pink-500 bg-pink-50/10' : 'border-transparent pl-8'}`}>
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer" onClick={() => setExpanded(!expanded)}>
                        {hasChildren && (expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
                    </div>
                    <div className="w-10 h-10 bg-pink-100 dark:bg-pink-500/10 rounded-lg flex items-center justify-center text-pink-500">
                        <HelpCircle size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 dark:text-white">{category.name}</h3>
                        <p className="text-xs text-gray-500">/{category.slug}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(category)} className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-lg text-blue-500 transition-shadow shadow-sm">
                        <Edit size={16} />
                    </button>
                    <button onClick={() => onDelete(category.id)} className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-lg text-red-500 transition-shadow shadow-sm">
                        <Trash size={16} />
                    </button>
                </div>
            </div>
            {hasChildren && expanded && (
                <div className="flex flex-col">
                    {category.Subcategories.map(sub => (
                        <CategoryItem key={sub.id} category={sub} onEdit={onEdit} onDelete={onDelete} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}

function ArticleList({ articles, onEdit, onDelete }) {
    if (articles.length === 0) return <div className="p-8 text-center text-gray-500">No articles found.</div>;

    return (
        <div className="flex flex-col">
            {articles.map((article) => (
                <div key={article.id} className="p-4 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center justify-between group transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500">
                            <FileText size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 dark:text-white">{article.title}</h3>
                            <p className="text-xs text-gray-500">/{article.slug} • {article.Category?.name || 'Uncategorized'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${article.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                            {article.status}
                        </span>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => onEdit(article)} className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-lg text-blue-500 transition-shadow shadow-sm">
                                <Edit size={16} />
                            </button>
                            <button onClick={() => onDelete(article.id)} className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-lg text-red-500 transition-shadow shadow-sm">
                                <Trash size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function CategoryForm({ mode, item, categories, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        name: item?.name || '',
        slug: item?.slug || '',
        icon: item?.icon || '',
        parentId: item?.parentId || '',
        description: item?.description || ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (mode === 'create') {
                await axios.post(`${ADMIN_HELP_API}/category`, formData, { headers: getAuthHeaders() });
            } else {
                await axios.put(`${ADMIN_HELP_API}/category/${item.id}`, formData, { headers: getAuthHeaders() });
            }
            onSuccess();
        } catch (error) {
            console.error('Error saving category:', error);
            alert('Failed to save category');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category Name</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Slug</label>
                <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Parent Category</label>
                <select
                    value={formData.parentId}
                    onChange={(e) => setFormData({ ...formData, parentId: e.target.value || null })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                >
                    <option value="">None (Top Level)</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {'-'.repeat(cat.depth)} {cat.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                    rows="3"
                />
            </div>
            <div className="flex justify-end pt-4">
                <button type="button" onClick={onClose} className="mr-3 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center">
                    <Save size={16} className="mr-2" /> Save
                </button>
            </div>
        </form>
    );
}

function ArticleForm({ mode, item, categories, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        title: item?.title || '',
        slug: item?.slug || '',
        categoryId: item?.categoryId || '',
        content: item?.content || '',
        status: item?.status || 'published',
        isFeatured: item?.isFeatured || false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (mode === 'create') {
                await axios.post(`${ADMIN_HELP_API}/article`, formData, { headers: getAuthHeaders() });
            } else {
                await axios.put(`${ADMIN_HELP_API}/article/${item.id}`, formData, { headers: getAuthHeaders() });
            }
            onSuccess();
        } catch (error) {
            console.error('Error saving article:', error);
            alert('Failed to save article');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Slug</label>
                    <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                        required
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {'-'.repeat(cat.depth)} {cat.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content (HTML allowed)</label>
                <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-gray-50 dark:bg-gray-800 dark:border-gray-700 font-mono text-sm"
                    rows="10"
                    required
                />
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">Featured Article</label>
                </div>
                <div>
                    <label className="mr-2 text-sm text-gray-700 dark:text-gray-300">Status:</label>
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="rounded-md border-gray-300 shadow-sm p-1 border bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm"
                    >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-end pt-4">
                <button type="button" onClick={onClose} className="mr-3 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center">
                    <Save size={16} className="mr-2" /> Save
                </button>
            </div>
        </form>
    );
}

function HelpCentreCMS() {
    const [categories, setCategories] = useState([]);
    const [articles, setArticles] = useState([]);
    const [activeTab, setActiveTab] = useState('categories'); // 'categories' | 'articles'
    const [loading, setLoading] = useState(false);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
    const [editingItem, setEditingItem] = useState(null);

    // Filter Logic for displaying flat categories in dropdowns
    const [flatCategories, setFlatCategories] = useState([]);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'categories') {
                const res = await axios.get(`${PUBLIC_HELP_API}/categories`);
                if (res.data.status === 'success') {
                    setCategories(res.data.data);
                    flattenCategories(res.data.data);
                }
            } else {
                const res = await axios.get(`${ADMIN_HELP_API}/articles?limit=100`, { headers: getAuthHeaders() });
                if (res.data.status === 'success') {
                    setArticles(res.data.data);
                    // Also need categories for dropdowns if not loaded
                    if (categories.length === 0) {
                        const catRes = await axios.get(`${PUBLIC_HELP_API}/categories`);
                        if (catRes.data.status === 'success') {
                            setCategories(catRes.data.data);
                            flattenCategories(catRes.data.data);
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const flattenCategories = (cats) => {
        let flat = [];
        const traverse = (items, depth = 0) => {
            items.forEach(cat => {
                flat.push({ ...cat, depth });
                if (cat.Subcategories) traverse(cat.Subcategories, depth + 1);
            });
        };
        traverse(cats);
        setFlatCategories(flat);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            await axios.delete(`${ADMIN_HELP_API}/${activeTab === 'categories' ? 'category' : 'article'}/${id}`, { headers: getAuthHeaders() });
            fetchData();
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Failed to delete item');
        }
    };

    const openModal = (mode, item = null) => {
        setModalMode(mode);
        setEditingItem(item);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Help Centre CMS</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage categories, subcategories, and help articles</p>
                </div>
                <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl">
                    <button
                        onClick={() => setActiveTab('categories')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'categories' ? 'bg-white dark:bg-gray-700 shadow-sm text-pink-500' : 'text-gray-500'}`}
                    >
                        Categories
                    </button>
                    <button
                        onClick={() => setActiveTab('articles')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'articles' ? 'bg-white dark:bg-gray-700 shadow-sm text-pink-500' : 'text-gray-500'}`}
                    >
                        Articles
                    </button>
                </div>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden min-h-[500px]">
                <div className="p-6 border-b border-border flex justify-between items-center">
                    <h2 className="font-bold text-lg text-gray-800 dark:text-white">{activeTab === 'categories' ? 'Help Categories' : 'Help Articles'}</h2>
                    <button
                        onClick={() => openModal('create')}
                        className="bg-gradient-to-r from-pink-500 to-violet-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold shadow-lg shadow-pink-500/20 hover:opacity-90 transition-opacity"
                    >
                        <Plus size={18} /> Add {activeTab === 'categories' ? 'Category' : 'Article'}
                    </button>
                </div>

                <div className="divide-y divide-border">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Loading...</div>
                    ) : activeTab === 'categories' ? (
                        <CategoryList categories={categories} onEdit={(item) => openModal('edit', item)} onDelete={handleDelete} />
                    ) : (
                        <ArticleList articles={articles} onEdit={(item) => openModal('edit', item)} onDelete={handleDelete} />
                    )}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center sticky top-0 bg-white dark:bg-[#1e1e1e] z-10">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                                {modalMode === 'create' ? 'Add New' : 'Edit'} {activeTab === 'categories' ? 'Category' : 'Article'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-800 dark:hover:text-white">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6">
                            {activeTab === 'categories' ? (
                                <CategoryForm
                                    mode={modalMode}
                                    item={editingItem}
                                    categories={flatCategories}
                                    onClose={() => setIsModalOpen(false)}
                                    onSuccess={() => { setIsModalOpen(false); fetchData(); }}
                                />
                            ) : (
                                <ArticleForm
                                    mode={modalMode}
                                    item={editingItem}
                                    categories={flatCategories}
                                    onClose={() => setIsModalOpen(false)}
                                    onSuccess={() => { setIsModalOpen(false); fetchData(); }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HelpCentreCMS;
