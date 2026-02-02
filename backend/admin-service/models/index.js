const Admin = require('./Admin');
const Role = require('./Role');
const AuditLog = require('./AuditLog');
const Report = require('./Report');
const Hashtag = require('./Hashtag');
const FeaturedContent = require('./FeaturedContent');
const SystemSetting = require('./SystemSetting');
const DMModerationLog = require('./DMModerationLog');
const ExploreAlgorithmConfig = require('./ExploreAlgorithmConfig');
const ExploreTrendingTopic = require('./ExploreTrendingTopic');
const Language = require('./Language');
const sequelize = require('../config/database');

// Associations
Role.hasMany(Admin, { foreignKey: 'roleId' });
Admin.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });

Admin.hasMany(AuditLog, { foreignKey: 'adminId' });
AuditLog.belongsTo(Admin, { foreignKey: 'adminId', as: 'admin' });

Admin.hasMany(DMModerationLog, { foreignKey: 'adminId' });
DMModerationLog.belongsTo(Admin, { foreignKey: 'adminId', as: 'admin' });

module.exports = {
    sequelize,
    Admin,
    Role,
    AuditLog,
    Report,
    Hashtag,
    FeaturedContent,
    SystemSetting,
    DMModerationLog,
    ExploreAlgorithmConfig,
    ExploreTrendingTopic,
    Language
};


