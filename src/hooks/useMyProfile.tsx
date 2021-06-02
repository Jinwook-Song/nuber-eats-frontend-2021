import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { myProfileQuery } from "../__generated__/myProfileQuery";

export const MY_PROFILE_QUERY = gql`
  query myProfileQuery {
    myProfile {
      id
      email
      role
      verified
    }
  }
`;

export const useMyProfile = () => {
  return useQuery<myProfileQuery>(MY_PROFILE_QUERY);
};
