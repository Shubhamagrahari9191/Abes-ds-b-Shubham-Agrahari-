const express = require('express');
const app = express();

app.use(express.json());

let users = [
    {id: 1, name = 'John Doe', email: 'john@example.com'},
    {id:2, name: 'Jane Smith', email: "jane@example.com"}
];

app.get('/api/users', (req, res) => {
    res.json(users);
})

pp.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user) return res.status(404).json({message: 'User not found'});
    res.json(user);
});

app.get('api/users/:id', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});