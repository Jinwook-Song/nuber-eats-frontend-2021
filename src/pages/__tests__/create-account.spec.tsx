import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { render, waitFor, RenderResult } from "../../test-utils";
import { CreateAccount } from "../create-account";

describe("<CreateAccount />", () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;

  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <CreateAccount />
        </ApolloProvider>
      );
    });
  });

  it("renders OK", async () => {
    await waitFor(() =>
      expect(document.title).toBe("Create Account | Nuber Eats")
    );
  });
});
