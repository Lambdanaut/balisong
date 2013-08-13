//
// Client default configuration
//

var Config = {
	development: true,

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

	// Canvas Size
	canvas: {
		w: 768,
		h: 518,
	},

	// Dimensions of isometric game tiles
	tile: {
		w: 96,
		l: 96,
		h: 96,
		s: 96,
	},
};