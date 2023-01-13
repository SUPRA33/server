const express = require('express');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/user.controller');
const loginSchema = require('../models/login');
const validator = require('../utils/validator');
const config = require('../config');

const router = express.Router();

router.route('/')
    .post(validator(loginSchema), async (req, res) => {
        
        // je crée la variable user qui fait appel à la fonction getByEmailAndPassword avec comme paramètres le corps de la requête.
        let user = await userController.getByEmailAndPassword(req.body);

        if (!user) {
            res.status(401).json({message: "La combinaison email/password est incorrecte."});
        } else {
            // si les identifiants sont corrects, je signe un JsonWebToken avec les informations dont j'ai besoin dans ce token
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                role: user.role
            }, config.jwtPassword, { expiresIn: config.jwtExpireLength });
            // je passe ce token dans le localstorage afin de rester identifié
            res.json({
                access_token: token
            });
        }
    })
;

module.exports = router;