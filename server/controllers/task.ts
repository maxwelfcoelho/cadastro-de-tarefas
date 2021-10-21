import { Request, Response } from 'express'
import * as task from '../services/task'

const list =  async (req: Request<any>, res: Response<any>) => {
    const tasks = await task.list()
    res.status(200).json(tasks)
}

export {
    list
}