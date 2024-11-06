const indexRoutes = require('./routes/index');
const characterRoutes = require('./routes/characters');
const express = require('express');
const path = require('path');

//* Init
const app = express();
const port = 3000;

//? Serve files from html directory
app.use(express.static(path.join(__dirname, 'html')));

//? Middleware to parse JSON body
app.use(express.json());

//? Routes
app.use('/', indexRoutes);
app.use('/characters', characterRoutes);

//? Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});