import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { Button } from "../../components/button";
import {
  createDish,
  createDishVariables,
} from "../../__generated__/createDish";
import { MY_RESTAURANTS_QUERY } from "./my-restaurants";

const CREATE_DISH_MUTATION = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  restaurantId: string;
}

interface IForm {
  name: string;
  price: string;
  description: string;
}

export const AddDish = () => {
  const { restaurantId } = useParams<IParams>();
  const history = useHistory();
  const onCompleted = (data: createDish) => {
    const {
      createDish: { ok, error },
    } = data;
    if (ok) {
      // redirect
      history.goBack();
    } else {
      console.log(error);
    }
  };
  const [createDishMutation, { loading }] = useMutation<
    createDish,
    createDishVariables
  >(CREATE_DISH_MUTATION, {
    refetchQueries: [
      {
        query: MY_RESTAURANTS_QUERY,
        variables: {
          input: {
            id: +restaurantId,
          },
        },
      },
    ],
    onCompleted,
  });

  const { register, handleSubmit, formState, getValues } = useForm<IForm>({
    mode: "onChange",
  });

  const onSubmit = () => {
    const { name, price, description } = getValues();
    createDishMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          restaurantId: +restaurantId,
        },
      },
    });
  };

  return (
    <div className="container flex flex-col items-center mt-52">
      <Helmet>
        <title>Add Dish | Nuber Eats</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Add Dish</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <input
          {...register("name", {
            required: "Name is required.",
            minLength: 3,
          })}
          className="input"
          type="text"
          placeholder="Name"
        />
        <input
          {...register("price", {
            required: "Price is required.",
            min: 0,
          })}
          className="input"
          type="number"
          step="0.1"
          placeholder="Price"
        />
        <input
          {...register("description", {
            required: "Description is required.",
            minLength: 5,
            maxLength: 140,
          })}
          className="input"
          type="text"
          placeholder="Description"
        />
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="Create Dish"
        />
      </form>
    </div>
  );
};
