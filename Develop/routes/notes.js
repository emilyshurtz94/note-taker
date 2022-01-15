const notes = require('express').Router();
const fs = require('fs');

notes.get('/', (req, res) => {
    console.info(`${req.method} request received for feedback`)
    return res.json(db)
});


notes.post('/api/notes', (req, res) => {
    console.info(`${req.method}`)
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid()
        };
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);
                parsedNotes.push(newNote);

                fs.writeFile(
                    './db/db.json', JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                        writeErr ? console.error(writeErr) : console.info('Successfully updated notes!')
                )
            }
        });
    };
})

module.exports = notes;