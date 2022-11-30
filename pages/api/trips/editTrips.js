import { ConnectionPoolClosedEvent } from "mongodb";

const { connectToDatabase, closeConnection } = require("../../../libs/mysql");

export default async function getTripsHandler(req, res) {
  switch (req.method) {
    case "POST":
      if (
        !req.body["trip_id"] ||
        !req.body["stop_name"] ||
        !req.body["stop_time"] ||
        !req.body["place_type"] ||
        !req.body["place_name"] ||
        !req.body["place_address"]
      )
        res.status(200).json({ message: [], results: false, success: true });
      else {
        try {
          let { db } = await connectToDatabase();
          let [results] = await db.execute("UPDATE trips SET stop_name=?,stop_time=?,place_name=?,place_address=?,place_type=? WHERE trip_id=?", [
            req.body["stop_name"],
            req.body["stop_time"],
            req.body["place_name"],
            req.body["place_address"],
            req.body["place_type"],
            req.body["trip_id"],
          ]);
          res.status(200).json({ success: true });
          closeConnection();
        } catch (error) {
          closeConnection();
          res.status(200).json({ message: new Error(error).message, success: false });
        }
      }
      break;
    default:
      res.setHeader("Allow", "POST");
      res.status(405).end("Not allowed!");
      break;
  }
}
