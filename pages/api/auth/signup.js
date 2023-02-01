export default function signup(req, res) {
  console.log("요청이 들어왔습니다. ", req.body);
  const date = new Date();
  const format = date.toGMTString();

  res.json({
    status: true,
    now: format,
    message: "회원가입을 완료했습니다.",
  });
}
