import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { NonUndefined, useForm } from "react-hook-form";
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
  [key: string]: string;
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

  const { register, handleSubmit, formState, getValues, setValue } =
    useForm<IForm>({
      mode: "onChange",
    });

  const onSubmit = () => {
    const { name, price, description, ...rest } = getValues();
    const optionsObjects = optionsNumber.map((theId) => ({
      name: rest[`${theId}-optionName`],
      extra: +rest[`${theId}-optionExtra`],
    }));
    console.log(optionsObjects);
    createDishMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          restaurantId: +restaurantId,
          options: optionsObjects,
        },
      },
    });
  };
  const [optionsNumber, setOptionsNumber] = useState<number[]>([]);
  const onAddOptionClick = () => {
    setOptionsNumber((current) => [Date.now(), ...current]);
  };
  const onDeleteClick = (idToDelete: number) => {
    setOptionsNumber((current) => current.filter((id) => id !== idToDelete));
    setValue(`${idToDelete}-optionName`, "");
    setValue(`${idToDelete}-optionExtra`, "");
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
        <div className="my-10">
          <h4 className="font-medium mb-3 text-lg">Dish Options</h4>
          <span
            className=" cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5"
            onClick={onAddOptionClick}
          >
            Add Dish Option
          </span>
          {optionsNumber.length !== 0 &&
            optionsNumber.map((id) => (
              <div key={id} className="mt-5">
                <input
                  {...register(`${id}-optionName`)}
                  className="py-2 px-4 mr-3 focus:outline-none focus:border-gray-600 border-2"
                  type="text"
                  placeholder="Option Name"
                />
                <input
                  {...register(`${id}-optionExtra`)}
                  className="py-2 px-4 focus:outline-none focus:border-gray-600 border"
                  type="number"
                  min={0}
                  placeholder="Option Extra"
                />
                <span
                  className=" cursor-pointer text-white bg-red-500 ml-3 py-3 px-4 mt-5"
                  onClick={() => onDeleteClick(id)}
                >
                  Delete Option
                </span>
              </div>
            ))}
        </div>
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="Create Dish"
        />
      </form>
    </div>
  );
};
