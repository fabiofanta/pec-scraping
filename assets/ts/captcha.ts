// import dependencies
import axios from 'axios';
const parameters = require('../../.env');

class Captcha {

	parameters : object;
	captchaLink : string;

	constructor(link:string,param:object) {
		this.parameters = param;
		this.captchaLink = link;

	}

	async initCaptcha() {
		const captchaInit = await axios.post(this.captchaLink, this.parameters);
		return captchaInit
	}

	async resolveCaptcha(captchaInit) {
		const response = await axios.get('https://2captcha.com/res.php?key='+ parameters.key +'&action=get&id=' + captchaInit.data.request + '&json=1');

		return response.data.request
	}
}


export {Captcha};
