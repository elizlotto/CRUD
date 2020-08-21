const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
title: {type: String, require: true },
date: Date,
details: String

});

module.exports = mongoose.model('todo', todoSchema);