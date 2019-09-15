/**
 * Importing the Open Source Libraries
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const debug = require('debug')('model:user');

/**
 * Regular expression to validate the email address.
 */
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Regular expression to validate password.
 *  - Must contain minimum eight to a maximum of 32 characters
 *  - Must include at least one upper case letter, one lower case letter, and one numeric digit
 */
const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;

/**
 * Schema of items in the cart
 */
const cartItem = {
	item: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'product',
		required: true
	},
	quantity: {
		type: Number,
		required: [true, '9001']
	}
};

/**
 * Defining the schema of the user model
 */
const userSchema = new mongoose.Schema(
	{
		phoneNumber: {
			type: Number,
			required: [true, '1400'],
			validate: [pNo => (pNo.toString().length === 10 ? true : false), '1400'],
			unique: [true, '1402']
		},
		email: {
			type: String,
			required: [true, '1401'],
			validate: [email => emailRegExp.test(email || ''), '1401'],
			unique: [true, '1403']
		},
		password: {
			type: String,
			validate: [password => passwordRegExp.test(password || ''), '1404'],
			required: [true, '1404']
		},
		firstName: {
			type: String,
			validate: [firstName => firstName.length >= 3, '2400'],
			required: [true, '2400']
		},
		lastName: {
			type: String,
			validate: [lastName => lastName.length >= 1, '2400'],
			required: [true, '2401']
		},
		cart: {
			type: [cartItem],
			required: true
		},
		changePassword: String
	},
	{ strict: 'throw' }
);

/**
 * Pre save hook to hash the password before saving it to the database
 */
userSchema.pre('save', async function() {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(this.password, salt);
		this.password = hashedPassword;
	} catch (err) {
		debug(err);
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
module.exports = userModel = mongoose.model('user', userSchema);
