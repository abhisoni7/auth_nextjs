"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();

  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");

      console.log("Logged out Successfully");

      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/users/user");

      console.log(res.data.data.username);

      setData(res.data.data.username);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h2>Profile Page</h2>
      <hr />
      <h3>Welcome to profile page</h3>

      {data !== "nothing" ? (
        <h2 className="px-2 rounded bg-blue-300">
          <Link className="text-white" href={`/profile/${data}`}>
            {data}
          </Link>
        </h2>
      ): "" }
      <span>
        Do you want to
        <button
          onClick={logout}
          className="bg-blue-500 mt-6 text-white font-bold px-1 rounded hover:bg-blue-800"
        >
          Logout
        </button>
        ?
      </span>
    </div>
  );
};

export default ProfilePage;
