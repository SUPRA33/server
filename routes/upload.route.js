const express = require('express');
const teamController = require('../controllers/team.controller');
const teamSchema = require('../models/team');
const validator = require('../utils/validator');
const authValidator = require('../utils/auth');

const router = express.Router();

app.post('/images', async (req, res) => {
    if(!req.files) {
        res.status(400).json();
    } else {
        
        const file = req.files.le_nom_du_champs_de_ton_file_lors_de_lenvoi_via_postman;
        file.mv('./images/' + file.name);

        res.status(201).json({
                name: avatar.name,
                mimetype: avatar.mimetype,
                size: avatar.size
        });
    }
});


module.exports = router;