const bodyParser = require('body-parser');
const debug = require('debug')('service:middleware');

function printRequestBody(req, res, next) {
	debug(`body: ${JSON.stringify(req.body)}`);
	next();
}

exports.initializeMiddlewares = app => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	if (process.env.DEBUG) app.use(printRequestBody);
};
