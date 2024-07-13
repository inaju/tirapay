import mongoose, { Schema } from "mongoose";

const dueSchema = new Schema(
  {
    receiptNo: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
    paymentType: {
      type: String,
      required: true,
    },
    paymentResponse: {
      type: Object,
    },
    receiptUrl: String,
  },
  {
    timestamps: true,
  }
);
export const DueModel =
  mongoose.models.DueModel || mongoose.model("DueModel", dueSchema);
