import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Restaurants } from "../pages/client/restaurant";
import { myProfileQuery } from "../__generated__/myProfileQuery";

const ClientRoutes = [
  <Route path="/" exact>
    <Restaurants />
  </Route>,
];

const MY_PROFILE_QUERY = gql`
  query myProfileQuery {
    myProfile {
      id
      email
      role
      verified
    }
  }
`;

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<myProfileQuery>(MY_PROFILE_QUERY);
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Switch>
        {data.myProfile.role === "Client" && ClientRoutes}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
