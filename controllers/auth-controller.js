import { User } from "../models/index.js";

import bcrypt from "bcryptjs"

import jwt from "jsonwebtoken"

import "dotenv/config"

import { HttpError ,sendEmail} from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const { JWT_SECRET,BASE_URL } = process.env

import { nanoid } from "nanoid";

const signup = async (req, res) => {
    const {password,email} = req.body
    const user = await User.findOne({email})
    if (user) {
        throw HttpError(409,"Email in use")
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const verificationToken = nanoid()
    const newUser = await User.create({ ...req.body, password: hashPassword, verificationToken })
    
    const verifyemail = { 
        to: email,
        subject: "verify email",
        html:`<a href="${BASE_URL}/api/auth/verify/${verificationToken}" target="_blank">Click</a>`
    }
    
    await sendEmail(verifyemail)

    res.status(201).json({
        email: newUser.email,
        
    })
    console.log(newUser.name)
}

const verify = async (req, res) => {
    const { verificationToken } = req.params
    const user = User.findOne({ verificationToken })
    if (!user) {
        throw HttpError(404, "User not found")
    }

    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: "" })
    
    res.json({
        message: "Verify success"
    })
}

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        throw HttpError(404,"User not found")
    }
    if (user.verify) {
        throw HttpError(400,"Email already verify")
    }
    const verifyemail = { 
        to: email,
        subject: "verify email",
        html:`<a href="${BASE_URL}/api/auth/verify/${user.verificationToken}" target="_blank">Click</a>`
    }

    await sendEmail(verifyemail)

    res.json({
        message:"Email resend"
    })

}

const signin = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        throw HttpError(401, "email or password invalid")
    }

    if (!user.verify) {
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
    verify: ctrlWrapper(verify),
    signin: ctrlWrapper(signin),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout)
} 