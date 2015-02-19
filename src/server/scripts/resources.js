// Node Standard Libs
var   path = require('path')
	, util = require('util');

// Server Libs
var config = require('./config.json').config;


exports.spriteFilepath = function (spritepack, type, name) {
	return Config.filepath.sprites.path + "/" + spritepack + "/" + type + "/" + name;
};

// Template class for other storages to inherit from
Storage = (function () {
	console.log("Using storage: " + this.name);
})
Storage.prototype.save = function () {
    // Saves a file from one location to a destination
};
Storage.prototype.get = function (filepath) {
	// Given a short filepath like /resources/img/ui/original/loading.png, returns a direct URL to the file in storage. 
};
Storage.prototype.download = function (filepath) {
	// Downloads the file's contents for use in the server
};
Storage.prototype.delete = function (filepath) {
	// Deletes a file given its short filepath
};
Storage.prototype.getArtPackFiles = function (artpackFilepath) {
	// Given a short filepath to an artpack directory like /resources/img/ui/original, returns an object of filename:absolutePath mappings
	var artpackFiles = require(this.get(artpackFilepath) + "/artpack.json").artpack.files;
	var convertedFilepaths = {};
	for (var filename in artpackFiles) {
		convertedFilepaths[filename] = this.get(artpackFilepath + '/' + artpackFiles[filename]);
	}
	return convertedFilepaths;
}


// Class for accessing locally saved resources
LocalStorage = function () {
	this.name = "Local";
};
util.inherits(LocalStorage, Storage);

LocalStorage.prototype.get = function (filepath) {
    return path.resolve(filepath);
};
// exports.LocalStorage = LocalStorage;

// Class for accessing resources saved on Amazon S3
S3Storage = function () {
	this.name = "S3";
};
util.inherits(S3Storage, Storage);
// exports.S3Storage = S3Storage;

exports.storageMap = {
	"Local": LocalStorage,
	"S3": S3Storage,
}