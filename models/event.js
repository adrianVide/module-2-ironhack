const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const eventSchema = new Schema(
  {
    name: {type: String, required: true},
    description: String,
    organizer: Array,
    date: { type: Date, default: Date.now } 
    latitude: String,
    longitude: String,
    imgName: String,
    imgPath: String,
    participants: Array,
    isItOver: {type: Boolean, default: false}
    reviews: Array,
  },
  {
    timestamps: true
  }
);
const Event = mongoose.model('User', eventSchema);
module.exports = Event;