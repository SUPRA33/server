const express = require('express');
const userController = require('../controllers/user.controller');
const userShema = require('../models/user');
const validator = require('../utils/validator');
const authValidator = require('../utils/auth');


const router = express.Router();

router.route('/')
    .get(authValidator.isAdmin(), async (req, res) => {
        const users = await userController.getAll();
        if (!users) {
            res.status(404).json();
        }
        res.status(200).json(users);
    })
    .put(authValidator.isAdmin(), validator(userShema), async (req, res) => {

        const user = await userController.getByEmail(req.body);
        if (user) {
            res.status(400).json({message: "Un compte avec cet email existe déjà"});
        }

        else {
            const new_user = await userController.add(req.body);
            res.status(201).json(new_user);
        }
    })
;

router.route('/:id')
    .get(authValidator.isAdmin(), async (req, res) => {
        const user = await userController.getById(req.params.id);
        if (!user) {
            res.status(404).json();
        }
        res.status(200).json(user);
    })
    .patch(authValidator.isAdmin(), validator(userShema), async (req, res) => {
        const user = await userController.update(req.params.id, req.body);
        if (!user) {
            res.status(404).json();
        }
        res.status(202).json(user);
    })
    .delete(authValidator.isAdmin(), async (req, res) => {
        const user = await userController.remove(req.params.id);
        if (!user) {
            res.status(404).json();
        }
        res.status(202).json();
    })
;


module.exports = router;