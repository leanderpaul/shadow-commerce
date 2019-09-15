const router = require('express').Router();

/**
 * Routes to the Authentication module
 */
router.use('/auth', require('./auth.route'));

/**
 * Exporting the routes of all the modules
 */
module.exports = router;
