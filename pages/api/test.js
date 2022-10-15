const { connectToDatabase } = require("../../libs/mongodb");
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        let { db } = await connectToDatabase();
        let test = await db.collection("SGGAIGAI").find({}).toArray();
        return res.json({
          message: JSON.parse(JSON.stringify(test)),
          success: true,
        });
      } catch (error) {
        return res.json({
          message: new Error(error).message,
          success: false,
        });
      }
      break;
  }
}
