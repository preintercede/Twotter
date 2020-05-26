import React from "react";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import "./NewTwott.css";

const NewTwott = () => {
  return (
    <form className="twott-form">
      <Input
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
      />
    </form>
  );
};

export default NewTwott;
