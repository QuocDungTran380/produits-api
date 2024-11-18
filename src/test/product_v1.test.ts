import jwt from "jsonwebtoken";
import app from "../app";
import supertest from "supertest";
import { config } from "../utils/config";

const request = supertest(app);


const token = jwt.sign({ email: "test@gmail.com", accountType: "admin"}, config.JWT_SECRET);

describe("Test v1 products", () => {
    describe("GET /v1/products", () => {
        it("should return a list of products", async () => {
            const res = await request
            .get('/v1/products')
            .set('Authorization', 'Bearer ' + token);
            expect(res.status).toBe(200);
        })
    })

    describe("POST /v1/products", () => {
      it("should add a new product", async () => {
        const res = await request
        .post('/v1/products')
        .set('Authorization', 'Bearer ' + token)
        .send({
            title: "test",
            description: "test",
            category: "test",
            quantity: 1,
            price: 1
        });
        expect(res.status).toBe(201);
      })
    })

    describe("PUT /v1/products/:id", () => {
      it ("should modify a product", async () => {
        const res = await request
        .put('/v1/products/1')
        .set('Authorization', 'Bearer ' + token)
        .send({
            title: "test",
            description: "test",
            quantity: 2,
            price: 2
        });
        expect(res.status).toBe(200);
      })
    })

    describe("DELETE /v1/products/:id", () => {
      it ("should delete a product", async () => {
        const res = await request
        .delete('/v1/products/1')
        .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(204);
      })
    })
})