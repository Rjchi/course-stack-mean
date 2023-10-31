require("dotenv").config();

const cors = require("cors");
const express = require("express");

const PORT = process.env.PORT || 5001;
const app = express();

app.use(cors());

app.listen(PORT, () => console.log(`Server on port: ${PORT}`));
