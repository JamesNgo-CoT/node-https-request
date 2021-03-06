const https = require('https');

/**
 * A https.request wrapper function.
 * @param {object} httpsOptions
 * @param {(string|object)} [payload]
 * @returns {Promise.<{ response: object, data: string }, any>}
 */
module.exports = function (httpsOptions, payload) {
	return new Promise((resolve, reject) => {
		const requestOptions = Object.assign({
			headers: {},
			method: 'GET',
			port: 443
		}, httpsOptions);

		if (payload != null) {
			if (typeof payload === 'object') {
				if (!requestOptions.headers['Content-Type']) {
					requestOptions.headers['Content-Type'] = 'application/json';
				}
			}

			if (typeof payload !== 'string') {
				payload = JSON.stringify(payload);
			}

			requestOptions.headers['Content-Length'] = Buffer.byteLength(payload);
		}

		let startDate;
		const request = https.request(requestOptions, (response) => {
			let data = '';

			response.on('data', (chunk) => void (data += chunk));

			response.on('end', () => {
				if (process.env.SHOW_LOG) {
					console.log(`\u001b[36mNODE-HTTPS-REQUEST\u001b[0m completed in \x1b[33m${new Date().getTime() - startDate.getTime()}\x1b[0mms -> \x1b[33m${response.statusCode}\x1b[0m status code -> \x1b[33m${Buffer.byteLength(data)}\x1b[0mB data`);
				}

				resolve({ response, data });
			});
		});

		request.on('error', (error) => void reject(error));

		if (payload != null) {
			request.write(payload);
		}

		if (process.env.SHOW_LOG) {
			startDate = new Date();

			const { host, method, path, port } = requestOptions;
			console.log(`\u001b[36mNODE-HTTPS-REQUEST\u001b[0m ${payload ? `\u001b[33m${Buffer.byteLength(payload)}\u001b[0mB payload -> ` : ''}${method} \u001b[32mhttps://${host}:${port}${path}\u001b[0m`);
		}

		request.end();
	});
};
