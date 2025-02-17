import { User } from "../models/index.js";

import bcrypt from "bcryptjs"

import jwt from "jsonwebtoken"

import "dotenv/config"

import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const {JWT_SECRET} = process.env

const signup = async (req, res) => {
    const {password,email} = req.body
    const user = await User.findOne({email})
    if (user) {
        throw HttpError(409,"Email in use")
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({...req.body, password: hashPassword})
    res.status(201).json({
        email: newUser.email,
        
    })
    console.log(newUser.name)
}



const signin = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        throw HttpError(401, "email or password invalid")
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
     if (!passwordCompare) {
        throw HttpError(401, "email or password invalid")
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload,JWT_SECRET, {expiresIn: "24h"})

    await User.findByIdAndUpdate(user._id, {token})
    res.json({
        token,
    })
}

const getCurrent = (req, res) => {
    const { name, email } = req.user
    
    res.json({
        name,
        email,
    })
}

const signout = async (req, res) => {
    const { _id } = req.user
    await User.findByIdAndUpdate(_id, { token: "" })
    
    res.json({
        message:"Signout success"
    })
}

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout)
} 