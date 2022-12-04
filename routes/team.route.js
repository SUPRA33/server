const express = require('express');
const teamController = require('../controllers/team.controller');

const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        const teams = await teamController.getAll();
        if (!teams) {
            res.status(404).json();
        }
        res.status(200).json(teams);
    })
    .put(async (req, res) => {
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
    .patch(async (req, res) => {
        const team = await teamController.update(req.params.id, req.body);
        if (!team) {
            res.status(404).json();
        }
        res.status(202).json(team);
    })
    .delete(async (req, res) => {
        const team = await teamController.remove(req.params.id);
        if (!team) {
            res.status(404).json();
        }
        res.status(202).json();
    })
;


module.exports = router;