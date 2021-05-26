const mongoose = require("mongoose");

const gamelog = new mongoose.Schema({
    guild: String,
    channel: String
});

module.exports = mongoose.model("gamelog", gamelog);