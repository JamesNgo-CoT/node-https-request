const dotenv = require('dotenv');

const httpsRequest = require('./index.js');

dotenv.config();

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

Promise.resolve().then(() => {
	return httpsRequest({
		headers: { 'Accept': 'application/json' },
		host: process.env.BASE_HOST,
		method: 'GET',
		path: process.env.BASE_PATH
	}).then(({ response: { statusCode }, data }) => {
		if (statusCode !== 200) {
			throw data;
		}

		const json = JSON.parse(data);
		console.table(json.value.map(({ __CreatedOn, __ModifiedOn, __Owner, __Status, id, test }) => {
			return { __CreatedOn, __ModifiedOn, __Owner, __Status, id, test };
		}));
	});
}).then(() => {
	return httpsRequest({
		headers: { 'Accept': 'application/json' },
		host: process.env.BASE_HOST,
		method: 'POST',
		path: process.env.BASE_PATH
	}, { test: 'test' }).then(({ response: { statusCode }, data }) => {
		if (statusCode !== 201) {
			throw data;
		}

		const json = JSON.parse(data);
		console.table(Object.keys(json).map((key) => ({ key, value: json[key] })));
	});

}).catch((error) => {
	console.error(error);
});


