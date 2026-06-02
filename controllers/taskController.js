// Import the Task and Project models
const Task = require("../models/Task");
const Project = require("../models/Project");

// GET /api/tasks
// Retrieve all tasks that belong to the authenticated user, populating the project details and sorting by creation date in descending order
const getTasks = async (req, res) => {
  try {
    // Find all tasks that belong to the authenticated user by checking the project ownership, populate the project details, and sort them by creation date in descending order
    const tasks = await Task.find()
      .populate("projectId")
      .sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving tasks",
      error: error.message,
    });
  }
};

// GET /api/tasks/:id
// Retrieve a single task by its ID, ensuring it belongs to the authenticated user by checking the project ownership
const getTaskById = async (req, res) => {
  try {
    // Find the task by its ID and populate the project details to check ownership
    const task = await Task.findById(req.params.id)
      .populate("projectId");

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Check if the project associated with the task belongs to the authenticated user
    const project = await Project.findOne({
      _id: task.projectId,
      owner: req.user.id,
    });

    if (!project) {
      return res.status(403).json({
        message: "Unauthorized access",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving task",
      error: error.message,
    });
  }
};

// POST /api/tasks
const createTask = async (req, res) => {
  try {
    // Check if the project associated with the task belongs to the authenticated user before creating the task
    const project = await Project.findOne({
      _id: req.body.projectId,
      owner: req.user.id,
    });

    if (!project) {
      return res.status(403).json({
        message: "Unauthorized project access",
      });
    }

    // Create the task with the provided data and associate it with the authenticated user through the project ownership
    const task = await Task.create(req.body);

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Error creating task",
      error: error.message,
    });
  }
};

// PUT /api/tasks/:id
const updateTask = async (req, res) => {
  try {
    // Find the task by its ID to check if it exists and to verify the project ownership before updating
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Check if the project associated with the task belongs to the authenticated user  
    const project = await Project.findOne({
      _id: task.projectId,
      owner: req.user.id,
    });

    if (!project) {
      return res.status(403).json({
        message: "Unauthorized access",
      });
    }

    // Update the task with the provided data and return the updated task
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: "Error updating task",
      error: error.message,
    });
  }
};

// DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    // Find the task by its ID to check if it exists and to verify the project ownership before deleting    
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Check if the project associated with the task belongs to the authenticated user
    const project = await Project.findOne({
      _id: task.projectId,
      owner: req.user.id,
    });

    if (!project) {
      return res.status(403).json({
        message: "Unauthorized access",
      });
    }

    // Delete the task by its ID
    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting task",
      error: error.message,
    });
  }
};

// Export the controller functions to be used in the task routes
module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};