const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    /**-------------------------------------------------
     * | Indicamos donde vamos a guardar los archivos
     * -------------------------------------------------*/
    const pathStorage = `${__dirname}/../storage`;
    cb(null, pathStorage);
  },
  filename: (res, file, cb) => {
    const getExtension = file.originalname.split(".").pop(); // ["name", "png"]
    /**--------------------------------------------------
     * | Generamos un nuevo nombre para
     * | el archivo(con el fin de no repetir nombres)
     * --------------------------------------------------*/
    const filename = `file-${Date.now()}.${getExtension}`;
    cb(null, filename);
  },
});

const uploadMiddleware = multer({
  storage,
});

module.exports = uploadMiddleware;
