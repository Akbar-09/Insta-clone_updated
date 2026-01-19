const Help = () => {
    return (
        <div className="flex flex-col w-full text-text-primary max-w-[600px]">
            <h2 className="text-xl font-bold mb-6">Help</h2>

            <div className="flex flex-col gap-1">
                {['Help Centre', 'Privacy and Security Help', 'Support Requests'].map(item => (
                    <div key={item} className="py-4 border-b border-border cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 -mx-4 px-4 flex justify-between items-center transition-colors">
                        <span className="text-base font-medium">{item}</span>
                        <div className="w-4 h-4 text-text-secondary rotate-[-90deg]">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Help;
