const express = require("express");        // set the express app to express
const chalk = require("chalk");            // Add colors to help see errors
const debug = require("debug")('app');     // replace console.log with debug 'app' is telling debug where we are
const morgan = require("morgan");          // morgan is to write out to the console
const path = require('path');
const app = express();                    // assign express to the app variable
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(morgan('combined'));            // more information to the console
// app.use(morgan('tiny'));           // less information to the console
app.use(express.static(path.join(__dirname, "public")));  // static directory were we serve up public content
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/apiRoutes")(app);     // It matters what order these routes are loaded.  When html routes are
										// loaded first everything defaults to the * route.
require("./routes/htmlRoutes")(app);


app.listen(PORT, function() {
	debug(`App listening on PORT: ${chalk.blue(PORT)}`); // ES6 string literals.  To see debug type  DEBUG=* node
	// server.js or for only app specific debug type  DEBUG=app node server.js
});