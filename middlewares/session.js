const { usersModel } = require("../models");
const handleJwt = require("../utils/handleJwt");
const handleErrors = require("../utils/handleError");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return handleErrors.handleHttpError(res, "NOT_TOKEN", 401);

    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await handleJwt.verifyToken(token);

    /**------------------------------------------------------------------------
     * | Verificamos que exista el id que agregamos al crear el token JWT
     * ------------------------------------------------------------------------*/
    if (!dataToken._id)
      return handleErrors.handleHttpError(res, "ERROR_ID_TOKEN", 401);

    const user = await usersModel.findById(dataToken._id);
    req.user = user;

    /**-----------------------------------------------
     * | Validamos que el usuarios cons ese id exista
     * -----------------------------------------------*/
    if (user) return next();
    else return handleErrors.handleHttpError(res, "USER_NOT_EXIST", 404);
  } catch (error) {
    return handleErrors.handleHttpError(res, error.message, 401);
  }
};

module.exports = authMiddleware;
