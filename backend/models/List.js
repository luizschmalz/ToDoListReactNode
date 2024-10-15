const mongoose = require('mongoose');
const { Schema } = mongoose;

const {TaskSchema} = require('./Task')

const ListSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    services: {
        type : [TaskSchema],
    },
}, {timestamps: true});

const List = mongoose.model('List', ListSchema);

module.exports= List;