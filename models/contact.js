const Joi = require('joi');

const schema = Joi.object().keys({
    last_name: Joi.string().required(),
    first_name: Joi.string().required(),
    phone: Joi.number(),
    email: Joi.string().email().required(),
    message_object: Joi.string().required(),
    message: Joi.string().min(30).required()
});

module.exports = schema;