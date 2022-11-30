import { ConnectionPoolClosedEvent } from "mongodb";

const { connectToDatabase, closeConnection } = require("../../../libs/mysql");

export default async function getTripsHandler(req, res) {
  switch (req.method) {
    case "GET":
      if (!req.query["date"] || !req.query["email"]) res.status(200).json({ message: [], results: false, success: true });
      else {
        try {
          let { db } = await connectToDatabase();
          console.log(req.query["email"]);
          console.log(req.query["date"]);
          let [results] = await db.execute("SELECT * FROM trips WHERE user_id = ? AND date like CONCAT(?,'%') ORDER BY stop_time ASC", [
            req.query["email"],
            req.query["date"],
          ]);
          closeConnection();
          if (results.length != 0) {
            res.status(200).json({ message: results, success: true });
          } else res.status(200).json({ message: [], success: true });
          console.log("CCB");
        } catch (error) {
          closeConnection();
          res.status(200).json({ message: new Error(error).message, success: false });
        }
      }
      break;
    default:
      res.setHeader("Allow", "GET");
      res.status(405).end("Not allowed!");
      break;
  }
}
