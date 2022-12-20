const express = require('express');
const contactController = require('../controllers/contact.controller');
const contactSchema = require('../models/contact');
const validator = require('../utils/validator');
const authValidator = require('../utils/auth');
const nodemailer = require('nodemailer');
const config = require('../config');

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
    .post(validator(contactSchema), async (req, res) => {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: config.mailerAdress,
                pass: config.mailerPassword
            }
          });
        
        const mailOptions = {
        from: 'Nodemailer ' + config.mailerAdress,
        to: config.mailerAdress,
        subject: req.body.last_name + ' ' + req.body.first_name + ' ; ' + req.body.email,
        html: req.body.message_object + ' : ' + req.body.message + ', +33' + req.body.phone,
        date: transporter.date
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                console.log(error);
                res.send('error');
            } else {
                console.log('Email sent : '+ info.response);
                res.send('success');
            }
        })
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