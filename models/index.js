/**
 * Exporting all the modules that are present in the models folder as a object.
 */
module.exports = {
	userModel: require('./user.model'),
	productModel: require('./product.model'),
	transactionModel: require('./transaction.model')
};
