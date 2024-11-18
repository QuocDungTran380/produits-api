import app from '../app';
import supertest from 'supertest';

const request = supertest(app);

const employeInfo = {
    email: "employe@gmail.com",
    password: "employe"
}

describe("Test user signup", () => {
    describe("POST /users/register", () => {
        it("should signup a user", async () => {
            const res = await request
            .post('/v1/users/register')
            .send(employeInfo);
            expect(res.status).toBe(201);
        })
    })
})

describe("Test user login", () => {
    describe("POST /users/login", () => {
        it("should login a user", async () => {
            const res = await request
            .post('/v1/users/login')
            .send(employeInfo);
            expect(res.status).toBe(200);
        })
    })
})