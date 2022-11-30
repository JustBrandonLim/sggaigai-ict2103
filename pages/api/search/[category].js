const { connectToDatabase } = require("../../../libs/mongodb");

export default async function SearchHandler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        let { db } = await connectToDatabase();
        switch (req.query.category) {
          case "eat":
            let restaurants = await db
              .collection("RESTAURANTS")
              .aggregate(
                [
                  {
                    $geoNear: {
                      near: { type: "Point", coordinates: [parseFloat(req.query.longitude), parseFloat(req.query.latitude)] },
                      distanceField: "dist.calculated",
                      spherical: true,
                    },
                  },
                ]
                //loc: { $near: { $geometry: { type: "Point", coordinates: [parseFloat(req.query.longitude), parseFloat(req.query.latitude)] } } },
              )
              .limit(100)
              .toArray();
            res.status(200).json(restaurants);
            break;
          case "do":
            let events = await db
              .collection("EVENTS")
              .aggregate(
                [
                  {
                    $geoNear: {
                      near: { type: "Point", coordinates: [parseFloat(req.query.longitude), parseFloat(req.query.latitude)] },
                      distanceField: "dist.calculated",
                      spherical: true,
                    },
                  },
                ]
                //loc: { $near: { $geometry: { type: "Point", coordinates: [parseFloat(req.query.longitude), parseFloat(req.query.latitude)] } } },
              )
              .limit(100)
              .toArray();
            res.status(200).json(events);
            break;
          case "stay":
            let hotels = await db
              .collection("HOTELS")
              .aggregate([
                {
                  $geoNear: {
                    near: { type: "Point", coordinates: [parseFloat(req.query.longitude), parseFloat(req.query.latitude)] },
                    distanceField: "dist.calculated",
                    spherical: true,
                  },
                },
              ])
              .limit(100)
              .toArray();
            res.status(200).json(hotels);
            break;
        }
      } catch (error) {
        res.status(200).json({
          message: new Error(error).message,
          success: false,
        });
      }
      break;
    default:
      res.setHeader("Allow", "GET");
      res.status(405).end("This is not allowed!");
      break;
  }
}
