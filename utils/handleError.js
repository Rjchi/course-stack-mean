/**-----------------------------------------------------
 * | Aqui gestionamos los errores en las peticiones
 * -----------------------------------------------------*/

const handleHttpError = (res, message, code = 403) => {
  return res.status(code).json({ message });
};

module.exports = {
  handleHttpError,
};
