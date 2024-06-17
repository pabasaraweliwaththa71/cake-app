const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

// Function to create a new user
exports.createUser = async (req, res) => {
    try {

        const { name, email, address, phone, password, role, province } = req.body;

        // Check if the user already exists
        const existing = await User.findOne({ email });
        if (existing) {
          return res.status(400).json({ error: "User already exists" });
        }
    
        // hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        // Create a new user instance
        const user = new User({
          name,
          email,
          role,
          address,
          phone,
          province,
          password: hashedPassword,
        });

        // Save the user to the database
        const savedPost = await user.save();

        // Send a success response
    res.status(201).json({
      message: "successful",
      user: savedPost,
    });
 
    } catch (error) {
        // Send an error response if user creation fails
        res.status(500).json({ error: "Failed to create user" });
      }
    };


    // Function to log in a user
    exports.loginUser = async (req, res) => {
        try {
          const { email, password } = req.body;

        } catch (error) {
            // Send an error response if login fails
            res.status(500).json({ error: "Failed to login" });
          }
        };

        // Function to get all users
        exports.getAllUsers = async (req, res) => {
            try {
                // Retrieve all users from the database
              const users = await User.find();
              // Send a success response with the users
              res.json(users);
            } catch (error) {

    
              res.status(500).json({ error: "Failed to fetch users" });
            }
          };