var Net = {
	socket: io.connect(Config.network.host),
	setup: function () {

		this.socket.on('connecting', function () {
			if (Config.development) console.log("Connecting to server...");
		});

		this.socket.on('connect', function () {
			if (Config.development) console.log("Connection successful");
		});

		this.socket.on('error', function (data) {
			if (Config.development) console.log("Socket.io connection error");
		});

		// When receiving a list of URLs of login graphics to preload
		this.socket.on('urls--ui', function (data) {
			console.log(data);
			Game.ui = data;

			// Bootup and connecting loading screen
			Crafty.scene("Loading--Boot");

			// this.socket.emit('my other event', { my: 'data' });
		});
	},
}