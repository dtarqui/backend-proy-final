"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    }
  }

  Task.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("pending", "in-progress", "completed"),
        allowNull: false,
        defaultValue: "pending",
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Task",
      tableName: "Tasks",
      timestamps: true,
    }
  );

  return Task;
};
