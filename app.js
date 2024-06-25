const express = require("express");
const userHandler = require("./routeHandler/userHandler");

// express app initialization
const app = express();
app.use(express.json);

// Routes
app.use("/user", userHandler);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// listen for requests
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
