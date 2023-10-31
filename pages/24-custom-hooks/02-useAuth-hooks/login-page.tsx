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
    try {
      const result = await loginUser({
        variables: {
          password: pw,
          email,
        },
      });
      const accessToken = result.data?.loginUser.accessToken;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken); // Store access token in local storage
        setAccessToken(accessToken);
        router.push("/24-custom-hooks/02-useAuth-hooks/moved-mainPage.tsx"); // Redirect to main page after successful login
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <>
      아이디 : <input onChange={(e) => setEmail(e.target.value)} />
      비밀번호 : <input onChange={(e) => setPw(e.target.value)} />
      <button onClick={onClickLogin}>로그인</button>
    </>
  );
}
