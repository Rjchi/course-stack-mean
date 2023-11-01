const fs = require("fs");
const express = require("express");

const router = express.Router();

const PATH_ROUTES = __dirname;

const removeExtension = (filename) => {
  return filename.split(".").shift();
};

fs.readdirSync(PATH_ROUTES).filter((file) => {
  const name = removeExtension(file);

  /**-----------------------------------
   * | Generamos la ruta dinamicamente
   * -----------------------------------*/
  if (name !== "index") router.use(`/${name}`, require(`./${file}`));
});

module.exports = router;
