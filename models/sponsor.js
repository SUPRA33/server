const Joi = require('joi');

const schema = Joi.object().keys({
    sponsor_name: Joi.string().required(),
    description: Joi.string().required(),
    link: Joi.string().uri(),
    logo: Joi.string()
});

module.exports = schema;