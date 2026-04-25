const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    number: {
      type: String,
      required: true,
      index: true
    },
    message: {
      type: String
    },
    response: {
        type: String
    }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
