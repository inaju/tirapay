
export default async function handler(req, res) {
  const { qno } = req.query;
  if (req.method !== "GET") {
    res.status(200).json({ message: "data saved", data: req.body });
  } else {
    try {
      res.status(200).json({
        data: [
          {
            id: "ee",
            title: "taiwo",
          },
        ],
      });
    } catch (e) {
      res.status(404).json({ message: "omo", error: e });
    }
  }
}
