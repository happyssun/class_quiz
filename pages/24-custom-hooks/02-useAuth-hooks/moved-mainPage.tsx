import { gql, useQuery } from "@apollo/client";
import { Query } from "../../../src/commons/types/generated/types";
import { useAuth } from "../../../src/components/commons/hooks/useAuth";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

export default function MovedToMainPage() {
  useAuth();
  const { data } =
    useQuery<Pick<Query, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  return (
    <>
      <div>메인페이지입니다. {data?.fetchUserLoggedIn.name}님 환영합니다.</div>
    </>
  );
}
