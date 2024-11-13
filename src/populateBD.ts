import bcrypt from "bcryptjs";
import fs from "fs";
import { User } from "./interfaces/user.interface";
import { Product } from "./models/productSchema.model";

async function hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

// export const PopulateProducts = () => {
//     fetch('https://fakestoreapi.com/products')
//     .then(res => res.json())
//     .then(json => {
//         const modifiedProducts = json.map((product: Product) => ({
//             id: product.id,
//             title: product.title,
//             description: product.description,
//             category: product.category,
//             quantity: Math.floor(Math.random() * 100),
//             price: product.price
//         }))
//         const products = JSON.stringify(modifiedProducts, null, 4);
//         fs.writeFileSync('./database/products.json', products);
//     })
// }

export const PopulateProducts = () => {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => {
            try {
                json.map((product: any) => {
                    product = new Product({
                        id: product.id,
                        title: product.title,
                        description: product.description,
                        category: product.category,
                        quantity: Math.floor(Math.random() * 100),
                        price: product.price
                    })
                    product.save().then(() => console.log("Product fetched and saved to database"));
                })
            } catch (error) {
                console.log("Error fetching products: ", error);
            }
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