var Media = {

	init: function () {
		Crafty.sprite(Config.tile.s, Media.spriteFilepath("original","blocks","grass_01.png"), {
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

	preload: function (files) {

	},

	filepathMapping: {
		character: Config.filepath.characters,
		mob: Config.filepath.mobs,
		object: Config.filepath.objects,
		block: Config.filepath.blocks,
	},

	spriteFilepath: function (spritepack, type, name) {
		var type_path = Media.filepathMapping;

		return Config.filepath.sprites.path + "/" + spritepack + "/" + type + "/" + name;
	},

}