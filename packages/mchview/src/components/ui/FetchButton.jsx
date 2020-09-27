import React, { useState } from "react";
import PropTypes from "prop-types";

const FetchButton = ({ fetcher, finalizer }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  let msg = "Fetch";
  if (isLoading) {
    msg = "Loading";
  }
  if (isError) {
    msg = "Error";
  }
  return (
    <button
      type="button"
      arial-label="fetch"
      className={`fetch${isLoading ? " loading" : ""}`}
      onClick={() => {
        setIsLoading(true);
        return fetcher().then(
          () => {
            setIsLoading(false);
            finalizer();
          },
          () => {
            setIsError(true);
            setIsLoading(false);
          }
        );
      }}
    >
      {msg}
    </button>
  );
};

FetchButton.propTypes = {
  fetcher: PropTypes.func.isRequired,
  finalizer: PropTypes.func.isRequired,
};

export default FetchButton;
