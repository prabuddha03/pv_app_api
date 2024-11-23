const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController')
// Add user route (for admin panel)
router.post('/add-user', adminController.addUser);

// User routes
router.post('/verify', authController.verifyAndFetchUser);
router.post('/complete-onboarding', authController.completeOnboarding);


module.exports = router;