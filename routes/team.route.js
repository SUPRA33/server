const express = require('express');
const teamController = require('../controllers/team.controller');
const teamSchema = require('../models/team');
const validator = require('../utils/validator');
const authValidator = require('../utils/auth');

const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        const teams = await teamController.getAll();
        if (!teams) {
            res.status(404).json();
        }
        res.status(200).json(teams);
    })
    .put(authValidator.isAdmin(), validator(teamSchema), async (req, res) => {
        const new_team = await teamController.add(req.body);

        if (!new_team) {
            res.status(404).json();
        }
        res.status(201).json(new_team);
    })
;

router.route('/:id')
    .get(async (req, res) => {
        const team = await teamController.getById(req.params.id);
        if (!team) {
            res.status(404).json();
        }
        res.status(200).json(team);
    })
    .patch(authValidator.isAdmin(), validator(teamSchema), async (req, res) => {
        const team = await teamController.update(req.params.id, req.body);
        if (!team) {
            res.status(404).json();
        }
        res.status(202).json(team);
    })
    .delete(authValidator.isAdmin(), async (req, res) => {
        const team = await teamController.remove(req.params.id);
        if (!team) {
            res.status(404).json();
        }
        res.status(202).json();
    })
;


module.exports = router;