"use strict";

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        username: "juanperez",
        name: "Juan Pérez",
        email: "juan@example.com",
        password: await bcrypt.hash("123456", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "mariagarcia",
        name: "Maria Garcia",
        email: "maria@example.com",
        password: await bcrypt.hash("123456", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
