const { userModel } = require('../models');
const { response } = require('../services');
const jwt = require('jsonwebtoken');
const debug = require('debug')('controller:auth');

/**
 * Handles the user registeration route in authentication module.
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @public
 */
exports.registerController = async (req, res) => {
	try {
		const body = req.body;
		if (body.password == body.confirmPassword) delete body.confirmPassword;
		else throw '1405';
		await userModel.create(body);
		debug(`user created successfully for ${JSON.stringify(body)} !`);
		return res.json(response(1200));
	} catch (err) {
		debug(err);
		return res.json(response(err));
	}
};

/**
 * Handles the user log in route in the authentication module.
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @public
 */
exports.loginController = async (req, res) => {
	try {
		const body = req.body;
		const user = await userModel.findOne({ $or: [{ phoneNumber: body.username }, { email: body.username }] });
		if (!user) throw '1406';
		if (!(await user.comparePassword(body.password))) throw '1407';
		const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
		debug(`user logged in successfully for ${JSON.stringify(body)}`);
		return res.json(response(1201, { token }));
	} catch (err) {
		debug(err);
		return res.json(response(err));
	}
};
