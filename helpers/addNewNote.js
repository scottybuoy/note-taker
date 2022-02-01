const fs = require("fs");

const addNewNote = (addNote, storedNotes) => {

    fs.readFile(storedNotes, "utf8", (err, data) => {
        if (err) {
            err ? console.error(err) : console.log("note successfully saved");
        } else {
            const parsedNotes = JSON.parse(data);
            parsedNotes.push(addNote);
            console.log(parsedNotes);

            fs.writeFile(storedNotes, JSON.stringify(parsedNotes, null, 2), (err) => {
                err ? console.error(err) : console.log("Note saved");
            })
        }
    })
}

module.exports = { addNewNote };