import * as bcrypt from 'bcrypt'

import { IUser } from '../types/IUser'
import { User } from '../models/userModel'
import { connect } from '../libs/mongodb'

const register = async (user: IUser) => {
    await connect()

    if (!user.name) {
        throw new Error('The name is required')
    }

    if (!user.email) {
        throw new Error('The email is required')
    }

    if (!user.password) {
        throw new Error('The password is required')
    }

    const foundUser = await User.findOne({ email: user.email })
    if (foundUser) {
        throw new Error('Email is already registered')
    }

    const encryptedPassword: string = await bcrypt.hash(user.password, 10)
    user.password = encryptedPassword;

    const newUser = new User(user)
    await newUser.save()

    return true;
}

export {
    register
}