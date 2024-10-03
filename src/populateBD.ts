import fs from "fs";
import { Product } from "./interfaces/product.interface";
import { User } from "./interfaces/user.interface";

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
        fs.writeFileSync('products.json', products);
    })
}

export const PopulateUsers = () => {
    fetch('https://fakestoreapi.com/users')
    .then(res => res.json())
    .then(json => {
        const modifiedUsers = json.map((user: User) => ({
            id: user.id,
            email: user.email,
            password: user.password,
            perms: Math.floor(Math.random() * 2)
        }))
        const users = JSON.stringify(modifiedUsers, null, 4);
        fs.writeFileSync('users.json', users);
    })
}