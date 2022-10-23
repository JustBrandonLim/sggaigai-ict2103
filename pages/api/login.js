const { connectToDatabase, closeConnection } = require("../../libs/mysql");

export default async function LoginHandler(req, res) {
  switch (req.method) {
    case "POST":
      if (!req.body["email"] || !req.body["password"]) res.status(200).json({ results: false, success: true });
      else {
        try {
          let { db } = await connectToDatabase();

          let [results] = await db.execute("SELECT email, firstName, lastName FROM user WHERE email = ? AND password = ?", [
            req.body["email"],
            req.body["password"],
          ]);

          if (results.length == 1) res.status(200).json({ results: true, success: true });
          else res.status(200).json({ results: false, success: true });

          closeConnection();
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
