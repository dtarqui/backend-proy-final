const { Op } = require("sequelize");
const { Task } = require("../models");

// Get tasks for the authenticated user
exports.getTasks = async (req, res) => {
  const { status, search, startDate, endDate } = req.query;
  const where = { userId: req.user.id }; // Filter tasks by the authenticated user

  if (status) {
    where.status = status;
  }

  if (search) {
    where[Op.or] = [
      { title: { [Op.like]: `%${search}%` } },
      { description: { [Op.like]: `%${search}%` } },
    ];
  }

  if (startDate && endDate) {
    where.dueDate = {
      [Op.between]: [new Date(startDate), new Date(endDate)],
    };
  } else if (startDate) {
    where.dueDate = {
      [Op.gte]: new Date(startDate),
    };
  } else if (endDate) {
    where.dueDate = {
      [Op.lte]: new Date(endDate),
    };
  }

  const tasks = await Task.findAll({ where });
  res.json(tasks);
};

// Create a task for the authenticated user
exports.createTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({ message: "El título es obligatorio" });
  }

  const task = await Task.create({
    title,
    description,
    status: status || "pending",
    dueDate,
    userId: req.user.id, // Assign the task to the authenticated user
  });

  res.status(201).json({
    message: "Tarea creada exitosamente",
    task,
  });
};

// Get a specific task by ID for the authenticated user
exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOne({
    where: { id, userId: req.user.id }, // Ensure the task belongs to the user
  });
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: "Tarea no encontrada" });
  }
};

// Update a specific task by ID for the authenticated user
exports.updateTaskById = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, dueDate } = req.body;

  const task = await Task.findOne({
    where: { id, userId: req.user.id }, // Ensure the task belongs to the user
  });
  if (!task) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }

  if (task.status === "completada") {
    return res
      .status(400)
      .json({ message: "No se puede modificar una tarea completada" });
  }

  if (status) {
    if (
      task.status === "pendiente" &&
      status !== "en progreso" &&
      status !== "pendiente"
    ) {
      return res.status(400).json({
        message:
          "Solo se puede marcar como 'en progreso' si está en 'pendiente'",
      });
    }
    if (task.status === "en progreso" && status === "pendiente") {
      return res.status(400).json({
        message:
          "No se puede volver a 'pendiente' desde 'en progreso' o 'completada'",
      });
    }
    if (task.status === "en progreso" && status === "completada") {
      task.status = status;
    }
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.dueDate = dueDate || task.dueDate;

  await task.save();
  res.json({
    message: "Tarea actualizada exitosamente",
    task,
  });
};

// Delete a specific task by ID for the authenticated user
exports.deleteTaskById = async (req, res) => {
  const { id } = req.params;
  const deleted = await Task.destroy({
    where: { id, userId: req.user.id }, // Ensure the task belongs to the user
  });
  if (deleted) {
    res.status(204).json({ message: "Tarea eliminada exitosamente" });
  } else {
    res.status(404).json({ message: "Tarea no encontrada" });
  }
};
