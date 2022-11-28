import { ConnectionPoolClosedEvent } from "mongodb";

const { connectToDatabase, closeConnection } = require("../../../libs/mysql");

export default async function getTripsHandler(req, res) {
  switch (req.method) {
    case "GET":
      if (!req.query["date"] || !req.query["email"] || !req.query["stop_name"] || !req.query["stop_time"] || !req.query["place_type"] || !req.query["place_name"] || !req.query["place_address"])
        res.status(200).json({ message: [], results: false, success: true });
      else {
        try {
          let { db } = await connectToDatabase();
          let [results] = await db.execute("INSERT INTO trips(user_id,stop_name,stop_time,place_name,place_address,place_type,date) VALUES (?,?,?,?,?,?,?)", [
            req.query["email"],
            req.query["stop_name"],
            req.query["stop_time"],
            req.query["place_name"],
            req.query["place_address"],
            req.query["place_type"],
            req.query["date"]
          ]);
          console.log(results);
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