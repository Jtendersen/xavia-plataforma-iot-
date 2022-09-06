const express = require('express')
const UserController = require('../controllers/user.controller')
const router = express.Router()

// registrar un usuario
router.post('/create/', UserController.createUser)


module.exports = router
