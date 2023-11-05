const { Sequelize } = require("sequelize");

const host = process.env.MYSQL_HOST;
const username = process.env.MYSQL_USER;
const database = process.env.MYSQL_DATABASE;
const password = process.env.MYSQL_PASSWORD;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "mysql",
});

const dbConnectMySql = async () => {
  try {
    await sequelize.authenticate();
    console.log("****Conexión Establecida SQL****");
  } catch (error) {
    console.log("****Conexión No Establecida SQL****", error.message)
  }
};

module.exports = { sequelize, dbConnectMySql };
