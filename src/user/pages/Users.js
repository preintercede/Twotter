import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "user1",
      name: "John Doe",
      image:
        "https://p7.hiclipart.com/preview/609/846/439/discord-computer-icons-logo-computer-software-avatar.jpg",
      twotts: 3,
    },
  ];
  return <UsersList items={USERS} />;
};

export default Users;
