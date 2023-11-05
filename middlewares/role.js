const handleErrors = require("../utils/handleError");

/**---------------------------------------------------------
 * | rol es un arreglo con los roles permitidos
 * | Esta función devuelve otra función (tecnica currying)
 * -------------------------------------------------------*/
const checkRol = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    /**-----------------------------------------------
     * | Tomamos los roles de un usuario autenticado
     * -----------------------------------------------*/
    const rolesByUser = user.role;

    /**-----------------------------------------------------------
     * | Validamos que incluya el rol que viene por parametros
     * -----------------------------------------------------------*/
    const checkValueRol = roles.some((rolSingle) =>
      rolesByUser.includes(rolSingle)
    );

    if (!checkValueRol)
      return handleErrors.handleHttpError(res, "USER_NOT_PERMISSIONS");
    else return next();
  } catch (error) {
    handleErrors.handleHttpError(res, error.message);
  }
};

module.exports = checkRol;
