import "../styles/globals.css";
import ApolloSetting from "../src/components/commons/apollo";
import { Global } from "@emotion/react";

import { globalStyles } from "../src/components/commons/styles/globalStyles";

export default function App({ Component }) {
  return (
    <ApolloSetting>
      <>
        <Global styles={globalStyles} />

        <Component />
      </>
    </ApolloSetting>
  );
}
