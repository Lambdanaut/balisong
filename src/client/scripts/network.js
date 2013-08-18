var Net = {
	socket: io.connect(Config.network.host),
	setup: function () {

		this.socket.on('connecting', function () {
			if (Config.development) console.log("Connecting to server...");
			$("#connect-text").text("Connecting");
		});

		this.socket.on('connect', function () {
			if (Config.development) console.log("Connection successful");
			$("#connect-text").text("Connected");
		});

		this.socket.on('error', function (data) {
			if (Config.development) console.log("Socket.io connection error");
			$("#connect-text").text("Connection Error");
		});

		// When receiving a list of URLs of login graphics to preload
		this.socket.on('urls--login-ui', function (data) {
			console.log(data);
			Game.ui = data;
			absoluteURLs = [];
			for(var filename in data) {
				absoluteURLs.push(data[filename]);
			}
			// this.socket.emit('my other event', { my: 'data' });
			Media.loginScreen(absoluteURLs);
		});
	},
}