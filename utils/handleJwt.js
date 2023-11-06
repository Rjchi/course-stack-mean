const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require("../utils/handlePropertiesEngine");

const propertiesKey = getProperties();

/**---------------------------------
 * | Con este firmamos el token
 * ---------------------------------*/
const tokenSing = async (user) => {
  try {
    /**-----------------------------
     * | Payload, Firma, Expiración
     * -----------------------------*/
    const token = jwt.sign(
      {
        /**----------------------------------
         * | El id lo tomamos dinamicamente
         * ----------------------------------*/
        [propertiesKey.id]: user[propertiesKey.id],
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
    return token;
  } catch (error) {
    throw error;
  }
};

const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  tokenSing,
  verifyToken,
};
