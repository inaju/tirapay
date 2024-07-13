import axios from "axios";

export const updateDuewithReceiptNo = async (reqData) => {
  try {
    const data = await axios.put(`/api/due?receiptNo=${reqData?.receiptNo}`, {
      body: reqData?.data,
    });
    return data?.data?.data;
  } catch (error) {
    console.log(error.message, "there is an error");
  }
};
export const getDuewithReceiptNo = async (reqData) => {
  try {
    const data = await axios.get(`/api/due?receiptNo=${reqData?.receiptNo}`);
    return data?.data?.data;
  } catch (error) {
    console.log(error.message, "there is an error");
  }
};
export const getDue = async () => {
  try {
    const data = await axios.get("/api/due");
    return data?.data?.data;
  } catch (error) {
    throw new Error(error);
  }
};
export const postDue = async (reqData) => {
  try {
    if (!reqData) return;
    const data = await axios.post("/api/due", reqData);
    return data?.data;
  } catch (error) {
    throw new Error(error);
  }
};
