const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const booksRoutes = require("./routes/book.routes");

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

module.exports = app;