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
		let grabNotes = readDataFile();         // Grab all the notes from the db.json file
		let noteId = req.params.id;             // Grab the ID parameter from the req and assign it to noteId
		debug("this is the id", noteId);        //  debug
		let allNotes = grabNotes.filter((note) => note.id  != noteId); // this will use the filter to create a new
		// array with all the notes except the one with the ID that is clicked
		// debug(allNotes);                     // debug
		writeData(allNotes);                    // write the new array created with filter
		res.send(allNotes);                     // Display the notes to the web page in the response
	})

}