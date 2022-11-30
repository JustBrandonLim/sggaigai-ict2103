const { connectToDatabase } = require("../../../libs/mongodb");

export default async function DeleteThingsHandler(req, res) {
  switch (req.method) {
    case "POST":
      if (!req.body["placeID"]) res.status(200).json({ results: false, success: true });
      else {
        let { db } = await connectToDatabase();

        const placeID = req.body["placeID"];

        if (placeID.toUpperCase().startsWith("R")) {
          await db.collection("RESTAURANTS").deleteOne({ ID: placeID });

          res.status(200).json({ results: true, success: true });
        } else if (placeID.toUpperCase().startsWith("H")) {
          await db.collection("HOTELS").deleteOne({ ID: placeID });

          res.status(200).json({ results: true, success: true });
        } else if (placeID.toUpperCase().startsWith("E")) {
          await db.collection("EVENTS").deleteOne({ ID: placeID });

          res.status(200).json({ results: true, success: true });
        }
      }
      break;
    default:
      res.setHeader("Allow", "POST");
      res.status(405).end("Not allowed!");
      break;
  }
}
