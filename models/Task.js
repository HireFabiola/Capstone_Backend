//  Importing Mongoose library to define the schema and model for tasks in the application.
const mongoose = require("mongoose");

// Defining the schema for a task, which includes fields for task details, status, due date, and a reference to the related project.
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["todo", "in-progress", "complete"],
      default: "todo",
    },

    dueDate: {
      type: Date,
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compiling the schema into a model called "Task" which will be used to interact with the tasks collection in the MongoDB database.
const Task = mongoose.model("Task", taskSchema);

// Exporting the Task model so that it can be imported and used in other parts of the application, such as controllers or routes.
module.exports = Task;