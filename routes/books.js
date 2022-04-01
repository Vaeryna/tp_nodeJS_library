const express = require("express");
const router = express.Router();

const path = require("path");

const bookController = require("../controllers/book");

const auth = require("../middleware/auth");

router.get("/", bookController.getBooks);
router.get("/deleteOne/:id",  bookController.deleteOneBook);

router.get("/addBook", bookController.addBookForm);
router.post("/addBook/newBook",  bookController.addBook);

router.get("/editBook/:id",  bookController.editBookForm);
router.post("/updateBook/:id",  bookController.editBook);

module.exports.routes = router;
