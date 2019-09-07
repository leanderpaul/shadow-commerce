/**
 * Importing the Open Source Packages.
 */
const mongoose = require('mongoose');
const uniqid = require('uniqid');

/**
 * Defining the schema of the item present in the transaction schema.
 */
const item = {
	itemId: {
		type: Number,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	}
};

/**
 * Defining the schema of the transaction.
 */
const transactionSchema = new mongoose.Schema({
	tid: {
		type: String,
		default: uniqid()
	},
	ofUser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true
	},
	date: {
		type: Date,
		default: Date.now()
	},
	items: {
		type: [item],
		required: true
	},
	total: {
		type: Number,
		required: true
	},
	isPaid: {
		type: Boolean,
		required: true
	},
	isDelivered: {
		type: Boolean,
		default: false
	}
});

/**
 * Exporting the model of the transaction.
 */
module.exports = mongoose.model('transaction', transactionSchema);
