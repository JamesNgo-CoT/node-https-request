# node-https-request

Version 1.2.1

## Installation

``` console
npm install https://github.com/JamesNgo-CoT/node-https-request.git#1.2.1
```

## Usage

``` JavaScript
const payload = {}; // NOTE: SET TO NULL TO IGNORE

httpsRequest({
  headers: { 'Accept': 'application/json' },
  host: process.env.BASE_HOST,
  method: 'POST',
  path: process.env.BASE_PATH
}, payload).then(({ response: { statusCode }, data }) => {

  // TODO: ADD CODE TO HANDLE SUCCESS

}, (error) => {

  // TODO: ADD CODE TO HANDLE ERROR

});
```
