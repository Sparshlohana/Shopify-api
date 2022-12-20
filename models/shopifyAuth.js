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
        state: {
            type: DataTypes.STRING,
        },
        isOnline: {
            type: DataTypes.BOOLEAN,
        },
        accessToken: {
            type: DataTypes.STRING,
        },
        scope: {
            type: DataTypes.STRING,
        }
    })
    return ShopifyAuthData;
}