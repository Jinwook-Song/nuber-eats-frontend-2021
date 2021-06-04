import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import {
  createRestaurant,
  createRestaurantVariables,
} from "../../__generated__/createRestaurant";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      error
      ok
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
}

export const AddRestaurant = () => {
  const [createRestaurantMutation, { loading, data }] = useMutation<
    createRestaurant,
    createRestaurantVariables
  >(CREATE_RESTAURANT_MUTATION);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormProps>({
    mode: "onChange",
  });

  const onSubmit = () => {
    console.log(getValues());
  };

  return (
    <div className="container">
      <Helmet>
        <title>Add Restaurant | Nuber Eats</title>
      </Helmet>
      <h1>Add Restauarnt</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input"
          {...register("name", { required: "Name is required." })}
          placeholder="Name"
          type="text"
        />
        <input
          className="input"
          {...register("address", { required: "Address is required." })}
          placeholder="Address"
          type="text"
        />
        <input
          className="input"
          {...register("categoryName", {
            required: "Category Name is required.",
          })}
          placeholder="Category Name"
          type="text"
        />
        <Button
          canClick={isValid}
          loading={loading}
          actionText="Create Restaurant"
        />
      </form>
    </div>
  );
};
