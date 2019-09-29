const router = require('express').Router();
const { IAM } = require('../services');
const { addToCart, removeItemInCart, getCart, updateCart } = require('../controller').cart;

/**
 * @route `GET` `/cart`
 * @private
 */
router.get('/', IAM, getCart);

/**
 * @route `POST` `/cart`
 * @private
 */
router.post('/', IAM, addToCart);

/**
 * @route `PUT` `/cart`
 * @private
 */
router.put('/', IAM, updateCart);

/**
 * @route `DELETE` `/cart/itemId`
 * @private
 */
router.delete('/:itemId', IAM, removeItemInCart);

module.exports = router;
