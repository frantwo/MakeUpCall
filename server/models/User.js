const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
    role: { type: String, enum: ["User", "Artist"] },
    services: [
      { id: { type: Schema.Types.ObjectId, ref: "Services" }, price: Number }
    ],
    experience: String,
    // areas:[String],
    pictures: [{ photo_name: String, photo_url: String }],
    ranking: Number
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
