const mongoose = require("mongoose");
const User = require("../models/user");

const dbName = "palcony";
mongoose.connect(`mongodb://localhost/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

User.updateMany({}, { $set: { imgPath: '/uploads/default.jpg' } })
    mongoose.connection.close();