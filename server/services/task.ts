import { Task } from "../models/taskModel"
import { ITask } from "../types/ITask"

const list = async (userId: string) => {
    const tasks = await Task.find({ user: userId })
    return tasks
}

const create = async (name: string, userId: string) => {
    if (!name) {
        throw new Error('name is required')
    }

    const newTask = new Task({
        name: name,
        user: userId
    })

    await newTask.save()

    return true;
}

const remove = async (id: string) => {
    if (!id) {
        throw new Error('Id is required')
    }

    await Task.findByIdAndRemove(id)

    return true;
}

const update = async (task: ITask) => {
    if (!task.id) {
        throw new Error('Id is required')
    }

    if (!task.name) {
        throw new Error('Name is required')
    }

    await Task.findOneAndUpdate({ _id: task.id }, {name: task.name})

    return true
}

const setComplete = async (id: string) => {
    if (!id) {
        throw new Error('Id is required')
    }

    const foundTask = await Task.findById({ _id: id })
    if (!foundTask) {
        throw new Error('Task not found')
    }
    foundTask.completed = !foundTask.completed
    await foundTask.save()

    return true
}

export {
    list,
    create,
    remove,
    update,
    setComplete
}