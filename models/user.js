const Joi = require('joi');

const schema = Joi.object().keys({
    civility : Joi.string().required(),
    last_name : Joi.string().required(),
    first_name : Joi.string().required(),
    date_birth : Joi.date().required(),
    email : Joi.string().email().required(),
    password : Joi.string().min(8).required(),
    // confirmPassword: Joi.string().min(8).valid(Joi.ref('password')).required(),
    adress_1 : Joi.string(),
    adress_2 : Joi.string(),
    city : Joi.string().required(),
    postal_code : Joi.number().required(),
    country : Joi.string().required(),
    role : Joi.string().required()
});

module.exports = schema;