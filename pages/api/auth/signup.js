import connectMongo from "../../../utils/connectMongo";

export default async function signup(req, res) {
  console.log("요청이 들어왔습니다. ", req);
  const date = new Date();
  const format = date.toGMTString();

  if (req.method === "POST") {
    console.log("포스트");

    await connectMongo();

    res.json({
      status: true,
      now: format,
      message: "회원가입을 했습니다.",
    });
  }
}
