const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const results = [];
const habitablePlanets = [];

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
                habitablePlanets.push(data)
            }
            results.push(data)
        })
        .on('error', (error) => {
            console.log(error);
            reject(error);
        })
        .on('end', () => {
            console.log(`${habitablePlanets.length} planets founded!`);
            resolve()
        }); // return the event emitter it was call done
    })
}

function getAllPlanets() {
    return habitablePlanets;
}

module.exports = {
    loadPlanetsData,
    getAllPlanets,
};