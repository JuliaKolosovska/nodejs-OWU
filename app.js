const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let users = [];

const readUsersFromFile = () => {
    const data = fs.readFileSync(path.join(__dirname, 'users.json'), {encoding: 'utf8'});
    users = JSON.parse(data);
}

readUsersFromFile();
console.log('Users loaded');

const writeUsersToFile = () => {
    const data = JSON.stringify(users, null, 2);
    fs.writeFileSync(path.join(__dirname, 'users.json'), data, {encoding: 'utf8'});
}

app.get('/users', (req, res) => {
    res.status(200).json(users);
});

app.get('/users/:id', (req, res) => {
    const {id} = req.params;
    if (id < 0 || id >= users.length) {
        return res.status(404).json({message: 'User not found'});
    }

    const user = users[id];
    res.status(200).json(user);
});

app.post('/users', (req, res) => {
    const {name, age} = req.body;

    if (!name || name.length < 3) {
        return res.status(400).json({message: 'Name should have min 3 characters'});
    }

    if (age === undefined || age < 0) {
        return res.status(400).json({message: 'Age must be >0'});
    }

    users.push(req.body);
    writeUsersToFile();

    res.status(201).json({
        message: 'User created.',
    });
})

app.put('/users/:id', (req, res) => {
    const {id} = req.params;
    if (id < 0 || id >= users.length) {
        return res.status(404).json({message: 'User not found'});
    }

    const { name, age } = req.body;

    if (!name || name.length < 3) {
        return res.status(400).json({message: 'Name should have min 3 characters'});
    }

    if (age === undefined || age < 0) {
        return res.status(400).json({message: 'Age must be >0'});
    }

    users[+id] = req.body;
    writeUsersToFile();

    res.status(200).json({
        message: 'User updated',
        data: users[+id],
    })
})

app.delete('/users/:id', (req, res) => {
    const {id} = req.params;
    if (id < 0 || id >= users.length) {
        return res.status(404).json({message: 'User not found'});
    }
    users.splice(+id, 1);
    writeUsersToFile();
    res.status(200).json({
        message: 'User deleted',
    })
})

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT}`)
})

