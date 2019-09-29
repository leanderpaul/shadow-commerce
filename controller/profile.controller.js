const { userModel, transactionModel } = require('../models');
const { response } = require('../services');
const debug = require('debug')('controller:profile');

/**
 * @description This function returns the user profile of the usser signed in.
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Express.Response}
 * @private
 */
exports.getProfile = async (req, res) => {
	const data = {
		firstName: req.user.firstName,
		lastName: req.user.lastName,
		phoneNumber: req.user.phoneNumber,
		email: req.user.email
	};
	return res.json(response(2201, data));
};

/**
 * @description This function updates the user details of the authenticated user.
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Express.Response}
 * @private
 */
exports.updateProfile = async (req, res) => {
	try {
		/**
		 * @todo Ensure that there are no other fields in body except firstName, lastNAme, phoneNumber, email
		 */
		await userModel.updateOne({ _id: req.user.id }, req.body, { runValidators: true });
		res.json(response(2202));
	} catch (err) {
		debug(err);
		res.json(response(err));
	}
};

/**
 * @description This function changes the password of the authenticated user.
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Express.Request}
 * @private
 */
exports.changePassword = async (req, res) => {
	try {
		const body = req.body;
		if (body.newPassword !== body.confirmNewPassword) throw 1405;
		if (!(await req.user.comparePassword(body.oldPassword))) throw 1407;
		await userModel.updateOne({ _id: req.user.id }, { password: body.newPassword }, { runValidators: true });
		res.json(response(1203));
	} catch (err) {
		debug(err);
		res.json(response(err));
	}
};

/**
 * @description Get all the transactions that the user has completed previously.
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Express.Request}
 * @private
 */
exports.getAllTransaction = async (req, res) => {
	try {
		const pageNumber = req.params.page;
		const transactions = await transactionModel
			.find({ ofUser: req.user.id }, '-_id -ofUser -items -__v')
			.sort({ data: -1 })
			.skip(pageNumber * 20)
			.limit(21);
		const isMore = transactions.length > 20 ? true : false;
		if (isMore) transactions.pop();
		res.json(response(2203, { isMore, transactions }));
	} catch (err) {
		debug(err);
		res.json(response(err));
	}
};

/**
 * @description Gets a specific transaction.
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Express.Request}
 * @private
 */
exports.getTransaction = async (req, res) => {
	try {
		const transactionID = req.params.transactionId;
		const transaction = await transactionModel
			.findOne({ tid: transactionID })
			.populate('items.itemId', '+pid +productName +image +price');
		res.json(response(2204, { transaction }));
	} catch (err) {
		debug(err);
		res.json(response(err));
	}
};
