const express = require('express');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/user.controller');
const loginSchema = require('../models/login');
const validator = require('../utils/validator');
const config = require('../config');

const router = express.Router();

router.route('/')
    .post(validator(loginSchema), async (req, res) => {
        
        let user = await userController.getByEmailAndPassword(req.body);

        if (!user) {
            res.status(401).json({message: "La combinaison email/password est incorrecte."});
        } else {
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                roles: user.role
            }, config.jwtPassword, { expiresIn: config.jwtExpireLength });
    
            res.json({
                access_token: token
            });
        }
    })
;

module.exports = router;