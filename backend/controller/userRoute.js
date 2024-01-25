const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const verifyToken = require("../middlewares/verifyToken");

// Create account for user
router.post("/createUser", async (req, res) => {
  const { fullName, phoneNumber, email, password } = req.body;

  // Validate input
  if (!fullName || !email || !password || !phoneNumber) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields." });
  }

  try {
    // Check if the email is already in use
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already in use." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database with the hashed password
    const newUser = new userModel({
      fullName,
      phoneNumber,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Account created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Login user route
router.post("/login", async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    // Find the user in the database
    const user = await userModel.findOne({ phoneNumber });

    // Check if the user exists
    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid phone number or password." });
    }

    // Compare the provided password with the stored hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Invalid phone number or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { phoneNumber: user.phoneNumber, email: user.email },
      "Devlynx2024",
      { expiresIn: "1h" }
    );

    // Set the token as an HTTP-only cookie
    res.cookie("token", token, { httpOnly: true });

    res.json({ message: "User Login Successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Get user route
router.get("/getUser", verifyToken, async (req, res) => {
  try {
    const user = await userModel.findOne({ phoneNumber: req.user.phoneNumber });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // You may want to exclude sensitive information like the password before sending the response
    const { fullName, phoneNumber, email } = user;

    res.json({ fullName, phoneNumber, email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
