const express = require('express');
const resultController = require('../controllers/result.controller');
const resultSchema = require('../models/result');
const validator = require('../utils/validator');
const authValidator = require('../utils/auth');

const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        const results = await resultController.getAll();
        if (!results) {
            res.status(404).json();
        }
        res.status(200).json(results);
    })
    .put(authValidator.isAdmin(), validator(resultSchema), async (req, res) => {
        const new_result = await resultController.add(req.body);

        if (!new_result) {
            res.status(404).json();
        }
        res.status(201).json(new_result);
    })
;

router.route('/:id')
    .get(async (req, res) => {
        const result = await resultController.getById(req.params.id);
        if (!result) {
            res.status(404).json();
        }
        res.status(200).json(result);
    })
    .patch(authValidator.isAdmin(), validator(resultSchema), async (req, res) => {
        const result = await resultController.update(req.params.id, req.body);
        if (!result) {
            res.status(404).json();
        }
        res.status(202).json(result);
    })
    .delete(authValidator.isAdmin(), async (req, res) => {
        const result = await resultController.remove(req.params.id);
        if (!result) {
            res.status(404).json();
        }
        res.status(202).json();
    })
;


module.exports = router;