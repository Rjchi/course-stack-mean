const express = require("express");
const session = require("../middlewares/session");
const validators = require("../validators/tracks");
const controller = require("../controllers/tracks.controller");

const router = express.Router();

router
  .get("/", session, controller.getItems)
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
