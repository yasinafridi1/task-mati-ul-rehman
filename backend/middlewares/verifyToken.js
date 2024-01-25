const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Token missing." });
  }

  jwt.verify(token, "Devlynx2024", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized - Invalid token." });
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
