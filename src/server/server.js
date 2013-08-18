// Node Standard Libs
var   app = require('http').createServer(handler)
	, crypto = require('crypto')
	, path = require('path')
	, fs = require('fs')
	, util = require('util');

// External Libs
var   io = require('socket.io').listen(app)
	, async = require('async');

// Server Libs
var	  config = require('./scripts/config.json').config
	, components = require('./scripts/components.js')
	, resources = require('./scripts/resources.js');

//
// Resource Storage
//
var Storage = new resources.storageMap[config.storage]();

// Game File
var	game = require('./' + config.filepath.resources + '/game.json').game;

// UI
var ui = Storage.getArtPackFiles(path.join(config.filepath.ui, game.ui));


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

	client.emit('urls--ui', ui);

	// client.join('room');

	// Create the character
	// players[client.sessionId] = createPlayer();
	// console.log(players);

	// client.emit('newCharacter', { p: players[sessionId] });

	// client.on('my other event', function (data) {
	// 	console.log(data);
	// });
 });