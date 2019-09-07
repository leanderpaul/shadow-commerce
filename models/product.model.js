/**
 * Importing the Open Source Package
 */
const mongoose = require('mongoose');

/**
 * Defining the schema of the product
 */
const productSchema = new mongoose.Schema({
	pid: {
		type: Number,
		default: Date.now()
	},
	productName: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	brand: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true,
		enum: ['Mobiles', 'Laptops', 'Desktops', 'Accessories', 'Games']
	},
	description: {
		type: String,
		required: true
	},
	stock: {
		type: Number,
		required: true
	},
	price: {
		type: Number,
		required: true
	}
});

/**
 * Exporting the product model
 */
module.exports = mongoose.model('product', productSchema);
