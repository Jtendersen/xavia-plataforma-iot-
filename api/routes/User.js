const express = require("express");
const UserController = require("../controllers/user.controller");
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      users:
 *          type: object
 *          properties:
 *              fullname:
 *                  type: string
 *              cuit:
 *                  type: string
 *              email:
 *                  type: string
 *              phone:
 *                  type: number
 *              password:
 *                  type: string
 *              roles:
 *                  type: array
 *              empresa:
 *                  type: string
 *              devices:
 *                  type: array
 *              imgUrl:
 *                  type: string
 *          required:
 *              - fullname
 *              - email
 *          example:
 *              fullname: Ubbe Lothbrok
 *              cuit: 20-0837493-1
 *              email: ubbe@mail.com
 *              phone:  +5491123264864
 *              password: 12345
 *              roles: ["user"]
 *              empresa: Xavia IOT
 *              devices: 
 *              imgUrl:  https://www.lifeder.com/wp-content/uploads/2019/04/Ubbe.jpg
 */

/**
 * @swagger
 * /api/users/create:
 *  post:
 *      summary: create a new user
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/user'
 *      responses:
 *          200:
 *              description: new user created!
 */

router.post("/create/", UserController.createUser);

// signup with activation code
//{ "email": "test@testi.com","token":48485  }
router.post("/signup/", UserController.signupToken);

// login new password
//{"email": "test@testi.com","password":"123123123","token":48485}
router.post("/newpass/", UserController.newPassword);

/**
 * @swagger
 * /api/users/all:
 *  get:
 *      summary: return all users
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: all users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
  *                              $ref: '#/components/schemas/user'
 */
router.get("/all/", UserController.getAllUsers);

router.get("/:id", UserController.getUser);

//Find user by name or email, case insensitive, partial search included.
router.get("/search/:search", UserController.findByName);

//Modify user // state the field/s to modify into mod prop
//{"id": "631896a32d42f0b39cab742f", "mod": {"fullname": "lalaal"}}
router.put("/modify/", UserController.userModify);

//Delete user
router.delete("/delete/:id", UserController.deleteUser);

//Create admin
//{ "fullname": "juan admin","email": "admin@admin.com","password": "admin"}
router.post("/createAdmin/", UserController.createAdmin);

module.exports = router;
