const express = require('express')
const router = express.Router()
const user = require('./User')
const auth = require('./auth')
const device = require('./device')
const measure = require('./measure')


router.use('/users', user)
router.use('/auth', auth)
router.use('/device', device)
router.use('/measures', measure)

module.exports = router