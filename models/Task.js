const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    objectDate: {
        type: Date,
        default: Date.now(),
        required: true
    },
    reminder: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Tasks', TaskSchema);