// associations.js
const User = require('./models/user');
const Headline = require('./models/headline');
const UserChat = require('./models/userChat');
const UserHeadlineSelection = require('./models/userHeadlineSelection');

function configureAssociations() {
    Headline.hasMany(UserHeadlineSelection, { foreignKey: 'headlineId' });
    User.hasMany(UserHeadlineSelection, { foreignKey: 'userId' });

    Headline.hasMany(UserChat, { foreignKey: 'headlineId' });

    User.hasMany(UserChat, { foreignKey: 'userId' });
}

module.exports = configureAssociations;
