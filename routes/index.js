const router = require('express').Router();

/**
 * Routes to the Authentication module
 */
router.use('/auth', require('./auth.route'));

/**
 * Routes to the profile module.
 */
router.use('/profile', require('./auth.route'));

/**
 * Routes to the shop module.
 */
router.use('/shop', require('./shop.route'));

/**
 * Routes to the cart module.
 */
router.use('/cart', require('./cart.route'));

/**
 * Exporting the routes of all the modules
 */
module.exports = router;
