const express = require("express");
const { body, validationResult } = require("express-validator");
const { getAllBooks, getBookById, addBook, updateBook, deleteBook } = require("../controllers/book.controller");

const router = express.Router();

const validateBook = [
    body("name").notEmpty().withMessage("Name is required"),
    body("author").notEmpty().withMessage("Author is required"),
    body("publishedYear")
        .isInt({ min: 1000, max: new Date().getFullYear() })
        .withMessage("Published year must be valid"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", validateBook, addBook);
router.put("/:id", validateBook, updateBook);
router.delete("/:id", deleteBook);

module.exports = router;