import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "../styles/globals.css";

export default function App({ Component }) {
  const client = new ApolloClient({
    uri: "http://practice.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <Component />
    </ApolloProvider>
  );
}
