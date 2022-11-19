const { connectToDatabase, closeConnection } = require("../../../libs/mysql");

export default async function DeleteFavouritesHandler(req, res) {
  switch (req.method) {
    case "POST":
      if (!req.body["userID"] || !req.body["placeID"]) res.status(200).json({ results: false, success: true });
      else {
        let { db } = await connectToDatabase();

        let [checkResults] = await db.execute("SELECT * FROM favourite_list WHERE user_id = ? AND places_id = ?", [
          req.body["userID"],
          req.body["placeID"],
        ]);

        if (checkResults.length == 0) res.status(200).json({ results: false, success: true });
        else {
          let [results] = await db.execute("DELETE FROM favourite_list WHERE user_id = ? AND places_id = ?", [
            req.body["userID"],
            req.body["placeID"],
          ]);

          if (results["affectedRows"] == 1) res.status(200).json({ results: true, success: true });
          else res.status(200).json({ results: false, success: true });
        }

        closeConnection();
      }
      break;
    default:
      res.setHeader("Allow", "POST");
      res.status(405).end("Not allowed!");
      break;
  }
}
