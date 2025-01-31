import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: ture,
    },
    reciverId: {
      type: String,
      required: ture,
    },
    content: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Message =  mongoose.model("Message",messageSchema);
