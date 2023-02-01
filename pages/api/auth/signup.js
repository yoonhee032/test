import connectMongo from "../../../utils/connectMongo";

export default async function hendler(req, res) {
  const { method } = req;

  connectMongo();

  if (method === "POST") {
    try {
      console.log("포스트");

      res.json({
        status: true,
        message: "회원가입을 했습니다.",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
