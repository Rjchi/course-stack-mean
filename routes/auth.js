const express = require("express");
const validators = require("../validators/auth");
const controller = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", validators.validatorRegister, controller.register);

module.exports = router;
