import axios from "axios";

export const sendEmail = async (reqData) => {
    console.log(reqData,'reqData')
  try {
    const data = await axios.get("/api/send-email", { params: reqData });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
