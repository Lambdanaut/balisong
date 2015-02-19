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
app.listen(config.network.port);
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
io.sockets.on('connection', function (socket) {	

	socket.emit('urls--ui', ui);

	// console.log("New connection: sessionID " + util.inspect(socket));
	// socket.join('room');

	// Create the character
	// players[socket.sessionId] = createPlayer();
	// console.log(players);

	// socket.emit('newCharacter', { p: players[sessionId] });

	// socket.on('my other event', function (data) {
	// 	console.log(data);
	// });

	socket.on('new--map', function (data) {
		console.log("DOWNLOADING MAP");

		// --Cheating test--
		// Perform some checks to make sure the character is able to load the map


		// Load the new map from data
		var map = require('./' + path.join(config.filepath.maps, "test.json"));

		// Get a list of all actor's IDs from "map", then search the database
		// for all of their stats to send back to the client


		// Get actor metadata from our database
		blocks = {0: {
			url: "img/sprites/original/blocks/grass_01.png",
		}};
		objects = {};
		mobs = {};
		characters = {};

		// Convert actor metadata relative graphics paths to absolute paths
		async.each([blocks, objects, mobs, characters], function () {

		}, function (err, actors) {
			// Combine actor metadata with map variable and send back to the client
			// {id : actor-metadata}
			map.actors = {};
			map.actors.blocks = {0: {
				url: "img/sprites/original/blocks/grass_01.png",
			}};
			map.actors.objects = {};
			map.actors.mobs = {};
			map.actors.characters = {};

			socket.emit('new--map', map);
		})

	});

});