// Import necessary modules and middleware
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

// Import controller functions for handling task-related operations
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

//  Create a new router instance for task routes
const router = express.Router();

// Define routes for task operations, applying authentication middleware to protect the routes
router
  .route("/")
  .get(authMiddleware, getTasks)
  .post(authMiddleware, createTask);

router
  .route("/:id")
  .get(authMiddleware, getTaskById)
  .put(authMiddleware, updateTask)
  .delete(authMiddleware, deleteTask);

 // Export the router to be used in the main server file 
module.exports = router;