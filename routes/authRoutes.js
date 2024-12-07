const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController')
// Add user route (for admin panel)
router.post('/add-user', adminController.addUser);

// User routes
router.post('/register', authController.register);
router.post('/login', authController.login);

router.patch('/onboarding', authController.onboarding);




module.exports = router;