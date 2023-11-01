const mongoose = require("mongoose");

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

module.exports = mongoose.model("tracks", TracksScheme);
