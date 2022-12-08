const express = require('express');
const contactController = require('../controllers/contact.controller');
const contactSchema = require('../models/contact');
const validator = require('../utils/validator');
const authValidator = require('../utils/auth');

const router = express.Router();

router.route('/')
    .get(authValidator.isAdmin(), async (req, res) => {
        const contacts = await contactController.getAll();
        if (!contacts) {
            res.status(404).json();
        }
        res.status(200).json(contacts);
    })
    .put(validator(contactSchema), async (req, res) => {
        const new_contact = await contactController.add(req.body);

        if (!new_contact) {
            res.status(404).json();
        }
        res.status(201).json(new_contact);
    })
;

router.route('/:id')
    .get(authValidator.isAdmin(), async (req, res) => {
        const contact = await contactController.getById(req.params.id);
        if (!contact) {
            res.status(404).json();
        }
        res.status(200).json(contact);
    })
    .delete(authValidator.isAdmin(), async (req, res) => {
        const contact = await contactController.remove(req.params.id);
        if (!contact) {
            res.status(404).json();
        }
        res.status(202).json();
    })
;


module.exports = router;