import { Router } from "express";
import { createUser, login } from "../controllers/usersController.js";
import { validateLogin } from "../middlewares/loginValidator.js";
import { validateUser } from "../middlewares/usersValidator.js";

const userRouter = Router();

userRouter.post('/signup', validateUser, createUser)
userRouter.post('/signin', validateLogin, login)

export default userRouter;