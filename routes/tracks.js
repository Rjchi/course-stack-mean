const express = require("express");
const validators = require("../validators/tracks");
const rolMiddleware = require("../middlewares/role");
const authMiddleware = require("../middlewares/session");
const controller = require("../controllers/tracks.controller");

const router = express.Router();

router
  .get("/", authMiddleware, controller.getItems)
  .get("/:id", authMiddleware, validators.validatorGetItem, controller.getItem)
  .post(
    "/",
    authMiddleware,
    rolMiddleware(["admin"]),
    validators.validatorCreateItem,
    controller.createItem
  )
  .put(
    "/:id",
    authMiddleware,
    validators.validatorGetItem,
    validators.validatorCreateItem,
    controller.updateItem
  )
  .delete(
    "/:id",
    authMiddleware,
    validators.validatorGetItem,
    controller.deleteItem
  );

module.exports = router;
