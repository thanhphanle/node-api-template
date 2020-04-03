const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/local', authController.local);

router.post('/register', authController.register);

router.post('/changepassword', authController.changePassword);

module.exports = router;
