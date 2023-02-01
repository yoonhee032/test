import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/schemas/user";
import Folder from "../../../models/schemas/folder";

import crypto from "crypto";

export default async function handler(req, res) {
  console.log("요청이 들어왔습니다. ", req.body);

  if (req.method === "POST") {
    const { email, password, name } = req.body;

    await connectMongo();

    const checkExisting = await User.findOne({ email });

    if (checkExisting) {
      res.json({ status: false, message: "이미 가입된 계정이에요!" });
      return;
    }

    console.log("CREATING TO DOCUMENT");

    let hashPassword = passwordHash(password);

    //회원 저장
    const user = await User.create({
      email,
      password: hashPassword,
      name,
    });

    // 여기서부터 폴더 생성
    //1. 회원을 생성함과 즉시 전체 링크라는 이름의 폴더를 하나 생성한다
    await Folder.create({
      folder_title: "전체 링크",
      author: user,
    });

    console.log("CREATED TO DOCUMENT");

    res.json({
      status: true,
      message: "회원가입을 완료했습니다.",
      user,
    });
  }
}

const passwordHash = (password) => {
  return crypto.createHash("sha1").update(password).digest("hex");
};
