const express = require('express')
const MeasureController = require('../controllers/measure.controller')
const router = express.Router()

router.post('/create/', MeasureController.create)
router.get('/all/', MeasureController.getAllMeasures)
router.post('/seed/', MeasureController.seedDb)
router.delete('/delete/:id', MeasureController.deleteMeasures)


module.exports = router