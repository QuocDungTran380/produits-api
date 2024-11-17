import supertest from "supertest";
import app from "../app";

const request = supertest(app)

const SQLTest = {
    email: "employe@gmail.com",
    password: "'OR 1=1--"
}

describe("Test SQL injection", () => {
    describe("POST /users/login", () => {
        it("should protect against SQL injections", async () => {
            const res = await request
                .post('/v1/users/login')
                .send(SQLTest);
            expect(res.status).toBe(400);
            expect(res.body).toStrictEqual({ message: "Potential SQL Injection detected." });
        })
    })
})