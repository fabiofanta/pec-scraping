// import dependencies
const cheerio = require('cheerio');
import axios from 'axios';



class ServerRequest {
	config : object;
	payload : string;
	url : string;


	constructor(conf:any,pay:string,url:string) {
		this.config = conf;
		this.payload = pay;
		this.url = url;

	}

	async postData(vat) {
		try {
			const postRequest = await axios.post(this.url,this.payload,this.config);
			const body = postRequest.data;
			const $ = cheerio.load(body);
			const business = $('.portlet-body .header-title').text().trim();
			const pec = $('.aui-field-wrapper-content').contents().get(0).next.next.data;
			console.log(pec);
			const payload = {'business': business,'pec':pec,'vatCode': vat};
			return payload
		}
		catch(error) {
		   console.log(error.response);
	   }
	}
}


export {ServerRequest};
