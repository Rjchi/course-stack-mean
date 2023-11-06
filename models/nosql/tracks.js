const mongoose = require("mongoose");

/**-----------------------------------------------------------------------------
 * | Esto es para aplicar soft delete ( marcar registros como "eliminados"
 * | en lugar de eliminarlos físicamente de la base de datos,
 * | manteniendo la capacidad de recuperarlos en el futuro si es necesario.)
 * -----------------------------------------------------------------------------*/
const mongooseDelete = require("mongoose-delete");

const TracksScheme = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    album: {
      type: String,
    },
    /**---------------------------------------------
     * | Esta validación se aplica cuando
     * | ingresamos este dato a la base de datos
     * ---------------------------------------------*/
    cover: {
      type: String,
      validate: {
        validator: (req) => {
          return true;
        },
        message: "ERROR_URL",
      },
    },
    artist: {
      name: {
        type: String,
      },
      nickname: {
        type: String,
      },
      nationality: {
        type: String,
      },
    },
    duration: {
      start: {
        type: Number,
      },
      end: {
        type: Number,
      },
    },
    /**-----------------------------------------------------------------
     * | Es un string con un cierto patron de numeros de caracteres
     * -----------------------------------------------------------------*/
    mediaId: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**----------------------------------------------------
 * | Implementar metodo propio con relacion a storage
 * | 'findAllData' puede ser el nombre que queramos
 * ----------------------------------------------------*/
TracksScheme.statics.findAllData = function () {
  /**----------------------------------------------
   * | En sql su equivalente seria un join
   * ----------------------------------------------*/
  const joinData = this.aggregate([
    {
      $lookup: {
        from: "storages", // relación de tracks con ---> storages
        localField: "mediaId", // campo a relacionar tracks.mediaId con:
        foreignField: "_id", // storages._id
        as: "audio", // y el resultado va a tener un alias
      },
    },
    {
      $unwind: "$audio", // cambiamos el arreglo de objetos de la respuesta por solo un objeto
    },
  ]);
  return joinData;
};

TracksScheme.statics.findOneData = function (id) {
  const joinData = this.aggregate([
    /**---------------------------------------------------------------------------------
     * | Cada uno se estos objetos con su configuración se denominan stitch(esteich)
     * ---------------------------------------------------------------------------------*/
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id), // este es de tracks._id
      },
    },
    {
      $lookup: {
        from: "storages",
        localField: "mediaId",
        foreignField: "_id",
        as: "audio",
      },
    },
    {
      $unwind: "$audio",
    },
  ]);
  return joinData;
};

/**------------------------------------------------------------------
 * | Le decimos a nuestro esquema que utilice el plugin
 * | y que sobrescriba los metodos nativos con los del soft delete
 * ------------------------------------------------------------------*/
TracksScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("tracks", TracksScheme);
