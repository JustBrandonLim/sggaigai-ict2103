const { connectToDatabase } = require("../../../libs/mongodb");

export default async function handler(req, res) {
  console.log("Method: ", req.method);
  if (req.method === "GET") {
    const { review } = req.query;

    let { db } = await connectToDatabase();

    let reviewData = await db.collection("EVENTS").findOne({ ID: "E1" });

    res.status(200).json(reviewData);
  } else if (req.method === "POST") {
    if (!req.body["review"]) res.status(200).json({ results: false, success: true });
    else {
      try {
        let { db } = await connectToDatabase();
        console.log(req.body.id);
        let data = await db.collection("EVENTS").findOne({ ID: "E1" });

        let collectionCount = data.reviews.length;

        const reviewId = collectionCount + 1;

        const email = req.body.userID;
        const review = req.body.review;

        const reviewData = { review_id: reviewId, review_desc: review, email: email };
        let response = await db.collection("EVENTS").update({ ID: req.body.id }, { $push: { reviews: reviewData } });
        // console.log(response)

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
    const response = await db.collection("EVENTS").findOne({ ID: "E1" });
    const { reviews } = response;
    const newData = reviews.filter((r) => r.review_id !== req.body.review_id);
    const response2 = await db.collection("EVENTS").update({ ID: "E1" }, { $set: { reviews: newData } });
  }
}
