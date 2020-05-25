import React from "react";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import "./TwottItem.css";

const TwottItem = (props) => {
  return (
    <li className="twott-item">
      <Card className="twott-item__content">
        <div className="twott-item__info">
          <h2>{props.title}</h2>
          <h3>{props.description}</h3>
        </div>
        <div className="twott-item__actions">
          <Button to={`/twotts/${props.id}`}>EDIT</Button>
          <Button danger>DELETE</Button>
        </div>
      </Card>
    </li>
  );
};

export default TwottItem;
