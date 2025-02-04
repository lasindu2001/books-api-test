const books = require("../models/book.model");

// Get all books
exports.getAllBooks = (req, res) => {
    res.json(books);
};

// Get book by ID
exports.getBookById = (req, res) => {
    const book = books.find((b) => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
};

// Add new book
exports.addBook = (req, res) => {
    const { name, author, publishedYear } = req.body;
    const newBook = { id: books.length + 1, name, author, publishedYear };
    books.push(newBook);
    res.status(201).json(newBook);
};

// Update book
exports.updateBook = (req, res) => {
    const book = books.find((b) => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });

    const { name, author, publishedYear } = req.body;
    book.name = name || book.name;
    book.author = author || book.author;
    book.publishedYear = publishedYear || book.publishedYear;

    res.json(book);
};

// Delete book
exports.deleteBook = (req, res) => {
    const index = books.findIndex((b) => b.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Book not found" });

    books.splice(index, 1);
    res.json({ message: "Book deleted successfully" });
};