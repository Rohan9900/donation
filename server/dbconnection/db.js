const mongoose = require("mongoose");
const express = require("express");

const url = "mongodb://localhost/donation";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(url || "mongodb://localhost/donation", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", (_) => {
  console.log("Database connected:", url);
});

db.on("error", (err) => {
  console.error("connection error:", err);
});
