import { Schema, model, models, Types } from "mongoose";
const productSchema = new Schema(
  {
    _id: {
      type: Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    descriptionPara1: {
      type: String,
      required: true,
    },
    descriptionPara2: {
      type: String,
      required: true,
    },
    descriptionPara3: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrls: [
      {
        key: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: true,
    },
    colors: {
      type: Map,
      of: String, // Value is a hex code (string)
      required: true,
    },
    highlights: {
      type: [String],
      required: true,
    },
    sizes: {
      type: [String],
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
      required: true,
    },
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", productSchema);

export default Product;
