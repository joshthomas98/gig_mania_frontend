import React from "react";

const UserCreated = () => {
  return (
    <>
      <section className="text-center p-5">
        <img className="w-25" src="../../images/green-tick.png" alt="" />

        <h2 className="text-light mt-3">Thank you for signing up!</h2>

        <p className="text-light mt-3 lead">
          Your account has been successfully created and you're all good to go!
        </p>
      </section>

      <section className="text-light text-center py-2 lead">
        <p>
          Click here to log in{" "}
          <span>
            <a href="/signin">Log In</a>
          </span>
        </p>
      </section>
    </>
  );
};

export default UserCreated;
