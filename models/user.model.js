/**
 * Importing the Open Source Libraries
 */
const mongoose = require('mongoose');
const uuid = require('uuid/v1');
const bcrypt = require('bcryptjs');

/**
 * Defining the schema of the user model
 */
const userSchema = new mongoose.Schema({
	guid: {
		type: String,
		default: uuid()
	},
	username: {
		type: String,
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
	}
});

userSchema.pre('save', function() {});

module.exports = mongoose.model('user', userSchema);
