const { matchedData } = require("express-validator");

const { usersModel } = require("../models");
const { tokenSing } = require("../utils/handleJwt");
const { compare, encrypt } = require("../utils/handlePassword");

const handleErrors = require("../utils/handleError");

const register = async (req, res) => {
  try {
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
  } catch (error) {
    handleErrors.handleHttpError(res, error.message, 500);
  }
};

const login = async (req, res) => {
  try {
    req = matchedData(req);

    /**--------------------------------------------------------------------
     * | Invalidamos el 'select' en este caso para SI traer la password
     * --------------------------------------------------------------------*/
    const user = await usersModel
      .findOne({ email: req.email })
      // .select("password name role email");

    if (!user) return handleErrors.handleHttpError(res, "USER_NOT_EXIST", 404);

    const hashPassword = user.password;
    const check = await compare(req.password, hashPassword);

    if (!check)
      return handleErrors.handleHttpError(res, "PASSWORD_INVALID", 401);

    user.set("password", undefined, { strict: false });
    const data = {
      token: await tokenSing(user),
      user,
    };

    return res.json(data);
  } catch (error) {
    handleErrors.handleHttpError(res, error.message, 500);
  }
};

module.exports = {
  login,
  register,
};
