// Modularization express functionalities from server
const express = require('express');
const cors = require('cors');
const planetsRouter = require('./routes/planets.router');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());

// Routes
app.use(planetsRouter);

module.exports = app;