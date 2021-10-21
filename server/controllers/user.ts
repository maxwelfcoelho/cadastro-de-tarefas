import { Request, Response } from 'express'

import * as user from '../services/user'
import { error } from '../libs/bindError'

const register =  async (req: Request<any>, res: Response<any>) => {
    try {
        const name: string = req.body.name;
        const email: string = req.body.email;
        const password: string = req.body.password;

        await user.register({name, email, password})

        return res.status(200).json({ message: 'User created sucessfully' });
    } catch (err: any) {
        return error(res, err)
    }
}

export {
    register
}