import axios from "axios";

export const getTodo = async () => {
  try {
    const data = await axios.get(
      "/api/todo/todo"
    );
    console.log(data?.data?.data,'data')
    return [
        {
          id: "2",
          title: "manye",
        },
        {
          id: "22",
          title: "folashina",
        },
      ];
    // return data?.data;
  } catch (error) {
    console.log(error);
  }
};
export const postTodo = (reqData) => {
    console.log(reqData,'reqData')
  try {
    const data = axios.post(
        "/api/todo/todo",reqData
    );
    return data?.data;
  } catch (error) {
    console.log(error);
  }
};
