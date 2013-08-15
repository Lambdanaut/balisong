// External Libs
var   app = require('http').createServer(handler)
	, io = require('socket.io').listen(app)
	, async = require('async')
	, crypto = require('crypto')
	, fs = require('fs')
	, util = require('util');


// Server Libs
var	  config = require('./scripts/config.json').config
	, components = require('./scripts/components.js')
	, resources = require('./scripts/resources.js');


// Individual Game File
var	game = require('./' + config.filepath.resources + '/game.json').game;
	

//
// HTTP Server
//
app.listen(80);
function handler (req, res) {
	res.writeHead(403);
	res.end("Silly. No HTTP here! ");
}

//
//	Realtime server
//

// function newID () {
// 	var current_date = (new Date()).valueOf().toString();
// 	var random = Math.random().toString();
// 	return crypto.createHash('sha1').update(current_date + random).digest('hex');
// }

var players = [];
io.sockets.on('connection', function (client) {	
	// console.log("New connection: sessionID " + util.inspect(client));

	var sessionId = client.sessionId;

	// Send back login screen resource URLs
	fs.readdir('./' + config.filepath.ui + '/' + game.loginUI, function (err, files) {
		console.log(files);
	});



	// client.join('room');

	// Create the character
	// players[client.sessionId] = createPlayer();
	// console.log(players);

	// client.emit('newCharacter', { p: players[sessionId] });

	// client.on('my other event', function (data) {
	// 	console.log(data);
	// });
 });