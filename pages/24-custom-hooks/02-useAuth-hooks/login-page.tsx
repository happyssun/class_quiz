import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { Mutation, MutationLoginUserArgs } from "../../../src/commons/types/generated/types";

const LOGIN_USER = gql`
  mutation loginUser($password: String!, $email: String!) {
    loginUser(password: $password, email: $email) {
      accessToken
    }
  }
`;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loginUser] = useMutation<
    Pick<Mutation, "loginUser">,
    MutationLoginUserArgs
  >(LOGIN_USER);
  
  const [, setAccessToken] = useRecoilState(accessTokenState);

  const onClickLogin = async () => {
    await loginUser(email, pw);


  }
  return (
    <>
      아이디 : <input onChange={(e) => setEmail(e.target.value)} />
      비밀번호 : <input onChange={(e) => setPw(e.target.value)}/>
      <button onClick={onClickLogin}>로그인</button>
    </>
  );
}
