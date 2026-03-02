import React, { useState } from 'react';
import { ShoppingBag, ExternalLink, Plus } from 'lucide-react';

const LiveShoppingPanel = ({ isHost }) => {
    const [products, setProducts] = useState([
        { id: '1', name: 'Jaadoe Premium Hoodie', price: '$49.99', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&h=200&fit=crop' },
        { id: '2', name: 'Limited Edition Sneakers', price: '$129.00', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop' }
    ]);

    const handleAddProduct = () => {
        const name = window.prompt("Enter product name:");
        if (!name) return;
        const price = window.prompt("Enter price (e.g. $29.99):");
        if (!price) return;
        const image = window.prompt("Enter image URL (optional):") || 'https://via.placeholder.com/200';
        setProducts([...products, { id: Date.now().toString(), name, price, image }]);
    };

    return (
        <div className="flex flex-col h-full bg-black/40 backdrop-blur-xl">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
                    <ShoppingBag size={18} className="text-emerald-500" />
                    Live Shop
                </h2>
                {isHost && (
                    <button onClick={handleAddProduct} className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors">
                        <Plus size={16} />
                    </button>
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {products.map(product => (
                    <div key={product.id} className="glass-premium p-3 border-white/5 rounded-2xl flex gap-4 hover:bg-white/5 transition-all">
                        <img src={product.image} alt={product.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                            <div>
                                <h3 className="text-white text-xs font-bold truncate leading-tight">{product.name}</h3>
                                <p className="text-emerald-400 font-bold text-[10px] mt-1 tracking-wider">{product.price}</p>
                            </div>
                            <button className="flex items-center gap-1.5 text-white/40 hover:text-white transition-colors">
                                <span className="text-[10px] font-black uppercase tracking-widest">Buy Now</span>
                                <ExternalLink size={10} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 bg-gradient-to-t from-black to-transparent">
                <p className="text-[10px] text-white/20 text-center font-bold uppercase tracking-widest">
                    Secure Checkout by Jaadoe Pay
                </p>
            </div>
        </div>
    );
};

export default LiveShoppingPanel;
