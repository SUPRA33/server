const Joi = require('joi');

const schema = Joi.object().keys({
    civility : Joi.string().required(),
    last_name : Joi.string().required(),
    first_name : Joi.string().required(),
    nickname : Joi.string(),
    nationality : Joi.string().required(),
    date_birth : Joi.date().required(),
    city_birth : Joi.string().required(),
    email : Joi.string().email().required(),
    adress_1 : Joi.string().required(),
    adress_2 : Joi.string(),
    city : Joi.string().required(),
    postal_code : Joi.number(),
    country : Joi.string().required(),
    image : Joi.string(),
    team_id : Joi.number(),
    category : Joi.string(),
    role : Joi.string()
 });

 module.exports = schema;