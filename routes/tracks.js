const express = require("express");
const controller = require("../controllers/tracks.controller");

const router = express.Router();

router
  .get("/", controller.getItems)
  .get("/:id", controller.getItem)
  .post("/", controller.createItem)
  .put("/:id", controller.updateItem)
  .delete("/:id", controller.deleteItem);

module.exports = router;
