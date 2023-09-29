import { gql, useQuery } from "@apollo/client";
import { Query } from "../../../src/commons/types/generated/types";
import { useRouter } from "next/router";
import { useEffect } from "react";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

export default function LoginSuccessPage() {
  const router = useRouter();
  const { data } =
    useQuery<Pick<Query, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인을 먼저 해주세요.");
      void router.push("/22-login/1-JWT/login");
    }
  }, []);

  return (
    <>로그인에 성공하였습니다! {data?.fetchUserLoggedIn.name}님 환영합니다!</>
  );
}
