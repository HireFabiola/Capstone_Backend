const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    // Role can be either 'admin' or 'client' with 'admin' as the default role.  Client is for future feature use when we implement client-specific features and would have limited access compared to admin users.
    role: {
      type: String,
      enum: ["admin", "client"],
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

// Compile the User model from the schema
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;