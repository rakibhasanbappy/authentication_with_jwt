// dependencies
const express = require("express");
const userHandler = require("./routeHandler/userHandler");
const loginCheck = require("./middlewares/checkLogin");
require("dotenv").config();

// express app initialization
const app = express();
app.use(express.json());

// Routes
app.use("/user", userHandler);

// default route
app.get("/", loginCheck, (req, res) => {
  res.send("Hello World");
});

// listen for requests
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
