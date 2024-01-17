import React from "react";

const RestrictedPage = () => {
  return (
    <div className="text-light text-center">
      <h1 className="pb-3">Ooops!</h1>

      <h3>
        It looks like you don't have permission to access this page.<br></br>
        Please ensure you are logged in and are the correct account type for
        this page and try again.
      </h3>
    </div>
  );
};

export default RestrictedPage;
