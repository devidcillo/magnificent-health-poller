import axios from 'axios'
import fs from 'fs'

console.log('Is Magnificent API Healthy?\n')
console.log('run `npm print-trace` if there\'s an unexpected error you\'d like to know more about')
console.log('"Unexpected error" = Anything other than `Magnificent!` being printed out to the console\n\n')
console.log('Reaching out to Magnificent API...')

let aggregatedLogs = []

const getMagnificent = () => {
    axios.get('https://api.us-west-1.saucelabs.com/v1/magnificent/')
        .then(function (response) {
            constructLogFrom(response);
        })
        .catch(function (error) {
            constructLogFrom(error.response)
            writeErrorTraceToFile(error)
        })
}

const constructLogFrom = ({data, status}) => {
    let log = {}
    log.status = data
    log.code = status
    console.log(log.status)
    aggregatedLogs.push(constructDateString(), log)
}

const writeErrorTraceToFile = data => {
    const legibleDateAndTime = constructDateString();
    const editedErrorAsJson = `Error on ${legibleDateAndTime} => ${JSON.stringify(data)}\n`
    fs.appendFile('stackTrace.json', editedErrorAsJson, err => {
        if (err)
            console.log('Failed to write stack trace to file')
    })
}

const constructDateString = () => {
    const currentTimestamp = new Date()
    const localeDateString = currentTimestamp.toLocaleDateString()
    const localeTimeString = currentTimestamp.toLocaleTimeString()
    return `${localeDateString} at ${localeTimeString}`
}

const calculateAndPrintHealthPercentage = () => {
    const healthyPings = aggregatedLogs.filter(value => value.code === 200)
    const healthPercentage = (healthyPings.length / (aggregatedLogs.length / 2)) * 100
    console.log(`Since starting this run, the Magnificent API has been healthy ${healthPercentage}% of the time`)
}

setInterval(getMagnificent, 2000);
setInterval(calculateAndPrintHealthPercentage, 10000);