const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    description: String,
    latitude: String,
    longitude: String,
    imgName: String,
    imgPath: String,
    organizedEvents: Array,
    pastOrganizedEvents: Array,
    participatedEvents: Array,
    pastParticipatedEvents: Array,
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;