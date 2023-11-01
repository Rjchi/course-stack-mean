require("dotenv").config();

const cors = require("cors");
const express = require("express");
const dbConnect = require("./config/mongo");

const PORT = process.env.PORT || 5001;
const app = express();

app.use(cors());
app.use(express.json());

/**---------
 * | Routes
 * ---------*/
app.use("/api", require("./routes"));

app.listen(PORT, () => console.log(`Server on port: ${PORT}`));

(async () => {
  await dbConnect();
})();
