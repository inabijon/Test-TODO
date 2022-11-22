const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

/* Importing the routes from the todo and auth files. */
const todoRoutes = require('./routes/todo');
const authRoutes = require('./routes/auth');

/* Connecting to the database. */
mongoose.connect(`${process.env.DB_URL}`, { useNewUrlParser: true })
        .then(() => console.log('Connected to database!'))
        .catch((err) => console.log('Connection failed!', err));


/* Allowing the server to accept requests from other domains. */
app.use(cors());
/* Parsing the body of the request. */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Telling the server to use the routes in the todoRoutes and authRoutes files. */
app.use('/api/todo', todoRoutes);
app.use('/api/auth', authRoutes);

/* Telling the server to listen on the port that is set in the environment variable PORT or 3000 if the
environment variable is not set. */
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));