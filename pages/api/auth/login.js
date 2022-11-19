const { connectToDatabase, closeConnection } = require("../../../libs/mysql");

import { setCookie } from "cookies-next";

export default async function LoginHandler(req, res) {
  switch (req.method) {
    case "POST":
      if (!req.body["email"] || !req.body["password"]) res.status(200).json({ message: "Invalid data!", success: false });
      else {
        try {
          let { db } = await connectToDatabase();

          let [results] = await db.execute("SELECT email, firstName, lastName, isAdmin FROM user WHERE email = ? AND password = ?", [
            req.body["email"],
            req.body["password"],
          ]);

          closeConnection();

          if (results.length == 1) {
            setCookie("userData", JSON.stringify(results[0]), { req, res, maxAge: 3600, path: "/", sameSite: true });
            res.status(200).json(JSON.stringify(results[0]));
          } else res.status(200).json({ message: "Login failed!", success: false });
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
