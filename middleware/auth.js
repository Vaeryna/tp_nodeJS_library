const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "RANDOM TOKEN SECRET");
        const userID = decodedToken.userID;

        if (req.body.userID && req.body.userID !== userID) {
            throw "Ivalid user ID";
        } else {
   next()
        }
    } catch {
        res.status(401).json({error: new Error("Invalid request")});
    }
};
