const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const ShopifyAuthData = sequelize.define("ShopifyAuthData", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        shop: {
            type: DataTypes.STRING,
        },
        accessToken: {
            type: DataTypes.STRING,
        }
    })
    return ShopifyAuthData;
}