const express = require("express");
const validators = require("../validators/auth");

const { usersModel } = require("../models");
const { matchedData } = require("express-validator");
const { compare, encrypt } = require("../utils/handlePassword");

const router = express.Router();

router.post("/register", validators.validatorRegister, async (req, res) => {
  req = matchedData(req);

  /**--------------------------------------
   * | Generamos la contraseña encriptada
   * --------------------------------------*/
  const password = await encrypt(req.password);
  const body = { ...req, password };

  const data = await usersModel.create(body);
  data.set("password", undefined, { strict: false });

  res.json(data);
});

module.exports = router;
