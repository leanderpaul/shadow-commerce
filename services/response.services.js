/*!
 * Response service is a service that provides a response based on the different
 * situations.
 *
 * the format used in the creation of the response code is as follows
 * - it contains four digits
 * - the first digit provides insight on the type of service
 *    - 1 for authentication service
 *    - 2 for profile
 * 		- 3 for shop
 * 		- 4 for cart
 * 		- 5 for comments
 * - the second digit provides insight on whether it is a success or an error
 *    - 2 for success
 *    - 4 for error
 * - the last two digit is the type of error
 * @author Shadow Lord
 * @exports response
 * @function response
 */

/**
 * Prvides an object that is to send to the user based on the responseCode and data.
 *
 * @param {Number} responseCode contains the code for the response object
 * @param {Object} [data] the data object would be added to the response object
 *
 * @returns {Object} The response object which is to be sent to the user
 */
module.exports = (responseCode, data) => {
	let jsonResp =
		responseCode.toString().charAt(1) == 2
			? { success: true, msg: successResponse[responseCode] }
			: { success: false, err: `E${responseCode} ${errorResponse[responseCode]}` };
	if (data) jsonResp.data = data;
	return jsonResp;
};

/**
 * Contains the success responses
 */
const successResponse = {
	1200: 'User registered successfully !',
	1201: 'User logged In successfully !',
	1202: 'Mail sent to the email successfully !',
	1203: 'Password changed successfully !',
	2201: 'Profile info',
	2202: 'Profile updated successfully !',
	2203: 'All Transactions info',
	2204: 'Transaction info',
	3201: 'Products info',
	3202: 'Product info',
	4200: 'Added to cart successfully !',
	4201: 'Cart updated successfully !',
	4202: 'Cart item deleted successfully !',
	5200: 'Comments added successfully !'
};

/**
 * Contains all the error responses
 */
const errorResponse = {
	1400: 'Phone Number not valid !',
	1401: 'Email Address is not valid !',
	1402: 'Phone Number already exists !',
	1403: 'Email Address already exists !',
	1404: 'Password is not valid !',
	1405: 'Password and confirm password do not match !',
	1406: 'User does not exist !',
	1407: 'Password does not match !',
	2400: 'First name cannot be empty !',
	2401: 'Last name cannot be empty !',
	4400: 'Item does not exist !',
	4401: 'Quantity is above that of available stock !',
	4402: 'Quantity of item cannot be reduced anymore !',
	4403: 'Quantity cannot be increased anymore, no more stock left !',
	4404: 'Item not present in cart !',
	5400: 'Rating value is invalid !',
	5401: 'Rating is not present !',
	5402: 'Comment content is not present !'
};
