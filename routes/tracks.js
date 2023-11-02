const express = require("express");
const validators = require("../validators/tracks");
const controller = require("../controllers/tracks.controller");

const router = express.Router();

router
  .get("/", controller.getItems)
  .get("/:id", validators.validatorGetItem, controller.getItem)
  .post("/", validators.validatorCreateItem, controller.createItem)
  .put(
    "/:id",
    validators.validatorGetItem,
    validators.validatorCreateItem,
    controller.updateItem
  )
  .delete("/:id", validators.validatorGetItem, controller.deleteItem);

module.exports = router;
