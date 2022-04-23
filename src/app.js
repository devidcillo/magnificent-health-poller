const axios = require('axios');

console.log('Is Magnificent API Healthy?')
console.log('run `npm print-trace` if there\'s an unexpected error you\'d like to know more about')
console.log('"Unexpected error" = Anything other than `Magnificent!` being printed out to the console')
console.log('Reaching out to Magnificent API...')

let aggregate = []

const constructLogFrom = ({data, status}) => {
    let log = {}
    log.status = data
    log.code = status
    console.log(log.status)
    aggregate.push(new Date().getTime(), log)
}

const getMagnificent = () => {
    axios.get('https://api.us-west-1.saucelabs.com/v1/magnificent/')
        .then(function (response) {
            constructLogFrom(response);
        })
        .catch(function (error) {
            constructLogFrom(error.response)
        })
    console.log(aggregate)
}

const printAggregate = () => {
    let healthyPings = aggregate.filter(value => value.code === 200)
    let healthPercentage = (healthyPings.length / (aggregate.length / 2)) * 100
    console.log(`Since starting this run, the Magnificent API has been healthy ${healthPercentage}% of the time`)
}

setInterval(getMagnificent, 2000);
setInterval(printAggregate, 10000);