const express = require('express');
const userRoute = require('./user.route');
const teamRoute = require('./team.route');
const resultRoute = require('./result.route');
const memberRoute = require('./member.route');
const productRoute = require('./product.route');
const sponsorRoute = require('./sponsor.route');
const router = express.Router();

router.use('/users', userRoute);
router.use('/teams', teamRoute);
router.use('/results', resultRoute);
router.use('/members', memberRoute);
router.use('/products', productRoute);
router.use('/sponsors', sponsorRoute);

module.exports = router;