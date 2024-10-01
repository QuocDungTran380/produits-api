import fs from "fs";

const PopulateDB = () => {
    fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => {
        const modifiedProducts = json.map((product: any) => ({
            id: product.id,
            name: product.title,
            description: product.description,
            category: product.category,
            quantity: Math.floor(Math.random() * 100),
            price: product.price
        }))
        const products = JSON.stringify(modifiedProducts, null, 4);
        fs.writeFileSync('products.json', products);
    })
}
export default PopulateDB;