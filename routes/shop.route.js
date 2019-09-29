const router = require('express').Router();
const { getProduct, getProducts } = require('../controller').shop;

/**
 * @route `GET` `/shop`
 * @public
 */
router.get('/', getProducts);

/**
 * @route `GET` `/shop/productId`
 * @public
 */
router.get('/:productId', getProduct);

module.exports = router;
