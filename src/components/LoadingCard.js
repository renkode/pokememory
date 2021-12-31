import "../App.css";
import React, { memo } from "react";
import Loader from "react-loader-spinner";

const LoadingCard = () => {
  return (
    <div className="loading">
      <Loader visible="true" type="Oval" color="#b8b8b8" />
    </div>
  );
};

export default memo(LoadingCard);
