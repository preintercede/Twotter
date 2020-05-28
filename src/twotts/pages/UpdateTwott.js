import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import "./TwottForm.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";

const UpdateTwott = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedTwott, setLoadedTwott] = useState();
  const twottId = useParams().twottId;
  const history = useHistory();

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

  useEffect(() => {
    const fetchTwott = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:3001/api/twotts/${twottId}`
        );
        setLoadedTwott(responseData.twott);
        setFormData(
          {
            title: {
              value: responseData.twott.title,
              isValid: true,
            },
            description: {
              value: responseData.twott.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchTwott();
  }, [sendRequest, twottId, setFormData]);

  const twottUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:3001/api/twotts/${twottId}`,
        "PUT",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push("/" + auth.userId + "/twotts");
    } catch (err) {}
  };

  if (!loadedTwott && !error) {
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
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="twott-form" onSubmit={twottUpdateSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a title"
          onInput={inputHandler}
          initialValue={loadedTwott.title}
          initialValid={true}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(1)]}
          errorText="Please enter a description"
          onInput={inputHandler}
          initialValue={loadedTwott.description}
          initialValid={true}
        />
        <Button type="submit" disabled={!formState.isValid}>
          UPDATE TWOTT
        </Button>
      </form>
    </>
  );
};

export default UpdateTwott;
