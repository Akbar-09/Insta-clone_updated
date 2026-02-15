const sequelize = require('./config/database');
const Category = require('./models/Category');
const Article = require('./models/Article');
const Tag = require('./models/Tag');
const ArticleTag = require('./models/ArticleTag');

const seed = async () => {
    try {
        // Force sync to clear existing tables
        await sequelize.sync({ force: true });
        console.log('Database synced for seeding...');

        // --- 1. Create Main Categories ---
        const mainCategoriesData = [
            { name: 'Jaadoe Features', slug: 'features', icon: 'LayoutGrid', order: 1 },
            { name: 'Login, Recovery & Security', slug: 'login-security', icon: 'Lock', order: 2 },
            { name: 'Manage Your Account', slug: 'manage-account', icon: 'User', order: 3 },
            { name: 'Staying Safe', slug: 'safety', icon: 'Shield', order: 4 },
            { name: 'Privacy & Reporting', slug: 'privacy-reporting', icon: 'EyeOff', order: 5 },
            { name: 'Terms & Policies', slug: 'terms-policies', icon: 'FileText', order: 6 }
        ];
        const mainCats = await Category.bulkCreate(mainCategoriesData);
        console.log('Main Categories created');

        // Helper to find cat by slug
        const getCatId = (slug) => mainCats.find(c => c.slug === slug).id;

        // --- 2. Create Subcategories ---
        const subCategoriesData = [
            // Jaadoe Features
            { name: 'Your profile', slug: 'profile', parentId: getCatId('features'), order: 1 },
            { name: 'Sharing photos & videos', slug: 'sharing', parentId: getCatId('features'), order: 2 },
            { name: 'Exploring content', slug: 'exploring', parentId: getCatId('features'), order: 3 },
            { name: 'Messaging', slug: 'messaging', parentId: getCatId('features'), order: 4 },
            { name: 'Stories & Live', slug: 'stories-live', parentId: getCatId('features'), order: 5 },

            // Login, Recovery & Security
            { name: 'Login Help', slug: 'login-help', parentId: getCatId('login-security'), order: 1 },
            { name: 'Two-Factor Authentication', slug: '2fa', parentId: getCatId('login-security'), order: 2 },
            { name: 'Hacked Accounts', slug: 'hacked-accounts', parentId: getCatId('login-security'), order: 3 },

            // Manage Your Account
            { name: 'Edit Profile', slug: 'edit-profile', parentId: getCatId('manage-account'), order: 1 },
            { name: 'Notification Settings', slug: 'notification-settings', parentId: getCatId('manage-account'), order: 2 },
            { name: 'Delete Account', slug: 'delete-account', parentId: getCatId('manage-account'), order: 3 },

            // Staying Safe
            { name: 'Safety Tips', slug: 'safety-tips', parentId: getCatId('safety'), order: 1 },
            { name: 'Blocking & Restricting', slug: 'blocking', parentId: getCatId('safety'), order: 2 },

            // Privacy & Reporting
            { name: 'Privacy Settings', slug: 'privacy-settings', parentId: getCatId('privacy-reporting'), order: 1 },
            { name: 'Reporting Content', slug: 'reporting', parentId: getCatId('privacy-reporting'), order: 2 },

            // Terms & Policies
            { name: 'Community Guidelines', slug: 'community-guidelines', parentId: getCatId('terms-policies'), order: 1 },
            { name: 'Terms of Use', slug: 'terms-of-use', parentId: getCatId('terms-policies'), order: 2 },
            { name: 'Data Policy', slug: 'data-policy', parentId: getCatId('terms-policies'), order: 3 },
        ];

        const subCats = await Category.bulkCreate(subCategoriesData);
        console.log('Subcategories created');

        // Helper to find subcat by slug
        const getSubCatId = (slug) => subCats.find(c => c.slug === slug).id;

        // --- 3. Create Tags ---
        const tagsData = [
            { name: 'Security', slug: 'security' },
            { name: 'Privacy', slug: 'privacy' },
            { name: 'Profile', slug: 'profile' },
            { name: 'Troubleshooting', slug: 'troubleshooting' }
        ];
        const tags = await Tag.bulkCreate(tagsData);

        // --- 4. Create Articles ---
        const articlesData = [
            // == Features / Profile ==
            {
                title: 'How to update your profile information',
                slug: 'update-profile-info',
                content: '<p>To update your profile information, go to your profile page and tap "Edit Profile". You can change your name, username, bio, and profile picture.</p>',
                excerpt: 'Learn how to change your profile picture, bio, and other information.',
                categoryId: getSubCatId('profile'),
                status: 'published'
            },
            {
                title: 'Add a bio to your profile',
                slug: 'add-bio',
                content: '<p>Your bio is a short description about yourself. To add one, go to "Edit Profile" and type in the Bio field. You can use hashtags and emojis!</p>',
                excerpt: 'Make your profile stand out with a custom bio.',
                categoryId: getSubCatId('profile'),
                status: 'published'
            },

            // == Features / Sharing ==
            {
                title: 'Posting a photo or video',
                slug: 'posting-photo-video',
                content: '<p>Tap the + icon at the bottom of the screen. Select a photo or video from your library, or take a new one. Add filters, a caption, and tap Share.</p>',
                excerpt: 'Step-by-step guide to sharing your first post.',
                categoryId: getSubCatId('sharing'),
                status: 'published',
                isFeatured: true
            },
            {
                title: 'Tagging people in your posts',
                slug: 'tagging-people',
                content: '<p>Before you share a post, tap "Tag People". Tap on the photo where you want the tag to appear and search for the person you want to tag.</p>',
                excerpt: 'How to identifying friends in your photos.',
                categoryId: getSubCatId('sharing'),
                status: 'published'
            },

            // == Features / Exploring ==
            {
                title: 'Search and Explore',
                slug: 'search-explore',
                content: '<p>Tap the magnifying glass icon to go to Explore. Here you can search for accounts, tags, and places, and see content we think you will like.</p>',
                excerpt: 'Discover new content and accounts on Jaadoe.',
                categoryId: getSubCatId('exploring'),
                status: 'published'
            },
            {
                title: 'Using Hashtags',
                slug: 'using-hashtags',
                content: '<p>Hashtags help people find your content. To add a hashtag, type # followed by text or emojis in your caption or comment.</p>',
                excerpt: 'How to use hashtags to reach a wider audience.',
                categoryId: getSubCatId('exploring'),
                status: 'published'
            },

            // == Features / Messaging ==
            {
                title: 'Sending Direct Messages',
                slug: 'sending-dms',
                content: '<p>Tap the paper plane icon in the top right of the feed. Tap the new message icon, select people you want to message, and tap Chat.</p>',
                excerpt: 'Send private messages to friends.',
                categoryId: getSubCatId('messaging'),
                status: 'published'
            },
            {
                title: 'Creating Group Chats',
                slug: 'group-chats',
                content: '<p>To create a group chat, start a new message and select 2 or more people. You can name your group and send messages to everyone at once.</p>',
                excerpt: 'Chat with multiple friends at the same time.',
                categoryId: getSubCatId('messaging'),
                status: 'published'
            },

            // == Features / Stories & Live ==
            {
                title: 'Sharing a Story',
                slug: 'sharing-story',
                content: '<p>Tap your profile picture in the top left or swipe right from the feed. Take a photo or video, add effects, and tap "Your Story".</p>',
                excerpt: 'Share moments that disappear after 24 hours.',
                categoryId: getSubCatId('stories-live'),
                status: 'published'
            },
            {
                title: 'Going Live on Jaadoe',
                slug: 'going-live',
                content: '<p>Swipe right from the feed and scroll to "Live" at the bottom. Tap the button to start broadcasting live video to your followers.</p>',
                excerpt: 'Connect with your followers in real-time.',
                categoryId: getSubCatId('stories-live'),
                status: 'published'
            },

            // == Login & Security / Login Help ==
            {
                title: 'I forgot my password',
                slug: 'forgot-password',
                content: '<p>If you forgot your password, tap "Forgotten password?" on the login screen. Enter your email or username, and we will send you a link to get back into your account.</p>',
                excerpt: 'Recover access to your account if you lost your password.',
                categoryId: getSubCatId('login-help'),
                status: 'published',
                isFeatured: true
            },
            {
                title: 'Trouble logging in',
                slug: 'login-trouble',
                content: '<p>If you are having trouble logging in, ensure your internet connection is stable and you are using the correct username. If issues persist, try resetting your password.</p>',
                excerpt: 'Common solutions for login issues.',
                categoryId: getSubCatId('login-help'),
                status: 'published'
            },

            // == Login & Security / 2FA ==
            {
                title: 'About Two-Factor Authentication',
                slug: 'about-2fa',
                content: '<p>Two-factor authentication adds an extra layer of security. We will ask for a special login code whenever you log in from a new device.</p>',
                excerpt: 'Secure your account with 2FA.',
                categoryId: getSubCatId('2fa'),
                status: 'published'
            },
            {
                title: 'Turn on Two-Factor Authentication',
                slug: 'turn-on-2fa',
                content: '<p>Go to Settings > Security > Two-Factor Authentication. Choose between an authentication app or text message (SMS) to receive your codes.</p>',
                excerpt: 'Steps to enable 2FA on your account.',
                categoryId: getSubCatId('2fa'),
                status: 'published'
            },

            // == Login & Security / Hacked Accounts ==
            {
                title: 'I think my account was hacked',
                slug: 'hacked-account-recovery',
                content: '<p>If you notice suspicious activity or cannot log in, secure your account immediately. Change your password and revoke access to suspicious apps.</p>',
                excerpt: 'What to do if you suspect unauthorized access.',
                categoryId: getSubCatId('hacked-accounts'),
                status: 'published'
            },
            {
                title: 'Suspicious emails or messages',
                slug: 'suspicious-emails',
                content: '<p>Jaadoe will never ask for your password via email. If you receive a suspicious email claiming to be from us, verify it in Settings > Emails from Jaadoe.</p>',
                excerpt: 'Identify phishing attempts.',
                categoryId: getSubCatId('hacked-accounts'),
                status: 'published'
            },

            // == Manage Account / Edit Profile ==
            {
                title: 'Changing your username',
                slug: 'change-username',
                content: '<p>Go to your profile and tap "Edit Profile". Tap your username and enter a new one. If the username is available, tap Done.</p>',
                excerpt: 'How to update your unique handle.',
                categoryId: getSubCatId('edit-profile'),
                status: 'published'
            },
            {
                title: 'Changing your profile picture',
                slug: 'change-pfp',
                content: '<p>Go to your profile > Edit Profile > Change Profile Photo. You can import from your library or take a new photo.</p>',
                excerpt: 'Update your avatar.',
                categoryId: getSubCatId('edit-profile'),
                status: 'published'
            },

            // == Manage Account / Notifications ==
            {
                title: 'Push Notification Settings',
                slug: 'push-notifications',
                content: '<p>Go to Settings > Notifications. Here you can pause all notifications or choose which types of notifications you want to receive (e.g., likes, comments, DMs).</p>',
                excerpt: 'Control pop-up alerts on your device.',
                categoryId: getSubCatId('notification-settings'),
                status: 'published'
            },
            {
                title: 'Email Notifications',
                slug: 'email-notifications',
                content: '<p>You can manage which emails you receive from us in Settings > Notifications > Email Notifications.</p>',
                excerpt: 'Manage emails from Jaadoe.',
                categoryId: getSubCatId('notification-settings'),
                status: 'published'
            },

            // == Manage Account / Delete ==
            {
                title: 'Delete your account',
                slug: 'delete-account-permanent',
                content: '<p>If you delete your account, your profile, photos, videos, comments, likes and followers will be permanently removed. This action cannot be undone.</p>',
                excerpt: 'How to permanently delete your Jaadoe account.',
                categoryId: getSubCatId('delete-account'),
                status: 'published'
            },
            {
                title: 'Temporarily Disable Account',
                slug: 'temp-disable',
                content: '<p>If you want a break, you can temporarily disable your account instead of deleting it. Your profile will be hidden until you log back in.</p>',
                excerpt: 'Take a break without losing your data.',
                categoryId: getSubCatId('delete-account'),
                status: 'published'
            },

            // == Staying Safe / Safety Tips ==
            {
                title: 'Safety Tips for Parents',
                slug: 'parents-guide',
                content: '<p>We want Jaadoe to be a safe place. Talk to your teens about who they follow and what they share. Encourage them to verify their age and use private accounts.</p>',
                excerpt: 'A guide for parents to help teens stay safe.',
                categoryId: getSubCatId('safety-tips'),
                status: 'published'
            },
            {
                title: 'Stay Safe on Jaadoe',
                slug: 'stay-safe-general',
                content: '<p>Be mindful of what you share. Never share sensitive personal information like your address or financial details securely.</p>',
                excerpt: 'General tips for online safety.',
                categoryId: getSubCatId('safety-tips'),
                status: 'published'
            },

            // == Staying Safe / Blocking ==
            {
                title: 'Blocking accounts',
                slug: 'blocking-accounts',
                content: '<p>To block someone, go to their profile, tap the three dots in the top right, and select "Block". They will not be able to find your profile or see your posts.</p>',
                excerpt: 'How to block users you do not want to interact with.',
                categoryId: getSubCatId('blocking'),
                status: 'published'
            },
            {
                title: 'Restricting accounts',
                slug: 'restricting-accounts',
                content: '<p>Restricting is a way to protect yourself from unwanted interactions without blocking. Comments from restricted people will only be visible to them.</p>',
                excerpt: 'Subtly control unwanted interactions.',
                categoryId: getSubCatId('blocking'),
                status: 'published'
            },

            // == Privacy & Reporting / Privacy Settings ==
            {
                title: 'Controlling who can see your posts',
                slug: 'privacy-posts',
                content: '<p>You can set your account to Private in settings. When your account is private, only people you approve can see your photos and videos.</p>',
                excerpt: 'Make your account private or public.',
                categoryId: getSubCatId('privacy-settings'),
                status: 'published',
                isFeatured: true
            },
            {
                title: 'Activity Status',
                slug: 'activity-status',
                content: '<p>Activity status allows accounts you follow and anyone you message to see when you were last active. You can turn this off in Settings > Privacy.</p>',
                excerpt: 'Manage visibility of your online presence.',
                categoryId: getSubCatId('privacy-settings'),
                status: 'published'
            },

            // == Privacy & Reporting / Reporting ==
            {
                title: 'Reporting a Post',
                slug: 'report-post',
                content: '<p>Tap the three dots (Ellipsis) above a post > Report. Follow the on-screen instructions to tell us why the post violates our guidelines.</p>',
                excerpt: 'Flag content that violates guidelines.',
                categoryId: getSubCatId('reporting'),
                status: 'published'
            },
            {
                title: 'Reporting a Profile',
                slug: 'report-profile',
                content: '<p>Go to the profile you want to report. Tap the three dots in the top right > Report. Select the reason for reporting this account.</p>',
                excerpt: 'Report accounts for spam or abuse.',
                categoryId: getSubCatId('reporting'),
                status: 'published'
            },

            // == Terms & Policies ==
            {
                title: 'Jaadoe Community Guidelines',
                slug: 'community-guidelines-full',
                content: '<p>We want Jaadoe to be an authentic and safe place for inspiration and expression. Help us foster this community. Post only your own photos and videos and always follow the law. Respect everyone on Jaadoe, do not spam people or post nudity.</p>',
                excerpt: 'The rules that keep Jaadoe safe.',
                categoryId: getSubCatId('community-guidelines'),
                status: 'published',
                isFeatured: true
            },
            {
                title: 'Terms of Use',
                slug: 'terms-of-use-full',
                content: '<p>Welcome to Jaadoe. By using our service, you agree to these Terms. You must be at least 13 years old to use Jaadoe. You may not post violent, nude, partially nude, discriminatory, unlawful, infringing, hateful, pornographic or sexually suggestive photos or other content via the Service.</p>',
                excerpt: 'The legal agreement for using Jaadoe.',
                categoryId: getSubCatId('terms-of-use'),
                status: 'published'
            },
            {
                title: 'Data Policy',
                slug: 'data-policy-full',
                content: '<p>This policy describes the information we process to support Jaadoe. We collect content, communications and other information you provide when you use our Products, including when you sign up for an account, create or share content, and message or communicate with others.</p>',
                excerpt: 'How we collect and use your data.',
                categoryId: getSubCatId('data-policy'),
                status: 'published'
            }
        ];

        await Article.bulkCreate(articlesData);
        console.log('Articles created');

        console.log('--- SEEDING COMPLETE ---');
        process.exit(0);

    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
};

seed();
