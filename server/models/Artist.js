const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema(
  {
    profile: { type: Schema.Types.ObjectId, ref: "User" },
    services: [
      { id: { type: Schema.Types.ObjectId, ref: "Services" }, price: Number }
    ],
    experience: String,
    city: String,
    pictures: [{ photo_name: String, photo_url: String }],
    comments: [{ id: { type: Schema.Types.ObjectId, ref: "Comments" } }],
    ranking: Number
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
