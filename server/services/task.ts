import { Task } from "../models/taskModel"

const list = async () => {
    const tasks = await Task.find()
    return tasks
}

const create = async (name: string, userId: string) => {
    if (!name) {
        throw new Error('Email is required')
    }

    const newTask = new Task({
        name: name,
        user: userId
    })

    await newTask.save()

    return true;
}

export {
    list,
    create
}