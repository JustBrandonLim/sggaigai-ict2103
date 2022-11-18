import { deleteCookie } from "cookies-next";

export default async function LogoutHandler(req, res) {
  switch (req.method) {
    case "POST":
      deleteCookie("userData", { req, res, maxAge: 3600, path: "/", sameSite: true });
      res.status(200).json({ message: "Success!", success: true });
      break;
    default:
      res.setHeader("Allow", "POST");
      res.status(405).end("Not allowed!");
      break;
  }
}
