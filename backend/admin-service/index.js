const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize, Admin, Role } = require('./models');
const { connectRabbitMQ } = require('./config/rabbitmq');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5016;

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const userManagementRoutes = require('./routes/userManagementRoutes');
const contentManagementRoutes = require('./routes/contentManagementRoutes');
const commentModerationRoutes = require('./routes/commentModerationRoutes');
const reportRoutes = require('./routes/reportRoutes');

const hashtagRoutes = require('./routes/hashtagAdminRoutes');

const analyticsRoutes = require('./routes/analyticsAdminRoutes');
const settingRoutes = require('./routes/settingRoutes');
const auditRoutes = require('./routes/auditRoutes');
const cmsRoutes = require('./routes/cmsRoutes');
const adminNotificationRoutes = require('./routes/adminNotificationRoutes');
const dmSafetyRoutes = require('./routes/dmSafetyRoutes');
const dmOversightRoutes = require('./routes/dmOversightRoutes');
const mediaDefaultRoutes = require('./routes/mediaDefaultRoutes');

const avatarManagementRoutes = require('./routes/avatarManagementRoutes');

app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/users', userManagementRoutes);
app.use('/avatars', avatarManagementRoutes);
app.use('/comments', commentModerationRoutes);
app.use('/moderation', contentManagementRoutes);

app.use('/reports', reportRoutes);



app.use('/hashtags', hashtagRoutes);
const exploreAdminRoutes = require('./routes/exploreAdminRoutes');
app.use('/explore', exploreAdminRoutes);
const geoAnalyticsRoutes = require('./routes/geoAnalyticsRoutes');
app.use('/analytics', analyticsRoutes);
app.use('/analytics', geoAnalyticsRoutes);
const languageRoutes = require('./routes/languageRoutes');
app.use('/languages', languageRoutes);

app.use('/settings', settingRoutes);

app.use('/audit', auditRoutes);
app.use('/cms', cmsRoutes);
app.use('/notifications', adminNotificationRoutes);
app.use('/messages', dmSafetyRoutes);
app.use('/dm-oversight', dmOversightRoutes);
app.use('/default-avatars', mediaDefaultRoutes);



// Health check
app.get('/health', (req, res) => {
    res.json({ success: true, message: 'Admin Service is healthy' });
});

const languageService = require('./services/languageService');

const initApp = async () => {
    try {
        await sequelize.authenticate();
        console.log('Admin Service: Database connected.');

        await sequelize.sync({ alter: true });
        console.log('Admin Service: Models synced.');

        await languageService.seedLanguages();

        // Seed default Role and SuperAdmin if not exists

        const [superRole] = await Role.findOrCreate({
            where: { name: 'SuperAdmin' },
            defaults: { permissions: ['all'] }
        });

        const adminExists = await Admin.findOne({ where: { username: 'admin' } });
        if (!adminExists) {
            await Admin.create({
                username: 'admin',
                name: 'Super Admin',
                email: 'admin@jaadoe.com',
                password: 'adminpassword123',
                roleId: superRole.id
            });
            console.log('Admin Service: Default SuperAdmin created (admin/adminpassword123)');
        }

        await connectRabbitMQ();

        app.listen(PORT, () => {
            console.log(`Admin Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Admin Service startup error:', error);
    }
};

initApp();
