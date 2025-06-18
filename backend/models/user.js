const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  landSize: String,
  cropType: String,
  sowingDate: String,
  phone: String,
  preferredLanguage: String,
  location: {
    latitude: Number,
    longitude: Number
  }
});

module.exports = mongoose.model('User', UserSchema);
