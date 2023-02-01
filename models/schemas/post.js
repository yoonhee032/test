import { Schema, model, models } from "mongoose";

const postSchema = new Schema({
  item_title: {
    type: String,
    required: true,
  },
  item_description: {
    type: String,
  },
  item_image_url: {
    type: String,
  },
  item_url: {
    type: String,
    required: true,
  },
  favorites: {
    type: Boolean,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User", //참조 collection
  },
  folder: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Post = models.Post || model("Post", postSchema);

export default Post;
