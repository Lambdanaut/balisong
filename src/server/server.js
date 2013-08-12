var   app = require('http').createServer(handler)
	, io = require('socket.io').listen(app)
	, crypto = require('crypto')

app.listen(80);
function handler (req, res) {
	res.writeHead(403);
	res.end("Silly. No HTTP here! ");
}

//	Realtime server
//
//	PLAYER NOTES
//====================================================
//	id: A random hash that defines the user.
//	{
//	 character: {
//	 	x: The x coordinate of the player's character
//	 	y: The y coordinate of the player's character
//	 	v: { The player's character's velocity, x and y
//	 		x:
//	 		y:
//	 	}
//	 	radius: The player's character's size
//	 }
// }

function newID () {
	var current_date = (new Date()).valueOf().toString();
	var random = Math.random().toString();
	return crypto.createHash('sha1').update(current_date + random).digest('hex');
}

function createPlayer () {
	return {
		character: createCharacter
	}
}

function createCharacter () {
	return {
		  x: 0
		, y: 0
		, v: {
			  x: 0
			, y: 0
		}
		, radius: 5
	}
}

var players = [];
io.sockets.on('connection', function (client) {	
	var sessionId = client.sessionId;

	// Create the character
	players[client.sessionId] = createPlayer();
	console.log(players);

	client.emit('newCharacter', { p: players[sessionId] });

	// client.on('my other event', function (data) {
	// 	console.log(data);
	// });

});