const http = require('http');
const express = require('express');
const app = express();

let users = [{ name: 'Piet' }, { name: 'Jan' }, { name: 'Marie' }];

function log(req, res, next) {
    console.log(new Date(), req.method, req.url);
    next();
}
function welcome(req, res) {
    res.send('Hallo');
}
function listUsers(req, res) {
    res.send({ users: users });
}

function addUser(req, res) {
    let newUser = { name: req.body.name };
    users.push(newUser);
    res.send('User added');
}

app.use(express.json());
app.get('/users', listUsers);
app.post('/users', addUser);
app.use('/', welcome, log);

http.createServer(app).listen(3000, () => {
    console.log('Gestart op http://localhost:3000');
});