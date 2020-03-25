const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const userimgSchema = new Schema({
  name: String,
  path: String,
  originalName: String

}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Userimg = mongoose.model("Userimg", userimgSchema);
module.exports = Userimg;