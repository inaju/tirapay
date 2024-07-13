import connectMongoDB from "@/libs/mongodb";
import { DueModel } from "@/models/due.model";

export default async function handler(req, res) {
  await connectMongoDB();

  switch (req.method) {
    case "GET":
      await getDueHandler(req, res);
    case "POST":
      await postHandler(req, res);
    case "PUT":
      return updateDueHandler(req, res);
  }
  res.status(200).json({ name: "John Doe" });
}

const getDueHandler = async (req, res) => {
  try {
    const { receiptNo } = req.query;
    if (receiptNo) {
      const dueWithReceiptNo = await DueModel.find({ receiptNo: receiptNo });
      return res.status(200).json({ data: dueWithReceiptNo });
    } else {
      const due = await DueModel.find({});
      return res.status(200).json({ data: due });
    }
  } catch (error) {
    res.status(400).json({ message: "error message", error: error });
  }
};
const updateDueHandler = async (req, res) => {
  try {
    const { receiptNo } = req.query;
    console.log(receiptNo, req.body?.body, "receiptNo");
    if (receiptNo) {
      const dueWithReceiptNo = await DueModel.findOneAndUpdate(
        { receiptNo: receiptNo },
        {
          paymentResponse: { ...req.body?.body },
          status: req.body?.body.status,
        }
      );
      console.log(dueWithReceiptNo, "dueWithReceiptNo");
      return res.status(200).json({ data: dueWithReceiptNo });
    }
  } catch (error) {
    res.status(400).json({ message: "error message", error: error });
  }
};

const postHandler = async (req, res) => {
  try {
    const due = new DueModel({ ...req.body });
    await due.save();
    res.status(200).json({ message: "data saved", data: due });
  } catch (error) {
    res.status(400).json({ message: "error message", error: error });
  }
};
