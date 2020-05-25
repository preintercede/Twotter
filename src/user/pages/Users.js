import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [];
  //   const USERS = [{ id: "user1", name: "John Doe", twotts: 3 }];
  return <UsersList items={USERS} />;
};

export default Users;
