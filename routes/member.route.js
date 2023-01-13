const express = require('express');
const memberController = require('../controllers/member.controller');
const memberSchema = require('../models/member');
const validator = require('../utils/validator');
const authValidator = require('../utils/auth');
const jwt = require('jsonwebtoken');
const config = require('../config');


const router = express.Router();

router.route('/')
    .get(async (req, res) => {

        const header = req.headers.authorization;

        if (header) {
            const cryptedToken = header.split(" ")[1];
        
            jwt.verify(cryptedToken, config.jwtPassword, async (err, decodedToken) => {
    
                if (decodedToken.role === 'admin') {
                    const members = await memberController.getAll();
                    if (!members) {
                        res.status(404).json();
                    }
                    res.status(200).json(members);
                } else {
                    const members = await memberController.getForUsers();
                    if (!members) {
                        res.status(404).json();
                    }
                    res.status(200).json(members);
                }
            });
        } else {
            const members = await memberController.getForUsers();
            if (!members) {
                res.status(404).json();
            }
            res.status(200).json(members);
        }
    })
    
    .put(authValidator.isAdmin(), validator(memberSchema), async (req, res) => {
        const new_member = await memberController.add(req.body);

        if (!new_member) {
            res.status(404).json();
        }
        res.status(201).json(new_member);
    })
;

router.route('/:id')
    .get(authValidator.isAdmin(), async (req, res) => {
        const member = await memberController.getById(req.params.id);
        if (!member) {
            res.status(404).json();
        }
        res.status(200).json(member);
    })
    .patch(authValidator.isAdmin(), validator(memberSchema), async (req, res) => {
        const member = await memberController.update(req.params.id, req.body);
        if (!member) {
            res.status(404).json();
        }
        res.status(202).json(member);
    })
    .delete(authValidator.isAdmin(), async (req, res) => {
        const member = await memberController.remove(req.params.id);
        if (!member) {
            res.status(404).json();
        }
        res.status(202).json();
    })
;


module.exports = router;