// External Libs
var fs = require('fs');

// Server Libs
var config = require('./config.json').config;



exports.spriteFilepath = function (spritepack, type, name) {
	return Config.filepath.sprites.path + "/" + spritepack + "/" + type + "/" + name;
}

exports.uiURLs = function (x, callback) {
	fs.readdir();
}