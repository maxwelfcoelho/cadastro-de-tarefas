import { Request, Response } from 'express'
import { error } from '../libs/bindError'
import * as task from '../services/task'

const list =  async (req: Request<any>, res: Response<any>) => {
    const userId = req.user.userId
    const tasks = await task.list(userId)
    res.status(200).json(tasks)
}

const create = async (req: Request<any>, res: Response<any>) => {
    try {
        const name = req.body.name
        const userId = req.user.userId

        await task.create(name, userId)

        res.status(200).json({ message: 'Task created sucessfully' })
    } catch (err: any) {
        return error(res, err)
    }
}

export {
    list,
    create
}