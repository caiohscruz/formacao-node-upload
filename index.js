const express = require("express");
const app = express();

const path = require('path');

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let originalFileName = file.originalname;
    let extensionFile = path.extname(file.originalname);
    let control = `(${Date.now()})`
    let fileName = originalFileName.replace(extensionFile, control+extensionFile);

    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload", upload.single("file"), (req, res) => {
  res.send("Recebido");
});

app.listen(8080, () => {
  console.log("Rodando");
});
