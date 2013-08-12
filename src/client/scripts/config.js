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
			textures: "textures",
		},
		ui: "resources/img/ui",
	},

	// Dimensions of isometric game tiles
	tile: {
		width: 96,
		length: 96,
		height: 96,
	},
};