const express = require("express");
const AuthController = require("../controllers/auth.controller");
const { validateAuth } = require("../middlewares/auth");
const router = express.Router();

router.get("/me", validateAuth, AuthController.me);
router.post("/login/", AuthController.login);
router.post("/logout/", AuthController.logout);
router.put("/forgot-password/", AuthController.forgotPassword);
router.put("/reset-password/", AuthController.resetPassword);

module.exports = router;
