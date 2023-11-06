require("dotenv").config();

const cors = require("cors");
const express = require("express");

const dbConnectNoSql = require("./config/mongo");
const { dbConnectMySql } = require("./config/mysql");

const PORT = process.env.PORT || 5001;
const app = express();

const ENGINE_DB = process.env.ENGINE_DB;

app.use(cors());
app.use(express.json());
/**-----------------------------------------------------------
 * | Indicamos de donde quiero tomar los archivos estaticos
 * -----------------------------------------------------------*/
app.use(express.static(`storage`));

/**--------------------------------------------------------
 * | Routes (en este caso traemos el routes/index.js)
 * --------------------------------------------------------*/
app.use("/api", require("./routes"));

app.listen(PORT, () => console.log(`Server on port: ${PORT}`));

if (ENGINE_DB === "nosql") {
  (async () => {
    await dbConnectNoSql();
  })();
} else {
  (async () => {
    await dbConnectMySql();
  })();
}
