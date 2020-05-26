import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import "./TwottForm.css";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card";

const FAKE_TWOTTS = [
  {
    id: "p1",
    title: "What I did today",
    description: "Code",
    creator: "user1",
  },
  {
    id: "p2",
    title: "What I did yesterday",
    description: "Sleep",
    creator: "user2",
  },
];

const UpdateTwott = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const twottId = useParams().twottId;
  //   const identifiedTwott = FAKE_TWOTTS.find((t) => t.id === twottId);
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const identifiedTwott = FAKE_TWOTTS.find((t) => t.id === twottId);

  useEffect(() => {
    if (identifiedTwott) {
      setFormData(
        {
          title: {
            value: identifiedTwott.title,
            isValid: true,
          },
          description: {
            value: identifiedTwott.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedTwott]);

  const twottUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedTwott) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find twott</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="twott-form" onSubmit={twottUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a title"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(1)]}
        errorText="Please enter a description"
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE TWOTT
      </Button>
    </form>
  );
};

export default UpdateTwott;
