const { usersModel } = require("../models");
const handleJwt = require("../utils/handleJwt");
const handleErrors = require("../utils/handleError");
const getProperties = require("../utils/handlePropertiesEngine");

const propertiesKey = getProperties();

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return handleErrors.handleHttpError(res, "NOT_TOKEN", 401);

    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await handleJwt.verifyToken(token);

    /**------------------------------------------
     * | Validamos que si exista el 'dataToken'
     * ------------------------------------------*/
    if (!dataToken)
      return handleErrors.handleHttpError(res, "NOT_PAYLOAD_DATA", 401);

    const query = {
      [propertiesKey.id]: dataToken[propertiesKey.id], // _id o id (Dinamicamente)
    };

    const user = await usersModel.findOne(query);
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
