"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Task, { foreignKey: "userId", as: "tasks" });
    }

    static async hashPassword(password) {
      return await bcrypt.hash(password, 10);
    }

    async validatePassword(password) {
      return await bcrypt.compare(password, this.password);
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      freezeTableName: true,
      hooks: {
        beforeCreate: async (user) => {
          user.password = await User.hashPassword(user.password);
        },
      },
    }
  );

  return User;
};
