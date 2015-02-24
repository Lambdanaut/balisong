// External Libs
var   mongoose = require('mongoose');

//
// Initialize schema
//
var Schema = mongoose.Schema;

//
// Models
//
var GameSchema = new Schema({
    title: String,
    author_id: Schema.Types.ObjectId,
    version: String,
    description: String,
    ui: Schema.Types.ObjectId
});
exports.Game = mongoose.model('game', GameSchema);

var UISchema = new Schema({
    title: String,
    author_id: Schema.Types.ObjectId,
    version: String,
    description: String,
    ui: Schema.Types.ObjectId
});
exports.UI = mongoose.model('ui', UISchema);

var MapSchema = new Schema({
    title: String,
    blocks: [{
        "id": Schema.Types.ObjectId,
        "x": Number,
        "y": Number,
        "z": Number
    }],
    objects: [{
        "id": Schema.Types.ObjectId,
        "x": Number,
        "y": Number
    }],
    mobs: [{
        "id": Schema.Types.ObjectId,
        "x": Number,
        "y": Number
    }]
});
exports.Map = mongoose.model('map', MapSchema);

