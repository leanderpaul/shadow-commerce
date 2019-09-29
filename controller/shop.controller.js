const { productModel } = require('../models');
const { response } = require('../services');
const debug = require('debug')('controller:shop');

/**
 * @description Gets the products that the user has requested for
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @private
 */
exports.getProducts = async (req, res) => {
	try {
		const params = req.params;
		const searchQuery = {
			category: new RegExp(params.category, 'i'),
			brand: new RegExp(params.brand, 'i'),
			name: new RegExp(params.name, 'i')
		};
		const products = await productModel
			.find(searchQuery, '-_id -description -stock -__v')
			.sort({ name: 1 })
			.skip(params.page * 20)
			.limit(21);
		const isMore = products.length > 20 ? true : false;
		if (isMore) products.pop();
		res.json(response(3201, { isMore, products }));
	} catch (err) {
		debug(err);
		res.json(response(err));
	}
};

/**
 * @description Gets the details of a particular product
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @private
 */
exports.getProduct = async (req, res) => {
	try {
		const pid = req.params.productId;
		const product = await productModel.findOne({ pid }, '-_id -__v');
		res.json(response(3202, { product }));
	} catch (err) {
		debug(err);
		res.json(response(err));
	}
};
