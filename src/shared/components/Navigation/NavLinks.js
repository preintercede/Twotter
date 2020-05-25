import React from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";
const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      <li>
        <NavLink to="/user1/places">MY TWOTTS</NavLink>
      </li>
      <li>
        <NavLink to="/twotts/new">NEW TWOTT</NavLink>
      </li>
      <li>
        <NavLink to="/auth">AUTHENTICATE</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
