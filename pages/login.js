import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

import ColorLogo from "../public/svg/logo_color.svg";
import tw from "tailwind-styled-components";

const Logodiv = tw.div`
m-auto mb-[50px]
`;

const InputDiv = tw.div`
relative mb-5
`;

const InputBox = tw.input`
max-w-[400px] w-full bg-white rounded border focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out h-[60px] bg-[#F1F1F5]
`;

export default function Login() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const router = useRouter();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  let handleInput = (e) => {
    // console.log(e.target.value),
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // 로그인 버튼을 클릭 했을때, 유효성 검사 후,
  // axios를 사용해서 서버에 요청!
  let clickLoginBtn = async () => {
    let regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    let correctEmail = regExp.test(loginData.email);

    if (loginData.email === "") {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (correctEmail === false) {
      alert("이메일 형식을 확인해주세요");
      return;
    }

    if (loginData.password === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    //실질적인 axios요청,
    return await axios.post("api/auth/login", loginData);
  };

  return (
    <>
      {/* <section className="text-gray-600 body-font h-screen">
        <div className="mx-auto flex px-5 items-center justify-center flex-col h-screen">
          <div className="y-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 items-center">
            <Logodiv>
              <Link href="/">
                <ColorLogo className="max-w-[300px] w-[90%] m-auto h-[54px] sm:w-[300px]" />
              </Link>
            </Logodiv>
            <form className="max-w-[400px] w-full">
              <InputDiv>
                <InputBox
                  type="email"
                  id="email"
                  name="email"
                  value={loginData.email}
                  placeholder="이메일을 입력해 주세요."
                  onChange={handleInput}
                  required
                ></InputBox>
              </InputDiv>
              <InputDiv>
                <InputBox
                  type="password"
                  id="password"
                  name="password"
                  value={loginData.password}
                  placeholder="비밀번호를 입력해 주세요."
                  autoComplete="new-password"
                  onChange={handleInput}
                ></InputBox>
              </InputDiv>
              <div className="mb-3">
                <p className="text-danger">{errorMsg}</p>
              </div>
              <button
                type="button"
                className="text-white bg-[#0074FF] border-0 py-2 px-8 rounded text-lg h-[60px] max-w-[400px] w-full mt-5"
                onClick={() => {
                  clickLoginBtn()
                    .then((res) => {
                      // console.log("리스폰스", res.data);
                      if (res.data.status) {
                        setCookie("token", res.data, { path: "/" });
                        router.push(`/feed/${res.data.id}`);
                      } else {
                        //에러 메시지를 보여주고
                        setErrorMsg(res.data.message);
                        //input의 모든 데이터를 없앰
                      }
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                }}
              >
                로그인
              </button>
            </form>
            <button className="max-w-[400px] w-full text-white bg-[#BBBBBB] border-0 py-2 px-6 focus:outline-none rounded text-lg mt-5 h-[60px] tracking-tight">
              카카오톡 간편 로그인
            </button>
            <p className="text-gray-500 mt-10 tracking-tight m-auto">
              아직 회원이 아니신가요?{" "}
              <Link href="/signUp">
                <span className="text-[#0074FF] underline underline-offset-3">
                  이메일로 회원가입
                </span>
              </Link>
            </p>
          </div>
        </div>
      </section> */}
    </>
  );
}
