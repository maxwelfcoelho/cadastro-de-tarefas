import { Task } from "../models/taskModel"

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

export {
    list,
    create,
    remove
}