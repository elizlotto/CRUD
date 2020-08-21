const todo = require('./model.js');

const controllers = {};

//controller to get all in the db
controllers.getAll = (req, res, next) => {
    todo.find({}, (err, todos) => {
        if (err) {
            return res.status(418).json('failed to find', err);
        }
        res.locals.todos = todos;
        return next();
    });
};

//finding just one todo. 
controllers.findOne = (req, res, next) => {
    const { title } = req.query;
    todo.findOne({ title }, (err, todos) => {
        if (err) return res.status(418).json('failed to find', err);
        res.locals.todos = todos;
        return next();
    })
};

//Create todo and save to database
controllers.create = (req, res, next) => {
    const { title, date, details } = req.body;

    if (!title || !date) {
        return res.status(400).json('Missing information');
    }

    todo.create({ title, date, details }, (err, todo) => {
        if (err) return res.status(418).json('failed to create todo item', err);
        res.locals.todos = todo;
        return next();
    });
};

//update a todo
controllers.update = (req, res, next) => {
    const { search } = req.params;
    const { title, date, details } = req.body;
    todo.findOneAndUpdate({ title: search }, { title, date, details }, {new: true}, (err, todos) => {
        if (err) return res.status(418).json('failed to update todo item', err);
        res.locals.todos = todos;
        return next();
    });
};

//deleting a tdo
controllers.delete = (req, res, next) => {
    const { title } = req.body;
    todo.findOneAndRemove({title}, (err, todo) => {
        if (err) return res.status(418).json('failed to delete todo item', err);
        return next();
    });
};


module.exports = controllers;