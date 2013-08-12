//
// Client configuration
//

var Config = {

	network: {
		// The server's IP address or domain name
		host: "http://localhost",
	},

	// Filepaths
	filepath: {
		resources: "resources",
		images: "resources/img",
		sprites: {
			path: "resources/img/sprites",

			// Paths relative to the sprites path
			mobs: "mobs",
			characters: "characters",
			objects: "objects",
			blocks: "blocks",
		},
		ui: "resources/img/ui",
	},

	// Dimensions of isometric game tiles
	tile: {
		width: 94,
		length: 94,
		height: 94,
		size: 94,
	},
};