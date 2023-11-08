import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  Mutation,
  MutationLoginUserArgs,
} from "../../../src/commons/types/generated/types";
import { accessTokenState } from "../../../src/commons/stores";
import { useRouter } from "next/router";

const LOGIN_USER = gql`
  mutation loginUser($password: String!, $email: String!) {
    loginUser(password: $password, email: $email) {
      accessToken
    }
  }
`;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loginUser] = useMutation<
    Pick<Mutation, "loginUser">,
    MutationLoginUserArgs
  >(LOGIN_USER);

  const [, setAccessToken] = useRecoilState(accessTokenState);

  const onClickLogin = async () => {
    if (email === "" || pw === "") {
      alert("이메일과 비밀번호를 입력하세요");
      return;
    }
    try {
      const result = await loginUser({
        variables: {
          password: pw,
          email,
        },
      });
      const accessToken = result.data?.loginUser.accessToken;

      if (accessToken === undefined) {
        alert("로그인 실패! 다시 시도하세요!");
        return;
      }
      setAccessToken(accessToken);

      // 로컬스토리지는 보안의 이유로 좋지 않기 때문에 이것인 임시 사용(나중에 지울예정)
      localStorage.setItem("accessToken", accessToken);

      // 3. 로그인 성공 페이지로 이동하기
      void router.push("/24-custom-hooks/02-useAuth-hooks/moved-mainPage");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <>
      아이디 : <input onChange={(e) => setEmail(e.target.value)} />
      비밀번호 :
      <input type="password" onChange={(e) => setPw(e.target.value)} />
      <button onClick={onClickLogin}>로그인</button>
    </>
  );
}
