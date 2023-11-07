// decorator to make this html file a client ide component
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUp() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);

      console.log(response.data);

      router.push("/login");

    } catch (error: any) {
      console.log("Sign Up Failed", error.message);
    } finally{
      setLoading(true);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{ loading ? "Processing" : "Sign Up"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="p-1 border border-gray-300 rounded-lg mb-4 mt-2 text-black"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email">Email</label>
      <input
        className="p-1 border border-gray-300 rounded-lg mb-4 mt-2 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-1 border border-gray-300 rounded-lg mb-4 mt-2 text-black"
        id="password"
        type="text"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onSignUp}
        className="p-2 border border-gray-300 rounded-lg "
      >
        {buttonDisabled ? "No Sign Up" : "Sign Up"}
      </button>
      <span>
        Already member? <Link href="/login">Login</Link>
      </span>
    </div>
  );
}
