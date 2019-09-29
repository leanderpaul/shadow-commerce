const router = require('express').Router();
const { registerController, loginController } = require('../controller').auth;

/**
 * @route `POST` `/auth/register`
 * @public
 */
router.post('/register', registerController);

/**
 * @route `POST` `/auth/login`
 * @public
 */
router.post('/login', loginController);

module.exports = router;
