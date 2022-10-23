const { connectToDatabase } = require("../../../libs/mongodb");

export default async function SearchHandler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        let { db } = await connectToDatabase();
        switch (req.query.category) {
          case "eat":
            let restaurants = await db
              .collection("RESTAURANTS")
              .find({
                loc: { $near: { $geometry: { type: "Point", coordinates: [parseFloat(req.query.longitude), parseFloat(req.query.latitude)] } } },
              })
              .toArray();
            res.status(200).json({ restaurants, success: true });
            break;
          case "do":
            res.status(501).json({ message: "This is not implemented yet!", success: false });
            break;
          case "stay":
            let hotels = await db
              .collection("HOTELS")
              .find({
                loc: { $near: { $geometry: { type: "Point", coordinates: [parseFloat(req.query.longitude), parseFloat(req.query.latitude)] } } },
              })
              .toArray();
            res.status(200).json({ hotels, success: true });
            break;
        }
      } catch (error) {
        res.status(200).json({
          message: new Error(error).message,
          success: false,
        });
      }
      break;
    default:
      res.setHeader("Allow", "GET");
      res.status(405).end("This is not allowed!");
      break;
  }
}
