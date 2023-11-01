const { tracksModel } = require("../models");

const getItems = async (req, res) => {
  try {
    const data = await tracksModel.find({});

    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getItem = async (req, res) => {};
const createItem = async (req, res) => {
  try {
    const { body } = req;

    const data = await tracksModel.create(body);

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
