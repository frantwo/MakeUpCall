const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema(
  {
    valoration: Number,
    title: String,
    comment: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    artist: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Comments = mongoose.model("Comments", commentsSchema);
module.exports = Comments;
