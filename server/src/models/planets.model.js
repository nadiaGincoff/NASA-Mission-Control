const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const planets = require('./planets.mongo');

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED' 
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
        .pipe(parse({
            comment: '#',
            columns: true,
        }))
        .on('data', (data) => {
            if (isHabitablePlanet(data)) {
                savePlanet(data)
            }
        })
        .on('error', (error) => {
            console.log(error);
            reject(error);
        })
        .on('end', async () => {
            const countPlanets = (await getAllPlanets()).length 
            console.log(`${countPlanets} planets founded!`);
            resolve()
        }); // return the event emitter it was call done
    })
}

async function getAllPlanets() {
    return await planets.find({}, {
        '__id': 0, '__v': 0
    });
}

async function savePlanet(planet) {
    try {
        return await planets.updateOne({
            keplerName: planet.keplerName,
        }, {
            keplerName: planet.keplerName
        }, {
            upsert: true,
        });
    } catch (error) {
        console.log(`Could no save planet :()`, error);
    }
}

module.exports = {
    loadPlanetsData,
    getAllPlanets,
};