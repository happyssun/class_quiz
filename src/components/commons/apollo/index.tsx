import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useRecoilState } from "recoil";

interface IApolloSettingProps {
  children: JSX.Element;
}

// 아폴로세팅함수가 리렌더 되더라도 cache가 리렌더링 되지 않게 하기 위해
const GLOBAL_STATE = new InMemoryCache()

export default function ApolloSetting(props: IApolloSettingProps) {

  const uploadLink = createUploadLink({
    uri: "http://backend-practice.codebootcamp.co.kr/graphql",
    caches:GLOBAL_STATE,
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink as unknown as ApolloLink]),
    cache: new InMemoryCache(),
  });

  return (
    // prettier-ignore
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  );
}
