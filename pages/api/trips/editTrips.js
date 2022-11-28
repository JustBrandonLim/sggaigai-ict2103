import { ConnectionPoolClosedEvent } from "mongodb";

const { connectToDatabase, closeConnection } = require("../../../libs/mysql");

export default async function getTripsHandler(req, res) {
  switch (req.method) {
    case "GET":
      if (!req.query["trip_id"] || !req.query["stop_name"] || !req.query["stop_time"] || !req.query["place_type"] || !req.query["place_name"] || !req.query["place_address"])
        res.status(200).json({ message: [], results: false, success: true });
      else {
        try {
          let { db } = await connectToDatabase();
          let [results] = await db.execute("UPDATE trips SET stop_name=?,stop_time=?,place_name=?,place_address=?,place_type=? WHERE trip_id=?", [
            req.query["stop_name"],
            req.query["stop_time"],
            req.query["place_name"],
            req.query["place_address"],
            req.query["place_type"],
            req.query["trip_id"]
          ]);
          res.status(200).json({success: true });
          closeConnection();
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