import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  searchRestaurant,
  searchRestaurantVariables,
} from "../../__generated__/searchRestaurant";

const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Search = () => {
  const location = useLocation();
  const history = useHistory();
  const [callQuery, { loading, data, called }] =
    useLazyQuery<searchRestaurant, searchRestaurantVariables>(
      SEARCH_RESTAURANT
    );
  useEffect(() => {
    const [_, searchTerm] = location.search.split("?term=");
    if (!searchTerm) {
      // URL doesn't saved in History API
      return history.replace("/");
    }
    callQuery({
      variables: {
        input: {
          page: 1,
          query: searchTerm,
        },
      },
    });
  }, [history, location]);
  console.log(loading, data, called);
  return (
    <h1>
      <Helmet>
        <title>Search | Nuber Eats</title>
      </Helmet>
      Search Page
    </h1>
  );
};
