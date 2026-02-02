import React, { useState } from 'react';
import { FileText, Save, Eye } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'quill/dist/quill.snow.css';

const CMSPages = () => {
    const [selectedPage, setSelectedPage] = useState('about');
    const [pages, setPages] = useState({
        about: {
            title: 'About Us',
            content: '<h2>About Snapta</h2><p>Snapta is a leading social media platform connecting millions of users worldwide...</p>',
            lastUpdated: '2 days ago'
        },
        privacy: {
            title: 'Privacy Policy',
            content: '<h2>Privacy Policy</h2><p>Your privacy is important to us. This policy outlines how we collect and use your data...</p>',
            lastUpdated: '1 week ago'
        },
        terms: {
            title: 'Terms & Conditions',
            content: '<h2>Terms of Service</h2><p>By using Snapta, you agree to the following terms and conditions...</p>',
            lastUpdated: '1 week ago'
        },
        help: {
            title: 'Help & Support',
            content: '<h2>Help Center</h2><p>Find answers to common questions and get support for your account...</p>',
            lastUpdated: '3 days ago'
        }
    });

    const [currentContent, setCurrentContent] = useState(pages[selectedPage].content);

    const handlePageChange = (pageKey) => {
        setSelectedPage(pageKey);
        setCurrentContent(pages[pageKey].content);
    };

    const handleSave = () => {
        setPages({
            ...pages,
            [selectedPage]: {
                ...pages[selectedPage],
                content: currentContent,
                lastUpdated: 'Just now'
            }
        });
        alert('Page saved successfully!');
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image'],
            ['clean']
        ],
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">CMS Pages</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage content pages and policies</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Page Selector */}
                <div className="space-y-2">
                    {Object.entries(pages).map(([key, page]) => (
                        <button
                            key={key}
                            onClick={() => handlePageChange(key)}
                            className={`w-full p-4 rounded-xl text-left transition-all ${selectedPage === key
                                ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-lg shadow-pink-500/20'
                                : 'glass-card hover:bg-gray-50 dark:hover:bg-white/5'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <FileText size={20} />
                                <div className="flex-1">
                                    <p className={`font-semibold text-sm ${selectedPage === key ? 'text-white' : 'text-gray-800 dark:text-white'}`}>
                                        {page.title}
                                    </p>
                                    <p className={`text-xs ${selectedPage === key ? 'text-white/80' : 'text-gray-500'}`}>
                                        Updated {page.lastUpdated}
                                    </p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Editor */}
                <div className="lg:col-span-3 glass-card p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                            {pages[selectedPage].title}
                        </h2>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors flex items-center gap-2 text-sm font-medium">
                                <Eye size={16} />
                                Preview
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 text-white hover:from-pink-600 hover:to-violet-700 shadow-lg shadow-pink-500/20 transition-all flex items-center gap-2 text-sm font-medium"
                            >
                                <Save size={16} />
                                Save Changes
                            </button>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                        <ReactQuill
                            theme="snow"
                            value={currentContent}
                            onChange={setCurrentContent}
                            modules={modules}
                            className="h-96"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CMSPages;
