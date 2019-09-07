/**
 * Importing the Open Source Libraries
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const debug = require('debug')('model:user');

/**
 * Schema of items in the cart
 */
const cartItem = {
	item: {
		type: Number,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	}
};

/**
 * Defining the schema of the user model
 */
const userSchema = new mongoose.Schema({
	phoneNumber: {
		type: Number,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	cart: {
		type: [cartItem],
		required: true
	},
	changePassword: String
});

/**
 * Pre save hook to hash the password before saving it to the database
 */
userSchema.pre('save', async function(next) {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(this.password, salt);
		this.password = hashedPassword;
	} catch (err) {
		debug(err);
	} finally {
		next();
	}
});

/**
 * A method added to the user schema to compare the passsword
 */
userSchema.methods.comparePassword = async function(password) {
	return await bcrypt.compare(password, this.password);
};

/**
 * Exporting the user model
 */
module.exports = mongoose.model('user', userSchema);
