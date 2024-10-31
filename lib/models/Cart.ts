import { Schema, model, models } from "mongoose";
const cartSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: false,
    },
    productImage: {
      type: String,
      required: true,
    },
    productSize: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
      required: true,
    },
    productColor: {
      type: String, // Value is a hex code (string)
      required: true,
    },
    productQuantity: {
      type: Number,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const Cart = models.Cart || model("Cart", cartSchema);

export default Cart;
