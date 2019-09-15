/**
 * Exports all the modules that are present in the services folder
 */
module.exports = {
	IAM: require('./IAM.services'),
	middlewares: require('./middlewares.services'),
	response: require('./response.services'),
	validator: require('./validator.services')
};
