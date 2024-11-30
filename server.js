const indexRoutes = require('./routes/index');
const characterRoutes = require('./routes/characters');
const chatRoutes = require('./routes/chats');
const backupRoutes = require('./routes/backup');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

//? Run server in port
const app = express();
const port = 3000;

//? Cors handling
const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); //? Pre-flight handling
app.use((req, res, next) => { //? Debugging cors errors
  console.log(`Request Origin: ${req.headers.origin}`);
  console.log(`Request Headers: ${JSON.stringify(req.headers)}`);
  next();
});

//? Serve files from html directory
app.use(express.static(path.join(__dirname, 'html')));

//? Middleware to parse JSON body
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin","*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
})

//? Routes
app.use('/', indexRoutes);
app.use('/characters', characterRoutes);
app.use('/chats', chatRoutes);
app.use('/backup', backupRoutes);

//? Database
const dbUri = process.env.MONGO_URI;
mongoose.connect(dbUri).then((r) => {
  console.log('DB Connected')
  
  //? Enable listeners (to allow users to use this webservice)
  app.listen(port, () => {
    console.log(`Server running at port ${port}`);
  });
}).catch(err => console.log('Error at connecting to DB', err));

export default app;