// Import necessary modules and middleware
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

// Import controller functions for handling project-related operations
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

// Create a new router instance for project routes
const router = express.Router();

// Define routes for project operations, applying authentication middleware to protect the routes
router
  .route("/")
  .get(authMiddleware, getProjects)
  .post(authMiddleware, createProject);

router
  .route("/:id")
  .get(authMiddleware, getProjectById)
  .put(authMiddleware, updateProject)
  .delete(authMiddleware, deleteProject);
  
// Export the router to be used in the main server file
module.exports = router;