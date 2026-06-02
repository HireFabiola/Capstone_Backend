// Importing Mongoose library to define the schema and model for projects in the application.
const mongoose = require("mongoose");

// Defining the schema for a project, which includes fields for project details, client information, stage, due date, and references to the related inquiry and owner.
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    clientName: {
      type: String,
      required: true,
      trim: true,
    },

    clientEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    stage: {
      type: String,
      enum: ["planning", "development", "review", "complete"],
      default: "planning",
    },

    dueDate: {
      type: Date,
    },

    inquiryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inquiry",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compiling the schema into a model called "Project" which will be used to interact with the projects collection in the MongoDB database.
const Project = mongoose.model("Project", projectSchema);

// Exporting the Project model so that it can be imported and used in other parts of the application, such as controllers or routes.
module.exports = Project;