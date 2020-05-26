import React from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import "./TwottForm.css";
import { useForm } from "../../shared/hooks/form-hook";

const FAKE_TWOTTS = [
  {
    id: "p1",
    title: "What I did today",
    description: "Code",
    creator: "user1",
  },
  {
    id: "p2",
    title: "What I did today",
    description: "Sleep",
    creator: "user2",
  },
];

const UpdateTwott = (props) => {
  const twottId = useParams().twottId;
  const identifiedTwott = FAKE_TWOTTS.find((t) => t.id === twottId);
  const [formState, inputHandler] = useForm(
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

  const twottUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedTwott) {
    return (
      <div className="center">
        <h2>Could not find twott</h2>
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
