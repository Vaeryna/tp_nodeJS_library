const BookSchema = require("../models/Book");

const mongoose = require("mongoose");

const Book = mongoose.model("Book", BookSchema);

exports.getBooks = (req, res, next) => {
    const findAll = async () => {
        const books = await Book.find();
        // console.log("a", books);
        res.render("catalog.ejs", {
            books: books,
            title: "Catalogue",
            activedCatalog: "active",
            activedAdd: "",
            activedUser: "",
        });
    };
    findAll();
};

exports.getOneBook = (req, res, next) => {
    console.log("j'ai récup the livre avec l'id", req.params);
    const findOne = async (id) => {
        const books = await Book.find().where("id").equals(id);
        console.log("a filtre", books);
        //  res.render("catalog.ejs", { books: books });
    };
    findOne(req.params);
    next();
};

exports.deleteOneBook = (req, res, next) => {
    const deleteOne = async (id) => {
        const result = await Book.deleteOne({_id: id});
        console.log("deleteOne", result);
    };
    deleteOne(req.params.id);
    res.redirect("/");
    next();
};

exports.editBookForm = (req, res, next) => {
    console.log("id", req.params.id);

    const form = async (id) => {
        const books = await Book.find({_id: id});
        console.log("a filtre", books, typeof books);

        const books2 = Object.values(books);
        console.log("book title", books2[0].title);

        res.render("editBook.ejs", {
            title: "Editer un livre",
            activedCatalog: "",
            activedAdd: "",
            bookTitle: books2[0].title,
            bookAuthor: books2[0].author,
            bookDescription: books2[0].description,
            bookId: books2[0].id,
        });
        console.log(
            "book ",
            books2[0].title,
            " - ",
            books2[0].author,
            " - ",
            books2[0].id
        );
    };
    form(req.params.id);
};

exports.editBook = (req, res, next) => {
    console.log("EDIT book", req.params.id, req.body.title, req.body.author);

    const update = async (id, title, author, description) => {
        const book = await Book.findByIdAndUpdate(id, {
            title: title,
            author: author,
            description: description,
        });
        console.log("editBook", book);
    };
    update(req.params.id, req.body.title, req.body.author, req.body.description);
    res.redirect("/");
};

exports.addBook = (req, res, next) => {
    console.log("je poste des trucs", req.body);

    const addBook = async (book) => {
        const a = await Book.create(book);
        console.log("addbook", a);
    };
    addBook(req.body);
    res.redirect("/");
    next();
};

exports.addBookForm = (req, res, next) => {
    res.render("addBook.ejs", {
        title: "Ajouter un livre",
        activedCatalog: "",
        activedAdd: "active",
        activedUser: "",
    });
};
