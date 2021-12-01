const https = require('https');

/**
 * A https.request wrapper function.
 * @param {Object} httpsOptions
 * @param {(string|Object)} [payload]
 * @returns {Promise.<{ response: Object, data: string }, any>}
 * @example
 * nodeHttpsRequest({
 * 	headers: { 'Accept': 'application/json' },
 * 	host: 'httpbin.org',
 * 	method: 'GET',
 * 	path: '/get'
 * }).then(({ response: { statusCode }, data }) => {
 * 	console.log(statusCode, JSON.parse(data));
 * });
 * @example
 * nodeHttpsRequest({
 * 	headers: { 'Accept': 'application/json' },
 * 	host: 'httpbin.org',
 * 	method: 'POST',
 * 	path: '/post'
 * }, { test: 'test' }).then(({ response: { statusCode }, data }) => {
 * 	console.log(statusCode, JSON.parse(data));
 * });
 */
module.exports = function (httpsOptions, payload) {
	return new Promise((resolve, reject) => {
		const requestOptions = Object.assign({
			headers: {},
			method: 'GET',
			port: 443
		}, httpsOptions);

		if (payload) {
			if (typeof payload === 'object') {
				payload = JSON.stringify(payload);

				if (!requestOptions.headers['Content-Type']) {
					requestOptions.headers['Content-Type'] = 'application/json';
				}
			}

			requestOptions.headers['Content-Length'] = Buffer.byteLength(payload);
		}

		const request = https.request(requestOptions, (response) => {
			let data = '';

			response.on('data', (chunk) => {
				data += chunk;
			});

			response.on('end', () => {
				resolve({ response, data });
			});
		});

		request.on('error', (error) => {
			reject(error);
		});

		if (payload) {
			request.write(payload);
		}

		request.end();
	});
};
