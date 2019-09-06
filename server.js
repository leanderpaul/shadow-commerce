/**
 * Setting up the Environmantal variables for the server
 */
if (!process.env.NODE_ENV) require('dotenv').config();

/**
 * Importing Open Source Libraries
 */
const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('server');

/**
 * Importing the env variables to constants
 */
const port = process.env.PORT;
const db = process.env.DB;

/**
 * Starting up the express server and the mongodb connection
 */
const app = express();
app.listen(port, () => debug(`Server listening in port ${port}`));
mongoose.connect(db, { useCreateIndex: true, useNewUrlParser: true });
mongoose.connection.on('connected', () => debug(`DB connection to ${db} established successfully`));
mongoose.connection.on('error', err => debug(`DB Connection Error has occured\n${err}`));

/**
 * Handling routes that are not present in the server.
 */
app.all('*', (req, res) => res.status(404).json({ msg: 'Server working', err: 'Route not found !' }));
