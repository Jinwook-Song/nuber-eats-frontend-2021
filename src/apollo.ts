import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

// reactive variables
export const isLoggedInVar = makeVar(false);

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    // save local state into cache
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
        },
      },
    },
  }),
});
