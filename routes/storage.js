const express = require("express");
const uploadMiddleware = require("../utils/handleStorage");
const controller = require("../controllers/storage.controller");

const router = express.Router();

/**-------------------------------------------------------------------------------------------
 * | Para tomar un solo archivo utilizamos single("nombreDeLaPropiedadDondeVieneElArchivo")
 * | Pero si necesitamos varios archivos utilizamos multi(). Tambien podemos usar S3 de AWS
 * -------------------------------------------------------------------------------------------*/
router.post("/", uploadMiddleware.single("myfile"), controller.createItem);

module.exports = router;
