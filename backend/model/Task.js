const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  priority: String,
  status: String,
  assignedTo: String,
  tags: [String],
  notes: String,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
