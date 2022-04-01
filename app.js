const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const path = require("path");

const cookieParser = require("cookie-parser");
const auth = require('./middleware/auth')


mongoose
    .connect("mongodb://localhost/books")
    .then(() => {
        console.log("Connected to Mongo DB courses :)");
    })
    .catch((err) => console.log("Error :("));

//Routes
const bookRoutes = require("./routes/books");
const userRoutes = require("./routes/users");

//Middlewares
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));


app.use(cookieParser())


//Mongoose storage
const store = new MongoDBStore({
    uri: "mongodb://localhost/books", //mpongo url
    collection: "mySessions",
});

//catch errors
store.on("error", function (error) {
    console.log(error);
});

//session middleware
app.use(
    session({
        secret: "keyboard cat",
        resave: false, //force la session a être save pour chaque demande de client
        saveUninitialized: false,
        cookie: {expires: 60 * 1000},
        store: store,
    })
);

app.get((req, res) => {
    req.session.isAuth = true;
    res.end();
});

/*app.get('/set-cookie', (req, res) => {
    res.cookie('set-cookie', 'Auth=true')
    res.cookie('Auth', 'true')
    res.cookie('Token', 'aaipidjapziK', {httpOnly: true}) //http only permet de pas acceder à l'info via la console
    res.send('u get it')

})*/

//app use route
app.use(bookRoutes.routes);
app.use("/user", userRoutes.routes);

app.listen(3000, () => {
    console.log("serveur démarré sur le port 3000");
});
