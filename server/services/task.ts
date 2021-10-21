import { Task } from "../models/taskModel"

const list = async () => {
    const tasks = await Task.find()
    return tasks
}

export {
    list
}