const router = require('express').Router()
const controller = require('../Controllers/AuthController')

router.post('/login',controller.login);


module.exports = router
