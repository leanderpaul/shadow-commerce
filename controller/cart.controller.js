const { productModel } = require('../models');
const { response } = require('../services');
const debug = require('debug')('controller:cart');

/**
 * @description Get all the items in the user cart.
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Express.Response}
 * @private
 */
exports.getCart = async (req, res) => {
	try {
		const user = req.user.populate('cart.item', '+pid +productName +image +price');
		res.json(response(4203, { items: user.cart }));
	} catch (err) {
		debug(err);
		res.json(response(err));
	}
};

/**
 * @description Get all the items in the user cart.
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Express.Response}
 * @private
 */
exports.addToCart = async (req, res) => {
	try {
		const body = req.body;
		const product = await productModel.findOne({ pid: body.pid }, '+pid');
		req.user = user.cart.push(product);
		req.user.save();
		res.json(response(4200));
	} catch (err) {
		debug(err);
		res.json(response(err));
	}
};

/**
 * @description Get all the items in the user cart.
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Express.Response}
 * @private
 */
exports.updateCart = async (req, res) => {
	try {
		const body = req.body;
		req.user.cart.forEach(item => (item.quantity = item.item == product._id ? item.quantity + body.quantity : item.quantity));
		await req.user.save();
	} catch (err) {
		debug(err);
		res.json(response(err));
	}
};

/**
 * @description Get all the items in the user cart.
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Express.Response}
 * @private
 */
exports.removeItemInCart = async (req, res) => {
	try {
		const product = await productModel.findOne({ pid: req.params.itemId }, '+pid');
		const cart = req.user.cart.filter(item => !(item.item == product._id));
		req.user.cart = cart;
		await req.user.save();
		res.json(response(4202));
	} catch (err) {
		debug(err);
		res.json(response(err));
	}
};
