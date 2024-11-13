import bcrypt from "bcryptjs";
import fs from "fs";
import { Product } from "./interfaces/product.interface";
import { User } from "./interfaces/user.interface";

async function hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

export const PopulateProducts = () => {
    fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => {
        const modifiedProducts = json.map((product: Product) => ({
            id: product.id,
            title: product.title,
            description: product.description,
            category: product.category,
            quantity: Math.floor(Math.random() * 100),
            price: product.price
        }))
        const products = JSON.stringify(modifiedProducts, null, 4);
        fs.writeFileSync('./database/products.json', products);
    })
}

export const PopulateUsers = () => {
    fetch('https://fakestoreapi.com/users')
    .then(res => res.json())
    .then(async json => {
        const modifiedUsers = await Promise.all(json.map(async (user: User) => ({
            id: user.id,
            email: user.email,
            password: await hashPassword(user.password),
            role: Math.floor(Math.random() * 2) == 0 ? "employe" : "admin"
        })))
        const adminUser: User = {
            id: 380,
            email: "admin@gmail.com",
            password: await hashPassword("admin"),
            role: "admin"
        }
        modifiedUsers.push(adminUser);
        const users = JSON.stringify(modifiedUsers, null, 4);
        fs.writeFileSync('./database/users.json', users);
    })
}