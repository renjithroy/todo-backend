const express = require("express");
const app = express();

const mongoose = require("mongoose");
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const Todos = require("./Schema/todos")

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/todos')
    .then(() => console.log("Connected to Mongo"))
    .catch((err) => console.log("Couldn't connect to Mongo: " + err))

// Get all TODOs
app.get("/todos", async (req, res) => {
    const todoDB = await Todos.find({});
    res.send(todoDB);
})

// Get a single TODO by id
app.get("/todos/:id", async (req, res) => {
    const { id } = req.params;
    try{
    const todo = await Todos.findOne({ todoId: id });
    if(!todo){
        return res.status(404).send("No todo found with the given ID");
    }

    res.status(200).send(todo);
    }
    catch(err){
        console.error("Error fetching todo:", err);
        res.status(500).send(`Internal Server Error: ${err.message}`);
    }
})

// Create a new TODO
app.post("/todos", async (req, res) => {
    try {
        const { id, todo } = req.body;
        const newTodo = new Todos({
            todoId: id,
            todoDesc: todo
        })
        const savedTodo = await newTodo.save();
        res.status(201).send(savedTodo);
    }
    catch (err) {
        res.send(`Failed to create Todo. ${err.message}`)
    }
})

// Update a TODO by id
app.patch("/todos/:id", async (req, res) => {
    const { todo } = req.body;
    const { id } = req.params;

    try {
        const currentTodo = await Todos.findOne({ todoId: id })
        if (!currentTodo) {
            console.error("Todo with ID not found");
            return res.status(404).send("Todo with ID not found");
        }
        currentTodo.todoDesc = todo;
        await currentTodo.save();
        res.send(currentTodo);
    }
    catch (err) {
        console.error("Error saving todo:", err);
        res.status(500).send(`Internal Server Error: ${err.message}`);
    }
})

// Delete a TODO by id
app.delete("/todos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTodo = await Todos.deleteOne({ todoId: id });
        if(deletedTodo.deletedCount === 0){
            return res.status(404).send("No todos found for given id");
        }
        res.status(200).send(deletedTodo);
    } catch (err) {
        console.error("Todo could not be deleted. ", err)
        res.status(500).send(`Internal Server Error: ${err.message}`);
    }
})

app.listen(port, () => {
    console.log(`Server Connected on port ${port}`)
});