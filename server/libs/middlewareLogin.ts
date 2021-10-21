import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { IUser } from '../types/IUser'
import { error } from './bindError'

declare global {
    namespace Express {
        interface Request {
            user: IUser
        }
    }
}

const isLogged = async (req: Request<any>, res: Response<any>, next: NextFunction) => {
    if (!req.headers.token) {
        return res.status(401).json({ message: 'Você não está logado' })
    }

    try {
        const payload = verify(req.headers.token.toString(), process.env.JWT_SECRET as string) as any

        req.user = payload

        next()
    } catch (err: any) {
        return error(res, err)
    }
}

export {
    isLogged
}