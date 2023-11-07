import React from "react";

const UserProfile = ({ params }: any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h2>Profile Page</h2>
      <hr />
      <p className="text-4xl">
        Welcome to profile of
        <span className="pl-2 pr-2 ml-2 rounded bg-orange-300">{params.id}</span>
      </p>
    </div>
  );
};

export default UserProfile;
