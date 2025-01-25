import React from "react";
import SuccessAnimation from "../components/SuccessAnimation";

const ProfileSuccessfullyUpdated = () => {
  const storedUserId = localStorage.getItem("userId");
  const storedUserType = localStorage.getItem("artistOrVenue");

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-800 rounded-2xl shadow-xl p-8 text-center max-w-md text-white">
        <SuccessAnimation />
        <h2 className="text-3xl font-bold text-green-400 mt-6 pt-5">
          Profile Updated Successfully!
        </h2>
        <p className="text-gray-400 mt-4">
          Your profile changes have been saved. You can now return to your
          profile page.
        </p>
        <a
          className="inline-block mt-6 px-6 py-3 bg-green-500 text-gray-900 font-medium rounded-full shadow-md hover:bg-green-400 transition"
          href={
            storedUserType === "A"
              ? `artistuserprofile/${storedUserId}`
              : `venueuserprofile/${storedUserId}`
          }
        >
          Back to My Profile
        </a>
      </div>
    </div>
  );
};

export default ProfileSuccessfullyUpdated;
