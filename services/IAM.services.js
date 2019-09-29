const jwt = require('jsonwebtoken');
const { userModel } = require('../models');
const response = require('./response.services');

module.exports = async (req, res) => {
	try {
		const token = req.headers.authorization;
		if (token === undefined) throw 1408;
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		const user = await userModel.findOne({ email: payload.email });
		req.user = user;
	} catch (err) {
		if (err.name === 'TokenExpiredError') err = 1409;
		if (err.name === 'JsonWebTokenError' || err.name === 'NotBeforeError') err = 1410;
		res.status(500).json(response(9001));
	}
};
