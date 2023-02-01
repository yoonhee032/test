import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/schemas/user";
import Folder from "../../../models/schemas/folder";

import crypto from "crypto";

export default async function signup(req, res) {
  console.log("요청이 들어왔습니다. ", req.body);
}

const passwordHash = (password) => {
  return crypto.createHash("sha1").update(password).digest("hex");
};
