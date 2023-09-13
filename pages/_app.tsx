import "../styles/globals.css";
import ApolloSetting from "../src/components/commons/apollo";
import { Global } from "@emotion/react";

import { globalStyles } from "../src/components/commons/styles/globalStyles";
import { RecoilRoot } from "recoil";
import { createContext } from "vm";
import { Dispatch, SetStateAction } from "react";

interface IGlobalContext {
  accessToken?: string;
  setAccessToken?: Dispatch<SetStateAction<string>>;
}

export const GlobalContext = createContext<IGlobalContext>({});
export default function App({ Component }) {
  return (
    <RecoilRoot>
      <ApolloSetting>
        <>
          <Global styles={globalStyles} />

          <Component />
        </>
      </ApolloSetting>
    </RecoilRoot>
  );
}
