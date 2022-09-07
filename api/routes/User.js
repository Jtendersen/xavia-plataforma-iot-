const express = require('express')
const UserController = require('../controllers/user.controller')
const router = express.Router()

// register an user
// {   "name": "testo1", "surname":"surtesto1","email": "test@test1.com"}
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

//Modify user // state the field/s to modify into mod prop
//{"id": "631896a32d42f0b39cab742f", "mod": {"name": "lalaal"}}
router.put('/modify/', UserController.userModify)

//Delete user
router.delete('/delete/:id', UserController.deleteUser)

module.exports = router
