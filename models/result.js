const Joi = require('joi');

const schema = Joi.object().keys({
    date : Joi.date().required(),
    score_home : Joi.number().required(),
    score_ext : Joi.number().required(),
    team_home_id : Joi.number().required(),
    team_ext_id : Joi.number().required(),
    logo_home_id : Joi.number(),
    logo_ext_id : Joi.number()
});

module.exports = schema;