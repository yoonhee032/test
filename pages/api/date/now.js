export default function now(req, res) {
  const date = new Date();
  const format = date.toGMTString();

  console.log("로그 찍혔지")


  res.json({
    status: true,
    now: format,
    message: "회원가입을 완료했습니다.",
  });
}
