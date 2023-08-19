import { gql, useQuery } from "@apollo/client";
import { Query } from "../../../src/commons/types/generated/types";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

export default function LoginSuccessPage() {
  const { data } =
    useQuery<Pick<Query, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  return (
    <>로그인에 성공하였습니다! {data?.fetchUserLoggedIn.name}님 환영합니다!</>
  );
}
