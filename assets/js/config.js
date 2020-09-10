// Standard app config parameters

const appConfig = {
	urlScrapSite: 'https://www.inipec.gov.it/cerca-pec/-/pecs/companies',
	captchaServiceUrl: 'https://2captcha.com/in.php',
	urlScrapPost: {
		formDateString: '_1_WAR_searchpecsportlet_formDate=',
		bodyString: '&_1_WAR_searchpecsportlet_tabSelected=companies&_1_WAR_searchpecsportlet_company-name=&_1_WAR_searchpecsportlet_regionCode=&_1_WAR_searchpecsportlet_tax-code-vat=',
		emailRecaptcha: '&_1_WAR_searchpecsportlet_email-address=&g-recaptcha-response=',
		gRecaptcha: '&_1_WAR_searchpecsportlet_g-recaptcha-response='
	},
};

module.exports = appConfig;
