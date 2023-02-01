export default function now(req, res) {
  const date = new Date();
  const format = date.toGMTString();

  res.json({ req : req });

  res.json({
    status: true,
    now: format,
    message: "회원가입을 완료했습니다.",
  });
}
