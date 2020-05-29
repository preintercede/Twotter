import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import TwottList from "../components/TwottList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UserTwotts = () => {
  const [loadedTwotts, setLoadedTwotts] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchTwotts = async () => {
      try {
        const responseData = await sendRequest(`/api/twotts/user/${userId}`);
        setLoadedTwotts(responseData.twotts);
      } catch (err) {}
    };
    fetchTwotts();
  }, [sendRequest, userId]);

  const twottDeletedHandler = (deletedTwottId) => {
    setLoadedTwotts((prevTwotts) =>
      prevTwotts.filter((twott) => twott.id !== deletedTwottId)
    );
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedTwotts && (
        <TwottList items={loadedTwotts} onDeleteTwott={twottDeletedHandler} />
      )}
    </>
  );
};

export default UserTwotts;
