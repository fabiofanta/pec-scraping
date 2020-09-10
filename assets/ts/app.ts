// import dependencies
import {Scraping} from './scraping.js';
import {Captcha} from './captcha.js';
import {ServerRequest} from './serverRequest.js';
import {mongoDB} from './db.js';

const PORT = process.env.PORT || 5000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var http = require('http');
var server = http.Server(app);



const parameters = require('../../.env');
const headers = require('../../assets/js/headers');


const scrap = new Scraping ('https://www.inipec.gov.it/cerca-pec/-/pecs/companies');

const captcha = new Captcha ('https://2captcha.com/in.php',parameters);

const searchVat = async function run(vat,res) {
	const html = await scrap.getHtml();
	const head = headers(html.cookie);
	const captchaInit = await captcha.initCaptcha();
	 setTimeout(async function(){
		const token = await captcha.resolveCaptcha(captchaInit);
		const payload = '_1_WAR_searchpecsportlet_formDate='+ html.formDate + '&_1_WAR_searchpecsportlet_tabSelected=companies&_1_WAR_searchpecsportlet_company-name=&_1_WAR_searchpecsportlet_regionCode=&_1_WAR_searchpecsportlet_tax-code-vat='+ vat +'&_1_WAR_searchpecsportlet_email-address=&g-recaptcha-response=' + token + '&_1_WAR_searchpecsportlet_g-recaptcha-response=';
		console.log(payload);

		const server = new ServerRequest (head,payload,html.authUrl);

		const response = await server.postData(vat);
		console.log(response);

		mongoDB.insertDocuments(response);

		res.send(response);

 	}, 100000);
}

	app.use(express.static('public/client'));
	app.use(bodyParser.text({ extended: true }));
	app.post('/', async function (req, res) {
		console.log(req.body);
		searchVat(req.body,res);
    });

    app.listen(PORT, () => {
  		console.log(`Example app listening`)
	});
