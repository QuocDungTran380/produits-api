import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/roles.middleware";
import { sqlInjectionDetector } from "../middlewares/sql.middleware";

const userRoute = Router();

const userController = new UserController();

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Allow users to log in or register
 *     description: Allow users to log in and stores an access token in the header
 *     tags:
 *      - Users
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
 *                 role:
 *                   type: string
 *                   example: "admin"
 *       401:
 *         description: Email or password invalid. User have entered the wrong email or password combination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email or password invalid
 */

userRoute.post("/login", sqlInjectionDetector, userController.loginUser);



/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Allow a new user to register as a employee.
 *     tags:
 *      - Users
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *       400:
 *         description: Email invalid/already exists. User have entered a wrong email format or an already used email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email invalid/already exists
 */

userRoute.post("/register", sqlInjectionDetector, userController.registerUser);
userRoute.get("/admin", sqlInjectionDetector, verifyToken, roleMiddleware(["admin"]), userController.getAdminData);

export { userRoute };
