const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.patch('/into-payment-true', userController.intoPaymentTrue);
router.patch('/into-payment-false', userController.intoPaymentFalse);

router.get('/me/:id', userController.getUser);

module.exports = router;