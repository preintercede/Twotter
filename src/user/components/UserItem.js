import React from "react";
import "./UserItem.css";

const UserItem = (props) => {
  return (
    <li className="user-item">
      <div className="user-item__content"></div>
      <div className="user-item__info">
        <h2>{props.name}</h2>
        <h3>
          {props.twottsCount} {props.twottsCount === 1 ? "Twott" : "Twotts"}
        </h3>
      </div>
    </li>
  );
};

export default UserItem;
