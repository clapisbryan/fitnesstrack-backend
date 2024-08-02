const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    name: {
        type: String,
        require: [true, 'name is required']
    },
    duration: {
        type: String,
        require: [true, 'duration is required']
    },
    status: {
        type: String,
        default: "pending"
    },
    dateAdded: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('Workout', workoutSchema);