// Import required modules
const express = require("express");

// Create an instance of Express
const app = express();

// Define a route
app.get("/", (req, res) => {
  res.send("Welcome to the cs50 Hackathon!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
