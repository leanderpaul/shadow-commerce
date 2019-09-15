/*!
 * This file contains all the validation code for the modules.
 */

exports.isEmpty = data =>
	data === undefined ||
	data === null ||
	(typeof data === 'object' && Object.keys(data).length === 0) ||
	(typeof data === 'string' && data.trim().length === 0);
