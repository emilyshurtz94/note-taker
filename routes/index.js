const routes = require('express').Router()

const notesRouter= require('./notes');

routes.use('/api', notesRouter);

module.exports = routes;