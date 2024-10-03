import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userRoute = Router();

const userController = new UserController();

userRoute.post("/login", userController.loginUser);
userRoute.post("/register", userController.registerUser);

export {userRoute};
