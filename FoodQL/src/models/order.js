import mongoose from "mongoose";
const Schema = mongoose.Schema;
// defines the schema for an order object and
// exports a model for it
const orderSchema = new Schema({
  restaurant: {
    type: String,
    required: true
  },
  foodItems: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});
export const Order = mongoose.model("Order", orderSchema);
