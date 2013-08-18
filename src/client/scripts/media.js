var Media = {

	init: function () {
		Crafty.scene("Overworld");
		Crafty.sprite(Config.tile.s, "https://www.google.com/images/srpr/logo4w.png", {
			Grass: [0,0,1,1],
		});

		iso = Crafty.isometric.size(Config.tile.s);
		var z = 0;
		for(var x = 20; x >= 0; x--) {
			for(var y = 0; y < 20; y++) {
				var which = Math.round(Math.random());
				var tile = Crafty.e("2D, Canvas, Mouse, Grass")
				.attr('z', x+1 * y+1)
				.areaMap([48,0],[96,24],[96,72],[48,96],[0,72],[0,24])
				.bind("MouseUp", function(e) {
					//destroy on right click
					if (e.mouseButton === Crafty.mouseButtons.RIGHT) this.destroy();
				});

				iso.place(x, y, which, tile);

			}
		}
		tile.bind('EnterFrame', function () {
			tile.x -= 1;
		});
		Crafty.viewport.follow(tile,0,0);
	},

	loginScreen: function(loginMediaURLs) {
		Crafty.load(loginMediaURLs,
			function() {
				//when loaded
				console.log(Crafty.canvas);

				// Crafty.scene("main"); //go to main scene
				// Crafty.audio.play("loaded.ogg"); //Play the loaded sound effect
			},

			function(e) {
				//progress
			},

			function(e) {
				//uh oh, error loading
			}
		);
	},

}