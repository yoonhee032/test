import jwt from "jsonwebtoken";

import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/schemas/user";

import crypto from "crypto";

//로그인
export default async function handler(req, res) {
  console.log("요청이 들어왔습니다. ", req.body);

  if (req.method === "POST") {
    const { email, password } = req.body;

    await connectMongo();

    let checkEmail = await User.findOne({ email });

    if (!checkEmail) {
      res.json({
        status: false,
        message: "존재하지 않거나 일치하지 않는 이메일입니다.",
      });
      return;
    }

    let hashPassword = passwordHash(password);

    if (hashPassword !== checkEmail.password) {
      res.json({
        status: false,
        message: "비밀번호가 틀렸습니다.",
      });
      return;
    }

    //정상적으로 로그인을 했을 시
    const secret = process.env.SECRET;

    jwt.sign(
      {
        email: checkEmail.email, // 이메일과 이름을 jwt로 변경해주기 위해 작성
        name: checkEmail.name,
      },
      secret,
      {
        expiresIn: "5m", //토큰 유효 시간
      },
      (error, token) => {
        if (error) {
          //토큰을 제대로 발행하지 못하고 오류가 났을경우.
          res.status(401).json({ status: false, message: "토큰 발행 실패" });
        } else {
          //정상적으로 토큰을 발행 했을경우,
          res.json({
            status: true,
            accessToken: token, //토큰 값을 브라우저에게 넘겨주는 부분
            email: checkEmail.email,
            name: checkEmail.name,
            id: checkEmail._id,
          });
        }
      }
    );
  }
}

const passwordHash = (password) => {
  return crypto.createHash("sha1").update(password).digest("hex");
};
