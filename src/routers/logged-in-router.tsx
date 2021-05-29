import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { useMyProfile } from "../hooks/useMyProfile";
import { NotFound } from "../pages/404";
import { Restaurants } from "../pages/client/restaurant";
import { ConfirmEmail } from "../pages/user/confirm-email";

const ClientRoutes = [
  <Route path="/" exact>
    <Restaurants />
  </Route>,
  <Route path="/confirm" exact>
    <ConfirmEmail />
  </Route>,
];

export const LoggedInRouter = () => {
  // from api
  const { data, loading, error } = useMyProfile();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.myProfile.role === "Client" && ClientRoutes}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
