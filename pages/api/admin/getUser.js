import { ConnectionPoolClosedEvent } from "mongodb";

const { connectToDatabase, closeConnection } = require("../../../libs/mysql");

export default async function getUsersHandler(req, res) {
  switch (req.method) {
    case "GET":
        try {
            let { db } = await connectToDatabase();
            let [results] = await db.execute("SELECT * FROM user WHERE isAdmin = 0");
            if (results.length != 0) {
            res.status(200).json({ message: results, success: true });
            }
            else res.status(200).json({ message: [], success: true });
            closeConnection();
        } catch (error) {
            res.status(200).json({ message: new Error(error).message, success: false });
        }
      break;
    default:
      res.setHeader("Allow", "GET");
      res.status(405).end("Not allowed!");
      break;
  }
}