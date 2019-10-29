import mongoose from "mongoose";
const Schema = mongoose.Schema;
// defines the schema for a user object and
// exports a model for it
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdOrders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order"
    }
  ]
});
export const User = mongoose.model("User", userSchema);
