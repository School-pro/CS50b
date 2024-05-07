const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Task = require("../backend/model/Task"); // Import Task model if you have defined it

const app = express();
const port = 3000;

// MongoDB connection URL
const mongoURI = "mongodb://localhost:27017/taskManager";

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB with Mongoose
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start server after successful connection
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Routes
// Define your routes here...

app.get("/", (req, res) => {
  res.send("Welcome Task Manager");
});
// Example route to create a new task
app.post("/tasks", async (req, res) => {
  try {
    const newTask = await Task.create(req.body); // Assuming req.body contains task data
    res.status(201).json(newTask);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).send("Error creating task");
  }
});

// Route to update a task
app.put("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
    });
    if (!updatedTask) {
      return res.status(404).send("Task not found");
    }
    res.json(updatedTask);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).send("Error updating task");
  }
});

// Route to delete a task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).send("Task not found");
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).send("Error deleting task");
  }
});
