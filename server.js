// import
const express = require("express");
const path = require("path");
const fs = require("fs");
const noteStorage = require("./db/db.json");

// create variable for port
const PORT = 3001;

// create instance of express
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// get requests

app.get("/", (req, res) => res.send("Supppppp"));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
})

app.post("/notes", (req, res) => {

})







// initiate simulated server
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
  