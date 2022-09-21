const express = require("express");
const app = express();
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(express.json({ limit: "10mb", extended: true }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);
app.use(cookieParser());

app.use("/api", routes);

app.listen(process.env.PORT || 3001, () => {
  console.log(`server on port ${process.env.PORT}`);
});
