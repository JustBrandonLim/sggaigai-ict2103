export default function ProfileHandler(req, res) {
  switch (req.method) {
    case "GET":
      res.status(200).json({ email: req.query.email, name: "Marcus" });
      break;
    default:
      res.setHeader("Allow", "GET");
      res.status(405).end("Not allowed!");
      break;
  }
}
