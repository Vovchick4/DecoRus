import mongoose from "mongoose";

const { Schema } = mongoose;

/*
  Model 'User'
  2 properties
  email - String
  password - String
  role - String
    + available values:
      "admin",
      "user"
*/
const collectionSchema = new Schema({
    _coll_id: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: {
            id: Number,
            filename: String,
        },
        required: true,
    },
});

export default mongoose.model("collections", collectionSchema);