const Joi = require('joi');

const schema = Joi.object().keys({
    product_name: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number(),
    product_image: Joi.string()
});

module.exports = schema;