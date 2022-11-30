const { connectToDatabase } = require("../../../../libs/mongodb");

export default async function handler(req, res) {
  console.log("Method: ", req.method);
  if (req.method === "GET") {

    let { db } = await connectToDatabase();

    const {id} = req.query;
    
    let event = id.charAt(0);
    var reviewData;
    switch (event) {
        case 'E':
            reviewData = await db.collection("EVENTS").findOne({ ID: id });
            break;

        case 'R':
            reviewData = await db.collection("RESTAURANTS").findOne({ ID: id });
            break;
        
        case 'H':
            reviewData = await db.collection("HOTELS").findOne({ ID: id });
            break;
    
        default:
            break;
    }


    console.log(id);

    res.status(200).json(reviewData);

  }
}