const httpsRequest = require('./index.js');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

Promise.resolve().then(() => {
	console.log('\u001b[36mGET\u001b[0m');

	return httpsRequest({
		headers: { 'Accept': 'application/json' },
		host: 'httpbin.org',
		method: 'GET',
		path: '/get'
	}).then(({ response: { statusCode }, data }) => {
		console.log(statusCode, JSON.parse(data));
	});
}).then(() => {
	console.log('\u001b[36mPOST\u001b[0m');

	return httpsRequest({
		headers: { 'Accept': 'application/json' },
		host: 'httpbin.org',
		method: 'POST',
		path: '/post'
	}, { test: 'test' }).then(({ response: { statusCode }, data }) => {
		console.log(statusCode, JSON.parse(data));
	});
}).catch((error) => {
	console.error(error);
});
