const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema(
  {
    profile: { type: Schema.Types.ObjectId, ref: "User" },
    services: [
      { id: { type: Schema.Types.ObjectId, ref: "Services" }, price: Number }
    ],
    experience: String,
    // areas:[String],
    pictures: [{ photo_name: String, photo_url: String }]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Artist = mongoose.model("Artist", artistSchema);
module.exports = Artist;
