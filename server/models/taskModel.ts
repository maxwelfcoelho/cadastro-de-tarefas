import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const Task = mongoose.model('tasks', taskSchema)

export { Task }