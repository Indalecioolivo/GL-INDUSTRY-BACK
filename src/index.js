require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(process.env.PORT);
