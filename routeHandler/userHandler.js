// description: user route handler

// dependencies
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db_operation = require("../db/db_operation");

//signup route
router.post("/create", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData = {
      username: req.body.username,
      name: req.body.name,
      password: hashedPassword,
    };
    const result = await db_operation.insert("users", userData);
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({
      message: "Error creating user",
    });
  }
});

// export the router
module.exports = router;
