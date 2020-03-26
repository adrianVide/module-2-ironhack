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
    imgPath: {type: String, default: '/images/whatever.jpg'},
    organizedEvents: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    pastOrganizedEvents: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    participatedEvents: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    pastParticipatedEvents: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    reviews: { type: Schema.Types.ObjectId, ref: 'Event' },
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;