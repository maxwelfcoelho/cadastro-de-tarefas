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

const remove = async (req: Request<any>, res: Response<any>) => {
    try {
        const id = req.params.id

        await task.remove(id)

        res.status(200).json({ message: 'Deleted the task successfully' })
    } catch (err: any) {
        return error(res, err)
    }
}

const update = async (req: Request<any>, res: Response<any>) => {
    try {
        const id = req.body.id
        const name = req.body.name

        await task.update({id, name})

        return res.status(200).json({ message: 'Updated successfully' })

    } catch (err: any) {
        return error(res, err)
    }
}

const setComplete = async (req: Request<any>, res: Response<any>) => {
    try {
        const id = req.params.id

        await task.setComplete(id)

        res.status(200).json({ message: "Toogle completed successfully" })
    } catch (err: any) {
        return error(res, err)
    }
}

export {
    list,
    create,
    remove,
    update,
    setComplete
}