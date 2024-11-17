import bcrypt from 'bcryptjs';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { User } from "../interfaces/user.interface";
import { config } from '../utils/config';

export class UserService {

    private static getData(): User[] {
        const data = fs.readFileSync("./database/users.json", "utf-8");
        return JSON.parse(data);
    }

    private static writeData(usersList: User[]): void {
        const usersToWrite = JSON.stringify(usersList, null, 4);
        fs.writeFileSync("./database/users.json", usersToWrite);
    }

    public static async registerUser(email: string, password: string): Promise<number> {
        const usersList = this.getData();
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (emailRegex.test(email) && !usersList.find(u => u.email == email)) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser: User = {
                id: Math.floor(Math.random() * 100),
                email,
                password: hashedPassword,
                role: "employee"
            }
            usersList.push(newUser);
            this.writeData(usersList);
            return 1;
        } else {
            return 0;
        }
    }

    public static async loginUser(email: string, password: string): Promise<any> {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!emailRegex.test(email)) {
            return null;
        }
        const usersList = this.getData();
        const foundUser = usersList.find(u => {
            return u.email == email
        });
        if (foundUser && await bcrypt.compare(password, foundUser.password)) {
            const token = jwt.sign({ email, accountType: foundUser.role }, config.JWT_SECRET, { expiresIn: '20s' });
            return { token, role: foundUser.role };
        } else {
            return null;
        }
    }
}