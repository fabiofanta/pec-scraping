// import dependencies
const cheerio = require('cheerio');
import axios from 'axios';


class Scraping {

	link : string;

	constructor(link:string) {
		this.link = link;
	}

	async getHtml() {
		const response = await axios.get(this.link);
		const body = response.data;
		const $ = cheerio.load(body);
		const cookie = response.headers['set-cookie'];
		const authUrl = $('#_1_WAR_searchpecsportlet_fmCompanies').attr('action');
		const formDate = $('[name="_1_WAR_searchpecsportlet_formDate"]').val();
		return {
			authUrl,
			formDate,
			cookie
		}
	}
}


export {Scraping};
