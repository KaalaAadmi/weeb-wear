import { Schema, model, models } from "mongoose";
const customSchema = new Schema({
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  croppedImageUrl: {
    type: String,
    required: false,
  },
});

const Custom = models.Custom || model("Custom", customSchema);

export default Custom;
