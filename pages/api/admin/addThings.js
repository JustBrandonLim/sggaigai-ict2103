const { connectToDatabase } = require("../../../libs/mongodb");

export default async function addPlace(req, res) {
  switch (req.method) {
    case "POST":
        try {
            var data = req.body["data"]
            console.log(data.ID)
            let { db } = await connectToDatabase();
            if (req.body["place_type"] == "Hotel") {
                var result = await db.collection("HOTELS").find({ID: data.ID}).count()
                console.log(result);
                if (result) {
                    res.status(200).json({ message: "Existing ID", success: false });
                }
                else {
                    await db.collection("HOTELS").insertOne(data);
                    res.status(200).json({ success: true });
                }
            }
            else if (req.body["place_type"] == "Restaurant") {
                var result = await db.collection("RESTAURANTS").find({ID: data.ID}).count()
                console.log(result);
                if (result) {
                    res.status(200).json({ message: "Existing ID", success: false });
                }
                else {
                    await db.collection("RESTAURANTS").insertOne(data);
                    res.status(200).json({ success: true });
                }
            }
            else {
                var result = await db.collection("EVENTS").find({ID: data.ID}).count()
                console.log(result);
                if (result) {
                    res.status(200).json({ message: "Existing ID", success: false });
                }
                else {
                    await db.collection("EVENTS").insertOne(data);
                    res.status(200).json({ success: true });
                }
            }
        } catch (error) {
            res.status(200).json({ message: new Error(error).message, success: false });
        }
      break;
    default:
      res.setHeader("Allow", "POST");
      res.status(405).end("Not allowed!");
      break;
  }
}