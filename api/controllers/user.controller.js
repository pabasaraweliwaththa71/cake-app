const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

// Function to create a new user
exports.createUser = async (req, res) => {
    try {

    } catch (error) {
        // Send an error response if user creation fails
        res.status(500).json({ error: "Failed to create user" });
      }
    };