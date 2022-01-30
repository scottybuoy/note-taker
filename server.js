// import
const express = require("express");
const path = require("path");

// create variable for port
const PORT = 3001;

// create instance of express
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => res.send("Supppppp"));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "notes.html"));
})







// initiate simulated server
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
  