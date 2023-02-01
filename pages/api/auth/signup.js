import dbConnect from "../../../util/connectMongo";

export default async function hendler(req, res) {
  const { method } = req;

  dbConnect();

  if (method === "POST") {
    try {
      console.log("포스트 중");

      res.json({
        status: true,
        message: "회원가입을 했습니다.",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
