import * as bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { IUser } from '../types/IUser'
import { User } from '../models/userModel'

const register = async (user: IUser) => {
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

const login = async (user: IUser) => {
    if (!user.email) {
        throw new Error('The email is required')
    }

    if (!user.password) {
        throw new Error('The password is required')
    }

    const foundUser = await User.findOne({ email: user.email })
    if (!foundUser) {
        throw new Error('Email or password does not match')
    }

    const isPasswordEquals = await bcrypt.compare(user.password, foundUser.password)
    if (!isPasswordEquals) {
        throw new Error('Email or password does not match')
    }

    const token = sign({ 
        userId: foundUser._id, 
        name: foundUser.name, 
        email: foundUser.email 
    }, process.env.JWT_SECRET as string)

    return { token }
}

export {
    register,
    login
}