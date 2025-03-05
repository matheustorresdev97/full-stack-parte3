import { UserController } from "@/controllers/user-controller";
import { Router } from "express";



const userRoutes = Router()
const usersControllers = new UserController()

userRoutes.post("/", usersControllers.create)

export { userRoutes }