var Media = {

	init: function () {
		Crafty.sprite(Config.tile.size, Media.spriteFilepath("original","textures","dirt1.png"), {
			grass: [0,0,1,1],
			stone: [1,0,1,1]
		});

		iso = Crafty.isometric.init(Config.tile.size);
		var z = 0;
		for(var i = 20; i >= 0; i--) {
			for(var y = 0; y < 20; y++) {
				var which = Math.round(Math.random());
				var tile = Crafty.e("2D, DOM, "+ (which ? "grass" : "stone") +", Mouse")
				.attr('z',i+1 * y+1).areaMap([48,0],[96,24],[96,72],[48,96],[0,72],[0,24]).bind("click", function(e) {
					//destroy on right click
					if(e.button === 2) this.destroy();
				}).bind("mouseover", function() {
					if(this.has("grass")) {
						this.sprite(0,1,1,1);
					} else {
						this.sprite(1,1,1,1);
					}
				}).bind("mouseout", function() {
					if(this.has("grass")) {
						this.sprite(0,0,1,1);
					} else {
						this.sprite(1,0,1,1);
					}
				});
				
				iso.place(i,y,0, tile);
			}
		}
		
		Crafty.addEvent(this, Crafty.stage.elem, "mousedown", function(e) {
			if(e.button > 1) return;
			var base = {x: e.clientX, y: e.clientY};

			function scroll(e) {
				var dx = base.x - e.clientX,
					dy = base.y - e.clientY;
					base = {x: e.clientX, y: e.clientY};
				Crafty.viewport.x -= dx;
				Crafty.viewport.y -= dy;
			};

			Crafty.addEvent(this, Crafty.stage.elem, "mousemove", scroll);
			Crafty.addEvent(this, Crafty.stage.elem, "mouseup", function() {
				Crafty.removeEvent(this, Crafty.stage.elem, "mousemove", scroll);
			});
		});
	},

	preload: function (files) {

	},


	filepathMapping: {
		character: Config.filepath.characters,
		mob: Config.filepath.mobs,
		object: Config.filepath.objects,
		texture: Config.filepath.textures,
	},

	spriteFilepath: function (spritepack, type, name) {
		var type_path = Media.filepathMapping;

		return Config.filepath.sprites.path + "/" + spritepack + "/" + type + "/" + name;
	},

}