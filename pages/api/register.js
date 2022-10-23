const { connectToDatabase, closeConnection } = require("../../libs/mysql");

export default async function RegisterHandler(req, res) {
  switch (req.method) {
    case "POST":
      console.log(JSON.stringify(req.body));

      if (!req.body["email"] || !req.body["password"] || !req.body["firstName"] || !req.body["lastName"])
        res.status(200).json({ results: false, success: true });
      else {
        try {
          let { db } = await connectToDatabase();

          let [results] = await db.execute("INSERT INTO user (email, password, firstName, lastName) VALUES (?, ?, ?, ?)", [
            req.body["email"],
            req.body["password"],
            req.body["firstName"],
            req.body["lastName"],
          ]);

          if (results["affectedRows"] == 1) res.status(200).json({ results: true, success: true });
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
