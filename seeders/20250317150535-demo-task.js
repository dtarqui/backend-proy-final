"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Fetch user IDs from the Users table
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users";`
    );
    const userIds = users[0];

    // Check if there are any users
    if (userIds.length === 0) {
      console.error("No users found in the Users table. Seeding aborted.");
      return;
    }

    // Seed the Tasks table with tasks assigned to users
    await queryInterface.bulkInsert("Tasks", [
      {
        title: "Completar el proyecto",
        description: "Terminar la última parte del backend",
        status: "pending",
        dueDate: new Date("2025-03-20"),
        userId: userIds[0].id, // Assign to the first user
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Revisar documentación",
        description: "Revisar y actualizar la documentación del proyecto",
        status: "in-progress",
        dueDate: new Date("2025-03-25"),
        userId: userIds[1]?.id || userIds[0].id, // Assign to the second user if available, otherwise the first
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Implementar autenticación",
        description: "Agregar autenticación con JWT",
        status: "completed",
        dueDate: new Date("2025-03-15"),
        userId: userIds[0].id, // Assign to the first user
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Diseñar la interfaz de usuario",
        description: "Crear un diseño atractivo para la aplicación",
        status: "pending",
        dueDate: new Date("2025-03-30"),
        userId: userIds[1]?.id || userIds[0].id, // Assign to the second user if available, otherwise the first
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Configurar el servidor",
        description: "Configurar el servidor para el entorno de producción",
        status: "in-progress",
        dueDate: new Date("2025-03-28"),
        userId: userIds[0].id, // Assign to the first user
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Delete all tasks from the Tasks table
    await queryInterface.bulkDelete("Tasks", null, {});
  },
};
