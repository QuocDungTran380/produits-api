import { User } from "../interfaces/user.interface";
import fs from 'fs';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export class UserService {

    private static getData(): User[] {
        const data = fs.readFileSync("users.json", "utf-8");
        return JSON.parse(data);
    }

    private static writeData(usersList: User[]): void {
        const usersToWrite = JSON.stringify(usersList, null, 4);
        fs.writeFileSync("users.json", usersToWrite);
    }

    public static async registerUser(email: string, password: string): Promise<number> {
        const usersList = this.getData();
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (emailRegex.test(email) && !usersList.find(u => u.email == email)) {
            const newUser: User = {
                id: Math.floor(Math.random() * 100),
                email,
                password,
                perms: 2
            }
            usersList.push(newUser);
            this.writeData(usersList);
            return 1;
        } else {
            return 0;
        }
    }

    public static async loginUser(email: string, password: string): Promise<any> {
        const usersList = this.getData();
        const foundUser = usersList.find(u => {
            return u.email == email
        });
        if (foundUser && password == foundUser.password) {
            return jwt.sign({email: email, accountType: foundUser.perms}, "f49b9887eaf6064cc86938c5093c01a7b938eb3903d91df24cd6ab643184f2de");

        } else {
            return null;
        }
    }
}