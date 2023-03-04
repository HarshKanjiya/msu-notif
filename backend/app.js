const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

const app = express()


const errorMiddleWare = require("./middleware/error");
dotenv.config({ path: "./backend/config/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors([]));

// routes
const users = require("./routes/userRoutes")

app.use("/api/v1", users)


// node hosting

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// middleware for error
app.use(errorMiddleWare);

module.exports = app;
