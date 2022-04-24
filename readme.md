Magnificent API Poller

Simple node console app that polls SauceLabs' Magnificent API and tracks its health over 10 second increments.

Will output error stack traces to `'stackTrace.json'` file if an error is found

To run:

`npm install` - only one dependency -> [axios](https://axios-http.com/)

`npm start` - polls Magnificent API every 2 seconds, relays overall health every 10 seconds