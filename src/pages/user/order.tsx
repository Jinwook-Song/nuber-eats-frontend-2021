import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useParams } from "react-router";
import { getOrder, getOrderVariables } from "../../__generated__/getOrder";

const GET_ORDER = gql`
  query getOrder($input: GetOrderInput!) {
    getOrder(input: $input) {
      error
      ok
      order {
        id
        status
        total
        driver {
          email
        }
        customer {
          email
        }
        restaurant {
          name
        }
      }
    }
  }
`;

interface Iparams {
  id: string;
}

export const Order = () => {
  const params = useParams<Iparams>();
  const { data } = useQuery<getOrder, getOrderVariables>(GET_ORDER, {
    variables: {
      input: {
        id: +params.id,
      },
    },
  });
  console.log(data);
  return <div>{params.id}</div>;
};
