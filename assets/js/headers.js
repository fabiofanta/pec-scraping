module.exports = function headers(cookie) {
	return {
		headers : {
			'Access-Control-Allow-Origin' : '*',
			'Access-Control-Allow-Headers' : '*',
			'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
			'Allow':'GET, POST, PUT, DELETE, OPTIONS, HEAD',
			"Access-Control-Expose-Headers" : "Access-Control-*",
			'Connection' : 'keep-alive',
			'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
			'Content-Type' : 'application/x-www-form-urlencoded',
			'Accept-Encoding' : 'gzip,deflate,br',
			'Content-Length' : 749,
			'Cookie' : cookie,
			'Host' : 'www.inipec.gov.it',
			'Origin' : 'https://www.inipec.gov.it',
			'Upgrade-Insecure-Requests' : 1
		}
	}
};
