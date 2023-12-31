/**---------------------------------------------------------------
 * | Con esto eliminamos los campos que no pertenecen al modelo
 * ---------------------------------------------------------------*/

const { matchedData } = require("express-validator");

const { tracksModel } = require("../models");
const handleErrors = require("../utils/handleError");

const getItems = async (req, res) => {
  try {
    /**---------------------------------------------------------------
     * | Utilizamos el metodo que creamos en el modelo(sql/nosql)
     * ---------------------------------------------------------------*/
    const data = await tracksModel.findAllData({});
    return res.json(data);
  } catch (error) {
    handleErrors.handleHttpError(res, error.message, "500");
  }
};

const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;

    /**---------------------------------------------------------------
     * | Utilizamos el metodo que creamos en el modelo(sql/nosql)
     * ---------------------------------------------------------------*/
    const data = await tracksModel.findOneData(id);

    return res.json(data);
  } catch (error) {
    handleErrors.handleHttpError(res, error.message, "500");
  }
};

const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await tracksModel.create(body);

    return res.json(data);
  } catch (error) {
    handleErrors.handleHttpError(res, error.message, "500");
  }
};

const updateItem = async (req, res) => {
  try {
    /**-----------------------------------------------------------------
     * | Creamos dos objetos uno con el id y el otro con lo restante
     * -----------------------------------------------------------------*/
    const { id, ...body } = matchedData(req);

    const data = await tracksModel.findByIdAndUpdate(id, body);

    return res.json(data);
  } catch (error) {
    handleErrors.handleHttpError(res, error.message, "500");
  }
};

const deleteItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;

    /**---------------------------------------------
     * | Aqui estamos haciendo uso del soft delete
     * ---------------------------------------------*/
    const data = await tracksModel.delete({ _id: id });

    return res.json(data);
  } catch (error) {
    handleErrors.handleHttpError(res, error.message, "500");
  }
};

module.exports = {
  getItem,
  getItems,
  createItem,
  updateItem,
  deleteItem,
};
