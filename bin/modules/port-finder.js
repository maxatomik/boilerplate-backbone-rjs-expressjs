var portfinder = require('portfinder');
portfinder.basePort = Math.floor(Math.random() * 9999) + 1;
portfinder.getPort(function (err, port) {
	console.log(port);
});