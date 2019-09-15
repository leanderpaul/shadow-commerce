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
		type: mongoose.Schema.Types.ObjectId,
		ref: 'product',
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
const transactionSchema = new mongoose.Schema(
	{
		tid: String,
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
	},
	{ strict: 'throw' }
);

/**
 * Ensuring that the user does not set the transaction id.
 */
transactionSchema.pre('validate', function() {
	if (this.tid) throw '9001';
	this.tid = uniqid();
});

/**
 * Exporting the model of the transaction.
 */
module.exports = mongoose.model('transaction', transactionSchema);
