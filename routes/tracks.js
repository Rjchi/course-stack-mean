const express = require("express");

const router = express.Router();

router
  .get("/")
  .get("/:id")
  .post("/")
  .put("/:id")
  .delete("/:id");

module.exports = router;
