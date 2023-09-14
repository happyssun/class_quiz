import "../styles/globals.css";
import ApolloSetting from "../src/components/commons/apollo";
import { Global } from "@emotion/react";

import { globalStyles } from "../src/components/commons/styles/globalStyles";
import { RecoilRoot } from "recoil";

import { Dispatch, SetStateAction, createContext, useState } from "react";
import { AppProps } from "next/app";
import withApollo from "../src/components/commons/hocks/withApollo";

interface IGlobalContext {
  accessToken?: string;
  setAccessToken?: Dispatch<SetStateAction<string>>;
}

export const GlobalContext = createContext<IGlobalContext>({});
function App({ Component, pageProps }: AppProps) {
  const [accessToken, setAccessToken] = useState("");

  return (
    <RecoilRoot>
      <GlobalContext.Provider value={{ accessToken, setAccessToken }}>
        <>
          <Global styles={globalStyles} />

          <Component {...pageProps} />
        </>
      </GlobalContext.Provider>
    </RecoilRoot>
  );
}

export default withApollo(App);
