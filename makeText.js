/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");
const args = process.argv.slice(2)

function makeMm(text) {
    const mm = new markov.MarkovMachine(text)
    return mm
}

if (args[0] == "file") {
    fs.readFile(`./${args[1]}`, 'utf8', function(err, data) {
        if (err) {
            console.log("ERROR!", err)
            process.exit(1)
        } else {
            let text = (makeMm(data))
            console.log(text.makeText()) 
        }
})
}

async function getUrlTxt() {
    let res
    try {
        res = await axios.get(args[1]);
    } catch (err) {
        console.error('Cannot Read URL!');
        process.exit(1);
    }
    let text = makeMm(res.data)
    console.log(text.makeText())
}

if (args[0] == "url") {
    getUrlTxt();
}