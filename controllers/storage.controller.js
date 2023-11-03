const { matchedData } = require("express-validator");
const fs = require("fs");

const { storageModel } = require("../models");
const handleErrors = require("../utils/handleError");
const MEDIA_PATH = `${__dirname}/../storage`;

const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({});

    return res.json(data);
  } catch (error) {
    handleErrors.handleHttpError(res, error.message, "500");
  }
};

const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;

    const data = await storageModel.findById(id);

    return res.json(data);
  } catch (error) {
    handleErrors.handleHttpError(res, error.message, "500");
  }
};

const createItem = async (req, res) => {
  try {
    const { file } = req;

    const fileData = {
      url: `${process.env.PUBLIC_URL}/${file.filename}`,
      filename: file.filename,
    };

    const data = await storageModel.create(fileData);

    return res.json(data);
  } catch (error) {
    handleErrors.handleHttpError(res, error.message, "500");
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const dataFile = await storageModel.findById(id);
    await storageModel.deleteOne({ _id: id });
    const { filename } = dataFile;
    const filePath = `${MEDIA_PATH}/${filename}`;

    /**------------------------------------
     * | Con esto eliminamos el archivo
     * ------------------------------------*/
    fs.unlinkSync(filePath);

    const data = {
      filePath,
      deleted: 1,
    };

    return res.json(data);
  } catch (error) {
    handleErrors.handleHttpError(res, error.message, "500");
  }
};

module.exports = {
  getItem,
  getItems,
  createItem,
  deleteItem,
};
