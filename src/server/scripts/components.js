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

exports.createPlayer = function () {
	return {
		character: createCharacter
	}
}

exports.createCharacter = function (x, y) {
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