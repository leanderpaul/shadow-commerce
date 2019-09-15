const router = require('express').Router();
const { registerController, loginController } = require('../controller').auth;

/**
 * @access
 */
router.post('/register', registerController);

module.exports = router;
