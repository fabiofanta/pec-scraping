# Pec-scraping

NodeJS Typescript MongoDB Vue.js Atlas PEC Italian Email Scraper
https://pec-scraping.herokuapp.com/

## Installing

Clone repository:

```bash
$ git clone https://github.com/fabiofanta/pec-scraping.git
```
Install packages and dependencies:

```bash
$ npm install
```

Copy, rename (.env.js) and fill (2captcha key) .env-example.js:

```bash
$ cp .env-example.js .env.js
```

Copy, rename (dbInput.js) and fill (MongoDB Atlas NodeJS credentials) dbInput-example.js:

```bash
$ cp dbInput-example.js dbInput.js
```

## Run

Run app with Heroku:
--> Install Heroku --> https://devcenter.heroku.com/articles/heroku-cli;

Run locally with heroku local:

```bash
$ heroku local web
```
-Browser localhost:5000

Run app backend with NodeJS:

First put manually VAT Code instead of 'req.body' inside public/js/app.js

```js
// express server iterations
app.use(express.static('public/client'));
app.use(bodyParser.text({ extended: true }));
app.post('/', function (req, res) {
    searchVat(req.body, res);
});
```
--> then -> From project Root:

```bash
$ node public/js/app.js
```
