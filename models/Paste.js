const mongoose = require('mongoose');

const pasteSchema = new mongoose.Schema({
  short: String,
  text: String,
}, { timestamps: true });



const Paste = mongoose.model('Paste', pasteSchema);

module.exports = User;
