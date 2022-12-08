const Joi = require('joi');

const schema = Joi.object().keys({
    team_name: Joi.string().required(),
    logo: Joi.string()
});

module.exports = schema;