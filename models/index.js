/**----------------------------------------------
 * | Este archivo lo utilizamos para gestionar
 * | los modelos dependiendo de si es sql o nosql
 * ----------------------------------------------*/

const models = {
  usersModel: require("./nosql/users"),
  tracksModel: require("./nosql/tracks"),
  storageModel: require("./nosql/storage"),
};

module.exports = models;
