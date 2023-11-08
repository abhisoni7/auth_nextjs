'use client'
import React from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProfilePage = () => {

  const router = useRouter();

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");

      console.log("Logged out Successfully");

      router.push("/login");

    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h2>Profile Page</h2>
      <hr />
      <h3>Welcome to profile page</h3>
      <button
        onClick={logout}
        className="bg-blue-500 mt-5 text-white font-bold py-1 px-3 rounded hover:bg-blue-800"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
