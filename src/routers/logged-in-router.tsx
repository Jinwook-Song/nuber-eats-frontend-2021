import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { isLoggedInVar } from "../apollo";
import { myProfileQuery } from "../__generated__/myProfileQuery";

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
    <div>
      <h1>{data.myProfile.role}</h1>
      <button onClick={() => isLoggedInVar(false)}>Log Out</button>
    </div>
  );
};
