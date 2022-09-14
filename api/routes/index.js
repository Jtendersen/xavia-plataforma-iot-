const express = require('express')
const router = express.Router()
const user = require('./User')
const auth = require('./auth')
const device = require('./device')


router.use('/users', user)
router.use('/auth', auth)
router.use('/device', device)

module.exports = router