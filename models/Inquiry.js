// Importing Mongoose library to define the schema and model for inquiries in the application.
const mongoose = require("mongoose");

// Defining the schema for an inquiry, which includes fields for client information, project details, and status.
const inquirySchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    businessName: {
      type: String,
      trim: true,
    },

    projectType: {
      type: String,
      required: true,
      enum: ["website", "business system", "digital solution", "debugging", "not sure"],
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    budgetRange: {
      type: String,
      enum: ["under $500", "$500-$1,000", "$1,000-$2,500", "$2,500+", "not sure"],
      default: "not sure",
    },

    status: {
      type: String,
      enum: ["new", "discussion", "qualified", "closed"],
      default: "new",
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

// Compiling the schema into a model called "Inquiry" which will be used to interact with the inquiries collection in the MongoDB database.
const Inquiry = mongoose.model("Inquiry", inquirySchema);

// Exporting the Inquiry model so that it can be imported and used in other parts of the application, such as controllers or routes.
module.exports = Inquiry;