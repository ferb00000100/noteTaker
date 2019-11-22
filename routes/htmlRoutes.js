var debug = require("debug")('app'); // replace console.log with debug 'app' is telling debug where we are
var path = require("path");
//
module.exports = function(app) {
//
	app.get("/notes",(req, res) => {
		debug('location: /notes');
		res.sendFile(path.join(`${__dirname}/../public`, 'notes.html'));
	});

	app.get("/",(req, res) => {
		debug('location: /');
		res.sendFile(path.join(`${__dirname}/../public`, 'index.html'));
	});

	// You need to have * at the end or you will never get to the other route.
	// app.get("*",(req, res) => {
	// 	debug('location: *');
	// 	res.sendFile(path.join(`${__dirname}/../public`, 'index.html'));
	// });

};


// const path = require('path');
//
// module.exports = function (app) {

	// app.get("/notes", (req, res) => {
	// 	res.sendFile(path.join(__dirname, '../public/notes.html'));
	// });
	//
	// app.get("*", (req, res) => {
	// 	res.sendFile(path.join(__dirname, '../public/index.html'));
	// });
//
// }