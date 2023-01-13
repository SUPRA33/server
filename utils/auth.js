const config = require('../config');
const jwt = require('jsonwebtoken');

const isAdmin = () => {
    return (req, res, next) => {
        const header = req.headers.authorization;
        if (!header) {
            res.status(403).json({message: "Vous devez être administrateur pour accéder à cette requette."});
        }
        // Je split l'authorization afin de garder que le token
        const cryptedToken = header.split(" ")[1];

        // Je vérifie que le token soit signé par le jwtPassword défini dans config.json
        jwt.verify(cryptedToken, config.jwtPassword, (err, decodedToken) => {
            if (err) {
                res.status(401).json({message: "Token invalide"});
            }
            else {
                if (decodedToken.role === "admin") {
                    req.auth = decodedToken;
                    next();
                } else {
                    res.status(403).json({message: "Vous devez être administrateur pour accéder à cette requette."});
                }
            } 
        });
    }
};

module.exports = {
    isAdmin
};