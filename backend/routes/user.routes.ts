import { Router } from "express"

import {
  createUser,
  getAllUsers,
  getUser,
  loginUser,
} from "../controllers/user.controller.ts"

export const userRouter = Router()

// everything runs through path "/users"
userRouter.route("/").get(getAllUsers)

userRouter.route("/register").post(createUser)
userRouter.route("/login").post(loginUser)

userRouter.route("/me").get(getUser)
