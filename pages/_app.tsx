import "../styles/globals.css";
import ApolloSetting from "../src/components/commons/apollo";
import { Global } from "@emotion/react";

import { globalStyles } from "../src/components/commons/styles/globalStyles";

import { Dispatch, SetStateAction, createContext, useState } from "react";
import { AppProps } from "next/app";
import withApollo from "../src/components/commons/hooks/withApollo";
import { RecoilRoot } from "recoil";

interface IGlobalContext {
  accessToken?: string;
  setAccessToken?: Dispatch<SetStateAction<string>>;
}

export const GlobalContext = createContext<IGlobalContext>({});
function App({ Component, pageProps }: AppProps) {
  // const [accessToken, setAccessToken] = useState("");

  return (
    <RecoilRoot>
      {/* <GlobalContext.Provider value={{ accessToken, setAccessToken }}> */}
      <ApolloSetting>
        <>
          <Global styles={globalStyles} />

          <Component {...pageProps} />
        </>
      </ApolloSetting>
      {/* </GlobalContext.Provider> */}
    </RecoilRoot>
  );
}

export default withApollo(App);

/* 
GlobalContext.Provider는 React의 Context API를 사용하여 전역 상태를 관리하기 위한 컨테이너 역할을 하는 것입니다.
Context API는 React 애플리케이션에서 상태를 전역적으로 관리할 수 있게 해주는 기능을 제공 

apollosetting 안에서 전역 상태를 관리하는 GlobalContext.Provider 대신
HTTP 요청 헤더에 있는 Authorization 필드(서버로 요청을 보낼 때, 사용자를 인증하기 위한 토큰 정보를 포함하는 역할)에 넣기 
// 모든 페이지에 acessToken을 전달하기 위해
    headers: {
      Authorization: `Bearer ${accessToken}`, //
    },
*/
