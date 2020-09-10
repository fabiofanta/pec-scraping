# Pec-scraping

NodeJS Typescript MongoDB Vue.js Atlas PEC Italian Email Scraper

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

Run app with Heroku:
-Install Heroku --> https://devcenter.heroku.com/articles/heroku-cli;

Run locally with heroku local:

```bash
$ heroku local web
```
-Browser localhost:5000

Run app backend with NodeJS:
-From project Root:

```bash
$ node public/js/app.js
```
