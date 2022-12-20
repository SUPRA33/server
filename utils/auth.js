const config = require('../config');
const jwt = require('jsonwebtoken');

const isAdmin = () => {
    return (req, res, next) => {
        const header = req.headers.authorization;
        if (!header) {
            res.status(403).json({message: "Vous devez être administrateur pour accéder à cette requette."});
        }

        const cryptedToken = header.split(" ")[1];

        jwt.verify(cryptedToken, config.jwtPassword, (err, decodedToken) => {
            if (err) {
                res.status(401).json({message: "Token invalide"});
            }
            else {
                decodedToken.role === 'admin'
                req.auth = decodedToken;
                next();
            }  
        });
    }
};

module.exports = {
    isAdmin,
};