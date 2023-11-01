const mongoose = require("mongoose");

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
    password: {
      type: String,
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

/**--------------------------------------------------
 * | 'users' va ha ser el nombre de la colección
 * --------------------------------------------------*/
module.exports = mongoose.model("users", UserScheme);
