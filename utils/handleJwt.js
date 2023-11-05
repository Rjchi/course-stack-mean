const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

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
        _id: user._id,
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
