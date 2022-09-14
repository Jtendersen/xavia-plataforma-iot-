const express = require('express')
const DeviceController = require('../controllers/device.controller')
const router = express.Router()


router.post('/register/', DeviceController.registerDevice)
// Encuentra todos los dispositivos de una empresa. {users: "Coarco"}
router.get('/all/', DeviceController.getAllDevices)
router.get('/:id', DeviceController.getDevice)
router.put('/modify/', DeviceController.editDevice)
router.delete('/delete/:id', DeviceController.deleteDevice)
router.put('/measures/push', DeviceController.pushMeasures)
//encuentra las medidas de un dispositivo entre las fechas seleccionadas. {_id:54851323564651, from: "2022-10-3T13:10:37.727+00:00", to: "2022-10-3T13:10:37.727+00:00"}
router.get('/measures/search', DeviceController.getMeasuresByDates)


module.exports = router
