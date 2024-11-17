import supertest from "supertest";
import app from "../app";
import jwt from "jsonwebtoken";
import { config } from "../utils/config";

const request = supertest(app);

const adminToken = jwt.sign({ email: "admin@gmail.com", accountType: "admin" }, config.JWT_SECRET);
const employeeToken = jwt.sign({ email: "employee@gmail.com", accountType: "employe" }, config.JWT_SECRET);
const expiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImFjY291bnRUeXBlIjoiYWRtaW4iLCJpYXQiOjE3MzE4MDAzMDEsImV4cCI6MTczMTgwMDMyMX0.hyYp70LF-ZzhvL2enDk0bUKDQJJh8NanqjDfU_e4suM";

describe("Test employee access", () => {
    describe("GET /users/admin", () => {
        it("should return a 403 status", async () => {
            const res = await request
                .get('/users/admin')
                .set('Authorization', 'Bearer ' + employeeToken);
            expect(res.status).toBe(403);
        })
    })
});

describe("Test employee permissions", () => {
    describe("DELETE /v1/products/:id", () => {
        it("should return a 403 status", async () => {
            const res = await request
                .delete('/v1/products/7')
                .set('Authorization', 'Bearer ' + employeeToken);
            expect(res.status).toBe(403);
        })
    })
})

describe("Test admin access", () => {
    describe("GET /users/admin", () => {
        it("should get admin data", async () => {
            const res = await request
                .get('/users/admin')
                .set('Authorization', 'Bearer ' + adminToken);
            expect(res.body).toStrictEqual({ message: 'Administrateur connecté: données réservées aux administrateurs.' });
        })
    })
})

describe("Test admin permissions", () => {
    describe("DELETE /v1/products/:id", () => {
        it("should delete a product", async () => {
            const res = await request
                .delete('/v1/products/7')
                .set('Authorization', 'Bearer ' + adminToken);
            expect(res.status).toBe(204);
        })
    })
})

describe("Test expired token", () => {
    describe("GET /v1/products", () => {
        it("should return a 401 status", async () => {
            const res = await request
                .get('/v1/products')
                .set('Authorization', 'Bearer ' + expiredToken);
            expect(res.status).toBe(401);
        })
    })
})



