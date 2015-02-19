//
// network.js
//
// Handles all incoming network events
//

var Net = {
	socket: io.connect(Config.network.host + ":" + Config.network.port),
	setup: function () {

		this.socket.on('connecting', function () {
			if (Config.development) console.log("Connecting to server...");
		});

		this.socket.on('connect', function () {
			if (Config.development) console.log("Connection successful");
		});

		this.socket.on('error', function (data) {
			if (Config.development) console.log("Socket.io connection error");
			Crafty.scene("Loading--Boot");
		});

		// Receiving a list of URLs of login media to preload
		this.socket.on('urls--ui', function (data) {
			if (Config.development) console.log("Received UI URLs");
			Game.ui = data;

			// Bootup and connecting loading screen
			Crafty.scene("Loading--Boot");

			// this.socket.emit('my other event', { my: 'data' });
		});

		// Receiving new map data (data.map)
		// Contains lists of all actors on the map (data.map.blocks; data.map.mobs; etc..)
		// Also contains lists of metadata for actors on the map (data.actors.blocks, data.actors.objects; etc)
		this.socket.on('new--map', function (data) {
			if (Config.development) console.log("Received new map meta-data");
			console.log(data);

			// Unloads actors
			for(var blockID in data.actors.blocks) {
				Game.actors.blocks[blockID] = data.actors.blocks[blockID];
			}
			for(var objectID in data.actors.objects) {
				Game.actors.objects[objectID] = data.actors.objects[objectID];
			}
			for(var mobID in data.actors.mobs) {
				Game.actors.mobs[mobID] = data.actors.mobs[mobID];
			}
			for(var characterID in data.actors.characters) {
				Game.actors.characters[characterID] = data.actors.characters[characterID];
			}

			Crafty.scene('Loading--Map-preload');
		});


		this.socket.on()
	},
}