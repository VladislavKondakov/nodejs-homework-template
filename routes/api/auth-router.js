import express from "express"

import  userSignupSchema  from "../../schemas/user-schemas.js"

import validateBody from "../../decorators/validateBody.js"

import authController from "../../controllers/auth-controller.js"

import {authenticate} from "../../middlewares/index.js"

const authRouter = express.Router()

authRouter.post("/signup",validateBody(userSignupSchema.userSignupSchema),authController.signup)

authRouter.post("/signin",validateBody(userSignupSchema.userSigninSchema),authController.signin)

authRouter.get("/current", authenticate, authController.getCurrent)

authRouter.post("/signout",authenticate,authController.signout)

export default authRouter
