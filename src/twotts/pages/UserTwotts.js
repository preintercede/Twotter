import React from "react";
import { useParams } from "react-router-dom";
import TwottList from "../components/TwottList";

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

const UserTwotts = () => {
  const userId = useParams().userId;
  const loadedTwotts = FAKE_TWOTTS.filter((twott) => twott.creator === userId);
  return <TwottList items={loadedTwotts} />;
};

export default UserTwotts;
