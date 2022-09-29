const express = require('express')
const DeviceController = require('../controllers/device.controller')
const router = express.Router()


router.post('/register/', DeviceController.registerDevice)
router.get('/all/', DeviceController.getAllDevices)
router.get('/:id', DeviceController.getDevice)
router.get('/user/:userid', DeviceController.getByUserId)
router.put('/modify/', DeviceController.editDevice)
router.delete('/delete/:id', DeviceController.deleteDevice)
router.put('/measures/push', DeviceController.pushMeasures)
//encuentra las medidas de un dispositivo entre las fechas seleccionadas. {_id:54851323564651, from: "2022-10-3T13:10:37.727+00:00", to: "2022-10-3T13:10:37.727+00:00"}
router.post('/measures/search', DeviceController.getMeasuresByDates)


module.exports = router
