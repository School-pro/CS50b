<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 296e659d2149ab96af8631c77f31a531831c3186
const express = require("express")
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const {MongoClient, ObjectId} = require('mongodb')
const sanitizeHTML = require('sanitize-html')

let db;
// app.set('views', 'views')
// app.set('view engine', 'ejs')
app.use(express.static('public'))

// function that will connect my mongodb and then trigger the sercer connection
async function go() {
    try {
        let client = new MongoClient(process.env.CONNECTIONSTRING);
        await client.connect();
        db = client.db(); // specify the database name if needed
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

go()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

// this is the router to load the root of the page
app.get('/', async function(req, res) {
    let itemy = await db.collection('itemy').find().toArray()
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>To-Do-app</title>
        <link rel="stylesheet" href="/scrol.css">
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body>
        <header class="relative bg-blue-50 flex items-center justify-center p-10 overflow-hidden">
            <div class="w-[200px] h-[200px] bg-blue-500 rounded-2xl rotate-45 absolute top-0 sm:-left-20 -left-[120px]"></div>
            <h1 class="text-blue-800">
                <span class="font-semibold text-3xl block text-center">Welcome</span>
                <span class="text-center block text-2xl font-semibold">to our</span>
                <span class="text-center block text-[2.5rem] font-bold">To-Do App</span>
            </h1>
    
        </header>
        <main class="py-10 px-10 flex justify-center flex-col w-full">
            <form id="create-form" action="/create-item" method="POST" class="bg-blue-50 w-full md:w-[70%] mx-auto flex gap-2 rounded item-center justify-between p-2">
                <input  id="create-field" name="item" class="border-none rounded outline-blue-300 px-2 flex-grow" type="text" autocomplete="off" placeholder="Enter the item you want to add ">
                <button class="p-2 px-6 bg-blue-500 text-white rounded font-semibold hover:bg-blue-700">Add Item</button>
            </form>
            <ul  id="item-list" class="w-full md:w-[70%] rounded my-6 mx-auto divide-y border border-gray-300"></ul>
        </main>
    </body>

    <script>
                let iteming = ${JSON.stringify(itemy)} 
    </script>

    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="/browser.js"></script>

    </html>
    `);
})

app.post('/create-item', async function(req, res) {
   const info = await db.collection('itemy').insertOne({name: req.body.text})
   res.json({_id: info.insertedId, name: req.body.text})
})

app.post('/update-item', async function(req, res) {
    await db.collection('itemy').findOneAndUpdate({_id: new ObjectId(req.body.id)}, {$set: {name: req.body.text}})
    res.send('Success')
})

app.post('/delete-item', async function(req, res) {
    await db.collection('itemy').findOneAndDelete({_id: new ObjectId(req.body.id)})
    res.send('Success')
})
<<<<<<< HEAD
>>>>>>> 9b3299cb12e1ef992908538484c3b15b96dac2e8
=======
=======
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
>>>>>>> 43f0f2a87a28b1e1dead32cd5bf3cfda20d6a703
>>>>>>> 296e659d2149ab96af8631c77f31a531831c3186
