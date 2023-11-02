const { storageModel } = require("../models");

const handleErrors = require("../utils/handleError");

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

const updateItem = async (req, res) => {
  try {
  } catch (error) {
    handleErrors.handleHttpError(res, error.message, "500");
  }
};

const deleteItem = async (req, res) => {
  try {
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
