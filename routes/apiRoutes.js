const debug = require("debug")('app');
const fs = require("fs");
const path = require('path');

const readDataFile = () => {
	dataFile = JSON.parse(fs.readFileSync(path.join(`${__dirname}/../db`, 'db.json')));
	return dataFile;
}

const writeData = (dataFile) => {
	fs.writeFileSync(path.join(`${__dirname}/../db`, 'db.json'),JSON.stringify(dataFile),(err) => {
	if (err)
		throw ({err});
	});
}

module.exports = function(app) {

	app.get("/api/notes", function(req, res) {
		debug("location: GET /api/notes");
		dataFile = readDataFile();
		res.json(dataFile);
	});

	app.post("/api/notes", function(req, res) {
		debug("location: POST /api/notes");
		const newNote = req.body;
		debug("before ID is added to", newNote);
		notes = readDataFile();
		debug('this is notes',  notes);
		newNote.id = notes.length + 1;       // This will add the ID in the note array
		debug("newnote:",newNote, newNote.id);
		notes.push(newNote);
		writeData(notes);
		res.json(notes);
	});

	app.delete('/api/notes/:id', (req, res) => {
		let grabNotes = readDataFile();
		let noteId = req.params.id;
		debug("this is the id", id);
		let allNotes = grabNotes.filter((note) => note.id  != noteId);
		debug(allNotes);
		// delete notes[id];
		// debug("this is notes", notes)
		// debug("this is notes with id", notes[id]);
		// writeData(notes);
		// res.send(notes);
	})

	// app.delete('/api/notes/:id', (req, res) => {
	// 	let noteData = readData();
	// 	const noteId = req.params.id;
	// 	const newNoteData = noteData.filter((note) => note.id != noteId);
	//
	// 	writeData(newNoteData);
	// 	res.send(newNoteData);
	// })

}