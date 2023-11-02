const { storageModel } = require("../models");

const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({});

    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getItem = async (req, res) => {};
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
    return res.status(500).json({ message: error.message });
  }
};
const updateItem = async (req, res) => {};
const deleteItem = async (req, res) => {};

module.exports = {
  getItem,
  getItems,
  createItem,
  updateItem,
  deleteItem,
};
