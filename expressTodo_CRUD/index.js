const express = require("express");
const fs = require("fs");

const server = express()
const PORT = 8080;

server.use(express.json())

// read todos
server.get("/read-todos", (req, res) => {
    const todo = fs.readFileSync("./db.json", "utf-8")
    res.send(todo)
})

// add todos
server.post("/add-todos", (req, res) => {
    const newTodo = req.body
    const AllTodo = fs.readFileSync("./db.json", "utf-8")
    const parseTodo = JSON.parse(AllTodo)
    parseTodo.todos.push(newTodo)
    fs.writeFileSync("./db.json", JSON.stringify(parseTodo))
    res.send(`Todos recieved successfully ${parseTodo}`)
})

// update the status of all the todos 

server.put("/update-status", (req, res) => {
    const AllTodo = fs.readFileSync("./db.json", "utf-8")
    const parseTodo = JSON.parse(AllTodo)
    parseTodo.todos = parseTodo.todos.map(todo => {
        if (todo.id % 2 === 0 && todo.status === false) {
            return { ...todo, status: true };
        }
        return todo;
    });


    fs.writeFileSync("./db.json", JSON.stringify(parseTodo))
    res.send(`Updated todos successfully ${parseTodo.todos}`)
})


// Delete all the todos  whose status is true.
server.delete('/delete-true-status', (req, res) => {
    const AllTodo = fs.readFileSync('./db.json', 'utf-8');
    const parseTodo = JSON.parse(AllTodo);
  
    parseTodo.todos = parseTodo.todos.filter(todo => todo.status !== true);
  
    fs.writeFileSync('./db.json', JSON.stringify(parseTodo));
    res.json({ message: 'Deleted todos with true status', todos: parseTodo.todos });
  });
  



server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})