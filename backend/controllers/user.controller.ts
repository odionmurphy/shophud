import type { Request, Response } from "express"
import { User } from "../models/User.ts"

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.findAll()
  res.json({ data: users })
}
export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ msg: "email or password is missing" })
  }

  try {
    await User.create({ email, password })
    res.json({ data: "user successfully added" })
  } catch (error) {
    res.status(400).json({ msg: "failed to register user" })
  }
}
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findOne({ where: { email } })
  if (!user) {
    res.status(401).json({ msg: "bad user auth" })
  }

  if (user!.password !== password) {
    res.status(401).json({ msg: "bad user auth" })
  }

  res.json({ data: "user successfully logged in" })
}

export const getUser = (req: Request, res: Response) => {
  res.json({ data: "All our users..." })
}