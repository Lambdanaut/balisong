var Net = {
	socket: io.connect(Config.network.host),
	setup: function () {

		this.socket.on('connecting', function () {
			if (Config.development) console.log("Connecting to server...");
			Crafty("LoadingText").text("Connecting");
		});

		this.socket.on('connect', function () {
			if (Config.development) console.log("Connection successful");
			Crafty("LoadingText").text("Connected");
		});

		this.socket.on('error', function (data) {
			if (Config.development) console.log("Socket.io connection error");
			Crafty("LoadingText").text("Connection Error");
		});

		this.socket.on('newCharacter', function (data) {
			console.log(data);
			this.socket.emit('my other event', { my: 'data' });
		});
	},
}