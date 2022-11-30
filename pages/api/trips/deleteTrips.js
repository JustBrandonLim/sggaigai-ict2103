import { ConnectionPoolClosedEvent } from "mongodb";

const { connectToDatabase, closeConnection } = require("../../../libs/mysql");

export default async function deleteTripsHandler(req, res) {
  switch (req.method) {
    case "POST":
      if (
        !req.body["date"] ||
        !req.body["email"]
      ) {
        res.status(200).json({ message: [], results: false, success: true });
      } else {
        try {
          let { db } = await connectToDatabase();
          let [results] = await db.execute(
            "DELETE FROM trips WHERE user_id = ? AND CAST(date as Date) = CAST(? as Date)",
            [
              req.body["email"],
              req.body["date"],
            ]
          );
          closeConnection();
          res.status(200).json({ success: true });
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
