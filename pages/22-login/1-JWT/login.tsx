import { gql, useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../src/commons/stores";
import {
  Mutation,
  MutationLoginUserArgs,
} from "../../../src/commons/types/generated/types";
import { useRouter } from "next/router";

const LOGIN_USER = gql`
  mutation loginUser($password: String!, $email: String!) {
    loginUser(password: $password, email: $email) {
      accessToken
    }
  }
`;

export default function LoginJMTPage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loginUser] = useMutation<
    Pick<Mutation, "loginUser">,
    MutationLoginUserArgs
  >(LOGIN_USER);

  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const router = useRouter();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.currentTarget.value);
  };

  const onChagePw = (e: ChangeEvent<HTMLInputElement>): void => {
    setPw(e.currentTarget.value);
  };

  const onClickLogin = async (): Promise<void> => {
    try {
      const result = await loginUser({
        variables: {
          password: pw,
          email,
        },
      });

      const accessToken = result.data?.loginUser.accessToken;

      if (!accessToken) {
        alert("로그인을 먼저 해주세요.");
        router.push("/22-login/1-JWT//login");
        return;
      }
      setAccessToken(accessToken);
      void router.push("/22-login/1-JWT/login-success");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <>
      이메일: <input type="text" onChange={onChangeEmail} />
      비밀번호: <input type="password" onChange={onChagePw} />
      <button onClick={onClickLogin}>Log In</button>
    </>
  );
}
