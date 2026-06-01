const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

// Pre-save middleware to hash the user's password before saving it to the database
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compile the User model from the schema
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;