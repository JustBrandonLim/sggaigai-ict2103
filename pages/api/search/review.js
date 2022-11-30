const { connectToDatabase } = require("../../../libs/mongodb");

export default async function handler(req, res) {
  console.log("Method: ", req.method);
  if (req.method === "GET") {
    const { review } = req.query;

    let { db } = await connectToDatabase();

    let reviewData = await db.collection("EVENTS").findOne({ ID: "E1" });

    res.status(200).json(reviewData);
  } else if (req.method === "POST") {
    console.log(req.body);
    console.log("-----------------------------")
    if (!req.body["review"]) res.status(200).json({ results: false, success: true });
    else {
      try {
        let { db } = await connectToDatabase();
        console.log(req.body);
    
        let id = req.body.activity_id;

        // let data = await db.collection("EVENTS").findOne({ ID: id });

        let event = id.charAt(0);
        var data;
        switch (event) {
            case 'E':
                data = await db.collection("EVENTS").findOne({ ID: id });
                break;

            case 'R':
                data = await db.collection("RESTAURANTS").findOne({ ID: id });
                break;
        
            case 'H':
                data = await db.collection("HOTELS").findOne({ ID: id });
                break;
    
            default:
                break;
        }

        let collectionCount;

        try {
          collectionCount = data.reviews.length;
        } catch (err) {
          collectionCount = 0;
        }

        const reviewId = collectionCount + 1;

        const email = req.body.userID;
        const review = req.body.review;

        const reviewData = { review_id: reviewId, review_desc: review, email: email };
        // let response = await db.collection("EVENTS").update({ ID: req.body.activity_id }, { $push: { reviews: reviewData } });

        
        var response;
        switch (event) {
          case 'E':
              response = await db.collection("EVENTS").update({ ID: id }, { $push: { reviews: reviewData } });
              break;

          case 'R':
              response = await db.collection("RESTAURANTS").update({ ID: id }, { $push: { reviews: reviewData } })
              break;
      
          case 'H':
              response = await db.collection("HOTELS").update({ ID: id }, { $push: { reviews: reviewData } })
              break;
  
          default:
              break;
      }

        if (response.modifiedCount > 0) {
          res.status(200).json({ results: true, success: true });
        } else {
          res.status(200).json({ results: false, success: true });
        }
      } catch (error) {
        console.log(error);
        res.status(200).json({ message: new Error(error).message, success: false });
      }
    }
  } else if (req.method === "DELETE") {
    let { db } = await connectToDatabase();
    // const response = await db.collection("EVENTS").findOne({ ID: id });
    
    let id = req.body.activity_id;
    let event = id.charAt(0);
    var data;
    switch (event) {
        case 'E':
            response = await db.collection("EVENTS").findOne({ ID: id });
            break;

        case 'R':
            response   = await db.collection("RESTAURANTS").findOne({ ID: id });
            break;
        
        case 'H':
            response = await db.collection("HOTELS").findOne({ ID: id });
            break;
    
        default:
            break;
    }
    const { reviews } = response;
    const newData = reviews.filter((r) => r.review_id !== req.body.review_id);
    // const response2 = await db.collection("EVENTS").update({ ID: id }, { $set: { reviews: newData } });

    var response2;
      switch (event) {
        case 'E':
            response2 = await db.collection("EVENTS").updateOne({ ID: id }, { $set: { reviews: newData } });
            break;

        case 'R':
            response2 = await db.collection("RESTAURANTS").updateOne({ ID: id }, { $set: { reviews: newData } })
            break;
      
        case 'H':
            response2 = await db.collection("HOTELS").updateOne({ ID: id }, { $set: { reviews: newData } })
            break;
  
        default:
            break;
    }

    if (response2.modifiedCount > 0) {
      res.status(200).json({ results: true, success: true });
    } else {
      res.status(200).json({ results: false, success: true });
    }

  }
}
