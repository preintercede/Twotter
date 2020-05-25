import React from "react";
import Card from "../../shared/components/UIElements/Card";
import TwottItem from "./TwottItem";
import "./TwottList.css";

const TwottList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="twott-list center">
        <Card>
          <h2>No Twotts found.</h2>
          <button>Share Twott</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="twott-list">
      {props.items.map((twott) => (
        <TwottItem
          key={twott.id}
          id={twott.id}
          title={twott.title}
          description={twott.description}
          creatorId={twott.creator}
        />
      ))}
    </ul>
  );
};

export default TwottList;
