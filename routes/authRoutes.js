// Importing necessary libraries and modules
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// Creating a new router instance from Express to define authentication routes
const router = express.Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    // Destructuring the name, email, password, and role from the request body
    const { name, email, password} = req.body;

    //
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    // Checking if a user with the provided email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    // Hashing the password using bcrypt with a salt round of 10 for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new user in the database with the provided name, email, hashed password, and role (assuming role is optional and defaults to "user" if not provided)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    // Generating a JWT token for the newly registered user, including their ID and role in the payload, and signing it with a secret key from environment variables. The token is set to expire in 1 day.          
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    // Destructuring the email and password from the request body
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Finding the user in the database by their email
    const user = await User.findOne({ email });

    // If the user is not found, return a 401 Unauthorized response with a message indicating invalid email or password
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Comparing the provided password with the hashed password stored in the database using bcrypt's compare function
    const passwordIsValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Generating a JWT token for the authenticated user, including their ID and role in the payload, and signing it with a secret key from environment variables. The token is set to expire in 1 day.
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in",
      error: error.message,
    });
  }
});

// GET /api/auth/me
router.get("/me", authMiddleware, async (req, res) => {
  try {
    // Finding the user in the database by their ID, which is extracted from the decoded JWT token and attached to the request object by the authMiddleware. The password field is excluded from the returned user data for security reasons.
    const user = await User.findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving user",
      error: error.message,
    });
  }
});

//  Exporting the router to be used in other parts of the application, such as the main server file where it can be mounted on a specific path (e.g., /api/auth) to handle authentication-related routes.
module.exports = router;