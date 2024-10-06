import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/roles.middleware";

const userRoute = Router();

const userController = new UserController();

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Allow users to log in or register
 *     description: Allow users to log in and stores an access token in the header
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: admin
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "[Access token]"
 *       401:
 *         description: Email or password invalid.
 */

userRoute.post("/login", userController.loginUser);



/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Allow a new user to register as a employee.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: swaggertest@gmail.com
 *               password:
 *                 type: string
 *                 example: password
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Email invalid.
 */

userRoute.post("/register", userController.registerUser);
userRoute.get("/admin", verifyToken, roleMiddleware(["admin"]), userController.getAdminData);

export {userRoute};
