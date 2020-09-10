// import dependencies
import {Scraping} from './scraping.js';
import {Captcha} from './captcha.js';
import {ServerRequest} from './serverRequest.js';
import {mongoDB} from './db.js';
const express = require('express');
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 5000;

// express.js
const app = express();
var http = require('http');
var server = http.Server(app);


// config parameters
const parameters = require('../../.env');
const headers = require('../../assets/js/headers');
const appConfig = require('../../assets/js/config');

// objects instances
const scrap = new Scraping (appConfig.urlScrapSite);
const captcha = new Captcha (appConfig.captchaServiceUrl,parameters);

// express server iterations
app.use(express.static('public/client'));
app.use(bodyParser.text({ extended: true }));
app.post('/', function (req, res) {
	console.log(req.body);
	searchVat(req.body,res);
});

app.listen(PORT, () => {
	console.log(`Example app listening`)
});



const searchVat = async function run(vat,res) {
	const html = await scrap.getHtml();
	const head = headers(html.cookie);
	const captchaInit = await captcha.initCaptcha();


	 setTimeout(async function(){
		const token = await captcha.resolveCaptcha(captchaInit);
		if (token !== 'CAPCHA_NOT_READY') {
			const payload = appConfig.urlScrapPost.formDateString + html.formDate + appConfig.urlScrapPost.bodyString + vat + appConfig.urlScrapPost.emailRecaptcha + token + appConfig.urlScrapPost.gRecaptcha;

			const server = new ServerRequest (head,payload,html.authUrl);

			const response = await server.postData(vat);

			if (response !== undefined) {
				mongoDB.insertDocuments(response);
				res.send(response);
			} else {
				res.send({pec:'Vat Code not in database or not valid, try removing letters'});
			};
		} else {
			res.send({pec:'Captcha not ready, retry in 10 seconds '});
		}

 	}, 28000);
}
