import gql from "graphql-tag";

// have to add isPromited after backend Payment
export const RESTAURANT_FRAGMENT = gql`
  fragment RestaurantParts on Restaurant {
    id
    name
    coverImg
    category {
      name
    }
    address
    isPromoted
  }
`;

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryParts on Category {
    id
    name
    coverImg
    slug
    restaurantCount
  }
`;

export const DISH_FRAGMENT = gql`
  fragment DishParts on Dish {
    id
    name
    price
    photo
    description
    options {
      name
      choices {
        name
        extra
      }
      extra
    }
  }
`;

export const ORDER_FRAGMENT = gql`
  fragment OrderParts on Order {
    id
    createdAt
    total
  }
`;

export const FULL_ORDER_FRAGMENT = gql`
  fragment FullOrderParts on Order {
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
`;
