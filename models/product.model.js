/**
 * Importing the Open Source Package
 */
const mongoose = require('mongoose');
const uniqid = require('uniqid');

/**
 * Defining the schema of the product
 */
const productSchema = new mongoose.Schema(
	{
		pid: String,
		productName: {
			type: String,
			validate: [productName => productName.length >= 3, '6400'],
			required: [true, '6400']
		},
		image: {
			type: String,
			required: [true, '6401']
		},
		brand: {
			type: String,
			validate: [brand => brand.length >= 3, '6402'],
			required: [true, '6402']
		},
		category: {
			type: String,
			required: [true, '6403'],
			enum: ['Mobiles', 'Laptops', 'Desktops', 'Accessories', 'Games']
		},
		description: {
			type: String,
			required: [true, '6404']
		},
		stock: {
			type: Number,
			required: [true, '6405']
		},
		price: {
			type: Number,
			required: [true, '6406']
		}
	},
	{ strict: 'throw' }
);

/**
 * Ensuring that the user does not set the product id.
 */
productSchema.pre('validate', function() {
	if (this.pid) throw '9001';
	this.pid = uniqid;
});

/**
 * Exporting the product model
 */
module.exports = mongoose.model('product', productSchema);
