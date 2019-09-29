const router = require('express').Router();
const { IAM } = require('../services');
const { getProfile, changePassword, updateProfile, getAllTransaction, getTransaction } = require('../controller').profile;

/**
 * @route `POST` `/profile`
 * @private
 */
router.get('/', IAM, getProfile);

/**
 * @route `PUT` `/profile`
 * @private
 */
router.put('/', IAM, updateProfile);

/**
 * @route `POST` `/profile/changePassword`
 * @private
 */
router.post('/changePassword', IAM, changePassword);

/**
 * @route `GET` `/profile/transactions`
 * @private
 */
router.get('/transactions', IAM, getAllTransaction);

/**
 * @route `GET` `/profile/transactions/:transactionId`
 * @private
 */
router.get('/transactions/:transactionId', IAM, getTransaction);

module.exports = router;
