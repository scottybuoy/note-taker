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

app.post("/api/notes", (req, res) => {
    console.log(`${req.method} request received`)
    const { title, text } = req.body;

    const newNote = {
        title,
        text
    };

    const newNoteStr = JSON.stringify(newNote);

    fs.writeFile("./db/db.json", newNoteStr, (err) => {
        if (err) {
            console.error(err);
        }
    })

});







// initiate simulated server
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
  