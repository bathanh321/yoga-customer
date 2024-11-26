const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/user", userController.getUser);
router.get("/getAll", userController.getAll);

module.exports = router;