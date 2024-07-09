const express = require("express");
const router = express.Router();

const controller = require("../controllers/user.controller");

// Route to create a new user
router.post("/", controller.createUser);

// Route to Get all users

router.get("/", controller.getAllUsers);

// Route to Get user by ID
router.get("/:userId", controller.getUserById);

//Route to Login a user
router.post("/login", controller.loginUser);

// Route to Update a user by ID
router.put("/:userId", controller.updateUser);

// Route to Delete user by ID
router.delete("/:userId", controller.deleteUser);

module.exports = router;
