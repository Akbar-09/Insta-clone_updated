import { Heart } from 'lucide-react';

const LikeCounts = () => {
    return (
        <div className="flex flex-col w-full text-text-primary max-w-[600px]">
            <h2 className="text-xl font-bold mb-6">Like and share counts</h2>

            <div className="mb-6">
                <h3 className="text-base font-bold mb-4">Hide like and share counts</h3>

                <div className="flex items-start justify-between mb-6">
                    <div className="mr-8">
                        <div className="text-base font-medium mb-1">Hide like and share counts</div>
                        <div className="text-xs text-text-secondary leading-normal">
                            You won't see the total number of likes and shares on posts from other accounts. You can hide these counts on your own posts when you create them by going to Advanced Settings.
                        </div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white"></div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default LikeCounts;
