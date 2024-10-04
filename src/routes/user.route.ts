import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/roles.middleware";

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Allow users to log in or register.
 *     description: Allow users to log in or register. If the user is an admin, they can access the admin route.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                  id:
 *                     type: integer
 *                     example: 1
 *                  email:
 *                     type: string
 *                     example: john@gmail.com
 *                  password:
 *                     type: string
 *                     example : password
 */

const userRoute = Router();

const userController = new UserController();

userRoute.post("/login", userController.loginUser);
userRoute.post("/register", userController.registerUser);
userRoute.get("/admin", verifyToken, roleMiddleware(["admin"]), userController.getAdminData);

export {userRoute};
