const Sequelize = require('sequelize');

const dbName = "shopifyApi";
const dbUserName = "root";
const dbPassword = "Waheguruji@13";

const sequelize = new Sequelize(dbName, dbUserName, dbPassword, {
    dialect: 'mysql',
    host: 'localhost',
    logging: false,
});

sequelize.sync({ force: false });

const db = {
    sequelize: sequelize,
    Sequelize: Sequelize
};

db.ShopifyAuthData = require('../models/shopifyAuth')(sequelize, Sequelize);

module.exports = db;