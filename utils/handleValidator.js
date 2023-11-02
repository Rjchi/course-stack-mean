const { validationResult } = require("express-validator");

const validateResults = (req, res, next) => {
  try {
    /**-------------------------------------------------------------------------------
     * | Aqui es como si estuvieramos diciendo 'valida lo que viene en la petición'
     * | En caso de no cumplir con la validación me manda al catch
     * -------------------------------------------------------------------------------*/
    validationResult(req).throw();
    return next();
  } catch (error) {
    res.status(403);
    res.send({ errors: error.array() });
  }
};

module.exports = validateResults;
