const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const booksRoutes = require("./routes/book.routes");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/books", booksRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the Books API!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: { title: "Books API", version: "1.0.0" },
    },
    apis: ["./src/routes/*.js"],
};

const specs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;