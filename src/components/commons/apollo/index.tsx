import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useRecoilState } from "recoil";
import { quizAccessTokenState } from "../../../commons/stores";
import { useEffect } from "react";

interface IApolloSettingProps {
  children: JSX.Element;
}

// 아폴로세팅함수가 리렌더 되더라도 cache가 리렌더링 되지 않게 하기 위해
const GLOBAL_STATE = new InMemoryCache();

export default function ApolloSetting(props: IApolloSettingProps) {
  const [accessToken, setAccessToken] = useRecoilState(quizAccessTokenState);

  useEffect(() => {
    const result = localStorage.getItem("accessToken");
    console.log(result);

    // 로컬스토리지에 저장한 accessToken을 가져오는데 값이 만약에 없다면 ""(빈문자열)
    // setState에 저장되는것은 다 문자열로 바뀌어 저장됨
    setAccessToken(result ?? "");
  }, []);

  const uploadLink = createUploadLink({
    uri: "http://backend-practice.codebootcamp.co.kr/graphql",

    // 모든 페이지에 acessToken을 전달하기 위해
    headers: {
      Authorization: `Bearer ${accessToken}`, //
    },
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink as unknown as ApolloLink]),
    cache: GLOBAL_STATE,
    // cache: new InMemoryCache(), - 이부분을 따로 빼서 저장 - apollo-cache를 그쪽에 저장
  });

  return (
    // prettier-ignore
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  );
}
