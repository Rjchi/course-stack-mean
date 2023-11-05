const mongoose = require("mongoose");

const dbConnect = async () => {
  /**-----------------------------------------------------------------------------------------
   * | La URI(Identificador Uniforme de Recurso) de conexión
   * | es conocida tambien como cadena de conexión
   * -----------------------------------------------------------------------------------------*/
  const DB_URI = process.env.DB_URI;

  await mongoose
    .connect(DB_URI)
    .then(() => console.log("****Conexión Establecida NOSQL****"))
    .catch((error) =>
      console.log("****Conexión No Establecida NOSQL****", error.message)
    );
};

module.exports = dbConnect;
