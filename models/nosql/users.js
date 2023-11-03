const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const UserScheme = new mongoose.Schema(
  /**--------------------------------------------------------
   * | En la primera sección va la estructura del modelo
   * --------------------------------------------------------*/
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
    },
    /**-----------------------------------------------------------------------
     * | Con 'select: false' eliminamos la contraseña al consultar un usuario
     * -----------------------------------------------------------------------*/
    password: {
      type: String,
      select: false,
    },
    role: {
      type: ["user", "admin"],
      default: "user",
    },
  },
  /**-------------------------------------------------------------
   * | En la segunda sección creamos los campos para gestionar
   * | las marcas de tiempo (createdAt, updatedAt)
   * -------------------------------------------------------------*/
  {
    timestamps: true,
    versionKey: false,
  }
);

UserScheme.plugin(mongooseDelete, { overrideMethods: "all" });

/**--------------------------------------------------
 * | 'users' va ha ser el nombre de la colección
 * --------------------------------------------------*/
module.exports = mongoose.model("users", UserScheme);
