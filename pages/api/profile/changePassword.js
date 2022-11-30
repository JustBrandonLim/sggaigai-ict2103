const { connectToDatabase, closeConnection } = require("../../../libs/mysql");

export default async function ChangePasswordHandler(req, res) {
  switch (req.method) {
    case "POST":
      if (!req.body["email"] || !req.body["password"]) res.status(200).json({ results: false, success: true });
      else {
        try {
          let { db } = await connectToDatabase();

          let [results] = await db.execute("UPDATE user SET password = ? WHERE email = ?", [req.body["password"], req.body["email"]]);

          closeConnection();

          if (results["affectedRows"] == 1) res.status(200).json({ results: true, success: true });
          else res.status(200).json({ results: false, success: true });
        } catch (error) {
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
