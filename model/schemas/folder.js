import { Schema, model, models } from "mongoose";

const folderSchema = new Schema({
  folder_title: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User", //참조 collection
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Folder = models.Folder || model("Folder", folderSchema);

export default Folder;
