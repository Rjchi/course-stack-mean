const bcryptsjs = require("bcryptjs");

const encrypt = async (passwordPlain) => {
  return await bcryptsjs.hash(passwordPlain, 10);
};

const compare = async (passwordPlain, hashPassword) => {
  return await bcryptsjs.compare(passwordPlain, hashPassword);
};

module.exports = {
  encrypt,
  compare,
};
