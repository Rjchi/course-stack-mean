const express = require("express");
const validators = require("../validators/tracks");
const controller = require("../controllers/tracks.controller");

const router = express.Router();

router
  .get("/", controller.getItems)
  .get("/:id", controller.getItem)
  .post("/", validators.validatorCreateItem, controller.createItem)
  .put("/:id", controller.updateItem)
  .delete("/:id", controller.deleteItem);

module.exports = router;
