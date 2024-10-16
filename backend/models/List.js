const mongoose = require('mongoose');
const { Schema } = mongoose;

const ListSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tasks: [{
        title: {
            type: String,
            required: true
        }
    }]
}, {timestamps: true});

const List = mongoose.model('List', ListSchema);

module.exports = List;