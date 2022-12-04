const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        const products = await productController.getAll();
        if (!products) {
            res.status(404).json();
        }
        res.status(200).json(products);
    })
    .put(async (req, res) => {
        const new_product = await productController.add(req.body);

        if (!new_product) {
            res.status(404).json();
        }
        res.status(201).json(new_product);
    })
;

router.route('/:id')
    .get(async (req, res) => {
        const product = await productController.getById(req.params.id);
        if (!product) {
            res.status(404).json();
        }
        res.status(200).json(product);
    })
    .patch(async (req, res) => {
        const product = await productController.update(req.params.id, req.body);
        if (!product) {
            res.status(404).json();
        }
        res.status(202).json(product);
    })
    .delete(async (req, res) => {
        const product = await productController.remove(req.params.id);
        if (!product) {
            res.status(404).json();
        }
        res.status(202).json();
    })
;


module.exports = router;