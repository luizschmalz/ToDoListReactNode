const { type } = require('microsoft-cognitiveservices-speech-sdk/distrib/lib/src/common.speech/SpeechServiceConfig');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = {
    Task,
    TaskSchema,
}
