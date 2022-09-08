const express = require('express')
const UserController = require('../controllers/user.controller')
const router = express.Router()

// register an user
// { "fullname": "juan perez","email": "test@testi.com", "empresa":"pollos hermanos", "cuit": "123123123", "phone":5555555}
router.post('/create/', UserController.createUser)

// signup with activation code
//{ "email": "test@testi.com","token":48485  }
router.post('/signup/', UserController.signupToken)

// login new password
//{"email": "test@testi.com","password":"123123123","token":48485}
router.post('/newpass/', UserController.newPassword)

// get all users
router.get('/all/', UserController.getAllUsers)

//get user by id
router.get('/:id', UserController.getUser)

//Find user by name or email, case insensitive, partial search included.
router.get('/search/:search', UserController.findByName)

//Modify user // state the field/s to modify into mod prop
//{"id": "631896a32d42f0b39cab742f", "mod": {"fullname": "lalaal"}}
router.put('/modify/', UserController.userModify)

//Delete user
router.delete('/delete/:id', UserController.deleteUser)

//Create admin
//{ "fullname": "juan admin","email": "admin@admin.com","password": "admin"}
router.post('/createAdmin/', UserController.createAdmin)

module.exports = router
