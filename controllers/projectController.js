// Import the Project model
const Project = require("../models/Project");

// GET /api/projects
//
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      owner: req.user.id,
    })
      .populate("inquiryId")
      .sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving projects",
      error: error.message,
    });
  }
};

// GET /api/projects/:id
// Retrieve a single project by its ID, ensuring it belongs to the authenticated user
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user.id,
    }).populate("inquiryId");

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving project",
      error: error.message,
    });
  }
};

// POST /api/projects
// Create a new project and associate it with the authenticated user
const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      owner: req.user.id,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: "Error creating project",
      error: error.message,
    });
  }
};

// PUT /api/projects/:id
const updateProject = async (req, res) => {
    // Find the project by its ID and ensure it belongs to the authenticated user, then update it with the provided data
  try {
    const project = await Project.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({
      message: "Error updating project",
      error: error.message,
    });
  }
};

// DELETE /api/projects/:id
// Delete a project by its ID, ensuring it belongs to the authenticated user
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting project",
      error: error.message,
    });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};