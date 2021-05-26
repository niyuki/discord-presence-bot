const mongoose = require("mongoose");

const rolelog = new mongoose.Schema({
    guild: String,
    channel: String
});

module.exports = mongoose.model("rolelog", rolelog);