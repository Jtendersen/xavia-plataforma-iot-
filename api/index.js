const express = require("express");
const app = express();
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

app.use(cors());
//app.use(cors({"origin": "http://localhost:3000/", "credentials": true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

app.listen(process.env.PORT || 3001, () => {
  console.log(`server on port ${process.env.PORT}`);
});
