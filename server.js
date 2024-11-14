const indexRoutes = require('./routes/index');
const campaignsRoutes = require('./routes/campaigns');
const characterRoutes = require('./routes/characters');
const chatRoutes = require('./routes/chats');
const express = require('express');
const path = require('path');
const cors = require('cors');

//* Init
const app = express();
const port = 3000;
const corsOptions = {
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

//? Serve files from html directory
app.use(express.static(path.join(__dirname, 'html')));

//? Middleware to parse JSON body
app.use(express.json());
app.use(cors(corsOptions));

//? Routes
app.use('/', indexRoutes);
app.use('/campaigns', campaignsRoutes);
app.use('/characters', characterRoutes);
app.use('/chats', chatRoutes);

//? Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});