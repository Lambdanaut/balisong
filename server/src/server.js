// Node Standard Libs
var   app = require('http').createServer(handler)
    , crypto = require('crypto')
    , path = require('path')
    , fs = require('fs')
    , util = require('util');

// External Libs
var   async = require('async')
    , io = require('socket.io').listen(app)
    , mongoose = require('mongoose');

// Server Libs
var      config = require('./scripts/config.json').config
    , components = require('./scripts/components.js')
    , errors = require('./scripts/errors.js')
    , models = require('./scripts/models.js')
    , resources = require('./scripts/resources.js');

//
// Database
//
mongoose.connect('mongodb://' + config.database.host + '/' + config.database.collection);

//
// Resource Storage
//
var Storage = new resources.storageMap[config.storage]();

// UI
var ui = Storage.getArtPackFiles(path.join(config.filepath.ui, 'original'));

//
// HTTP Server
//
app.listen(config.network.port);
function handler (req, res) {
    res.writeHead(403);
    res.end('Silly. No HTTP here! ');
}

//
//    Realtime server
//

// function newID () {
//     var current_date = (new Date()).valueOf().toString();
//     var random = Math.random().toString();
//     return crypto.createHash('sha1').update(current_date + random).digest('hex');
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
    // console.log(data);
    // });

    socket.on('new--map', function (data) {
        /*
        data:
            {
                'mapID': String ID of the requested map to load
            }
        */
        console.log('new--map Event called by ', socket);

        // Extract values from data
        mapID = data['mapID'];

        // Check for all required fields
        requiredFields = [mapID];
        if (!requiredFields.every(function(e, i, a) {return e === null})) {
            console.log('new--map data inputs missing required fields');
            return;
        } 

        // --Cheating test--
        // Perform some checks to make sure the character is able to load the map


        // Load the map from database
        async.series(
            async.apply(
                models.Map.findById(mapID, cb)
            ),
            function(cb) {

                cb(null, xyz);
            },
            function(err, results) {
                if (err) {console.log(err);}
                if results
            }
            )

        // Get a list of all actor's IDs from "map", then search the database
        // for all of their stats to send back to the client


        // Get actor metadata from our database
        blocks = {0: {
            url: 'img/sprites/original/blocks/grass_01.png',
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
        });

    });

});