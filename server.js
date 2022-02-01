// import
const express = require("express");
const path = require("path");
const fs = require("fs");
const uniqueId = require("./helpers/uniqueId.js");

// create variable for port
const PORT = 3001;

// create instance of express
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));




// ---------- get requests ------------

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
        text,
        id: uniqueId()
    };


    // read from db.json, add new note data, then overwrite

    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            err ? console.error(err) : console.log("note successfully saved");
        } else {
            const parsedNotes = JSON.parse(data);
            parsedNotes.push(newNote);
            console.log(parsedNotes);

            fs.writeFile("./db/db.json", JSON.stringify(parsedNotes, null, 2), (err) => {
                err ? console.error(err) : console.log("Note saved");
            })
        }
    })

});







// initiate simulated server
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
  