const UserSchema = require("../models/User");

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/User");

const jwt = require("jsonwebtoken");

exports.signupForm = (req, res, next) => {
    res.render("addUser.ejs", {
        title: "Ajouter un utilisateur",
        activedCatalog: "",
        activedAdd: "",
        activedUser: "active",
    });
};

exports.loginForm = (req, res, next) => {
    res.render("login.ejs", {
        title: "Connexion",
        activedCatalog: "",
        activedAdd: "",
        activedUser: "active",
    })
    console.log('loginForm')
}

exports.signup = (req, res, next) => {
    console.log("sign up");

    const addUser = async (user) => {
        await User.create(user);
    };

    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
            email: req.body.email,
            password: hash,
        });
        user;
        //    .save()
        addUser(user)
            .then(() => res.status(201).json({message: "Utilisateur créé"}))
            .catch((error) => res.status(400).json({error}));
    });
    res.render({message: "sign up ok"})
};

exports.login = (req, res, next) => {
    console.log("login");
    User.findOne({email: req.body.email})
        .then((user) => {
            if (!user) {
                return res.status(401).json({error: "Utilisateur non trouvé"});
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({error: "Mot de passe incorrect"});
                    } else {
                        let token = {
                            userID: user._id,
                            token: jwt.sign(
                                {
                                    userID: user._id,
                                },
                                "RANDOM TOKEN SECRET",
                                {expiresIn: "24h"}
                            ),
                        }
                        console.log("toekn", token.token)
                        res.cookie("Token", token.token)
                        res.status(200).json(token);
                    }
                })
                .catch((error) => res.status(500).json({error}));
        })
        .catch((error) => res.status(500).json({error}));

    res.redirect("/")
};
