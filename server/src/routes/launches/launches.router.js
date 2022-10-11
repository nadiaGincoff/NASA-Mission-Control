const express = require('express');
const { httpGetAllLaunches, httpCreateLaunches, httpAbortLaunch } = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpCreateLaunches);
launchesRouter.delete('/:id', httpAbortLaunch);

module.exports = launchesRouter;