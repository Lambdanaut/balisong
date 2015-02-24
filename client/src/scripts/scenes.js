//
// Loading scenes
//
Crafty.scene('Loading--Boot', function(){
    $("#loading-bar").fadeIn(150);


    // Get the URLs of UI media
    absoluteURLs = [];
    for(var filename in Game.ui) {
        absoluteURLs.push(Game.ui[filename]);
    }

    // Preload user interface media
    Crafty.load(absoluteURLs,
        function() {
            if (Config.development) console.log("Pre-loaded UI interface");

            //when loaded

            $("#loading-bar").fadeOut(150, function () {
                Crafty.scene("Login");
                Crafty.background("url('" + Game.ui['loadingBackground'] + "')");
                // Crafty.audio.play("loaded.ogg"); //Play the loaded sound effect
            });
        },

        function(e) {
            //progress
            $("#loading-bar")
        },

        function(e) {
            //uh oh, error loading
        }
    );

});

Crafty.scene('Loading--Game', function() {
    // Load the player's character

    Crafty.scene("Loading--Map-metadata");
});

Crafty.scene('Loading--Map-metadata', function() {
    // Load map metadata from the server
    // Switches the scene to 'Loading--Map-preload' when the server returns
    Net.socket.emit("new--map");
});

// Run when the server emits "new--map"
Crafty.scene('Loading--Map-preload', function() {
    // Load an overworld room that the player is in
    console.log("test");
    console.log("ing");

    // Get the URLs of actor graphics 
    absoluteURLs = [];

    for(var blockID in Game.actors.blocks) {
        console.log(Game.actors.blocks);
        absoluteURLs.push(Game.actors.blocks[blockID]['url']);
    }
    for(var objectID in Game.actors.objects) {
        absoluteURLs.push(Game.actors.objects[objectID]['url']);
    }
    for(var mobID in Game.actors.mobs) {
        absoluteURLs.push(Game.actors.mobs[mobID]['url']);
    }
    for(var characterID in Game.actors.characters) {
        absoluteURLs.push(Game.actors.characters[characterID]['url']);
    }
    console.log(absoluteURLs);

    Crafty.load(absoluteURLs,
        function() {
            if (Config.development) console.log("Preloaded map actor graphics");

            $("#loading-bar").fadeOut(150, function () {

                // Crafty.audio.play("loaded.ogg"); //Play the loaded sound effect
            });
        },

        function(e) {
            //progress
            $("#loading-bar")
        },

        function(e) {
            //uh oh, error loading
        }
    );


    Crafty.scene("Overworld");
});


//
// Login Scenes
//
Crafty.scene('Login', function(){
    // Display login UI

    Crafty.scene("Loading--Game");
});


//
// Overworld Scenes
//
Crafty.scene('Overworld', function() {
    Crafty.sprite(Config.tile.s, "/home/lambdanaut/balisong/src/server/resources/img/sprites/original/blocks/grass_01.png", {
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

            iso.place(x, y, Math.round(x/5), tile);
        }
    }
    tile.bind('EnterFrame', function () {
        tile.x -= 1;
    });
    Crafty.viewport.follow(tile,0,0);

});