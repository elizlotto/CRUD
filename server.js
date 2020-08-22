const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const mongoose = require('mongoose');
const controllers = require('./controllers.js');

const DB_URI = 'mongodb+srv://codesmith123:bonjay123@assessment.da6rd.mongodb.net/assessmentDB?retryWrites=true&w=majority';
//lets mongoose know where the DB api is
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//connecting to DB
mongoose.connection.once('open', () => {
    console.log('Connected to database.');
});

//parse json data
app.use(express.json());

//statically serve a page
app.use(express.static('public'));

//get route for finding all. 
app.get('/todo', controllers.getAll, (req, res) => {
       console.log(res.locals.todos);
    res.status(200)
        .set('Content-type', 'application/json')
        .json(res.locals.todos);
});


app.get('/todo', controllers.findOne, (req, res) => {
    res.status(200)
        .set('Content-type', 'application/json')
        .json(res.locals.todos);
});

//Create todo and save to database
app.post('/todo', controllers.create, (req, res) => {
    res.status(201)
        .set('Content-type', 'application/json')
        .json(res.locals.todos);
});

//create the update router 


app.put('/todo', controllers.update, (req, res) => {
    res.status(200)
        .set('Content-type', 'application/json')
        .json(res.locals.todos);
});

app.delete('/todo', controllers.delete, (req, res) => {
    res.status(200)
        .set('Content-type', 'application/json')
        .json('Successfully deleted');
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.`);
});
