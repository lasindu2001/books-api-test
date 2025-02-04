const request = require("supertest");
const app = require("../app");

describe("Books API", () => {
    it("should fetch all books", async () => {
        const res = await request(app).get("/api/books");
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it("should create a book", async () => {
        const res = await request(app)
            .post("/api/books")
            .send({ name: "New Book", author: "New Author", publishedYear: 2023 });
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe("New Book");
    });
});