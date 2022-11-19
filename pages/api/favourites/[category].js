const { connectToDatabase: connectToDatabaseMongoDB } = require("../../../libs/mongodb");
const { connectToDatabase: connectToDatabaseMySQL, closeConnection } = require("../../../libs/mysql");

export default async function SearchHandler(req, res) {
  switch (req.method) {
    case "GET":
      if (!req.query["userID"] || req.query["userID"] == "undefined") res.status(200).json([]);
      else {
        try {
          let { db: mysqlDB } = await connectToDatabaseMySQL();
          let { db: mongoDB } = await connectToDatabaseMongoDB();
          switch (req.query.category) {
            case "eat":
              let [eatResults] = await mysqlDB.execute("SELECT places_id FROM favourite_list WHERE user_id = ? AND places_id LIKE ?", [
                req.query["userID"],
                "R%",
              ]);

              let filterEat = eatResults.map((e) => {
                return e.places_id;
              });

              //
              let restaurants = await mongoDB
                .collection("RESTAURANTS")
                .find({ ID: { $exists: true, $in: filterEat } })
                .toArray();

              res.status(200).json(restaurants);
              break;
            case "do":
              let [doResults] = await mysqlDB.execute("SELECT places_id FROM favourite_list WHERE user_id = ? AND places_id LIKE ?", [
                req.query["userID"],
                "E%",
              ]);
              closeConnection();

              let filterDo = doResults.map((e) => {
                return e.places_id;
              });

              let events = await mongoDB
                .collection("EVENTS")
                .find({ ID: { $exists: true, $in: filterDo } })
                .toArray();

              res.status(200).json(events);
              break;
            case "stay":
              let [stayResults] = await mysqlDB.execute("SELECT places_id FROM favourite_list WHERE user_id = ? AND places_id LIKE ?", [
                req.query["userID"],
                "H%",
              ]);
              closeConnection();

              let filterStay = stayResults.map((e) => {
                return e.places_id;
              });

              let hotels = await mongoDB
                .collection("HOTELS")
                .find({ ID: { $exists: true, $in: filterStay } })
                .toArray();

              res.status(200).json(hotels);
              break;
          }
          closeConnection();
        } catch (error) {
          res.status(200).json({
            message: new Error(error).message,
            success: false,
          });
        }
      }
      break;
    default:
      res.setHeader("Allow", "GET");
      res.status(405).end("This is not allowed!");
      break;
  }
}
