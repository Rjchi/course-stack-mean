const { matchedData } = require("express-validator");

const { usersModel } = require("../models");
const { tokenSing } = require("../utils/handleJwt");
const { compare, encrypt } = require("../utils/handlePassword");

const register = async (req, res) => {
  req = matchedData(req);

  /**--------------------------------------
   * | Generamos la contraseña encriptada
   * --------------------------------------*/
  const password = await encrypt(req.password);
  const body = { ...req, password };

  const dataUser = await usersModel.create(body);
  dataUser.set("password", undefined, { strict: false });

  const data = {
    token: await tokenSing(dataUser),
    user: dataUser,
  };

  res.json(data);
};

module.exports = {
    register,
}