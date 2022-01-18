const notes = require('express').Router();
const fs = require('fs');
const util = require('util');
const readFromFile = util.promisify(fs.readFile)
const { v4: uuidv4 } = require('uuid');

notes.get('/notes', (req, res) => {
    console.info(`${req.method} request received for feedback`)
 readFromFile('./db/db.json').then((data) =>res.json(JSON.parse(data)))
});


notes.post('/notes', (req, res) => {
    console.info(`${req.method}`)
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4()
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
        });res.json(newNote)
    }; 
});

notes.delete('/notes/:id', (req,res)=>{
    const notesDb= JSON.parse(fs.readFileSync('./db/db.json'));
    const filterNotes = notesDb.filter(note => (note.id !== req.params.id));
    fs.writeFileSync('./db/db.json', JSON.stringify(filterNotes));
    res.json(filterNotes);
})

module.exports = notes;