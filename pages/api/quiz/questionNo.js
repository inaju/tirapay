import connectMongoDB from "@/libs/mongodb";
import { TeamModel } from "@/models/team";

export default async function handler(req, res) {
  const { qno } = req.query;
  if (req.method !== "GET") {
    // const teams = await TeamModel.find({});
    const teams = new TeamModel({ name: "iisd", questionNo: "12" });
    // const team = teams[0];
    res.status(200).json({ message: "data saved", data: teams });
    return teams.save();
  } else {
    // read which questoin the user is in, endTime from db, send to user.

    // const authToken = req.headers.authorization;
    // check if leader, auth etc.
    console.log("running post method");
    const teamName = "team1";

    await connectMongoDB();
    const teams = await TeamModel.find({});
    const team = teams[0];
    // return teams.save();

    try {
      // res.status(200).json(teams);
      res.status(200).json({ questionNo: team.questionNo });
    } catch (e) {
      res.status(404).json({ message: "omo", error: e });

      // console.log(e);
    }
  }
}
