const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const authLimiter = require('../middleware/rateLimiter');

router.post('/login', authLimiter, authController.login);
router.post('/register', authController.register);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);


const authMiddleware = require('../middleware/authMiddleware');
router.get('/profile', authMiddleware, authController.getProfile);
router.put('/profile', authMiddleware, authController.updateProfile);

module.exports = router;
