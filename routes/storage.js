const express = require("express");
const validators = require("../validators/storage");
const authMiddleware = require("../middlewares/session");
const uploadMiddleware = require("../utils/handleStorage");
const controller = require("../controllers/storage.controller");

const router = express.Router();

/**-------------------------------------------------------------------------------------------
 * | Para tomar un solo archivo utilizamos single("nombreDeLaPropiedadDondeVieneElArchivo")
 * | Pero si necesitamos varios archivos utilizamos multi(). Tambien podemos usar S3 de AWS
 * -------------------------------------------------------------------------------------------*/
router
  .post(
    "/",
    authMiddleware,
    uploadMiddleware.single("myfile"),
    controller.createItem
  )
  .get("/", authMiddleware, controller.getItems)
  .get("/:id", authMiddleware, validators.validatorGetItem, controller.getItem)
  .delete(
    "/:id",
    authMiddleware,
    validators.validatorGetItem,
    controller.deleteItem
  );

module.exports = router;
