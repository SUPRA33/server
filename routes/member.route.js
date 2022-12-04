const express = require('express');
const memberController = require('../controllers/member.controller');

const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        const members = await memberController.getAll();
        if (!members) {
            res.status(404).json();
        }
        res.status(200).json(members);
    })
    .put(async (req, res) => {
        const new_member = await memberController.add(req.body);

        if (!new_member) {
            res.status(404).json();
        }
        res.status(201).json(new_member);
    })
;

router.route('/:id')
    .get(async (req, res) => {
        const member = await memberController.getById(req.params.id);
        if (!member) {
            res.status(404).json();
        }
        res.status(200).json(member);
    })
    .patch(async (req, res) => {
        const member = await memberController.update(req.params.id, req.body);
        if (!member) {
            res.status(404).json();
        }
        res.status(202).json(member);
    })
    .delete(async (req, res) => {
        const member = await memberController.remove(req.params.id);
        if (!member) {
            res.status(404).json();
        }
        res.status(202).json();
    })
;


module.exports = router;