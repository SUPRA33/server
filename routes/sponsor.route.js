const express = require('express');
const sponsorController = require('../controllers/sponsor.controller');

const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        const sponsors = await sponsorController.getAll();
        if (!sponsors) {
            res.status(404).json();
        }
        res.status(200).json(sponsors);
    })
    .put(async (req, res) => {
        const new_sponsor = await sponsorController.add(req.body);

        if (!new_sponsor) {
            res.status(404).json();
        }
        res.status(201).json(new_sponsor);
    })
;

router.route('/:id')
    .get(async (req, res) => {
        const sponsor = await sponsorController.getById(req.params.id);
        if (!sponsor) {
            res.status(404).json();
        }
        res.status(200).json(sponsor);
    })
    .patch(async (req, res) => {
        const sponsor = await sponsorController.update(req.params.id, req.body);
        if (!sponsor) {
            res.status(404).json();
        }
        res.status(202).json(sponsor);
    })
    .delete(async (req, res) => {
        const sponsor = await sponsorController.remove(req.params.id);
        if (!sponsor) {
            res.status(404).json();
        }
        res.status(202).json();
    })
;


module.exports = router;