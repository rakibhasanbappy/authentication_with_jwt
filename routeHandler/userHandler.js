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

// login route
router.post("/login", async (req, res) => {
  try {
    const userData = await db_operation.get_single("users", req.body.username);
    if (userData.length > 0) {
      const isValid = await bcrypt.compare(
        req.body.password,
        userData[0].password
      );
      if (isValid) {
        res.status(200).json({
          message: "Login successful",
        });
      } else {
        res.status(401).json({
          message: "Invalid credentials",
        });
      }
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({
      message: "Error logging in",
    });
  }
});

// export the router
module.exports = router;
