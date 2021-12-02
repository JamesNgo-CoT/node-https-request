const httpsRequest = require('./index.js');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

httpsRequest({
	headers: { 'Accept': 'application/json' },
	host: 'httpbin.org',
	method: 'GET',
	path: '/get'
}).then(({ response: { statusCode }, data }) => {
	console.log('\u001b[36mGET\u001b[0m');
	console.log(statusCode, JSON.parse(data));
}, (error) => {
	console.error(error);
});

httpsRequest({
	headers: { 'Accept': 'application/json' },
	host: 'httpbin.org',
	method: 'POST',
	path: '/post'
}, { test: 'test' }).then(({ response: { statusCode }, data }) => {
	console.log('\u001b[36mPOST\u001b[0m');
	console.log(statusCode, JSON.parse(data));
}, (error) => {
	console.error(error);
});
