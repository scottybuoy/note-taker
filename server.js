// import
const express = require("express");
const path = require("path");
const fs = require("fs");
const uniqueId = require("./helpers/uniqueId.js");
const { addNewNote } = require("./helpers/addNewNote.js");

// create variable for port
const PORT = process.env.PORT || 3001;

// create instance of express
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));




// ---------- get routes ------------

// app.get("/", (req, res) => res.send("Supppppp"));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "./public/index.html")));




// -------- post route ------------

app.post("/api/notes", (req, res) => {
    
    const { title, text } = req.body;

    const newNote = {
        title,
        text,
        id: uniqueId()
    };


    // read from db.json, add new note data, then overwrite

    addNewNote(newNote, "./db/db.json");

});







// initiate simulated server
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
  