import { Global } from "@emotion/react";
import Layout from "../../../src/components/commons/layout";
import { globalStyles } from "../../../src/components/commons/styles/globalStyles";

export default function Page1() {
  return (
    <>
      <Global styles={globalStyles} />
      <Layout>
        <div>Body Part 1</div>
      </Layout>
    </>
  );
}
