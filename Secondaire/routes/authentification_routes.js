const express = require('express')
const router = express.Router()
const authController = require('../controllers/authentification_controller')
const loginLimiter = require('../middleware/limite_loggin')

router.route('/')
    .post(loginLimiter, authController.login)

router.route('/refresh')
    .get(authController.refresh)

router.route('/logout')
    .post(authController.logout)

module.exports = router